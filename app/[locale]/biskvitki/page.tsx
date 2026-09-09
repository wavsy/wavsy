import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/ui/PageHeader";
import { parseLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const locale = await parseLocale(params);
  return pageMetadata(locale, "cookies");
}

export default async function CookiesPage({ params }: PageProps) {
  const locale = await parseLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations("legal");

  return (
    <main id="content" className="bg-paper pb-24">
      <PageHeader title={t("cookiesTitle")} lead={t("cookiesNote")} />
    </main>
  );
}
