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
  maxTilt = 3,
  scale = 1.01 
}: InteractiveCardProps) => {
  const { ref, tiltStyle, glowStyle } = useCardTilt({ maxTilt, scale });

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={tiltStyle}
    >
      {/* Edge glow layer */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={glowStyle}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
