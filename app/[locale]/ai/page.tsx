import { getTranslations, setRequestLocale } from "next-intl/server";
import { umamiEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { HeadingReveal } from "@/components/motion/HeadingReveal";
import { ChatDemo } from "@/components/ai/ChatDemo";
import { Marquee } from "@/components/ai/Marquee";
import { ProductCards } from "@/components/ai/ProductCards";
import { AgentFlow } from "@/components/ai/AgentFlow";
import { CustomCompare } from "@/components/ai/CustomCompare";
import { UseCaseTabs } from "@/components/ai/UseCaseTabs";
import { TiltCard } from "@/components/ai/TiltCard";
import { ScrambleText } from "@/components/ai/ScrambleText";
import { Magnetic } from "@/components/ai/Magnetic";
import { StatsStrip } from "@/components/ai/StatsStrip";
import { ProcessSteps } from "@/components/ai/ProcessSteps";
import { FaqList } from "@/components/services/FaqList";
import { JsonLd } from "@/components/seo/JsonLd";
import { FinalCta } from "@/components/home/FinalCta";
import { parseLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { pathFor } from "@/lib/routes";
import { absoluteUrl } from "@/lib/site";

type PageProps = {
  params: Promise<{ locale: string }>;
};

type ChatMessage = { from: "user" | "ai" | "tool"; text: string };
type Product = { title: string; body: string; points: string[] };
type Step = { title: string; body: string };
type FaqItem = { q: string; a: string };
type Column = { label: string; items: string[] };
type UseCase = { label: string; headline: string; items: string[] };

export async function generateMetadata({ params }: PageProps) {
  const locale = await parseLocale(params);
  return pageMetadata(locale, "ai");
}

export default async function AiPage({ params }: PageProps) {
  const locale = await parseLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations("ai");
  const steps = t.raw("process.steps") as Step[];
  const principles = t.raw("principles.items") as Step[];
  const deliverables = t.raw("deliverables.items") as Step[];
  const faq = t.raw("faq.items") as FaqItem[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
    url: absoluteUrl(locale, "ai"),
  };

  return (
    <main id="content">
      <JsonLd data={jsonLd} />
      <section className="relative isolate overflow-hidden bg-deep text-white">
        <div className="ai-aurora pointer-events-none absolute inset-0 -z-10" aria-hidden />
        <div className="ai-dot-grid pointer-events-none absolute inset-0 -z-10" aria-hidden />
        <Container className="grid min-h-[100dvh] items-center gap-12 pb-16 pt-[calc(var(--header-h)+3rem)] lg:grid-cols-[1.35fr_0.9fr] lg:gap-12 lg:pb-24">
          <div className="hero-copy min-w-0">
            <p className="mb-6 text-[0.75rem] font-medium uppercase tracking-[0.18em] text-cyan">
              <ScrambleText text={t("hero.eyebrow")} />
            </p>
            <h1 className="hyphens-auto break-words font-display text-[clamp(2.25rem,5.4vw,4.25rem)] leading-[0.95] tracking-[-0.05em]">
              <span className="block">{t("hero.titleLine1")}</span>
              <span className="ai-gradient-text block">{t("hero.titleLine2")}</span>
            </h1>
            <p className="mt-8 max-w-[44ch] text-[1.0625rem] leading-7 text-white/75">
              {t("hero.body")}
            </p>
            <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
              <Magnetic>
                <Button
                  href={pathFor(locale, "contact")}
                  variant="inverse"
                  className="ai-shine"
                  track={umamiEvent("cta-quote", { location: "ai-hero" })}
                >
                  {t("hero.primary")}
                </Button>
              </Magnetic>
              <Button href="#how" variant="ghost" className="text-white/80 hover:text-cyan">
                {t("hero.secondary")}
              </Button>
            </div>
            <p className="mt-10 inline-flex items-center gap-2.5 text-sm text-white/60">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              {t("hero.live")}
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <TiltCard>
            <ChatDemo
              label={t("demo.label")}
              name={t("demo.name")}
              status={t("demo.status")}
              typing={t("demo.typing")}
              messages={t.raw("demo.messages") as ChatMessage[]}
            />
            </TiltCard>
          </div>
        </Container>
      </section>

      <Marquee title={t("marquee.title")} items={t.raw("marquee.items") as string[]} />

      <Section tone="paper">
        <Container>
          <HeadingReveal
            lines={[t("custom.title")]}
            className="max-w-[18ch] font-display text-[clamp(2rem,4vw,4.25rem)] leading-[0.95] tracking-[-0.05em]"
          />
          <p className="mt-6 max-w-[48ch] text-[1.0625rem] leading-7 text-ink/75">
            {t("custom.lead")}
          </p>
          <div className="mt-12 md:mt-16">
            <CustomCompare
              generic={t.raw("custom.generic") as Column}
              tailored={t.raw("custom.tailored") as Column}
            />
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <HeadingReveal
            lines={[t("products.title")]}
            className="max-w-[16ch] font-display text-[clamp(2rem,4vw,4.25rem)] leading-[0.95] tracking-[-0.05em]"
          />
          <p className="mt-6 max-w-[44ch] text-[1.0625rem] leading-7 text-ink/75">
            {t("products.lead")}
          </p>
          <div className="mt-12 md:mt-16">
            <ProductCards items={t.raw("products.items") as Product[]} />
          </div>
        </Container>
      </Section>

      <section className="relative overflow-hidden bg-deep py-16 text-white md:py-20">
        <div className="ai-aurora ai-aurora-soft pointer-events-none absolute inset-0" aria-hidden />
        <Container className="relative">
          <h2 className="mb-8 text-[0.75rem] font-medium uppercase tracking-[0.18em] text-cyan">
            {t("stats.title")}
          </h2>
          <StatsStrip items={t.raw("stats.items") as { value: string; label: string }[]} />
        </Container>
      </section>

      <Section tone="paper">
        <Container>
          <HeadingReveal
            lines={[t("useCases.title")]}
            className="max-w-[18ch] font-display text-[clamp(2rem,4vw,4.25rem)] leading-[0.95] tracking-[-0.05em]"
          />
          <p className="mt-6 max-w-[48ch] text-[1.0625rem] leading-7 text-ink/75">
            {t("useCases.lead")}
          </p>
          <div className="mt-12 md:mt-16">
            <UseCaseTabs tabs={t.raw("useCases.tabs") as UseCase[]} />
          </div>
        </Container>
      </Section>

      <Section tone="deep" id="how" className="relative scroll-mt-12 overflow-hidden">
        <div className="ai-aurora ai-aurora-soft pointer-events-none absolute inset-0" aria-hidden />
        <Container className="relative">
          <HeadingReveal
            lines={[t("flow.title")]}
            className="max-w-[16ch] font-display text-[clamp(2rem,4vw,4.25rem)] leading-[0.95] tracking-[-0.05em]"
          />
          <p className="mt-6 max-w-[48ch] text-[1.0625rem] leading-7 text-white/70">
            {t("flow.lead")}
          </p>
          <div className="mt-12 md:mt-16">
            <AgentFlow nodes={t.raw("flow.nodes")} task={t.raw("flow.task")} />
          </div>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <HeadingReveal
            lines={[t("process.title")]}
            className="max-w-[18ch] font-display text-[clamp(2rem,4vw,4.25rem)] leading-[0.95] tracking-[-0.05em]"
          />
          <ProcessSteps steps={steps} />
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <HeadingReveal
            lines={[t("deliverables.title")]}
            className="max-w-[16ch] font-display text-[clamp(2rem,4vw,4.25rem)] leading-[0.95] tracking-[-0.05em]"
          />
          <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-mist bg-mist sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
            {deliverables.map((item, index) => (
              <li key={item.title} className="group bg-white p-7 transition-colors duration-300 hover:bg-paper md:p-8">
                <Reveal delay={(index % 3) * 0.06}>
                  <span className="font-display text-sm tracking-[0.12em] text-cyan">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-xl tracking-[-0.03em] transition-colors duration-300 group-hover:text-navy md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-7 text-ink/75">{item.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <HeadingReveal
            lines={[t("principles.title")]}
            className="max-w-[16ch] font-display text-[clamp(2rem,4vw,4.25rem)] leading-[0.95] tracking-[-0.05em]"
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-16 md:gap-5">
            {principles.map((item, index) => (
              <li key={item.title}>
                <Reveal delay={index * 0.06} className="h-full">
                  <div className="ai-gradient-border h-full rounded-2xl p-7 md:p-8">
                    <h3 className="font-display text-xl tracking-[-0.03em] md:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 leading-7 text-ink/75">{item.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <HeadingReveal
              lines={[t("faq.title")]}
              className="max-w-[14ch] font-display text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] tracking-[-0.05em]"
            />
            <FaqList items={faq} />
          </div>
        </Container>
      </Section>

      <FinalCta />
    </main>
  );
}
