export const teamIds = ["dimitar", "nikolay"] as const;
export type TeamId = (typeof teamIds)[number];

export const teamPhotos: Record<TeamId, string | null> = {
  dimitar: "/team/dimitar.jpg",
  nikolay: null,
};
