import de from "../messages/de.json";
import en from "../messages/en.json";
import it from "../messages/it.json";

export const locales = ["en", "it", "de"] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "English",
  it: "Italiano",
  de: "Deutsch",
};

export const messages = { en, it, de };
export type Messages = (typeof messages)[Locale];

export function hasLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}
