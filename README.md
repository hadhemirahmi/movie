# 🎬 Simple Movies App

> Application React moderne permettant de découvrir les films populaires via l'API TMDB.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=react&logoColor=white)
![TMDB](https://img.shields.io/badge/TMDB-01B4E4?style=for-the-badge&logo=the-movie-database&logoColor=white)

---

## 📌 Description

**Simple Movies App** est une application développée avec **React + Vite** permettant de :

- 🎥 Explorer les films populaires
- 🔍 Rechercher des films
- 📄 Consulter les détails complets
- 🎬 Regarder les bandes-annonces YouTube
- 📱 Profiter d’un design responsive moderne

Ce projet met en pratique :

- React Router
- Zustand (gestion d’état globale)
- API REST (TMDB)
- Hooks React
- Architecture modulaire
- Responsive Design

---


# ✨ Fonctionnalités

## 🔹 Fonctionnalités principales

- 🏠 Page d’accueil avec films populaires
- 🔍 Recherche dynamique
- 📄 Page détails `/movie/:id`
- 🎬 Intégration des trailers YouTube
- ⭐ Affichage des notes TMDB
- 📅 Année de sortie
- 🔄 Gestion du loading
- ❌ Gestion des erreurs API
- 🖼️ Image fallback si poster indisponible

---

# 🛠️ Technologies utilisées

## Frontend

- ⚛️ React 18
- ⚡ Vite
- 🧭 React Router DOM v6
- 🐻 Zustand
- 🎨 CSS3 (Flexbox, Grid)

## API

- 🎬 TMDB API (The Movie Database)

---

# 📁 Structure du projet

simple-movies-app/
│
├── public/
│
├── src/
│ ├── components/
│ │ ├── MovieCard.jsx
│ │ ├── MovieList.jsx
│ │ └── SearchBar.jsx
│ │
│ ├── pages/
│ │ ├── HomePage.jsx
│ │ └── MovieDetailsPage.jsx
│ │
│ ├── store/
│ │ └── movieStore.js
│ │
│ ├── services/
│ │ └── tmdbApi.js
│ │
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
│
├── .env
├── package.json
└── README.md


---

# ⚙️ Installation

## 1️⃣ Cloner le projet

```bash
git clone https://github.com/your-username/simple-movies-app.git
cd simple-movies-app
2️⃣ Installer les dépendances
npm install
3️⃣ Configurer la clé API TMDB
Créer un fichier .env à la racine :

VITE_TMDB_API_KEY=your_api_key_here
👉 Obtenir votre clé API sur :
https://www.themoviedb.org/settings/api

⚠️ Ne jamais commit votre clé API sur GitHub.

4️⃣ Lancer le projet
npm run dev
Ouvrir :

http://localhost:5173