"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "../lib/i18n";
import {
  readThemePreference,
  replacePathLocale,
  saveLanguagePreference,
  saveThemePreference,
  type Theme,
} from "./model";

export interface PreferencesContextValue {
  locale: Locale;
  setLanguage(locale: Locale): void;
  setTheme(theme: Theme): void;
  theme: Theme;
}

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

export function PreferencesProvider({
  children,
  locale,
}: {
  children: ReactNode;
  locale: Locale;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [theme, setThemeState] = useState<Theme>("system");

  useEffect(() => {
    const savedTheme = readThemePreference();
    setThemeState(savedTheme);
    document.documentElement.dataset.theme = savedTheme;
  }, []);

  const setTheme = useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    saveThemePreference(nextTheme);
  }, []);

  const setLanguage = useCallback(
    (nextLocale: Locale) => {
      saveLanguagePreference(nextLocale);
      const currentPath = pathname || `/${locale}/`;
      router.push(replacePathLocale(currentPath, nextLocale));
    },
    [locale, pathname, router],
  );

  const value = useMemo(
    () => ({ locale, setLanguage, setTheme, theme }),
    [locale, setLanguage, setTheme, theme],
  );

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences(): PreferencesContextValue {
  const preferences = useContext(PreferencesContext);
  if (!preferences) {
    throw new Error("usePreferences must be used within PreferencesProvider.");
  }
  return preferences;
}
