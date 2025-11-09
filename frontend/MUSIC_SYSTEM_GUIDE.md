# 🎵 Guide du Système de Musique

## 📋 Vue d'ensemble

Le Pomodoro Timer a maintenant un système de musique complet avec :
- ✅ Musique de fond pendant les sessions Pomodoro
- ✅ Sélection de musique via la page `/music`
- ✅ Contrôle ON/OFF avec le bouton "MUSIC ON/OFF"
- ✅ La musique `groovy-vibe` est intégrée et fonctionnelle

## 🎼 Fichiers modifiés

### 1. **`/public/sounds/groovy-vibe-427121.mp3`**
- Fichier audio principal (7:07)
- Musique Lo-Fi pour la concentration

### 2. **`/src/hooks/useMusic.ts`** (NOUVEAU)
```typescript
// Hook qui gère la lecture de la musique de fond
- Charge la musique sélectionnée depuis Redux
- Démarre/arrête automatiquement selon:
  * musicEnabled (bouton MUSIC ON/OFF)
  * isRunning (timer en cours)
- Volume: 30%
- Loop: Activé (boucle infinie)
```

### 3. **`/src/hooks/useSound.ts`** (MODIFIÉ)
```typescript
// Hook pour les sons de notification
- Charge les sons optionnels (ne cause pas d'erreur si absents)
- work-complete.mp3: Son de fin de Pomodoro
- break-complete.mp3: Son de fin de pause
- tick.mp3: Tic-tac optionnel
```

### 4. **`/src/pages/MusicPage.tsx`** (MODIFIÉ)
```typescript
const musicList = [
  { 
    id: 'groovy-vibe',  // ← ID utilisé dans Redux
    name: 'Groovy Vibe', 
    genre: 'Lo-Fi', 
    duration: '7:07',
    file: '/sounds/groovy-vibe-427121.mp3'  // ← Chemin réel
  },
];
```

### 5. **`/src/features/settings/settingsSlice.ts`** (MODIFIÉ)
```typescript
selectedMusic: 'groovy-vibe',  // ← Musique par défaut mise à jour
```

### 6. **`/src/App.tsx`** (MODIFIÉ)
```typescript
function AppContent() {
  useTimer();   // ← Gère le timer
  useMusic();   // ← Gère la musique de fond (NOUVEAU)
  // ...
}
```

## 🎯 Comment ça marche

### Flux de la musique :

```
User clique START
    ↓
isRunning = true (Redux)
    ↓
useMusic() détecte le changement
    ↓
Si musicEnabled = true
    ↓
Charge /sounds/groovy-vibe-427121.mp3
    ↓
Audio.play() + loop=true
    ↓
Musique joue en boucle
    ↓
User clique PAUSE/STOP
    ↓
Audio.pause()
```

### Sélection de musique :

```
1. User va sur /music
2. Clique sur une carte de musique
3. dispatch(setSelectedMusic('groovy-vibe'))
4. Redux met à jour selectedMusic
5. useMusic() recharge la nouvelle musique
```

## 🔧 Comment ajouter plus de musiques

### Étape 1 : Ajouter le fichier MP3
```bash
# Place ton fichier dans public/sounds/
/public/sounds/nouvelle-musique.mp3
```

### Étape 2 : Mettre à jour MusicPage.tsx
```typescript
const musicList = [
  { 
    id: 'groovy-vibe', 
    name: 'Groovy Vibe', 
    genre: 'Lo-Fi', 
    duration: '7:07',
    file: '/sounds/groovy-vibe-427121.mp3'
  },
  { 
    id: 'nouvelle-musique',  // ← Nouvel ID
    name: 'Ma Nouvelle Musique', 
    genre: 'Ambient', 
    duration: '5:30',
    file: '/sounds/nouvelle-musique.mp3'  // ← Ton fichier
  },
];
```

### Étape 3 : Mettre à jour useMusic.ts
```typescript
const musicFiles: Record<string, string> = {
  'groovy-vibe': '/sounds/groovy-vibe-427121.mp3',
  'nouvelle-musique': '/sounds/nouvelle-musique.mp3',  // ← Ajoute ici
};
```

### Étape 4 : Redémarrer le serveur
```bash
npm run dev
```

## 🐛 Résolution de problèmes

### ❌ "La musique ne joue pas"

**Cause** : Chrome/Safari bloquent l'autoplay audio jusqu'à interaction utilisateur

**Solution** :
- L'utilisateur DOIT cliquer sur START
- Le navigateur autorise ensuite l'audio
- C'est une limitation de sécurité des navigateurs

### ❌ "Erreur 404 sur le fichier audio"

**Vérifications** :
1. Le fichier est bien dans `/public/sounds/` ?
2. Le nom du fichier est exact (case-sensitive) ?
3. Le chemin dans `musicFiles` commence par `/sounds/` ?

### ❌ "La musique ne change pas"

**Vérifications** :
1. L'ID dans `musicList` correspond à l'ID dans `musicFiles` ?
2. Redux DevTools montre le bon `selectedMusic` ?
3. Le fichier MP3 existe-t-il vraiment ?

## 📊 État Redux pour la musique

```typescript
{
  settings: {
    musicEnabled: false,           // Contrôlé par bouton MUSIC ON/OFF
    selectedMusic: 'groovy-vibe',  // ID de la musique active
    // ...
  },
  timer: {
    isRunning: false,  // La musique joue seulement si true
    // ...
  }
}
```

## 🎮 Contrôles utilisateur

| Action | Effet |
|--------|-------|
| Cliquer START | Démarre timer + musique (si ON) |
| Cliquer PAUSE | Pause timer + musique |
| Cliquer STOP | Stop timer + musique |
| Cliquer MUSIC ON/OFF | Active/désactive la musique |
| Aller sur /music | Sélectionner une autre musique |

## 💡 Astuces

### Changer le volume
Dans `/src/hooks/useMusic.ts` :
```typescript
audio.volume = 0.5;  // 50% (par défaut 0.3 = 30%)
```

### Désactiver le loop
```typescript
audio.loop = false;  // La musique s'arrête à la fin
```

### Fade in/out
```typescript
// Fade in progressif
let volume = 0;
const fadeIn = setInterval(() => {
  if (volume < 0.3) {
    volume += 0.05;
    audio.volume = volume;
  } else {
    clearInterval(fadeIn);
  }
}, 100);
```

## ✅ État actuel

- ✅ 1 musique disponible : Groovy Vibe (7:07)
- ✅ Système de musique fonctionnel
- ✅ Contrôles ON/OFF opérationnels
- ✅ Sélection via page /music
- ✅ Intégration avec le timer
- ⏳ Sons de notification à ajouter (optionnel)

## 🎯 Prochaines étapes (optionnel)

1. Ajouter 5-10 musiques supplémentaires
2. Ajouter les sons de notification :
   - work-complete.mp3
   - break-complete.mp3
   - tick.mp3
3. Ajouter un contrôle de volume dans les settings
4. Ajouter des playlists (genres musicaux)

---

**Testé et fonctionnel le 9 novembre 2025** ✅
