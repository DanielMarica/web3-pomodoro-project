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
    // Créer l'élément audio s'il n'existe pas
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true; // Boucler la musique
      audioRef.current.volume = 0.3; // Volume à 30%
    }

    const audio = audioRef.current;

    // Changer la source si la musique sélectionnée change
    const musicFile = musicFiles[selectedMusic];
    if (musicFile && audio.src !== window.location.origin + musicFile) {
      audio.src = musicFile;
      audio.load();
    }

    // Jouer ou arrêter la musique selon les conditions
    if (musicEnabled && isRunning && musicFile) {
      audio.play().catch((err) => {
        console.error('Erreur lors de la lecture de la musique:', err);
        // Note: Chrome bloque l'autoplay audio jusqu'à ce que l'utilisateur interagisse avec la page
      });
    } else {
      audio.pause();
    }

    // Cleanup: arrêter la musique quand le composant est démonté
    return () => {
      audio.pause();
    };
  }, [musicEnabled, selectedMusic, isRunning]);

  return null;
};
