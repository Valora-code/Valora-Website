interface ValoraLogoProps {
  size?: 'small' | 'large';
  className?: string;
}

// New teal sparkle-diamond icon matching the brand logo
const ValoraIcon = ({ size = 24, animate = false }: { size?: number; animate?: boolean }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={animate ? 'logo-glow-pulse' : ''}
  >
    <defs>
      <linearGradient id="tealGradient" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="hsl(172, 65%, 55%)" />
        <stop offset="100%" stopColor="hsl(172, 50%, 40%)" />
      </linearGradient>
      <linearGradient id="tealGradientLarge" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="hsl(172, 70%, 60%)">
          <animate attributeName="stop-color" values="hsl(172,70%,60%);hsl(185,70%,60%);hsl(172,70%,60%)" dur="6s" repeatCount="indefinite" />
        </stop>
        <stop offset="100%" stopColor="hsl(172, 50%, 40%)">
          <animate attributeName="stop-color" values="hsl(172,50%,40%);hsl(160,55%,42%);hsl(172,50%,40%)" dur="6s" repeatCount="indefinite" />
        </stop>
      </linearGradient>
    </defs>
    {/* 4-pointed sparkle/star – matches the uploaded logo exactly */}
    <path
      d="M50 4 C52 22, 78 48, 96 50 C78 52, 52 78, 50 96 C48 78, 22 52, 4 50 C22 48, 48 22, 50 4 Z"
      stroke={animate ? "url(#tealGradientLarge)" : "url(#tealGradient)"}
      strokeWidth="4"
      fill="none"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </svg>
);

export const ValoraLogo = ({ size = 'small', className = '' }: ValoraLogoProps) => {
  const iconSize = size === 'large' ? 64 : 28;
  const textSize = size === 'large' ? 'text-4xl' : 'text-sm';
  const gap = size === 'large' ? 'gap-5' : 'gap-2.5';
  const animate = size === 'large';

  return (
    <div className={`flex items-center ${gap} ${className}`}>
      <ValoraIcon size={iconSize} animate={animate} />
      <span
        className={`${textSize} font-medium tracking-[0.2em] text-foreground/90 ${animate ? 'logo-text-shimmer' : ''}`}
        style={{ letterSpacing: '0.2em' }}
      >
        VALORA
      </span>
    </div>
  );
};

export { ValoraIcon };
