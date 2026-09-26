"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

type Step = { title: string; body: string };

// The line between the steps fills as the section scrolls past, and each
// step lights up when the line reaches it.
export function ProcessSteps({
  steps,
  columns = "md:grid-cols-5",
}: {
  steps: Step[];
  columns?: string;
}) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  const fill = reduce ? 1 : progress;

  return (
    <ol ref={ref} className={`relative mt-12 grid gap-10 md:mt-16 md:gap-6 ${columns}`}>
      {/* Track and fill: horizontal from tablet up, vertical on phones. */}
      <span className="pointer-events-none absolute left-5 top-5 bottom-5 w-px bg-navy/12 md:left-0 md:right-0 md:bottom-auto md:h-px md:w-auto" aria-hidden />
      <motion.span
        className="pointer-events-none absolute left-5 top-5 bottom-5 hidden w-px origin-top bg-gradient-to-b from-navy to-cyan max-md:block"
        style={{ scaleY: fill }}
        aria-hidden
      />
      <motion.span
        className="pointer-events-none absolute left-0 right-0 top-5 hidden h-px origin-left bg-gradient-to-r from-navy to-cyan md:block"
        style={{ scaleX: fill }}
        aria-hidden
      />
      {steps.map((step, index) => (
        <StepItem
          key={step.title}
          step={step}
          index={index}
          at={index / Math.max(steps.length - 1, 1)}
          progress={progress}
          reduce={!!reduce}
        />
      ))}
    </ol>
  );
}

function StepItem({
  step,
  index,
  at,
  progress,
  reduce,
}: {
  step: Step;
  index: number;
  at: number;
  progress: ReturnType<typeof useSpring>;
  reduce: boolean;
}) {
  const lit = useTransform(progress, (value) =>
    reduce ? 1 : Math.min(Math.max((value - at + 0.1) / 0.1, 0), 1),
  );
  const scale = useTransform(lit, [0, 1], [1, 1.08]);
  const color = useTransform(lit, [0, 1], ["#0b3d91", "#ffffff"]);

  return (
    <li className="relative pl-16 md:pl-0">
      <motion.span
        style={{ scale }}
        className="absolute left-0 top-0 grid size-10 place-items-center rounded-full border border-navy/25 bg-paper font-display text-sm text-navy md:relative"
      >
        <motion.span
          className="absolute inset-0 rounded-full bg-gradient-to-br from-navy to-cyan shadow-[0_0_24px_rgb(63_193_240/0.6)]"
          style={{ opacity: lit }}
          aria-hidden
        />
        <motion.span className="relative" style={{ color }}>
          {String(index + 1).padStart(2, "0")}
        </motion.span>
      </motion.span>
      <h3 className="font-display text-xl tracking-[-0.03em] md:mt-5">{step.title}</h3>
      <p className="mt-2 text-[0.9375rem] leading-6 text-ink/70">{step.body}</p>
    </li>
  );
}
