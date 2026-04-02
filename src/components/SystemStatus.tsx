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
  return <div ref={elementRef} className="flex items-center gap-4 sm:gap-6 py-5 sm:py-6 border-b border-border/20 last:border-0 group">
      <div className="relative flex items-center">
        <div className={`w-2 h-2 rounded-full transition-all duration-1000 ${isActive ? 'bg-primary shadow-[0_0_10px_hsl(335_100%_83%/0.6)] machine-pulse' : 'bg-border/40'}`} />
      </div>
      <span className={`text-sm sm:text-base font-normal leading-relaxed transition-all duration-1000 ${isActive ? 'text-foreground' : 'text-muted-foreground/50'}`}>
        {label}
      </span>
    </div>;
};
export const SystemStatus = () => {
  return <section className="py-20 sm:py-28 lg:py-32 px-6 md:px-12 border-t border-border/40 relative overflow-hidden z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-elevated to-background opacity-50" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs text-primary font-medium tracking-[0.2em] uppercase mb-4">Branschproblem</p>
          <h2 className="headline-section max-w-2xl mx-auto">
            Marknaden är manuell. Belastningen hamnar på individen.
          </h2>
        </div>
        
        <div className="max-w-2xl mx-auto surface-glass rounded-2xl p-6 sm:p-8 border border-border/30">
          <StatusIndicator label="Manuell jämförelse mellan aktörer" delay={200} />
          <StatusIndicator label="Prokrastinering vid varje livsbeslut" delay={600} />
          <StatusIndicator label="Kognitiv överbelastning vid komplex ekonomi" delay={1000} />
        </div>
      </div>
    </section>;
};