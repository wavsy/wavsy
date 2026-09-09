import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
};

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "text-[0.75rem] font-medium uppercase tracking-[0.18em] text-muted",
        className,
      )}
    >
      {children}
    </p>
  );
}
