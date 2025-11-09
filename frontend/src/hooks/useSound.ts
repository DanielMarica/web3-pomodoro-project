import { useRef, useCallback } from 'react';

export const useSound = () => {
  const workCompleteAudio = useRef<HTMLAudioElement | null>(null);
  const breakCompleteAudio = useRef<HTMLAudioElement | null>(null);
  const tickAudio = useRef<HTMLAudioElement | null>(null);

  // Initialiser les sons
  if (!workCompleteAudio.current) {
    workCompleteAudio.current = new Audio('/sounds/work-complete.mp3');
  }
  if (!breakCompleteAudio.current) {
    breakCompleteAudio.current = new Audio('/sounds/break-complete.mp3');
  }
  if (!tickAudio.current) {
    tickAudio.current = new Audio('/sounds/tick.mp3');
  }

  const playWorkComplete = useCallback(() => {
    workCompleteAudio.current?.play().catch(err => console.error('Error playing sound:', err));
  }, []);

  const playBreakComplete = useCallback(() => {
    breakCompleteAudio.current?.play().catch(err => console.error('Error playing sound:', err));
  }, []);

  const playTick = useCallback(() => {
    if (tickAudio.current) {
      tickAudio.current.currentTime = 0;
      tickAudio.current.play().catch(err => console.error('Error playing tick:', err));
    }
  }, []);

  return {
    playWorkComplete,
    playBreakComplete,
    playTick,
  };
};
