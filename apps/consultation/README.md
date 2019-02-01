# OBSOLETE: remplacé par diffusion, bientôt supprimé.

# POP Consultation

Outil de consultation public de la [Plateforme Ouverte du Patrimoine](http://pop.culture.gouv.fr/). Cette application utilise l'[API POP](https://github.com/betagouv/pop/tree/master/apps/api) ainsi qu'une instance d'[Elasticsearch](https://www.elastic.co/fr/products/elasticsearch) pour la recherche libre de notices. Elle est développée en Javascript et est basée sur [React](https://reactjs.org/). Le rendu des pages est effectué côté serveur (SSR).

## Installation

NodeJS 8+ doit être installé pour faire fonctionner l'application.

```
git clone https://github.com/betagouv/pop.git
cd pop/apps/consultation
npm install
```

## Utilisation (locale)

Lancer la commande `npm run dev` pour accéder à l'application via l'URL `http://localhost:8081`. Voir le fichier `package.json` pour le détail des commandes.

## Tests

Les tests sont pilotés par [Jest](https://jestjs.io/) et [Enzyme](http://airbnb.io/enzyme/), et exécutés à chaque `push` par CircleCi : https://circleci.com/gh/betagouv/pop. Pour lancer les tests en local, utiliser `npm test`.

## Déploiement

Utiliser `npm run deploy:staging` ou `npm run deploy:production` en fonction de l'environnement souhaité. 
La branche _master_ est automatiquement livré sur la plateforme de _staging_ et de _prod_ à chaque _push_ grâce à CircleCI. Il est donc recommandé de passer par des _Pull Request_ validées par un tiers.

## Recherche

Une documentation à propos du fonctionnement de la recherche est [accessible ici](https://github.com/betagouv/pop/blob/master/apps/consultation/ABOUT_SEARCH.md).
