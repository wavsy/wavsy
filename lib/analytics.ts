// Umami Cloud (KAN-18): cookieless and free on the Hobby plan, so the site
// needs no consent banner. Nothing loads until the website id is set.
export const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ?? "";

type EventData = Record<string, string | number>;

declare global {
  interface Window {
    umami?: { track: (event: string, data?: EventData) => void };
  }
}

/** Sends an event to Umami when analytics is on; does nothing otherwise. */
export function trackEvent(name: string, data?: EventData) {
  if (typeof window === "undefined") {
    return;
  }
  window.umami?.track(name, data);
}
