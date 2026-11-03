import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const roots = ["app", "views", "modules", "ui", "scripts"];

async function sources(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) => {
        const file = path.join(directory, entry.name);
        return entry.isDirectory()
          ? sources(file)
          : /\.tsx?$/.test(file)
            ? [file]
            : [];
      }),
    )
  ).flat();
}

const files = (await Promise.all(roots.map(sources))).flat();
const known = new Set(files);
const graph = new Map<string, string[]>();
const clients: string[] = [];
const imports: { file: string; target: string; specifier: string }[] = [];

for (const file of files) {
  const source = await readFile(file, "utf8");
  if (/^\s*["']use client["'];/m.test(source)) clients.push(file);
  const dependencies: string[] = [];
  function record(specifier: string, typeOnly = false) {
    const base = specifier.startsWith("@/")
      ? specifier.slice(2)
      : specifier.startsWith(".")
        ? path.normalize(path.join(path.dirname(file), specifier))
        : specifier;
    const target =
      [
        base,
        `${base}.ts`,
        `${base}.tsx`,
        `${base}/index.ts`,
        `${base}/index.tsx`,
      ].find((candidate) => known.has(candidate)) ?? base;
    imports.push({ file, target, specifier });
    if (!typeOnly) dependencies.push(target);
  }
  // Match the static import/export forms used in this repository, including
  // multiline declarations, side-effect imports and literal dynamic imports.
  for (const match of source.matchAll(
    /\b(?:import|export)\s+(type\s+)?(?:[^;"']*?\s+from\s+)?["']([^"']+)["']/g,
  ))
    record(match[2], Boolean(match[1]));
  for (const match of source.matchAll(
    /\b(?:import|require)\s*\(\s*["']([^"']+)["']\s*\)/g,
  ))
    record(match[1]);
  graph.set(file, dependencies);
}

test("consumers use public module and page interfaces", () => {
  for (const { file, target } of imports) {
    const module = target.match(/^modules\/([^/]+)\//)?.[1];
    if (module && !file.startsWith(`modules/${module}/`)) {
      assert.match(
        target,
        /^modules\/[^/]+\/(index|server|build)\.ts$/,
        `${file} imports private ${target}`,
      );
    }
    const view = target.match(/^views\/([^/]+)\//)?.[1];
    if (view && !file.startsWith(`views/${view}/`)) {
      assert.match(
        target,
        /^views\/[^/]+\/index\.tsx?$/,
        `${file} imports private ${target}`,
      );
    }
    if (file.startsWith("ui/")) {
      assert.ok(
        !/^(app|views|modules)\//.test(target),
        `${file} depends on application code: ${target}`,
      );
    }
    if (target.startsWith("ui/") && !file.startsWith("ui/")) {
      assert.equal(
        target,
        "ui/index.ts",
        `${file} imports private UI: ${target}`,
      );
    }
    if (file.startsWith("modules/")) {
      assert.ok(
        !/^(app|views)\//.test(target),
        `${file} depends on a page: ${target}`,
      );
    }
  }
});

test("CMS dependencies stay inside content internals; build entry is script-only", () => {
  for (const { file, target, specifier } of imports) {
    if (/^(@sanity\/|@portabletext\/)/.test(specifier)) {
      assert.ok(
        file.startsWith("modules/content/internal/"),
        `${file} exposes a CMS dependency`,
      );
    }
    if (target === "modules/content/build.ts") {
      assert.ok(
        file.startsWith("scripts/"),
        `${file} imports build-only content`,
      );
    }
  }
});

test("client dependency graphs cannot reach server or build code", () => {
  for (const client of clients) {
    const visited = new Set<string>();
    function check(file: string) {
      if (visited.has(file)) return;
      visited.add(file);
      assert.ok(
        !file.startsWith("node:") &&
          file !== "@sanity/client" &&
          !/^modules\/[^/]+\/(server|build)\.ts$/.test(file),
        `${client} reaches server/build dependency ${file}`,
      );
      for (const dependency of graph.get(file) ?? []) check(dependency);
    }
    check(client);
  }
});
