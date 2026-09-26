import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { currentLocale } from "@/lib/locale";
import { pathFor } from "@/lib/routes";

export async function EngagementModels() {
  const t = await getTranslations("engagement");
  const locale = await currentLocale();
  const href = pathFor(locale, "contact");

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <article className="rounded-3xl border border-mist bg-white p-7 sm:p-9">
        <h2 className="font-display text-3xl tracking-[-0.04em] md:text-4xl">
          {t("handoff.title")}
        </h2>
        <p className="mt-4 leading-7 text-ink/80">{t("handoff.steps")}</p>
        <p className="mt-3 leading-7 text-ink/80">{t("handoff.pay")}</p>
        <p className="mt-3 text-sm leading-6 text-muted">{t("handoff.for")}</p>
        <div className="mt-8">
          <Button href={href} variant="ghost">
            {t("cta")}
          </Button>
        </div>
      </article>
      <article className="relative overflow-hidden rounded-3xl bg-deep p-7 text-white shadow-[0_30px_70px_-30px_rgb(11_61_145/0.7)] sm:p-9">
        <div className="ai-aurora ai-aurora-soft pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative">
        <p className="inline-flex rounded-full bg-cyan/15 px-3 py-1 text-[0.75rem] uppercase tracking-[0.14em] text-cyan">
          {t("recommended")}
        </p>
        <h2 className="mt-3 font-display text-3xl tracking-[-0.04em] md:text-4xl">
          {t("care.title")}
        </h2>
        <p className="mt-4 leading-7 text-white/85">{t("care.steps")}</p>
        <p className="mt-3 leading-7 text-white/85">{t("care.pay")}</p>
        <p className="mt-3 text-sm leading-6 text-white/60">{t("care.for")}</p>
        <div className="mt-8">
          <Button href={href} variant="inverse">{t("cta")}</Button>
        </div>
        </div>
      </article>
    </div>
  );
}
