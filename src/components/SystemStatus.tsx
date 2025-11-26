import { useEffect, useRef, useState } from 'react';

interface StatusIndicatorProps {
  label: string;
  delay: number;
}

const StatusIndicator = ({ label, delay }: StatusIndicatorProps) => {
  const [isActive, setIsActive] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsActive(true), delay);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={elementRef} className="flex items-center gap-4 py-6 border-b border-border/30">
      <div className={`w-3 h-3 rounded-full transition-all duration-700 ${
        isActive 
          ? 'bg-foreground pulse-soft' 
          : 'bg-border'
      }`} />
      <span className={`text-lg font-light tracking-wide transition-colors duration-700 ${
        isActive ? 'text-foreground' : 'text-secondary'
      }`}>
        {label}
      </span>
    </div>
  );
};

export const SystemStatus = () => {
  return (
    <section className="py-32 px-6 border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-elevated to-background opacity-50" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-extralight tracking-tight text-center mb-20">
          Status: Marknaden är manuell. Människan är flaskhalsen.
        </h2>
        
        <div className="max-w-2xl mx-auto">
          <StatusIndicator label="Manuell jämförelse" delay={200} />
          <StatusIndicator label="Prokrastination" delay={600} />
          <StatusIndicator label="Kognitiv överbelastning" delay={1000} />
        </div>
      </div>
    </section>
  );
};
