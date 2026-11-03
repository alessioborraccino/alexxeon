import type { Post } from "./post";
import type { Locale } from "@/modules/i18n";

/** Contract for reading published music posts from a content source. */
export interface PostsRepository {
  getAll(locale: Locale): Promise<Post[]>;
  getBySlug(locale: Locale, slug: string): Promise<Post | undefined>;
}
