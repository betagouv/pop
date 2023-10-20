# POP - Plateforme Ouverte du Patrimoine

[![CircleCI](https://circleci.com/gh/betagouv/pop.svg?style=svg)](https://circleci.com/gh/betagouv/pop)

Code source de la [Plateforme Ouverte du Patrimoine](https://www.pop.culture.gouv.fr/), organisé en plusieurs services : 
 - [Interface de diffusion](https://github.com/betagouv/pop/tree/master/apps/diffusion)
 - [Interface de production](https://github.com/betagouv/pop/tree/master/apps/production)
 - [API](https://github.com/betagouv/pop/tree/master/apps/api) 
 - [Outils data](https://github.com/betagouv/pop/tree/master/apps/data) 

Il est conseillé de lire le fichier `README.md` de chacun de ces services.

## Installation et utilisation

Voir le `README.md` de chacun des services.

## Tests et déploiement

Les tests sont pilotés par [Jest](https://jestjs.io/) et [Enzyme](http://airbnb.io/enzyme/), et exécutés à chaque `push` par CircleCi : https://circleci.com/gh/betagouv/pop. Pour lancer les tests en local, utiliser `npm test` dans le répertoire du service à tester.

La branche _master_ de chaque service (API, diffusion et production) est livrée sur la plateforme de _staging_ et de _prod_ à chaque _push_ grâce à CircleCI. Il est donc recommandé de passer par des _Pull Request_ validées par un tiers.

## Documentations
 - [Interface de diffusion](https://github.com/betagouv/pop/tree/master/apps/diffusion/README.md)
 - [Interface de production](https://github.com/betagouv/pop/tree/master/apps/production/README.md)
 - [API](https://github.com/betagouv/pop/tree/master/apps/api/README.md) 
 - [Outils data](https://github.com/betagouv/pop/tree/master/apps/data/README.md) 
 - [Fonctionnement de la recherche](https://github.com/betagouv/pop/blob/master/apps/diffusion/ABOUT_SEARCH.md)
 - [Base de données](https://github.com/betagouv/pop/blob/master/apps/api/doc/README.md)
 - [Ajouter une carte sur l'accueil](https://github.com/betagouv/pop/blob/master/apps/diffusion/TOPICS.md)
 
