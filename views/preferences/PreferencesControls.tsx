"use client";
import { hasLocale, localeNames, locales, messages } from "@/modules/i18n";
import { usePreferences } from "@/modules/preferences";
import { SelectField } from "@/ui";
import ThemeControl from "./ThemeControl";

export default function PreferencesControls() {
  const { locale, setLanguage } = usePreferences();
  const t = messages[locale];
  return (
    <div className="preferences__controls">
      <SelectField
        containerClassName="language-control"
        label={t.language}
        value={locale}
        onChange={(event) => {
          const value = event.currentTarget.value;
          if (hasLocale(value)) setLanguage(value);
        }}
      >
        {locales.map((item) => (
          <option value={item} key={item}>
            {localeNames[item]}
          </option>
        ))}
      </SelectField>
      <ThemeControl />
    </div>
  );
}
