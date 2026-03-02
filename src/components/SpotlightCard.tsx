import { ReactNode } from 'react';
import { useCursorSpotlight } from '@/hooks/use-cursor-spotlight';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  glowOnHover?: boolean;
}

export const SpotlightCard = ({ children, className = '', glowOnHover = true }: SpotlightCardProps) => {
  const { ref, spotlightStyle } = useCursorSpotlight();

  return (
    <div
      ref={ref}
      className={`group relative rounded-[20px] overflow-hidden transition-all duration-500 ease-out hover:-translate-y-[2px] ${className}`}
      style={{
        background: `linear-gradient(
          165deg,
          hsl(0 0% 100% / 0.05) 0%,
          hsl(0 0% 100% / 0.02) 40%,
          hsl(0 0% 100% / 0.035) 100%
        )`,
        border: '1px solid hsl(0 0% 100% / 0.08)',
        backdropFilter: 'blur(40px) saturate(1.2)',
        WebkitBackdropFilter: 'blur(40px) saturate(1.2)',
        boxShadow: `
          inset 0 1px 0 0 hsl(0 0% 100% / 0.06),
          inset 0 -1px 0 0 hsl(0 0% 0% / 0.15),
          inset 0 0 0 0.5px hsl(0 0% 100% / 0.03),
          0 0 0 0.5px hsl(0 0% 0% / 0.25),
          0 10px 50px -12px hsl(0 0% 0% / 0.6),
          0 4px 16px -6px hsl(0 0% 0% / 0.35)
        `,
      }}
    >
      {/* Cursor spotlight */}
      <div style={spotlightStyle} />
      
      {/* Specular highlight — top edge refraction line (brighter) */}
      <div
        className="absolute top-0 left-[6%] right-[6%] h-[0.5px] pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.15), hsl(0 0% 100% / 0.25), hsl(0 0% 100% / 0.15), transparent)',
        }}
      />

      {/* Secondary specular — wider, softer */}
      <div
        className="absolute top-[0.5px] left-[3%] right-[3%] h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.05), hsl(0 0% 100% / 0.08), hsl(0 0% 100% / 0.05), transparent)',
        }}
      />

      {/* Inner top gradient — glass thickness feel */}
      <div
        className="absolute top-0 left-0 right-0 h-28 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, hsl(0 0% 100% / 0.04) 0%, transparent 100%)',
        }}
      />

      {/* Hover glow — ambient teal from top */}
      {glowOnHover && (
        <div
          className="absolute inset-0 rounded-[20px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, hsl(172 50% 50% / 0.06) 0%, transparent 55%)',
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
