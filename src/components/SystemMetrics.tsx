import { useScrollProgress } from '@/hooks/use-parallax';
import { Activity, Cpu, Zap, TrendingUp } from 'lucide-react';

interface MetricProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  unit?: string;
}

const Metric = ({ icon, label, value, unit = '%' }: MetricProps) => {
  return (
    <div className="flex items-center gap-3 liquid-glass rounded-lg px-4 py-3">
      <div className="text-foreground/60 flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-secondary tracking-wider uppercase mb-1 font-light">
          {label}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-extralight tracking-tight tabular-nums">
            {Math.round(value)}
          </span>
          <span className="text-xs text-secondary">{unit}</span>
        </div>
        <div className="mt-2 h-1 bg-background-surface rounded-full overflow-hidden">
          <div 
            className="h-full bg-foreground/80 transition-all duration-700 ease-out rounded-full"
            style={{ 
              width: `${Math.min(value, 100)}%`,
              boxShadow: '0 0 8px rgba(255, 255, 255, 0.3)'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export const SystemMetrics = () => {
  const scrollProgress = useScrollProgress();
  
  // Calculate dynamic metrics based on scroll progress
  const marketAnalysis = 45 + (scrollProgress * 50); // 45% to 95%
  const portfolioScan = 30 + (scrollProgress * 65); // 30% to 95%
  const costOptimization = 25 + (scrollProgress * 70); // 25% to 95%
  const systemLoad = 15 + (scrollProgress * 25); // 15% to 40%

  return (
    <div className="fixed bottom-6 left-6 z-50 w-80 space-y-2 animate-fade-in hidden lg:block">
      <div className="liquid-glass rounded-xl p-4 space-y-3 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-foreground animate-pulse" />
            <span className="text-xs font-light tracking-[0.15em] uppercase text-secondary">
              System Active
            </span>
          </div>
          <span className="text-xs text-secondary/60 font-light tabular-nums">
            {new Date().toLocaleTimeString('sv-SE', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>

        <Metric 
          icon={<TrendingUp className="w-4 h-4" />}
          label="Market Analysis"
          value={marketAnalysis}
        />
        
        <Metric 
          icon={<Activity className="w-4 h-4" />}
          label="Portfolio Scan"
          value={portfolioScan}
        />
        
        <Metric 
          icon={<Zap className="w-4 h-4" />}
          label="Cost Optimization"
          value={costOptimization}
        />
        
        <Metric 
          icon={<Cpu className="w-4 h-4" />}
          label="System Load"
          value={systemLoad}
        />

        <div className="pt-2 mt-3 border-t border-border/30 flex items-center justify-between text-xs">
          <span className="text-secondary font-light">Scroll Progress</span>
          <span className="text-foreground font-light tabular-nums">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
};
