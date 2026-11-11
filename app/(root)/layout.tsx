import "@/app/globals.css";
import type { ReactNode } from "react";
import { ThemeScript } from "@/modules/preferences";

export default function DefaultLocaleLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ThemeScript />
      </head>
      <body>{children}</body>
    </html>
  );
}
