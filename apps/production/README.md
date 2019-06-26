# POP Production

Outil de production de la [Plateforme Ouverte du Patrimoine](https://www.pop.culture.gouv.fr/). Cette application utilise l'[API POP](https://github.com/betagouv/pop/tree/master/apps/api) ainsi qu'une instance d'[Elasticsearch](https://www.elastic.co/fr/products/elasticsearch) pour la recherche libre de notices. Elle est développée en Javascript et est basée sur [React](https://reactjs.org/).

## Installation

NodeJS 8+ doit être installé pour faire fonctionner l'application.

```
git clone https://github.com/betagouv/pop.git
cd pop/apps/production
npm install
```

## Utilisation (locale)

Lancer la commande `npm run dev` pour accéder à l'application via l'URL `http://localhost:8080`. L'application utilise `webpack-dev-server` pour fonctionner en local.

## Tests

Les tests sont pilotés par [Jest](https://jestjs.io/) et [Enzyme](http://airbnb.io/enzyme/), et exécutés à chaque `push` par CircleCi : https://circleci.com/gh/betagouv/pop. Pour lancer les tests en local, utiliser `npm test`.

## Déploiement

Utiliser `npm run deploy:staging` ou `npm run deploy:production` en fonction de l'environnement souhaité.
La branche _master_ est automatiquement livré sur la plateforme de _staging_ et de _prod_ à chaque _push_ grâce à CircleCI. Il est donc recommandé de passer par des _Pull Request_ validées par un tiers.

## Backup

### Database :

Exemple avec la base MNR :

```bash
mongod --dbpath Cluster0-shard-0-1548014151-5c47281a9ccf64a3f50bcc8e mongodump --host 127.0.0.1:27017 --db pop --collection "mnr" mongorestore --host HOST --ssl --username fakeone:) --password fakeone:) --authenticationDatabase admin --drop
```

### How to restore image S3

#### Windows

 - Install s3-pit-restore : `pip3 install s3-pit-restore`
 - Go to local data, find the script and rename it with the `.py` extension
 - Create a `.bat` file in the script folder and add this inside (if you want to see logs) : 

You can get the S3 sub folder at a specific time

```
s3-pit-restore.py -b pop-phototeque -p mnr -d ./mnr -t "02-15-2019 14:55:00 +2" pause
```

 - Then edit the credentiel file if you have multiple projects.
 - Then run it
 - The sync you local folder to the online server

Source :
https://github.com/madisoft/s3-pit-restore
https://medium.com/@ManagedKube/s3-how-to-restore-an-entire-folders-version-74042cca0a9c
