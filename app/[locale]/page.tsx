import HomePage from "../../features/music/HomePage";
import { hasLocale, messages } from "../../lib/i18n";
import { getPosts } from "../../lib/posts";
import { pageMetadata } from "../../lib/site";
import { notFound } from "next/navigation";

type HomeProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: HomeProps) {
  const { locale: value } = await params;
  if (!hasLocale(value)) notFound();
  const t = messages[value];
  return pageMetadata(t.titles.home, t.descriptions.home, `/${value}/`, true);
}

export default async function Home({ params }: HomeProps) {
  const { locale: value } = await params;
  if (!hasLocale(value)) notFound();
  const posts = await getPosts(value);
  return <HomePage posts={posts} locale={value} />;
}
