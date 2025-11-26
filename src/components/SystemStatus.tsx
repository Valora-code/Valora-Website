import { useEffect, useRef, useState } from 'react';
interface StatusIndicatorProps {
  label: string;
  delay: number;
}
const StatusIndicator = ({
  label,
  delay
}: StatusIndicatorProps) => {
  const [isActive, setIsActive] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setIsActive(true), delay);
      }
    }, {
      threshold: 0.5
    });
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => observer.disconnect();
  }, [delay]);
  return <div ref={elementRef} className="flex items-center gap-6 py-7 border-b border-border/20 diagnostic-row group">
      {/* Machine status indicator with faint pulse */}
      <div className="relative flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full transition-all duration-1000 ${isActive ? 'bg-foreground shadow-[0_0_8px_rgba(255,255,255,0.4)] machine-pulse' : 'bg-border/50'}`} />
      </div>
      
      {/* Fault state label */}
      <span className={`text-lg font-light tracking-wide transition-all duration-1000 ${isActive ? 'text-foreground' : 'text-secondary/60'}`}>
        {label}
      </span>
    </div>;
};
export const SystemStatus = () => {
  return <section className="py-32 px-6 border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-elevated to-background opacity-50" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-4">
          <div className="inline-block px-4 py-1 rounded-full border border-border/30 mb-6">
            
          </div>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-extralight tracking-tight text-center mb-20">Ekonomin är manuell. Människan är flaskhalsen.</h2>
        
        <div className="max-w-2xl mx-auto liquid-glass p-8 rounded-xl">
          <StatusIndicator label="Manuell jämförelse mellan aktörer" delay={200} />
          <StatusIndicator label="Prokrastinering vid varje livsbeslut" delay={600} />
          <StatusIndicator label="Kognitiv överbelastning vid komplex ekonomi" delay={1000} />
        </div>
      </div>
    </section>;
};