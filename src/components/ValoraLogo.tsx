interface ValoraLogoProps {
  size?: 'small' | 'large';
  className?: string;
}

export const ValoraLogo = ({ size = 'small', className = '' }: ValoraLogoProps) => {
  const diamondSize = size === 'large' ? 80 : 28;
  const strokeWidth = size === 'large' ? 0.8 : 0.8;
  const textSize = size === 'large' ? 'text-5xl' : 'text-base';
  const gap = size === 'large' ? 'gap-6' : 'gap-3';
  const showAnimation = size === 'large';
  
  return (
    <div className={`flex items-center ${gap} ${className}`}>
      <div className={showAnimation ? 'logo-core-rotate' : ''}>
        <svg 
          width={diamondSize} 
          height={diamondSize} 
          viewBox="0 0 100 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-foreground"
        >
          <defs>
            {/* Subtle internal energy flow - ultra slow cycle */}
            <linearGradient id="energyFlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.1">
                <animate attributeName="stop-opacity" values="0.1;0.25;0.1" dur="75s" repeatCount="indefinite" />
              </stop>
              <stop offset="50%" stopColor="currentColor" stopOpacity="0.3">
                <animate attributeName="stop-opacity" values="0.3;0.5;0.3" dur="75s" repeatCount="indefinite" />
                <animate attributeName="offset" values="0.3;0.7;0.3" dur="75s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.1">
                <animate attributeName="stop-opacity" values="0.1;0.25;0.1" dur="75s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
          </defs>
          
          {/* Elongated asymmetric diamond - precision geometry */}
          {/* Wide side angles, tighter top/bottom angles */}
          <path 
            d="M50 15 L85 60 L50 105 L15 60 Z" 
            stroke="url(#energyFlow)" 
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinejoin="miter"
            strokeLinecap="square"
            opacity="0.6"
          />
          
          {/* Single thin outline - crystalline precision */}
          <path 
            d="M50 15 L85 60 L50 105 L15 60 Z" 
            stroke="currentColor" 
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinejoin="miter"
            strokeLinecap="square"
            opacity="0.9"
          />
        </svg>
      </div>
      <span className={`${textSize} font-extralight tracking-[0.15em] text-foreground ${showAnimation ? 'logo-text-shimmer' : ''}`}>
        VALORA
      </span>
    </div>
  );
};
