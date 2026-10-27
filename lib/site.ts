import type { Metadata } from "next";

export const siteUrl = "https://www.alexxeon.com";
export const socials = [
  ["YouTube", "https://www.youtube.com/channel/UCuV3i0Oz0Q-XnOuUyFlfVVA"],
  ["Instagram", "https://www.instagram.com/alexx.eon"],
  ["SoundCloud", "https://soundcloud.com/user-87781037"],
  ["TikTok", "https://tiktok.com/@alexx.eon"],
  ["Facebook", "https://www.facebook.com/Alexx-Eon-107623971924941"],
  ["X", "https://twitter.com/EonAlexx"],
] as const;
export function pageMetadata(
  title: string,
  description: string,
  path = "/",
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: siteUrl + path },
    openGraph: {
      title,
      description,
      url: siteUrl + path,
      type: "website",
      siteName: "Alexx Eon",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Alexx Eon — music and electronic covers",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.jpg"],
    },
  };
}
