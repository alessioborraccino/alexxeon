"use client";

import { localeNames, locales, messages } from "../lib/i18n";
import { isLocale, usePreferences } from "../preferences";
import ThemeControl from "./ThemeControl";

export default function Preferences() {
  const { locale, setLanguage } = usePreferences();
  const t = messages[locale];

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
            onChange={(event) => {
              const value = event.currentTarget.value;
              if (isLocale(value)) setLanguage(value);
            }}
          >
            {locales.map((item) => (
              <option value={item} key={item}>
                {localeNames[item]}
              </option>
            ))}
          </select>
        </label>
        <ThemeControl />
      </div>
    </main>
  );
}
