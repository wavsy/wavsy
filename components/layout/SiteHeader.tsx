"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { nav } from "@/content/bg/nav";
import { Logo } from "@/components/layout/Logo";
import { MobileNav } from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setCompact(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background,border-color,backdrop-filter] duration-300",
        compact || open
          ? "border-b border-mist/80 bg-paper/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-[var(--header-h)] items-center justify-between gap-6">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Основна навигация">
          {nav.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.9375rem] text-ink/80 transition-colors duration-200 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <Button href={nav.cta.href}>{nav.cta.label}</Button>
        </nav>
        <button
          type="button"
          className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? nav.closeMenu : nav.openMenu}</span>
          <span className="flex w-5 flex-col gap-1.5" aria-hidden>
            <span
              className={cn(
                "h-px w-full bg-ink transition-transform duration-200",
                open && "translate-y-[4px] rotate-45",
              )}
            />
            <span
              className={cn(
                "h-px w-full bg-ink transition-transform duration-200",
                open && "-translate-y-[4px] -rotate-45",
              )}
            />
          </span>
        </button>
      </Container>
      <div id="mobile-nav">
        <MobileNav open={open} onClose={() => setOpen(false)} />
      </div>
    </header>
  );
}
