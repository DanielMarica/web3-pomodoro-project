export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  pomodorosCount?: number;    // Nombre de pomodoros pour cette tâche
}
