"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
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
      <nav className="flex h-full flex-col px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-4">
        <div className="flex flex-1 flex-col gap-1 overflow-y-auto">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="border-b border-mist py-3.5 font-display text-[1.65rem] leading-none tracking-[-0.04em] sm:text-3xl"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="pt-6">
          <Button href={pathFor(locale, "contact")} className="w-full justify-center sm:w-fit">
            {t("cta")}
          </Button>
        </div>
      </nav>
    </div>
  );
}
