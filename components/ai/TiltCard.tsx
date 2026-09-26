"use client";

import { useEffect, useRef } from "react";

// Tilts its child toward the pointer and moves a soft glare with it. Only on
// a mouse or trackpad: touch screens and reduced motion get a still card.
export function TiltCard({
  children,
  className = "w-full max-w-[26rem]",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) {
      return;
    }
    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) {
      return;
    }

    const onMove = (event: PointerEvent) => {
      const box = root.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width;
      const y = (event.clientY - box.top) / box.height;
      root.style.setProperty("--tilt-x", `${((0.5 - y) * 8).toFixed(2)}deg`);
      root.style.setProperty("--tilt-y", `${((x - 0.5) * 10).toFixed(2)}deg`);
      root.style.setProperty("--glare-x", `${(x * 100).toFixed(1)}%`);
      root.style.setProperty("--glare-y", `${(y * 100).toFixed(1)}%`);
      root.dataset.active = "true";
    };
    const onLeave = () => {
      root.style.setProperty("--tilt-x", "0deg");
      root.style.setProperty("--tilt-y", "0deg");
      delete root.dataset.active;
    };

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={`tilt-card [perspective:1200px] ${className}`}>
      <div className="tilt-card-inner relative">
        {children}
        <span className="tilt-card-glare pointer-events-none absolute inset-0 rounded-2xl" aria-hidden />
      </div>
    </div>
  );
}
