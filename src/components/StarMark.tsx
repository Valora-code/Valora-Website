interface StarMarkProps {
  size?: number;
  className?: string;
  strokeWidth?: number;
  variant?: "filled" | "outline";
}

export const StarMark = ({
  size = 12,
  className = "",
  strokeWidth = 6,
  variant = "filled",
}: StarMarkProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill={variant === "filled" ? "currentColor" : "none"}
    stroke={variant === "outline" ? "currentColor" : "none"}
    strokeWidth={variant === "outline" ? strokeWidth : 0}
    strokeLinejoin="round"
    className={className}
    aria-hidden
  >
    <path d="M50 4 C52 22, 78 48, 96 50 C78 52, 52 78, 50 96 C48 78, 22 52, 4 50 C22 48, 48 22, 50 4 Z" />
  </svg>
);
