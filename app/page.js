import Link from "next/link";
import Video from "../components/Video";
import { getPosts } from "../lib/posts.mjs";
import { pageMetadata } from "../lib/site.mjs";
export const metadata = pageMetadata(
  "Alexx Eon — Music & Electronic Covers",
  "Discover Alexx Eon’s music: electronic covers, reimagined pop songs, and intimate performances. Watch the latest videos and meet the artist.",
);
export default async function Home() {
  const posts = await getPosts();
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
        <Link className="button" href={`/music/${posts[0].slug}/`}>
          Listen to {posts[0].title}
        </Link>
      </section>
      <section className="section" id="music">
        <h2>Music & covers</h2>
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
