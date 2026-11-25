"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { LivingCover } from "@/components/portfolio/LivingCover";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { cn } from "@/lib/cn";
import type { Project } from "@/lib/projects";

type GroupPreviewProps = {
  project: Project;
  /** While active, the sites take turns; otherwise the first one stays. */
  active: boolean;
  /** Show this site and stop the rotation (a hovered sub-row). */
  pinned?: number | null;
  sizes: string;
  /** Small dots in the corner showing which site is on screen. */
  dots?: boolean;
};

const STEP = 1600; // ms each site stays on screen

/**
 * The cover of a grouped row (several small sites of one kind): their stills
 * cross-fade in turn, so one row still shows every site in it. When one site
 * is chosen (a hovered sub-row), it stops there and plays that site's recording.
 */
export function GroupPreview({ project, active, pinned = null, sizes, dots = true }: GroupPreviewProps) {
  const reduce = useReducedMotionSafe();
  const items = project.group ?? [];
  const [turn, setTurn] = useState(0);

  useEffect(() => {
    if (!active || pinned !== null || reduce || items.length < 2) return;
    const timer = window.setInterval(() => setTurn((value) => (value + 1) % items.length), STEP);
    return () => window.clearInterval(timer);
  }, [active, pinned, reduce, items.length]);

  const shown = pinned ?? turn;

  return (
    <div className="absolute inset-0">
      {items.map((item, index) => (
        <div
          key={item.key}
          className={cn(
            "absolute inset-0 transition-opacity duration-500",
            shown === index ? "opacity-100" : "opacity-0",
          )}
        >
          <Image src={item.image} alt="" fill sizes={sizes} className="object-cover object-top" />
          {/* A chosen site plays its own recording, like any other project. */}
          <LivingCover project={item} active={active && pinned === index} />
        </div>
      ))}
      {dots && pinned === null && items.length > 1 ? (
        <div aria-hidden className="absolute right-3 top-3 flex gap-1.5 rounded-full bg-deep/70 px-2 py-1.5">
          {items.map((item, index) => (
            <span
              key={item.key}
              className={cn(
                "size-1.5 rounded-full transition-colors duration-300",
                shown === index ? "bg-cyan" : "bg-white/40",
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
