import { Reveal } from "@/components/motion/Reveal";

type Column = { label: string; items: string[] };

export function CustomCompare({ generic, tailored }: { generic: Column; tailored: Column }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-5">
      <Reveal className="h-full">
        <div className="h-full rounded-2xl border border-mist bg-white/60 p-7 md:p-8">
          <p className="text-[0.75rem] font-medium uppercase tracking-[0.16em] text-muted">
            {generic.label}
          </p>
          <ul className="mt-6 space-y-4">
            {generic.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-ink/55">
                <span
                  className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-ink/15 text-[0.75rem] leading-none"
                  aria-hidden
                >
                  ×
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
      <Reveal delay={0.1} className="h-full">
        <div className="relative h-full overflow-hidden rounded-2xl bg-deep p-7 text-white shadow-[0_30px_70px_-30px_rgb(11_61_145/0.7)] md:p-8">
          <div className="ai-aurora ai-aurora-soft pointer-events-none absolute inset-0" aria-hidden />
          <p className="relative text-[0.75rem] font-medium uppercase tracking-[0.16em] text-cyan">
            {tailored.label}
          </p>
          <ul className="relative mt-6 space-y-4">
            {tailored.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-white/90">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-cyan text-deep">
                  <svg viewBox="0 0 16 16" className="size-3" fill="none" aria-hidden>
                    <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  );
}
