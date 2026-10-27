import Link from "next/link";
import Video from "../../components/Video";
import type { Post } from "../../lib/content";
import { messages, type Locale } from "../../lib/i18n";

interface HomePageProps {
  posts: Post[];
  locale: Locale;
}

export default function HomePage({ posts, locale }: HomePageProps) {
  const t = messages[locale];
  const featuredPost = posts[0];

  return (
    <main id="main">
      <section className="hero">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1>Alexx Eon</h1>
        <p>{t.heroLead}</p>
        <p>{t.heroDetail}</p>
        {featuredPost && (
          <Link
            className="button"
            href={`/${locale}/music/${featuredPost.slug}/`}
          >
            {t.listenTo} {featuredPost.title}
          </Link>
        )}
      </section>
      <section className="section" id="music">
        <h2>{t.musicHeading}</h2>
        <div className="music-grid">
          {posts.map((post, index) => (
            <article className="card" key={post._id}>
              <h3>
                <Link href={`/${locale}/music/${post.slug}/`}>
                  {post.title}
                </Link>
              </h3>
              <Video id={post.videoId} title={post.title} eager={index === 0} />
              <p>{post.description}</p>
              <Link href={`/${locale}/music/${post.slug}/`}>
                {t.aboutCover}
                <span className="sr-only">: {post.title}</span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
