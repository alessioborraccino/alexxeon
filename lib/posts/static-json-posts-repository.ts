import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { Post } from "../content";
import type { Locale } from "../i18n";
import type { PostsRepository } from "./types";

type PostsByLocale = Record<Locale, Post[]>;

/** Reads the content snapshot produced by the Sanity build step. */
export class StaticJsonPostsRepository implements PostsRepository {
  constructor(
    private readonly snapshotPath = resolve(
      process.cwd(),
      ".generated/posts.json",
    ),
  ) {}

  async getAll(locale: Locale): Promise<Post[]> {
    const posts = JSON.parse(
      await readFile(this.snapshotPath, "utf8"),
    ) as PostsByLocale;
    return posts[locale];
  }

  async getBySlug(locale: Locale, slug: string): Promise<Post | undefined> {
    return (await this.getAll(locale)).find((post) => post.slug === slug);
  }
}
