import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { currentLocale } from "@/lib/locale";
import { pathFor } from "@/lib/routes";

export default async function LocaleNotFound() {
  const locale = await currentLocale();
  const t = await getTranslations("legal");

  return (
    <main id="content" className="bg-paper pt-[calc(var(--header-h)+4rem)] pb-24">
      <Container>
        <h1 className="max-w-[12ch] font-display text-[clamp(2.5rem,8vw,5rem)] leading-[0.95] tracking-[-0.05em] text-ink">
          {t("notFoundTitle")}
        </h1>
        <p className="mt-6 max-w-[42ch] text-[1.0625rem] leading-7 text-ink/80">
          {t("notFoundNote")}
        </p>
        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
          <Button href={pathFor(locale, "home")}>{t("home")}</Button>
          <Button href={pathFor(locale, "contact")} variant="ghost">
            {t("contact")}
          </Button>
        </div>
      </Container>
    </main>
  );
}
