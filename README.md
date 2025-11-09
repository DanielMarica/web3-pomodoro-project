# 🍅 Web3 Pomodoro Project

Application complète de gestion du temps basée sur la technique Pomodoro, avec un frontend React moderne et un backend Spring Boot.

## 📋 Table des matières

- [Vue d'ensemble](#vue-densemble)
- [Fonctionnalités](#fonctionnalités)
- [Architecture](#architecture)
- [Installation](#installation)
- [Démarrage rapide](#démarrage-rapide)
- [Technologies](#technologies)
- [Documentation](#documentation)

## 🎯 Vue d'ensemble

Ce projet est une application web complète permettant de gérer son temps de travail avec la méthode Pomodoro (25 minutes de concentration + 5 minutes de pause). 

### Fonctionnalités principales

✅ **Timer Pomodoro**
- Timer circulaire animé avec compte à rebours
- Modes : Focus, Pause courte, Pause longue
- Contrôles intuitifs (Play/Pause/Reset)
- Notifications sonores et navigateur

✅ **Gestion de tâches**
- Créer, compléter et supprimer des tâches
- Associer les tâches aux sessions Pomodoro
- Compteur de pomodoros par tâche
- Panneau latéral dédié

✅ **Personnalisation**
- Thèmes clair/sombre
- Durées configurables (travail, pauses)
- Notifications sonores activables/désactivables
- Musique de fond (optionnelle)

✅ **Statistiques et historique**
- Nombre de pomodoros complétés
- Temps total de concentration
- Sessions enregistrées
- Tâches terminées

## 🏗️ Architecture

```
web3-pomodoro-project/
├── frontend/          # Application React + TypeScript
│   ├── src/
│   │   ├── components/   # Composants réutilisables
│   │   ├── features/     # Redux slices
│   │   ├── pages/        # Pages principales
│   │   ├── hooks/        # Custom hooks
│   │   ├── services/     # Services API
│   │   └── store/        # Configuration Redux
│   └── public/
│
└── backend/           # API REST Spring Boot
    └── src/
        ├── main/
        │   └── java/
        │       └── com/pomodoro/backend/
        └── resources/
```

## 🚀 Installation

### Prérequis

- **Node.js** 18+ et npm
- **Java** 17+
- **Maven** 3.8+

### Cloner le repository

```bash
git clone https://github.com/DanielMarica/web3-pomodoro-project.git
cd web3-pomodoro-project
```

### Installation du Frontend

```bash
cd frontend
npm install
cp .env.example .env
```

### Installation du Backend

```bash
cd backend
./mvnw clean install
```

## 🎯 Démarrage rapide

### 1. Démarrer le Backend

```bash
cd backend
./mvnw spring-boot:run
```

Le backend sera disponible sur `http://localhost:8080`

### 2. Démarrer le Frontend

```bash
cd frontend
npm run dev
```

Le frontend sera disponible sur `http://localhost:5173`

### 3. Ouvrir l'application

Naviguer vers `http://localhost:5173` dans votre navigateur.

## 🛠️ Technologies

### Frontend
- **React 18** - Framework UI
- **TypeScript** - Typage statique
- **Redux Toolkit** - Gestion d'état
- **Material-UI (MUI)** - Composants UI
- **Vite** - Build tool
- **Axios** - Client HTTP

### Backend
- **Spring Boot 3** - Framework Java
- **Spring Data JPA** - ORM
- **H2 Database** - Base de données en mémoire (dev)
- **Maven** - Gestionnaire de dépendances

## 📚 Documentation

- [Frontend README](./frontend/FRONTEND_README.md) - Documentation détaillée du frontend
- [Backend README](./backend/HELP.md) - Documentation du backend Spring Boot

## 🎨 Captures d'écran

### Timer Principal
Interface du timer Pomodoro avec cercle de progression animé.

### Gestion des Tâches
Panneau latéral pour créer et suivre vos tâches.

### Statistiques
Vue d'ensemble de votre productivité.

## 📝 API Endpoints

### Sessions
- `POST /api/sessions` - Créer une session
- `GET /api/sessions` - Lister toutes les sessions
- `GET /api/sessions/{id}` - Obtenir une session
- `GET /api/sessions/stats` - Obtenir les statistiques

### Tasks
- `POST /api/tasks` - Créer une tâche
- `GET /api/tasks` - Lister toutes les tâches
- `PUT /api/tasks/{id}` - Modifier une tâche
- `DELETE /api/tasks/{id}` - Supprimer une tâche

## 🤝 Contribution

Les contributions sont les bienvenues ! 

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

## 👨‍💻 Auteurs

- **Daniel Marica** - [@DanielMarica](https://github.com/DanielMarica)

## 🙏 Remerciements

- Technique Pomodoro créée par Francesco Cirillo
- Icons par Material-UI
- Design inspiré par les meilleures pratiques UX/UI

---

**Développé avec ❤️ et ☕**
