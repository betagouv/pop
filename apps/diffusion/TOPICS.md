# Ajouter une carte dans la page TOPICS

## À savoir

Il y a quelques contraintes, transformons ça en atouts, parfois on s'amuse mieux dans un cadre restreint.

- On ne peut actuellement pas mettre plus de **4 cartes** dans un même sujet sous peine d'avoir un affichage dégradé.
- De la même manière, les titres d'une même section doivent avoir à peu près la **même longueur** pour éviter que des cartes
  se retrouvent à ne pas faire la même taille en hauteur. En effet, si un titre passe sur deux lignes alors que celui d'à côté n'en fait qu'une les cartes ne feront pas la même taille et ce sera moche.

## Comment ajouter une carte

Deux cas d'ajout : 
 - dans une section existante, 
 - ou dans une nouvelle section.

Dans les deux cas il faut se rendre sur cette page : https://github.com/betagouv/pop/blob/master/apps/diffusion/pages/topics.js et cliquer sur modifier (le bouton qui ressemble à un crayon) en haut. Ensuite on fait les modifications en ligne et enfin on clique sur « _Create pull request_ » en bas et on valide en expliquant ce qu'on a fait dans la section commentaires.

Un développeur relira ensuite pour vérifier que tout va bien et pourra livrer.

Inspirez-vous des cartes existantes pour comprendre comment ça marche. Tous les paramètres de recherche sont à passer dans la propriété `params`, les différents exemples déjà présents dans le fichiers montrent plusieurs approches.

### Ajout dans une section existante

Dupliquer une carte en prenant de l'élément `<Col>`, par exemple : 

```jsx
<Col lg="3" md="6">
  <TopicCard
    img={memoireImg("0129/sap01_na23818917r_t.jpg")}
    txt="Atelier Nadar"
    params={{
      base: ["Photographies (Mémoire)"],
      auteur: ["Nadar (atelier)"]
    }}
  />
</Col>
```

Ce qui donne à la fin : 

```jsx
/* ... */

<Col lg="3" md="6">
  <TopicCard
    img={memoireImg("0129/sap01_na23818917r_t.jpg")}
    txt="Atelier Nadar"
    params={{
      base: ["Photographies (Mémoire)"],
      auteur: ["Nadar (atelier)"]
    }}
  />
</Col>

<Col lg="3" md="6">
  <TopicCard
    img={memoireImg("ma-nouvelle-image-sur-memoire.jpg")}
    txt="Mon titre"
    params={{
      base: ["La base (nom complet car c'est un filtre)"],
      auteur: ["tel qu'il est dans la recherche"]
    }}
  />
</Col>

/* ... */
```

### Ajout d'une nouvelle section

Copier-coller le code suivant après une balide `</Row>` et remplacez ce que vous voulez :

```jsx
<h3>Titre de ma section</h3>
<Row>
  <Col lg="3" md="6">
    <TopicCard
      img={memoireImg("ma-nouvelle-image-sur-memoire.jpg")}
      txt="Mon titre"
      params={{
        base: ["La base (nom complet car c'est un filtre)"],
        auteur: ["tel qu'il est dans la recherche"]
      }}
    />
  </Col>
  /* ... */
</Row>
```

Vous pouvez mettre plusieurs cartes exactement comme expliqué dans la section précédente.
