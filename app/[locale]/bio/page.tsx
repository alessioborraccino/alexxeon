import { notFound } from "next/navigation";
import { hasLocale, messages } from "@/modules/i18n";
import { pageMetadata } from "@/modules/site";
import BioPage from "@/views/bio";

type BioProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: BioProps) {
  const { locale: value } = await params;
  if (!hasLocale(value)) notFound();
  const t = messages[value];
  return pageMetadata(t.titles.bio, t.descriptions.bio, `/${value}/bio/`, true);
}
export default async function Bio({ params }: BioProps) {
  const { locale: value } = await params;
  if (!hasLocale(value)) notFound();
  return <BioPage locale={value} />;
}
