import { defineType } from "sanity";
import { validateYoutubeUrl } from "./post-validation";

export default defineType({
  name: "youtube",
  type: "object",
  title: "YouTube Embed",
  fields: [
    {
      name: "url",
      type: "url",
      title: "YouTube video URL",
      validation: (Rule) => Rule.custom(validateYoutubeUrl),
    },
  ],
  preview: {
    select: { title: "url" },
    prepare: ({ title }) => ({ title: title || "YouTube video" }),
  },
});
