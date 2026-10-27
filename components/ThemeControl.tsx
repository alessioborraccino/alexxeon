"use client";

import { useEffect, useState } from "react";
import { messages, type Locale } from "../lib/i18n";

type Theme = "system" | "light" | "dark";
const storageKey = "alexxeon-theme";

function isTheme(value: string | null): value is Theme {
  return value === "system" || value === "light" || value === "dark";
}

export default function ThemeControl({ locale }: { locale: Locale }) {
  const t = messages[locale];
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    let initialTheme: Theme = "system";
    try {
      const savedTheme = window.localStorage.getItem(storageKey);
      if (isTheme(savedTheme)) initialTheme = savedTheme;
    } catch {
      // Use the device theme when browser storage is unavailable.
    }

    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
  }, []);

  function changeTheme(value: string) {
    if (!isTheme(value)) return;
    setTheme(value);
    document.documentElement.dataset.theme = value;
    try {
      window.localStorage.setItem(storageKey, value);
    } catch {
      // The selection still applies for this page view without storage.
    }
  }

  return (
    <label className="theme-control">
      <span>{t.theme}</span>
      <select
        aria-label={t.theme}
        value={theme}
        onChange={(event) => changeTheme(event.currentTarget.value)}
      >
        <option value="system">{t.themeOptions.system}</option>
        <option value="light">{t.themeOptions.light}</option>
        <option value="dark">{t.themeOptions.dark}</option>
      </select>
    </label>
  );
}
