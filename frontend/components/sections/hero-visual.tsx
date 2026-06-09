"use client";

import { motion } from "framer-motion";

const floatTransition = (duration: number, delay = 0) => ({
  duration,
  repeat: Infinity,
  ease: "easeInOut" as const,
  delay,
});

const orbs = [
  { className: "left-[4%] top-[12%]", size: 64, delay: 0, duration: 5.5, tone: "vivid" as const, shade: "radial" as const, blur: 0 },
  { className: "right-[8%] top-[18%]", size: 44, delay: 0.4, duration: 4.8, tone: "light" as const, shade: "top-light" as const, blur: 1 },
  { className: "left-[14%] top-[42%]", size: 34, delay: 0.8, duration: 5.2, tone: "dark" as const, shade: "bottom-light" as const, blur: 2 },
  { className: "right-[4%] top-[48%]", size: 52, delay: 0.2, duration: 6, tone: "vivid" as const, shade: "radial" as const, blur: 0 },
  { className: "left-[22%] bottom-[32%]", size: 26, delay: 1.1, duration: 4.5, tone: "light" as const, shade: "radial" as const, blur: 3 },
  { className: "right-[18%] bottom-[24%]", size: 40, delay: 0.6, duration: 5.8, tone: "dark" as const, shade: "top-light" as const, blur: 1 },
] as const;

type BubbleTone = "vivid" | "light" | "dark";
type BubbleShade = "radial" | "top-light" | "bottom-light";

const bubbleBase: Record<
  BubbleTone,
  { rim: string; glow: string; highlight: number; opacity: number }
> = {
  vivid: {
    rim: "border-white/50",
    glow: "shadow-[0_10px_32px_rgba(244,114,182,0.38),0_0_20px_rgba(251,207,232,0.45)]",
    highlight: 0.95,
    opacity: 1,
  },
  light: {
    rim: "border-white/55",
    glow: "shadow-[0_8px_24px_rgba(251,207,232,0.35),0_0_14px_rgba(255,255,255,0.4)]",
    highlight: 0.9,
    opacity: 0.92,
  },
  dark: {
    rim: "border-white/35",
    glow: "shadow-[0_10px_28px_rgba(219,39,119,0.4),0_0_12px_rgba(244,114,182,0.25)]",
    highlight: 0.75,
    opacity: 1,
  },
};

const bubbleBodies: Record<BubbleTone, Record<BubbleShade, string>> = {
  vivid: {
    radial:
      "bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.92)_0%,rgba(255,210,225,0.45)_38%,rgba(244,114,182,0.42)_68%,rgba(219,39,119,0.28)_100%)]",
    "top-light":
      "bg-[linear-gradient(180deg,rgba(255,255,255,0.9)_0%,rgba(255,200,215,0.5)_45%,rgba(244,114,182,0.45)_100%)]",
    "bottom-light":
      "bg-[linear-gradient(180deg,rgba(251,113,133,0.4)_0%,rgba(255,220,230,0.55)_50%,rgba(255,255,255,0.85)_100%)]",
  },
  light: {
    radial:
      "bg-[radial-gradient(circle_at_36%_32%,rgba(255,255,255,0.88)_0%,rgba(255,241,246,0.55)_50%,rgba(251,207,232,0.25)_100%)]",
    "top-light":
      "bg-[linear-gradient(180deg,rgba(255,255,255,0.95)_0%,rgba(253,242,248,0.6)_50%,rgba(251,207,232,0.3)_100%)]",
    "bottom-light":
      "bg-[linear-gradient(180deg,rgba(251,207,232,0.35)_0%,rgba(255,248,250,0.65)_55%,rgba(255,255,255,0.9)_100%)]",
  },
  dark: {
    radial:
      "bg-[radial-gradient(circle_at_32%_28%,rgba(255,220,230,0.7)_0%,rgba(244,114,182,0.55)_45%,rgba(190,24,93,0.45)_100%)]",
    "top-light":
      "bg-[linear-gradient(180deg,rgba(255,240,245,0.75)_0%,rgba(244,114,182,0.5)_50%,rgba(190,24,93,0.5)_100%)]",
    "bottom-light":
      "bg-[linear-gradient(180deg,rgba(219,39,119,0.55)_0%,rgba(251,113,133,0.45)_50%,rgba(255,230,240,0.7)_100%)]",
  },
};

function GlassBubble({
  size,
  tone,
  shade = "radial",
  blur = 0,
}: {
  size: number;
  tone: BubbleTone;
  shade?: BubbleShade;
  blur?: number;
}) {
  const base = bubbleBase[tone];
  const body = bubbleBodies[tone][shade];
  const highlightSize = Math.round(size * 0.3);

  return (
    <div
      className={`relative rounded-full ${base.glow}`}
      style={{
        width: size,
        height: size,
        filter: blur > 0 ? `blur(${blur}px)` : undefined,
        opacity: base.opacity,
      }}
    >
      <div
        className={`absolute inset-0 rounded-full border ${base.rim} ${body} backdrop-blur-[2px]`}
      />
      <div
        className={`absolute inset-[10%] rounded-full ${
          tone === "dark"
            ? "bg-[radial-gradient(circle_at_70%_75%,rgba(157,23,77,0.2)_0%,transparent_55%)]"
            : "bg-[radial-gradient(circle_at_70%_75%,rgba(219,39,119,0.1)_0%,transparent_55%)]"
        }`}
      />
      <div
        className="absolute rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0)_72%)]"
        style={{
          left: "20%",
          top: "16%",
          width: highlightSize,
          height: highlightSize,
          opacity: base.highlight,
        }}
      />
      <div
        className="absolute rounded-full bg-white/40 blur-[1px]"
        style={{
          right: "22%",
          bottom: "20%",
          width: Math.round(size * 0.1),
          height: Math.round(size * 0.1),
        }}
      />
      <div className="absolute inset-x-[18%] bottom-[14%] h-[10%] rounded-[100%] bg-[radial-gradient(ellipse,rgba(255,255,255,0.4)_0%,transparent_70%)]" />
    </div>
  );
}

function ConstellationLines() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden
    >
      <path
        d="M72 58 C120 90, 160 70, 210 52"
        stroke="rgba(226,85,122,0.22)"
        strokeWidth="1"
        strokeDasharray="3 5"
      />
      <path
        d="M310 88 C280 120, 250 140, 220 165"
        stroke="rgba(192,132,252,0.2)"
        strokeWidth="1"
        strokeDasharray="3 5"
      />
      <path
        d="M88 210 C130 195, 170 185, 215 175"
        stroke="rgba(244,114,182,0.18)"
        strokeWidth="1"
        strokeDasharray="3 5"
      />
      <path
        d="M300 220 C270 250, 230 270, 195 285"
        stroke="rgba(226,85,122,0.16)"
        strokeWidth="1"
        strokeDasharray="3 5"
      />
    </svg>
  );
}

export function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 32 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="relative mx-auto w-full max-w-[40rem] lg:max-w-[44rem]"
    >
      <div className="relative aspect-[4/5] overflow-visible sm:aspect-square lg:min-h-[28rem]">
        <motion.div
          animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.04, 1] }}
          transition={floatTransition(10)}
          className="pointer-events-none absolute inset-[2%] rounded-full bg-[radial-gradient(circle,rgba(244,114,182,0.42)_0%,rgba(251,207,232,0.18)_42%,transparent_72%)] blur-2xl"
        />
        <div className="pointer-events-none absolute left-1/2 top-[38%] h-[55%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(236,72,153,0.26)_0%,transparent_70%)] blur-3xl" />

        <div className="pointer-events-none absolute inset-[8%] rounded-full opacity-[0.4] [background-image:radial-gradient(rgba(226,85,122,0.2)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(circle,black_30%,transparent_72%)]" />

        <ConstellationLines />

        {orbs.map((orb, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, i % 2 === 0 ? -12 : -8, 0] }}
            transition={floatTransition(orb.duration, orb.delay)}
            className={`pointer-events-none absolute z-[2] ${orb.className}`}
          >
            <GlassBubble
              size={orb.size}
              tone={orb.tone}
              shade={orb.shade}
              blur={orb.blur}
            />
          </motion.div>
        ))}

        <div className="pointer-events-none absolute inset-[1%] z-0">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
            className="h-full w-full rounded-full border border-primary/12"
          />
        </div>
        <div className="pointer-events-none absolute inset-[5%] z-0">
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
            className="h-full w-full rounded-full border border-dashed border-primary/18"
          />
        </div>
        <div className="pointer-events-none absolute inset-[6%] z-0">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 110, repeat: Infinity, ease: "linear" }}
            className="h-full w-full rounded-full border border-white/40 opacity-60"
          />
        </div>

        <div className="pointer-events-none absolute inset-[5%] z-[3]">
          <motion.div
            animate={{ scale: [1, 1.025, 1] }}
            transition={floatTransition(8)}
            className="relative h-full w-full"
          >
            <div className="absolute inset-0 overflow-hidden rounded-full shadow-[0_0_0_1px_rgba(255,255,255,0.65),0_0_60px_rgba(244,114,182,0.32),0_0_120px_rgba(251,207,232,0.4)]">
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_28%,rgba(255,255,255,0.96)_0%,rgba(253,242,248,0.88)_28%,rgba(251,207,232,0.55)_52%,rgba(244,114,182,0.34)_78%,rgba(236,72,153,0.14)_100%)]" />
              <motion.div
                animate={{ opacity: [0.35, 0.65, 0.35], x: ["-5%", "5%", "-5%"] }}
                transition={floatTransition(12)}
                className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.55)_0%,transparent_45%)]"
              />
            </div>
            <div className="absolute inset-[6%] rounded-full border border-white/55 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.45),transparent_55%)]" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
