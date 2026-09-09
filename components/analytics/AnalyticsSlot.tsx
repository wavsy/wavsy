import { flags } from "@/lib/flags";

export function AnalyticsSlot() {
  if (!flags.analytics) {
    return null;
  }

  return null;
}
