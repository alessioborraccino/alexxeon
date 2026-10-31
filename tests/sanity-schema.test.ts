import { test } from "node:test";
import assert from "node:assert/strict";
import {
  validatePostTitle,
  validatePostSlug,
  validateYoutubeUrl,
  isPostSlugUnique,
} from "../sanity/schemas/post-validation";

test("slug uniqueness scopes checks to language and excludes both document versions", async () => {
  for (const language of [undefined, "en", "it", "de"]) {
    for (const unique of [true, false]) {
      const context = {
        document: { _id: "drafts.song", language },
        getClient: () => ({
          fetch: async (
            _query: string,
            params: Record<string, unknown>,
            options: Record<string, unknown>,
          ) => {
            assert.deepEqual(params, {
              slug: "song",
              language: language || "en",
              excludedIds: ["song", "drafts.song"],
            });
            assert.deepEqual(options, { perspective: "raw", useCdn: false });
            return unique;
          },
        }),
      } as unknown as Parameters<typeof isPostSlugUnique>[1];
      assert.equal(await isPostSlugUnique("song", context), unique);
    }
  }
});

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
  for (const value of [undefined, null, "", "   "])
    assert.equal(typeof validateYoutubeUrl(value), "string");
});
