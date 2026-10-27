import { test } from "node:test";
import assert from "node:assert/strict";
import { youtubeId, normalizePosts } from "../lib/content";
import type { PortableTextBlock } from "@portabletext/types";
test("YouTube links support existing embeds, short links, and Shorts without accepting other hosts", () => {
  for (const url of [
    "https://www.youtube.com/watch?v=imdZTBMk-Kc",
    "https://youtu.be/imdZTBMk-Kc?t=3",
    "https://youtube.com/shorts/imdZTBMk-Kc",
    "https://www.youtube-nocookie.com/embed/imdZTBMk-Kc",
  ])
    assert.equal(youtubeId(url), "imdZTBMk-Kc");
  for (const url of [
    null,
    "",
    "https://evil.test/watch?v=imdZTBMk-Kc",
    "https://youtube.com/watch?v=bad",
    "javascript:alert(1)",
  ])
    assert.equal(youtubeId(url), null);
});
test("Published songs keep full body and receive stable slugs and readable descriptions", () => {
  const body: PortableTextBlock[] = [
    {
      _type: "block",
      _key: "first",
      style: "normal",
      markDefs: [],
      children: [
        { _type: "span", _key: "one", text: "First ", marks: [] },
        { _type: "span", _key: "two", text: "paragraph.", marks: [] },
      ],
    },
    {
      _type: "block",
      _key: "second",
      style: "normal",
      markDefs: [],
      children: [
        { _type: "span", _key: "three", text: "Second paragraph.", marks: [] },
      ],
    },
  ];
  const [post] = normalizePosts([
    { _id: "1", title: "Song", slug: { current: "song" }, body },
  ]);
  assert.equal(post.slug, "song");
  assert.equal(post.description, "First paragraph. Second paragraph.");
  assert.deepEqual(post.body, body);
  assert.equal(post.videoId, null);
});
test("Bad or duplicate URLs stop a build instead of silently dropping content", () => {
  for (const slug of [undefined, "../bad", "with spaces"])
    assert.throws(() =>
      normalizePosts([{ _id: "1", title: "Song", slug: { current: slug } }]),
    );
  const post = { _id: "1", title: "Song", slug: { current: "song" } };
  assert.throws(() => normalizePosts([post, { ...post, _id: "2" }]));
});
