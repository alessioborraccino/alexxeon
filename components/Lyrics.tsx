import { messages, type Locale } from "../lib/i18n";

export default function Lyrics({
  lyrics,
  locale,
}: {
  lyrics?: string | null;
  locale: Locale;
}) {
  if (!lyrics?.trim()) return null;
  return (
    <section className="lyrics" aria-labelledby="lyrics-heading">
      <h2 id="lyrics-heading">{messages[locale].lyrics}</h2>
      <p className="lyrics__text">{lyrics}</p>
    </section>
  );
}
