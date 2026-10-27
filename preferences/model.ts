import { locales, type Locale } from "../lib/i18n";

export type Theme = "system" | "light" | "dark";

export const themeStorageKey = "alexxeon-theme";
export const languageStorageKey = "alexxeon-language";

export function isTheme(value: string | null): value is Theme {
  return value === "system" || value === "light" || value === "dark";
}

export function isLocale(value: string | null): value is Locale {
  return value !== null && locales.some((locale) => locale === value);
}

export function getPreferredLocale(
  savedLocale: string | null,
  languages: readonly string[],
): Locale {
  if (isLocale(savedLocale)) return savedLocale;

  for (const language of languages) {
    const baseLanguage = language.toLowerCase().split(/[-_]/, 1)[0];
    if (isLocale(baseLanguage)) return baseLanguage;
  }

  return "en";
}

export function replacePathLocale(pathname: string, locale: Locale): string {
  const localePrefix = new RegExp(`^/(?:${locales.join("|")})(?=/|$)`);
  return pathname.replace(localePrefix, `/${locale}`);
}

export function readThemePreference(): Theme {
  try {
    const savedTheme = window.localStorage.getItem(themeStorageKey);
    return isTheme(savedTheme) ? savedTheme : "system";
  } catch {
    return "system";
  }
}

export function saveThemePreference(theme: Theme): void {
  try {
    window.localStorage.setItem(themeStorageKey, theme);
  } catch {
    // The selected theme still applies for this page view without storage.
  }
}

export function readLanguagePreference(): string | null {
  try {
    return window.localStorage.getItem(languageStorageKey);
  } catch {
    return null;
  }
}

export function saveLanguagePreference(locale: Locale): void {
  try {
    window.localStorage.setItem(languageStorageKey, locale);
  } catch {
    // The route change still applies for this page view without storage.
  }
}

export const themeBootstrapScript = `(() => { try { const theme = localStorage.getItem("${themeStorageKey}"); document.documentElement.dataset.theme = theme === "light" || theme === "dark" ? theme : "system"; } catch { document.documentElement.dataset.theme = "system"; } })();`;
