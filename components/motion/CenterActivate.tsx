"use client";

import { useEffect, useRef } from "react";

// On touch screens there is no hover, so the effects a mouse triggers are
// triggered by scrolling instead: every descendant marked `data-center`
// gets `data-center-active` while it crosses a band in the middle of the
// screen. CSS then styles `[data-center-active]` like `:hover`. Does
// nothing on devices that can hover.
export function CenterActivate({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const touch = window.matchMedia("(hover: none)");
    if (!touch.matches) return;

    const targets = root.querySelectorAll<HTMLElement>("[data-center]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.setAttribute("data-center-active", "");
          } else {
            el.removeAttribute("data-center-active");
          }
        }
      },
      { rootMargin: "-49% 0px -49% 0px" },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
