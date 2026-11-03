import type { PortableTextBlock } from "@portabletext/types";

export interface Post {
  _id: string;
  title: string;
  slug: string;
  body?: PortableTextBlock[] | null;
  lyrics?: string | null;
  mainVideo?: { url?: string | null } | null;
  publishedAt?: string | null;
  _updatedAt?: string | null;
  videoId: string | null;
  description: string;
}
