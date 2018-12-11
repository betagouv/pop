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

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### BASE
Nom de la base : Valeur Récupération artistique (MNR Rose-Valland)

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### CONTIENT_IMAGE
Champ généré à chaque sauvegarde de la notice. Si notice contient des images, la valeur du champs sera oui', sinon 'non'. Ce champs est utilisé pour l'affichage de la phototèque mais pourrait être supprimé et remplacer par une fonction exist dans ES

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### REF
Référence unique de la notice

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### POP_IMPORT


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### TOUT
[PAS AFFICHE]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### AUTR
Auteur /exécutant / collecteur

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|true|false|

### PAUT
Precisions auteur

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### ATTR
Anciennes attributions

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### ECOL
Ecole 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### TITR
Titre 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### ATIT
Ancien titre

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### PTIT
Précision titre

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### DENO
Dénomination du bien

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|true|false|

### DESC
Description 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### DOMN
Domaine (catégorie du bien)

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|true|false|

### LOCA
Localisation 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### INSC
Inscriptions 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### MARQ
Marques 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### OBSE
Observations 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### ETAT
Etat de conservation

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### GENE
Genèse 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### PROV
Provenance 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### HIST
Historique 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### HIST2
[PAS AFFICHE]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### HIST3
[PAS AFFICHE]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### HIST4
[PAS AFFICHE]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### HIST5
[PAS AFFICHE]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### HIST6
[PAS AFFICHE]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### SCLE
Siècle 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|true|false|

### STYL
Style 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### MILL
Millenaire 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### TECH
Technique 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|true|false|

### DIMS
Dimensions 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|true|false|

### VIDEO
Champ qui contient les images

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|true|false|

### INV
N°Inventaire, ancien(s) numéros(s), autres numéros, N° de dépôt

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### EXPO
Exposition 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### BIBL
Bibliographie 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### AATT
Ancienne attribution

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### AUTI
Autre titre

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### CATE
Catégorie 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### CATE_DEPREC
[PAS AFFICHE]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### NOTE
Notes 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### REDC
Rédacteurs 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|true|false|

### DREP
Date de la représentation

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### PREP
Précisions sur la représentation

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### REPR
Représentation 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### SREP
Sujet de la représentation (source littéraire ou musicale) 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### REFIM
Adresses images jointes générique (actuellement non utilisé)

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### DMAJ
Date de la dernière mise à jour

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### DMIS
Date de la création POP/Mistral

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### AFFE
Etablissement affectataire qui existe dans d’autres bases

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### NUMS
Autres numéros

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### SUITE
OEuvres liées, ensemble

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### COMM
Commentaire 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### NOTE2
[PAS AFFICHE]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### RESUME
Résumé 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### PHOT
Droits de copie photo 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### _id


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|ObjectID|false|false|false|

### __v


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Number|false|false|false|
