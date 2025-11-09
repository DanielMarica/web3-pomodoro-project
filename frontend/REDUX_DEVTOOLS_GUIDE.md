# 🔧 Guide Redux DevTools

## Installation de l'extension

Pour voir Redux dans votre navigateur, vous devez installer l'extension Redux DevTools :

### Chrome
https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd

### Firefox
https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/

### Edge
https://microsoftedge.microsoft.com/addons/detail/redux-devtools/nnkgneoiohoecpdiaponcejilbhhikei

## Utilisation

Une fois l'extension installée :

1. **Ouvrez votre application** : http://localhost:5174
2. **Ouvrez les DevTools** : F12 ou Clic droit → Inspecter
3. **Trouvez l'onglet Redux** : Vous verrez un nouvel onglet "Redux" dans les DevTools

## Fonctionnalités principales

### 📊 État Redux en temps réel
- Voir tout l'état de l'application
- `timer` : timeLeft, totalTime, isRunning, mode, completedPomodoros
- `settings` : workDuration, shortBreakDuration, longBreakDuration, soundEnabled, musicEnabled, theme
- `tasks` : tasksList, activeTaskId
- `sessions` : history des sessions

### 🎬 Actions dispatchées
- Chaque action est enregistrée avec son type et payload
- Exemples : `setWorkDuration`, `updateTimerDuration`, `startTimer`, `pauseTimer`, etc.

### ⏮️ Time Travel Debugging
- Revenir en arrière dans l'historique des actions
- Rejouer les actions pour voir comment l'état change

### 📸 State Diff
- Voir exactement ce qui a changé dans l'état après chaque action

## Tests rapides

### Test 1 : Changer la durée de travail
1. Cliquez sur "My Work Times" → "10 minutes"
2. Dans Redux DevTools, vérifiez :
   - Action `settings/setWorkDuration` avec payload: 10
   - Action `timer/updateTimerDuration` avec payload: { duration: 10, resetTime: true }
   - `state.settings.workDuration` = 10
   - `state.timer.totalTime` = 600 (10 * 60 secondes)
   - `state.timer.timeLeft` = 600

### Test 2 : Changer le temps de pause
1. Cliquez sur "My Break Time" → "5 minutes"
2. Vérifiez dans Redux :
   - Action `settings/setShortBreakDuration` avec payload: 5
   - Si en mode break : `timer/updateTimerDuration`

### Test 3 : Démarrer le timer
1. Cliquez sur "START"
2. Vérifiez :
   - Action `timer/startTimer`
   - `state.timer.isRunning` = true
   - Actions `timer/tick` toutes les secondes
   - `state.timer.timeLeft` qui décrémente

## État actuel de Redux

Après les modifications, voici comment Redux est configuré :

```typescript
{
  timer: {
    timeLeft: number,      // Temps restant en secondes
    totalTime: number,     // Durée totale en secondes
    isRunning: boolean,    // Timer en cours
    mode: 'focus' | 'shortBreak' | 'longBreak',
    completedPomodoros: number
  },
  settings: {
    workDuration: number,       // Durée de travail en MINUTES
    shortBreakDuration: number, // Durée de pause en MINUTES
    longBreakDuration: number,
    soundEnabled: boolean,
    musicEnabled: boolean,
    theme: 'light' | 'dark'
  },
  tasks: { ... },
  sessions: { ... }
}
```

## Problèmes résolus ✅

### 1. Redux DevTools non visible
- **Solution** : Ajouté `devTools: import.meta.env.DEV` dans `store.ts`

### 2. Le timer ne change pas avec les dropdowns
- **Solution** : 
  - Créé l'action `updateTimerDuration` dans `timerSlice`
  - Le Header dispatch maintenant cette action quand on change la durée
  - Le `useTimer` hook initialise le timer avec les settings au démarrage
  - Quand le mode change (focus → break), le timer utilise la bonne durée

## Architecture Redux

```
Header.tsx
  └─> dispatch(setWorkDuration(10))
  └─> dispatch(updateTimerDuration({ duration: 10, resetTime: true }))
        └─> timerSlice met à jour totalTime et timeLeft

useTimer.ts
  └─> Lit workDuration et shortBreakDuration depuis settings
  └─> Au montage : initialise le timer avec ces valeurs
  └─> Quand timer terminé : change de mode et met à jour la durée
```
