import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPosts } from "../../../../lib/posts";
import { hasLocale, messages } from "../../../../lib/i18n";
import { pageMetadata, siteUrl } from "../../../../lib/site";
import Lyrics from "../../../../components/Lyrics";
import ShareSong from "../../../../components/ShareSong";
import Video from "../../../../components/Video";
import Body from "../../../../components/Body";
import { ButtonLink } from "../../../../ui";
export const dynamicParams = false;
export async function generateStaticParams({
  params,
}: {
  params: { locale: string };
}) {
  if (!hasLocale(params.locale)) return [];
  return (await getPosts(params.locale)).map(({ slug }) => ({ slug }));
}
type SongPageProps = { params: Promise<{ locale: string; slug: string }> };
export async function generateMetadata({ params }: SongPageProps) {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) notFound();
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
  const { locale, slug } = await params;
  if (!hasLocale(locale)) notFound();
  const t = messages[locale];
  const post = await getPostBySlug(locale, slug);
  if (!post) notFound();
  return (
    <main id="main" className="section song">
      <Link href={`/${locale}/#music`}>{t.allMusic}</Link>
      <h1>{post.title}</h1>
      <p className="eyebrow">{t.version}</p>
      <Video id={post.videoId} title={post.title} eager />
      <div className="prose">
        <Body value={post.body} />
      </div>
      <Lyrics lyrics={post.lyrics} locale={locale} />
      <div className="song-actions">
        {post.videoId && (
          <ButtonLink href={`https://www.youtube.com/watch?v=${post.videoId}`}>
            {t.watchYouTube}
          </ButtonLink>
        )}
        <ShareSong
          title={post.title}
          url={`${siteUrl}/${locale}/music/${slug}/`}
          locale={locale}
        />
      </div>
    </main>
  );
}
