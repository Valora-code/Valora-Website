interface ValoraLogoProps {
  size?: "small" | "large";
  className?: string;
}

const sizeClass = {
  small: "h-12 w-auto",
  large: "h-20 w-auto",
} as const;

export const ValoraLogo = ({ size = "small", className = "" }: ValoraLogoProps) => {
  return (
    <img
      src="/logo_black.svg"
      alt=""
      width={size === "large" ? 76 : 46}
      height={size === "large" ? 80 : 48}
      className={`shrink-0 object-contain ${sizeClass[size]} ${className}`}
      decoding="async"
    />
  );
};
