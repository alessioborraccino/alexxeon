import { socials } from "../lib/site.mjs";
export default function Socials() {
  return (
    <footer>
      <h2>Follow Alexx Eon</h2>
      <ul className="social-links">
        {socials.map(([name, url]) => (
          <li key={name}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {name}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
