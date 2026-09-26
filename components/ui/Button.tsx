import Link from "next/link";
import { cn } from "@/lib/cn";

type Shared = {
  children: React.ReactNode;
  // primary: dark pill on light backgrounds. inverse: white pill on dark
  // backgrounds. outline: bordered pill on dark backgrounds. soft: bordered
  // pill on light backgrounds. ghost: a text link with an arrow.
  variant?: "primary" | "ghost" | "inverse" | "outline" | "soft";
  size?: "sm" | "md";
  className?: string;
  ariaLabel?: string;
  icon?: React.ReactNode;
};

type ButtonProps =
  | (Shared & {
      href: string;
      external?: boolean;
      type?: never;
      disabled?: never;
      onClick?: () => void;
    })
  | (Shared & {
      href?: never;
      external?: never;
      type: "button" | "submit";
      disabled?: boolean;
      onClick?: () => void;
      name?: string;
      value?: string;
    });

// Pill buttons in the style of the AI page: the brand gradient sweeps in
// from the left on hover, the arrow sits in its own circle and slides, and a
// press scales the button down a touch (the feedback phones get).
export function Button(props: ButtonProps) {
  const { children, variant = "primary", size = "md", className, ariaLabel, icon } = props;
  const pill = variant !== "ghost";

  const classes = cn(
    "group relative isolate inline-flex items-center font-medium tracking-[-0.01em] transition-[transform,box-shadow,color,border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60",
    pill && "btn-sweep overflow-hidden rounded-full",
    pill && (size === "sm" ? "gap-2.5 py-1 pl-4 pr-1 text-sm" : "gap-3 py-1.5 pl-6 pr-1.5 text-[0.9375rem]"),
    variant === "primary" &&
      "bg-ink text-white shadow-[0_10px_30px_-18px_rgb(17_28_51/0.8)] hover:shadow-[0_18px_44px_-14px_rgb(19_111_212/0.75)]",
    variant === "inverse" &&
      "bg-white text-ink hover:text-white hover:shadow-[0_18px_44px_-14px_rgb(63_193_240/0.7)]",
    variant === "outline" &&
      "border border-white/25 text-white hover:border-transparent hover:shadow-[0_18px_44px_-14px_rgb(63_193_240/0.6)]",
    variant === "soft" &&
      "border border-ink/15 bg-white text-ink hover:border-transparent hover:text-white hover:shadow-[0_18px_44px_-14px_rgb(19_111_212/0.6)]",
    variant === "ghost" && "gap-2 py-2 text-[0.9375rem] text-current",
    className,
  );

  const chip = cn(
    "relative grid shrink-0 place-items-center rounded-full transition-colors duration-300",
    size === "sm" ? "size-7" : "size-9",
    variant === "primary" && "bg-white/12 group-hover:bg-white group-hover:text-ink",
    variant === "inverse" && "bg-ink/8 group-hover:bg-white group-hover:text-ink",
    variant === "outline" && "bg-white/10 group-hover:bg-white group-hover:text-ink",
    variant === "soft" && "bg-ink/6 group-hover:bg-white group-hover:text-ink",
  );

  const arrow = (
    <span aria-hidden className="relative block overflow-hidden">
      <span className="block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[140%]">
        →
      </span>
      <span className="absolute inset-0 block -translate-x-[140%] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0">
        →
      </span>
    </span>
  );

  const inner = pill ? (
    <>
      {icon ? <span className="relative shrink-0">{icon}</span> : null}
      <span className="relative">{children}</span>
      <span className={chip}>{arrow}</span>
    </>
  ) : (
    <>
      {icon ? <span className="shrink-0">{icon}</span> : null}
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
        {children}
      </span>
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </>
  );

  if ("href" in props && props.href) {
    const href = props.href;
    const native = /^(https?:|mailto:|tel:|viber:|sms:)/i.test(href);
    const externalProps = props.external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

    if (native) {
      return (
        <a href={href} className={classes} onClick={props.onClick} aria-label={ariaLabel} {...externalProps}>
          {inner}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} onClick={props.onClick} aria-label={ariaLabel}>
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
      aria-label={ariaLabel}
      className={classes}
    >
      {inner}
    </button>
  );
}
