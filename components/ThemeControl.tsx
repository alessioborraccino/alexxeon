"use client";

import { useEffect, useState } from "react";

type Theme = "system" | "light" | "dark";
const storageKey = "alexxeon-theme";

function isTheme(value: string | null): value is Theme {
  return value === "system" || value === "light" || value === "dark";
}

export default function ThemeControl() {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    try {
      const savedTheme = window.localStorage.getItem(storageKey);
      if (isTheme(savedTheme)) setTheme(savedTheme);
    } catch {
      // Keep system theme when browser storage is unavailable.
    }
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
      <span>Theme</span>
      <select
        aria-label="Color theme"
        value={theme}
        onChange={(event) => changeTheme(event.currentTarget.value)}
      >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>
  );
}
