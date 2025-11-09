export type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

export interface TimerState {
  timeLeft: number;           // Secondes restantes
  totalTime: number;          // Durée totale
  isRunning: boolean;         // Timer en cours ?
  mode: TimerMode;            // Mode actuel
  completedPomodoros: number; // Nombre de pomodoros terminés
}
