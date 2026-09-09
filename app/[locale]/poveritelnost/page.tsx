import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/ui/PageHeader";
import { parseLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const locale = await parseLocale(params);
  return pageMetadata(locale, "privacy");
}

export default async function PrivacyPage({ params }: PageProps) {
  const locale = await parseLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations("legal");

  return (
    <main id="content" className="bg-paper pb-24">
      <PageHeader title={t("privacyTitle")} lead={t("privacyNote")} />
    </main>
  );
}
