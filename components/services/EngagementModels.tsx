import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { currentLocale } from "@/lib/locale";
import { pathFor } from "@/lib/routes";

export async function EngagementModels() {
  const t = await getTranslations("engagement");
  const locale = await currentLocale();
  const href = pathFor(locale, "calculator");

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <article className="border border-mist bg-white p-6 sm:p-8">
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
      <article className="border border-navy bg-white p-6 sm:p-8">
        <p className="text-[0.75rem] uppercase tracking-[0.14em] text-navy">
          {t("recommended")}
        </p>
        <h2 className="mt-3 font-display text-3xl tracking-[-0.04em] md:text-4xl">
          {t("care.title")}
        </h2>
        <p className="mt-4 leading-7 text-ink/80">{t("care.steps")}</p>
        <p className="mt-3 leading-7 text-ink/80">{t("care.pay")}</p>
        <p className="mt-3 text-sm leading-6 text-muted">{t("care.for")}</p>
        <div className="mt-8">
          <Button href={href}>{t("cta")}</Button>
        </div>
      </article>
    </div>
  );
}
