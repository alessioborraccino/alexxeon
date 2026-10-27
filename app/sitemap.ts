import { getPosts } from "../lib/posts";
import { locales, type Locale } from "../lib/i18n";
import type { Post } from "../lib/content";
import { siteUrl } from "../lib/site";
export const dynamic = "force-static";
export default async function sitemap() {
  const postsByLocale = {} as Record<Locale, Post[]>;
  await Promise.all(
    locales.map(async (locale) => {
      postsByLocale[locale] = await getPosts(locale);
    }),
  );
  return locales.flatMap((locale) => [
    { url: `${siteUrl}/${locale}/` },
    { url: `${siteUrl}/${locale}/bio/` },
    ...postsByLocale[locale].map((post) => ({
      url: `${siteUrl}/${locale}/music/${post.slug}/`,
      lastModified: post._updatedAt,
    })),
  ]);
}
