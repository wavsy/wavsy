"use client";

import { useEffect, useId, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { WAVE_PATH } from "@/lib/wave-path";

const DEPTH = 14;

// The Wavsy mark as the hero's centrepiece: extruded depth from stacked
// copies, a moving gradient face, a light sweep clipped to the shape, a
// breathing glow and orbit rings behind it. It floats and tilts toward the
// pointer. SVG and CSS only, decorative (aria-hidden), and never the LCP
// element, so it cannot hold back first paint.
export function HeroMark({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/:/g, "");
  const reduce = useReducedMotionSafe();
  // Scrolling moves the mark on every device, so phones get motion too.
  const { scrollY } = useScroll();
  const scrollYOffset = useTransform(scrollY, [0, 700], [0, 110]);
  const scrollRotate = useTransform(scrollY, [0, 700], [0, -12]);
  const scrollScale = useTransform(scrollY, [0, 700], [1, 0.86]);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;
    const onMove = (event: PointerEvent) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      root.style.setProperty("--mark-rx", `${(-y * 14).toFixed(2)}deg`);
      root.style.setProperty("--mark-ry", `${(x * 18).toFixed(2)}deg`);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div ref={ref} aria-hidden className={`hero-mark [perspective:1400px] ${className}`}>
      <motion.div
        className="relative"
        style={reduce ? undefined : { y: scrollYOffset, rotate: scrollRotate, scale: scrollScale }}
      >
        <div className="hero-mark-float relative">
          <div className="hero-mark-tilt relative">
            {/* Orbits behind the mark */}
            <svg viewBox="-300 -300 600 600" className="hero-mark-orbits absolute left-1/2 top-1/2 w-[125%] -translate-x-1/2 -translate-y-1/2 overflow-visible">
              <g className="orbit-a">
                <ellipse rx="280" ry="92" fill="none" stroke="rgb(63 193 240 / 0.22)" strokeWidth="1" strokeDasharray="2 7" />
                <circle cx="280" cy="0" r="3.5" fill="#3FC1F0" />
              </g>
              <g className="orbit-b">
                <ellipse rx="230" ry="150" fill="none" stroke="rgb(255 255 255 / 0.1)" strokeWidth="1" />
                <circle cx="-230" cy="0" r="2.5" fill="#fff" />
              </g>
            </svg>

            <svg viewBox="-20 -30 590 300" className="relative w-full overflow-visible">
              <defs>
                <linearGradient id={`face-${uid}`} x1="0" y1="0.5" x2="1" y2="0.5">
                  <stop offset="0%" stopColor="#022A89">
                    <animate attributeName="stop-color" values="#022A89;#0B3D91;#022A89" dur="8s" repeatCount="indefinite" />
                  </stop>
                  <stop offset="50%" stopColor="#136FD4" />
                  <stop offset="100%" stopColor="#3CDBFF">
                    <animate attributeName="stop-color" values="#3CDBFF;#7FE7FF;#3CDBFF" dur="8s" repeatCount="indefinite" />
                  </stop>
                </linearGradient>
                <linearGradient id={`side-${uid}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#0A1B4A" />
                  <stop offset="100%" stopColor="#0B3D91" />
                </linearGradient>
                <linearGradient id={`sweep-${uid}`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#fff" stopOpacity="0" />
                  <stop offset="50%" stopColor="#fff" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                </linearGradient>
                <clipPath id={`clip-${uid}`}>
                  <path d={WAVE_PATH} />
                </clipPath>
                <filter id={`glow-${uid}`} x="-30%" y="-60%" width="160%" height="220%">
                  <feGaussianBlur stdDeviation="22" />
                </filter>
              </defs>

              {/* Glow */}
              <path d={WAVE_PATH} fill={`url(#face-${uid})`} filter={`url(#glow-${uid})`} className="hero-mark-glow" transform="translate(6 14)" />

              {/* Extruded depth */}
              {Array.from({ length: DEPTH }, (_, i) => DEPTH - i).map((step) => (
                <path
                  key={step}
                  d={WAVE_PATH}
                  fill={`url(#side-${uid})`}
                  opacity={0.35 + (0.65 * (DEPTH - step)) / DEPTH}
                  transform={`translate(${step * 0.9} ${step * 1.4})`}
                />
              ))}

              {/* Face */}
              <path d={WAVE_PATH} fill={`url(#face-${uid})`} />
              <path d={WAVE_PATH} fill="none" stroke="rgb(255 255 255 / 0.28)" strokeWidth="1.2" />

              {/* Light sweep, clipped to the mark */}
              <g clipPath={`url(#clip-${uid})`}>
                <rect className="hero-mark-sweep" x="-160" y="-40" width="140" height="320" fill={`url(#sweep-${uid})`} transform="skewX(-18)" />
              </g>
            </svg>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
