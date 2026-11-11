import { hasLocale, locales, type Locale } from "@/modules/i18n";

export type Theme = "system" | "light" | "dark";

export function isTheme(value: string | null): value is Theme {
  return value === "system" || value === "light" || value === "dark";
}

export function getPreferredLocale(
  savedLocale: string | null,
  languages: readonly string[],
): Locale {
  if (hasLocale(savedLocale)) return savedLocale;

  for (const language of languages) {
    const baseLanguage = language.toLowerCase().split(/[-_]/, 1)[0];
    if (hasLocale(baseLanguage)) return baseLanguage;
  }

  return "en";
}

export function replacePathLocale(pathname: string, locale: Locale): string {
  const localePrefix = new RegExp(`^/(?:${locales.join("|")})(?=/|$)`);
  return pathname.replace(localePrefix, `/${locale}`);
}
