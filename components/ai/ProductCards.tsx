"use client";

import { Reveal } from "@/components/motion/Reveal";
import { CenterActivate } from "@/components/motion/CenterActivate";

type Product = { title: string; body: string; points: string[] };

const icons = [
  // Assistant: a speech bubble.
  <path
    key="assistant"
    d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v6a2.5 2.5 0 0 1-2.5 2.5H11l-4 4v-4h0.5A2.5 2.5 0 0 1 5 12.5z M9 9.5h.01 M12 9.5h.01 M15 9.5h.01"
  />,
  // Agent: a spark that acts.
  <path
    key="agent"
    d="M12 3v4 M12 17v4 M3 12h4 M17 12h4 M6 6l2.5 2.5 M15.5 15.5L18 18 M18 6l-2.5 2.5 M8.5 15.5L6 18 M12 9.5a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5z"
  />,
  // Automation: two systems joined.
  <path
    key="automation"
    d="M4 7h6v5H4z M14 12h6v5h-6z M10 9.5h2.5a1.5 1.5 0 0 1 1.5 1.5v3.5"
  />,
];

export function ProductCards({ items }: { items: Product[] }) {
  return (
    <CenterActivate>
    <ul className="grid gap-4 md:gap-5 lg:grid-cols-3">
      {items.map((item, index) => (
        <li key={item.title}>
          <Reveal delay={index * 0.08} className="h-full">
            <article
              data-center
              onPointerMove={(event) => {
                const box = event.currentTarget.getBoundingClientRect();
                event.currentTarget.style.setProperty("--spot-x", `${event.clientX - box.left}px`);
                event.currentTarget.style.setProperty("--spot-y", `${event.clientY - box.top}px`);
              }}
              className="spotlight-card conic-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-mist bg-white p-7 transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-cyan/50 hover:shadow-[0_24px_60px_-28px_rgb(11_61_145/0.45)] md:p-8"
            >
              <div className="relative flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-navy to-cyan text-white shadow-[0_10px_30px_-10px_rgb(63_193_240/0.8)]">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    {icons[index]}
                  </svg>
                </span>
                <span className="font-display text-sm tracking-[0.12em] text-navy/60">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="relative mt-8 hyphens-auto font-display text-2xl tracking-[-0.04em] text-ink lg:text-[1.375rem] xl:text-[1.75rem]">
                {item.title}
              </h3>
              <p className="relative mt-4 leading-7 text-ink/75">{item.body}</p>
              <ul className="relative mt-auto space-y-2.5 pt-8">
                {item.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-ink/80">
                    <span className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-cyan" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </li>
      ))}
    </ul>
    </CenterActivate>
  );
}
