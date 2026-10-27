"use client";

import { useEffect } from "react";
import { locales, type Locale } from "../lib/i18n";

const storageKey = "alexxeon-language";

function isLocale(value: string | null): value is Locale {
  return value !== null && locales.some((locale) => locale === value);
}

function preferredLocale(languages: readonly string[]): Locale {
  for (const language of languages) {
    const baseLanguage = language.toLowerCase().split(/[-_]/, 1)[0];
    if (isLocale(baseLanguage)) return baseLanguage;
  }
  return "en";
}

export default function LanguageRedirect() {
  useEffect(() => {
    let locale: Locale;
    try {
      const savedLocale = window.localStorage.getItem(storageKey);
      locale = isLocale(savedLocale)
        ? savedLocale
        : preferredLocale(
            navigator.languages?.length
              ? navigator.languages
              : [navigator.language],
          );
    } catch {
      locale = preferredLocale(
        navigator.languages?.length
          ? navigator.languages
          : [navigator.language],
      );
    }
    window.location.replace(`/${locale}/`);
  }, []);

  return <p role="status">Loading…</p>;
}
