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
      className={`group relative rounded-2xl overflow-hidden transition-all duration-500 ease-out hover:-translate-y-[2px] ${className}`}
      style={{
        background: `linear-gradient(
          165deg,
          hsl(0 0% 100% / ${isElevated ? '0.055' : '0.035'}) 0%,
          hsl(0 0% 100% / 0.015) 40%,
          hsl(0 0% 100% / 0.025) 100%
        )`,
        border: '1px solid hsl(0 0% 100% / 0.06)',
        backdropFilter: 'blur(40px) saturate(1.2)',
        WebkitBackdropFilter: 'blur(40px) saturate(1.2)',
        boxShadow: `
          inset 0 1px 0 0 hsl(0 0% 100% / 0.05),
          inset 0 -1px 0 0 hsl(0 0% 0% / 0.15),
          0 0 0 0.5px hsl(0 0% 0% / 0.25),
          0 4px 16px -4px hsl(0 0% 0% / 0.35),
          0 16px 48px -12px hsl(0 0% 0% / 0.25)
        `,
      }}
    >
      {/* Cursor spotlight */}
      <div style={spotlightStyle} />

      {/* Specular highlight — top edge */}
      <div
        className="absolute top-0 left-[8%] right-[8%] h-[1px] pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, hsl(0 0% 100% / 0.1) 25%, hsl(0 0% 100% / 0.18) 50%, hsl(0 0% 100% / 0.1) 75%, transparent 100%)',
        }}
      />

      {/* Inner top gradient — glass depth */}
      <div
        className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, hsl(0 0% 100% / 0.03) 0%, transparent 100%)',
        }}
      />

      {/* Hover ambient glow */}
      {glowOnHover && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'radial-gradient(ellipse at 50% -15%, hsl(172 45% 45% / 0.06) 0%, transparent 55%)',
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
