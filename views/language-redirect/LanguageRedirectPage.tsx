"use client";

import { Page } from "@/ui";

import { useEffect } from "react";
import { localeNames, locales } from "@/modules/i18n";
import {
  getPreferredLocale,
  readLanguagePreference,
} from "@/modules/preferences";

export default function LanguageRedirect() {
  useEffect(() => {
    const locale = getPreferredLocale(
      readLanguagePreference(),
      navigator.languages?.length ? navigator.languages : [navigator.language],
    );
    window.location.replace(`/${locale}/`);
  }, []);

  return (
    <Page className="section">
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
    </Page>
  );
}
