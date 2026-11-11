import { messages, type Locale } from "@/modules/i18n";
import { Page } from "@/ui";
import PreferencesControls from "./PreferencesControls";

export default function PreferencesPage({ locale }: { locale: Locale }) {
  const t = messages[locale];
  return (
    <Page className="section preferences">
      <h1>{t.preferences}</h1>
      <p>{t.preferencesDescription}</p>
      <PreferencesControls />
    </Page>
  );
}
