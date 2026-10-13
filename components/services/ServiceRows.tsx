import Link from "next/link";
import { umamiEvent } from "@/lib/analytics";
import { getTranslations } from "next-intl/server";
import { Clip } from "@/components/clips/Clip";
import { Reveal } from "@/components/motion/Reveal";
import { CenterActivate } from "@/components/motion/CenterActivate";
import { currentLocale } from "@/lib/locale";
import { pathFor } from "@/lib/routes";

export const serviceIds = ["websites", "apps", "maintenance", "automation"] as const;

// Big rows that fill with the brand gradient from the left on hover, as on
// studio sites. On touch screens they stay as calm cards. The AI row links to
// the AI page.
export async function ServiceRows({ heading: Heading = "h2" }: { heading?: "h2" | "h3" } = {}) {
  const t = await getTranslations("services");
  const nav = await getTranslations("nav");
  const locale = await currentLocale();

  return (
    <CenterActivate>
    <ul className="grid gap-3">
      {serviceIds.map((id, index) => (
        <li key={id}>
          <Reveal delay={index * 0.06} fade={false}>
            <article
              data-center
              className="fill-row group relative overflow-hidden rounded-2xl border border-mist bg-white transition-transform duration-200 active:scale-[0.985]"
            >
              <div className="relative grid gap-4 p-6 md:grid-cols-[4.5rem_1fr_1.1fr] md:items-center md:gap-10 md:p-9 lg:grid-cols-[4.5rem_1fr_1.1fr_7.5rem]">
                <p className="font-display text-sm tracking-[0.12em] text-navy transition-colors duration-300 group-hover:text-white/70 group-data-[center-active]:text-white/70">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <Heading className="font-display text-3xl tracking-[-0.04em] transition-colors duration-300 group-hover:text-white group-data-[center-active]:text-white md:text-[2.5rem]">
                  {t(`items.${id}.title`)}
                </Heading>
                <div>
                  <p className="text-[1.0625rem] leading-7 transition-colors duration-300 group-hover:text-white group-data-[center-active]:text-white">
                    {t(`items.${id}.sentence`)}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted transition-colors duration-300 group-hover:text-white/75 group-data-[center-active]:text-white/75">
                    {t(`items.${id}.audience`)}
                  </p>
                  {id === "automation" ? (
                    <Link
                      href={pathFor(locale, "ai")}
                      {...umamiEvent("ai-link", { location: "services" })}
                      className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm text-white transition-colors duration-300 group-hover:bg-white group-hover:text-ink group-data-[center-active]:bg-white group-data-[center-active]:text-ink"
                    >
                      {nav("ai")} <span aria-hidden>→</span>
                    </Link>
                  ) : null}
                </div>
                {/* A small clip of the service: top corner on phones, own column on desktop. */}
                <Clip
                  name={id}
                  className="absolute right-5 top-4 w-12 text-navy transition-colors duration-300 group-hover:text-white group-data-[center-active]:text-white md:w-20 lg:static lg:w-full"
                />
              </div>
            </article>
          </Reveal>
        </li>
      ))}
    </ul>
    </CenterActivate>
  );
}
