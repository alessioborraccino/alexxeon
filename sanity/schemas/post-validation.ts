export function validatePostTitle(value: unknown): true | string {
  return typeof value === "string" && value.trim().length > 0
    ? true
    : "Enter a post title.";
}

export function validatePostSlug(value: unknown): true | string {
  const current =
    typeof value === "object" &&
    value !== null &&
    "current" in value &&
    typeof value.current === "string"
      ? value.current
      : undefined;

  return typeof current === "string" &&
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(current)
    ? true
    : "Use lowercase letters, numbers, and hyphens.";
}

export function validateYoutubeUrl(value: unknown): true | string {
  if (typeof value !== "string" || value.length === 0) return true;
  try {
    const url = new URL(value);
    if (
      !["https:", "http:"].includes(url.protocol) ||
      ![
        "youtube.com",
        "www.youtube.com",
        "m.youtube.com",
        "youtu.be",
        "youtube-nocookie.com",
        "www.youtube-nocookie.com",
      ].includes(url.hostname.toLowerCase())
    ) {
      return "Use a valid YouTube or youtu.be URL.";
    }
    const id =
      url.hostname === "youtu.be"
        ? url.pathname.slice(1)
        : url.searchParams.get("v") ||
          url.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/)?.[1];
    return id && /^[a-zA-Z0-9_-]{11}$/.test(id)
      ? true
      : "Use a valid YouTube video URL.";
  } catch {
    return "Use a valid YouTube video URL.";
  }
}
