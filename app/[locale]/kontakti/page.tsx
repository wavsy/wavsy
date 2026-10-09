import { getTranslations, setRequestLocale } from "next-intl/server";
import { umamiEvent } from "@/lib/analytics";
import { Clip } from "@/components/clips/Clip";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { parseLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { PUBLIC_EMAIL } from "@/lib/site";
import { buildChatUrl } from "@/lib/whatsapp";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const locale = await parseLocale(params);
  return pageMetadata(locale, "contact");
}

export default async function ContactPage({ params }: PageProps) {
  const locale = await parseLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <main id="content" className="bg-paper pb-24">
      <PageHeader title={t("pageTitle")} lead={t("lead")} />
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.8fr] lg:gap-20">
          <div className="rounded-3xl border border-mist bg-white p-6 shadow-[0_30px_80px_-50px_rgb(11_61_145/0.45)] sm:p-10">
            <InquiryForm viberHref={buildChatUrl("viber")} />
          </div>
          <aside className="ai-gradient-border h-fit rounded-3xl p-7 lg:mt-0">
            <Clip name="send" play="always" className="mb-6 w-20 text-navy" />
            <p className="text-[0.75rem] uppercase tracking-[0.14em] text-muted">
              {t("emailLabel")}
            </p>
            <a
              href={`mailto:${PUBLIC_EMAIL}`}
              {...umamiEvent("email-click", { location: "contact" })}
              className="mt-3 inline-block break-all text-xl text-ink underline decoration-mist underline-offset-4 hover:decoration-navy"
            >
              {PUBLIC_EMAIL}
            </a>
            <p className="mt-3 max-w-[36ch] text-sm leading-6 text-muted">
              {t("emailHint")}
            </p>
            <p className="mt-6 text-sm text-muted">{t("response")}</p>
          </aside>
        </div>
      </Container>
    </main>
  );
}
