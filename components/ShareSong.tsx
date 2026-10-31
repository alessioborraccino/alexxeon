"use client";

import { useEffect, useState } from "react";
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
  const [nativeShare, setNativeShare] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    setNativeShare(typeof navigator.share === "function");
  }, []);

  async function copyLink() {
    setStatus("");
    try {
      await navigator.clipboard.writeText(url);
      setStatus(t.linkCopied);
    } catch {
      setStatus(t.copyFailed);
    }
  }

  async function share() {
    setStatus("");
    try {
      await navigator.share({ title: `${title} — Alexx Eon`, url });
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      setStatus(t.shareFailed);
    }
  }

  return (
    <details className="share-song">
      <summary>{t.share}</summary>
      <div className="share-song__actions">
        {nativeShare && (
          <button type="button" className="button" onClick={share}>
            {t.shareDevice}
          </button>
        )}
        <button type="button" className="button" onClick={copyLink}>
          {t.copyLink}
        </button>
        <a
          className="button"
          href={`mailto:?subject=${encodeURIComponent(`${title} — Alexx Eon`)}&body=${encodeURIComponent(url)}`}
        >
          {t.shareEmail}
        </a>
      </div>
      <label className="share-song__link">
        {t.songLink}
        <input
          type="url"
          readOnly
          value={url}
          onFocus={(event) => event.currentTarget.select()}
        />
      </label>
      <p role="status">{status}</p>
    </details>
  );
}
