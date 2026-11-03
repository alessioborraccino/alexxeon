import type { PortableTextBlock } from "@portabletext/types";

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
