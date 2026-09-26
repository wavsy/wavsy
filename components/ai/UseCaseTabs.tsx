"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { cn } from "@/lib/cn";

type UseCase = { label: string; headline: string; items: string[] };

export function UseCaseTabs({ tabs }: { tabs: UseCase[] }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotionSafe();
  const baseId = useId();
  const current = tabs[active];

  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
      <div
        role="tablist"
        aria-orientation="vertical"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
        onKeyDown={(event) => {
          const step = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : event.key === "ArrowUp" || event.key === "ArrowLeft" ? -1 : 0;
          if (step) {
            event.preventDefault();
            const next = (active + step + tabs.length) % tabs.length;
            setActive(next);
            document.getElementById(`${baseId}-tab-${next}`)?.focus();
          }
        }}
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            id={`${baseId}-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-controls={`${baseId}-panel`}
            tabIndex={index === active ? 0 : -1}
            onClick={() => setActive(index)}
            className={cn(
              "relative shrink-0 rounded-xl px-5 py-3.5 text-left font-display text-lg tracking-[-0.03em] transition-colors duration-200 lg:text-2xl",
              index === active ? "text-white" : "text-ink/70 hover:text-ink",
            )}
          >
            {index === active ? (
              <motion.span
                layoutId={`${baseId}-pill`}
                className="absolute inset-0 -z-0 rounded-xl bg-gradient-to-r from-navy to-cyan"
                transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
              />
            ) : null}
            <span className="relative">{tab.label}</span>
          </button>
        ))}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        className="relative min-h-[22rem] overflow-hidden rounded-2xl border border-mist bg-white p-7 md:min-h-[20rem] md:p-9"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-display text-2xl tracking-[-0.04em] text-ink md:text-3xl">
              {current.headline}
            </p>
            <ul className="mt-7 grid gap-4 sm:grid-cols-2">
              {current.items.map((item, index) => (
                <motion.li
                  key={item}
                  initial={reduce ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: reduce ? 0 : 0.08 + index * 0.06 }}
                  className="flex items-start gap-3 rounded-xl bg-paper p-4 leading-6 text-ink/80"
                >
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
