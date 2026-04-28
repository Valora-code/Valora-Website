import { useId } from "react";

type Variant = "dawn" | "meadow" | "dusk" | "forest";

interface PainterlyStepCardProps {
  eyebrow: string;
  title: string;
  body: string;
  imageSrc: string;
  variant?: Variant;
}

const PALETTES: Record<
  Variant,
  {
    fallback: string;
    base: { offset: number; color: string; alpha: number }[];
    clouds: { warm: string; cool: string; deep: string; highlight: string; spark: string };
  }
> = {
  dawn: {
    fallback: "#1B2A3D",
    base: [
      { offset: 0, color: "#27425E", alpha: 0.5 },
      { offset: 28, color: "#5C6F8A", alpha: 0.35 },
      { offset: 55, color: "#D4A472", alpha: 0.3 },
      { offset: 78, color: "#7D6B70", alpha: 0.5 },
      { offset: 100, color: "#1B2A3D", alpha: 0.72 },
    ],
    clouds: {
      warm: "#E8B07A",
      cool: "#6B82AB",
      deep: "#0E1A2A",
      highlight: "#D4DCEE",
      spark: "#F3CBA0",
    },
  },
  meadow: {
    fallback: "#3D4A2E",
    base: [
      { offset: 0, color: "#7B9265", alpha: 0.48 },
      { offset: 28, color: "#B8C97A", alpha: 0.32 },
      { offset: 55, color: "#E5C36A", alpha: 0.28 },
      { offset: 78, color: "#5F7A4A", alpha: 0.45 },
      { offset: 100, color: "#3A4A2E", alpha: 0.7 },
    ],
    clouds: {
      warm: "#F2D88A",
      cool: "#9DBAD0",
      deep: "#2A3722",
      highlight: "#DFE9C6",
      spark: "#FAE3A0",
    },
  },
  dusk: {
    fallback: "#0B202E",
    base: [
      { offset: 0, color: "#1F2D45", alpha: 0.55 },
      { offset: 28, color: "#3A4357", alpha: 0.42 },
      { offset: 55, color: "#7A5A38", alpha: 0.36 },
      { offset: 78, color: "#1A3D45", alpha: 0.55 },
      { offset: 100, color: "#0B202E", alpha: 0.75 },
    ],
    clouds: {
      warm: "#C0883F",
      cool: "#4D6086",
      deep: "#06121A",
      highlight: "#9AA9C8",
      spark: "#E5B062",
    },
  },
  forest: {
    // Oil-painting forest palette — sage sky → teal forest → blue water → dark earth
    fallback: "#0E2528",
    base: [
      { offset: 0, color: "#9BB082", alpha: 0.45 },
      { offset: 28, color: "#7A9580", alpha: 0.32 },
      { offset: 55, color: "#5B9CB8", alpha: 0.28 },
      { offset: 78, color: "#1F4A55", alpha: 0.5 },
      { offset: 100, color: "#0E2528", alpha: 0.72 },
    ],
    clouds: {
      warm: "#C4D4A8",
      cool: "#3F8FAB",
      deep: "#0A1F22",
      highlight: "#D5E0C8",
      spark: "#7FB6CC",
    },
  },
};

export const PainterlyStepCard = ({
  eyebrow,
  title,
  body,
  imageSrc,
  variant = "dusk",
}: PainterlyStepCardProps) => {
  const rid = useId().replace(/:/g, "");
  const palette = PALETTES[variant];
  const ids = {
    bg: `card-bg-${rid}`,
    warm: `card-warm-${rid}`,
    cool: `card-cool-${rid}`,
    deep: `card-deep-${rid}`,
    highlight: `card-hl-${rid}`,
    spark: `card-sp-${rid}`,
    grain: `card-grain-${rid}`,
  };

  return (
    <div className="relative">
      {/* Painterly backdrop = real photo + atmospheric overlays + grain. Edges feather into cream. */}
      <div
        aria-hidden
        className="absolute inset-0 overflow-hidden rounded-[1.75rem] sm:rounded-[2.25rem]"
        style={{
          backgroundColor: palette.fallback,
          WebkitMaskImage:
            "radial-gradient(ellipse 110% 110% at center, black 55%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 110% 110% at center, black 55%, transparent 100%)",
        }}
      >
        <img
          src={imageSrc}
          alt=""
          className="painterly-parallax absolute inset-0 h-full w-full object-cover"
          style={{
            filter: "blur(5px) saturate(1.5) brightness(1.05) contrast(1.1)",
            transform: "scale(1.14)",
          }}
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />

        <svg
          viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={ids.bg} x1="50%" y1="0%" x2="50%" y2="100%">
              {palette.base.map((stop, i) => (
                <stop
                  key={i}
                  offset={`${stop.offset}%`}
                  stopColor={stop.color}
                  stopOpacity={stop.alpha}
                />
              ))}
            </linearGradient>
            <radialGradient id={ids.warm} cx="32%" cy="62%" r="42%">
              <stop offset="0%" stopColor={palette.clouds.warm} stopOpacity="0.5" />
              <stop offset="100%" stopColor={palette.clouds.warm} stopOpacity="0" />
            </radialGradient>
            <radialGradient id={ids.cool} cx="78%" cy="22%" r="50%">
              <stop offset="0%" stopColor={palette.clouds.cool} stopOpacity="0.45" />
              <stop offset="100%" stopColor={palette.clouds.cool} stopOpacity="0" />
            </radialGradient>
            <radialGradient id={ids.deep} cx="85%" cy="92%" r="38%">
              <stop offset="0%" stopColor={palette.clouds.deep} stopOpacity="0.5" />
              <stop offset="100%" stopColor={palette.clouds.deep} stopOpacity="0" />
            </radialGradient>
            <radialGradient id={ids.highlight} cx="22%" cy="18%" r="32%">
              <stop offset="0%" stopColor={palette.clouds.highlight} stopOpacity="0.38" />
              <stop offset="100%" stopColor={palette.clouds.highlight} stopOpacity="0" />
            </radialGradient>
            <radialGradient id={ids.spark} cx="58%" cy="78%" r="22%">
              <stop offset="0%" stopColor={palette.clouds.spark} stopOpacity="0.38" />
              <stop offset="100%" stopColor={palette.clouds.spark} stopOpacity="0" />
            </radialGradient>
            <filter id={ids.grain} x="0%" y="0%" width="100%" height="100%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="1.3"
                numOctaves="2"
                stitchTiles="stitch"
              />
              <feColorMatrix
                values="0 0 0 0 0.95
                        0 0 0 0 0.92
                        0 0 0 0 0.85
                        0 0 0 1 -0.5"
              />
            </filter>
          </defs>

          <rect width="100%" height="100%" fill={`url(#${ids.bg})`} />
          <rect width="100%" height="100%" fill={`url(#${ids.warm})`} />
          <rect width="100%" height="100%" fill={`url(#${ids.cool})`} />
          <rect width="100%" height="100%" fill={`url(#${ids.deep})`} />
          <rect width="100%" height="100%" fill={`url(#${ids.highlight})`} />
          <rect width="100%" height="100%" fill={`url(#${ids.spark})`} />
          <rect
            width="100%"
            height="100%"
            filter={`url(#${ids.grain})`}
            opacity="0.9"
            style={{ mixBlendMode: "overlay" }}
          />
        </svg>
      </div>

      {/* Content — cream text layered on top */}
      <div className="relative z-10 flex flex-col p-8 sm:p-10 md:p-14">
        <span className="mb-6 inline-flex w-fit items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#F8F1E0] backdrop-blur-sm">
          {eyebrow}
        </span>
        <h3
          className="display-section mb-5 max-w-[18ch] text-[clamp(1.6rem,3.2vw,2.4rem)] leading-[1.05]"
          style={{ color: "#F8F1E0" }}
        >
          {title}
        </h3>
        <p
          className="max-w-[58ch] text-[15px] leading-[1.6] sm:text-base"
          style={{ color: "rgba(248, 241, 224, 0.82)" }}
        >
          {body}
        </p>
      </div>
    </div>
  );
};
