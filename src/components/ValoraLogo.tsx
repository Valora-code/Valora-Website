interface ValoraLogoProps {
  size?: "small" | "large";
  /** Mark color. Defaults to currentColor (navy via text-foreground). */
  className?: string;
}

function ValoraMark({ pixelSize }: { pixelSize: number }) {
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
      <path
        d="M50 4 C52 22, 78 48, 96 50 C78 52, 52 78, 50 96 C48 78, 22 52, 4 50 C22 48, 48 22, 50 4 Z"
        stroke="currentColor"
        strokeWidth="6"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export const ValoraLogo = ({ size = "small", className = "" }: ValoraLogoProps) => {
  const markSize = size === "large" ? 80 : 44;
  return (
    <div className={`inline-flex items-center text-foreground ${className}`}>
      <ValoraMark pixelSize={markSize} />
    </div>
  );
};
