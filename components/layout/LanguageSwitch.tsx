"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import {
  isLocale,
  localeFromPathname,
  locales,
  pathFor,
  routeKeyFromPathname,
  type Locale,
} from "@/lib/routes";

const labels: Record<Locale, string> = {
  bg: "BG",
  en: "EN",
  de: "DE",
};

export function LanguageSwitch({ className }: { className?: string }) {
  const t = useTranslations("nav");
  const pathname = usePathname() || "/";
  const intlLocale = useLocale();
  const current = isLocale(intlLocale) ? intlLocale : localeFromPathname(pathname);
  const route = routeKeyFromPathname(pathname);

  return (
    <nav
      className={cn(
        "flex shrink-0 items-center text-[0.625rem] font-medium uppercase tracking-[0.12em] text-ink/40",
        className,
      )}
      aria-label={t("language")}
    >
      {locales.map((locale, index) => (
        <span key={locale} className="flex items-center">
          {index > 0 ? (
            <span className="px-0.5 text-ink/20" aria-hidden>
              /
            </span>
          ) : null}
          <Link
            href={pathFor(locale, route)}
            hrefLang={locale}
            className={cn(
              "px-0.5 py-0.5 transition-colors duration-150 hover:text-ink/70",
              current === locale && "text-ink",
            )}
            aria-current={current === locale ? "true" : undefined}
          >
            {labels[locale]}
          </Link>
        </span>
      ))}
    </nav>
  );
}
