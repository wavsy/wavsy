import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { defaultLocale, isLocale, type Locale } from "@/lib/routes";

export async function parseLocale(
  params: Promise<{ locale: string }>,
): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  return locale;
}

export async function currentLocale(): Promise<Locale> {
  const locale = await getLocale();
  return isLocale(locale) ? locale : defaultLocale;
}
