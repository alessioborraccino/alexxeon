export {
  PreferencesProvider,
  usePreferences,
  type PreferencesContextValue,
} from "./internal/PreferencesProvider";
export { getPreferredLocale, isTheme, type Theme } from "./internal/model";
export { readLanguagePreference } from "./internal/storage";
export { ThemeScript } from "./internal/ThemeScript";
