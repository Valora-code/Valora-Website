import { ReactNode } from 'react';
import { useCursorSpotlight } from '@/hooks/use-cursor-spotlight';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
}

export const SpotlightCard = ({ children, className = '' }: SpotlightCardProps) => {
  const { ref, spotlightStyle } = useCursorSpotlight();

  return (
    <div
      ref={ref}
      className={`group relative rounded-[20px] overflow-hidden transition-all duration-500 ease-out hover:-translate-y-0.5 ${className}`}
      style={{
        background: 'linear-gradient(160deg, hsl(0 0% 100% / 0.035), hsl(0 0% 100% / 0.015))',
        border: '1px solid hsl(0 0% 100% / 0.05)',
        backdropFilter: 'blur(30px)',
        boxShadow: 'inset 0 1px 0 0 hsl(0 0% 100% / 0.04), inset 0 -1px 0 0 hsl(0 0% 0% / 0.08), 0 8px 40px -12px hsl(0 0% 0% / 0.4)',
      }}
    >
      {/* Cursor spotlight */}
      <div style={spotlightStyle} />
      
      {/* Top edge highlight — subtle refraction line */}
      <div
        className="absolute top-0 left-[10%] right-[10%] h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.08), transparent)' }}
      />

      {/* Subtle hover glow */}
      <div
        className="absolute inset-0 rounded-[20px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, hsl(172 45% 50% / 0.03) 0%, transparent 60%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
