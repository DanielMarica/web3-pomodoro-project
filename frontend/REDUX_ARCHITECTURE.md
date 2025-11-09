# 📦 Redux Toolkit - Architecture Complète

## 📁 Structure des Fichiers

```
frontend/src/
├── store/
│   ├── store.ts           ← Configuration principale du Redux Store
│   └── hooks.ts           ← Hooks TypeScript typés (useAppDispatch, useAppSelector)
│
└── features/              ← Chaque "slice" gère une partie de l'état
    ├── timer/
    │   └── timerSlice.ts      ← Gestion du timer (25 min, pause, play)
    ├── settings/
    │   └── settingsSlice.ts   ← Paramètres utilisateur
    ├── tasks/
    │   └── tasksSlice.ts      ← Liste des tâches à faire
    └── sessions/
        └── sessionsSlice.ts   ← Historique des sessions Pomodoro
```

---

## 🏪 1. Store Principal (`store/store.ts`)

**Rôle** : Configure le store Redux avec tous les reducers.

```typescript
import { configureStore } from '@reduxjs/toolkit';
import timerReducer from '../features/timer/timerSlice';
import settingsReducer from '../features/settings/settingsSlice';
import tasksReducer from '../features/tasks/tasksSlice';
import sessionsReducer from '../features/sessions/sessionsSlice';

export const store = configureStore({
  reducer: {
    timer: timerReducer,        // État du timer
    settings: settingsReducer,  // Paramètres
    tasks: tasksReducer,        // Tâches
    sessions: sessionsReducer,  // Historique
  },
  devTools: import.meta.env.DEV, // Redux DevTools activé en dev
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

**📌 Localisation** : `/Users/livius/web3-pomodoro-project/frontend/src/store/store.ts`

---

## 🪝 2. Hooks Typés (`store/hooks.ts`)

**Rôle** : Hooks personnalisés avec TypeScript pour une meilleure autocomplétion.

```typescript
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Au lieu de useDispatch()
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Au lieu de useSelector()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

**📌 Localisation** : `/Users/livius/web3-pomodoro-project/frontend/src/store/hooks.ts`

**💡 Utilisation** :
```typescript
import { useAppDispatch, useAppSelector } from '../store/hooks';

const dispatch = useAppDispatch();
const timeLeft = useAppSelector(state => state.timer.timeLeft);
```

---

## ⏱️ 3. Timer Slice (`features/timer/timerSlice.ts`)

**Rôle** : Gère l'état du timer Pomodoro.

### État Initial
```typescript
{
  timeLeft: 1500,        // 25 minutes en secondes
  totalTime: 1500,
  isRunning: false,
  mode: 'focus',         // 'focus' | 'shortBreak' | 'longBreak'
  completedPomodoros: 0
}
```

### Actions Disponibles
```typescript
// Démarrer le timer
dispatch(startTimer())

// Mettre en pause
dispatch(pauseTimer())

// Décrémenter de 1 seconde
dispatch(tick())

// Réinitialiser
dispatch(resetTimer())

// Changer de mode (focus, shortBreak, longBreak)
dispatch(setMode('shortBreak'))

// Définir une durée personnalisée (en minutes)
dispatch(setCustomTime(30))

// Mettre à jour la durée depuis les settings
dispatch(updateTimerDuration({ duration: 25, resetTime: true }))

// Incrémenter les pomodoros complétés
dispatch(completePomodoro())
```

**📌 Localisation** : `/Users/livius/web3-pomodoro-project/frontend/src/features/timer/timerSlice.ts`

---

## ⚙️ 4. Settings Slice (`features/settings/settingsSlice.ts`)

**Rôle** : Gère les paramètres de l'application.

### État Initial
```typescript
{
  workDuration: 25,           // Minutes de travail
  shortBreakDuration: 5,      // Minutes de pause courte
  longBreakDuration: 15,      // Minutes de pause longue
  soundEnabled: true,         // Sons activés
  musicEnabled: false,        // Musique activée
  selectedMusic: 'lofi-1',    // ID de la musique sélectionnée
  theme: 'light'              // Thème clair ou sombre
}
```

### Actions Disponibles
```typescript
// Changer la durée de travail (en minutes)
dispatch(setWorkDuration(30))

// Changer la durée de pause courte
dispatch(setShortBreakDuration(10))

// Changer la durée de pause longue
dispatch(setLongBreakDuration(20))

// Toggle son on/off
dispatch(toggleSound())

// Toggle musique on/off
dispatch(toggleMusic())

// Changer le thème
dispatch(setTheme('dark'))

// Sélectionner une musique
dispatch(setSelectedMusic('jazz-1'))
```

**📌 Localisation** : `/Users/livius/web3-pomodoro-project/frontend/src/features/settings/settingsSlice.ts`

---

## ✅ 5. Tasks Slice (`features/tasks/tasksSlice.ts`)

**Rôle** : Gère la liste des tâches à accomplir.

### État Initial
```typescript
{
  tasks: [],              // Liste des tâches
  activeTaskId: null      // ID de la tâche active
}
```

### Actions Disponibles
```typescript
// Ajouter une tâche
dispatch(addTask({
  title: 'Finir le projet',
  completed: false,
  pomodorosCount: 0
}))

// Toggle complétion d'une tâche
dispatch(toggleTask('task-id'))

// Supprimer une tâche
dispatch(deleteTask('task-id'))

// Définir la tâche active
dispatch(setActiveTask('task-id'))

// Incrémenter le compteur de pomodoros d'une tâche
dispatch(incrementTaskPomodoro('task-id'))
```

**📌 Localisation** : `/Users/livius/web3-pomodoro-project/frontend/src/features/tasks/tasksSlice.ts`

---

## 📊 6. Sessions Slice (`features/sessions/sessionsSlice.ts`)

**Rôle** : Stocke l'historique des sessions Pomodoro.

### État Initial
```typescript
{
  sessions: [],    // Historique des sessions
  loading: false,
  error: null
}
```

### Actions Disponibles
```typescript
// Ajouter une session
dispatch(addSession({
  id: '123',
  type: 'focus',
  duration: 1500,
  completedAt: new Date(),
  taskId: 'task-id' // optionnel
}))

// Définir toutes les sessions
dispatch(setSessions([...]))

// Définir l'état de chargement
dispatch(setLoading(true))

// Définir une erreur
dispatch(setError('Une erreur est survenue'))
```

**📌 Localisation** : `/Users/livius/web3-pomodoro-project/frontend/src/features/sessions/sessionsSlice.ts`

---

## 🔄 Comment Utiliser Redux dans un Composant

### Exemple Complet

```typescript
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { startTimer, pauseTimer } from '../features/timer/timerSlice';
import { setWorkDuration } from '../features/settings/settingsSlice';

export const MyComponent = () => {
  const dispatch = useAppDispatch();
  
  // Lire l'état
  const timeLeft = useAppSelector(state => state.timer.timeLeft);
  const isRunning = useAppSelector(state => state.timer.isRunning);
  const workDuration = useAppSelector(state => state.settings.workDuration);
  
  // Dispatcher des actions
  const handleStart = () => {
    dispatch(startTimer());
  };
  
  const handlePause = () => {
    dispatch(pauseTimer());
  };
  
  const handleChangeWorkTime = (minutes: number) => {
    dispatch(setWorkDuration(minutes));
  };
  
  return (
    <div>
      <p>Time: {timeLeft}s</p>
      <button onClick={handleStart}>Start</button>
      <button onClick={handlePause}>Pause</button>
    </div>
  );
};
```

---

## 🎯 État Global Complet

Voici à quoi ressemble l'état Redux complet :

```typescript
{
  timer: {
    timeLeft: 1500,
    totalTime: 1500,
    isRunning: false,
    mode: 'focus',
    completedPomodoros: 0
  },
  settings: {
    workDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    soundEnabled: true,
    musicEnabled: false,
    selectedMusic: 'lofi-1',
    theme: 'light'
  },
  tasks: {
    tasks: [
      {
        id: '1',
        title: 'Faire le projet',
        completed: false,
        pomodorosCount: 3,
        createdAt: '2025-11-09T...'
      }
    ],
    activeTaskId: '1'
  },
  sessions: {
    sessions: [
      {
        id: '1',
        type: 'focus',
        duration: 1500,
        completedAt: '2025-11-09T...',
        taskId: '1'
      }
    ],
    loading: false,
    error: null
  }
}
```

---

## 🛠️ Commandes Redux DevTools

1. **Installer l'extension** : Redux DevTools (Chrome/Firefox)
2. **Ouvrir DevTools** : F12 → Onglet "Redux"
3. **Voir l'état** : State → Voir tout l'état global
4. **Voir les actions** : Actions → Liste de toutes les actions dispatchées
5. **Time Travel** : Revenir en arrière dans l'historique

---

## 📚 Résumé des Fichiers

| Fichier | Chemin | Rôle |
|---------|--------|------|
| `store.ts` | `src/store/store.ts` | Configuration Redux |
| `hooks.ts` | `src/store/hooks.ts` | Hooks typés |
| `timerSlice.ts` | `src/features/timer/timerSlice.ts` | État du timer |
| `settingsSlice.ts` | `src/features/settings/settingsSlice.ts` | Paramètres |
| `tasksSlice.ts` | `src/features/tasks/tasksSlice.ts` | Tâches |
| `sessionsSlice.ts` | `src/features/sessions/sessionsSlice.ts` | Sessions |

---

## 🔗 Flux de Données Redux

```
Composant React
    ↓
useAppDispatch() 
    ↓
dispatch(action)
    ↓
Reducer (Slice)
    ↓
État mis à jour
    ↓
useAppSelector()
    ↓
Composant re-rendu
```

---

## 💡 Bonnes Pratiques Utilisées

✅ **TypeScript** : Types stricts pour éviter les erreurs  
✅ **Hooks typés** : `useAppDispatch` et `useAppSelector`  
✅ **Immer** : Mutations "immutables" dans les reducers  
✅ **Redux DevTools** : Debug facile en développement  
✅ **Feature-based structure** : Organisation par fonctionnalité  
✅ **Actions explicites** : Noms clairs et descriptifs  

---

C'est l'architecture complète de Redux Toolkit dans ton projet ! 🚀
