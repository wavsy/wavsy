export const projectIds = ["ariadne", "races", "parvenec", "povecheotdumi", "cleantime", "kibo2", "storm", "glenz", "quezher", "dimitar", "todorovnet", "structlab", "dimilessons", "cacao"] as const;
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
  /**
   * Several small sites of one kind shown as a single row. Each needs
   * `portfolio.projects.<slug>.items.<key>.name` and `.note` in the messages.
   */
  group?: ({ key: string; url: string; image: string } & Pick<Project, "tour" | "tourMobile">)[];
};

// Order: ARIADNE first, then client work newest first, then our own products and the concept.
export const projects: Project[] = [
  // Our own project, shown first by decision of Nikolay (2026-11-23). Labelled as ours, not as client work.
  {
    slug: "ariadne",
    url: "https://www.ariadne-drones.com/",
    image: "/portfolio/ariadne.jpg",
    tour: { src: "/portfolio/tour/ariadne.webp", ratio: 7.031 },
    reel: { src: "/portfolio/reel/ariadne.webp", ratio: 3.393 },
    tourMobile: { src: "/portfolio/tour/ariadne-mobile.webp", ratio: 7.179 },
  },
  // Three race sites (registration, teams, results) shown as ONE row so the list stays short.
  // The row's link and moving cover are the newest event; `group` lists all three.
  {
    slug: "races",
    url: "https://prohodat-na-pobedata.vercel.app/",
    image: "/portfolio/prohodat-na-pobedata.jpg",
    tour: { src: "/portfolio/tour/prohodat-na-pobedata.webp", ratio: 6.648 },
    reel: { src: "/portfolio/reel/prohodat-na-pobedata.webp", ratio: 3.393 },
    tourMobile: { src: "/portfolio/tour/prohodat-na-pobedata-mobile.webp", ratio: 7.179 },
    group: [
      {
        key: "prohodat",
        url: "https://prohodat-na-pobedata.vercel.app/",
        image: "/portfolio/prohodat-na-pobedata.jpg",
        tour: { src: "/portfolio/tour/prohodat-na-pobedata.webp", ratio: 6.648 },
        tourMobile: { src: "/portfolio/tour/prohodat-na-pobedata-mobile.webp", ratio: 7.179 },
      },
      {
        key: "alibaba",
        url: "https://ali-baba-3.vercel.app/",
        image: "/portfolio/ali-baba-3.jpg",
        tour: { src: "/portfolio/tour/ali-baba-3.webp", ratio: 7.031 },
        tourMobile: { src: "/portfolio/tour/ali-baba-3-mobile.webp", ratio: 7.179 },
      },
      {
        key: "koprinka",
        url: "https://koprinka-2026.vercel.app/",
        image: "/portfolio/koprinka.jpg",
        tour: { src: "/portfolio/tour/koprinka.webp", ratio: 7.031 },
        tourMobile: { src: "/portfolio/tour/koprinka-mobile.webp", ratio: 7.179 },
      },
    ],
  },
  // An online shop for ice cream machines and supplies. Also on its trial address until the domain is moved.
  {
    slug: "parvenec",
    url: "https://parvenec.vercel.app/",
    image: "/portfolio/parvenec.jpg",
    tour: { src: "/portfolio/tour/parvenec.webp", ratio: 6.023 },
    reel: { src: "/portfolio/reel/parvenec.webp", ratio: 3.393 },
    tourMobile: { src: "/portfolio/tour/parvenec-mobile.webp", ratio: 7.179 },
  },
  // An online flower shop. The card opens its trial address until the shop moves to its own domain.
  {
    slug: "povecheotdumi",
    url: "https://povecheotdumi.vercel.app/",
    image: "/portfolio/povecheotdumi.jpg",
    tour: { src: "/portfolio/tour/povecheotdumi.webp", ratio: 7.031 },
    reel: { src: "/portfolio/reel/povecheotdumi.webp", ratio: 3.393 },
    tourMobile: { src: "/portfolio/tour/povecheotdumi-mobile.webp", ratio: 7.179 },
  },
  {
    slug: "cleantime",
    url: "https://cleantimesofia.com/",
    image: "/portfolio/cleantime.jpg",
    tour: { src: "/portfolio/tour/cleantime.webp", ratio: 5.576 },
    reel: { src: "/portfolio/reel/cleantime.webp", ratio: 3.393 },
    tourMobile: { src: "/portfolio/tour/cleantime-mobile.webp", ratio: 7.179 },
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
  // Also our own product, labelled like TodorovNET. Sign-in is by invitation, so the link opens the public page with the demo.
  {
    slug: "structlab",
    url: "https://structlab-ivory.vercel.app/",
    image: "/portfolio/structlab.jpg",
    tour: { src: "/portfolio/tour/structlab.webp", ratio: 4.316 },
    reel: { src: "/portfolio/reel/structlab.webp", ratio: 3.393 },
    tourMobile: { src: "/portfolio/tour/structlab-mobile.webp", ratio: 7.179 },
  },
  // Also our own product. Software a teacher uses for lessons, homework and payments. The card links to the public page.
  {
    slug: "dimilessons",
    url: "https://dims-lessons.vercel.app/en",
    image: "/portfolio/dims-lessons.jpg",
    tour: { src: "/portfolio/tour/dims-lessons.webp", ratio: 4.375 },
    reel: { src: "/portfolio/reel/dims-lessons.webp", ratio: 3.393 },
    tourMobile: { src: "/portfolio/tour/dims-lessons-mobile.webp", ratio: 15.149 },
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
