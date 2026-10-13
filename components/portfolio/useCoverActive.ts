"use client";

import { useEffect, useRef, useState } from "react";

// When a portfolio cover should come alive: under the mouse (or keyboard
// focus) on devices that can hover, and while it crosses the middle of the
// screen on touch screens, where scrolling stands in for hovering.
export function useCoverActive<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(hover: hover)").matches) {
      const on = () => setActive(true);
      const off = () => setActive(false);
      // Keyboard focus lands on the link that wraps the card, so listen there.
      const focusable = el.closest("a") ?? el;
      el.addEventListener("pointerenter", on);
      el.addEventListener("pointerleave", off);
      focusable.addEventListener("focusin", on);
      focusable.addEventListener("focusout", off);
      return () => {
        el.removeEventListener("pointerenter", on);
        el.removeEventListener("pointerleave", off);
        focusable.removeEventListener("focusin", on);
        focusable.removeEventListener("focusout", off);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "-42% 0px -42% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, active };
}
