# mon-app

Application Ionic + React + TypeScript construite avec Vite. Le projet prend la forme d’un mini réseau social type Twitter, avec un fil de posts, la création de publication, la recherche, les images, l’audio et la persistance locale des contenus.

## Fonctionnalités

- Fil de posts avec affichage des contenus, avatars et horodatage.
- Création d’un post avec texte, image locale et enregistrement audio.
- Recherche et filtrage des publications.
- Actions interactives sur les posts comme commenter, liker, repartager et supprimer.
- Sauvegarde des posts dans `localStorage` pour conserver les données entre les rechargements.
- Base Capacitor prête pour un déploiement Android.

## Stack technique

- React 19
- Ionic React
- TypeScript
- Vite
- Capacitor
- Cypress pour les tests end-to-end
- Vitest pour les tests unitaires

## Prérequis

- Node.js 18 ou supérieur
- npm

## Installation

```bash
npm install
```

## Scripts disponibles

```bash
npm run dev
```

Lance le serveur de développement Vite.

```bash
npm run build
```

Compile le projet TypeScript puis génère la version de production.

```bash
npm run preview
```

Prévisualise le build localement.

```bash
npm run lint
```

Exécute ESLint sur le projet.

```bash
npm run test.unit
```

Lance les tests unitaires avec Vitest.

```bash
npm run test.e2e
```

Lance les tests end-to-end avec Cypress.

## Démarrage rapide

1. Installer les dépendances avec `npm install`.
2. Lancer l’application avec `npm run dev`.
3. Ouvrir l’URL affichée par Vite, en général `http://localhost:5173`.

## Structure du projet

- `src/App.tsx` : routage principal de l’application.
- `src/pages/Home.tsx` : page d’accueil.
- `src/components/` : composants d’interface comme le header, la création de post et les cartes de post.
- `src/data/mockPosts.ts` : données initiales du feed.
- `public/manifest.json` : configuration PWA/manifest.
- `android/` : projet natif Capacitor pour Android.

## Notes

- Les posts créés sont sauvegardés localement dans le navigateur.
- Le bouton de reset supprime les posts enregistrés dans `localStorage` et recharge les données initiales.
- L’enregistrement audio utilise les APIs navigateur `MediaRecorder` et `getUserMedia`.
