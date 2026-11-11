import {
  resolveLocaleParams,
  type LocalizedPageProps,
} from "@/modules/i18n/server";
import HomePage from "@/views/home";
import { messages } from "@/modules/i18n";
import { getPosts } from "@/modules/content/server";
import { pageMetadata } from "@/modules/site";

type HomeProps = LocalizedPageProps;

export async function generateMetadata({ params }: HomeProps) {
  const { locale: value } = await resolveLocaleParams(params);
  const t = messages[value];
  return pageMetadata(t.titles.home, t.descriptions.home, `/${value}/`, true);
}

export default async function Home({ params }: HomeProps) {
  const { locale: value } = await resolveLocaleParams(params);
  const posts = await getPosts(value);
  return <HomePage posts={posts} locale={value} />;
}
