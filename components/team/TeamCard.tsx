import { getTranslations } from "next-intl/server";
import { TeamPhoto } from "@/components/team/TeamPhoto";
import { LinkedInMark } from "@/components/ui/SocialIcons";
import { teamMembers, type TeamId } from "@/lib/team";

type TeamCardProps = {
  id: TeamId;
  heading?: "h2" | "h3";
};

export async function TeamCard({ id, heading: Heading = "h3" }: TeamCardProps) {
  const t = await getTranslations("team");
  const member = teamMembers[id];
  const person = t.raw(`people.${id}`) as {
    name: string;
    role: string;
    photoLabel: string;
    titles: string[];
    note?: string;
  };
  const name = person.name;

  return (
    <article className="flex h-full flex-col">
      <TeamPhoto
        src={member.src}
        imageClass={member.imageClass}
        name={name}
        label={person.photoLabel}
      />
      <Heading className="mt-6 font-display text-3xl tracking-[-0.04em]">
        {name}
      </Heading>
      <p className="mt-2 text-sm text-muted">{person.role}</p>
      <ul className="mt-5 flex flex-col gap-1.5">
        {person.titles.map((title) => (
          <li
            key={title}
            className="text-[0.75rem] font-medium uppercase tracking-[0.14em] text-navy"
          >
            {title}
          </li>
        ))}
      </ul>
      {person.note ? (
        <p className="mt-3 max-w-[36ch] text-sm leading-6 text-muted">{person.note}</p>
      ) : null}
      <div className="mt-auto pt-6">
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("linkedinAria", { name })}
          className="group inline-flex items-center gap-2.5 border-t border-mist pt-4 text-sm text-ink/80 transition-colors duration-150 hover:text-navy"
        >
          <LinkedInMark className="h-3.5 w-3.5 shrink-0" />
          <span>{t("linkedin")}</span>
          <span
            aria-hidden
            className="translate-x-0 transition-transform duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
          >
            →
          </span>
        </a>
      </div>
    </article>
  );
}
