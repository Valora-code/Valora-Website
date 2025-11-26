import { ReactNode } from 'react';
import { useParallax } from '@/hooks/use-parallax';

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  direction?: 'up' | 'down';
  className?: string;
}

export const ParallaxSection = ({ 
  children, 
  speed = 0.2, 
  direction = 'up',
  className = '' 
}: ParallaxSectionProps) => {
  const parallaxStyle = useParallax({ speed, direction });

  return (
    <div className={className} style={parallaxStyle}>
      {children}
    </div>
  );
};
