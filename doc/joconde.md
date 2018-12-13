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




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|true|false||

### BASE
Nom de la base : Collections des musées de France (Joconde)




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|true|false||

### CONTIENT_IMAGE
Champ généré à chaque sauvegarde de la notice. Si notice contient des images, la valeur du champ sera oui', sinon 'non'. Ce champ est utilisé pour l'affichage de la phototèque mais pourrait être supprimé et remplacer par une fonction exist dans ES




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|true|false||

### POP_COORDONNEES.lat
Latitude de la notice en WGS84




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|Number|false|true|false||

### POP_COORDONNEES.lon
Longitude de la notice en WGS84




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|Number|false|true|false||

### POP_CONTIENT_GEOLOCALISATION
Champ qui permet de savoir si la geolocalisation est disponible ou non




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|true|false||

### REF
Référence unique de la notice




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|true|false|false|Alphanumeric|

### POP_IMPORT





|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|Array|false|false|false||

### REFMIS
Référence de mise à jour (marque de la modification de la notice)




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### ADPT
Ancien dépôt / changement d’affectation




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|Array|false|false|false||

### APPL
Appellation




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### APTN
Ancienne appartenance (nom du donateur / testateur/ vendeur) 




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### ATTR
Anciennes attributions




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### AUTR
Auteur /exécutant / collecteur


Thésaurus : http://data.culture.fr/thesaurus/resource/ark:/67717/T513 



|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### BIBL
Bibliographie




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### COMM
Commentaires




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### CONTACT
Lien contact musée




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|true|false|email|

### COOR
Coordinateur




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### COPY
Copyright notice




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### DACQ
Date d’acquisition




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### DATA
[Peut être déprécié : Pas affiché en production ni en consultation]  




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### DATION
[Peut être déprécié : Pas affiché en production ni en consultation]  




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### DDPT
Date de dépôt / changement d’affectation




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### DECV
Découverte / collecte / récolte (lieu de découverte / collecte / récolte) ; Type de site ; Méthode de découverte /collecte / récolte ; Date de découverte / collecte / récolte ; Découvreur / collecteur) 


Thésaurus : http://data.culture.fr/thesaurus/resource/ark:/67717/T115 



|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### DENO
Dénomination du bien


Thésaurus : http://data.culture.fr/thesaurus/resource/ark:/67717/T505 



|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|Array|false|false|false||

### DEPO
Dépôt / établissement dépositaire




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### DESC
Description 




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### DESY
[Peut être déprécié : Pas affiché en production ni en consultation]




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### DIFFU
[Peut être déprécié : Pas affiché en production ni en consultation]




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### DIMS
Mesures  / Dimensions




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### DMAJ
Date de la dernière mise à jour




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|true|false||

### DMIS
Date de la création POP/Mistral




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|true|false||

### DOMN
Domaine (catégorie du bien) 


Thésaurus : http://data.culture.fr/thesaurus/resource/ark:/67717/T51 



|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|Array|false|false|false||

### DREP
Date de la représentation




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### ECOL
Ecole 


Thésaurus : http://data.culture.fr/thesaurus/resource/ark:/67717/T517 



|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|Array|false|false|false||

### EPOQ
Epoque /style / mouvement 


Thésaurus : http://data.culture.fr/thesaurus/resource/ark:/67717/T93 



|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|Array|false|false|false||

### ETAT
[surement à nettoyer] Etat du bien. C'est une liste finie de valeurs possibles




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|Array|false|false|false||

### EXPO
Exposition 




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### GENE
Genèse 


Thésaurus : http://data.culture.fr/thesaurus/resource/ark:/67717/T506 



|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|Array|false|false|false||

### GEOHI
Géographie historique




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|Array|false|false|false||

### HIST
Historique – Objets associés 




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### IMAGE
[Je ne sais pas à quoi ce champ sert]  




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### IMG
Contient les images. Le plus souvent généré grâce à REFIM




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|Array|false|true|false||

### INSC
Inscriptions 


Thésaurus : http://data.culture.fr/thesaurus/resource/ark:/67717/T520 



|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|Array|false|false|false||

### INV
N°Inventaire, ancien(s) numéros(s), autres numéros, N° de dépôt




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### LABEL
Appellation musée de France : logo : Champ ayant toujours la valeur 'Musée de France au sens de la loi n°2002-5 du 4 janvier 2002'




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|true|false||

### LABO
[Peut être déprécié : Pas affiché en production ni en consultation]




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### LARC
[Peut être déprécié : Pas affiché en production ni en consultation]




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### LIEUX
Lieu de création / d’exécution / d’utilisation


Thésaurus : http://data.culture.fr/thesaurus/resource/ark:/67717/T84 



|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### LOCA
Localisation


Thésaurus : http://data.culture.fr/thesaurus/resource/ark:/67717/T515 



|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### LOCA2
[Peut être déprécié : Pas affiché en production ni en consultation]




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### LOCA3
[Peut être déprécié : Pas affiché en production ni en consultation]




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### MILL
Millésime de création / exécution 




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|Array|false|false|false||

### MILU
Millésime d’utilisation 




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### MOSA
[Peut être déprécié : Pas affiché en production ni en consultation]




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### MSGCOM
[Surement à nettoyer. J'ai vu du code dans ce champ] Lien commande de reproduction et/ou de conditions d’utilisation 




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### MUSEO
Lien Numéro MUSEOFILE




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### NSDA
Numéro de site




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### ONOM
Onomastique




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|Array|false|false|false||

### PAUT
Précisions /auteur / exécutant / collecteur




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### PDAT
[Peut être déprécié : Pas affiché en production ni en consultation]




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### PDEC
Précisions sur la découverte / collecte / récolte




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### PEOC
Période de l’original copié


Thésaurus : http://data.culture.fr/thesaurus/resource/ark:/67717/T521 



|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|Array|false|false|false||

### PERI
Période de création / exécution 


Thésaurus : http://data.culture.fr/thesaurus/resource/ark:/67717/T521 



|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|Array|false|false|false||

### PERU
Période d’utilisation


Thésaurus : http://data.culture.fr/thesaurus/resource/ark:/67717/T521 



|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|Array|false|false|false||

### PHOT
Crédits photographiques




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### PINS
Précisions sur les inscriptions




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### PLIEUX
Précisions sur le lieu de création/ d’exécution / d’utilisation




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### PREP
Précisions sur le sujet représenté 




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|Array|false|false|false||

### PUTI
Précisions sur l’utilisation 




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### RANG
[Peut être déprécié : Pas affiché en production ni en consultation] 




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### REDA
Rédacteur 




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|Array|false|false|false||

### REFIM
Référence image : lien texte/ image : C'est un code qui permet de retrouver l'url de l'image




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### REPR
Sujet représenté 


Thésaurus : http://data.culture.fr/thesaurus/resource/ark:/67717/T523 



|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### RETIF
[Peut être déprécié : Pas affiché en production ni en consultation] 




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### SREP
Source de la représentation


Thésaurus : http://data.culture.fr/thesaurus/resource/ark:/67717/T523 



|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|Array|false|false|false||

### STAT
Statut juridique (type de propriété ; mode d’acquisition ; institution propriétaire (ville quand la commune est propriétaire) ; établissement affectataire




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|Array|true|false|false||

### TECH
Matériaux et techniques


Thésaurus : http://data.culture.fr/thesaurus/resource/ark:/67717/T516 



|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|Array|false|false|false||

### TICO
[Peut être déprécié : A vérifier. Non présent en production] 




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### TITR
Titre de l'oeuvre 




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### TOUT
[Peut être déprécié : A vérifier. Non présent en production] 




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### UTIL
Utilisation / Destination


Thésaurus : http://data.culture.fr/thesaurus/resource/ark:/67717/T86 



|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|Array|false|false|false||

### VIDEO
[Peut être déprécié : A vérifier]




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|Array|false|false|false||

### WWW
Lien site associé / site complémentaire




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### LVID
Lien video




|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|String|false|false|false||

### _id





|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|ObjectID|false|false|false||

### __v





|Type|Required|Master|Opendata|Validation|
|----|--------|------|--------|------|
|Number|false|false|false||
