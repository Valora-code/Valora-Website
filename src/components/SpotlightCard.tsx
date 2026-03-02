import { ReactNode } from 'react';
import { useCursorSpotlight } from '@/hooks/use-cursor-spotlight';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'large';
}

export const SpotlightCard = ({ children, className = '', variant = 'default' }: SpotlightCardProps) => {
  const { ref, spotlightStyle } = useCursorSpotlight();

  return (
    <div
      ref={ref}
      className={`group relative rounded-2xl overflow-hidden transition-all duration-500 ease-out hover:-translate-y-1 ${className}`}
      style={{
        background: 'linear-gradient(145deg, hsl(220 14% 10% / 0.8), hsl(220 14% 7% / 0.6))',
        border: '1px solid hsl(0 0% 100% / 0.06)',
        backdropFilter: 'blur(24px)',
      }}
    >
      {/* Cursor spotlight */}
      <div style={spotlightStyle} />
      
      {/* Top edge highlight */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 10%, hsl(0 0% 100% / 0.08) 50%, transparent 90%)' }}
      />

      {/* Refraction edge glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: 'linear-gradient(135deg, hsl(172 60% 55% / 0.04) 0%, transparent 30%, transparent 70%, hsl(200 60% 55% / 0.03) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
