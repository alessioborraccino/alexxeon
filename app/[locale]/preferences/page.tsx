import {
  resolveLocaleParams,
  type LocalizedPageProps,
} from "@/modules/i18n/server";
import PreferencesPage from "@/views/preferences";
import { messages } from "@/modules/i18n";
import { pageMetadata } from "@/modules/site";

type PreferencesPageProps = LocalizedPageProps;

export async function generateMetadata({ params }: PreferencesPageProps) {
  const { locale: value } = await resolveLocaleParams(params);
  const t = messages[value];
  return pageMetadata(
    t.preferences,
    t.preferencesDescription,
    `/${value}/preferences/`,
    true,
  );
}

export default async function PreferencesRoute({
  params,
}: PreferencesPageProps) {
  const { locale: value } = await resolveLocaleParams(params);
  return <PreferencesPage locale={value} />;
}
