"use client";

import { useEffect } from "react";
import { localeNames, locales } from "../lib/i18n";
import { getPreferredLocale, readLanguagePreference } from "../preferences";

export default function LanguageRedirect() {
  useEffect(() => {
    const locale = getPreferredLocale(
      readLanguagePreference(),
      navigator.languages?.length ? navigator.languages : [navigator.language],
    );
    window.location.replace(`/${locale}/`);
  }, []);

  return (
    <main id="main" className="section">
      <p role="status">Loading…</p>
      <nav aria-label="Choose your language">
        <ul>
          {locales.map((locale) => (
            <li key={locale}>
              <a href={`/${locale}/`} lang={locale} hrefLang={locale}>
                {localeNames[locale]}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
