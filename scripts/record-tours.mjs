// Re-records the "living" portfolio covers: one tall screenshot of each live
// site for the browser frame, one for the phone, and a small cut for the
// showreel wall. Run it after a client's site changes noticeably, then copy
// the printed ratios into lib/projects.ts.
//
//   npm i --no-save puppeteer-core
//   node scripts/record-tours.mjs            # all projects
//   node scripts/record-tours.mjs storm      # one project (file name)
//
// It drives the Chrome already installed on this machine; set CHROME_PATH if
// it lives somewhere else. Look at every image before committing: sections
// that only draw while scrolling (3D scenes, live data) can come out empty,
// which is what the `crop` values below are for.
import { readFileSync, writeFileSync } from "node:fs";
import puppeteer from "puppeteer-core";

const out = new URL("../public/portfolio/", import.meta.url).pathname;

// File name -> address, plus how much of the page to keep (CSS px).
const sites = {
  storm: { url: "https://stormcarwash.vercel.app/" },
  glenz: { url: "https://www.glenz-reinigung.com/" },
  quezher: { url: "https://manufacturas-quezher.vercel.app/" },
  "kibo-2": { url: "https://kibo-2.vercel.app/" },
  dimitar: { url: "https://portfolio-theta-dun-ejq1lqeyg0.vercel.app/" },
  todorovnet: { url: "https://todorovnet.vercel.app/", crop: { desktop: 1450, mobile: 1000 } },
  "cacao-cartel": { url: "https://cacao-cartel.vercel.app/", crop: { desktop: 3000, mobile: 1700 } },
};

const only = process.argv[2];
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const browser = await puppeteer.launch({
  executablePath:
    process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  args: ["--enable-unsafe-swiftshader", "--use-angle=swiftshader", "--lang=bg-BG"],
});

async function record(url, viewport, maxHeight, file, quality) {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  await page.goto(url, { waitUntil: "networkidle2", timeout: 45_000 }).catch(() => {});
  await wait(2500);
  // Walk the page so scroll-triggered sections are revealed, then go back up.
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < Math.min(total, 14_000); y += 450) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
    await wait(220);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await wait(1200);
  const height = Math.min(total, maxHeight);
  await page.screenshot({
    path: file,
    type: "webp",
    quality,
    clip: { x: 0, y: 0, width: viewport.width, height },
    captureBeyondViewport: true,
  });
  await page.close();
  return +(height / viewport.width).toFixed(3);
}

// A 560 px wide, at most 1900 px tall copy for the small screens of the wall.
async function shrink(from, to) {
  const page = await browser.newPage();
  const src = `data:image/webp;base64,${readFileSync(from).toString("base64")}`;
  const result = await page.evaluate(async (src) => {
    const image = new Image();
    image.src = src;
    await image.decode();
    const width = 560;
    const scale = width / image.naturalWidth;
    const height = Math.min(Math.round(image.naturalHeight * scale), 1900);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    context.imageSmoothingQuality = "high";
    context.drawImage(image, 0, 0, width, Math.round(image.naturalHeight * scale));
    return { data: canvas.toDataURL("image/webp", 0.62).split(",")[1], height };
  }, src);
  writeFileSync(to, Buffer.from(result.data, "base64"));
  await page.close();
  return +(result.height / 560).toFixed(3);
}

for (const [name, site] of Object.entries(sites)) {
  if (only && only !== name) continue;
  const tour = await record(
    site.url,
    { width: 1280, height: 800, deviceScaleFactor: 0.75 },
    site.crop?.desktop ?? 9000,
    `${out}tour/${name}.webp`,
    72,
  );
  const tourMobile = await record(
    site.url,
    { width: 390, height: 844, deviceScaleFactor: 1, isMobile: true, hasTouch: true },
    site.crop?.mobile ?? 2800,
    `${out}tour/${name}-mobile.webp`,
    68,
  );
  const reel = await shrink(`${out}tour/${name}.webp`, `${out}reel/${name}.webp`);
  console.log(name, { tour, reel, tourMobile });
}

await browser.close();
