interface ValoraLogoProps {
  size?: 'small' | 'large';
  className?: string;
}

export const ValoraLogo = ({ size = 'small', className = '' }: ValoraLogoProps) => {
  const diamondSize = size === 'large' ? 80 : 28;
  const strokeWidth = size === 'large' ? 1 : 1;
  const textSize = size === 'large' ? 'text-5xl' : 'text-base';
  const gap = size === 'large' ? 'gap-6' : 'gap-3';
  const showAnimation = size === 'large';
  
  return (
    <div className={`flex items-center ${gap} ${className}`}>
      <div className={showAnimation ? 'logo-core-rotate' : ''}>
        <svg 
          width={diamondSize} 
          height={diamondSize} 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-foreground"
        >
          {/* Outer diamond with edge glow */}
          <defs>
            <linearGradient id="edgeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.3">
                <animate attributeName="stop-opacity" values="0.3;0.6;0.3" dur="4s" repeatCount="indefinite" />
              </stop>
              <stop offset="50%" stopColor="currentColor" stopOpacity="0.8">
                <animate attributeName="stop-opacity" values="0.8;1;0.8" dur="4s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3">
                <animate attributeName="stop-opacity" values="0.3;0.6;0.3" dur="4s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
            
            {/* Traveling light effect */}
            <linearGradient id="travelingLight" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="currentColor" stopOpacity="0.4">
                <animate attributeName="offset" values="0;1" dur="8s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="transparent">
                <animate attributeName="offset" values="0.5;1.5" dur="8s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
            
            {/* Core glow filter */}
            <filter id="coreGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Outer diamond with traveling light */}
          <path 
            d="M50 10 L90 50 L50 90 L10 50 Z" 
            stroke="url(#travelingLight)" 
            strokeWidth={strokeWidth * 1.5}
            fill="none"
            strokeLinejoin="miter"
            strokeLinecap="square"
            opacity="0.6"
          />
          
          {/* Main diamond structure */}
          <path 
            d="M50 10 L90 50 L50 90 L10 50 Z" 
            stroke="currentColor" 
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinejoin="miter"
            strokeLinecap="square"
            filter={showAnimation ? "url(#coreGlow)" : undefined}
          />
          
          {/* Inner diamond with pulse */}
          <path 
            d="M50 25 L75 50 L50 75 L25 50 Z" 
            stroke="url(#edgeGlow)" 
            strokeWidth={strokeWidth * 0.7}
            fill="none"
            strokeLinejoin="miter"
            strokeLinecap="square"
          />
        </svg>
      </div>
      <span className={`${textSize} font-extralight tracking-[0.15em] text-foreground ${showAnimation ? 'logo-text-shimmer' : ''}`}>
        VALORA
      </span>
    </div>
  );
};
