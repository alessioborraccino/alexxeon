import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { cache } from "react";
export const getPosts = cache(async () =>
  JSON.parse(
    await readFile(resolve(process.cwd(), ".generated/posts.json"), "utf8"),
  ),
);
