# 🚀 Guide de Démarrage Rapide - Pomodoro Timer

## 📦 Installation complète (première fois)

### Backend
```bash
cd backend
./mvnw clean install
```

### Frontend  
```bash
cd frontend
npm install
```

## ▶️ Lancement de l'application

### 1️⃣ Terminal 1 - Backend (Spring Boot)
```bash
cd backend
./mvnw spring-boot:run
```
✅ Backend disponible sur : `http://localhost:8080`

### 2️⃣ Terminal 2 - Frontend (React + Vite)
```bash
cd frontend
npm run dev
```
✅ Frontend disponible sur : `http://localhost:5173`

### 3️⃣ Ouvrir dans le navigateur
```
http://localhost:5173
```

## 📝 Scripts disponibles

### Frontend
```bash
npm run dev          # Démarrer en mode développement
npm run build        # Build pour production
npm run preview      # Prévisualiser le build
npm run lint         # Linter le code
```

### Backend
```bash
./mvnw spring-boot:run              # Démarrer le serveur
./mvnw clean install                # Compiler et installer
./mvnw test                         # Lancer les tests
./mvnw spring-boot:run -Dserver.port=8081  # Changer le port
```

## 🔧 Configuration

### Variables d'environnement Frontend (.env)
```env
VITE_API_URL=http://localhost:8080/api
```

### Port du Backend (application.properties)
```properties
server.port=8080
```

## 🎯 Première utilisation

1. ✅ Installer les dépendances (une seule fois)
2. ✅ Démarrer le backend (Terminal 1)
3. ✅ Démarrer le frontend (Terminal 2)
4. ✅ Ouvrir `http://localhost:5173`
5. 🎉 Profiter du Pomodoro Timer !

## 📱 Fonctionnalités rapides

### Timer
- ▶️ **Play** : Démarrer le timer
- ⏸️ **Pause** : Mettre en pause
- 🔄 **Reset** : Réinitialiser

### Tâches
- ➕ Cliquer sur l'icône de liste (en haut à droite)
- ✍️ Taper le nom de la tâche
- ✅ Cocher pour marquer comme terminée

### Paramètres
- ⏱️ Modifier les durées (25/5/15 min)
- 🌗 Basculer thème clair/sombre
- 🔊 Activer/désactiver les sons

### Statistiques
- 📊 Menu hamburger → Statistiques
- 📜 Menu hamburger → Historique

## 🎨 Personnalisation rapide

### Changer les durées par défaut
**Fichier** : `frontend/src/features/settings/settingsSlice.ts`
```typescript
const initialState: SettingsState = {
  workDuration: 25,        // ← Changer ici
  shortBreakDuration: 5,   // ← Changer ici
  longBreakDuration: 15,   // ← Changer ici
  // ...
};
```

### Changer les couleurs du thème
**Fichier** : `frontend/src/styles/theme.ts`
```typescript
primary: {
  main: '#667eea',  // ← Ta couleur principale
},
```

## 🐛 Résolution de problèmes

### Le backend ne démarre pas
```bash
# Vérifier que Java 17+ est installé
java -version

# Nettoyer et réinstaller
cd backend
./mvnw clean install
```

### Le frontend ne démarre pas
```bash
# Réinstaller les dépendances
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Port déjà utilisé
```bash
# Backend - Changer le port dans application.properties
server.port=8081

# Frontend - Vite proposera automatiquement un autre port
```

### CORS errors
Le backend est configuré pour accepter les requêtes de `localhost:5173`.  
Si tu changes le port du frontend, mets à jour la config CORS dans le backend.

## 📚 Documentation complète

- 📖 [README Principal](./README.md)
- 🎨 [Documentation Frontend](./frontend/FRONTEND_README.md)
- ☕ [Documentation Backend](./backend/HELP.md)
- ✅ [Structure Frontend Complète](./FRONTEND_STRUCTURE_COMPLETE.md)

## 🎉 Succès !

Si tu vois le timer Pomodoro avec le cercle animé, c'est que tout fonctionne ! 🍅

**Happy Pomodoro! ⏱️🚀**
