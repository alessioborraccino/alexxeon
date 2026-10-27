import { test } from "node:test";
import assert from "node:assert/strict";
import { youtubeId, normalizePosts, orderPostsLike } from "../lib/content";
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

test("translated posts keep canonical language order", () => {
  const reference = ["newest", "middle", "oldest"].map((slug) => ({ slug }));
  const translated = ["oldest", "newest", "middle"].map((slug) => ({ slug }));
  assert.deepEqual(orderPostsLike(translated, reference), reference);
});
test("Bad or duplicate URLs stop a build instead of silently dropping content", () => {
  for (const slug of [undefined, "../bad", "with spaces"])
    assert.throws(() =>
      normalizePosts([{ _id: "1", title: "Song", slug: { current: slug } }]),
    );
  assert.throws(() =>
    normalizePosts([{ _id: "1", title: "   ", slug: { current: "song" } }]),
  );
  const post = { _id: "1", title: "Song", slug: { current: "song" } };
  assert.throws(() => normalizePosts([post, { ...post, _id: "2" }]));
});

test("Invalid YouTube links and malformed Portable Text stop a build clearly", () => {
  const validPost = { _id: "1", title: "Song", slug: { current: "song" } };
  assert.throws(
    () =>
      normalizePosts([
        { ...validPost, mainVideo: { url: "https://example.com/video" } },
      ]),
    /Post 1 has an invalid YouTube URL/,
  );
  assert.throws(
    () =>
      normalizePosts([{ ...validPost, body: [{ _type: undefined } as never] }]),
    /body contains a block without a valid _type/,
  );
  assert.throws(
    () =>
      normalizePosts([
        {
          ...validPost,
          body: [{ _type: "block", children: undefined } as never],
        },
      ]),
    /contains malformed Portable Text/,
  );
  assert.throws(
    () =>
      normalizePosts([
        { ...validPost, body: [{ _type: "youtube", url: "invalid" } as never] },
      ]),
    /body contains an invalid YouTube video URL/,
  );
});
