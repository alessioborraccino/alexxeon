import "./globals.css";
import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <main id="main" className="section">
          <h1>Page not found</h1>
          <p>This page does not exist or has moved.</p>
          <Link className="button" href="/en/">
            Back to music
          </Link>
        </main>
      </body>
    </html>
  );
}
