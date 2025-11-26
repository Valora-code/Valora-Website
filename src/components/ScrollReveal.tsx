import { ReactNode } from 'react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const ScrollReveal = ({ children, delay = 0, className = '' }: ScrollRevealProps) => {
  const { elementRef, isVisible } = useScrollReveal({ delay });

  return (
    <div
      ref={elementRef}
      className={`${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'
      } ${className}`}
      style={{
        transition: 'all 1s cubic-bezier(0.23, 1, 0.32, 1)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};
