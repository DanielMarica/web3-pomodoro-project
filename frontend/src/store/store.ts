import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage
import timerReducer from '../features/timer/timerSlice';
import settingsReducer from '../features/settings/settingsSlice';
import tasksReducer from '../features/tasks/tasksSlice';

// Configuration de la persistance pour chaque slice
const timerPersistConfig = {
  key: 'timer',
  storage,
  // Sauvegarder TOUT le state du timer (y compris isRunning pour préserver la progression)
};

const settingsPersistConfig = {
  key: 'settings',
  storage,
  blacklist: ['musicEnabled'], // Ne PAS sauvegarder musicEnabled (revient à OFF après refresh)
  // Sauvegarder le reste: theme, workDuration, selectedMusic, etc.
};

const tasksPersistConfig = {
  key: 'tasks',
  storage,
  // Sauvegarder toutes les tâches
};

export const store = configureStore({
  reducer: {
    timer: persistReducer(timerPersistConfig, timerReducer),
    settings: persistReducer(settingsPersistConfig, settingsReducer),
    tasks: persistReducer(tasksPersistConfig, tasksReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignorer les actions redux-persist (nécessaire pour redux-persist)
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: import.meta.env.DEV, // Active Redux DevTools en développement (Vite)
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
