import assert from "node:assert/strict";
import test from "node:test";
import {
  getPreferredLocale,
  isTheme,
  replacePathLocale,
} from "@/modules/preferences/internal/model";

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

test("shared locale validation rejects null and unsupported values", async () => {
  const { hasLocale } = await import("@/modules/i18n");
  for (const locale of ["en", "it", "de"])
    assert.equal(hasLocale(locale), true);
  for (const locale of [null, "", "fr", "EN"])
    assert.equal(hasLocale(locale), false);
});

test("preference storage preserves keys, defaults, and blocked-storage behavior", async (t) => {
  const {
    readThemePreference,
    readLanguagePreference,
    saveThemePreference,
    saveLanguagePreference,
  } = await import("@/modules/preferences/internal/storage");
  const original = Object.getOwnPropertyDescriptor(globalThis, "window");
  t.after(() => {
    if (original) Object.defineProperty(globalThis, "window", original);
    else Reflect.deleteProperty(globalThis, "window");
  });
  const values = new Map<string, string>();
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: {
      localStorage: {
        getItem: (key: string) => values.get(key) ?? null,
        setItem: (key: string, value: string) => values.set(key, value),
      },
    },
  });
  assert.equal(readThemePreference(), "system");
  assert.equal(readLanguagePreference(), null);
  saveThemePreference("dark");
  saveLanguagePreference("it");
  assert.equal(values.get("alexxeon-theme"), "dark");
  assert.equal(values.get("alexxeon-language"), "it");
  assert.equal(readThemePreference(), "dark");
  assert.equal(readLanguagePreference(), "it");
  values.set("alexxeon-theme", "sepia");
  assert.equal(readThemePreference(), "system");
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: {
      get localStorage() {
        throw new Error("Storage blocked");
      },
    },
  });
  assert.equal(readThemePreference(), "system");
  assert.equal(readLanguagePreference(), null);
  assert.doesNotThrow(() => saveThemePreference("light"));
  assert.doesNotThrow(() => saveLanguagePreference("de"));
});
