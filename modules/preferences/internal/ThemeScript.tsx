import { themeBootstrapScript } from "./model";

export function ThemeScript() {
  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: The fixed script validates the saved theme before applying it before first paint.
      dangerouslySetInnerHTML={{ __html: themeBootstrapScript }}
    />
  );
}
