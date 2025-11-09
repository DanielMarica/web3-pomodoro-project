import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { tick, completePomodoro, setMode, pauseTimer, updateTimerDuration } from '../features/timer/timerSlice';
import { incrementTaskPomodoro } from '../features/tasks/tasksSlice';
// Fallback local implementation of useSound in case './useSound' module is missing
// Provides playWorkComplete and playBreakComplete no-op / audio play helpers.
const useSound = () => {
  const safePlay = (src?: string) => {
    if (!src) return;
    if (typeof window === 'undefined') return;
    try {
      const audio = new Audio(src);
      void audio.play();
    } catch {
      // ignore play errors (user block, no audio device, etc.)
    }
  };

  const playWorkComplete = () => safePlay('/sounds/work-complete.mp3');
  const playBreakComplete = () => safePlay('/sounds/break-complete.mp3');

  return { playWorkComplete, playBreakComplete };
};

export const useTimer = () => {
  const dispatch = useAppDispatch();
  const { isRunning, timeLeft, mode, totalTime } = useAppSelector(state => state.timer);
  const { activeTaskId } = useAppSelector(state => state.tasks);
  const { soundEnabled, workDuration, shortBreakDuration } = useAppSelector(state => state.settings);
  const { playWorkComplete, playBreakComplete } = useSound();

  // ❌ SUPPRIMER ce useEffect qui réinitialise le timer au montage !
  // Redux Persist charge automatiquement les valeurs sauvegardées
  // Si on appelle updateTimerDuration ici, ça écrase timeLeft persisté !

  // Synchroniser le timer quand les settings changent (UNIQUEMENT si timer à 0 ou reset)
  useEffect(() => {
    // Ne RIEN faire si le timer est en cours ou si timeLeft != totalTime (en cours d'utilisation)
    if (isRunning || timeLeft !== totalTime) return;
    
    // Mettre à jour UNIQUEMENT si le timer est au repos (timeLeft === totalTime)
    if (mode === 'focus') {
      dispatch(updateTimerDuration({ duration: workDuration, resetTime: false }));
    } else if (mode === 'shortBreak' || mode === 'longBreak') {
      dispatch(updateTimerDuration({ duration: shortBreakDuration, resetTime: false }));
    }
  }, [workDuration, shortBreakDuration, mode, isRunning, timeLeft, totalTime, dispatch]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      if (timeLeft > 0) {
        dispatch(tick());
      } else {
        // Timer terminé
        dispatch(pauseTimer());
        
        // Jouer le son si activé
        if (soundEnabled) {
          if (mode === 'focus') {
            playWorkComplete();
          } else {
            playBreakComplete();
          }
        }

        // Traitement de la fin du timer
        if (mode === 'focus') {
          dispatch(completePomodoro());
          
          // Incrémenter le compteur de pomodoros de la tâche active
          if (activeTaskId) {
            dispatch(incrementTaskPomodoro(activeTaskId));
          }
          
          // Passer en mode pause et mettre à jour la durée
          dispatch(setMode('shortBreak'));
          dispatch(updateTimerDuration({ duration: shortBreakDuration, resetTime: true }));
        } else {
          // Passer en mode travail et mettre à jour la durée
          dispatch(setMode('focus'));
          dispatch(updateTimerDuration({ duration: workDuration, resetTime: true }));
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode, dispatch, activeTaskId, soundEnabled, totalTime, playWorkComplete, playBreakComplete, workDuration, shortBreakDuration]);
};
