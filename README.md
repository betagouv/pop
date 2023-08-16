# POP - Plateforme Ouverte du Patrimoine

[![CircleCI](https://circleci.com/gh/betagouv/pop.svg?style=svg)](https://circleci.com/gh/betagouv/pop)

Code source de la [Plateforme Ouverte du Patrimoine](https://www.pop.culture.gouv.fr/), organisé en plusieurs services : 
 - [Interface de diffusion](https://github.com/betagouv/pop/tree/master/apps/diffusion)
 - [Interface de production](https://github.com/betagouv/pop/tree/master/apps/production)
 - [API](https://github.com/betagouv/pop/tree/master/apps/api) 
 - [Outils data](https://github.com/betagouv/pop/tree/master/apps/data) 

Il est conseillé de lire le fichier `README.md` de chacun de ces services.

## Installation et utilisation

0) Un fichier docker-compose est présent pour provisionner un elastic search et une base mongo-db en local. Pour lancer la stack:
```bash
docker-compose up -d
``` 

1) Créer les fichiers .env à partir des fichiers .env-default présent dans chaque apps (api, diffusion, production)

==> Il faut maintenant installer un dump de mongodb depuis staging. 
Pour se faire, il faut demander à une personne de l'équipe de dumper la base pour importer ce dump dans la base locale.
==> Il faut executer le script de création d'index elastic search
(depuis le dossier apps/api)
```bash
nvm use && node ./srcelasticsearch/sync
```

2) lancer l'api puis les projet diffusion & production

api:
```bash
nvm use && npm run dev
```
diffusion (next.js):
```bash
nvm use && npx next dev
```
production:
```bash
nvm use && npm run dev
```


Voir le `README.md` de chacun des services pour plus de détails.

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
