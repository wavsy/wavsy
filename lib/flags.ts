export const flags = {
  assistant: process.env.NEXT_PUBLIC_ASSISTANT_ENABLED === "true",
  // Umami is on unless explicitly switched off (NEXT_PUBLIC_ANALYTICS_ENABLED=false).
  analytics: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED !== "false",
} as const;
