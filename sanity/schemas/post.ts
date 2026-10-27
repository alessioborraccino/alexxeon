import { defineType } from "sanity";
import { validatePostSlug, validatePostTitle } from "./post-validation";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "language",
      title: "Language",
      type: "string",
      readOnly: true,
      hidden: true,
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().custom(validatePostTitle),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (Rule) => Rule.required().custom(validatePostSlug),
      options: {
        source: "title",
        maxLength: 96,
        // Localized documents intentionally share slugs across languages.
        isUnique: () => true,
      },
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" },
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "mainVideo",
      title: "Main video",
      type: "youtube",
      options: {
        hotspot: true,
      },
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent",
    },
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      });
    },
  },
});
