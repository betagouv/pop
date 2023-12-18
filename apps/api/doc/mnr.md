# POP SCHEMAS mnr

- [PRODUCTEUR](/apps/api/doc/mnr.md#PRODUCTEUR)
- [BASE](/apps/api/doc/mnr.md#BASE)
- [CONTIENT_IMAGE](/apps/api/doc/mnr.md#CONTIENT_IMAGE)
- [POP_FLAGS](/apps/api/doc/mnr.md#POP_FLAGS)
- [REF](/apps/api/doc/mnr.md#REF)
- [POP_IMPORT](/apps/api/doc/mnr.md#POP_IMPORT)
- [NET](/apps/api/doc/mnr.md#NET)
- [AUTR](/apps/api/doc/mnr.md#AUTR)
- [PAUT](/apps/api/doc/mnr.md#PAUT)
- [ATTR](/apps/api/doc/mnr.md#ATTR)
- [ECOL](/apps/api/doc/mnr.md#ECOL)
- [TITR](/apps/api/doc/mnr.md#TITR)
- [ATIT](/apps/api/doc/mnr.md#ATIT)
- [PTIT](/apps/api/doc/mnr.md#PTIT)
- [DENO](/apps/api/doc/mnr.md#DENO)
- [DESC](/apps/api/doc/mnr.md#DESC)
- [DOMN](/apps/api/doc/mnr.md#DOMN)
- [LOCA](/apps/api/doc/mnr.md#LOCA)
- [INSC](/apps/api/doc/mnr.md#INSC)
- [MARQ](/apps/api/doc/mnr.md#MARQ)
- [OBSE](/apps/api/doc/mnr.md#OBSE)
- [ETAT](/apps/api/doc/mnr.md#ETAT)
- [GENE](/apps/api/doc/mnr.md#GENE)
- [PROV](/apps/api/doc/mnr.md#PROV)
- [HIST](/apps/api/doc/mnr.md#HIST)
- [HIST2](/apps/api/doc/mnr.md#HIST2)
- [HIST3](/apps/api/doc/mnr.md#HIST3)
- [HIST4](/apps/api/doc/mnr.md#HIST4)
- [SALLES](/apps/api/doc/mnr.md#SALLES)
- [CARTELS](/apps/api/doc/mnr.md#CARTELS)
- [SCLE](/apps/api/doc/mnr.md#SCLE)
- [STYL](/apps/api/doc/mnr.md#STYL)
- [MILL](/apps/api/doc/mnr.md#MILL)
- [TECH](/apps/api/doc/mnr.md#TECH)
- [DIMS](/apps/api/doc/mnr.md#DIMS)
- [VIDEO](/apps/api/doc/mnr.md#VIDEO)
- [INV](/apps/api/doc/mnr.md#INV)
- [EXPO](/apps/api/doc/mnr.md#EXPO)
- [BIBL](/apps/api/doc/mnr.md#BIBL)
- [AATT](/apps/api/doc/mnr.md#AATT)
- [AUTI](/apps/api/doc/mnr.md#AUTI)
- [CATE](/apps/api/doc/mnr.md#CATE)
- [RCL](/apps/api/doc/mnr.md#RCL)
- [NOTE](/apps/api/doc/mnr.md#NOTE)
- [REDC](/apps/api/doc/mnr.md#REDC)
- [DREP](/apps/api/doc/mnr.md#DREP)
- [PREP](/apps/api/doc/mnr.md#PREP)
- [REPR](/apps/api/doc/mnr.md#REPR)
- [SREP](/apps/api/doc/mnr.md#SREP)
- [REFIM](/apps/api/doc/mnr.md#REFIM)
- [DMAJ](/apps/api/doc/mnr.md#DMAJ)
- [DMIS](/apps/api/doc/mnr.md#DMIS)
- [AFFE](/apps/api/doc/mnr.md#AFFE)
- [NUMS](/apps/api/doc/mnr.md#NUMS)
- [SUITE](/apps/api/doc/mnr.md#SUITE)
- [COMM](/apps/api/doc/mnr.md#COMM)
- [NOTE2](/apps/api/doc/mnr.md#NOTE2)
- [RESUME](/apps/api/doc/mnr.md#RESUME)
- [PHOT](/apps/api/doc/mnr.md#PHOT)
- [HISTORIQUE](/apps/api/doc/mnr.md#HISTORIQUE)
- [RENV](/apps/api/doc/mnr.md#RENV)
- [_id](/apps/api/doc/mnr.md#_id)
- [__v](/apps/api/doc/mnr.md#__v)
### PRODUCTEUR
Producteur de la donnée : Valeur MNR




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|oui|non|non|||||||||

### BASE
Valeur Rose Valland (MNR-Jeu de Paume)




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|oui|non|non||Nom de la base|||||||

### CONTIENT_IMAGE
Champ généré à chaque sauvegarde de la notice. Si notice contient des images, la valeur du champs sera oui', sinon 'non'. Ce champs est utilisé pour l'affichage de la phototèque mais pourrait être supprimé et remplacer par une fonction exist dans ES




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|oui|oui|non|||||||||

### POP_FLAGS
Informations et avertissements techniques




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|Array|non|oui|non|non||Alertes POP|||||||

### REF
Référence unique de la notice




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|oui|non|non|non||Référence|||||||

### POP_IMPORT





|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|Array|non|non|non|non|||||||||

### NET
[PAS AFFICHE]




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|non|oui|non||Présence sur site internet du musée ; date|||||||

### AUTR
Auteur / exécutant / collecteur




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|Array|non|non|non|non||Auteur / exécutant / collecteur|||||||

### PAUT
Précisions auteur




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|non|non|non||Précisions auteur|||||||

### ATTR
Anciennes attributions




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|non|non|non||Anciennes attributions|||||||

### ECOL
Ecole 




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|non|non|non||Ecole|||||||

### TITR
Titre 




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|non|non|non||Titre|||||||

### ATIT
Ancien titre




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|non|non|non||Ancien titre|||||||

### PTIT
Précision titre




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|non|non|non||Précision titre|||||||

### DENO
Dénomination du bien


Thésaurus : http://data.culture.fr/thesaurus/resource/ark:/67717/T96 



|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|Array|non|non|non|non||Dénomination du bien|http://data.culture.fr/thesaurus/resource/ark:/67717/T96||||||

### DESC
Description 




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|non|non|non||Description|||||||

### DOMN
Domaine (catégorie du bien)




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|Array|non|non|non|non||Domaine|||||||

### LOCA
Localisation 




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|non|non|non||Localisation|||||||

### INSC
Inscriptions 




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|non|non|non||Inscriptions|||||||

### MARQ
Marques 




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|non|non|non||Marques|||||||

### OBSE
Observations 




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|non|non|non||Observations|||||||

### ETAT
Etat de conservation




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|non|non|non||Etat de conservation|||||||

### GENE
Genèse 




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|non|non|non||Genèse|||||||

### PROV
Provenance 




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|non|non|non||Provenance|||||||

### HIST
Historique 




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|non|non|non||Historique|||||||

### HIST2
[PAS AFFICHE]




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|non|oui|non|||||||||

### HIST3
[PAS AFFICHE]




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|non|oui|non|||||||||

### HIST4
[PAS AFFICHE]




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|non|oui|non||Restitution|||||||

### SALLES
[PAS AFFICHE]




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|non|oui|non||Exposé en salles, à telle date|||||||

### CARTELS
[PAS AFFICHE]




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|non|oui|non||Formulation des cartels (fautive ou non, à telle date)|||||||

### SCLE
Siècle 




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|Array|non|non|non|non||Siècle |||||||

### STYL
Style 




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|non|non|non||Style|||||||

### MILL
Millénaire 




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|non|non|non||Millénaire|||||||

### TECH
Technique 




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|Array|non|non|non|non||Technique|||||||

### DIMS
Dimensions 




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|Array|non|non|non|non||Dimensions|||||||

### VIDEO
Champ qui contient les images




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|Array|non|non|oui|non||Champ qui contient les images|||||||

### INV
N°Inventaire, ancien(s) numéros(s), autres numéros, N° de dépôt




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|non|non|non||N°Inventaire|||||||

### EXPO
Exposition 




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|non|non|non||Exposition|||||||

### BIBL
Bibliographie 




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|non|non|non||Bibliographie|||||||

### AATT
Ancienne attribution




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|non|non|non||Ancienne attribution|||||||

### AUTI
Autre titre




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|non|non|non||Autre titre|||||||

### CATE
Catégorie 




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|non|non|non||Catégorie|||||||

### RCL
[PAS AFFICHE]




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|non|oui|non||Récolé, date|||||||

### NOTE
Notes 




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|non|non|non||Notes|||||||

### REDC
Rédacteurs 




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|Array|non|non|non|non||Rédacteurs|||||||

### DREP
Date de la représentation




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|non|non|non||Date de la représentation|||||||

### PREP
Précisions sur la représentation




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|non|non|non||Précisions sur la représentation|||||||

### REPR
Représentation 




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|non|non|non||Représentation|||||||

### SREP
Sujet de la représentation (source littéraire ou musicale) 




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|non|non|non||Sujet de la représentation (source littéraire ou musicale) |||||||

### REFIM
Adresses images jointes générique (actuellement non utilisé)




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|non|non|non||Adresses images jointes générique (actuellement non utilisé)|||||||

### DMAJ
Date de la dernière mise à jour




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|oui|non|non||Date de la dernière mise à jour|||||||

### DMIS
Date de la création POP/Mistral




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|oui|non|non||Date de la création POP/Mistral|||||||

### AFFE
Etablissement affectataire qui existe dans d’autres bases




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|non|non|non||Etablissement affectataire|||||||

### NUMS
Autres numéros




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|non|non|non||Autres numéros|||||||

### SUITE
OEuvres liées, ensemble




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|non|non|non||OEuvres liées, ensemble|||||||

### COMM
Commentaire 




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|non|non|non||Commentaire|||||||

### NOTE2
[PAS AFFICHE]




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|non|oui|non||Avertissement|||||||

### RESUME
Résumé 




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|non|non|non||Résumé|||||||

### PHOT
Droits de copie photo 




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|String|non|non|non|non||Droits de copie photo|||||||

### HISTORIQUE





|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|Array|non|non|non|non|||||||||

### RENV
Numéro de renvoi vers un autre domaine. Doit être une référence valide vers une notice MNR.




|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|Array|non|non|non|non||Numéro de renvoi vers un autre domaine|||||||

### _id





|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|ObjectID|non|non|non|non|||||||||

### __v





|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|Thesaurus|Label MH|Liste Autorité|Id Thésaurus|Label INI-CM| Label INI-D|
|----|------|------|------|--------|----------|-----|---|---|---|----|---|---|
|Number|non|non|non|non|||||||||
