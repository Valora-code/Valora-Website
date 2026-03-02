import { useRef, useState, useCallback, useEffect } from 'react';

interface SpotlightState {
  x: number;
  y: number;
  opacity: number;
}

export const useCursorSpotlight = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState<SpotlightState>({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlight({ x, y, opacity: 1 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setSpotlight(prev => ({ ...prev, opacity: 0 }));
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  const spotlightStyle: React.CSSProperties = {
    background: `radial-gradient(600px circle at ${spotlight.x}% ${spotlight.y}%, hsl(172 50% 45% / 0.07), transparent 40%)`,
    opacity: spotlight.opacity,
    transition: 'opacity 0.4s ease',
    position: 'absolute' as const,
    inset: 0,
    pointerEvents: 'none' as const,
    borderRadius: 'inherit',
    zIndex: 1,
  };

  return { ref, spotlightStyle };
};
