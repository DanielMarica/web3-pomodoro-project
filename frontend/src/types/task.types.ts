export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  pomodorosCount?: number;         // Nombre de pomodoros réalisés pour cette tâche
  estimatedPomodoros?: number;     // Nombre de pomodoros estimés pour compléter la tâche
  estimatedBreakPomodoros?: number; // Nombre de pauses estimées
}
