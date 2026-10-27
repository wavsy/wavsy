"use client";

import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { ApplicationForm } from "@/components/careers/ApplicationForm";
import { WhyJoin } from "@/components/careers/WhyJoin";
import type { ApplicationRole } from "@/lib/validation";

type Point = { label: string; body?: string; items?: string[]; tone?: "pay" };

type RoleDialogProps = {
  role: ApplicationRole;
  onClose: () => void;
};

export function RoleDialog({ role, onClose }: RoleDialogProps) {
  const t = useTranslations("careers");
  const titleId = useId();
  const summaryId = useId();
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const applicationRef = useRef<HTMLHeadingElement>(null);
  // Kept across the dev double-mount so the second pass does not lock to scroll 0.
  const scrollYRef = useRef<number | null>(null);
  const points = t.raw(`${role}.points`) as Point[];

  useEffect(() => {
    const overlay = overlayRef.current;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const inerted: Element[] = [];

    if (overlay) {
      for (const child of document.body.children) {
        if (child !== overlay && !child.hasAttribute("inert")) {
          child.setAttribute("inert", "");
          inerted.push(child);
        }
      }
    }

    const scrollY = scrollYRef.current ?? window.scrollY;
    scrollYRef.current = scrollY;
    document.documentElement.setAttribute("data-scroll-lock", "");
    const body = document.body;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    panelRef.current?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = [
        ...panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), textarea, input, select"),
      ].filter((node) => {
        if (node.hasAttribute("disabled") || node.tabIndex === -1) return false;
        if (node instanceof HTMLInputElement && node.type === "hidden") return false;
        return true;
      });
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      for (const child of inerted) child.removeAttribute("inert");
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      document.documentElement.removeAttribute("data-scroll-lock");
      window.scrollTo(0, scrollY);
      previouslyFocused?.focus();
      queueMicrotask(() => {
        if (scrollYRef.current === scrollY) scrollYRef.current = null;
      });
    };
  }, [onClose]);

  return createPortal(
    <div ref={overlayRef} className="fixed inset-0 z-[90] flex items-end justify-center p-3 sm:items-center sm:p-6">
      <div className="absolute inset-0 bg-deep/75" aria-hidden />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={summaryId}
        tabIndex={-1}
        className="relative flex max-h-[min(920px,calc(100dvh-1.5rem))] w-full max-w-[44rem] flex-col overflow-hidden rounded-3xl bg-white text-ink shadow-[0_30px_80px_-30px_rgb(11_61_145/0.55)] outline-none motion-safe:animate-[rise_0.5s_ease-out_both] sm:max-h-[min(920px,calc(100dvh-3rem))]"
      >
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-mist px-6 py-4 sm:px-8">
          <p className="text-[0.75rem] font-medium uppercase tracking-[0.14em] text-navy">
            {t(`${role}.eyebrow`)}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("close")}
            className="grid size-10 place-items-center rounded-full border border-mist text-ink transition-colors hover:border-navy hover:text-navy focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan/30"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="overflow-y-auto overscroll-contain px-6 py-7 sm:px-8 sm:py-9" data-lenis-prevent>
          <h2
            id={titleId}
            className="font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[0.95] tracking-[-0.045em]"
          >
            {t(`${role}.title`)}
          </h2>
          <button
            type="button"
            onClick={() => {
              const target = applicationRef.current;
              const scroller = target?.closest("[data-lenis-prevent]");
              if (!target || !(scroller instanceof HTMLElement)) return;
              const top =
                target.getBoundingClientRect().top -
                scroller.getBoundingClientRect().top +
                scroller.scrollTop;
              const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
              if (reduce) {
                scroller.scrollTop = top;
                target.focus({ preventScroll: true });
                return;
              }
              const start = scroller.scrollTop;
              const distance = top - start;
              const duration = 450;
              const started = performance.now();
              const step = (now: number) => {
                const progress = Math.min(1, (now - started) / duration);
                const eased = 1 - (1 - progress) ** 3;
                scroller.scrollTop = start + distance * eased;
                if (progress < 1) {
                  requestAnimationFrame(step);
                  return;
                }
                target.focus({ preventScroll: true });
              };
              requestAnimationFrame(step);
            }}
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-ink/15 px-3.5 py-1.5 text-sm font-medium text-ink transition-colors hover:border-navy hover:text-navy focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan/30"
          >
            {t("form.heading")}
            <span aria-hidden>↓</span>
          </button>
          {role === "sales" ? (
            <p id={summaryId} className="mt-5 max-w-[34ch] text-lg font-medium leading-7 text-ink">
              {t("sales.lead")}
            </p>
          ) : (
            <p id={summaryId} className="mt-4 max-w-[52ch] text-[1.0625rem] leading-8 text-ink/75">
              {t(`${role}.summary`)}
            </p>
          )}
          <div className="mt-8 grid gap-6">
            {points.map((point) => (
              <section
                key={point.label}
                className={
                  point.tone === "pay" ? "rounded-2xl bg-deep px-5 py-5 text-white sm:px-6" : undefined
                }
              >
                <h3
                  className={
                    point.tone === "pay"
                      ? "text-[0.75rem] font-medium uppercase tracking-[0.14em] text-cyan"
                      : "text-[0.75rem] font-medium uppercase tracking-[0.14em] text-muted"
                  }
                >
                  {point.label}
                </h3>
                {point.body ? (
                  <p
                    className={
                      point.tone === "pay"
                        ? "mt-2 max-w-[52ch] leading-7 text-white/85"
                        : "mt-2 max-w-[52ch] leading-7 text-ink/80"
                    }
                  >
                    {point.body}
                  </p>
                ) : null}
                {point.items ? (
                  <ul className="mt-3 grid max-w-[54ch] gap-2">
                    {point.items.map((item) => (
                      <li
                        key={item}
                        className={
                          point.tone === "pay"
                            ? "flex items-start gap-3 leading-7 text-white/85"
                            : "flex items-start gap-3 leading-7 text-ink/80"
                        }
                      >
                        <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-cyan" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
          {role === "sales" ? <WhyJoin /> : null}
          <div className="mt-10 border-t border-mist pt-8">
            <h3
              ref={applicationRef}
              tabIndex={-1}
              className="font-display text-[clamp(1.75rem,3vw,2.25rem)] tracking-[-0.04em] outline-none"
            >
              {t("form.heading")}
            </h3>
            <div className="mt-6">
              <ApplicationForm role={role} />
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
