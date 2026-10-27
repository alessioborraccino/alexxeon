import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { cache } from "react";
import type { Post } from "./content";

export const getPosts = cache(
  async (): Promise<Post[]> =>
    JSON.parse(
      await readFile(resolve(process.cwd(), ".generated/posts.json"), "utf8"),
    ) as Post[],
);
