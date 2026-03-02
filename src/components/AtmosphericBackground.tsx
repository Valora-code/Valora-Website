/**
 * 5-layer atmospheric background with bloom and drift:
 * 1. Base vignette (heavy dark edges, near-black)
 * 2. Atmospheric haze (depth fog, multiple layers)
 * 3. Radial glows with bloom (teal, asymmetric, slow drift)
 * 4. Noise/grain overlay
 * 5. Micro dust particles
 */
export const AtmosphericBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* Layer 1 — Deep vignette: heavy dark edges, near-black */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 65% 50% at 50% 38%, 
              transparent 0%, 
              hsl(222 22% 5% / 0.3) 40%, 
              hsl(222 24% 3% / 0.7) 65%, 
              hsl(222 28% 2%) 85%,
              hsl(222 30% 1%) 100%)
          `,
        }}
      />
      {/* Corner vignettes for extra depth */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 80% at 0% 0%, hsl(222 28% 2% / 0.6) 0%, transparent 50%),
            radial-gradient(ellipse 80% 80% at 100% 100%, hsl(222 28% 2% / 0.6) 0%, transparent 50%)
          `,
        }}
      />

      {/* Layer 2 — Atmospheric haze: depth fog (multiple sub-layers) */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 50% 30% at 45% 25%, 
              hsl(200 12% 18% / 0.05) 0%, 
              transparent 65%),
            radial-gradient(ellipse 35% 25% at 65% 65%, 
              hsl(172 12% 14% / 0.03) 0%, 
              transparent 55%),
            radial-gradient(ellipse 60% 20% at 50% 85%, 
              hsl(200 10% 12% / 0.04) 0%, 
              transparent 60%)
          `,
        }}
      />

      {/* Layer 3a — Primary teal glow (top-right, asymmetric) */}
      <div
        className="absolute ambient-glow"
        style={{
          width: '900px',
          height: '900px',
          top: '-12%',
          right: '-15%',
          background: 'radial-gradient(circle, hsl(172 42% 38% / 0.12) 0%, hsl(172 42% 38% / 0.05) 25%, transparent 60%)',
          filter: 'blur(80px)',
          borderRadius: '50%',
        }}
      />
      {/* Bloom for 3a — wider, softer */}
      <div
        className="absolute ambient-glow"
        style={{
          width: '1500px',
          height: '1500px',
          top: '-25%',
          right: '-28%',
          background: 'radial-gradient(circle, hsl(172 45% 42% / 0.05) 0%, hsl(172 45% 42% / 0.02) 30%, transparent 50%)',
          filter: 'blur(200px)',
          borderRadius: '50%',
        }}
      />

      {/* Layer 3b — Secondary glow (left-center) */}
      <div
        className="absolute ambient-glow-alt"
        style={{
          width: '750px',
          height: '750px',
          top: '40%',
          left: '-12%',
          background: 'radial-gradient(circle, hsl(172 38% 36% / 0.09) 0%, hsl(172 38% 36% / 0.03) 30%, transparent 55%)',
          filter: 'blur(100px)',
          borderRadius: '50%',
        }}
      />
      {/* Bloom for 3b */}
      <div
        className="absolute ambient-glow-alt"
        style={{
          width: '1300px',
          height: '1300px',
          top: '32%',
          left: '-25%',
          background: 'radial-gradient(circle, hsl(172 40% 40% / 0.035) 0%, transparent 45%)',
          filter: 'blur(180px)',
          borderRadius: '50%',
        }}
      />

      {/* Layer 3c — Bottom-center glow */}
      <div
        className="absolute ambient-glow-slow"
        style={{
          width: '800px',
          height: '600px',
          bottom: '-5%',
          left: '20%',
          background: 'radial-gradient(ellipse, hsl(172 48% 40% / 0.07) 0%, hsl(172 48% 40% / 0.02) 30%, transparent 55%)',
          filter: 'blur(120px)',
          borderRadius: '50%',
        }}
      />
      {/* Bloom for 3c */}
      <div
        className="absolute ambient-glow-slow"
        style={{
          width: '1200px',
          height: '900px',
          bottom: '-15%',
          left: '10%',
          background: 'radial-gradient(ellipse, hsl(172 45% 42% / 0.03) 0%, transparent 45%)',
          filter: 'blur(160px)',
          borderRadius: '50%',
        }}
      />

      {/* Layer 4 — Fine noise/grain overlay */}
      <div className="noise-overlay" />

      {/* Layer 5 — Micro dust (subtle dot pattern) */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(0 0% 100%) 0.3px, transparent 0.3px)`,
          backgroundSize: '48px 48px',
        }}
      />
    </div>
  );
};
