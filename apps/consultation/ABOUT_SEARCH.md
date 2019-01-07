# À propos de la recherche

La recherche libre est privilégiée dans l'outil de consultation, avec possibilité d'utiliser une auto-complétion et de filtrer grâce à des filtres à facettes.

## Barre de recherche

<img width="1423" alt="capture d ecran 2018-10-29 a 14 58 20" src="https://user-images.githubusercontent.com/1575946/47661681-d2ec9780-db99-11e8-9aca-84dce364718a.png">

La recherche et l'autocomplétion sont faites sur les mêmes règles. Un score est appliqué sur chaque résultat en fonction de différent critères, ce qui déterminera son ordre d'apparition dans les résultats.
 - Si le champ est vide, l'**ensemble des données** de la base sont retournées dans un **ordre arbitraire**.
 - Si l'un des champs `TICO`, `TITRE`, `TITR` et `LEG` d'une notice correspond exactement au terme de recherche (majuscules et accents compris), le score de cette notice est augmenté de **15**. Pour plus d'infos, voir [la documentation d'elasticsearch (Match phrase query)](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query-phrase.html) et [le code source concerné](https://github.com/betagouv/pop-consultation/blob/175835ebfee789c1d1bcb52baa1ebcf53ec9cffd/src/scenes/search/index.js#L285-L290).

Les champs suivants augmentent également le score, si une correspondance floue est trouvée avec ces champs. Le poids de chaque champ dans le score du résultat de recherche est précisé en deuxième colonne :

| Champ | score |
| ---- | --- |
| TICO | 10 |
| AUTR | 10 |
| TITRE | 9 |
| TITR | 9 |
| LEG | 9 |
| LOCA | 9 |
| DENO | 8 |
| DOMN | 8 |
| EDIF | 8 |
| OBJT | 8 |
| REPR | 8 |
| AUTP | 7 |
| SERIE | 7 |
| PDEN | 5 |
| PERS | 4 |
| PAYS | 3 |
| REG | 3 |
| DEP | 3 |
| COM | 3 |
| DATE | 1 |
| EPOQ | 1 |
| SCLE | 1 |
| SCLD | 1 |

Le code source est [disponible ici](https://github.com/betagouv/pop-consultation/blob/master/src/scenes/search/index.js#L293-L317).

À noter :
 - Un analyseur français est utilisé ([plus d'infos sur l'analyseur ici](https://www.elastic.co/guide/en/elasticsearch/reference/6.2/analysis-lang-analyzer.html#french-analyzer)). En simplifiant, cet analyseur ignore les mots de séparation et les articles français, ignore la casse et applique une [racinisation](https://fr.wikipedia.org/wiki/Racinisation) française.
 - L'algorithme de score utilisé est [`most_fields`](https://stackoverflow.com/a/35394607/978690), cela signifie que le score est combiné entre les différents champs. Par exemple, un résultat qui contient "château" dans différents champs aura un score plus élevé qu'un résultat qui contient "château" dans un seul champ (en fonction également des pondérations listées plus haut bien sûr).
 - La notion de "recherche floue" est laissée à la discrétion d'elasticsearch, en prenant en compte toutes les règles énoncées précédemment.
 - Ces règles ne s'appliquent pas à la recherche exacte décrite précédemment (qui a de toute façon un score augmenté de 15).

## Filtres à facettes

<img width="1411" alt="capture d ecran 2018-10-29 a 15 41 54" src="https://user-images.githubusercontent.com/1575946/47661657-c6683f00-db99-11e8-9344-a8da5dddebd6.png">

Les filtres à facettes sur le côté permettent de filtrer les résultats obtenus grâce à la barre de recherche et à limiter les prochaines recherches.

Un filtre à facette est composée de deux parties :
 - La **recherche** permet de rechercher dans la liste des valeurs du filtre (affichées ou non)
 - La **liste des valeurs** contient une liste des valeurs d'un ou plusieurs champs dans un certain ordre.

À noter : 

 - Chaque valeur cochée dans un filtre vient s'ajouter aux autres valeurs cochées de ce même filtre (`OU` logique). Donc si je coche "Soutine" et "Mondrian" dans le filtre auteur, je verrai les œuvres de Soutine et Mondrian (+ je coche de cases, + j'ai de résultats). Si je ne coche aucune case, aucun filtre n'est appliqué. 
 - Les filtres à facettes peuvent réagir à des éléments extérieurs (d'autres filtres ou les résultats de recherche).
 - La recherche à l'intérieur d'un filtre à facettes est basée sur une [analyse _maison_](https://github.com/betagouv/pop-consultation/blob/175835ebfee789c1d1bcb52baa1ebcf53ec9cffd/src/scenes/search/utils.js#L1-L19) insensible à la casse et aux accents, acceptant des caractères avant et après le terme de recherche. Cela permet de proposer dans la liste des valeurs "Picasso", "PICASSO" et "X dit pablo picasso" même si la recherche était simplement "picasso". Cependant, les cases cochées appliqueront un filtre en fonction de la valeur exacte (si je coche "picasso", j'aurai uniquement les résultats dont l'auteur est exactement "picasso").
 - Les valeurs d'un filtre à facettes sont triées par nombre de résultats correspondants (les valeurs du filtre qui concernent plus de résultats sont retournées en premier).
 - Quand un filtre à facette est "fermé" (collapse), il est également annulé.

| Filtre | Champs | Réagit à | Valeurs | 
| ------ | ------ | -------- | -------- |
| Base | BASE | tout sauf lui-même | | 
| Auteur | AUTP, AUTR | tout sauf lui-même | |
| Domaine | DOMN | tout sauf lui-même | |
| Où voir l'oeuvre | REG, COM, LOCA | tout sauf lui-même | |
| Période | PERI | tout sauf lui-même | |
| Contient une image<sup>[1](#myfootnote1)</sup> | CONTIENT_IMAGE | rien | oui, non |
| Est géolocalisé<sup>[2](#myfootnote2)</sup> | POP_CONTIENT_GEOLOCALISATION | rien | oui, non |
| Technique | TECH | tout sauf lui-même | |

<a name="myfootnote1">1</a>: "oui" est automatiquement coché quand on clique sur mosaïque.<br>
<a name="myfootnote2">2</a>: "oui" est automatiquement coché quand on clique sur carte.

## Note finale

Les règles de recherches évoluent constamment en fonction des demandes de manière plus ou moins subie. Quelques jours avant la rédaction de ce documents, les règles étaient très différentes. Il est important de maintenir ce document à jour si on le considère utile.
