# POP Production

Outil de production de la [Plateforme Ouverte du Patrimoine](https://pop.culture.gouv.fr/). Cette application utilise l'[API POP](https://github.com/betagouv/pop/tree/master/apps/api) ainsi qu'une instance d'[Elasticsearch](https://www.elastic.co/fr/products/elasticsearch) pour la recherche libre de notices. Elle est développée en Javascript et est basée sur [React](https://reactjs.org/).

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


## How to backup

Exemple avec la base MNR : 

`
mongod --dbpath Cluster0-shard-0-1548014151-5c47281a9ccf64a3f50bcc8e
mongodump --host 127.0.0.1:27017 --db pop --collection "mnr"
mongorestore --host Staging-shard-0/staging-shard-00-00-fkthi.mongodb.net:27017,staging-shard-00-01-fkthi.mongodb.net:27017,staging-shard-00-02-fkthi.mongodb.net:27017 --ssl --username fakeone:) --password fakeone:) --authenticationDatabase admin --drop 
`