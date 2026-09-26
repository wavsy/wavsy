"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
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

type Task = {
  label: string;
  title: string;
  status: string;
  steps: string[];
};

type Box = { key: keyof Nodes; x: number; y: number; w: number; strong?: boolean };

const H = 64;
const boxes: Box[] = [
  { key: "input", x: 10, y: 158, w: 170 },
  { key: "agent", x: 280, y: 152, w: 200, strong: true },
  { key: "calendar", x: 570, y: 48, w: 170 },
  { key: "crm", x: 570, y: 158, w: 170 },
  { key: "email", x: 570, y: 268, w: 170 },
  { key: "human", x: 800, y: 158, w: 170 },
];

// Edges in the order the agent uses them. Each one draws in, then a pulse
// keeps travelling along it.
const edges = [
  "M180 190 H280",
  "M480 184 C 530 184, 520 80, 570 80",
  "M480 190 H570",
  "M480 196 C 530 196, 520 300, 570 300",
  "M740 80 C 775 80, 770 184, 800 184",
  "M740 190 H800",
  "M740 300 C 775 300, 770 196, 800 196",
];

export function AgentFlow({ nodes, task }: { nodes: Nodes; task: Task }) {
  const reduce = useReducedMotionSafe();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const play = inView || !!reduce;

  return (
    <div ref={ref} className="grid gap-8 lg:grid-cols-[1.55fr_1fr] lg:items-center">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-6">
        <div className="ai-dot-grid pointer-events-none absolute inset-0" aria-hidden />

        {/* Tablet and up: the graph. */}
        <svg
          viewBox="0 0 975 380"
          className="relative hidden w-full md:block"
          role="img"
          aria-label={Object.values(nodes).join(" → ")}
        >
          <defs>
            <linearGradient id="agent-edge" x1="0" x2="1">
              <stop offset="0%" stopColor="#0B3D91" />
              <stop offset="100%" stopColor="#3FC1F0" />
            </linearGradient>
            <radialGradient id="agent-glow">
              <stop offset="0%" stopColor="#3FC1F0" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#3FC1F0" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx="380" cy="190" r="150" fill="url(#agent-glow)" className="ai-breathe" />

          {edges.map((d, index) => (
            <g key={d}>
              <path d={d} stroke="rgb(255 255 255 / 0.08)" strokeWidth="2" fill="none" />
              <motion.path
                d={d}
                stroke="url(#agent-edge)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                initial={reduce ? false : { pathLength: 0 }}
                animate={play ? { pathLength: 1 } : undefined}
                transition={reduce ? { duration: 0 } : { duration: 0.7, delay: 0.3 + edgeDelay(index), ease: "easeInOut" }}
              />
              {play && !reduce ? (
                <circle r="4" fill="#3FC1F0" style={{ filter: "drop-shadow(0 0 6px #3FC1F0)" }}>
                  <animateMotion
                    dur="2.4s"
                    begin={`${1.2 + edgeDelay(index)}s`}
                    repeatCount="indefinite"
                    path={d}
                  />
                </circle>
              ) : null}
            </g>
          ))}

          {boxes.map((box, index) => (
            <motion.g
              key={box.key}
              initial={reduce ? false : { scale: 0.85 }}
              animate={play ? { scale: 1 } : undefined}
              transition={reduce ? { duration: 0 } : { duration: 0.5, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: `${box.x + box.w / 2}px ${box.y + H / 2}px` }}
            >
              <rect
                x={box.x}
                y={box.y}
                width={box.w}
                height={box.strong ? H + 12 : H}
                rx="14"
                fill={box.strong ? "url(#agent-edge)" : "rgb(255 255 255 / 0.06)"}
                stroke={box.strong ? "none" : "rgb(255 255 255 / 0.16)"}
              />
              <text
                x={box.x + box.w / 2}
                y={box.y + (box.strong ? H + 12 : H) / 2}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#fff"
                className={cn(box.strong ? "font-display text-[24px]" : "text-[20px]")}
              >
                {nodes[box.key]}
              </text>
            </motion.g>
          ))}
        </svg>

        {/* Phones: the same path, top to bottom. */}
        <ol className="relative space-y-3 md:hidden">
          {boxes.map((box, index) => (
            <li key={box.key} className="flex items-center gap-3">
              <span
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-full text-xs",
                  box.strong ? "bg-gradient-to-br from-navy to-cyan text-white" : "border border-white/20 text-white/70",
                )}
              >
                {index + 1}
              </span>
              <span
                className={cn(
                  "flex-1 rounded-xl px-4 py-3 text-[0.9375rem]",
                  box.strong
                    ? "bg-gradient-to-r from-navy to-cyan font-display text-white"
                    : "border border-white/12 bg-white/[0.05] text-white/85",
                )}
              >
                {nodes[box.key]}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <TaskCard task={task} play={play} reduce={!!reduce} />
    </div>
  );
}

function edgeDelay(index: number) {
  if (index === 0) return 0;
  if (index <= 3) return 0.6;
  return 1.2;
}

function TaskCard({ task, play, reduce }: { task: Task; play: boolean; reduce: boolean }) {
  const stepDelay = (index: number) => (reduce ? 0 : 0.9 + index * 0.55);
  const doneDelay = stepDelay(task.steps.length);

  return (
    <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-6 backdrop-blur-md">
      <p className="text-[0.6875rem] uppercase tracking-[0.14em] text-white/50">{task.label}</p>
      <p className="mt-2 font-display text-lg tracking-[-0.03em] text-white">{task.title}</p>
      <ul className="mt-5 space-y-3">
        {task.steps.map((step, index) => (
          <li key={step} className="flex items-start gap-3 text-[0.9375rem] text-white/80">
            <span className="relative mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-white/20">
              <motion.span
                className="absolute inset-0 grid place-items-center rounded-full bg-cyan text-deep"
                initial={reduce ? false : { scale: 0 }}
                animate={play ? { scale: 1 } : undefined}
                transition={reduce ? { duration: 0 } : { duration: 0.3, delay: stepDelay(index), ease: [0.22, 1, 0.36, 1] }}
              >
                <svg viewBox="0 0 16 16" className="size-3" fill="none" aria-hidden>
                  <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.span>
            </span>
            {step}
          </li>
        ))}
      </ul>
      <motion.p
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-400/15 px-3 py-1.5 text-xs text-emerald-300"
        initial={reduce ? false : { scale: 0.6, filter: "blur(6px)" }}
        animate={play ? { scale: 1, filter: "blur(0px)" } : undefined}
        transition={reduce ? { duration: 0 } : { duration: 0.4, delay: doneDelay }}
      >
        <span className="size-1.5 rounded-full bg-emerald-300" />
        {task.status}
      </motion.p>
    </div>
  );
}
