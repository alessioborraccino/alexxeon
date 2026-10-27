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
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        {children}
        <Socials />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(artist).replace(/</g, "\u003c"),
          }}
        />
      </body>
    </html>
  );
}
