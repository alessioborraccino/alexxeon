import {
  resolveLocaleParams,
  type LocalizedPageProps,
} from "@/modules/i18n/server";
import { messages } from "@/modules/i18n";
import { pageMetadata } from "@/modules/site";
import BioPage from "@/views/bio";

type BioProps = LocalizedPageProps;

export async function generateMetadata({ params }: BioProps) {
  const { locale: value } = await resolveLocaleParams(params);
  const t = messages[value];
  return pageMetadata(t.titles.bio, t.descriptions.bio, `/${value}/bio/`, true);
}
export default async function Bio({ params }: BioProps) {
  const { locale: value } = await resolveLocaleParams(params);
  return <BioPage locale={value} />;
}
