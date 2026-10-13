import { cn } from "@/lib/cn";
import s from "./Clip.module.css";

export type ClipName =
  | "websites"
  | "apps"
  | "maintenance"
  | "automation"
  | "weeks"
  | "offer"
  | "after"
  | "contact"
  | "handoff"
  | "send"
  | "lost";

type ClipProps = {
  name: ClipName;
  /**
   * "hover": moves only while its row is hovered, or centred on a touch
   * screen (an ancestor with `.group` or `data-center-active`).
   * "always": loops for as long as it is on the page.
   */
  play?: "hover" | "always";
  className?: string;
};

/**
 * Small line-drawn clips, one idea each, drawn in code and coloured by
 * `currentColor` so they follow the text colour of whatever they sit in.
 * Decorative only: hidden from assistive tech, still with reduced motion.
 */
export function Clip({ name, play = "hover", className }: ClipProps) {
  return (
    <svg
      viewBox="0 0 120 90"
      fill="none"
      aria-hidden
      className={cn(s.clip, play === "always" && s.always, className)}
    >
      {name === "websites" && <Websites />}
      {name === "apps" && <Apps />}
      {name === "maintenance" && <Maintenance />}
      {name === "automation" && <Automation />}
      {name === "weeks" && <Weeks />}
      {name === "offer" && <Offer />}
      {name === "after" && <After />}
      {name === "contact" && <Contact />}
      {name === "handoff" && <Handoff />}
      {name === "send" && <Send />}
      {name === "lost" && <Lost />}
    </svg>
  );
}

function Frame() {
  return (
    <>
      <rect x="6" y="8" width="108" height="74" rx="9" className={s.line} />
      <path d="M6 22h108" className={s.line} />
      <circle cx="15" cy="15" r="1.8" className={s.solid} />
      <circle cx="22" cy="15" r="1.8" className={s.solid} />
    </>
  );
}

/** A page assembles itself, the cursor presses the button. */
function Websites() {
  return (
    <>
      <Frame />
      <rect x="16" y="30" width="52" height="20" rx="4" className={cn(s.soft, s.growX)} />
      <rect x="76" y="34" width="28" height="12" rx="6" className={cn(s.solid, s.press)} />
      {[16, 46, 76].map((x, i) => (
        <rect
          key={x}
          x={x}
          y="58"
          width="24"
          height="16"
          rx="4"
          className={cn(s.soft, s.riseIn)}
          style={{ animationDelay: `${0.35 + i * 0.15}s` }}
        />
      ))}
      <g className={s.cursor}>
        <path d="M0 0l10 6-4.4 1-2.2 4.2z" className={s.solid} />
      </g>
    </>
  );
}

/** A dashboard: bars grow, a switch flips. */
function Apps() {
  return (
    <>
      <Frame />
      <path d="M34 22v60" className={s.line} />
      {[12, 12, 12].map((w, i) => (
        <rect key={i} x="13" y={30 + i * 10} width={w + i * 2} height="4" rx="2" className={s.soft} />
      ))}
      {[18, 30, 22, 38, 27].map((h, i) => (
        <rect
          key={i}
          x={44 + i * 13}
          y={74 - h}
          width="8"
          height={h}
          rx="3"
          className={cn(s.solid, s.bar)}
          style={{ animationDelay: `${i * 0.14}s` }}
        />
      ))}
      <rect x="86" y="27" width="20" height="10" rx="5" className={s.line} />
      <circle cx="91" cy="32" r="3" className={cn(s.solid, s.knob)} />
    </>
  );
}

/** A heartbeat that never stops, under a shield that gets its tick. */
function Maintenance() {
  return (
    <>
      <path d="M60 8l26 9v19c0 14-10 24-26 30-16-6-26-16-26-30V17z" className={s.line} />
      <path d="M48 36l9 9 16-18" className={cn(s.line, s.tick)} />
      {/* The whole trace stays drawn; a brighter pulse runs along it. */}
      <path d="M4 78h26l6-10 8 18 7-13 5 5h60" className={cn(s.line, s.faint)} />
      <path
        d="M4 78h26l6-10 8 18 7-13 5 5h60"
        className={cn(s.line, s.beat)}
        pathLength={100}
      />
    </>
  );
}

/** A message goes in, the assistant works, an answer comes out. */
function Automation() {
  return (
    <>
      <rect x="6" y="30" width="30" height="24" rx="8" className={s.line} />
      {[14, 21, 28].map((x, i) => (
        <circle
          key={x}
          cx={x}
          cy="42"
          r="2"
          className={cn(s.solid, s.blink)}
          style={{ animationDelay: `${i * 0.18}s` }}
        />
      ))}
      <path d="M36 42h18" className={cn(s.line, s.flow)} />
      <circle cx="66" cy="42" r="12" className={s.line} />
      <path d="M66 34v16M58 42h16M60.5 36.5l11 11M71.5 36.5l-11 11" className={cn(s.line, s.spin)} />
      <path d="M78 42h14" className={cn(s.line, s.flow)} />
      <circle cx="103" cy="42" r="11" className={cn(s.soft, s.pop)} />
      <path d="M97.5 42.5l4 4 7-8" className={cn(s.line, s.tick)} />
    </>
  );
}

/** Three weeks fill up, one after another. */
function Weeks() {
  return (
    <>
      {[0, 1, 2].map((row) => (
        <g key={row}>
          <rect x="10" y={16 + row * 22} width="100" height="12" rx="6" className={s.line} />
          <rect
            x="10"
            y={16 + row * 22}
            width="100"
            height="12"
            rx="6"
            className={cn(s.solid, s.week)}
            style={{ animationDelay: `${row * 0.9}s` }}
          />
        </g>
      ))}
    </>
  );
}

/** The offer: every line of the scope gets its tick. */
function Offer() {
  return (
    <>
      <rect x="26" y="6" width="68" height="78" rx="9" className={s.line} />
      {[0, 1, 2].map((row) => (
        <g key={row}>
          <path
            d={`M36 ${26 + row * 18}l4 4 7-8`}
            className={cn(s.line, s.tickLoop)}
            style={{ animationDelay: `${row * 0.5}s` }}
          />
          <path d={`M54 ${26 + row * 18}h${[28, 20, 26][row]}`} className={s.line} />
        </g>
      ))}
    </>
  );
}

/** After launch: the work keeps going round. */
function After() {
  return (
    <>
      <g className={s.orbit}>
        <path d="M60 14a31 31 0 0 1 29 20" className={s.line} />
        <path d="M91 22l-2 12-11-5" className={s.line} />
        <path d="M60 76a31 31 0 0 1-29-20" className={s.line} />
        <path d="M29 68l2-12 11 5" className={s.line} />
      </g>
      <circle cx="60" cy="45" r="7" className={cn(s.solid, s.pulse)} />
    </>
  );
}

/** Two people, talking directly. */
function Contact() {
  return (
    <>
      <circle cx="22" cy="38" r="9" className={s.line} />
      <path d="M8 66c2-10 8-14 14-14s12 4 14 14" className={s.line} />
      <circle cx="98" cy="38" r="9" className={s.line} />
      <path d="M84 66c2-10 8-14 14-14s12 4 14 14" className={s.line} />
      <path d="M40 34h40" className={cn(s.line, s.dashes)} />
      <circle cx="40" cy="34" r="3.5" className={cn(s.solid, s.there)} />
      <circle cx="80" cy="46" r="3.5" className={cn(s.solid, s.back)} />
      <path d="M40 46h40" className={cn(s.line, s.dashes)} />
    </>
  );
}

/** Hand-over: the key travels from us to the client, then it is theirs. */
function Handoff() {
  return (
    <>
      <rect x="6" y="26" width="34" height="38" rx="9" className={s.line} />
      <rect x="80" y="26" width="34" height="38" rx="9" className={s.line} />
      <path d="M44 45h32" className={cn(s.line, s.dashes)} />
      <g className={s.carry}>
        <circle cx="19" cy="45" r="5" className={s.line} />
        <path d="M24 45h12M31 45v5M35 45v4" className={s.line} />
      </g>
      <path d="M90 45l5 5 9-10" className={cn(s.line, s.tickLate)} />
    </>
  );
}

/** A message takes off. */
function Send() {
  return (
    <>
      <path d="M8 74c22-2 46-14 66-40" className={cn(s.line, s.flow, s.faint)} />
      <g className={s.fly}>
        <path d="M70 34l38-20-14 40-9-14z" className={s.line} />
        <path d="M85 40l23-26" className={s.line} />
      </g>
    </>
  );
}

/** Lost: a compass looking for north. */
function Lost() {
  return (
    <>
      <circle cx="60" cy="45" r="36" className={s.line} />
      <path d="M60 13v6M60 71v6M28 45h6M86 45h6" className={s.line} />
      <g className={s.needle}>
        <path d="M60 22l8 23-8 23-8-23z" className={s.line} />
        <path d="M60 22l8 23h-16z" className={s.solid} />
      </g>
    </>
  );
}
