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
      className={`group relative rounded-[20px] overflow-hidden transition-all duration-500 ease-out hover:-translate-y-[2px] ${className}`}
      style={{
        background: `linear-gradient(
          165deg,
          hsl(0 0% 100% / 0.04) 0%,
          hsl(0 0% 100% / 0.015) 40%,
          hsl(0 0% 100% / 0.025) 100%
        )`,
        border: '1px solid hsl(0 0% 100% / 0.07)',
        backdropFilter: 'blur(40px) saturate(1.15)',
        WebkitBackdropFilter: 'blur(40px) saturate(1.15)',
        boxShadow: `
          inset 0 1px 0 0 hsl(0 0% 100% / 0.05),
          inset 0 -1px 0 0 hsl(0 0% 0% / 0.12),
          0 0 0 0.5px hsl(0 0% 0% / 0.2),
          0 8px 40px -12px hsl(0 0% 0% / 0.5),
          0 2px 12px -4px hsl(0 0% 0% / 0.3)
        `,
      }}
    >
      {/* Cursor spotlight */}
      <div style={spotlightStyle} />
      
      {/* Specular highlight — top edge refraction line */}
      <div
        className="absolute top-0 left-[8%] right-[8%] h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.1), hsl(0 0% 100% / 0.06), transparent)',
        }}
      />

      {/* Inner top gradient — glass thickness feel */}
      <div
        className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, hsl(0 0% 100% / 0.03) 0%, transparent 100%)',
        }}
      />

      {/* Hover glow — very controlled ambient */}
      <div
        className="absolute inset-0 rounded-[20px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, hsl(172 45% 50% / 0.04) 0%, transparent 55%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
