import Link from "next/link";

type LogoProps = {
  className?: string;
  href?: string;
};

export function Logo({ className, href = "/" }: LogoProps) {
  return (
    <Link href={href} className={className} aria-label="Wavsy">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/wavsy-logo-horizontal.svg"
        alt=""
        width={180}
        height={40}
        className="h-8 w-auto sm:h-9"
      />
    </Link>
  );
}
