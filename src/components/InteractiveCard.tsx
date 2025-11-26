import { ReactNode } from 'react';
import { useCardTilt } from '@/hooks/use-card-tilt';

interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
}

export const InteractiveCard = ({ 
  children, 
  className = '', 
  maxTilt = 5,
  scale = 1.03
}: InteractiveCardProps) => {
  const { ref, tiltStyle, glowStyle } = useCardTilt({ maxTilt, scale });

  return (
    <div
      ref={ref}
      className={`relative transition-shadow duration-500 ${className}`}
      style={{
        ...tiltStyle,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Layered shadow for depth */}
      <div 
        className="absolute inset-0 rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10"
        style={{ 
          background: 'hsl(var(--foreground) / 0.2)',
          transform: 'translateZ(-20px)',
        }}
      />
      
      {/* Edge glow layer */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={glowStyle}
      />
      
      {/* Content with subtle lift */}
      <div 
        className="relative z-10"
        style={{ transform: 'translateZ(10px)' }}
      >
        {children}
      </div>
    </div>
  );
};
