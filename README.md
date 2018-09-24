# POP Production

Outil de production de la [Plateforme Ouverte du Patrimoine](http://pop.culture.gouv.fr/). Cette application utilise l'[API POP](https://github.com/betagouv/pop-api) ainsi qu'une instance d'[Elasticsearch](https://www.elastic.co/fr/products/elasticsearch) pour la recherche libre de notices. Elle est développée en Javascript et est basée sur [React](https://reactjs.org/).

## Installation

NodeJS 10+ et [Yarn](https://yarnpkg.com/en/docs/install) doivent être installés pour faire fonctionner l'application.

```
git clone https://github.com/betagouv/pop-production.git
cd pop-production
yarn
```

## Utilisation (locale)

Lancer la commande `yarn dev` pour accéder à l'application via l'URL `http://localhost:8080`. L'application utilise `webpack-dev-server` pour fonctionner en local.

## Déploiement

Utiliser `yarn deploy:staging` ou `deploy:staging` en fonction de l'environnement souhaité.
