# 🔧 Fix : Synchronisation Break Time

## ❌ Problème identifié

Quand on change la durée du **Break Time** dans le dropdown :
- Le `settings.shortBreakDuration` est mis à jour ✅
- **MAIS** le timer ne se met pas à jour immédiatement ❌
- Le changement n'était visible que lors du prochain changement de mode

### Exemple du bug :
1. Mode actuel : **WORK TIME** (25 minutes)
2. Clic sur "My Break Time" → "10 minutes"
3. Le setting est changé mais...
4. Quand le timer passe en mode Break → il affiche toujours **5 minutes** au lieu de **10 minutes**

## ✅ Solution implémentée

### 1. Nouveau `useEffect` dans `useTimer.ts`

Ajouté un effet qui surveille les changements de `workDuration` et `shortBreakDuration` :

```typescript
// Synchroniser le timer quand les settings changent (si le timer n'est pas en cours)
useEffect(() => {
  // Ne pas mettre à jour si le timer est en cours d'exécution
  if (isRunning) return;
  
  if (mode === 'focus') {
    dispatch(updateTimerDuration({ duration: workDuration, resetTime: true }));
  } else if (mode === 'shortBreak' || mode === 'longBreak') {
    dispatch(updateTimerDuration({ duration: shortBreakDuration, resetTime: true }));
  }
}, [workDuration, shortBreakDuration, mode, isRunning, dispatch]);
```

### 2. Comportement

#### Cas 1 : Timer arrêté (pas en cours)
- ✅ Changement de `workDuration` → Timer mis à jour **immédiatement**
- ✅ Changement de `shortBreakDuration` → Timer mis à jour **immédiatement**

#### Cas 2 : Timer en cours d'exécution
- ⏸️ Changement de durée → **Pas de mise à jour** (pour ne pas perturber le timer en cours)
- 🔄 Mais le nouveau setting sera utilisé au prochain cycle

## 🧪 Tests à effectuer

### Test 1 : Changer Work Time (timer arrêté)
1. Timer en mode **WORK TIME**, arrêté
2. Cliquer sur "My Work Times" → "15 minutes"
3. ✅ Le timer affiche **15:00** immédiatement

### Test 2 : Changer Break Time (timer arrêté)
1. Timer en mode **WORK TIME**, arrêté
2. Cliquer sur "My Break Time" → "10 minutes"
3. Terminer le travail (ou reset + changer de mode)
4. ✅ Le timer en mode Break affiche **10:00**

### Test 3 : Changer Break Time en mode Break (arrêté)
1. Timer en mode **BREAK TIME**, arrêté
2. Cliquer sur "My Break Time" → "15 minutes"
3. ✅ Le timer affiche **15:00** immédiatement

### Test 4 : Changer durée pendant exécution
1. Timer en cours (10:00 → 9:59 → 9:58...)
2. Cliquer sur "My Work Times" → "30 minutes"
3. ⏸️ Le timer continue avec le temps actuel (ne reset pas)
4. 🔄 Au prochain cycle, utilisera 30 minutes

## 📊 Flow Redux

```
User clique "My Break Time" → "10 minutes"
  │
  ├─> dispatch(setShortBreakDuration(10))
  │   └─> settings.shortBreakDuration = 10
  │
  └─> useEffect détecte le changement
      │
      ├─> if (isRunning) → Ne rien faire
      │
      └─> if (!isRunning && mode === 'shortBreak')
          └─> dispatch(updateTimerDuration({ duration: 10, resetTime: true }))
              └─> timer.totalTime = 600
              └─> timer.timeLeft = 600
              └─> Affichage : "10:00"
```

## 🔍 Vérification avec Redux DevTools

1. Ouvrir Redux DevTools
2. Changer "My Break Time" → "10 minutes"
3. Observer les actions :
   ```
   settings/setShortBreakDuration { payload: 10 }
   timer/updateTimerDuration { payload: { duration: 10, resetTime: true } }
   ```
4. Vérifier l'état :
   ```json
   {
     "settings": {
       "shortBreakDuration": 10
     },
     "timer": {
       "totalTime": 600,
       "timeLeft": 600,
       "mode": "shortBreak"
     }
   }
   ```

## 📁 Fichiers modifiés

- `src/hooks/useTimer.ts` - Ajout du `useEffect` de synchronisation
- `src/components/layout/Header.tsx` - Commentaires améliorés

## 🎯 Résultat

- ✅ Work Time change immédiatement quand on le modifie
- ✅ Break Time change immédiatement quand on le modifie
- ✅ Les changements sont visibles dans Redux DevTools
- ✅ Le timer en cours n'est pas perturbé
- ✅ Architecture Redux propre et prévisible
