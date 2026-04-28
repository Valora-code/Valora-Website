import { useId } from "react";

interface HeroAtmosphereProps {
  className?: string;
}

/**
 * Soft "atmosphere" blob — two overlapping circles with a vertical gradient,
 * blurred edges and tinted film grain. Sits behind the hero copy as a painterly
 * canvas (Talentium-style), translated to Valora's cream→teal palette.
 */
export const HeroAtmosphere = ({ className = "" }: HeroAtmosphereProps) => {
  const rid = useId().replace(/:/g, "");
  const grad = `valora-blob-grad-${rid}`;
  const grain = `valora-blob-grain-${rid}`;
  const maskBlur = `valora-mask-blur-${rid}`;
  const starMask = `valora-star-mask-${rid}`;

  return (
    <svg
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Vertical sunrise → mint horizon → teal water */}
        <linearGradient id={grad} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#F8F1E0" />
          <stop offset="22%" stopColor="#FFE9B2" />
          <stop offset="42%" stopColor="#E5EDD8" />
          <stop offset="60%" stopColor="#A8CFC4" />
          <stop offset="82%" stopColor="#1a7a6e" />
          <stop offset="100%" stopColor="#0D5048" />
        </linearGradient>

        {/* Mask-edge softness — keeps star geometry clearly readable while still feathering the edge. */}
        <filter id={maskBlur} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="22" />
        </filter>

        {/* Film grain inside the visible region */}
        <filter id={grain} x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0.55 0"
          />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>

        {/* Soft star mask — the star path filled white and blurred, so its edges become alpha gradients
            instead of a hard clip. Colors bleed beyond the original silhouette as a halo (Talentium pattern). */}
        <mask id={starMask} maskUnits="userSpaceOnUse" x="-300" y="-300" width="1800" height="1400">
          <g filter={`url(#${maskBlur})`}>
            <path
              d="M50 4 C52 22, 78 48, 96 50 C78 52, 52 78, 50 96 C48 78, 22 52, 4 50 C22 48, 48 22, 50 4 Z"
              fill="white"
              transform="translate(200 0) scale(8)"
            />
          </g>
        </mask>
      </defs>

      {/* Gradient body — a full-viewBox rect, so the star mask is the ONLY thing
          defining the visible silhouette. No more peanut-shaped clipping artefact. */}
      <g mask={`url(#${starMask})`}>
        <rect x="0" y="0" width="1200" height="800" fill={`url(#${grad})`} />
      </g>

      {/* Grain overlay — same approach: full-rect content, star mask, multiply blend */}
      <g
        mask={`url(#${starMask})`}
        filter={`url(#${grain})`}
        style={{ mixBlendMode: "multiply" }}
        opacity="0.6"
      >
        <rect x="0" y="0" width="1200" height="800" fill="#1a7a6e" />
      </g>
    </svg>
  );
};
