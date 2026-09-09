"use client";

import { useTranslations } from "next-intl";

type FaqItem = { q: string; a: string };

export function FaqList() {
  const t = useTranslations("faq");
  const items = t.raw("items") as FaqItem[];

  return (
    <div>
      {items.map((item) => (
        <details
          key={item.q}
          className="group border-t border-mist last:border-b"
        >
          <summary className="cursor-pointer list-none py-5 font-display text-xl tracking-[-0.03em] marker:content-none md:text-2xl">
            <span className="flex items-start justify-between gap-4">
              <span>{item.q}</span>
              <span
                aria-hidden
                className="mt-1 shrink-0 text-muted transition-transform duration-150 group-open:rotate-45"
              >
                +
              </span>
            </span>
          </summary>
          <p className="max-w-[46ch] pb-6 leading-7 text-ink/80">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
