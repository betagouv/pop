# POP

Code source de la [Plateforme Ouverte du Patrimoine](https://pop.culture.gouv.fr/). Cette application est divisée en plusieurs services au sein du même dépôt : 
 - [Interface de consultation](https://github.com/betagouv/pop/tree/master/apps/consultation)
 - [Interface de production](https://github.com/betagouv/pop/tree/master/apps/production)
 - [API](https://github.com/betagouv/pop/tree/master/apps/api) 
 - [Composants partagés](https://github.com/betagouv/pop/tree/master/apps/shared)
 - [Outils data](https://github.com/betagouv/pop/tree/master/apps/shared) 

Il est conseillé de lire le fichier `README.md` de chacun de ces services.

## Installation

NodeJS 8+ et [Yarn](https://yarnpkg.com/en/docs/install) doivent être installés pour faire fonctionner l'application.

```
git clone https://github.com/betagouv/pop.git
cd pop/apps/consultation && yarn install
cd pop/apps/production && yarn install
cd pop/apps/api && yarn install
cd pop/apps/shared && yarn install
cd pop/apps/data && yarn install
```

## Utilisation (locale)

Lancer la commande `yarn dev` pour accéder à l'application.

## Tests

Les tests sont pilotés par [Jest](https://jestjs.io/) et [Enzyme](http://airbnb.io/enzyme/), et exécutés à chaque `push` par CircleCi : https://circleci.com/gh/betagouv/pop. Pour lancer les tests en local, utiliser `yarn test` dans le répertoire du service à tester

## Déploiement

La branche _master_ de chaque service (API, consultation et production) est automatiquement livré sur la plateforme de _staging_ et de _prod_ à chaque _push_ grâce à CircleCI. Il est donc recommandé de passer par des _Pull Request_ validées par un tiers.

## Recherche

Une documentation à propos du fonctionnement de la recherche est [accessible ici](https://github.com/betagouv/pop/blob/master/apps/consultationABOUT_SEARCH.md).
