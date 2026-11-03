import { createClient } from "@sanity/client";
import {
  normalizePosts,
  orderPostsLike,
  type SanityPostInput,
} from "./normalize";
import { locales, type Locale } from "@/modules/i18n";

export async function fetchPublishedPosts() {
  const client = createClient({
    projectId: "nulp5uls",
    dataset: "production",
    apiVersion: "2025-02-19",
    useCdn: false,
    perspective: "published",
  });
  const documents = await client.fetch<SanityPostInput[]>(
    `*[_type == "post"] | order(publishedAt desc, _createdAt desc) { _id, language, title, slug, body, lyrics, mainVideo, publishedAt, _updatedAt }`,
  );
  const postsByLocale = Object.fromEntries(
    locales.map((locale) => {
      const localizedPosts = documents.filter(
        (post) => (post.language || "en") === locale,
      );
      if (!localizedPosts.length) {
        throw new Error(
          `No published Sanity posts found for ${locale}. Add and publish at least one translated post before building.`,
        );
      }
      return [locale, normalizePosts(localizedPosts)];
    }),
  ) as Record<Locale, ReturnType<typeof normalizePosts>>;
  const englishSlugs = new Set(postsByLocale.en.map((post) => post.slug));
  for (const locale of locales.filter((item) => item !== "en")) {
    const localizedSlugs = new Set(
      postsByLocale[locale].map((post) => post.slug),
    );
    if (
      englishSlugs.size !== localizedSlugs.size ||
      [...englishSlugs].some((slug) => !localizedSlugs.has(slug))
    ) {
      throw new Error(
        `Published ${locale} posts must match English slugs so the language switcher can keep users on the same song.`,
      );
    }
    postsByLocale[locale] = orderPostsLike(
      postsByLocale[locale],
      postsByLocale.en,
    );
  }
  return postsByLocale;
}
