import "../globals.css";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import Header from "../../components/Header";
import Socials from "../../components/Socials";
import { hasLocale, locales, messages } from "../../lib/i18n";
import { siteUrl, socials } from "../../lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LocaleLayoutProps) {
  const { locale: value } = await params;
  if (!hasLocale(value)) notFound();
  const t = messages[value];
  return {
    metadataBase: new URL(siteUrl),
    title: { default: t.titles.home, template: "%s | Alexx Eon" },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    },
  };
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: value } = await params;
  if (!hasLocale(value)) notFound();
  const t = messages[value];
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
    <html lang={value}>
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
          {t.skipToContent}
        </a>
        <Header locale={value} />
        {children}
        <Socials locale={value} />
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
