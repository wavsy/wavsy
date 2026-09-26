"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Logo } from "@/components/layout/Logo";
import { MobileNav } from "@/components/layout/MobileNav";
import { LanguageSwitch } from "@/components/layout/LanguageSwitch";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { pathFor, type Locale } from "@/lib/routes";

// Every page opens on a dark hero, so the header sits on it in white until it
// turns compact and gets its own light background.

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      setCompact(window.scrollY > 80);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onDark = !compact && !open;

  const items = [
    { href: pathFor(locale, "services"), label: t("services") },
    { href: pathFor(locale, "ai"), label: t("ai") },
    { href: pathFor(locale, "portfolio"), label: t("portfolio") },
    { href: pathFor(locale, "about"), label: t("about") },
    { href: pathFor(locale, "contact"), label: t("contact") },
  ];

  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[70] overflow-visible transition-[background,border-color,backdrop-filter] duration-150",
        compact || open
          ? "border-b border-mist/80 bg-paper/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container
        className={cn(
          "flex items-center gap-2 transition-[height] duration-150 sm:gap-3",
          compact ? "h-12 sm:h-14" : "h-[var(--header-h)]",
        )}
      >
        <div className="min-w-0 shrink">
          <Logo href={pathFor(locale, "home")} onDark={onDark} />
        </div>
        <nav
          className="ml-auto hidden items-center gap-6 whitespace-nowrap xl:flex"
          aria-label={t("main")}
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-[0.9375rem] transition-colors duration-150",
                onDark ? "text-white/75 hover:text-white" : "text-ink/80 hover:text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
          <LanguageSwitch onDark={onDark} />
          <Button
            href={pathFor(locale, "contact")}
            variant={onDark ? "inverse" : "primary"}
            className="whitespace-nowrap"
          >
            {t("cta")}
          </Button>
        </nav>
        <div className="relative z-50 ml-auto flex items-center gap-2 xl:hidden">
          <LanguageSwitch onDark={onDark} />
          <button
            type="button"
            className="relative z-50 flex h-11 w-11 items-center justify-center"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? t("closeMenu") : t("openMenu")}</span>
            <span className="flex w-5 flex-col gap-1.5" aria-hidden>
              <span
                className={cn(
                  "h-px w-full transition-transform duration-150",
                  onDark ? "bg-white" : "bg-ink",
                  open && "translate-y-[4px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-px w-full transition-transform duration-150",
                  onDark ? "bg-white" : "bg-ink",
                  open && "-translate-y-[4px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </Container>
    </header>
    <MobileNav open={open} onClose={() => setOpen(false)} locale={locale} pathname={pathname} />
    </>
  );
}
