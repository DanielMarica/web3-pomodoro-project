import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Task } from '../../types/task.types';

interface TasksState {
  tasks: Task[];
  activeTaskId: string | null;
}

const initialState: TasksState = {
  tasks: [],
  activeTaskId: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, 'id' | 'createdAt'>>) => {
      const newTask: Task = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date(),
      };
      state.tasks.push(newTask);
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
      if (state.activeTaskId === action.payload) {
        state.activeTaskId = null;
      }
    },
    setActiveTask: (state, action: PayloadAction<string | null>) => {
      state.activeTaskId = action.payload;
    },
    incrementTaskPomodoro: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.pomodorosCount = (task.pomodorosCount || 0) + 1;
      }
    },
  },
});

export const { 
  addTask, 
  toggleTask, 
  deleteTask, 
  setActiveTask,
  incrementTaskPomodoro 
} = tasksSlice.actions;

export default tasksSlice.reducer;
