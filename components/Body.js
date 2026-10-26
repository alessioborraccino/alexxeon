import { PortableText } from "@portabletext/react";
import Video from "./Video";
import { youtubeId } from "../lib/content.mjs";
const components = {
  block: { h1: ({ children }) => <h2>{children}</h2> },
  marks: {
    link: ({ value, children }) => {
      const href = value?.href || "";
      return /^(https?:\/\/|mailto:)/i.test(href) ? (
        <a href={href} rel="noopener noreferrer">
          {children}
        </a>
      ) : (
        <>{children}</>
      );
    },
  },
  types: {
    youtube: ({ value }) => (
      <Video id={youtubeId(value.url)} title="Music video" />
    ),
    image: ({ value }) => {
      const match = value.asset?._ref?.match(/^image-(.+)-(\d+)x(\d+)-(\w+)$/);
      if (!match) return null;
      const [, id, width, height, format] = match;
      return (
        <img
          className="body-image"
          src={`https://cdn.sanity.io/images/nulp5uls/production/${id}-${width}x${height}.${format}?w=1200&auto=format`}
          width={width}
          height={height}
          alt={value.alt || ""}
          loading="lazy"
        />
      );
    },
  },
};
export default function Body({ value }) {
  return <PortableText value={value || []} components={components} />;
}
