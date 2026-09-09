export const flags = {
  assistant: process.env.NEXT_PUBLIC_ASSISTANT_ENABLED === "true",
  analytics: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true",
} as const;
