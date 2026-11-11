import { themeStorageKey } from "./storage";

export const themeBootstrapScript = `(() => { try { const theme = localStorage.getItem("${themeStorageKey}"); document.documentElement.dataset.theme = theme === "light" || theme === "dark" ? theme : "system"; } catch { document.documentElement.dataset.theme = "system"; } })();`;

export function ThemeScript() {
  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: The fixed script validates the saved theme before applying it before first paint.
      dangerouslySetInnerHTML={{ __html: themeBootstrapScript }}
    />
  );
}
