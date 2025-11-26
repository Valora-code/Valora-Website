import { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

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
