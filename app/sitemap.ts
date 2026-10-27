import { getPosts } from "../lib/posts";
import { siteUrl } from "../lib/site";
export const dynamic = "force-static";
export default async function sitemap() {
  return [
    { url: `${siteUrl}/` },
    { url: `${siteUrl}/bio/` },
    ...(await getPosts()).map((post) => ({
      url: `${siteUrl}/music/${post.slug}/`,
      lastModified: post._updatedAt,
    })),
  ];
}
