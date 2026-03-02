import { ReactNode } from 'react';
import { useCursorSpotlight } from '@/hooks/use-cursor-spotlight';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  glowOnHover?: boolean;
  variant?: 'default' | 'elevated';
}

export const SpotlightCard = ({ children, className = '', glowOnHover = true, variant = 'default' }: SpotlightCardProps) => {
  const { ref, spotlightStyle } = useCursorSpotlight();

  const isElevated = variant === 'elevated';

  return (
    <div
      ref={ref}
      className={`group relative rounded-[20px] overflow-hidden transition-all duration-500 ease-out hover:-translate-y-[3px] ${className}`}
      style={{
        background: `linear-gradient(
          168deg,
          hsl(0 0% 100% / ${isElevated ? '0.07' : '0.05'}) 0%,
          hsl(0 0% 100% / 0.02) 35%,
          hsl(0 0% 100% / 0.01) 60%,
          hsl(0 0% 100% / ${isElevated ? '0.04' : '0.03'}) 100%
        )`,
        border: '1px solid hsl(0 0% 100% / 0.08)',
        backdropFilter: 'blur(40px) saturate(1.25)',
        WebkitBackdropFilter: 'blur(40px) saturate(1.25)',
        boxShadow: `
          inset 0 1px 0 0 hsl(0 0% 100% / 0.07),
          inset 0 -1px 0 0 hsl(0 0% 0% / 0.2),
          inset 1px 0 0 0 hsl(0 0% 100% / 0.02),
          inset -1px 0 0 0 hsl(0 0% 100% / 0.02),
          0 0 0 0.5px hsl(0 0% 0% / 0.3),
          0 4px 12px -4px hsl(0 0% 0% / 0.4),
          0 12px 40px -8px hsl(0 0% 0% / 0.5),
          0 24px 80px -16px hsl(0 0% 0% / 0.3)
        `,
      }}
    >
      {/* Cursor spotlight */}
      <div style={spotlightStyle} />

      {/* Specular highlight — primary top-edge refraction */}
      <div
        className="absolute top-0 left-[5%] right-[5%] h-[1px] pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, hsl(0 0% 100% / 0.12) 20%, hsl(0 0% 100% / 0.25) 50%, hsl(0 0% 100% / 0.12) 80%, transparent 100%)',
        }}
      />

      {/* Secondary specular — wider, softer diffuse */}
      <div
        className="absolute top-[1px] left-[2%] right-[2%] h-[1px] pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, hsl(0 0% 100% / 0.04) 25%, hsl(0 0% 100% / 0.08) 50%, hsl(0 0% 100% / 0.04) 75%, transparent 100%)',
        }}
      />

      {/* Inner top gradient — glass thickness / refraction feel */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, hsl(0 0% 100% / 0.045) 0%, hsl(0 0% 100% / 0.01) 40%, transparent 100%)',
        }}
      />

      {/* Bottom inner shadow — glass sits on surface */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{
          background: 'linear-gradient(0deg, hsl(0 0% 0% / 0.15) 0%, transparent 100%)',
        }}
      />

      {/* Hover glow — ambient teal from top */}
      {glowOnHover && (
        <div
          className="absolute inset-0 rounded-[20px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: 'radial-gradient(ellipse at 50% -10%, hsl(172 50% 45% / 0.08) 0%, transparent 50%)',
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
