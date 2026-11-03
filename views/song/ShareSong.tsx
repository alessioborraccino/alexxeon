"use client";

import { useCallback, useState } from "react";
import { messages, type Locale } from "@/modules/i18n";
import { Toast } from "@/ui";

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
  const [showToast, setShowToast] = useState(false);
  const [toastKey, setToastKey] = useState(0);
  const dismissToast = useCallback(() => setShowToast(false), []);

  async function share() {
    setStatus("");
    setShowLink(false);
    setShowToast(false);
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
      setToastKey((key) => key + 1);
      setShowToast(true);
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
      {showToast && (
        <Toast key={toastKey} message={t.linkCopied} onDismiss={dismissToast} />
      )}
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
