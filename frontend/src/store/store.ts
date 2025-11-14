import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage
import timerReducer from '../features/timer/timerSlice';
import settingsReducer from '../features/settings/settingsSlice';
import tasksReducer from '../features/tasks/tasksSlice';
import authReducer from '../features/auth/authSlice';
import cryptoReducer from '../features/cryptoThunk/cryptoSlice';

// Configuration de la persistance pour chaque slice (typage simplifié)
const timerPersistConfig = {
  key: 'timer',
  storage,
};

const settingsPersistConfig = {
  key: 'settings',
  storage,
  blacklist: ['musicEnabled'], // Ne PAS sauvegarder musicEnabled (revient à OFF après refresh)
};

const tasksPersistConfig = {
  key: 'tasks',
  storage,
};

const authPersistConfig = {
  key: 'auth',
  storage,
};

export const store = configureStore({
  reducer: {
    // @ts-expect-error - redux-persist type compatibility
    timer: persistReducer(timerPersistConfig, timerReducer),
    // @ts-expect-error - redux-persist type compatibility
    settings: persistReducer(settingsPersistConfig, settingsReducer),
    // @ts-expect-error - redux-persist type compatibility
    tasks: persistReducer(tasksPersistConfig, tasksReducer),
    // @ts-expect-error - redux-persist type compatibility
    auth: persistReducer(authPersistConfig, authReducer),
    crypto: cryptoReducer, // Pas de persistance pour les cryptos (données temps réel)
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
