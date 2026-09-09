import { cn } from "@/lib/cn";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  tone?: "paper" | "white" | "deep";
  id?: string;
};

export function Section({
  children,
  className,
  tone = "paper",
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 md:py-28 lg:py-32",
        tone === "paper" && "bg-paper text-ink",
        tone === "white" && "bg-white text-ink",
        tone === "deep" && "bg-deep text-white",
        className,
      )}
    >
      {children}
    </section>
  );
}
