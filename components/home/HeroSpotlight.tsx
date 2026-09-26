"use client";

import { useEffect, useRef } from "react";

// A soft light that follows the pointer across the hero (Linear, Vercel).
// Only on a mouse or trackpad, never under reduced motion.
export function HeroSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    const onMove = (event: PointerEvent) => {
      const box = parent.getBoundingClientRect();
      el.style.setProperty("--spot-x", `${event.clientX - box.left}px`);
      el.style.setProperty("--spot-y", `${event.clientY - box.top}px`);
      el.style.opacity = "1";
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };
    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);
    return () => {
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500"
      style={{
        background:
          "radial-gradient(520px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgb(63 193 240 / 0.14), transparent 60%)",
      }}
    />
  );
}
