import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeadingReveal } from "@/components/motion/HeadingReveal";
import { WaveField } from "@/components/motion/WaveField";
import { currentLocale } from "@/lib/locale";
import { pathFor } from "@/lib/routes";

export async function Hero() {
  const t = await getTranslations("hero");
  const locale = await currentLocale();

  return (
    <section className="relative isolate min-h-[100dvh] overflow-hidden bg-paper">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-full opacity-40 sm:opacity-100 md:w-[58%]">
        <WaveField className="h-full min-h-[280px]" />
      </div>
      <div className="absolute inset-y-0 right-0 hidden w-[58%] bg-gradient-to-l from-transparent via-transparent to-paper md:block" />
      <Container className="relative flex min-h-[100dvh] items-end pb-16 pt-[calc(var(--header-h)+3rem)] md:items-center md:pb-24 md:pt-[var(--header-h)]">
        <div className="hero-copy max-w-[16ch] md:max-w-[18ch]">
          <p className="mb-6 text-[0.75rem] font-medium uppercase tracking-[0.18em] text-muted">
            {t("eyebrow")}
          </p>
          <HeadingReveal
            as="h1"
            lines={[t("titleLine1"), t("titleLine2")]}
            className="font-display text-[clamp(2.5rem,11vw,6.75rem)] leading-[0.92] tracking-[-0.05em] text-ink"
          />
          <p className="mt-8 max-w-[38ch] text-[1.0625rem] leading-7 text-ink/80">
            {t("body")}
          </p>
          <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
            <Button href={pathFor(locale, "contact")}>{t("primary")}</Button>
            <Button href={pathFor(locale, "portfolio")} variant="ghost">
              {t("secondary")}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
