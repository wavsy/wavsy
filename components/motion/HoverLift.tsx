"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export function HoverLift({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover)").matches);
  }, []);

  return (
    <motion.div
      className={cn("h-full", className)}
      // Same shadow shape at rest and on hover, so motion can animate between them.
      style={{ boxShadow: "0 16px 32px -20px rgba(17, 28, 51, 0)" }}
      whileHover={
        reduce || !canHover
          ? undefined
          : { scale: 1.03, boxShadow: "0 16px 32px -20px rgba(17, 28, 51, 0.28)" }
      }
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
