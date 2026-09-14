export const projectIds = ["glenz", "quezher", "dimitar", "kibo2"] as const;
export type ProjectId = (typeof projectIds)[number];

export type Project = {
  slug: ProjectId;
  url: string;
  image: string;
};

export const projects: Project[] = [
  {
    slug: "glenz",
    url: "https://www.glenz-reinigung.com/",
    image: "/portfolio/glenz.jpg",
  },
  {
    slug: "quezher",
    url: "https://manufacturas-quezher.vercel.app/",
    image: "/portfolio/quezher.jpg",
  },
  {
    slug: "dimitar",
    url: "https://portfolio-theta-dun-ejq1lqeyg0.vercel.app/",
    image: "/portfolio/dimitar.jpg",
  },
  {
    slug: "kibo2",
    url: "https://kibo-2.vercel.app/",
    image: "/portfolio/kibo-2.jpg",
  },
];
