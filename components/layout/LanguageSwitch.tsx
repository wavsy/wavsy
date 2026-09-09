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
        "flex shrink-0 items-center gap-1 text-[0.75rem] tracking-[0.08em] sm:gap-2 sm:text-[0.8125rem] sm:tracking-[0.04em]",
        className,
      )}
      aria-label={t("language")}
    >
      {locales.map((locale) => (
        <Link
          key={locale}
          href={pathFor(locale, route)}
          hrefLang={locale}
          className={cn(
            "px-1 py-1 text-ink/55 transition-colors duration-150 hover:text-ink",
            current === locale && "text-ink",
          )}
          aria-current={current === locale ? "true" : undefined}
        >
          {labels[locale]}
        </Link>
      ))}
    </nav>
  );
}
