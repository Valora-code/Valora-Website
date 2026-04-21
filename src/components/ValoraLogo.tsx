import { useId } from "react";

interface ValoraLogoProps {
  size?: "small" | "large";
  className?: string;
}

function ValoraMark({ pixelSize, animate }: { pixelSize: number; animate: boolean }) {
  const rid = useId().replace(/:/g, "");
  const g1 = `tealGradient-${rid}`;
  const g2 = `tealGradientLarge-${rid}`;

  return (
    <svg
      width={pixelSize}
      height={pixelSize}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden
    >
      <defs>
        <linearGradient id={g1} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="hsl(172, 65%, 55%)" />
          <stop offset="100%" stopColor="hsl(172, 50%, 40%)" />
        </linearGradient>
        {animate ? (
          <linearGradient id={g2} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="hsl(172, 70%, 60%)">
              <animate
                attributeName="stopColor"
                values="hsl(172,70%,60%);hsl(185,70%,60%);hsl(172,70%,60%)"
                dur="6s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="hsl(172, 50%, 40%)">
              <animate
                attributeName="stopColor"
                values="hsl(172,50%,40%);hsl(160,55%,42%);hsl(172,50%,40%)"
                dur="6s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        ) : null}
      </defs>
      <path
        d="M50 4 C52 22, 78 48, 96 50 C78 52, 52 78, 50 96 C48 78, 22 52, 4 50 C22 48, 48 22, 50 4 Z"
        stroke={animate ? `url(#${g2})` : `url(#${g1})`}
        strokeWidth="4"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export const ValoraLogo = ({ size = "small", className = "" }: ValoraLogoProps) => {
  const isLarge = size === "large";
  const textSize = isLarge ? "text-4xl" : "text-sm";
  const gap = isLarge ? "gap-5" : "gap-2.5";
  const markSize = isLarge ? 64 : 28;

  return (
    <div className={`flex items-center ${gap} ${className}`}>
      <ValoraMark pixelSize={markSize} animate={isLarge} />
      <span
        className={`${textSize} font-medium tracking-[0.2em] text-foreground/90`}
        style={{ letterSpacing: "0.2em" }}
      >
        VALORA
      </span>
    </div>
  );
};
