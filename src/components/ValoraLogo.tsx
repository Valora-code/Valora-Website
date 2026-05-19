interface ValoraLogoProps {
  size?: "small" | "large";
  className?: string;
}

const sizeClass = {
  small: "h-10 w-auto",
  large: "h-20 w-auto",
} as const;

export const ValoraLogo = ({ size = "small", className = "" }: ValoraLogoProps) => {
  return (
    <img
      src="/logo_black.svg"
      alt=""
      width={size === "large" ? 76 : 38}
      height={size === "large" ? 80 : 40}
      className={`shrink-0 object-contain ${sizeClass[size]} ${className}`}
      decoding="async"
    />
  );
};
