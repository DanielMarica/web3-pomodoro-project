import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { tick, completePomodoro, setMode, pauseTimer, updateTimerDuration } from '../features/timer/timerSlice';
import { incrementTaskPomodoro } from '../features/tasks/tasksSlice';
import { addSession } from '../features/sessions/sessionsSlice';
import { notifyWorkComplete, notifyBreakComplete } from '../utils/notifications';
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

  // Initialiser le timer avec les durées des settings au chargement
  useEffect(() => {
    if (mode === 'focus') {
      dispatch(updateTimerDuration({ duration: workDuration, resetTime: true }));
    } else if (mode === 'shortBreak') {
      dispatch(updateTimerDuration({ duration: shortBreakDuration, resetTime: true }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Seulement au montage initial

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

        // Notifications
        if (mode === 'focus') {
          notifyWorkComplete();
          dispatch(completePomodoro());
          
          // Incrémenter le compteur de pomodoros de la tâche active
          if (activeTaskId) {
            dispatch(incrementTaskPomodoro(activeTaskId));
          }
          
          // Enregistrer la session
          dispatch(addSession({
            id: Date.now().toString(),
            type: mode,
            duration: totalTime,
            completedAt: new Date(),
            taskId: activeTaskId || undefined,
          }));
          
          // Passer en mode pause et mettre à jour la durée
          dispatch(setMode('shortBreak'));
          dispatch(updateTimerDuration({ duration: shortBreakDuration, resetTime: true }));
        } else {
          notifyBreakComplete();
          // Passer en mode travail et mettre à jour la durée
          dispatch(setMode('focus'));
          dispatch(updateTimerDuration({ duration: workDuration, resetTime: true }));
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode, dispatch, activeTaskId, soundEnabled, totalTime, playWorkComplete, playBreakComplete, workDuration, shortBreakDuration]);
};
