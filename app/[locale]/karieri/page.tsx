import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Openings } from "@/components/careers/Openings";
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
    <main id="content" className="bg-paper pb-24 md:pb-32">
      <PageHeader title={t("title")} lead={t("lead")} />
      <Container>
        <section aria-labelledby="open-roles">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <div>
              <h2
                id="open-roles"
                className="max-w-[12ch] font-display text-[clamp(2rem,4vw,4.25rem)] leading-[0.95] tracking-[-0.05em]"
              >
                {t("openingsTitle")}
              </h2>
              <p className="mt-6 max-w-[38ch] text-[1.0625rem] leading-8 text-ink/75">
                {t("openingsLead")}
              </p>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-mist shadow-[0_30px_80px_-40px_rgb(11_61_145/0.5)]">
              <Image
                src="/careers/together.jpg"
                alt={t("imageAlt")}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover object-center"
              />
            </div>
          </div>
          <Openings />
        </section>
      </Container>
    </main>
  );
}
