"use client";

import { motion } from "motion/react";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { cn } from "@/lib/cn";

type HeadingRevealProps = {
  lines: string[];
  as?: "h1" | "h2";
  className?: string;
};

export function HeadingReveal({
  lines,
  as: Tag = "h2",
  className,
}: HeadingRevealProps) {
  const reduce = useReducedMotionSafe();

  // The page title is the largest thing on first paint. Starting its lines at
  // opacity 0 held Largest Contentful Paint back until JavaScript loaded
  // (about 3 s on mobile). The hero copy already rises in with CSS on desktop
  // (.hero-copy in globals.css), so the h1 lines render as they are.
  if (Tag === "h1") {
    return (
      <Tag className={cn(className)}>
        {lines.map((line, index) => (
          <span key={`${line}-${index}`} className="block">
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={cn(className)}>
      {lines.map((line, index) => (
        <motion.span
          key={`${line}-${index}`}
          className="block"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-64px" }}
          transition={
            reduce
              ? { duration: 0 }
              : { duration: 0.5, ease: "easeOut", delay: index * 0.06 }
          }
        >
          {line}
        </motion.span>
      ))}
    </Tag>
  );
}
