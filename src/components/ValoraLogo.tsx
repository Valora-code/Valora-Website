interface ValoraLogoProps {
  size?: 'small' | 'large';
  className?: string;
}

export const ValoraLogo = ({ size = 'small', className = '' }: ValoraLogoProps) => {
  const dimension = size === 'large' ? 120 : 32;
  const strokeWidth = size === 'large' ? 0.5 : 1;
  const textSize = size === 'large' ? 'text-4xl' : 'text-lg';
  
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <svg 
        width={dimension} 
        height={dimension} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="text-foreground"
      >
        {/* Geometric diamond/star outline */}
        <path 
          d="M50 5 L75 35 L95 50 L75 65 L50 95 L25 65 L5 50 L25 35 Z" 
          stroke="currentColor" 
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinejoin="miter"
          strokeLinecap="square"
        />
        <path 
          d="M50 20 L65 40 L80 50 L65 60 L50 80 L35 60 L20 50 L35 40 Z" 
          stroke="currentColor" 
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinejoin="miter"
          strokeLinecap="square"
        />
        <circle 
          cx="50" 
          cy="50" 
          r="3" 
          fill="currentColor"
        />
      </svg>
      <span className={`${textSize} font-extralight tracking-[0.2em] text-foreground`}>
        VALORA
      </span>
    </div>
  );
};
