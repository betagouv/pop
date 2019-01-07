# POP data
Script de mise en ligne des données publiques de [POP](https://beta.gouv.fr/startup/pop.html).

## Usage

### En dev

1. Installer les dépendances `npm i`.
2. Dupliquer le fichier `.env.example` vers `.env` et renseigner les données d'accès à AWS et à la base MongoDB.
3. Lancer le script `npm run dev`

### En prod

1. Installer les dépendances `npm i`.
2. Sur AWS, définir les variables d'environnement telles que décrites sur `.env.example`.
3. Mettre en place un cron(?) pour exécuter le script `npm run prod` quotidiennement(?)

## À propos

Il s'agit pour l'instant d'un script unique (`src/app.js`) qui parcourt toutes 
les collections de la base MongoDB de POP relatives aux données du patrimoine, 
les exporte en CSV et les envoie sur un AWS S3 en France. Il est possible qu'à 
terme, ce soit stocké ailleurs, le script étant facilement(?) adaptable.

Les fichiers générés font parfois plusieurs centaines de milliers de lignes, les temps
de traitement sont assez long et l'espace disque consommé >1GB.

Pour l'instant, aucun traitement n'est fait sur les données, tout est renvoyé "tel quel", 
il faudra bien entendu ne pas tout uploader aveuglément (nettoyage et filtrage des données). 
Par ailleurs, il faudra aussi envoyer les images, ou au moins des liens vers ces images.
