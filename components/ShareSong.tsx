"use client";

import { useState } from "react";
import { messages, type Locale } from "../lib/i18n";

export default function ShareSong({
  title,
  url,
  locale,
}: {
  title: string;
  url: string;
  locale: Locale;
}) {
  const t = messages[locale];
  const [status, setStatus] = useState("");
  const [showLink, setShowLink] = useState(false);

  async function share() {
    setStatus("");
    setShowLink(false);
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: `${title} — Alexx Eon`, url });
        return;
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setStatus(t.linkCopied);
    } catch {
      setStatus(t.copyFailed);
      setShowLink(true);
    }
  }

  return (
    <>
      <button type="button" className="button" onClick={share}>
        {t.share}
      </button>
      <span className="share-song__status" role="status">
        {status}
      </span>
      {showLink && (
        <label className="share-song__link">
          {t.songLink}
          <input
            type="url"
            readOnly
            value={url}
            onFocus={(event) => event.currentTarget.select()}
          />
        </label>
      )}
    </>
  );
}
