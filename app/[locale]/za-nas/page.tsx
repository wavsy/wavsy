import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { HeadingReveal } from "@/components/motion/HeadingReveal";
import { ScrambleText } from "@/components/ai/ScrambleText";
import { FounderCard } from "@/components/about/FounderCard";
import { CenterActivate } from "@/components/motion/CenterActivate";
import { FinalCta } from "@/components/home/FinalCta";
import { parseLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { teamIds } from "@/lib/team";

type PageProps = {
  params: Promise<{ locale: string }>;
};

type WhyItem = { display: string; body: string };

export async function generateMetadata({ params }: PageProps) {
  const locale = await parseLocale(params);
  return pageMetadata(locale, "about");
}

export default async function AboutPage({ params }: PageProps) {
  const locale = await parseLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations("team");
  const why = await getTranslations("why");
  const reasons = why.raw("items") as WhyItem[];

  return (
    <main id="content">
      <section className="relative isolate overflow-hidden bg-deep text-white">
        <div className="ai-aurora pointer-events-none absolute inset-0 -z-10" aria-hidden />
        <div className="ai-dot-grid pointer-events-none absolute inset-0 -z-10" aria-hidden />
        <Container className="flex min-h-[72dvh] flex-col justify-end pb-16 pt-[calc(var(--header-h)+4rem)] md:pb-24">
          <div className="hero-copy min-w-0">
            <p className="mb-6 text-[0.75rem] font-medium uppercase tracking-[0.18em] text-cyan">
              <ScrambleText text="Wavsy" />
            </p>
            <h1 className="ai-gradient-text font-display text-[clamp(3rem,11vw,8rem)] leading-[0.9] tracking-[-0.05em]">
              {t("pageTitle")}
            </h1>
            <p className="mt-8 max-w-[40ch] text-[clamp(1.125rem,1.8vw,1.375rem)] leading-8 text-white/85">
              {t("lead")}
            </p>
            <p className="mt-5 max-w-[52ch] text-[1.0625rem] leading-7 text-white/60">
              {t("body")}
            </p>
          </div>
        </Container>
      </section>

      <Section tone="paper">
        <Container>
          <HeadingReveal
            lines={[t("title")]}
            className="max-w-[16ch] font-display text-[clamp(2rem,4vw,4.25rem)] leading-[0.95] tracking-[-0.05em]"
          />
          <CenterActivate className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 md:gap-8">
            {teamIds.map((id, index) => (
              <Reveal key={id} delay={index * 0.08} className="h-full">
                <FounderCard id={id} />
              </Reveal>
            ))}
          </CenterActivate>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <HeadingReveal
            lines={[why("title")]}
            className="max-w-[16ch] font-display text-[clamp(2rem,4vw,4.25rem)] leading-[0.95] tracking-[-0.05em]"
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-16 md:gap-5 lg:grid-cols-4">
            {reasons.map((item, index) => (
              <li key={item.display}>
                <Reveal delay={index * 0.06} className="h-full">
                  <div className="ai-gradient-border h-full rounded-2xl p-7">
                    <p className="font-display text-2xl tracking-[-0.04em] text-navy">
                      {item.display}
                    </p>
                    <p className="mt-3 leading-7 text-ink/75">{item.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <FinalCta />
    </main>
  );
}
