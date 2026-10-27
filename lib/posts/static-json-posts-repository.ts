import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { Post } from "../content";
import type { PostsRepository } from "./types";

/** Reads the content snapshot produced by the Sanity build step. */
export class StaticJsonPostsRepository implements PostsRepository {
  constructor(
    private readonly snapshotPath = resolve(
      process.cwd(),
      ".generated/posts.json",
    ),
  ) {}

  async getAll(): Promise<Post[]> {
    return JSON.parse(await readFile(this.snapshotPath, "utf8")) as Post[];
  }

  async getBySlug(slug: string): Promise<Post | undefined> {
    return (await this.getAll()).find((post) => post.slug === slug);
  }
}
