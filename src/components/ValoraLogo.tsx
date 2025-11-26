interface ValoraLogoProps {
  size?: 'small' | 'large';
  className?: string;
}

export const ValoraLogo = ({ size = 'small', className = '' }: ValoraLogoProps) => {
  const diamondSize = size === 'large' ? 80 : 28;
  const strokeWidth = size === 'large' ? 1.5 : 1.5;
  const textSize = size === 'large' ? 'text-5xl' : 'text-base';
  const gap = size === 'large' ? 'gap-6' : 'gap-3';
  
  return (
    <div className={`flex items-center ${gap} ${className}`}>
      <svg 
        width={diamondSize} 
        height={diamondSize} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="text-foreground"
      >
        {/* Simple diamond - rotated square */}
        <path 
          d="M50 10 L90 50 L50 90 L10 50 Z" 
          stroke="currentColor" 
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinejoin="miter"
          strokeLinecap="square"
        />
      </svg>
      <span className={`${textSize} font-extralight tracking-[0.15em] text-foreground`}>
        VALORA
      </span>
    </div>
  );
};
