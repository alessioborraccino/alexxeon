import type { PortableTextBlock } from "@portabletext/types";

export interface SanityPostInput {
  _id: string;
  title?: string | null;
  slug?: { current?: string | null } | null;
  body?: PortableTextBlock[] | null;
  mainVideo?: { url?: string | null } | null;
  publishedAt?: string | null;
  _updatedAt?: string | null;
}

export interface Post {
  _id: string;
  title: string;
  slug: string;
  body?: PortableTextBlock[] | null;
  mainVideo?: { url?: string | null } | null;
  publishedAt?: string | null;
  _updatedAt?: string | null;
  videoId: string | null;
  description: string;
}

export function youtubeId(value?: string | null): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (!["https:", "http:"].includes(url.protocol)) return null;
    const host = url.hostname.toLowerCase();
    let id: string | null | undefined;
    if (host === "youtu.be") id = url.pathname.slice(1);
    else if (
      [
        "youtube.com",
        "www.youtube.com",
        "m.youtube.com",
        "www.youtube-nocookie.com",
        "youtube-nocookie.com",
      ].includes(host)
    ) {
      id =
        url.searchParams.get("v") ||
        url.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/)?.[1];
    }
    const candidate = id || "";
    return /^[a-zA-Z0-9_-]{11}$/.test(candidate) ? candidate : null;
  } catch {
    return null;
  }
}

export function plainText(body?: PortableTextBlock[] | null): string {
  if (!body) return "";
  return body
    .filter((block) => block._type === "block")
    .map((block) => {
      if (block._type !== "block") return "";
      return block.children
        .map((child) =>
          "text" in child && typeof child.text === "string" ? child.text : "",
        )
        .join("");
    })
    .join(" ")
    .trim();
}

export function normalizePosts(posts: SanityPostInput[]): Post[] {
  const slugs = new Set<string>();
  return posts.map((post) => {
    const slug = post.slug?.current;
    const videoUrl = post.mainVideo?.url;
    const videoId = youtubeId(videoUrl);
    if (
      typeof post.title !== "string" ||
      post.title.trim().length === 0 ||
      typeof slug !== "string" ||
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ||
      slugs.has(slug)
    ) {
      throw new Error(
        `Post ${post._id} needs a unique URL-safe slug and title before publishing.`,
      );
    }
    if (videoUrl && !videoId) {
      throw new Error(
        `Post ${post._id} has an invalid YouTube URL. Use a valid youtube.com or youtu.be video link.`,
      );
    }
    if (post.body != null && !Array.isArray(post.body)) {
      throw new Error(`Post ${post._id} body must be a Portable Text array.`);
    }
    for (const block of post.body || []) {
      const value = block as unknown as Record<string, unknown>;
      if (!block || typeof value._type !== "string") {
        throw new Error(
          `Post ${post._id} body contains a block without a valid _type.`,
        );
      }
      if (
        value._type === "block" &&
        (!Array.isArray(value.children) ||
          value.children.some(
            (child) =>
              !child ||
              typeof child !== "object" ||
              !("text" in child) ||
              typeof child.text !== "string",
          ))
      ) {
        throw new Error(
          `Post ${post._id} contains malformed Portable Text. Check its text blocks.`,
        );
      }
      if (value._type === "youtube" && !youtubeId(value.url as string)) {
        throw new Error(
          `Post ${post._id} body contains an invalid YouTube video URL.`,
        );
      }
      if (value._type === "image") {
        const asset = value.asset as { _ref?: unknown } | undefined;
        if (
          typeof asset?._ref !== "string" ||
          !/^image-.+-\d+x\d+-\w+$/.test(asset._ref)
        ) {
          throw new Error(
            `Post ${post._id} body contains an invalid image asset.`,
          );
        }
      }
      if (!["block", "youtube", "image"].includes(value._type)) {
        throw new Error(
          `Post ${post._id} body contains unsupported block type ${value._type}.`,
        );
      }
    }
    slugs.add(slug);
    return {
      _id: post._id,
      title: post.title,
      slug,
      body: post.body,
      mainVideo: post.mainVideo,
      publishedAt: post.publishedAt,
      _updatedAt: post._updatedAt,
      videoId,
      description:
        plainText(post.body || []).slice(0, 160) ||
        `Listen to ${post.title} by Alexx Eon.`,
    };
  });
}
