# 🍅 Pomodoro Timer - Frontend

Application frontend moderne de gestion de temps basée sur la technique Pomodoro, développée avec React, TypeScript, Redux Toolkit et Material-UI.

## ✨ Fonctionnalités

- ⏱️ **Timer Pomodoro** avec animations circulaires
- 📋 **Gestion de tâches** avec panneau latéral
- 🎨 **Thèmes clair/sombre** personnalisables
- 🔊 **Notifications sonores** pour les fins de sessions
- 📊 **Statistiques** et historique des sessions
- 🎵 **Musique de fond** (optionnelle)
- 💾 **Persistance locale** des données
- 📱 **Design responsive** pour mobile et desktop

## 🛠️ Technologies utilisées

- **React 18** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Redux Toolkit** - Gestion d'état
- **Material-UI (MUI)** - Composants UI
- **Vite** - Build tool rapide
- **Axios** - Client HTTP
- **React Hooks** - Logique réutilisable

## 📁 Structure du projet

```
src/
├── api/                    # Configuration Axios
├── components/             # Composants réutilisables
│   ├── common/            # Boutons, Dropdown, etc.
│   ├── layout/            # Header, MainLayout
│   ├── settings/          # TimeSelector, ThemeSelector
│   ├── tasks/             # TaskList, TaskItem, TaskSidebar
│   └── timer/             # CircularTimer, TimerDisplay, TimerControls
├── features/              # Redux slices
│   ├── settings/          # Paramètres
│   ├── sessions/          # Historique
│   ├── tasks/             # Tâches
│   └── timer/             # Timer
├── hooks/                 # Custom hooks
├── pages/                 # Pages principales
├── services/              # Services API
├── store/                 # Configuration Redux
├── styles/                # Thèmes et styles globaux
├── types/                 # Types TypeScript
└── utils/                 # Fonctions utilitaires
```

## 🚀 Installation

1. **Installer les dépendances**
```bash
npm install
```

2. **Configurer les variables d'environnement**
```bash
cp .env.example .env
```

Éditer `.env` :
```env
VITE_API_URL=http://localhost:8080/api
```

3. **Ajouter les fichiers audio** (optionnel)

Placer vos fichiers audio dans `public/sounds/` :
- `work-complete.mp3` - Son de fin de pomodoro
- `break-complete.mp3` - Son de fin de pause
- `tick.mp3` - Tic-tac d'horloge

## 🎯 Lancement

### Mode développement
```bash
npm run dev
```
L'application sera disponible sur `http://localhost:5173`

### Build pour production
```bash
npm run build
```

### Prévisualiser le build
```bash
npm run preview
```

## 🎨 Personnalisation

### Modifier les durées par défaut
Éditer `src/features/settings/settingsSlice.ts` :
```typescript
const initialState: SettingsState = {
  workDuration: 25,        // Minutes de travail
  shortBreakDuration: 5,   // Pause courte
  longBreakDuration: 15,   // Pause longue
  // ...
};
```

### Personnaliser le thème
Éditer `src/styles/theme.ts` pour modifier les couleurs, polices, etc.

## 📝 Scripts disponibles

- `npm run dev` - Démarrer le serveur de développement
- `npm run build` - Build pour production
- `npm run preview` - Prévisualiser le build
- `npm run lint` - Linter le code

## 🔗 Intégration avec le backend

L'application communique avec le backend Java Spring Boot via Axios.  
Les endpoints sont configurés dans `src/api/endpoints.ts`.

### Endpoints principaux :
- `POST /api/sessions` - Enregistrer une session
- `GET /api/sessions` - Récupérer l'historique
- `POST /api/tasks` - Créer une tâche
- `GET /api/tasks` - Lister les tâches

## 🎓 Utilisation

1. **Démarrer le timer** - Cliquer sur le bouton Play
2. **Ajouter des tâches** - Cliquer sur l'icône de liste en haut à droite
3. **Personnaliser** - Ajuster les durées et le thème sur la page d'accueil
4. **Consulter les stats** - Menu hamburger → Statistiques

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésite pas à ouvrir une issue ou une pull request.

## 📄 Licence

MIT

---

Développé avec ❤️ par ton équipe Pomodoro
