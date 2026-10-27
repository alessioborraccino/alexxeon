import { notFound } from "next/navigation";
import Preferences from "../../../components/Preferences";
import { hasLocale, messages } from "../../../lib/i18n";
import { pageMetadata } from "../../../lib/site";

type PreferencesPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PreferencesPageProps) {
  const { locale: value } = await params;
  if (!hasLocale(value)) notFound();
  const t = messages[value];
  return pageMetadata(
    t.preferences,
    t.preferencesDescription,
    `/${value}/preferences/`,
    true,
  );
}

export default async function PreferencesPage({
  params,
}: PreferencesPageProps) {
  const { locale: value } = await params;
  if (!hasLocale(value)) notFound();
  return <Preferences />;
}
