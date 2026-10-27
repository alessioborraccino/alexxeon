import HomePage from "../features/music/HomePage";
import { getPosts } from "../lib/posts";
import { pageMetadata } from "../lib/site";
export const metadata = pageMetadata(
  "Alexx Eon — Music & Electronic Covers",
  "Discover Alexx Eon’s music: electronic covers, reimagined pop songs, and intimate performances. Watch the latest videos and meet the artist.",
);
export default async function Home() {
  const posts = await getPosts();
  return <HomePage posts={posts} />;
}
