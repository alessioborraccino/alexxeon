import "./globals.css";
import { ButtonLink } from "../ui";

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <main id="main" className="section">
          <h1>Page not found</h1>
          <p>This page does not exist or has moved.</p>
          <ButtonLink href="/en/">Back to music</ButtonLink>
        </main>
      </body>
    </html>
  );
}
