import { test } from "node:test";
import assert from "node:assert/strict";
import {
  validatePostTitle,
  validatePostSlug,
  validateYoutubeUrl,
} from "../sanity/schemas/post-validation";

test("Sanity post slug validation accepts URL-safe slugs only", () => {
  assert.equal(validatePostSlug({ current: "the-loneliest-2026" }), true);
  for (const current of ["Uppercase", "two words", "../path", "a_b", ""])
    assert.equal(typeof validatePostSlug({ current }), "string");
  assert.equal(typeof validatePostSlug(null), "string");
});

test("Sanity post title validation rejects missing and whitespace-only titles", () => {
  assert.equal(validatePostTitle("A song"), true);
  for (const title of [undefined, null, "", "   "])
    assert.equal(typeof validatePostTitle(title), "string");
});

test("Sanity YouTube validation accepts supported links and rejects unsafe URLs", () => {
  for (const url of [
    "https://www.youtube.com/watch?v=imdZTBMk-Kc",
    "https://youtu.be/imdZTBMk-Kc?t=5",
    "https://youtube.com/shorts/imdZTBMk-Kc",
  ])
    assert.equal(validateYoutubeUrl(url), true);
  for (const url of [
    "https://example.com/watch?v=imdZTBMk-Kc",
    "javascript:alert(1)",
    "https://youtu.be/not-a-video-id",
  ])
    assert.equal(typeof validateYoutubeUrl(url), "string");
  assert.equal(validateYoutubeUrl(undefined), true);
});
