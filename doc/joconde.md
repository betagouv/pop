# POP SCHEMAS joconde

- [PRODUCTEUR](/doc/joconde.md#PRODUCTEUR)
- [BASE](/doc/joconde.md#BASE)
- [CONTIENT_IMAGE](/doc/joconde.md#CONTIENT_IMAGE)
- [POP_COORDONNEES.lat](/doc/joconde.md#POP_COORDONNEES.lat)
- [POP_COORDONNEES.lon](/doc/joconde.md#POP_COORDONNEES.lon)
- [POP_CONTIENT_GEOLOCALISATION](/doc/joconde.md#POP_CONTIENT_GEOLOCALISATION)
- [REF](/doc/joconde.md#REF)
- [POP_IMPORT](/doc/joconde.md#POP_IMPORT)
- [REFMIS](/doc/joconde.md#REFMIS)
- [ADPT](/doc/joconde.md#ADPT)
- [APPL](/doc/joconde.md#APPL)
- [APTN](/doc/joconde.md#APTN)
- [ATTR](/doc/joconde.md#ATTR)
- [AUTR](/doc/joconde.md#AUTR)
- [BIBL](/doc/joconde.md#BIBL)
- [COMM](/doc/joconde.md#COMM)
- [CONTACT](/doc/joconde.md#CONTACT)
- [COOR](/doc/joconde.md#COOR)
- [COPY](/doc/joconde.md#COPY)
- [DACQ](/doc/joconde.md#DACQ)
- [DATA](/doc/joconde.md#DATA)
- [DATION](/doc/joconde.md#DATION)
- [DDPT](/doc/joconde.md#DDPT)
- [DECV](/doc/joconde.md#DECV)
- [DENO](/doc/joconde.md#DENO)
- [DEPO](/doc/joconde.md#DEPO)
- [DESC](/doc/joconde.md#DESC)
- [DESY](/doc/joconde.md#DESY)
- [DIFFU](/doc/joconde.md#DIFFU)
- [DIMS](/doc/joconde.md#DIMS)
- [DMAJ](/doc/joconde.md#DMAJ)
- [DMIS](/doc/joconde.md#DMIS)
- [DOMN](/doc/joconde.md#DOMN)
- [DREP](/doc/joconde.md#DREP)
- [ECOL](/doc/joconde.md#ECOL)
- [EPOQ](/doc/joconde.md#EPOQ)
- [ETAT](/doc/joconde.md#ETAT)
- [EXPO](/doc/joconde.md#EXPO)
- [GENE](/doc/joconde.md#GENE)
- [GEOHI](/doc/joconde.md#GEOHI)
- [HIST](/doc/joconde.md#HIST)
- [IMAGE](/doc/joconde.md#IMAGE)
- [IMG](/doc/joconde.md#IMG)
- [INSC](/doc/joconde.md#INSC)
- [INV](/doc/joconde.md#INV)
- [LABEL](/doc/joconde.md#LABEL)
- [LABO](/doc/joconde.md#LABO)
- [LARC](/doc/joconde.md#LARC)
- [LIEUX](/doc/joconde.md#LIEUX)
- [LOCA](/doc/joconde.md#LOCA)
- [LOCA2](/doc/joconde.md#LOCA2)
- [LOCA3](/doc/joconde.md#LOCA3)
- [MILL](/doc/joconde.md#MILL)
- [MILU](/doc/joconde.md#MILU)
- [MOSA](/doc/joconde.md#MOSA)
- [MSGCOM](/doc/joconde.md#MSGCOM)
- [MUSEO](/doc/joconde.md#MUSEO)
- [NSDA](/doc/joconde.md#NSDA)
- [ONOM](/doc/joconde.md#ONOM)
- [PAUT](/doc/joconde.md#PAUT)
- [PDAT](/doc/joconde.md#PDAT)
- [PDEC](/doc/joconde.md#PDEC)
- [PEOC](/doc/joconde.md#PEOC)
- [PERI](/doc/joconde.md#PERI)
- [PERU](/doc/joconde.md#PERU)
- [PHOT](/doc/joconde.md#PHOT)
- [PINS](/doc/joconde.md#PINS)
- [PLIEUX](/doc/joconde.md#PLIEUX)
- [PREP](/doc/joconde.md#PREP)
- [PUTI](/doc/joconde.md#PUTI)
- [RANG](/doc/joconde.md#RANG)
- [REDA](/doc/joconde.md#REDA)
- [REFIM](/doc/joconde.md#REFIM)
- [REPR](/doc/joconde.md#REPR)
- [RETIF](/doc/joconde.md#RETIF)
- [SREP](/doc/joconde.md#SREP)
- [STAT](/doc/joconde.md#STAT)
- [TECH](/doc/joconde.md#TECH)
- [TICO](/doc/joconde.md#TICO)
- [TITR](/doc/joconde.md#TITR)
- [TOUT](/doc/joconde.md#TOUT)
- [UTIL](/doc/joconde.md#UTIL)
- [VIDEO](/doc/joconde.md#VIDEO)
- [WWW](/doc/joconde.md#WWW)
- [LVID](/doc/joconde.md#LVID)
- [_id](/doc/joconde.md#_id)
- [__v](/doc/joconde.md#__v)
### PRODUCTEUR
Producteur de la donnée : MUSEE




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|oui|non||

### BASE
Nom de la base : Collections des musées de France (Joconde)




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|oui|non||

### CONTIENT_IMAGE
Champ généré à chaque sauvegarde de la notice. Si notice contient des images, la valeur du champ sera oui', sinon 'non'. Ce champ est utilisé pour l'affichage de la phototèque mais pourrait être supprimé et remplacer par une fonction exist dans ES




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|oui|non||

### POP_COORDONNEES.lat
Latitude de la notice en WGS84




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|Number|non|oui|non||

### POP_COORDONNEES.lon
Longitude de la notice en WGS84




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|Number|non|oui|non||

### POP_CONTIENT_GEOLOCALISATION
Champ qui permet de savoir si la geolocalisation est disponible ou non




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|oui|non||

### REF
Référence unique de la notice




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|oui|non|non|Alphanumeric|

### POP_IMPORT





|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|Array|non|non|non||

### REFMIS
Référence de mise à jour (marque de la modification de la notice)




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### ADPT
Ancien dépôt / changement d’affectation




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|Array|non|non|non||

### APPL
Appellation




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### APTN
Ancienne appartenance (nom du donateur / testateur/ vendeur) 




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### ATTR
Anciennes attributions




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### AUTR
Auteur / exécutant / collecteur


Thésaurus : http://data.culture.fr/thesaurus/resource/ark:/67717/T513 



|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### BIBL
Bibliographie




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### COMM
Commentaires




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### CONTACT
Lien contact musée




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|oui|non|Email|

### COOR
Coordinateur




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### COPY
Copyright notice




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### DACQ
Date d’acquisition




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### DATA
[Peut être déprécié : Pas affiché en production ni en consultation]  




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### DATION
[Peut être déprécié : Pas affiché en production ni en consultation]  




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### DDPT
Date de dépôt / changement d’affectation




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### DECV
Découverte / collecte / récolte (lieu de découverte / collecte / récolte) ; Type de site ; Méthode de découverte /collecte / récolte ; Date de découverte / collecte / récolte ; Découvreur / collecteur) 


Thésaurus : http://data.culture.fr/thesaurus/resource/ark:/67717/T115 



|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### DENO
Dénomination du bien


Thésaurus : http://data.culture.fr/thesaurus/resource/ark:/67717/T505 



|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|Array|non|non|non||

### DEPO
Dépôt / établissement dépositaire




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### DESC
Description 




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### DESY
[Peut être déprécié : Pas affiché en production ni en consultation]




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### DIFFU
[Peut être déprécié : Pas affiché en production ni en consultation]




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### DIMS
Mesures  / Dimensions




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### DMAJ
Date de la dernière mise à jour




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|oui|non||

### DMIS
Date de la création POP/Mistral




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|oui|non||

### DOMN
Domaine (catégorie du bien) 


Thésaurus : http://data.culture.fr/thesaurus/resource/ark:/67717/T51 



|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|Array|oui|non|non||

### DREP
Date de la représentation




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### ECOL
Ecole 


Thésaurus : http://data.culture.fr/thesaurus/resource/ark:/67717/T517 



|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|Array|non|non|non||

### EPOQ
Epoque /style / mouvement 


Thésaurus : http://data.culture.fr/thesaurus/resource/ark:/67717/T93 



|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|Array|non|non|non||

### ETAT
[surement à nettoyer] Etat du bien. C'est une liste finie de valeurs possibles




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|Array|non|non|non||

### EXPO
Exposition 




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### GENE
Genèse 


Thésaurus : http://data.culture.fr/thesaurus/resource/ark:/67717/T506 



|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|Array|non|non|non||

### GEOHI
Géographie historique




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|Array|non|non|non||

### HIST
Historique – Objets associés 




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### IMAGE
[Je ne sais pas à quoi ce champ sert]  




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### IMG
Contient les images. Le plus souvent généré grâce à REFIM




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|Array|non|oui|non||

### INSC
Inscriptions 


Thésaurus : http://data.culture.fr/thesaurus/resource/ark:/67717/T520 



|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|Array|non|non|non||

### INV
N°Inventaire, ancien(s) numéros(s), autres numéros, N° de dépôt




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|oui|non|non||

### LABEL
Appellation musée de France : logo : Champ ayant toujours la valeur 'Musée de France au sens de la loi n°2002-5 du 4 janvier 2002'




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|oui|non||

### LABO
[Peut être déprécié : Pas affiché en production ni en consultation]




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### LARC
[Peut être déprécié : Pas affiché en production ni en consultation]




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### LIEUX
Lieu de création / d’exécution / d’utilisation


Thésaurus : http://data.culture.fr/thesaurus/resource/ark:/67717/T84 



|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### LOCA
Localisation


Thésaurus : http://data.culture.fr/thesaurus/resource/ark:/67717/T515 



|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### LOCA2
[Peut être déprécié : Pas affiché en production ni en consultation]




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### LOCA3
[Peut être déprécié : Pas affiché en production ni en consultation]




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### MILL
Millésime de création / exécution 




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|Array|non|non|non||

### MILU
Millésime d’utilisation 




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### MOSA
[Peut être déprécié : Pas affiché en production ni en consultation]




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### MSGCOM
[Surement à nettoyer. J'ai vu du code dans ce champ] Lien commande de reproduction et/ou de conditions d’utilisation 




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### MUSEO
Lien Numéro MUSEOFILE




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### NSDA
Numéro de site




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### ONOM
Onomastique




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|Array|non|non|non||

### PAUT
Précisions /auteur / exécutant / collecteur




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### PDAT
[Peut être déprécié : Pas affiché en production ni en consultation]




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### PDEC
Précisions sur la découverte / collecte / récolte




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### PEOC
Période de l’original copié


Thésaurus : http://data.culture.fr/thesaurus/resource/ark:/67717/T521 



|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|Array|non|non|non||

### PERI
Période de création / exécution 


Thésaurus : http://data.culture.fr/thesaurus/resource/ark:/67717/T521 



|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|Array|non|non|non||

### PERU
Période d’utilisation


Thésaurus : http://data.culture.fr/thesaurus/resource/ark:/67717/T521 



|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|Array|non|non|non||

### PHOT
Crédits photographiques




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### PINS
Précisions sur les inscriptions




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### PLIEUX
Précisions sur le lieu de création/ d’exécution / d’utilisation




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### PREP
Précisions sur le sujet représenté 




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|Array|non|non|non||

### PUTI
Précisions sur l’utilisation 




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### RANG
[Peut être déprécié : Pas affiché en production ni en consultation] 




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### REDA
Rédacteur 




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|Array|non|non|non||

### REFIM
Référence image : lien texte/ image : C'est un code qui permet de retrouver l'url de l'image




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### REPR
Sujet représenté 


Thésaurus : http://data.culture.fr/thesaurus/resource/ark:/67717/T523 



|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### RETIF
[Peut être déprécié : Pas affiché en production ni en consultation] 




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### SREP
Source de la représentation


Thésaurus : http://data.culture.fr/thesaurus/resource/ark:/67717/T523 



|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|Array|non|non|non||

### STAT
Statut juridique (type de propriété ; mode d’acquisition ; institution propriétaire (ville quand la commune est propriétaire) ; établissement affectataire




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|Array|oui|non|non||

### TECH
Matériaux et techniques


Thésaurus : http://data.culture.fr/thesaurus/resource/ark:/67717/T516 



|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|Array|non|non|non||

### TICO
[Peut être déprécié : A vérifier. Non présent en production] 




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### TITR
Titre de l'oeuvre 




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### TOUT
[Peut être déprécié : A vérifier. Non présent en production] 




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### UTIL
Utilisation / Destination


Thésaurus : http://data.culture.fr/thesaurus/resource/ark:/67717/T86 



|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|Array|non|non|non||

### VIDEO
[Peut être déprécié : A vérifier]




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|Array|non|non|non||

### WWW
Lien site associé / site complémentaire




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### LVID
Lien video




|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|String|non|non|non||

### _id





|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|ObjectID|non|non|non||

### __v





|Type|Requis|Généré|Opendata|Validation|
|----|--------|------|--------|------|
|Number|non|non|non||
