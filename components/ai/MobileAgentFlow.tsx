"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { cn } from "@/lib/cn";

type Nodes = {
  input: string;
  agent: string;
  calendar: string;
  crm: string;
  email: string;
  human: string;
};

// The agent graph for phones: the same path top to bottom, full width. A
// line draws as the section scrolls, a light runs down it, and each step
// lights up when the line reaches it. The three tools branch side by side.
export function MobileAgentFlow({ nodes }: { nodes: Nodes }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });
  const fill = reduce ? 1 : progress;

  return (
    <div ref={ref} className="relative">
      {/* Track and fill down the middle */}
      <span className="pointer-events-none absolute bottom-6 left-1/2 top-6 w-px -translate-x-1/2 bg-white/10" aria-hidden />
      <motion.span
        className="pointer-events-none absolute bottom-6 left-1/2 top-6 w-[2px] -translate-x-1/2 origin-top bg-gradient-to-b from-navy via-[#136fd4] to-cyan"
        style={{ scaleY: fill }}
        aria-hidden
      />
      {!reduce ? (
        <span className="agent-runner pointer-events-none absolute left-1/2 top-6 size-2.5 -translate-x-1/2 rounded-full bg-cyan shadow-[0_0_14px_4px_rgb(63_193_240/0.7)]" aria-hidden />
      ) : null}

      <ol className="relative grid gap-5">
        <Step at={0.02} progress={progress} reduce={reduce}>
          <Card>{nodes.input}</Card>
        </Step>
        <Step at={0.25} progress={progress} reduce={reduce}>
          <div className="relative mx-auto w-full">
            <span className="agent-ring pointer-events-none absolute inset-0 rounded-2xl" aria-hidden />
            <div className="relative rounded-2xl bg-gradient-to-r from-navy via-[#136fd4] to-cyan px-5 py-5 text-center font-display text-xl tracking-[-0.03em] text-white shadow-[0_20px_50px_-15px_rgb(63_193_240/0.7)]">
              {nodes.agent}
            </div>
          </div>
        </Step>
        <Step at={0.55} progress={progress} reduce={reduce}>
          <div className="grid grid-cols-3 gap-2">
            {[nodes.calendar, nodes.crm, nodes.email].map((label) => (
              <Card key={label} compact>
                {label}
              </Card>
            ))}
          </div>
        </Step>
        <Step at={0.85} progress={progress} reduce={reduce}>
          <Card accent>
            <span className="inline-flex items-center gap-2">
              <span className="grid size-5 place-items-center rounded-full bg-emerald-400 text-deep">
                <svg viewBox="0 0 16 16" className="size-3" fill="none" aria-hidden>
                  <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {nodes.human}
            </span>
          </Card>
        </Step>
      </ol>
    </div>
  );
}

function Step({
  at,
  progress,
  reduce,
  children,
}: {
  at: number;
  progress: MotionValue<number>;
  reduce: boolean;
  children: React.ReactNode;
}) {
  const lit = useTransform(progress, (value) =>
    reduce ? 1 : Math.min(Math.max((value - at + 0.08) / 0.08, 0), 1),
  );
  const opacity = useTransform(lit, [0, 1], [0.45, 1]);
  const scale = useTransform(lit, [0, 1], [0.96, 1]);

  return (
    <motion.li className="relative" style={{ opacity, scale }}>
      {children}
    </motion.li>
  );
}

function Card({
  children,
  compact,
  accent,
}: {
  children: React.ReactNode;
  compact?: boolean;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border bg-deep/90 text-center text-white backdrop-blur-sm",
        compact ? "px-2 py-3.5 text-sm" : "px-5 py-4 text-[0.9375rem]",
        accent ? "border-emerald-400/40 shadow-[0_10px_40px_-15px_rgb(52_211_153/0.5)]" : "border-white/15",
      )}
    >
      {children}
    </div>
  );
}
