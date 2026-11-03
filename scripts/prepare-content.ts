import { mkdir, writeFile } from "node:fs/promises";
import { fetchPublishedPosts } from "@/modules/content/build";
import { locales } from "@/modules/i18n";

const postsByLocale = await fetchPublishedPosts();
await mkdir(".generated", { recursive: true });
await writeFile(
  ".generated/posts.json",
  JSON.stringify(postsByLocale, null, 2),
);
console.log(
  `Prepared ${locales.map((locale) => `${locale}: ${postsByLocale[locale].length}`).join(", ")} published songs.`,
);
