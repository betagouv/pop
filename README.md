# API POP 

[![CircleCI](https://circleci.com/gh/betagouv/pop-api.svg?style=svg)](https://circleci.com/gh/betagouv/pop-api)

L'API de la [Plateforme Ouverte du Patrimoine](http://pop.culture.gouv.fr). Elle fournit un accès aux données à [POP Consultation](https://github.com/betagouv/pop-consultation) et [POP Production](https://github.com/betagouv/pop-production). Elle est développée en Javascript, utilise le framework [Express](https://expressjs.com) et une base de données [MongoDB](https://www.mongodb.com/). La recherche de données est rendue possible grâce à [Elasticsearch](https://www.elastic.co/fr/products/elasticsearch). 

## Installation

MongoDB, NodeJS 10+ et [Yarn](https://yarnpkg.com/en/docs/install) doivent être installés pour faire fonctionner l'application. Elasticsearch n'est pas nécessaire sur l'environnement de développement.

```
git clone https://github.com/betagouv/pop-api.git
cd pop-api
yarn
```

## Utilisation

### Développement local

Lancer la commande `yarn dev` pour accéder à l'application via l'URL `http://localhost:3000`.

### Déploiement

Utiliser `yarn deploy:staging` ou `deploy:staging` en fonction de l'environnement souhaité.

### Documentation base de données

La base de données est documentée [ici](https://github.com/betagouv/pop-api/blob/master/SCHEMAS.md)
et peut être générée avec la commande `yarn export-db-schemas`.

### Elasticsearch

#### Ré-indexation et synchronisation

La modification des _mappings_ nécessite une ré-indexation. 
Utiliser la commande `node src/elasticsearch/sync.js`
pour re-créer l'ensemble des notices depuis MongoDB vers Elasticsearch.
Cette opération utilise les _mappings_ présents dans 
`src/elasticsearch/indices`.

En staging ou en production, préciser les variables
d'environnements sans oublier MongoDB (`DB_ENDPOINT`) :
```
AWS_ACCESS_KEY_ID=x AWS_SECRET_ACCESS_KEY=y ES_ENDPOINT=z DB_ENDPOINT=m node src/elasticsearch/sync.js
```
