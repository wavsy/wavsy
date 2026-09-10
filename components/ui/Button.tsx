import Link from "next/link";
import { cn } from "@/lib/cn";

type Shared = {
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "inverse";
  className?: string;
};

type ButtonProps =
  | (Shared & { href: string; type?: never; disabled?: never; onClick?: never })
  | (Shared & {
      href?: never;
      type: "button" | "submit";
      disabled?: boolean;
      onClick?: () => void;
      name?: string;
      value?: string;
    });

export function Button(props: ButtonProps) {
  const { children, variant = "primary", className } = props;
  const classes = cn(
    "group inline-flex items-center gap-2 text-[0.9375rem] tracking-[-0.01em] transition-colors duration-150",
    variant === "primary" &&
      "bg-ink px-5 py-3 text-white hover:bg-navy disabled:opacity-60",
    variant === "ghost" && "py-3 text-ink hover:text-navy",
    variant === "inverse" &&
      "bg-white px-5 py-3 text-ink hover:bg-cyan disabled:opacity-60",
    className,
  );

  const inner = (
    <>
      <span>{children}</span>
      <span
        aria-hidden
        className="translate-x-0 transition-transform duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
      >
        →
      </span>
    </>
  );

  if ("href" in props && props.href) {
    const href = props.href;
    const native = /^(https?:|mailto:|tel:|viber:|sms:)/i.test(href);

    if (native) {
      return (
        <a href={href} className={classes}>
          {inner}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={props.type}
      disabled={props.disabled}
      onClick={props.onClick}
      name={"name" in props ? props.name : undefined}
      value={"value" in props ? props.value : undefined}
      className={classes}
    >
      {inner}
    </button>
  );
}
