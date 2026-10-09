export const projectIds = ["storm", "glenz", "quezher", "kibo2", "dimitar", "todorovnet", "cacao"] as const;
export type ProjectId = (typeof projectIds)[number];

export type Project = {
  slug: ProjectId;
  url: string;
  image: string;
  /**
   * The "living cover": one tall recording of the live site, scrolled inside a
   * browser frame when the card is active. `ratio` is its height / width.
   * Re-record after a client's site changes noticeably.
   */
  tour?: { src: string; ratio: number };
  /** A small, light cut of the same recording for the showreel wall. */
  reel?: { src: string; ratio: number };
  /** The phone version of the same site, shown on a phone beside the browser. */
  tourMobile?: { src: string; ratio: number };
};

export const projects: Project[] = [
  {
    slug: "storm",
    url: "https://stormcarwash.vercel.app/",
    image: "/portfolio/storm.jpg",
    tour: { src: "/portfolio/tour/storm.webp", ratio: 3.315 },
    reel: { src: "/portfolio/reel/storm.webp", ratio: 3.314 },
    tourMobile: { src: "/portfolio/tour/storm-mobile.webp", ratio: 7.179 },
  },
  {
    slug: "glenz",
    url: "https://www.glenz-reinigung.com/",
    image: "/portfolio/glenz.jpg",
    tour: { src: "/portfolio/tour/glenz.webp", ratio: 3.423 },
    reel: { src: "/portfolio/reel/glenz.webp", ratio: 3.393 },
    tourMobile: { src: "/portfolio/tour/glenz-mobile.webp", ratio: 7.179 },
  },
  {
    slug: "quezher",
    url: "https://manufacturas-quezher.vercel.app/",
    image: "/portfolio/quezher.jpg",
    tour: { src: "/portfolio/tour/quezher.webp", ratio: 6.423 },
    reel: { src: "/portfolio/reel/quezher.webp", ratio: 3.393 },
    tourMobile: { src: "/portfolio/tour/quezher-mobile.webp", ratio: 7.179 },
  },
  {
    slug: "kibo2",
    url: "https://kibo-2.vercel.app/",
    image: "/portfolio/kibo-2.jpg",
    tour: { src: "/portfolio/tour/kibo-2.webp", ratio: 2.217 },
    reel: { src: "/portfolio/reel/kibo-2.webp", ratio: 2.216 },
    tourMobile: { src: "/portfolio/tour/kibo-2-mobile.webp", ratio: 7.179 },
  },
  {
    slug: "dimitar",
    url: "https://portfolio-theta-dun-ejq1lqeyg0.vercel.app/",
    image: "/portfolio/dimitar.jpg",
    tour: { src: "/portfolio/tour/dimitar.webp", ratio: 7.031 },
    reel: { src: "/portfolio/reel/dimitar.webp", ratio: 3.393 },
    tourMobile: { src: "/portfolio/tour/dimitar-mobile.webp", ratio: 7.179 },
  },
  // Our own product, live and in use, not a client site. Labelled as such and placed after the clients.
  {
    slug: "todorovnet",
    url: "https://todorovnet.vercel.app/",
    image: "/portfolio/todorovnet.jpg",
    tour: { src: "/portfolio/tour/todorovnet.webp", ratio: 1.133 },
    reel: { src: "/portfolio/reel/todorovnet.webp", ratio: 1.134 },
    tourMobile: { src: "/portfolio/tour/todorovnet-mobile.webp", ratio: 2.564 },
  },
  // A concept piece, not a client (KAN-43). Kept last and labelled as a concept.
  {
    slug: "cacao",
    url: "https://cacao-cartel.vercel.app/",
    image: "/portfolio/cacao-cartel.jpg",
    tour: { src: "/portfolio/tour/cacao-cartel.webp", ratio: 2.344 },
    reel: { src: "/portfolio/reel/cacao-cartel.webp", ratio: 2.345 },
    tourMobile: { src: "/portfolio/tour/cacao-cartel-mobile.webp", ratio: 4.359 },
  },
];
