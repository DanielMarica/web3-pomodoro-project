import { useEffect, useRef } from 'react';
import { useAppSelector } from '../store/hooks';

// Map des musiques disponibles
const musicFiles: Record<string, string> = {
  'groovy-vibe': '/sounds/groovy-vibe-427121.mp3',
  'embrace': '/sounds/embrace-364091.mp3',
  'gorila': '/sounds/gorila-315977.mp3',
  'kugelsicher': '/sounds/kugelsicher-by-tremoxbeatz-302838.mp3',
  'the-last-point': '/sounds/the-last-point-beat-electronic-digital-394291.mp3',
};

export const useMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { musicEnabled, selectedMusic } = useAppSelector((state) => state.settings);
  const { isRunning } = useAppSelector((state) => state.timer);

  useEffect(() => {
    // Créer l'élément audio une seule fois
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }

    const audio = audioRef.current;
    const musicFile = musicFiles[selectedMusic];

    // Définir la source si elle n'est pas déjà définie ou si la musique change
    if (musicFile) {
      const fullPath = window.location.origin + musicFile;
      if (audio.src !== fullPath) {
        const wasPlaying = !audio.paused;
        audio.pause();
        audio.src = musicFile;
        audio.load();
        
        // Si la musique jouait avant le changement, relancer
        if (wasPlaying && musicEnabled && isRunning) {
          audio.play().catch(() => {
            // Autoplay bloqué par le navigateur (normal)
          });
        }
      }
    }

    // Gérer la lecture/pause de la musique
    const shouldPlay = musicEnabled && isRunning && !!musicFile;

    if (shouldPlay) {
      // Lancer la musique si elle est en pause
      if (audio.paused) {
        audio.play().catch(() => {
          // Autoplay bloqué par le navigateur (nécessite interaction utilisateur)
        });
      }
    } else {
      // Arrêter la musique
      if (!audio.paused) {
        audio.pause();
      }
    }

  }, [musicEnabled, selectedMusic, isRunning]);

  return null;
};
