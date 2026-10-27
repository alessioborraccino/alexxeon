import Link from "next/link";
import Video from "../../components/Video";
import type { Post } from "../../lib/content";

interface HomePageProps {
  posts: Post[];
}

export default function HomePage({ posts }: HomePageProps) {
  const featuredPost = posts[0];

  return (
    <main id="main">
      <section className="hero">
        <p className="eyebrow">Music, reimagined.</p>
        <h1>Alexx Eon</h1>
        <p>Electronic sounds. Familiar songs. A personal twist.</p>
        <p>
          Discover covers shaped by a love of piano, singing, and electronic
          music.
        </p>
        {featuredPost && (
          <Link className="button" href={`/music/${featuredPost.slug}/`}>
            Listen to {featuredPost.title}
          </Link>
        )}
      </section>
      <section className="section" id="music">
        <h2>Music &amp; covers</h2>
        <div className="music-grid">
          {posts.map((post, index) => (
            <article className="card" key={post._id}>
              <h3>
                <Link href={`/music/${post.slug}/`}>{post.title}</Link>
              </h3>
              <Video id={post.videoId} title={post.title} eager={index === 0} />
              <p>{post.description}</p>
              <Link href={`/music/${post.slug}/`}>
                About this cover<span className="sr-only">: {post.title}</span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
