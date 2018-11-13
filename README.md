# POP Consultation

Outil de consultation public de la [Plateforme Ouverte du Patrimoine](http://pop.culture.gouv.fr/). Cette application utilise l'[API POP](https://github.com/betagouv/pop-api) ainsi qu'une instance d'[Elasticsearch](https://www.elastic.co/fr/products/elasticsearch) pour la recherche libre de notices. Elle est développée en Javascript et est basée sur [React](https://reactjs.org/).

## Installation

NodeJS 10+ et [Yarn](https://yarnpkg.com/en/docs/install) doivent être installés pour faire fonctionner l'application.

```
git clone https://github.com/betagouv/pop-consultation.git
cd pop-consultation
yarn
```

## Utilisation (locale)

Lancer la commande `yarn dev` pour accéder à l'application via l'URL `http://localhost:8080`. L'application utilise `webpack-dev-server` pour fonctionner en local.

## Tests

Les tests sont pilotés par [Jest](https://jestjs.io/) et [Enzyme](http://airbnb.io/enzyme/), et exécutés à chaque `push` par CircleCi : https://circleci.com/gh/betagouv/pop-consultation. Pour lancer les tests en local, utiliser `yarn test`.

## Déploiement

Utiliser `yarn deploy:staging` ou `yarn deploy:production` en fonction de l'environnement souhaité. 
La branche _master_ est automatiquement livré sur la plateforme de _staging_ à chaque _push_ grâce à CircleCI.

## Recherche

Une documentation à propos du fonctionnement de la recherche est [accessible ici](https://github.com/betagouv/pop-consultation/blob/master/ABOUT_SEARCH.md).
