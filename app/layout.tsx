import "./globals.css";
import Header from "../components/Header";
import Socials from "../components/Socials";
import { siteUrl, socials } from "../lib/site";
import type { ReactNode } from "react";
export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Alexx Eon — Music & Electronic Covers",
    template: "%s | Alexx Eon",
  },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined },
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};
export default function RootLayout({ children }: { children: ReactNode }) {
  const artist = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#artist`,
    name: "Alexx Eon",
    url: siteUrl,
    jobTitle: "Musician",
    sameAs: socials.map(([, url]) => url),
  };
  return (
    <html lang="en">
      <head>
        <script
          // Set saved theme before first paint to avoid a theme flash.
          // biome-ignore lint/security/noDangerouslySetInnerHtml: This fixed inline script reads one localStorage key and applies a validated theme value before first paint.
          dangerouslySetInnerHTML={{
            __html: `(() => { try { const theme = localStorage.getItem("alexxeon-theme"); document.documentElement.dataset.theme = theme === "light" || theme === "dark" ? theme : "system"; } catch { document.documentElement.dataset.theme = "system"; } })();`,
          }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        {children}
        <Socials />
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD must be script text; serialize data and escape less-than signs to block script-tag injection.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(artist).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
