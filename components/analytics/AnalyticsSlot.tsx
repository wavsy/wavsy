import Script from "next/script";
import { UMAMI_WEBSITE_ID } from "@/lib/analytics";
import { flags } from "@/lib/flags";

export function AnalyticsSlot() {
  if (!flags.analytics) {
    return null;
  }

  return (
    <Script
      src="https://cloud.umami.is/script.js"
      data-website-id={UMAMI_WEBSITE_ID}
      strategy="afterInteractive"
    />
  );
}
