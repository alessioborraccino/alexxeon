import { socials } from "../lib/site";
import { messages, type Locale } from "../lib/i18n";
export default function Socials({ locale }: { locale: Locale }) {
  const t = messages[locale];
  return (
    <footer>
      <h2>{t.follow}</h2>
      <ul className="social-links">
        {socials.map(([name, url]) => (
          <li key={name}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {name}
              <span className="sr-only">{t.opensNewTab}</span>
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
