import { configureStore } from '@reduxjs/toolkit';
import timerReducer from '../features/timer/timerSlice';
import settingsReducer from '../features/settings/settingsSlice';
import tasksReducer from '../features/tasks/tasksSlice';
import sessionsReducer from '../features/sessions/sessionsSlice';

export const store = configureStore({
  reducer: {
    timer: timerReducer,
    settings: settingsReducer,
    tasks: tasksReducer,
    sessions: sessionsReducer,
  },
  devTools: import.meta.env.DEV, // Active Redux DevTools en développement (Vite)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
