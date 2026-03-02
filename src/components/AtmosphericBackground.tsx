/**
 * 5-layer atmospheric background stack with bloom:
 * 1. Base vignette (dark edges, lighter center)
 * 2. Atmospheric haze (depth fog)
 * 3. Radial glows with bloom (teal, slow drift)
 * 4. Noise/grain overlay
 * 5. Micro dust particles
 */
export const AtmosphericBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* Layer 1 — Deep vignette: heavy dark edges */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 50% 40%, 
              transparent 0%, 
              hsl(222 22% 5% / 0.4) 50%, 
              hsl(222 24% 3% / 0.85) 75%, 
              hsl(222 26% 2%) 100%)
          `,
        }}
      />

      {/* Layer 2 — Atmospheric haze: depth fog in center */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 55% 35% at 50% 30%, 
              hsl(200 12% 18% / 0.06) 0%, 
              transparent 70%),
            radial-gradient(ellipse 40% 30% at 60% 70%, 
              hsl(172 15% 15% / 0.03) 0%, 
              transparent 60%)
          `,
        }}
      />

      {/* Layer 3a — Primary teal glow (top-right) with bloom */}
      <div
        className="absolute ambient-glow"
        style={{
          width: '1000px',
          height: '1000px',
          top: '-15%',
          right: '-18%',
          background: 'radial-gradient(circle, hsl(172 42% 40% / 0.1) 0%, hsl(172 42% 40% / 0.04) 30%, transparent 65%)',
          filter: 'blur(100px)',
          borderRadius: '50%',
        }}
      />
      {/* Bloom layer for 3a */}
      <div
        className="absolute ambient-glow"
        style={{
          width: '1400px',
          height: '1400px',
          top: '-25%',
          right: '-25%',
          background: 'radial-gradient(circle, hsl(172 45% 45% / 0.04) 0%, transparent 50%)',
          filter: 'blur(180px)',
          borderRadius: '50%',
        }}
      />

      {/* Layer 3b — Secondary glow (left-center) with bloom */}
      <div
        className="absolute ambient-glow-alt"
        style={{
          width: '800px',
          height: '800px',
          top: '35%',
          left: '-15%',
          background: 'radial-gradient(circle, hsl(172 38% 38% / 0.08) 0%, transparent 60%)',
          filter: 'blur(120px)',
          borderRadius: '50%',
        }}
      />
      {/* Bloom layer for 3b */}
      <div
        className="absolute ambient-glow-alt"
        style={{
          width: '1200px',
          height: '1200px',
          top: '30%',
          left: '-22%',
          background: 'radial-gradient(circle, hsl(172 40% 42% / 0.03) 0%, transparent 50%)',
          filter: 'blur(160px)',
          borderRadius: '50%',
        }}
      />

      {/* Layer 3c — Deep glow (bottom-center) */}
      <div
        className="absolute ambient-glow-slow"
        style={{
          width: '700px',
          height: '700px',
          bottom: '-8%',
          left: '25%',
          background: 'radial-gradient(circle, hsl(172 48% 42% / 0.06) 0%, transparent 55%)',
          filter: 'blur(110px)',
          borderRadius: '50%',
        }}
      />

      {/* Layer 4 — Fine noise/grain overlay */}
      <div className="noise-overlay" />

      {/* Layer 5 — Micro dust (subtle dot pattern for depth) */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(0 0% 100%) 0.4px, transparent 0.4px)`,
          backgroundSize: '52px 52px',
        }}
      />
    </div>
  );
};
