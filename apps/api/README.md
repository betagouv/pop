# API POP

L'API de la [Plateforme Ouverte du Patrimoine](https://pop.culture.gouv.fr). Elle fournit un accès aux données à [POP Diffusion](https://github.com/betagouv/pop/tree/master/apps/diffusion) et [POP Production](https://github.com/betagouv/pop/tree/master/apps/production). Elle est développée en Javascript, utilise le framework [Express](https://expressjs.com) et une base de données [MongoDB](https://www.mongodb.com/). La recherche de données est rendue possible grâce à [Elasticsearch](https://www.elastic.co/fr/products/elasticsearch).

## Installation

MongoDB et NodeJS 8+ doivent être installés pour faire fonctionner l'application. Elasticsearch n'est pas nécessaire sur l'environnement de développement.

```
git clone https://github.com/betagouv/pop.git
cd pop/apps/api
npm install
```

## Utilisation

### Développement local

Lancer la commande `npm run dev` pour accéder à l'application via l'URL `http://localhost:3000`.

### Déploiement

Utiliser `npm run deploy:staging` ou `deploy:staging` en fonction de l'environnement souhaité.

### Documentation base de données

La base de données est documentée [ici](https://github.com/betagouv/pop/tree/master/apps/api/doc/README.md)
et peut être générée avec la commande `npm run export-db-schemas`.

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

#### Supprimer un index
```
AWS_ACCESS_KEY_ID=x AWS_SECRET_ACCESS_KEY=y ES_ENDPOINT=z node src/elasticsearch/delete.js myindex1
```

### Développement de l'API

 - Respecter les recommandations pour une API REST.
 - Utiliser les bons statuts (400, 401, 404, 200) dans les réponses et les vérifier dans les appels côté client.
 - Au minimum, renvoyer un objet JSON avec `{ success: true }` et à défaut d'autre chose on envoie un texte explicatif dans `msg`, par exemple : `{ success: true, msg: "Le doc a été créé."}`. Exception : dans le cas d'un appel `GET` sur un document : on peut renvoyer directement le document en cas de succès.
 - Renvoyer le document concerné dans les requêtes PUT, POST et DELETE si possible.
 - Capturer les erreurs (sentry) en cas de 500.


### Scripts
```
npm run export:schemas
```
Genere la documentation du modèle de donnée en markdown dans `/api/doc`

```
npm run export:mapping
```
Genere le fichier de mapping du modèle de donnée utilisé par la production et la diff. Ce fichier est en quelque sorte la clef de voute des donnée du projet POP.

```
npm run export:csv
```
Permet de généré le modèle de donnée en csv.
