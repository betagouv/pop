# POP SCHEMAS mnr

- [PRODUCTEUR](/doc/mnr.md#PRODUCTEUR)
- [BASE](/doc/mnr.md#BASE)
- [CONTIENT_IMAGE](/doc/mnr.md#CONTIENT_IMAGE)
- [REF](/doc/mnr.md#REF)
- [POP_IMPORT](/doc/mnr.md#POP_IMPORT)
- [TOUT](/doc/mnr.md#TOUT)
- [AUTR](/doc/mnr.md#AUTR)
- [PAUT](/doc/mnr.md#PAUT)
- [ATTR](/doc/mnr.md#ATTR)
- [ECOL](/doc/mnr.md#ECOL)
- [TITR](/doc/mnr.md#TITR)
- [ATIT](/doc/mnr.md#ATIT)
- [PTIT](/doc/mnr.md#PTIT)
- [DENO](/doc/mnr.md#DENO)
- [DESC](/doc/mnr.md#DESC)
- [DOMN](/doc/mnr.md#DOMN)
- [LOCA](/doc/mnr.md#LOCA)
- [INSC](/doc/mnr.md#INSC)
- [MARQ](/doc/mnr.md#MARQ)
- [OBSE](/doc/mnr.md#OBSE)
- [ETAT](/doc/mnr.md#ETAT)
- [GENE](/doc/mnr.md#GENE)
- [PROV](/doc/mnr.md#PROV)
- [HIST](/doc/mnr.md#HIST)
- [HIST2](/doc/mnr.md#HIST2)
- [HIST3](/doc/mnr.md#HIST3)
- [HIST4](/doc/mnr.md#HIST4)
- [HIST5](/doc/mnr.md#HIST5)
- [HIST6](/doc/mnr.md#HIST6)
- [SCLE](/doc/mnr.md#SCLE)
- [STYL](/doc/mnr.md#STYL)
- [MILL](/doc/mnr.md#MILL)
- [TECH](/doc/mnr.md#TECH)
- [DIMS](/doc/mnr.md#DIMS)
- [VIDEO](/doc/mnr.md#VIDEO)
- [INV](/doc/mnr.md#INV)
- [EXPO](/doc/mnr.md#EXPO)
- [BIBL](/doc/mnr.md#BIBL)
- [AATT](/doc/mnr.md#AATT)
- [AUTI](/doc/mnr.md#AUTI)
- [CATE](/doc/mnr.md#CATE)
- [CATE_DEPREC](/doc/mnr.md#CATE_DEPREC)
- [NOTE](/doc/mnr.md#NOTE)
- [REDC](/doc/mnr.md#REDC)
- [DREP](/doc/mnr.md#DREP)
- [PREP](/doc/mnr.md#PREP)
- [REPR](/doc/mnr.md#REPR)
- [SREP](/doc/mnr.md#SREP)
- [REFIM](/doc/mnr.md#REFIM)
- [DMAJ](/doc/mnr.md#DMAJ)
- [DMIS](/doc/mnr.md#DMIS)
- [AFFE](/doc/mnr.md#AFFE)
- [NUMS](/doc/mnr.md#NUMS)
- [SUITE](/doc/mnr.md#SUITE)
- [COMM](/doc/mnr.md#COMM)
- [NOTE2](/doc/mnr.md#NOTE2)
- [RESUME](/doc/mnr.md#RESUME)
- [PHOT](/doc/mnr.md#PHOT)
- [_id](/doc/mnr.md#_id)
- [__v](/doc/mnr.md#__v)
### PRODUCTEUR
Producteur de la donnée : Valeur MNR




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|oui|non|||

### BASE
Nom de la base : Valeur Récupération artistique (MNR Rose-Valland)




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|oui|non|||

### CONTIENT_IMAGE
Champ généré à chaque sauvegarde de la notice. Si notice contient des images, la valeur du champs sera oui', sinon 'non'. Ce champs est utilisé pour l'affichage de la phototèque mais pourrait être supprimé et remplacer par une fonction exist dans ES




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|oui|non|||

### REF
Référence unique de la notice




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|oui|non|non|Alphanumeric|Référence|

### POP_IMPORT





|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|Array|non|non|non|||

### TOUT
[PAS AFFICHE]




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|non|non|||

### AUTR
Auteur / exécutant / collecteur




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|Array|non|non|non||Auteur / exécutant / collecteur|

### PAUT
Précisions auteur




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|non|non||Précisions auteur|

### ATTR
Anciennes attributions




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|non|non||Anciennes attributions|

### ECOL
Ecole 




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|non|non||Ecole|

### TITR
Titre 




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|non|non||Titre|

### ATIT
Ancien titre




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|non|non||Ancien titre|

### PTIT
Précision titre




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|non|non||Précision titre|

### DENO
Dénomination du bien


Thésaurus : http://data.culture.fr/thesaurus/resource/ark:/67717/T96 



|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|Array|non|non|non||Dénomination du bien|

### DESC
Description 




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|non|non||Description|

### DOMN
Domaine (catégorie du bien)




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|Array|non|non|non||Domaine (catégorie du bien)|

### LOCA
Localisation 




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|non|non||Localisation|

### INSC
Inscriptions 




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|non|non||Inscriptions|

### MARQ
Marques 




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|non|non||Marques|

### OBSE
Observations 




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|non|non||Observations|

### ETAT
Etat de conservation




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|non|non||Etat de conservation|

### GENE
Genèse 




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|non|non||Genèse|

### PROV
Provenance 




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|non|non||Provenance|

### HIST
Historique 




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|non|non||Historique|

### HIST2
[PAS AFFICHE]




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|non|non|||

### HIST3
[PAS AFFICHE]




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|non|non|||

### HIST4
[PAS AFFICHE]




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|non|non|||

### HIST5
[PAS AFFICHE]




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|non|non|||

### HIST6
[PAS AFFICHE]




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|non|non|||

### SCLE
Siècle 




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|Array|non|non|non||Siècle |

### STYL
Style 




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|non|non||Style|

### MILL
Millénaire 




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|non|non||Millénaire|

### TECH
Technique 




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|Array|non|non|non||Technique|

### DIMS
Dimensions 




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|Array|non|non|non||Dimensions|

### VIDEO
Champ qui contient les images




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|Array|non|non|non||Champ qui contient les images|

### INV
N°Inventaire, ancien(s) numéros(s), autres numéros, N° de dépôt




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|non|non||N°Inventaire, ancien(s) numéros(s), autres numéros, N° de dépôt|

### EXPO
Exposition 




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|non|non||Exposition|

### BIBL
Bibliographie 




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|non|non||Bibliographie|

### AATT
Ancienne attribution




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|non|non||Ancienne attribution|

### AUTI
Autre titre




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|non|non||Autre titre|

### CATE
Catégorie 




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|non|non||Catégorie|

### CATE_DEPREC
[PAS AFFICHE]




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|non|non|||

### NOTE
Notes 




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|non|non||Notes|

### REDC
Rédacteurs 




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|Array|non|non|non||Rédacteurs|

### DREP
Date de la représentation




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|non|non||Date de la représentation|

### PREP
Précisions sur la représentation




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|non|non||Précisions sur la représentation|

### REPR
Représentation 




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|non|non||Représentation|

### SREP
Sujet de la représentation (source littéraire ou musicale) 




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|non|non||Sujet de la représentation (source littéraire ou musicale) |

### REFIM
Adresses images jointes générique (actuellement non utilisé)




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|non|non||Adresses images jointes générique (actuellement non utilisé)|

### DMAJ
Date de la dernière mise à jour




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|oui|non||Date de la dernière mise à jour|

### DMIS
Date de la création POP/Mistral




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|oui|non||Date de la création POP/Mistral|

### AFFE
Etablissement affectataire qui existe dans d’autres bases




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|non|non||Etablissement affectataire qui existe dans d’autres bases|

### NUMS
Autres numéros




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|non|non||Autres numéros|

### SUITE
OEuvres liées, ensemble




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|non|non||OEuvres liées, ensemble|

### COMM
Commentaire 




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|non|non||Commentaire|

### NOTE2
[PAS AFFICHE]




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|non|non|||

### RESUME
Résumé 




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|non|non||Résumé|

### PHOT
Droits de copie photo 




|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|String|non|non|non||Droits de copie photo|

### _id





|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|ObjectID|non|non|non|||

### __v





|Type|Requis|Généré|Opendata|Validation|Label|
|----|------|------|--------|----------|-----|
|Number|non|non|non|||
