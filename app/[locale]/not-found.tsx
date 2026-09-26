import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { currentLocale } from "@/lib/locale";
import { pathFor } from "@/lib/routes";

export default async function LocaleNotFound() {
  const locale = await currentLocale();
  const t = await getTranslations("legal");

  return (
    <main id="content" className="bg-paper">
      <PageHeader title={t("notFoundTitle")} lead={t("notFoundNote")} eyebrow="404">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
          <Button href={pathFor(locale, "home")} variant="inverse">
            {t("home")}
          </Button>
          <Button href={pathFor(locale, "contact")} variant="ghost" className="text-white/80 hover:text-cyan">
            {t("contact")}
          </Button>
        </div>
      </PageHeader>
    </main>
  );
}
