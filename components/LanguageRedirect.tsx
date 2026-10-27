"use client";

import { useEffect } from "react";
import { getPreferredLocale, readLanguagePreference } from "../preferences";

export default function LanguageRedirect() {
  useEffect(() => {
    const locale = getPreferredLocale(
      readLanguagePreference(),
      navigator.languages?.length ? navigator.languages : [navigator.language],
    );
    window.location.replace(`/${locale}/`);
  }, []);

  return <p role="status">Loading…</p>;
}
