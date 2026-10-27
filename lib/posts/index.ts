import { cache } from "react";
import { StaticJsonPostsRepository } from "./static-json-posts-repository";

const repository = new StaticJsonPostsRepository();

/** Shared, request-cached access to published music posts. */
export const getPosts = cache(() => repository.getAll());

/** Shared, request-cached lookup for one published music post. */
export const getPostBySlug = cache((slug: string) =>
  repository.getBySlug(slug),
);
