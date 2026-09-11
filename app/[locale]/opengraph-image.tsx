import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ogImageSize } from "@/lib/metadata";
import { isLocale, locales } from "@/lib/routes";

// Pages reference this image explicitly from lib/metadata.ts, together with
// its localised alt text.
export const size = ogImageSize;
export const contentType = "image/png";

// A static TTF with Cyrillic. ImageResponse cannot read WOFF2 or variable
// fonts, and without Cyrillic glyphs the Bulgarian slogan renders as boxes.
const fontPath = join(process.cwd(), "assets/fonts/Unbounded-ExtraBold.ttf");

// One image per language, rendered at build time.
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type ImageProps = {
  params: Promise<{ locale: string }>;
};

export default async function OpenGraphImage({ params }: ImageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const t = await getTranslations({ locale, namespace: "footer" });
  const font = await readFile(fontPath);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          width: "100%",
          height: "100%",
          padding: "0 80px 170px",
          background: "#101b36",
          fontFamily: "Unbounded",
          fontWeight: 800,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            width: "100%",
            gap: 48,
          }}
        >
          <div
            style={{
              display: "flex",
              maxWidth: 760,
              color: "#ffffff",
              fontSize: 64,
              lineHeight: 1.12,
              letterSpacing: "-0.03em",
            }}
          >
            {t("tagline")}
          </div>
          <div
            style={{
              display: "flex",
              color: "#5cc8f7",
              fontSize: 30,
              letterSpacing: "-0.01em",
              paddingBottom: 10,
            }}
          >
            wavsy.dev
          </div>
        </div>
        <svg
          width="1200"
          height="210"
          viewBox="0 0 1200 210"
          style={{ position: "absolute", left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="wave" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2447c0" />
              <stop offset="50%" stopColor="#3fa6ee" />
              <stop offset="100%" stopColor="#5cc8f7" />
            </linearGradient>
          </defs>
          <path
            d="M0 118 C 180 58 330 58 500 104 S 830 170 1000 116 S 1140 70 1200 84 L 1200 210 L 0 210 Z"
            fill="url(#wave)"
            opacity="0.35"
          />
          <path
            d="M0 150 C 170 96 340 96 520 138 S 850 196 1030 146 S 1150 112 1200 120 L 1200 210 L 0 210 Z"
            fill="url(#wave)"
          />
        </svg>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Unbounded",
          data: font,
          weight: 800,
          style: "normal",
        },
      ],
    },
  );
}
