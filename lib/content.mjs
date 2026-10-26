export function youtubeId(value) {
  try {
    const url = new URL(value);
    if (!["https:", "http:"].includes(url.protocol)) return null;
    const host = url.hostname.toLowerCase();
    let id;
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
    return /^[a-zA-Z0-9_-]{11}$/.test(id || "") ? id : null;
  } catch {
    return null;
  }
}
export function plainText(body = []) {
  return body
    .filter((block) => block._type === "block")
    .map((block) =>
      (block.children || []).map((child) => child.text || "").join(""),
    )
    .join(" ")
    .trim();
}
export function normalizePosts(posts) {
  const slugs = new Set();
  return posts.map((post) => {
    const slug = post.slug?.current;
    if (
      !post.title ||
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug || "") ||
      slugs.has(slug)
    ) {
      throw new Error(
        `Post ${post._id} needs a unique URL-safe slug and title before publishing.`,
      );
    }
    slugs.add(slug);
    return {
      ...post,
      slug,
      videoId: youtubeId(post.mainVideo?.url),
      description:
        plainText(post.body).slice(0, 160) ||
        `Listen to ${post.title} by Alexx Eon.`,
    };
  });
}
