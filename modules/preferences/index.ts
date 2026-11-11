export {
  PreferencesProvider,
  usePreferences,
  type PreferencesContextValue,
} from "./internal/PreferencesProvider";
export {
  getPreferredLocale,
  isLocale,
  isTheme,
  languageStorageKey,
  readLanguagePreference,
  readThemePreference,
  replacePathLocale,
  saveLanguagePreference,
  saveThemePreference,
  themeBootstrapScript,
  themeStorageKey,
  type Theme,
} from "./internal/model";
export { ThemeScript } from "./internal/ThemeScript";
