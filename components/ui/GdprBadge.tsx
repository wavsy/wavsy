const starPath =
  "M0-2.35.67-1.02 2.24-.9 1.02.12 1.38 1.66 0 .9-1.38 1.66-1.02.12-2.24-.9-.67-1.02Z";

const stars = Array.from({ length: 12 }, (_, index) => {
  const angle = ((index * 30 - 90) * Math.PI) / 180;
  return { x: 16 + 10 * Math.cos(angle), y: 16 + 10 * Math.sin(angle) };
});

export function GdprBadge({ className }: { className?: string }) {
  return (
    <span className={className} aria-hidden>
      <span className="flex h-10 w-fit overflow-hidden border border-mist bg-ink text-white">
        <svg
          viewBox="0 0 32 32"
          className="h-10 w-10 shrink-0"
          fill="none"
        >
          <rect width="32" height="32" fill="#003399" />
          {stars.map((star, index) => (
            <path
              key={index}
              d={starPath}
              fill="#FFCC00"
              transform={`translate(${star.x} ${star.y})`}
            />
          ))}
        </svg>
        <span className="flex flex-col justify-center px-2.5 pr-3">
          <span className="text-[0.68rem] font-semibold leading-none tracking-[0.16em]">
            GDPR
          </span>
          <span className="mt-1 text-[0.52rem] font-medium leading-none tracking-[0.14em] text-white/70">
            COMPLIANT
          </span>
        </span>
      </span>
    </span>
  );
}
