import {
  resolveLocaleParams,
  type LocalizedPageProps,
} from "@/modules/i18n/server";
import "@/app/globals.css";
import type { ReactNode } from "react";
import { Header, Socials } from "@/views/layout";
import { locales, messages } from "@/modules/i18n";
import { siteUrl, socials } from "@/modules/site";
import { PreferencesProvider, ThemeScript } from "@/modules/preferences";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type LocaleLayoutProps = LocalizedPageProps & { children: ReactNode };

export async function generateMetadata({ params }: LocaleLayoutProps) {
  const { locale: value } = await resolveLocaleParams(params);
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
  const { locale: value } = await resolveLocaleParams(params);
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
        <ThemeScript />
      </head>
      <body>
        <a className="skip-link" href="#main">
          {t.skipToContent}
        </a>
        <PreferencesProvider locale={value}>
          <Header locale={value} />
          {children}
          <Socials locale={value} />
        </PreferencesProvider>
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
