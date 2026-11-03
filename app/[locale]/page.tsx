import HomePage from "@/views/home";
import { hasLocale, messages } from "@/modules/i18n";
import { getPosts } from "@/modules/content/server";
import { pageMetadata } from "@/modules/site";
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
