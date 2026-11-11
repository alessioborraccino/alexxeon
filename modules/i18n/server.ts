import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "./index";

export type LocalizedPageProps<
  Params extends { locale: string } = { locale: string },
> = {
  params: Promise<Params>;
};

/** Validate the URL locale before loading localized content or metadata. */
export async function resolveLocaleParams<Params extends { locale: string }>(
  params: Promise<Params>,
): Promise<Params & { locale: Locale }> {
  const value = await params;
  if (!hasLocale(value.locale)) notFound();
  return { ...value, locale: value.locale };
}
