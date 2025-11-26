import { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    let trailId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Add trail point
      const newPoint = { x: e.clientX, y: e.clientY, id: trailId++ };
      setTrail((prev) => [...prev.slice(-8), newPoint]);

      // Check if hovering over interactive element
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.classList.contains('interactive-element') ||
        target.classList.contains('magnetic-button') ||
        target.closest('button') !== null ||
        target.closest('a') !== null;
      
      setIsPointer(isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Trail effects */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed pointer-events-none z-[9999] rounded-full mix-blend-screen"
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            width: `${12 - index}px`,
            height: `${12 - index}px`,
            backgroundColor: `hsl(var(--foreground) / ${(index + 1) * 0.08})`,
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.1s ease-out',
          }}
        />
      ))}
      
      {/* Main cursor */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full border transition-all duration-200 ease-out mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isPointer ? '40px' : '20px',
          height: isPointer ? '40px' : '20px',
          borderColor: 'hsl(var(--foreground))',
          borderWidth: '1px',
          transform: 'translate(-50%, -50%)',
          backgroundColor: isPointer ? 'hsl(var(--foreground) / 0.1)' : 'transparent',
        }}
      />
    </>
  );
};
