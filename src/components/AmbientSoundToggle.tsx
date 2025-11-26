import { Volume2, VolumeX } from 'lucide-react';
import { useAmbientAudio } from '@/hooks/use-ambient-audio';

export const AmbientSoundToggle = () => {
  const { isEnabled, toggle } = useAmbientAudio();

  return (
    <button
      onClick={toggle}
      className="relative group p-2 rounded-lg border border-border/30 bg-background/40 backdrop-blur-sm hover:bg-background/60 hover:border-border/50 transition-all duration-300"
      aria-label={isEnabled ? 'Disable ambient audio' : 'Enable ambient audio'}
      title={isEnabled ? 'System audio: ON' : 'System audio: OFF'}
    >
      {isEnabled ? (
        <Volume2 
          size={16} 
          className="text-foreground transition-colors" 
          strokeWidth={1.5}
        />
      ) : (
        <VolumeX 
          size={16} 
          className="text-secondary transition-colors" 
          strokeWidth={1.5}
        />
      )}
      
      {/* Active indicator */}
      {isEnabled && (
        <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-foreground machine-pulse" />
      )}
    </button>
  );
};
