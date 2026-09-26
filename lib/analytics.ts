// Umami Cloud (KAN-18): cookieless and free on the Hobby plan (EU region), so
// the site needs no consent banner. The website id is public by design (it is
// in every page's HTML), so it lives here; an env var can still override it.
// Only wavsy.dev is counted (see AnalyticsSlot), never localhost or previews.
export const UMAMI_WEBSITE_ID =
  process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || "31accec4-20c8-41e8-8f0d-5ddda051e684";
export const UMAMI_DOMAINS = "wavsy.dev";

type EventData = Record<string, string | number>;

declare global {
  interface Window {
    umami?: { track: (event: string, data?: EventData) => void };
  }
}

/**
 * Click events that need no JavaScript: Umami reads these attributes itself.
 * umamiEvent("cta-quote", { location: "hero" }) →
 * data-umami-event="cta-quote" data-umami-event-location="hero".
 */
export function umamiEvent(name: string, data: Record<string, string> = {}) {
  const attributes: Record<string, string> = { "data-umami-event": name };
  for (const [key, value] of Object.entries(data)) {
    attributes[`data-umami-event-${key}`] = value;
  }
  return attributes;
}

/** Sends an event to Umami when analytics is on; does nothing otherwise. */
export function trackEvent(name: string, data?: EventData) {
  if (typeof window === "undefined") {
    return;
  }
  window.umami?.track(name, data);
}
