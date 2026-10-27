import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, test } from "node:test";
import type { Post } from "../lib/content";
import type { Locale } from "../lib/i18n";
import { StaticJsonPostsRepository } from "../lib/posts/static-json-posts-repository";

const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(
    temporaryDirectories
      .splice(0)
      .map((directory) => rm(directory, { recursive: true, force: true })),
  );
});

async function makeRepository(postsByLocale: Record<Locale, Post[]>) {
  const directory = await mkdtemp(join(tmpdir(), "alexxeon-posts-"));
  temporaryDirectories.push(directory);
  const snapshotPath = join(directory, "posts.json");
  await writeFile(snapshotPath, JSON.stringify(postsByLocale));
  return new StaticJsonPostsRepository(snapshotPath);
}

const posts: Post[] = [
  {
    _id: "post-1",
    title: "The Loneliest",
    slug: "the-loneliest",
    videoId: null,
    description: "",
  },
  {
    _id: "post-2",
    title: "Bloodstream",
    slug: "bloodstream",
    videoId: null,
    description: "",
  },
];
const postsByLocale: Record<Locale, Post[]> = {
  en: posts,
  it: [{ ...posts[0], _id: "post-1-it", title: "The Loneliest (Italiano)" }],
  de: [],
};

test("static posts repository reads all posts from its content snapshot", async () => {
  const repository = await makeRepository(postsByLocale);

  assert.deepEqual(await repository.getAll("en"), posts);
});

test("static posts repository finds a post by slug and returns undefined when absent", async () => {
  const repository = await makeRepository(postsByLocale);

  assert.deepEqual(await repository.getBySlug("en", "bloodstream"), posts[1]);
  assert.equal(await repository.getBySlug("en", "missing"), undefined);
});

test("static posts repository keeps locale datasets separate", async () => {
  const repository = await makeRepository(postsByLocale);

  assert.deepEqual(await repository.getAll("it"), postsByLocale.it);
  assert.deepEqual(await repository.getAll("de"), []);
});
