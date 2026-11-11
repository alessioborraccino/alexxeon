import {
  resolveLocaleParams,
  type LocalizedPageProps,
} from "@/modules/i18n/server";
import { notFound } from "next/navigation";
import { getPostBySlug, getPosts } from "@/modules/content/server";
import { hasLocale, messages } from "@/modules/i18n";
import { pageMetadata } from "@/modules/site";
import SongPage from "@/views/song";
export const dynamicParams = false;
export async function generateStaticParams({
  params,
}: {
  params: { locale: string };
}) {
  if (!hasLocale(params.locale)) return [];
  return (await getPosts(params.locale)).map(({ slug }) => ({ slug }));
}
type SongPageProps = LocalizedPageProps<{ locale: string; slug: string }>;
export async function generateMetadata({ params }: SongPageProps) {
  const { locale, slug } = await resolveLocaleParams(params);
  const post = await getPostBySlug(locale, slug);
  return post
    ? pageMetadata(
        `${post.title} — ${messages[locale].titles.music}`,
        `${messages[locale].aboutCover}: ${post.description}`,
        `/${locale}/music/${slug}/`,
        true,
      )
    : {};
}
export default async function Song({ params }: SongPageProps) {
  const { locale, slug } = await resolveLocaleParams(params);
  const post = await getPostBySlug(locale, slug);
  if (!post) notFound();
  return <SongPage post={post} locale={locale} />;
}
