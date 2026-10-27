import type { Post } from "../content";

/** Contract for reading published music posts from a content source. */
export interface PostsRepository {
  getAll(): Promise<Post[]>;
  getBySlug(slug: string): Promise<Post | undefined>;
}
