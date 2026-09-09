"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { LanguageSwitch } from "@/components/layout/LanguageSwitch";
import { cn } from "@/lib/cn";
import { pathFor, type Locale } from "@/lib/routes";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
  locale: Locale;
};

export function MobileNav({ open, onClose, locale }: MobileNavProps) {
  const t = useTranslations("nav");

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const items = [
    { href: pathFor(locale, "home"), label: t("home") },
    { href: pathFor(locale, "services"), label: t("services") },
    { href: pathFor(locale, "portfolio"), label: t("portfolio") },
    { href: pathFor(locale, "calculator"), label: t("calculator") },
    { href: pathFor(locale, "about"), label: t("about") },
    { href: pathFor(locale, "contact"), label: t("contact") },
  ];

  return (
    <div
      className={cn(
        "fixed inset-0 z-40 bg-paper pt-[var(--header-h)] transition-opacity duration-150 lg:hidden",
        open ? "opacity-100" : "pointer-events-none opacity-0",
      )}
      hidden={!open}
    >
      <nav className="flex h-full flex-col gap-2 overflow-y-auto px-5 pb-10 pt-6">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="border-b border-mist py-4 font-display text-3xl tracking-[-0.04em]"
          >
            {item.label}
          </Link>
        ))}
        <div className="mt-8">
          <Button href={pathFor(locale, "contact")} className="w-fit">
            {t("cta")}
          </Button>
        </div>
        <div className="mt-8">
          <LanguageSwitch />
        </div>
      </nav>
    </div>
  );
}
