# 🎵 Fichiers Audio pour le Pomodoro Timer

## 📂 Fichiers actuels

### Musiques de fond
- ✅ **groovy-vibe-427121.mp3** : Musique de fond pendant les sessions Pomodoro (7:07)

### Sons de notification (optionnels)
- ❌ **work-complete.mp3** : Son joué quand un pomodoro de travail est terminé
- ❌ **break-complete.mp3** : Son joué quand une pause est terminée  
- ❌ **tick.mp3** : Son de tic-tac (optionnel)

## 🎼 Comment ajouter plus de musiques

1. **Télécharge des musiques gratuites** :
   - [Pixabay Music](https://pixabay.com/music/)
   - [YouTube Audio Library](https://www.youtube.com/audiolibrary/music)
   - [Free Music Archive](https://freemusicarchive.org/)
   - [Incompetech](https://incompetech.com/music/)

2. **Place le fichier MP3** dans ce dossier `public/sounds/`

3. **Ajoute la musique dans le code** :
   
   Ouvre `/src/pages/MusicPage.tsx` et ajoute :
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
       id: 'nouvelle-musique',       // ← ID unique
       name: 'Nom de ta musique',    // ← Nom affiché
       genre: 'Ambient',             // ← Genre
       duration: '5:30',             // ← Durée
       file: '/sounds/ton-fichier.mp3'  // ← Chemin du fichier
     },
   ];
   ```

4. **Ajoute aussi dans** `/src/hooks/useMusic.ts` :
   ```typescript
   const musicFiles: Record<string, string> = {
     'groovy-vibe': '/sounds/groovy-vibe-427121.mp3',
     'nouvelle-musique': '/sounds/ton-fichier.mp3',  // ← Ajoute ici
   };
   ```

## 🔔 Comment ajouter des sons de notification

1. **Télécharge des sons courts** (< 3 secondes) :
   - [Mixkit Sound Effects](https://mixkit.co/free-sound-effects/)
   - [Freesound](https://freesound.org/)
   - [Zapsplat](https://www.zapsplat.com/)

2. **Renomme et place les fichiers** :
   - `work-complete.mp3` : Son de succès (cloche, ding, applaudissements)
   - `break-complete.mp3` : Son doux (gong, notification subtile)
   - `tick.mp3` : Tic-tac d'horloge (optionnel)

3. **Redémarre l'app** - les sons seront chargés automatiquement !

## 📝 Notes

- Format recommandé : **MP3**
- Taille musiques : < 5 MB
- Taille sons : < 100 KB
- Les musiques bouclent automatiquement pendant le timer
- Volume musique : 30% par défaut
