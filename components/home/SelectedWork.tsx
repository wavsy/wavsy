import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { HeadingReveal } from "@/components/motion/HeadingReveal";
import { Marquee } from "@/components/ai/Marquee";
import { WorkList } from "@/components/home/WorkList";
import { currentLocale } from "@/lib/locale";
import { projects } from "@/lib/projects";
import { pathFor } from "@/lib/routes";

// Proof before services, as studio sites do: a marquee of what is live, then
// the project list with the pointer-following preview.
export async function SelectedWork() {
  const t = await getTranslations("work");
  const p = await getTranslations("portfolio");
  const locale = await currentLocale();
  const names = projects.map((project) => p(`projects.${project.slug}.name`));

  return (
    <>
      <Marquee title={t("marquee")} items={names} />
      <section className="relative overflow-hidden bg-deep py-20 text-white md:py-28 lg:py-32">
        <div className="ai-aurora ai-aurora-soft pointer-events-none absolute inset-0" aria-hidden />
        <Container className="relative">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <HeadingReveal
                lines={[t("title")]}
                className="max-w-[14ch] font-display text-[clamp(2rem,4vw,4.25rem)] leading-[0.95] tracking-[-0.05em]"
              />
              <p className="mt-6 max-w-[42ch] text-[1.0625rem] leading-7 text-white/70">{t("lead")}</p>
            </div>
            <Link
              href={pathFor(locale, "portfolio")}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-[0.9375rem] text-white transition-colors duration-200 hover:border-cyan hover:text-cyan"
            >
              {t("cta")} <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="mt-12 md:mt-16">
            <WorkList projects={projects} />
          </div>
        </Container>
      </section>
    </>
  );
}
