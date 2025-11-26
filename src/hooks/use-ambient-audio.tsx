import { useEffect, useRef, useState } from 'react';

export const useAmbientAudio = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const noiseGainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    if (isEnabled) {
      startAmbientAudio();
    } else {
      stopAmbientAudio();
    }

    return () => {
      stopAmbientAudio();
    };
  }, [isEnabled]);

  const createNoiseBuffer = (context: AudioContext): AudioBuffer => {
    const bufferSize = context.sampleRate * 2;
    const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    return buffer;
  };

  const startAmbientAudio = () => {
    try {
      // Create audio context
      audioContextRef.current = new AudioContext();
      const context = audioContextRef.current;

      // === ULTRA-LOW FREQUENCY MACHINE HUM ===
      // Create oscillator for deep machine hum (45Hz - barely audible frequency)
      oscillatorRef.current = context.createOscillator();
      oscillatorRef.current.type = 'sine';
      oscillatorRef.current.frequency.setValueAtTime(45, context.currentTime);

      // Subtle frequency modulation for organic feel
      const lfoOscillator = context.createOscillator();
      lfoOscillator.type = 'sine';
      lfoOscillator.frequency.setValueAtTime(0.08, context.currentTime); // Very slow modulation
      
      const lfoGain = context.createGain();
      lfoGain.gain.setValueAtTime(2, context.currentTime); // ±2Hz variation
      
      lfoOscillator.connect(lfoGain);
      lfoGain.connect(oscillatorRef.current.frequency);
      lfoOscillator.start();

      // Gain for oscillator - ultra subtle
      gainNodeRef.current = context.createGain();
      gainNodeRef.current.gain.setValueAtTime(0.015, context.currentTime); // Very low volume

      oscillatorRef.current.connect(gainNodeRef.current);
      oscillatorRef.current.start();

      // === SUBTLE PROCESSING SOUNDS (filtered white noise) ===
      const noiseBuffer = createNoiseBuffer(context);
      noiseSourceRef.current = context.createBufferSource();
      noiseSourceRef.current.buffer = noiseBuffer;
      noiseSourceRef.current.loop = true;

      // Create bandpass filter for "system processing" feel
      const filter = context.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2000, context.currentTime); // Mid-high frequency
      filter.Q.setValueAtTime(2, context.currentTime);

      // Slow filter frequency modulation
      const filterLfo = context.createOscillator();
      filterLfo.type = 'sine';
      filterLfo.frequency.setValueAtTime(0.15, context.currentTime);
      
      const filterLfoGain = context.createGain();
      filterLfoGain.gain.setValueAtTime(400, context.currentTime); // ±400Hz variation
      
      filterLfo.connect(filterLfoGain);
      filterLfoGain.connect(filter.frequency);
      filterLfo.start();

      // Gain for noise - extremely subtle
      noiseGainRef.current = context.createGain();
      noiseGainRef.current.gain.setValueAtTime(0.008, context.currentTime); // Very quiet

      noiseSourceRef.current.connect(filter);
      filter.connect(noiseGainRef.current);
      noiseSourceRef.current.start();

      // === MASTER OUTPUT ===
      // Connect both to destination
      gainNodeRef.current.connect(context.destination);
      noiseGainRef.current.connect(context.destination);

      console.log('🔊 Ambient audio system initialized');
    } catch (error) {
      console.error('Error starting ambient audio:', error);
    }
  };

  const stopAmbientAudio = () => {
    try {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
        oscillatorRef.current = null;
      }

      if (noiseSourceRef.current) {
        noiseSourceRef.current.stop();
        noiseSourceRef.current.disconnect();
        noiseSourceRef.current = null;
      }

      if (gainNodeRef.current) {
        gainNodeRef.current.disconnect();
        gainNodeRef.current = null;
      }

      if (noiseGainRef.current) {
        noiseGainRef.current.disconnect();
        noiseGainRef.current = null;
      }

      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }

      console.log('🔇 Ambient audio system stopped');
    } catch (error) {
      console.error('Error stopping ambient audio:', error);
    }
  };

  const toggle = () => {
    setIsEnabled(!isEnabled);
  };

  return {
    isEnabled,
    toggle,
  };
};
