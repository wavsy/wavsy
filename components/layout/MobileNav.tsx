"use client";

import { useEffect } from "react";
import Link from "next/link";
import { nav } from "@/content/bg/nav";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileNav({ open, onClose }: MobileNavProps) {
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

  return (
    <div
      className={cn(
        "fixed inset-0 z-40 bg-paper pt-[var(--header-h)] transition-opacity duration-200 md:hidden",
        open ? "opacity-100" : "pointer-events-none opacity-0",
      )}
      hidden={!open}
    >
      <nav
        className="flex h-full flex-col gap-2 px-5 pb-10 pt-6"
        aria-label="Мобилна навигация"
      >
        <Link
          href={nav.home.href}
          onClick={onClose}
          className="border-b border-mist py-4 font-display text-3xl tracking-[-0.04em]"
        >
          {nav.home.label}
        </Link>
        {nav.items.map((item) => (
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
          <Button href={nav.cta.href} className="w-fit">
            {nav.cta.label}
          </Button>
        </div>
      </nav>
    </div>
  );
}
