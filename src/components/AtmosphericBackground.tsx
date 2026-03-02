/**
 * 5-layer atmospheric background stack:
 * 1. Base vignette (dark edges)
 * 2. Atmospheric haze (center fog)
 * 3. Radial glows (teal, slow drift)
 * 4. Noise/grain overlay
 * 5. Micro dust particles (CSS only)
 */
export const AtmosphericBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* Layer 1 — Base vignette: darker edges, lighter center */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 40%, 
              hsl(220 18% 7% / 0) 0%, 
              hsl(220 20% 4% / 0.6) 70%, 
              hsl(220 22% 3% / 0.9) 100%)
          `,
        }}
      />

      {/* Layer 2 — Atmospheric haze: soft central fog */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 50% 35%, 
              hsl(200 15% 20% / 0.04) 0%, 
              transparent 70%)
          `,
        }}
      />

      {/* Layer 3a — Primary teal glow (top-right) */}
      <div
        className="absolute w-[900px] h-[900px] rounded-full ambient-glow"
        style={{
          top: '-10%',
          right: '-15%',
          background: 'radial-gradient(circle, hsl(172 40% 38% / 0.07) 0%, hsl(172 40% 38% / 0.02) 40%, transparent 70%)',
          filter: 'blur(120px)',
        }}
      />

      {/* Layer 3b — Secondary glow (left-center) */}
      <div
        className="absolute w-[700px] h-[700px] rounded-full ambient-glow-alt"
        style={{
          top: '40%',
          left: '-12%',
          background: 'radial-gradient(circle, hsl(172 35% 35% / 0.05) 0%, transparent 65%)',
          filter: 'blur(140px)',
        }}
      />

      {/* Layer 3c — Deep glow (bottom-center) */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full ambient-glow-slow"
        style={{
          bottom: '-5%',
          left: '30%',
          background: 'radial-gradient(circle, hsl(172 45% 40% / 0.04) 0%, transparent 60%)',
          filter: 'blur(130px)',
        }}
      />

      {/* Layer 4 — Fine noise/grain overlay */}
      <div className="noise-overlay" />

      {/* Layer 5 — Micro dust (subtle dot pattern for depth) */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(0 0% 100%) 0.5px, transparent 0.5px)`,
          backgroundSize: '48px 48px',
        }}
      />
    </div>
  );
};
