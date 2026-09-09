"use client";

import { motion, useReducedMotion } from "motion/react";
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
  const reduce = useReducedMotion();

  return (
    <Tag className={cn(className)}>
      {lines.map((line, index) => (
        <motion.span
          key={`${line}-${index}`}
          className="block"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-64px" }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
            delay: reduce ? 0 : index * 0.06,
          }}
        >
          {line}
        </motion.span>
      ))}
    </Tag>
  );
}
