import { getTranslations } from "next-intl/server";
import { TeamPhoto } from "@/components/team/TeamPhoto";
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
          <LinkedInMark />
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

function LinkedInMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className="h-3.5 w-3.5 shrink-0"
      fill="currentColor"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z" />
    </svg>
  );
}
