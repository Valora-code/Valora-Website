/**
 * Layered atmospheric background — deep graphite with controlled luminous accents.
 * Layers: base → vignette → haze → radial glows with bloom → grain → micro dust
 */
export const AtmosphericBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* Layer 1 — Base + vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 50% 40%, 
              hsl(220 15% 7%) 0%, 
              hsl(220 18% 5% / 0.6) 45%, 
              hsl(220 20% 3%) 75%,
              hsl(220 22% 2%) 100%)
          `,
        }}
      />

      {/* Layer 2 — Atmospheric haze (depth fog) */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 55% 35% at 42% 30%, 
              hsl(200 8% 14% / 0.04) 0%, 
              transparent 60%),
            radial-gradient(ellipse 40% 30% at 60% 65%, 
              hsl(172 8% 12% / 0.03) 0%, 
              transparent 55%)
          `,
        }}
      />

      {/* Layer 3a — Primary glow: top-right, asymmetric */}
      <div
        className="absolute ambient-glow"
        style={{
          width: '800px',
          height: '800px',
          top: '-8%',
          right: '-12%',
          background: 'radial-gradient(circle, hsl(172 38% 38% / 0.09) 0%, hsl(172 38% 38% / 0.03) 30%, transparent 55%)',
          filter: 'blur(80px)',
          borderRadius: '50%',
        }}
      />
      {/* Bloom for 3a */}
      <div
        className="absolute ambient-glow"
        style={{
          width: '1400px',
          height: '1400px',
          top: '-20%',
          right: '-25%',
          background: 'radial-gradient(circle, hsl(172 40% 40% / 0.035) 0%, transparent 45%)',
          filter: 'blur(160px)',
          borderRadius: '50%',
        }}
      />

      {/* Layer 3b — Secondary glow: left-center */}
      <div
        className="absolute ambient-glow-alt"
        style={{
          width: '600px',
          height: '600px',
          top: '45%',
          left: '-8%',
          background: 'radial-gradient(circle, hsl(172 35% 35% / 0.06) 0%, transparent 50%)',
          filter: 'blur(90px)',
          borderRadius: '50%',
        }}
      />

      {/* Layer 3c — Bottom glow */}
      <div
        className="absolute ambient-glow-slow"
        style={{
          width: '700px',
          height: '500px',
          bottom: '-3%',
          left: '25%',
          background: 'radial-gradient(ellipse, hsl(172 40% 38% / 0.05) 0%, transparent 50%)',
          filter: 'blur(100px)',
          borderRadius: '50%',
        }}
      />

      {/* Layer 4 — Fine grain */}
      <div className="noise-overlay" />

      {/* Layer 5 — Micro dust */}
      <div
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(0 0% 100%) 0.3px, transparent 0.3px)`,
          backgroundSize: '52px 52px',
        }}
      />
    </div>
  );
};
