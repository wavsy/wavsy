import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { GdprBadge } from "@/components/ui/GdprBadge";
import { parseLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { PUBLIC_EMAIL } from "@/lib/site";

const privacySections = [
  "who",
  "data",
  "use",
  "share",
  "keep",
  "cookies",
  "rights",
  "contact",
] as const;

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
      <Container>
        <div className="grid max-w-[48ch] gap-8">
          {privacySections.map((key) => (
            <section key={key}>
              <h2 className="text-[0.75rem] uppercase tracking-[0.14em] text-muted">
                {t(`privacySections.${key}.title`)}
              </h2>
              <p className="mt-3 text-[1.0625rem] leading-7 text-ink/80">
                {key === "contact" ? (
                  <>
                    {t("privacySections.contact.body")}{" "}
                    <a
                      href={`mailto:${PUBLIC_EMAIL}`}
                      className="text-ink underline decoration-mist underline-offset-4 transition-colors duration-150 hover:decoration-navy"
                    >{PUBLIC_EMAIL}</a>.
                  </>
                ) : (
                  t(`privacySections.${key}.body`)
                )}
              </p>
            </section>
          ))}
          <div className="pt-2">
            <GdprBadge />
          </div>
        </div>
      </Container>
    </main>
  );
}
