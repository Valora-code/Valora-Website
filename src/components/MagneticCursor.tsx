import { useEffect, useRef } from 'react';

export const MagneticCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      // Smooth follow for outer ring
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      cursorX += dx * 0.1;
      cursorY += dy * 0.1;
      
      // Faster follow for inner dot
      const dotDx = mouseX - dotX;
      const dotDy = mouseY - dotY;
      dotX += dotDx * 0.2;
      dotY += dotDy * 0.2;

      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] hidden lg:block"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className="w-full h-full rounded-full border border-foreground/20 backdrop-blur-sm" />
      </div>
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1 h-1 pointer-events-none z-[9999] hidden lg:block"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className="w-full h-full rounded-full bg-foreground/60" />
      </div>
    </>
  );
};
