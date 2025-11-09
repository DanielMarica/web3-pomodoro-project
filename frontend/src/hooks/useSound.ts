import { useRef, useCallback } from 'react';

export const useSound = () => {
  const workCompleteAudio = useRef<HTMLAudioElement | null>(null);
  const breakCompleteAudio = useRef<HTMLAudioElement | null>(null);
  const tickAudio = useRef<HTMLAudioElement | null>(null);

  // Fonction helper pour charger un son si le fichier existe
  const loadSound = (path: string): HTMLAudioElement | null => {
    try {
      const audio = new Audio(path);
      // Pré-charger le son (optionnel)
      audio.load();
      return audio;
    } catch {
      console.warn(`Son non trouvé: ${path}`);
      return null;
    }
  };

  // Initialiser les sons (optionnels - ne causera pas d'erreur si absents)
  if (!workCompleteAudio.current) {
    workCompleteAudio.current = loadSound('/sounds/work-complete.mp3');
  }
  if (!breakCompleteAudio.current) {
    breakCompleteAudio.current = loadSound('/sounds/break-complete.mp3');
  }
  if (!tickAudio.current) {
    tickAudio.current = loadSound('/sounds/tick.mp3');
  }

  const playWorkComplete = useCallback(() => {
    if (workCompleteAudio.current) {
      workCompleteAudio.current.play().catch(err => 
        console.log('Son work-complete non disponible:', err.message)
      );
    } else {
      console.log('🔔 Pomodoro terminé ! (son non disponible)');
    }
  }, []);

  const playBreakComplete = useCallback(() => {
    if (breakCompleteAudio.current) {
      breakCompleteAudio.current.play().catch(err => 
        console.log('Son break-complete non disponible:', err.message)
      );
    } else {
      console.log('☕ Pause terminée ! (son non disponible)');
    }
  }, []);

  const playTick = useCallback(() => {
    if (tickAudio.current) {
      tickAudio.current.currentTime = 0;
      tickAudio.current.play().catch(err => 
        console.log('Son tick non disponible:', err.message)
      );
    }
  }, []);

  return {
    playWorkComplete,
    playBreakComplete,
    playTick,
  };
};
