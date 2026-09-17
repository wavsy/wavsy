export const projectIds = ["storm", "glenz", "quezher", "kibo2", "dimitar", "todorovnet", "cacao"] as const;
export type ProjectId = (typeof projectIds)[number];

export type Project = {
  slug: ProjectId;
  url: string;
  image: string;
};

export const projects: Project[] = [
  {
    slug: "storm",
    url: "https://stormcarwash.vercel.app/",
    image: "/portfolio/storm.jpg",
  },
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
    slug: "kibo2",
    url: "https://kibo-2.vercel.app/",
    image: "/portfolio/kibo-2.jpg",
  },
  {
    slug: "dimitar",
    url: "https://portfolio-theta-dun-ejq1lqeyg0.vercel.app/",
    image: "/portfolio/dimitar.jpg",
  },
  // Our own product, live and in use, not a client site. Labelled as such and placed after the clients.
  {
    slug: "todorovnet",
    url: "https://todorovnet.vercel.app/",
    image: "/portfolio/todorovnet.jpg",
  },
  // A concept piece, not a client (KAN-43). Kept last and labelled as a concept.
  {
    slug: "cacao",
    url: "https://cacao-cartel.vercel.app/",
    image: "/portfolio/cacao-cartel.jpg",
  },
];
