import { test } from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Lyrics from "../components/Lyrics";

test("lyrics render safely with line breaks and localized headings", () => {
  for (const [locale, heading] of [
    ["en", "Lyrics"],
    ["it", "Testo"],
    ["de", "Songtext"],
  ] as const) {
    const html = renderToStaticMarkup(
      createElement(Lyrics, {
        locale,
        lyrics: "First line\n\n<script>alert(1)</script>",
      }),
    );
    assert.ok(html.includes(heading));
    assert.ok(html.includes("First line\n\n&lt;script&gt;"));
    assert.ok(!html.includes("<script>"));
  }
});

test("missing or blank lyrics do not render a section", () => {
  for (const lyrics of [undefined, null, "", " \n "]) {
    assert.equal(
      renderToStaticMarkup(createElement(Lyrics, { locale: "en", lyrics })),
      "",
    );
  }
});
