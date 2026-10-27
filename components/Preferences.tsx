"use client";

import { usePathname, useRouter } from "next/navigation";
import { localeNames, locales, messages, type Locale } from "../lib/i18n";
import ThemeControl from "./ThemeControl";

const languageStorageKey = "alexxeon-language";

export default function Preferences({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const t = messages[locale];

  function changeLocale(value: string) {
    if (!locales.some((item) => item === value)) return;
    try {
      window.localStorage.setItem(languageStorageKey, value);
    } catch {
      // The route change still applies for this page view without storage.
    }
    router.push(pathname.replace(/^\/[a-z]{2}(?=\/|$)/, `/${value}`));
  }

  return (
    <main id="main" className="section preferences">
      <h1>{t.preferences}</h1>
      <p>{t.preferencesDescription}</p>
      <div className="preferences__controls">
        <label className="language-control">
          <span>{t.language}</span>
          <select
            aria-label={t.language}
            value={locale}
            onChange={(event) => changeLocale(event.currentTarget.value)}
          >
            {locales.map((item) => (
              <option value={item} key={item}>
                {localeNames[item]}
              </option>
            ))}
          </select>
        </label>
        <ThemeControl locale={locale} />
      </div>
    </main>
  );
}
