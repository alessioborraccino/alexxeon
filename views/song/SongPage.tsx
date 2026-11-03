import Link from "next/link";
import { messages, type Locale } from "@/modules/i18n";
import { siteUrl } from "@/modules/site";
import Lyrics from "./Lyrics";
import ShareSong from "./ShareSong";
import { Video } from "@/modules/youtube";
import { Body } from "@/modules/content";
import { ButtonLink } from "@/ui";
import type { Post } from "@/modules/content";

export default function SongPage({
  post,
  locale,
}: {
  post: Post;
  locale: Locale;
}) {
  const t = messages[locale];
  const slug = post.slug;
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
