export default {
  name: "youtube",
  type: "object",
  title: "YouTube Embed",
  fields: [{ name: "url", type: "url", title: "YouTube video URL" }],
  preview: {
    select: { title: "url" },
    prepare: ({ title }) => ({ title: title || "YouTube video" }),
  },
};
