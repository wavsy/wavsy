import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroMark } from "@/components/home/HeroMark";
import { Magnetic } from "@/components/ai/Magnetic";
import { HeroSpotlight } from "@/components/home/HeroSpotlight";
import { currentLocale } from "@/lib/locale";
import { pathFor } from "@/lib/routes";

// Dark hero in the style of the AI page. The h1 is in the server HTML and
// never starts hidden (it is the LCP element). The Wavsy mark floats on the
// right; a soft light follows the pointer on desktop.
export async function Hero() {
  const t = await getTranslations("hero");
  const locale = await currentLocale();

  return (
    <section className="relative isolate min-h-[100dvh] overflow-hidden bg-deep text-white">
      <div className="ai-aurora pointer-events-none absolute inset-0 -z-10" aria-hidden />
      <div className="ai-dot-grid pointer-events-none absolute inset-0 -z-10" aria-hidden />
      <HeroSpotlight />
      <Container className="relative grid min-h-[100dvh] items-center gap-10 pb-16 pt-[calc(var(--header-h)+2.5rem)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:pb-20 lg:pt-[var(--header-h)]">
        <div className="hero-copy order-2 min-w-0 lg:order-1">
          <Link
            href={pathFor(locale, "ai")}
            className="group mb-7 inline-flex max-w-full items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] py-1.5 pl-1.5 pr-4 text-sm text-white/85 backdrop-blur-md transition-colors duration-200 hover:border-cyan/60 hover:text-white"
          >
            <span className="rounded-full bg-cyan px-2.5 py-0.5 text-xs font-semibold text-deep">
              {t("new")}
            </span>
            <span className="truncate">{t("newLink")}</span>
            <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
          <h1 className="max-w-[11ch] hyphens-auto break-words font-display text-[clamp(2.5rem,8.5vw,6.25rem)] leading-[0.92] tracking-[-0.05em]">
            <span className="block">{t("titleLine1")}</span>
            <span className="ai-gradient-text block">{t("titleLine2")}</span>
          </h1>
          <p className="mt-8 max-w-[38ch] text-[1.0625rem] leading-7 text-white/75">
            {t("body")}
          </p>
          <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
            <Magnetic>
              <Button href={pathFor(locale, "contact")} variant="inverse" className="ai-shine">
                {t("primary")}
              </Button>
            </Magnetic>
            <Link
              href={pathFor(locale, "portfolio")}
              className="py-3 text-[0.9375rem] text-white/80 transition-colors duration-150 hover:text-cyan"
            >
              {t("secondary")} →
            </Link>
          </div>
        </div>
        <div className="order-1 flex justify-center lg:order-2">
          <HeroMark className="w-[78%] max-w-[560px] sm:w-[62%] lg:w-full" />
        </div>
      </Container>
      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block" aria-hidden>
        <span className="scroll-cue block h-10 w-6 rounded-full border border-white/25" />
      </div>
    </section>
  );
}
