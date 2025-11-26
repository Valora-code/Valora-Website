interface ValoraLogoProps {
  size?: 'small' | 'large';
  className?: string;
}

export const ValoraLogo = ({ size = 'small', className = '' }: ValoraLogoProps) => {
  const diamondSize = size === 'large' ? 90 : 32;
  const strokeWidth = size === 'large' ? 1.5 : 1.5;
  const textSize = size === 'large' ? 'text-5xl' : 'text-base';
  const gap = size === 'large' ? 'gap-6' : 'gap-3';
  const showAnimation = size === 'large';
  
  return (
    <div className={`flex items-center ${gap} ${className}`}>
      <div className={`relative ${showAnimation ? 'logo-core-rotate' : ''}`}>
        {/* Subtle outer glow */}
        {showAnimation && (
          <div className="absolute inset-0 blur-2xl opacity-20">
            <svg 
              width={diamondSize} 
              height={diamondSize} 
              viewBox="0 0 100 100" 
              fill="none"
            >
              <path 
                d="M50 8 L92 50 L50 92 L8 50 Z" 
                fill="currentColor"
                className="text-foreground"
              />
            </svg>
          </div>
        )}
        
        <svg 
          width={diamondSize} 
          height={diamondSize} 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-foreground relative"
        >
          <defs>
            {/* Refined gradient with subtler energy flow */}
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.6">
                <animate attributeName="stop-opacity" values="0.6;0.9;0.6" dur="8s" repeatCount="indefinite" />
              </stop>
              <stop offset="50%" stopColor="currentColor" stopOpacity="1">
                <animate attributeName="offset" values="0.3;0.7;0.3" dur="8s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.6">
                <animate attributeName="stop-opacity" values="0.6;0.9;0.6" dur="8s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
            
            {/* Premium shimmer effect */}
            <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
              <stop offset="50%" stopColor="currentColor" stopOpacity="0.4">
                <animate attributeName="offset" values="0;1;0" dur="6s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          
          {/* Elegant elongated diamond with refined proportions */}
          {/* Primary shape - premium stroke */}
          <path 
            d="M50 8 L92 50 L50 92 L8 50 Z" 
            stroke="url(#logoGradient)" 
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinejoin="miter"
            strokeLinecap="square"
            vectorEffect="non-scaling-stroke"
          />
          
          {/* Shimmer overlay for premium feel */}
          <path 
            d="M50 8 L92 50 L50 92 L8 50 Z" 
            stroke="url(#shimmer)" 
            strokeWidth={strokeWidth * 0.5}
            fill="none"
            strokeLinejoin="miter"
            strokeLinecap="square"
            vectorEffect="non-scaling-stroke"
            opacity="0.8"
          />
          
          {/* Inner subtle accent lines for depth */}
          <path 
            d="M50 15 L85 50 L50 85 L15 50 Z" 
            stroke="currentColor" 
            strokeWidth={strokeWidth * 0.3}
            fill="none"
            strokeLinejoin="miter"
            opacity="0.2"
          />
        </svg>
      </div>
      <span className={`${textSize} font-extralight tracking-[0.2em] text-foreground ${showAnimation ? 'logo-text-shimmer' : ''}`}>
        VALORA
      </span>
    </div>
  );
};
