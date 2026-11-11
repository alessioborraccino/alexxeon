import assert from "node:assert/strict";
import test from "node:test";
import { resolveLocaleParams } from "@/modules/i18n/server";

test("locale resolution preserves song parameters for every supported language", async () => {
  for (const locale of ["en", "it", "de"]) {
    const params = { locale, slug: "the-loneliest" };
    assert.deepEqual(
      await resolveLocaleParams(Promise.resolve(params)),
      params,
    );
  }
});

test("unsupported locales use Next's not-found response", async () => {
  await assert.rejects(
    resolveLocaleParams(Promise.resolve({ locale: "xx" })),
    (error: unknown) =>
      error instanceof Error &&
      "digest" in error &&
      error.digest === "NEXT_HTTP_ERROR_FALLBACK;404",
  );
});
