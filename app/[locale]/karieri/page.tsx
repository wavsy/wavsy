import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { parseLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const locale = await parseLocale(params);
  return pageMetadata(locale, "careers");
}

export default async function CareersPage({ params }: PageProps) {
  const locale = await parseLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations("careers");

  return (
    <main id="content" className="bg-paper pb-24">
      <PageHeader title={t("title")} lead={t("lead")} />
      <Container>
        <div className="relative aspect-[16/9] overflow-hidden border border-mist bg-mist">
          <Image
            src="/careers/together.jpg"
            alt={t("imageAlt")}
            fill
            priority
            sizes="(min-width: 960px) 960px, 100vw"
            className="object-cover object-center"
          />
        </div>
      </Container>
    </main>
  );
}
