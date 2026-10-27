import { cache } from "react";
import type { Locale } from "../i18n";
import { StaticJsonPostsRepository } from "./static-json-posts-repository";

const repository = new StaticJsonPostsRepository();

/** Shared, request-cached access to published music posts. */
export const getPosts = cache((locale: Locale) => repository.getAll(locale));

/** Shared, request-cached lookup for one published music post. */
export const getPostBySlug = cache((locale: Locale, slug: string) =>
  repository.getBySlug(locale, slug),
);
