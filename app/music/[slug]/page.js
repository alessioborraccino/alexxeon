import Link from "next/link";
import { notFound } from "next/navigation";
import { getPosts } from "../../../lib/posts.mjs";
import { pageMetadata } from "../../../lib/site.mjs";
import Video from "../../../components/Video";
import Body from "../../../components/Body";
export const dynamicParams = false;
export async function generateStaticParams() {
  return (await getPosts()).map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = (await getPosts()).find((p) => p.slug === slug);
  return post
    ? pageMetadata(post.title, post.description, `/music/${slug}/`)
    : {};
}
export default async function Song({ params }) {
  const { slug } = await params;
  const post = (await getPosts()).find((p) => p.slug === slug);
  if (!post) notFound();
  return (
    <main id="main" className="section song">
      <Link href="/#music">← All music</Link>
      <h1>{post.title}</h1>
      <p className="eyebrow">Alexx Eon’s version</p>
      <Video id={post.videoId} title={post.title} eager />
      <div className="prose">
        <Body value={post.body} />
      </div>
      {post.videoId && (
        <a
          className="button"
          href={`https://www.youtube.com/watch?v=${post.videoId}`}
        >
          Watch on YouTube
        </a>
      )}
    </main>
  );
}
