import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, test } from "node:test";
import type { Post } from "../lib/content";
import { StaticJsonPostsRepository } from "../lib/posts/static-json-posts-repository";

const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(
    temporaryDirectories.splice(0).map((directory) =>
      rm(directory, { recursive: true, force: true }),
    ),
  );
});

async function makeRepository(posts: Post[]) {
  const directory = await mkdtemp(join(tmpdir(), "alexxeon-posts-"));
  temporaryDirectories.push(directory);
  const snapshotPath = join(directory, "posts.json");
  await writeFile(snapshotPath, JSON.stringify(posts));
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

test("static posts repository reads all posts from its content snapshot", async () => {
  const repository = await makeRepository(posts);

  assert.deepEqual(await repository.getAll(), posts);
});

test("static posts repository finds a post by slug and returns undefined when absent", async () => {
  const repository = await makeRepository(posts);

  assert.deepEqual(await repository.getBySlug("bloodstream"), posts[1]);
  assert.equal(await repository.getBySlug("missing"), undefined);
});
