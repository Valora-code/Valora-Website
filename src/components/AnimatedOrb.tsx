const AnimatedOrb = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Primary orb - emerald/teal */}
      <div
        className="absolute top-1/3 left-1/2 w-[600px] h-[600px] rounded-full animated-orb"
        style={{
          background: 'radial-gradient(circle, hsl(335 100% 83% / 0.15) 0%, hsl(335 100% 83% / 0.05) 40%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Secondary orb - subtle blue shift */}
      <div
        className="absolute top-2/3 left-1/3 w-[500px] h-[500px] rounded-full animated-orb-slow"
        style={{
          background: 'radial-gradient(circle, hsl(200 40% 35% / 0.1) 0%, hsl(200 40% 35% / 0.03) 50%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          animationDelay: '-3s',
        }}
      />

      {/* Tertiary orb - warm accent */}
      <div
        className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full animated-orb"
        style={{
          background: 'radial-gradient(circle, hsl(160 35% 40% / 0.08) 0%, transparent 60%)',
          transform: 'translate(50%, -50%)',
          animationDelay: '-5s',
        }}
      />

      {/* Bottom glow */}
      <div
        className="absolute bottom-0 left-1/2 w-[800px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(172 50% 45% / 0.06) 0%, transparent 70%)',
          transform: 'translateX(-50%)',
          filter: 'blur(60px)',
        }}
      />
    </div>
  );
};

export default AnimatedOrb;
