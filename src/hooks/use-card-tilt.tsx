import { useRef, useState, useEffect } from 'react';

interface TiltOptions {
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
}

export const useCardTilt = (options: TiltOptions = {}) => {
  const {
    maxTilt = 5,
    perspective = 1000,
    scale = 1.02,
    speed = 400,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState({});
  const [glowStyle, setGlowStyle] = useState({});

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      setTiltStyle({
        transform: `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
        transition: `transform ${speed}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      });

      // Calculate glow position (as percentage)
      const glowX = (x / rect.width) * 100;
      const glowY = (y / rect.height) * 100;

      setGlowStyle({
        background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)`,
        opacity: 1,
      });
    };

    const handleMouseLeave = () => {
      setTiltStyle({
        transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`,
        transition: `transform ${speed}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      });
      setGlowStyle({
        opacity: 0,
        transition: `opacity ${speed}ms ease-out`,
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxTilt, perspective, scale, speed]);

  return { ref, tiltStyle, glowStyle };
};
