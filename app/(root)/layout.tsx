import "../globals.css";
import type { ReactNode } from "react";
import { themeBootstrapScript } from "../../preferences";

export default function DefaultLocaleLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          // Set saved theme before first paint to avoid a theme flash.
          // biome-ignore lint/security/noDangerouslySetInnerHtml: This fixed inline script reads one localStorage key and applies a validated theme value before first paint.
          dangerouslySetInnerHTML={{
            __html: themeBootstrapScript,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
