import { flags } from "@/lib/flags";

export function SiteAssistant() {
  if (!flags.assistant) {
    return null;
  }

  return (
    <div
      id="site-assistant"
      className="pointer-events-none fixed bottom-6 right-6 z-[60]"
      aria-hidden
    />
  );
}
