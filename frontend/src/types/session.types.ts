import type { TimerMode } from './timer.types';

export interface Session {
  id: string;
  type: TimerMode;
  duration: number;           // En secondes
  completedAt: Date;
  taskId?: string;            // Tâche associée (optionnel)
}
