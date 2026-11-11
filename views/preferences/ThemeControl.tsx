"use client";

import { messages } from "@/modules/i18n";
import { SelectField } from "@/ui";
import { isTheme, usePreferences } from "@/modules/preferences";

export default function ThemeControl() {
  const { locale, setTheme, theme } = usePreferences();
  const t = messages[locale];

  return (
    <SelectField
      containerClassName="theme-control"
      label={t.theme}
      value={theme}
      onChange={(event) => {
        const value = event.currentTarget.value;
        if (isTheme(value)) {
          setTheme(value);
        }
      }}
    >
      <option value="system">{t.themeOptions.system}</option>
      <option value="light">{t.themeOptions.light}</option>
      <option value="dark">{t.themeOptions.dark}</option>
    </SelectField>
  );
}
