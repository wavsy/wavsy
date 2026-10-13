"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/projects";
import s from "./ReelWall.module.css";

const toured = projects.filter((project) => project.reel);

// Four columns, each starting from a different project so neighbours differ.
const columns = [0, 2, 4, 6].map((offset) =>
  Array.from({ length: 4 }, (_, i) => toured[(offset + i) % toured.length]),
);

/**
 * The studio showreel: a tilted wall of our live sites. Every column drifts
 * the opposite way to its neighbour and every screen scrolls through its own
 * site. The motion is pure CSS on `transform`.
 *
 * The recordings are not requested until the page has finished loading and
 * the wall is about to scroll into view, so they never compete with the
 * first paint. With reduced motion the wall simply stands still.
 */
export function ReelWall() {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let observer: IntersectionObserver | undefined;
    const watch = () => {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          setArmed(true);
          observer?.disconnect();
        },
        { rootMargin: "200px 0px" },
      );
      observer.observe(el);
    };
    if (document.readyState === "complete") watch();
    else window.addEventListener("load", watch, { once: true });
    return () => {
      window.removeEventListener("load", watch);
      observer?.disconnect();
    };
  }, []);

  if (toured.length === 0) return null;

  return (
    <div ref={ref} aria-hidden className={s.stage}>
      <div className={s.plane}>
        {columns.map((column, c) => (
          <div key={c} className={s.column} data-reverse={c % 2 ? "" : undefined}>
            {/* The list is doubled so the loop has no seam. */}
            {[...column, ...column].map((project, i) => (
              <div key={i} className={s.screen}>
                <div className={s.bar}>
                  <i />
                  <i />
                  <i />
                </div>
                <div className={s.view}>
                  {armed ? (
                    // eslint-disable-next-line @next/next/no-img-element -- tall recording shown at its own size
                    <img
                      src={project.reel!.src}
                      alt=""
                      decoding="async"
                      style={{ animationDuration: `${Math.round(project.reel!.ratio * 8)}s, 0.8s` }}
                    />
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={s.fade} />
    </div>
  );
}
