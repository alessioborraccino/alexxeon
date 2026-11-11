import type { Locale } from "@/modules/i18n";
import { isTheme, type Theme } from "./model";

export const themeStorageKey = "alexxeon-theme";
export const languageStorageKey = "alexxeon-language";

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
