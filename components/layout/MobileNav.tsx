"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { normalizePathname, pathFor, type Locale } from "@/lib/routes";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
  locale: Locale;
  pathname: string;
};

function isCurrentPath(pathname: string, href: string) {
  return normalizePathname(pathname) === normalizePathname(href);
}

export function MobileNav({ open, onClose, locale, pathname }: MobileNavProps) {
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
      id="mobile-nav"
      className={cn(
        "fixed inset-0 z-[65] bg-paper lg:hidden",
        open ? "visible opacity-100" : "invisible pointer-events-none opacity-0",
      )}
      aria-hidden={!open}
    >
      <nav
        className="flex h-dvh flex-col px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[calc(var(--header-h)+0.75rem)]"
        aria-label={t("main")}
      >
        <div className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => {
                if (isCurrentPath(pathname, item.href)) {
                  onClose();
                }
              }}
              className="border-b border-mist py-3.5 font-display text-[1.65rem] leading-none tracking-[-0.04em] text-ink sm:text-3xl"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="pt-6">
          <Button
            href={pathFor(locale, "contact")}
            onClick={() => {
              if (isCurrentPath(pathname, pathFor(locale, "contact"))) {
                onClose();
              }
            }}
            className="w-full justify-center sm:w-fit"
          >
            {t("cta")}
          </Button>
        </div>
      </nav>
    </div>
  );
}
