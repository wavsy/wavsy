import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { WaveField } from "@/components/motion/WaveField";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { PUBLIC_EMAIL } from "@/lib/site";

export async function FinalCta() {
  const t = await getTranslations("contact");

  return (
    <Section tone="deep" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 opacity-30 lg:block">
        <WaveField />
      </div>
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <h2 className="max-w-[10ch] font-display text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.05em]">
              {t("title")}
              <span className="mt-2 block">{t("titleLine2")}</span>
            </h2>
            <p className="mt-6 max-w-[38ch] leading-7 text-white/75">{t("lead")}</p>
            <a
              href={`mailto:${PUBLIC_EMAIL}`}
              className="mt-6 inline-block text-white underline decoration-white/25 underline-offset-4 hover:decoration-cyan"
            >
              {PUBLIC_EMAIL}
            </a>
            <p className="mt-2 text-sm text-white/55">{t("response")}</p>
          </Reveal>
          <Reveal>
            <InquiryForm tone="dark" />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
