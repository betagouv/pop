# API POP 

L'API de la [Plateforme Ouverte du Patrimoine](http://pop.culture.gouv.fr). Elle fournit un accès aux données à [POP Consultation](https://github.com/betagouv/pop-consultation) et [POP Production](https://github.com/betagouv/pop-production). Elle est développée en Javascript, utilise le framework [Express](https://expressjs.com) et une base de données [MongoDB](https://www.mongodb.com/). La recherche de données est rendue possible grâce à [Elasticsearch](https://www.elastic.co/fr/products/elasticsearch).

## Installation

MongoDB, NodeJS 10+ et [Yarn](https://yarnpkg.com/en/docs/install) doivent être installés pour faire fonctionner l'application. Elasticsearch n'est pas nécessaire sur l'environnement de développement.

```
git clone https://github.com/betagouv/pop-api.git
cd pop-api
yarn
```

## Utilisation (locale)

Lancer la commande `yarn dev` pour accéder à l'application via l'URL `http://localhost:3000`.


## Déploiement

Utiliser `yarn deploy:staging` ou `deploy:staging` en fonction de l'environnement souhaité.
