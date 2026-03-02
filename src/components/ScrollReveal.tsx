import { ReactNode } from 'react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'left' | 'right' | 'none';
}

export const ScrollReveal = ({ 
  children, 
  delay = 0, 
  className = '',
  direction = 'up'
}: ScrollRevealProps) => {
  const { elementRef, isVisible } = useScrollReveal({ delay });

  const transforms = {
    up: 'translateY(28px)',
    left: 'translateX(-20px)',
    right: 'translateX(20px)',
    none: 'none',
  };

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : transforms[direction],
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};
