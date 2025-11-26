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
      <div className={showAnimation ? 'rotate-slow' : ''}>
        <svg 
          width={diamondSize} 
          height={diamondSize} 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-foreground"
          style={showAnimation ? { filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.15))' } : {}}
        >
          {/* Precise geometric diamond - 45° symmetry */}
          <path 
            d="M50 10 L90 50 L50 90 L10 50 Z" 
            stroke="currentColor" 
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinejoin="miter"
            strokeLinecap="square"
          />
          <path 
            d="M50 25 L75 50 L50 75 L25 50 Z" 
            stroke="currentColor" 
            strokeWidth={strokeWidth * 0.7}
            fill="none"
            strokeLinejoin="miter"
            strokeLinecap="square"
            opacity="0.5"
          />
        </svg>
      </div>
      <span className={`${textSize} font-extralight tracking-[0.15em] text-foreground`}>
        VALORA
      </span>
    </div>
  );
};
