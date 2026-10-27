"use client";

import { messages } from "../lib/i18n";
import { usePreferences } from "../preferences";

export default function ThemeControl() {
  const { locale, setTheme, theme } = usePreferences();
  const t = messages[locale];

  return (
    <label className="theme-control">
      <span>{t.theme}</span>
      <select
        aria-label={t.theme}
        value={theme}
        onChange={(event) => {
          const value = event.currentTarget.value;
          if (value === "system" || value === "light" || value === "dark") {
            setTheme(value);
          }
        }}
      >
        <option value="system">{t.themeOptions.system}</option>
        <option value="light">{t.themeOptions.light}</option>
        <option value="dark">{t.themeOptions.dark}</option>
      </select>
    </label>
  );
}
