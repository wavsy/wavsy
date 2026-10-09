"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { cn } from "@/lib/cn";
import type { Project } from "@/lib/projects";

type LivingCoverProps = {
  project: Project;
  /** Only the active cover moves; the others stay as their still image. */
  active: boolean;
  className?: string;
};

const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";
const MOVE = 1300; // ms spent scrolling to the next stop
const REST = 1500; // ms spent looking at it

// Where the cursor rests at each stop, as a share of the visible page.
const RESTS: [number, number][] = [
  [28, 62],
  [66, 38],
  [44, 70],
  [74, 56],
  [22, 34],
  [58, 64],
];

/**
 * A "living" portfolio cover: the still thumbnail turns into a browser
 * window and the real site scrolls through it, section by section, with a
 * cursor, while a phone beside it shows the mobile version. Both are
 * recordings of the live site (tall screenshots), laid over the still image,
 * which stays underneath as the fallback.
 *
 * The tall image is only requested the first time the cover becomes active,
 * so it never competes with the first paint.
 */
export function LivingCover({ project, active, className }: LivingCoverProps) {
  const reduce = useReducedMotionSafe();
  const [wanted, setWanted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const pageRef = useRef<HTMLImageElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const clickRef = useRef<HTMLSpanElement>(null);
  const phoneRef = useRef<HTMLImageElement>(null);
  const animations = useRef<Animation[]>([]);

  useEffect(() => {
    if (active) setWanted(true);
  }, [active]);

  const tour = project.tour;

  // Build the scroll, cursor and click timelines once the image is in.
  useEffect(() => {
    const page = pageRef.current;
    const cursor = cursorRef.current;
    const click = clickRef.current;
    if (!tour || !loaded || !page || !cursor || !click) return;

    // The window shows 16:10 minus the bar; one stop is about 70% of a screen.
    const screens = tour.ratio / 0.56;
    const stops = Math.max(2, Math.min(12, Math.round(screens / 0.7)));
    const back = 1800;
    const total = stops * (MOVE + REST) + back;
    const at = (ms: number) => Math.min(ms / total, 1);
    const scrollTo = (share: number) =>
      `translateY(calc((-100% + 100cqh) * ${share.toFixed(4)}))`;
    const place = ([x, y]: [number, number]) => `translate(${x}cqw, ${y}cqh)`;

    const pageFrames: Keyframe[] = [];
    const cursorFrames: Keyframe[] = [];
    const clickFrames: Keyframe[] = [];

    for (let i = 0; i < stops; i++) {
      const start = i * (MOVE + REST);
      const share = i / (stops - 1);
      const rest = RESTS[i % RESTS.length];
      // Arrive, then hold until it is time to move on.
      pageFrames.push(
        { offset: at(start), transform: scrollTo(share), easing: "linear" },
        { offset: at(start + REST), transform: scrollTo(share), easing: EASE },
      );
      cursorFrames.push(
        { offset: at(start), transform: place(rest), easing: EASE },
        { offset: at(start + REST * 0.55), transform: place(RESTS[(i + 1) % RESTS.length]), easing: "linear" },
        { offset: at(start + REST), transform: place(RESTS[(i + 1) % RESTS.length]), easing: EASE },
      );
      // A click ripple just before the page moves.
      clickFrames.push(
        { offset: at(start + REST * 0.6), transform: "scale(0.3)", opacity: 0 },
        { offset: at(start + REST * 0.72), transform: "scale(1)", opacity: 0.55 },
        { offset: at(start + REST * 0.98), transform: "scale(2.4)", opacity: 0 },
      );
    }
    pageFrames.push({ offset: 1, transform: scrollTo(0) });
    cursorFrames.push({ offset: 1, transform: place(RESTS[0]) });
    clickFrames.unshift({ offset: 0, transform: "scale(0.3)", opacity: 0 });
    clickFrames.push({ offset: 1, transform: "scale(0.3)", opacity: 0 });

    const timing: KeyframeAnimationOptions = { duration: total, iterations: Infinity };
    animations.current = [
      page.animate(pageFrames, timing),
      cursor.animate(cursorFrames, timing),
      click.animate(clickFrames, timing),
    ];
    // The phone beside the browser scrolls its own (mobile) recording.
    const phone = phoneRef.current;
    if (phone) {
      animations.current.push(
        phone.animate(
          [{ transform: "translateY(0)" }, { transform: "translateY(calc(-100% + 100cqh))" }],
          { duration: total * 0.8, iterations: Infinity, direction: "alternate", easing: "ease-in-out" },
        ),
      );
    }
    for (const animation of animations.current) animation.pause();

    return () => {
      for (const animation of animations.current) animation.cancel();
      animations.current = [];
    };
  }, [tour, loaded]);

  // Play only while this cover is the active one and the tab is visible.
  useEffect(() => {
    const sync = () => {
      const run = active && !document.hidden;
      for (const animation of animations.current) {
        if (run) animation.play();
        else animation.pause();
      }
    };
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, [active, loaded]);

  if (!tour || reduce || !wanted) return null;

  const host = new URL(project.url).host.replace(/^www\./, "");

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 flex flex-col overflow-hidden bg-deep transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        active && loaded ? "opacity-100" : "opacity-0",
        className,
      )}
    >
      <div className="flex h-[9%] min-h-5 shrink-0 items-center gap-[3%] bg-deep px-[3%]">
        <span className="flex gap-[0.3em] text-[0.5rem]">
          <i className="size-[0.7em] rounded-full bg-white/25" />
          <i className="size-[0.7em] rounded-full bg-white/25" />
          <i className="size-[0.7em] rounded-full bg-cyan" />
        </span>
        <span className="min-w-0 flex-1 truncate rounded-full bg-white/10 px-[4%] py-[0.25em] text-center text-[0.5625rem] leading-none tracking-wide text-white/75">
          {host}
        </span>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden bg-white [container-type:size]">
        {/* eslint-disable-next-line @next/next/no-img-element -- a tall recording, loaded on demand and shown at its own size */}
        <img
          ref={pageRef}
          src={tour.src}
          alt=""
          decoding="async"
          onLoad={() => setLoaded(true)}
          className="absolute inset-x-0 top-0 block w-full will-change-transform"
        />
        <span ref={cursorRef} className="absolute left-0 top-0 block will-change-transform">
          <span
            ref={clickRef}
            className="absolute -left-3 -top-3 block size-6 rounded-full bg-cyan opacity-0"
          />
          <svg
            viewBox="0 0 24 24"
            className="relative block h-[clamp(14px,5.5cqw,22px)] w-auto drop-shadow-[0_2px_4px_rgb(0_0_0/0.45)]"
          >
            <path
              d="M5 3l14 8.5-6.2 1.4L9.6 19 5 3z"
              fill="#0b1b3a"
              stroke="#fff"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        {project.tourMobile ? (
          <span
            className={cn(
              "absolute bottom-[5%] right-[4%] block aspect-[9/17] w-[19%] rounded-[12%/6%] bg-deep p-[1.2%] shadow-[0_10px_30px_-8px_rgb(0_0_0/0.75)] ring-1 ring-white/25 transition-transform delay-200 duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
              active && loaded ? "translate-y-0" : "translate-y-[130%]",
            )}
          >
            <span className="relative block h-full w-full overflow-hidden rounded-[10%/5%] bg-white [container-type:size]">
              {/* eslint-disable-next-line @next/next/no-img-element -- a tall recording, loaded on demand */}
              <img
                ref={phoneRef}
                src={project.tourMobile.src}
                alt=""
                decoding="async"
                className="absolute inset-x-0 top-0 block w-full will-change-transform"
              />
            </span>
          </span>
        ) : null}
      </div>
    </div>
  );
}
