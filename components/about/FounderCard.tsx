import Image from "next/image";
import { umamiEvent } from "@/lib/analytics";
import { getTranslations } from "next-intl/server";
import { TiltCard } from "@/components/ai/TiltCard";
import { Button } from "@/components/ui/Button";
import { LinkedInMark } from "@/components/ui/SocialIcons";
import { cn } from "@/lib/cn";
import { teamMembers, type TeamId } from "@/lib/team";

type Person = {
  name: string;
  role: string;
  titles: string[];
  note?: string;
};

// The founder card on the home and About pages, in the style of the AI page:
// a rounded photo that tilts toward the pointer, the name over the photo,
// titles as chips.
export async function FounderCard({
  id,
  priority = false,
  heading: Heading = "h2",
}: {
  id: TeamId;
  priority?: boolean;
  heading?: "h2" | "h3";
}) {
  const t = await getTranslations("team");
  const member = teamMembers[id];
  const person = t.raw(`people.${id}`) as Person;

  return (
    <article data-center className="spotlight-card conic-card group relative flex h-full flex-col rounded-3xl border border-mist bg-white p-3 transition-shadow duration-300 hover:shadow-[0_30px_70px_-35px_rgb(11_61_145/0.55)] md:p-4">
      <TiltCard className="w-full">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-deep">
          <div className="view-zoom absolute inset-0">
            <Image
              src={member.src}
              alt={person.name}
              fill
              priority={priority}
              sizes="(min-width: 768px) 45vw, 100vw"
              className={cn(
                "object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]",
                member.imageClass,
              )}
            />
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-deep/90 via-deep/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
            <Heading className="font-display text-3xl tracking-[-0.04em] text-white md:text-4xl">
              {person.name}
            </Heading>
            <p className="mt-1 text-sm text-white/75">{person.role}</p>
          </div>
        </div>
      </TiltCard>
      <div className="relative flex flex-1 flex-col px-2 pb-2 pt-5 md:px-3">
        <ul className="flex flex-wrap gap-2">
          {person.titles.map((title) => (
            <li
              key={title}
              className="rounded-full border border-navy/15 bg-paper px-3 py-1.5 text-[0.75rem] font-medium tracking-[0.02em] text-navy"
            >
              {title}
            </li>
          ))}
        </ul>
        {person.note ? (
          <p className="mt-4 max-w-[40ch] text-[0.9375rem] leading-6 text-ink/70">{person.note}</p>
        ) : null}
        <div className="mt-auto pt-6">
          <Button
            href={member.linkedin}
            external
            size="sm"
            ariaLabel={t("linkedinAria", { name: person.name })}
            track={umamiEvent("linkedin", { person: id })}
            icon={<LinkedInMark className="h-3.5 w-3.5" />}
          >
            {t("linkedin")}
          </Button>
        </div>
      </div>
    </article>
  );
}
