import { mkdir, writeFile } from "node:fs/promises";
import { createClient } from "@sanity/client";
import { normalizePosts, type SanityPostInput } from "../lib/content";
const client = createClient({
  projectId: "nulp5uls",
  dataset: "production",
  apiVersion: "2025-02-19",
  useCdn: false,
  perspective: "published",
});
const posts = normalizePosts(
  await client.fetch<SanityPostInput[]>(
    `*[_type == "post"] | order(publishedAt desc, _createdAt desc) { _id, title, slug, body, mainVideo, publishedAt, _updatedAt }`,
  ),
);
if (!posts.length)
  throw new Error("Refusing to replace the music site with an empty dataset.");
await mkdir(".generated", { recursive: true });
await writeFile(".generated/posts.json", JSON.stringify(posts, null, 2));
console.log(`Prepared ${posts.length} published songs.`);
