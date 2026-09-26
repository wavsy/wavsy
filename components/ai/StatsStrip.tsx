"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

type Stat = { value: string; label: string };

// Every value is in the server HTML as written. A value that is a plain
// number counts up to itself when it scrolls into view; others stay as they are.
export function StatsStrip({ items }: { items: Stat[] }) {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="@container bg-deep p-6 md:p-8">
          <dt className="sr-only">{item.label}</dt>
          <dd>
            <CountUp value={item.value} />
            <p className="mt-3 text-sm leading-6 text-white/60">{item.label}</p>
          </dd>
        </div>
      ))}
    </dl>
  );
}

function CountUp({ value }: { value: string }) {
  const match = /^(\d+)(%|\+)?$/.exec(value);
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotionSafe();
  const [text, setText] = useState(value);

  useEffect(() => {
    if (!match || !inView || reduce) {
      return;
    }
    const target = Number(match[1]);
    const suffix = match[2] ?? "";
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setText(`${Math.round(latest)}${suffix}`),
    });
    return () => controls.stop();
    // match is derived from value; value is the real dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value]);

  return (
    <p
      ref={ref}
      aria-hidden
      className="ai-gradient-text whitespace-nowrap font-display text-[clamp(1.75rem,22cqi,3.75rem)] leading-none tracking-[-0.05em] tabular-nums"
    >
      {text}
    </p>
  );
}
