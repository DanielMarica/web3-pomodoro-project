# 🔴 Redux dans le Projet Pomodoro Timer

## 📚 Table des matières

1. [C'est quoi Redux ?](#cest-quoi-redux)
2. [Pourquoi Redux dans ce projet ?](#pourquoi-redux-dans-ce-projet)
3. [Architecture Redux de l'application](#architecture-redux-de-lapplication)
4. [Exemples concrets : AVEC vs SANS Redux](#exemples-concrets-avec-vs-sans-redux)
5. [Les 3 slices Redux du projet](#les-3-slices-redux-du-projet)
6. [Redux Persist : Sauvegarde automatique](#redux-persist-sauvegarde-automatique)

---

## 🤔 C'est quoi Redux ?

**Redux** est une bibliothèque de gestion d'état **centralisée** pour React. 

### Analogie simple : La bibliothèque municipale 📚

- **Sans Redux** : Chaque maison (composant) a ses propres livres. Si quelqu'un veut lire un livre d'une autre maison, il doit le demander, le copier, le transporter... 😰

- **Avec Redux** : Il y a UNE bibliothèque centrale (le **store Redux**). Tout le monde emprunte et rend les livres au même endroit. Tout est organisé, synchronisé, et accessible partout ! 🎉

---

## 💡 Pourquoi Redux dans ce projet ?

### Problème résolu : Partage d'état entre composants

Dans l'application Pomodoro, **plusieurs composants** ont besoin des **mêmes données** :

| Donnée | Utilisée par... |
|--------|-----------------|
| `timeLeft` (temps restant) | `TimerDisplay`, `HomePage`, `useTimer` |
| `isRunning` (timer actif ?) | `TimerControls`, `useMusic`, `HomePage` |
| `musicEnabled` (musique ON/OFF) | `MusicButton`, `useMusic`, `HomePage` |
| `theme` (dark/light) | `App`, `HomePage`, tous les composants |
| `tasks` (liste des tâches) | `TaskSidebar`, `TaskList`, `TaskItem`, `AddTaskButton` |

**Sans Redux**, il faudrait faire passer ces données de parent en enfant en enfant en enfant... (c'est le **prop drilling** 😱)

**Avec Redux**, n'importe quel composant peut accéder directement aux données ! 🚀

---

## 🏗️ Architecture Redux de l'application

```
frontend/src/
├── store/
│   ├── store.ts              ← Configuration centrale (le "store" Redux)
│   └── hooks.ts              ← Hooks personnalisés (useAppDispatch, useAppSelector)
│
├── features/
│   ├── timer/
│   │   └── timerSlice.ts     ← Slice #1 : État du timer (timeLeft, isRunning, mode)
│   │
│   ├── settings/
│   │   └── settingsSlice.ts  ← Slice #2 : Paramètres (theme, musicEnabled, workDuration)
│   │
│   └── tasks/
│       └── tasksSlice.ts     ← Slice #3 : Gestion des tâches (liste, activeTaskId)
```

### 🎯 Les 3 piliers de Redux

1. **Store** : La source unique de vérité (tous les états)
2. **Actions** : Les événements qui modifient l'état (ex: `startTimer()`, `toggleMusic()`)
3. **Reducers** : Les fonctions qui appliquent les actions (ex: `isRunning = true`)

---

## 📊 Exemples concrets : AVEC vs SANS Redux

### Exemple 1 : Démarrer le timer

#### ❌ SANS Redux (cauchemar du prop drilling)

```tsx
// App.tsx
function App() {
  const [timeLeft, setTimeLeft] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  
  return (
    <HomePage 
      timeLeft={timeLeft} 
      setTimeLeft={setTimeLeft}
      isRunning={isRunning}
      setIsRunning={setIsRunning}
    />
  );
}

// HomePage.tsx
function HomePage({ timeLeft, setTimeLeft, isRunning, setIsRunning }) {
  return (
    <div>
      <TimerDisplay timeLeft={timeLeft} />
      <TimerControls 
        isRunning={isRunning} 
        setIsRunning={setIsRunning}
      />
      <MusicPlayer isRunning={isRunning} />
    </div>
  );
}

// TimerControls.tsx
function TimerControls({ isRunning, setIsRunning }) {
  return (
    <button onClick={() => setIsRunning(true)}>
      START
    </button>
  );
}

// MusicPlayer.tsx (doit aussi recevoir isRunning !)
function MusicPlayer({ isRunning }) {
  useEffect(() => {
    if (isRunning) {
      audio.play();
    }
  }, [isRunning]);
}
```

**Problèmes** :
- 😰 Prop drilling : passer `isRunning` à travers 3 niveaux !
- 🐛 Si on ajoute un composant, il faut modifier tous les parents
- 🔄 Code répétitif et difficile à maintenir

---

#### ✅ AVEC Redux (simple et propre !)

```tsx
// TimerControls.tsx
import { useAppDispatch } from '../../store/hooks';
import { startTimer } from '../../features/timer/timerSlice';

function TimerControls() {
  const dispatch = useAppDispatch();
  
  return (
    <button onClick={() => dispatch(startTimer())}>
      START
    </button>
  );
}

// MusicPlayer.tsx (accès direct à isRunning !)
import { useAppSelector } from '../../store/hooks';

function MusicPlayer() {
  const isRunning = useAppSelector(state => state.timer.isRunning);
  
  useEffect(() => {
    if (isRunning) {
      audio.play();
    }
  }, [isRunning]);
}
```

**Avantages** :
- ✅ Pas de prop drilling : accès direct depuis n'importe où !
- ✅ Code propre : chaque composant gère sa propre logique
- ✅ Facile à maintenir : ajouter un composant ne casse rien

---

### Exemple 2 : Basculer le thème dark/light

#### ❌ SANS Redux

```tsx
// App.tsx
function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeProvider theme={theme}>
      <HomePage theme={theme} setTheme={setTheme} />
    </ThemeProvider>
  );
}

// HomePage.tsx
function HomePage({ theme, setTheme }) {
  return (
    <Header theme={theme} setTheme={setTheme} />
  );
}

// Header.tsx
function Header({ theme, setTheme }) {
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
```

---

#### ✅ AVEC Redux

```tsx
// Header.tsx
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setTheme } from '../../features/settings/settingsSlice';

function Header() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(state => state.settings.theme);
  
  const toggleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };
  
  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
```

**Bonus** : N'importe quel autre composant peut lire le thème :

```tsx
// TaskSidebar.tsx
const theme = useAppSelector(state => state.settings.theme);
// Applique automatiquement le bon style !
```

---

## 🎯 Les 3 slices Redux du projet

### 1️⃣ `timerSlice.ts` : État du timer

**État géré** :
```typescript
{
  timeLeft: 1500,           // Secondes restantes
  totalTime: 1500,          // Durée totale du mode actuel
  isRunning: false,         // Timer en cours ?
  mode: 'focus',            // 'focus' | 'shortBreak' | 'longBreak'
  completedPomodoros: 0     // Nombre de pomodoros complétés
}
```

**Actions disponibles** :
- `startTimer()` → Lance le timer
- `pauseTimer()` → Met en pause
- `tick()` → Décrémente de 1 seconde
- `resetTimer()` → Réinitialise au début
- `completePomodoro()` → Incrémente le compteur

**Utilisé par** :
- `TimerControls.tsx` (boutons START/PAUSE/STOP)
- `HomePage.tsx` (affichage du temps)
- `useTimer.ts` (logique du timer)
- `useMusic.ts` (démarrer/arrêter musique selon isRunning)

---

### 2️⃣ `settingsSlice.ts` : Paramètres de l'app

**État géré** :
```typescript
{
  workDuration: 25,          // Minutes de travail
  shortBreakDuration: 5,     // Minutes de pause courte
  longBreakDuration: 15,     // Minutes de pause longue
  soundEnabled: true,        // Sons activés ?
  musicEnabled: false,       // Musique de fond activée ?
  selectedMusic: 'groovy-vibe', // Musique sélectionnée
  theme: 'light'             // 'light' | 'dark'
}
```

**Actions disponibles** :
- `setWorkDuration(minutes)` → Change durée travail
- `toggleMusic()` → Active/désactive musique
- `setTheme('dark' | 'light')` → Change le thème
- `setSelectedMusic(id)` → Change la musique

**Utilisé par** :
- `App.tsx` (thème)
- `HomePage.tsx` (bouton thème, bouton musique)
- `MusicPage.tsx` (sélection de musique)
- `useMusic.ts` (lecture de la musique)
- `useTimer.ts` (durées des modes)

---

### 3️⃣ `tasksSlice.ts` : Gestion des tâches

**État géré** :
```typescript
{
  tasks: [
    {
      id: '1',
      title: 'Faire le README',
      completed: false,
      createdAt: Date,
      pomodorosCount: 2,
      estimatedPomodoros: 4,
      estimatedBreakPomodoros: 3
    }
  ],
  activeTaskId: '1'  // Tâche actuellement en cours
}
```

**Actions disponibles** :
- `addTask(task)` → Ajoute une tâche
- `toggleTask(id)` → Marque comme complétée/non complétée
- `deleteTask(id)` → Supprime une tâche
- `setActiveTask(id)` → Définit la tâche active
- `incrementTaskPomodoro(id)` → +1 pomodoro sur une tâche

**Utilisé par** :
- `TaskSidebar.tsx` (affiche la liste)
- `TaskList.tsx` (boucle sur les tâches)
- `TaskItem.tsx` (affiche une tâche)
- `AddTaskButton.tsx` (ajoute une tâche)
- `useTimer.ts` (incrémente le compteur de la tâche active)

---

## 💾 Redux Persist : Sauvegarde automatique

**Redux Persist** sauvegarde automatiquement l'état Redux dans `localStorage` du navigateur.

### Configuration (`store.ts`)

```typescript
const timerPersistConfig = {
  key: 'timer',
  storage,
  // Sauvegarde TOUT (timeLeft, isRunning, mode, completedPomodoros)
};

const settingsPersistConfig = {
  key: 'settings',
  storage,
  blacklist: ['musicEnabled'], // Ne PAS sauvegarder musicEnabled
};

const tasksPersistConfig = {
  key: 'tasks',
  storage,
  // Sauvegarde toutes les tâches
};
```

### Ce qui est persisté

| Slice | Données sauvegardées | Données NON sauvegardées |
|-------|---------------------|-------------------------|
| **timer** | timeLeft, totalTime, mode, completedPomodoros, isRunning | - |
| **settings** | theme, workDuration, selectedMusic, soundEnabled | musicEnabled (revient à false après refresh) |
| **tasks** | Toutes les tâches, activeTaskId | - |

### Résultat

✅ **Refresh la page** → Ton timer, tes tâches, ton thème sont **conservés** !

---

## 🎨 Schéma de flux Redux

```
┌─────────────────────────────────────────────────────────────┐
│                     COMPOSANT                               │
│  (ex: TimerControls.tsx)                                    │
│                                                             │
│  const dispatch = useAppDispatch();                         │
│  dispatch(startTimer());  ← 1. Déclenche une action        │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                     REDUX STORE                             │
│  (store.ts)                                                 │
│                                                             │
│  Action reçue: startTimer()  ← 2. Reçoit l'action          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                     REDUCER                                 │
│  (timerSlice.ts)                                            │
│                                                             │
│  startTimer: (state) => {                                   │
│    state.isRunning = true;  ← 3. Modifie l'état            │
│  }                                                          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  TOUS LES COMPOSANTS                        │
│  (qui utilisent useAppSelector)                             │
│                                                             │
│  const isRunning = useAppSelector(s => s.timer.isRunning); │
│  ← 4. Se mettent à jour automatiquement !                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Avantages de Redux dans ce projet

| Avantage | Description | Exemple concret |
|----------|-------------|-----------------|
| **Centralisation** | Un seul endroit pour tout l'état | `store.ts` contient timer, settings, tasks |
| **Accessibilité** | N'importe quel composant peut lire l'état | `useAppSelector(state => state.timer.isRunning)` |
| **Prévisibilité** | Les changements d'état sont tracés | Redux DevTools montre chaque action |
| **Persistence** | État sauvegardé automatiquement | Refresh → données conservées |
| **Débug facile** | Time-travel debugging | Redux DevTools pour remonter le temps |
| **Maintenabilité** | Code organisé par domaine | timer/, settings/, tasks/ |

---

## 📖 Ressources pour aller plus loin

- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools)
- [Redux Persist](https://github.com/rt2zz/redux-persist)

---

## 🎯 Conclusion

**Sans Redux** : Ton code serait un spaghetti de props passées de parent en enfant, difficile à maintenir et à débugger. 🍝😰

**Avec Redux** : Ton code est propre, organisé, et chaque composant est **autonome**. Tu peux ajouter/modifier des fonctionnalités sans tout casser ! 🚀✨

---

*Créé pour le projet Web3 Pomodoro Timer*
