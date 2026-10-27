import assert from "node:assert/strict";
import test from "node:test";
import {
  getPreferredLocale,
  isTheme,
  replacePathLocale,
} from "../preferences/model";

test("theme validation accepts only supported theme options", () => {
  assert.equal(isTheme("system"), true);
  assert.equal(isTheme("light"), true);
  assert.equal(isTheme("dark"), true);
  assert.equal(isTheme("sepia"), false);
  assert.equal(isTheme(null), false);
});

test("saved language preference takes priority over device languages", () => {
  assert.equal(getPreferredLocale("it", ["de-DE", "en-US"]), "it");
});

test("device language matching uses browser language order and base tags", () => {
  assert.equal(getPreferredLocale(null, ["fr-FR", "de-DE", "it-IT"]), "de");
  assert.equal(getPreferredLocale(null, ["fr-FR", "it_IT"]), "it");
});

test("unsupported saved and device languages fall back to English", () => {
  assert.equal(getPreferredLocale("fr", ["fr-FR", "es-ES"]), "en");
});

test("language route replacement keeps current path and query", () => {
  assert.equal(
    replacePathLocale("/en/preferences?view=theme", "it"),
    "/it/preferences?view=theme",
  );
});
