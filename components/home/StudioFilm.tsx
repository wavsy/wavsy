"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { cn } from "@/lib/cn";
import { projects } from "@/lib/projects";
import s from "./StudioFilm.module.css";

type Step = { title: string; body: string };

export type FilmCopy = {
  /** Four chat messages: client, us, client, us. */
  talk: string[];
  offerTitle: string;
  /** The lines of the offer that get ticked. */
  offer: string[];
  live: string;
  /** Short labels shown with the finished site. */
  chips: string[];
};

// How long each scene stays, in ms. The conversation has the most to read.
const SCENE_MS = [8600, 6200, 6400, 7200];

// The site the film is "made" about: a real client project, shown as it is.
const subject = projects[0];
const host = new URL(subject.url).host.replace(/^www\./, "");

const CODE = [
  "export default function Page() {",
  "  return (",
  "    <Hero />",
  "    <Programs />",
  "    <Location />",
  "    <Contact />",
  "  );",
  "}",
];

/**
 * A short looping film of how a site gets made, one scene per step of
 * "How we work": a conversation, an offer, the build, the launch. It is
 * drawn in code (no video file) and only plays while it is on screen.
 * The bars under it are buttons, so a visitor can jump to any scene.
 */
export function StudioFilm({ steps, copy }: { steps: Step[]; copy: FilmCopy }) {
  const reduce = useReducedMotionSafe();
  const ref = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState(0);
  const [inView, setInView] = useState(false);
  // Bumps on every scene start so the same scene can be replayed by a click.
  const [run, setRun] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.35,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || reduce) return;
    const timer = window.setTimeout(() => {
      setScene((current) => (current + 1) % steps.length);
      setRun((n) => n + 1);
    }, SCENE_MS[scene] ?? SCENE_MS[0]);
    return () => window.clearTimeout(timer);
  }, [inView, reduce, scene, run, steps.length]);

  const go = (index: number) => {
    setScene(index);
    setRun((n) => n + 1);
  };

  // With reduced motion the film rests on its last frame: the finished site.
  const shown = reduce ? steps.length - 1 : scene;
  const playing = inView && !reduce;

  return (
    <div
      ref={ref}
      className={cn(s.film, "mt-12 md:mt-16")}
      data-playing={playing ? "" : undefined}
      data-still={reduce ? "" : undefined}
    >
      {/* Decorative: the same four steps are written out in the list below. */}
      <div className={s.stage} aria-hidden>
        <div className={s.glow} />
        <div key={`${shown}-${run}`} className={s.scene}>
          {shown === 0 && <Talk lines={copy.talk} />}
          {shown === 1 && <Offer title={copy.offerTitle} lines={copy.offer} />}
          {shown === 2 && <Build />}
          {shown === 3 && <Launch live={copy.live} chips={copy.chips} />}
        </div>
      </div>

      <ol className={s.steps}>
        {steps.map((step, index) => (
          <li key={step.title}>
            <button
              type="button"
              onClick={() => go(index)}
              aria-current={shown === index ? "step" : undefined}
              className={s.step}
            >
              <span className={s.track}>
                {shown === index && (
                  <span
                    key={run}
                    className={s.fill}
                    style={{ animationDuration: `${SCENE_MS[index] ?? SCENE_MS[0]}ms` }}
                  />
                )}
              </span>
              <span className="sr-only">{step.title}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

/**
 * Scene 1: a conversation. The client's messages arrive; ours are "typed"
 * first (three dots) and then appear.
 */
function Talk({ lines }: { lines: string[] }) {
  // Seconds at which each message shows up.
  const at = [0.3, 2.3, 3.9, 6.2];
  return (
    <div className={s.talk}>
      {lines.slice(0, 4).map((line, index) => {
        const ours = index % 2 === 1;
        return (
          <div key={index} className={cn(s.message, ours && s.ours)}>
            {ours && (
              <span className={s.dots} style={{ animationDelay: `${at[index] - 1.1}s` }}>
                <b />
                <b />
                <b />
              </span>
            )}
            <p className={cn(s.bubble, ours ? s.us : s.them)} style={{ animationDelay: `${at[index]}s` }}>
              {line}
            </p>
          </div>
        );
      })}
    </div>
  );
}

/** Scene 2: the offer. Scope lines get ticked, then it is signed. */
function Offer({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div className={s.offer}>
      <div className={s.sheet}>
        <div className={s.sheetHead}>
          {/* eslint-disable-next-line @next/next/no-img-element -- small brand mark */}
          <img src="/brand/wavsy-icon.svg" alt="" />
          <strong>{title}</strong>
        </div>
        {lines.slice(0, 4).map((line, row) => (
          <div key={row} className={s.row} style={{ animationDelay: `${0.5 + row * 0.6}s` }}>
            <svg viewBox="0 0 20 20">
              <rect x="1.5" y="1.5" width="17" height="17" rx="5" />
              <path d="M5.5 10.5l3 3 6-7" style={{ animationDelay: `${0.85 + row * 0.6}s` }} />
            </svg>
            <span>{line}</span>
          </div>
        ))}
        <svg className={s.sign} viewBox="0 0 200 60">
          <path d="M8 44c14-30 22-34 26-18 3 12-8 22-2 22 10 0 14-26 24-26 8 0 2 24 10 24 9 0 12-22 22-22 7 0 4 20 12 20 12 0 20-14 34-14 16 0 30 6 58 2" />
        </svg>
      </div>
    </div>
  );
}

/** Scene 3: the build. Code is typed and the page assembles beside it. */
function Build() {
  return (
    <div className={s.build}>
      <div className={s.editor}>
        <div className={s.chrome}>
          <i />
          <i />
          <i />
        </div>
        <pre>
          {CODE.map((line, index) => (
            <span key={index} className={s.line} style={{ animationDelay: `${0.25 + index * 0.42}s` }}>
              {line}
            </span>
          ))}
        </pre>
      </div>
      <div className={s.preview}>
        <div className={s.chrome}>
          <i />
          <i />
          <i />
        </div>
        <div className={s.canvas}>
          <div className={cn(s.block, s.blockHero)} style={{ animationDelay: "1.1s" }} />
          <div className={s.blockRow}>
            <div className={s.block} style={{ animationDelay: "1.55s" }} />
            <div className={s.block} style={{ animationDelay: "1.7s" }} />
            <div className={s.block} style={{ animationDelay: "1.85s" }} />
          </div>
          <div className={cn(s.block, s.blockWide)} style={{ animationDelay: "2.4s" }} />
          {/* The wireframe turns into the real site. */}
          {/* eslint-disable-next-line @next/next/no-img-element -- crossfades over the wireframe */}
          <img className={s.real} src={subject.image} alt="" />
        </div>
      </div>
    </div>
  );
}

/** Scene 4: the launch. The live site on a laptop and a phone. */
function Launch({ live, chips }: { live: string; chips: string[] }) {
  return (
    <div className={s.launch}>
      <span className={s.ring} />
      <span className={s.ring} style={{ animationDelay: "0.9s" }} />
      <div className={s.devices}>
        <div className={s.laptop}>
          <div className={s.address}>
            <b />
            <span>{host}</span>
            <em>{live}</em>
          </div>
          <div className={s.screenView}>
            {/* eslint-disable-next-line @next/next/no-img-element -- tall recording shown at its own size */}
            <img src={subject.tour?.src ?? subject.image} alt="" />
          </div>
        </div>
        <div className={s.phone}>
          <div className={s.screenView}>
            {/* eslint-disable-next-line @next/next/no-img-element -- tall recording shown at its own size */}
            <img src={subject.tourMobile?.src ?? subject.image} alt="" />
          </div>
        </div>
      </div>
      <ul className={s.chips}>
        {chips.map((chip, index) => (
          <li key={chip} style={{ animationDelay: `${1.1 + index * 0.18}s` }}>
            {chip}
          </li>
        ))}
      </ul>
    </div>
  );
}
