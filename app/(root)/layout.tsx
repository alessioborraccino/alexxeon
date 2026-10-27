import "../globals.css";
import type { ReactNode } from "react";

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
            __html: `(() => { try { const theme = localStorage.getItem("alexxeon-theme"); document.documentElement.dataset.theme = theme === "light" || theme === "dark" ? theme : "system"; } catch { document.documentElement.dataset.theme = "system"; } })();`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
