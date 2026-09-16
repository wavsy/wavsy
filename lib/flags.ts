export const flags = {
  assistant: process.env.NEXT_PUBLIC_ASSISTANT_ENABLED === "true",
  // Analytics needs both the switch and the Umami website id.
  analytics:
    process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true" &&
    Boolean(process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID),
} as const;
