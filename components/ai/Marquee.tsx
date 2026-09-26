type MarqueeProps = {
  title: string;
  items: string[];
};

// Pure CSS: the list is rendered twice and the track slides by half its width,
// so the loop has no visible seam. The copy is hidden from screen readers.
export function Marquee({ title, items }: MarqueeProps) {
  return (
    <div className="border-y border-white/10 bg-deep py-8 text-white">
      <p className="mb-6 text-center text-[0.75rem] font-medium uppercase tracking-[0.18em] text-white/50">
        {title}
      </p>
      <div className="marquee-mask overflow-hidden">
        <div className="marquee-track flex w-max">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center"
            >
              {items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-10 pr-10 font-display text-xl tracking-[-0.03em] text-white/75 md:text-2xl"
                >
                  {item}
                  <span className="size-1.5 rounded-full bg-cyan/70" aria-hidden />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
