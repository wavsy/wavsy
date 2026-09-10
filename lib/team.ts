export const teamIds = ["dimitar", "nikolay"] as const;
export type TeamId = (typeof teamIds)[number];

export const teamMembers: Record<
  TeamId,
  { src: string; imageClass: string; linkedin: string }
> = {
  dimitar: {
    src: "/team/dimitar.jpg",
    imageClass: "object-[center_8%]",
    linkedin: "https://www.linkedin.com/in/dimitarbarev/",
  },
  nikolay: {
    src: "/team/nikolay.jpg",
    imageClass: "object-[center_18%]",
    linkedin: "https://www.linkedin.com/in/nikolaitodorov/",
  },
};
