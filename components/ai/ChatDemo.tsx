"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { cn } from "@/lib/cn";

type ChatMessage = { from: "user" | "ai" | "tool"; text: string };

type ChatDemoProps = {
  label: string;
  name: string;
  status: string;
  typing: string;
  messages: ChatMessage[];
};

// How long each kind of message waits before it appears. An assistant reply
// shows the typing dots for its whole wait.
const waitFor: Record<ChatMessage["from"], number> = {
  user: 1400,
  ai: 1500,
  tool: 750,
};
const RESTART_AFTER = 5000;

export function ChatDemo({ label, name, status, typing, messages }: ChatDemoProps) {
  const reduce = useReducedMotionSafe();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px" });
  // The first message is in the server HTML, so the card is never empty on
  // first paint. The rest arrive once the card is on screen.
  const [shown, setShown] = useState(1);
  const [cycle, setCycle] = useState(0);
  const count = reduce ? messages.length : shown;
  const next = messages[count];
  const isTyping = !reduce && inView && next?.from === "ai";

  useEffect(() => {
    if (reduce || !inView) {
      return;
    }
    const timer = window.setTimeout(
      () => {
        if (count < messages.length) {
          setShown(count + 1);
        } else {
          setShown(1);
          setCycle((value) => value + 1);
        }
      },
      next ? waitFor[next.from] : RESTART_AFTER,
    );
    return () => window.clearTimeout(timer);
  }, [count, inView, messages.length, next, reduce]);

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden rounded-2xl border border-white/12 bg-white/[0.06] shadow-[0_30px_80px_-20px_rgb(0_0_0/0.6)] backdrop-blur-md"
    >
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
        <span className="relative grid size-9 place-items-center rounded-full bg-gradient-to-br from-navy to-cyan font-display text-sm text-white">
          W
          <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-deep bg-emerald-400" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-white">{name}</p>
          <p className="text-xs text-white/55">{status}</p>
        </div>
      </div>

      <div
        className="chat-fade flex h-[23rem] flex-col justify-end gap-2.5 overflow-hidden px-4 pb-5 pt-4 sm:h-[24rem]"
        aria-live="off"
      >
        <AnimatePresence initial={false} mode="popLayout">
          {messages.slice(0, count).map((message, index) => (
            <motion.div
              key={`${cycle}-${index}`}
              layout={!reduce}
              initial={index === 0 || reduce ? false : { opacity: 0, y: 14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "flex",
                message.from === "user" ? "justify-end" : "justify-start",
              )}
            >
              {message.from === "tool" ? (
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1.5 text-xs text-cyan">
                  <CheckIcon />
                  {message.text}
                </span>
              ) : (
                <p
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-2.5 text-[0.9375rem] leading-6",
                    message.from === "user"
                      ? "rounded-br-md bg-white text-ink"
                      : "rounded-bl-md bg-white/10 text-white",
                  )}
                >
                  {message.text}
                </p>
              )}
            </motion.div>
          ))}
          {isTyping ? (
            <motion.div
              key={`typing-${cycle}-${count}`}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex"
            >
              <span
                className="inline-flex items-center gap-1 rounded-2xl rounded-bl-md bg-white/10 px-4 py-3.5"
                role="img"
                aria-label={typing}
              >
                <span className="typing-dot" />
                <span className="typing-dot [animation-delay:150ms]" />
                <span className="typing-dot [animation-delay:300ms]" />
              </span>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      <p className="border-t border-white/10 py-2.5 text-center text-[0.6875rem] uppercase tracking-[0.14em] text-white/45">
        {label}
      </p>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden>
      <path
        d="M3.5 8.5l3 3 6-7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
