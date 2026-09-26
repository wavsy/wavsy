"use client";

import Image from "next/image";
import { umamiEvent } from "@/lib/analytics";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useTranslations } from "next-intl";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { cn } from "@/lib/cn";
import type { Project } from "@/lib/projects";

// The studio-site project list (Obys, Lusion, Locomotive): big text rows, and
// on a desktop with a mouse a preview of the site follows the pointer and
// wipes in with a clip-path. Rows are plain text, visible from the first
// paint. Touch screens get the same preview as a sticky panel above the
// list: the row crossing the middle of the screen becomes active and its
// site wipes in, so scrolling does what the mouse does on desktop.
export function WorkList({ projects }: { projects: Project[] }) {
  const t = useTranslations("portfolio");
  const work = useTranslations("work");
  const reduce = useReducedMotionSafe();
  const listRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [canHover, setCanHover] = useState(false);
  const [scrolled, setScrolled] = useState(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)");
    const update = () => setCanHover(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (canHover) return;
    const rows = listRef.current?.querySelectorAll<HTMLElement>("[data-row]");
    if (!rows) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setScrolled(Number((entry.target as HTMLElement).dataset.row));
          }
        }
      },
      { rootMargin: "-55% 0px -35% 0px" },
    );
    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, [canHover]);

  const onMove = (event: React.PointerEvent) => {
    const box = listRef.current?.getBoundingClientRect();
    if (!box) return;
    x.set(event.clientX - box.left);
    y.set(event.clientY - box.top);
  };

  const showPreview = canHover && active !== null;

  return (
    <div className="relative">
      <div className="touch-only sticky top-[calc(var(--header-h)+0.75rem)] z-10 mb-4">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-deep shadow-[0_30px_70px_-30px_rgb(0_0_0/0.9)] ring-1 ring-white/15">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              aria-hidden
              className="absolute inset-0"
              initial={false}
              animate={
                scrolled === index
                  ? { clipPath: "inset(0% 0% 0% 0%)", scale: 1 }
                  : { clipPath: "inset(0% 0% 0% 100%)", scale: 1.06 }
              }
              transition={reduce ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ zIndex: scrolled === index ? 2 : 1 }}
            >
              <Image
                src={project.image}
                alt=""
                fill
                sizes="(min-width: 768px) 700px, 100vw"
                className="object-cover object-top"
              />
            </motion.div>
          ))}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 bg-gradient-to-t from-deep/90 to-transparent p-4 pt-10">
            <span className="font-display text-lg leading-tight tracking-[-0.03em] text-white">
              {t(`projects.${projects[scrolled].slug}.name`)}
            </span>
            <span className="shrink-0 rounded-full bg-cyan px-3 py-1 text-xs font-semibold text-deep">
              {String(scrolled + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
      <ul
        ref={listRef}
        onPointerMove={canHover ? onMove : undefined}
        onPointerLeave={() => setActive(null)}
        className="relative border-t border-white/12"
      >
        {projects.map((project, index) => {
          const name = t(`projects.${project.slug}.name`);
          const industry = t(`projects.${project.slug}.industry`);
          // Desktop dims the other rows while one is hovered. Phones never dim
          // (dimmed text fails contrast); they highlight the active row instead.
          const dim = canHover && active !== null && active !== index;
          const current = !canHover && scrolled === index;
          return (
            <li key={project.slug} data-row={index} className="border-b border-white/12">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                {...umamiEvent("project-open", { project: project.slug, from: "home" })}
                onPointerEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onBlur={() => setActive(null)}
                className={cn(
                  "group grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-3 py-6 transition-opacity duration-300 md:grid-cols-[4rem_1fr_auto] md:py-8",
                  dim && "opacity-40",
                )}
              >
                <span
                  className={cn(
                    "font-display text-sm tracking-[0.12em] transition-colors duration-300",
                    current ? "text-cyan" : "text-white/70",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span
                    className={cn(
                      "block font-display text-[clamp(1.5rem,4.2vw,3.5rem)] leading-[1.02] tracking-[-0.045em] transition-[transform,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:translate-x-3",
                      current ? "translate-x-2 text-cyan" : "text-white",
                    )}
                  >
                    {name}
                  </span>
                  <span className="mt-1.5 block text-sm text-white/70">{industry}</span>
                </span>
                <span
                  className="col-span-2 hidden items-center gap-2 text-sm text-white/60 transition-colors duration-300 group-hover:text-cyan md:col-span-1 md:inline-flex"
                >
                  {t("visit")}
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      {canHover ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-10 hidden lg:block"
          style={{ x: springX, y: springY }}
        >
          <motion.div
            className="relative -translate-x-1/2 -translate-y-1/2"
            initial={false}
            animate={
              showPreview
                ? { clipPath: "inset(0% 0% 0% 0% round 18px)", scale: 1, opacity: 1 }
                : { clipPath: "inset(50% 50% 50% 50% round 18px)", scale: 0.9, opacity: 0 }
            }
            transition={reduce ? { duration: 0 } : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative h-[240px] w-[384px] overflow-hidden rounded-[18px] bg-deep shadow-[0_40px_90px_-30px_rgb(0_0_0/0.8)] ring-1 ring-white/15">
              {projects.map((project, index) => (
                <Image
                  key={project.slug}
                  src={project.image}
                  alt=""
                  fill
                  sizes="384px"
                  className={cn(
                    "object-cover object-top transition-opacity duration-300",
                    active === index ? "opacity-100" : "opacity-0",
                  )}
                />
              ))}
            </div>
          </motion.div>
          <motion.span
            className="absolute left-[150px] top-[80px] grid size-20 place-items-center rounded-full bg-cyan text-sm font-medium text-deep shadow-[0_10px_40px_-10px_rgb(63_193_240/0.9)]"
            initial={false}
            animate={showPreview ? { scale: 1, opacity: 1 } : { scale: 0.3, opacity: 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {work("view")}
          </motion.span>
        </motion.div>
      ) : null}
    </div>
  );
}
