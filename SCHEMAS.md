# POP SCHEMAS
## Import
### user
Identifiant de l'utilisateur à l'origine de l'import

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|ObjectID|false|true|false|

### importedAt
Date de l'import 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Date|false|true|false|

### institution
Institution à l'origine de l'import

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### created
Nombre de notices créées lors de l'import

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Number|false|true|false|

### updated
Nombre de notices mises à jour lors de l'import

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Number|false|true|false|

### rejected
Nombre de notices rejetées lors de l'import

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Number|false|true|false|

### unChanged
Nombre de notices non mises à jour lors de l'import

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Number|false|true|false|

### _id


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|ObjectID|false|false|false|

### __v


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Number|false|false|false|

## Joconde
### PRODUCTEUR
Producteur de la donnée : MUSEE

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### BASE
Nom de la base : Collections des musées de France (Joconde)

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### CONTIENT_IMAGE
Champ généré à chaque sauvegarde de la notice. Si notice contient des images, la valeur du champs sera oui', sinon 'non'. Ce champs est utilisé pour l'affichage de la phototèque mais pourrait être supprimé et remplacer par une fonction exist dans ES

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### POP_COORDONNEES.lat
Latitude de la notice en WGS84

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Number|false|true|false|

### POP_COORDONNEES.lon
Longitude de la notice en WGS84

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Number|false|true|false|

### POP_CONTIENT_GEOLOCALISATION
Champ qui permet de savoir si la geolocalisation est disponible ou non

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### REF
Référence unique de la notice

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|true|false|false|

### POP_IMPORT


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### REFMIS
Référence de mise à jour (marque de la modification de la notice)

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### ADPT
[Peut être déprécié : Pas affiché en production ni en consultation] Ancien dépôt / changement d’affectation

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### APPL
Appellation

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### APTN
Ancienne appartenance (nom du donateur / testateur/ vendeur) 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### ATTR
Anciennes attributions

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### AUTR
Auteur /exécutant / collecteur

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### BIBL
Bibliographie

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### COMM
Commentaires

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### CONTACT
Lien contact musée

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### COOR
Coordinateur

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### COPY
Copyright notice

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### DACQ
Date d’acquisition

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### DATA
[Peut être déprécié : Pas affiché en production ni en consultation]  

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### DATION
[Peut être déprécié : Pas affiché en production ni en consultation]  

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### DDPT
Date de dépôt / changement d’affectation

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### DECV
Découverte / collecte / récolte (lieu de découverte / collecte / récolte) ; Type de site ; Méthode de découverte /collecte / récolte ; Date de découverte / collecte / récolte ; Découvreur / collecteur) 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### DENO
Dénomination du bien

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### DEPO
Dépôt / établissement dépositaire

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### DESC
Description 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### DESY
[Peut être déprécié : Pas affiché en production ni en consultation]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### DIFFU
[Peut être déprécié : Pas affiché en production ni en consultation]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### DIMS
Mesures  / Dimensions

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

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

### DOMN
Domaine (catégorie du bien) 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### DREP
Date de la représentation

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### ECOL
Ecole 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### EPOQ
Epoque /style / mouvement 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### ETAT
[surement à nettoyer] Etat du bien. C'est une liste finie de valeurs possibles

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### EXPO
Exposition 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### GENE
Genèse 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### GEOHI
Géographie historique

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### HIST
Historique – Objets associés 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### IMAGE
[Je ne sais pas à quoi ce champ sert]  

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### IMG
Contient les images. Le plus souvent généré grâce à REFIM

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|true|false|

### INSC
Inscriptions 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### INV
N°Inventaire, ancien(s) numéros(s), autres numéros, N° de dépôt

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### LABEL
Appellation musée de France : logo : Champs ayant toujours la valeur 'Musée de France au sens de la loi n°2002-5 du 4 janvier 2002'

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### LABO
[Peut être déprécié : Pas affiché en production ni en consultation]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### LARC
[Peut être déprécié : Pas affiché en production ni en consultation]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### LIEUX
Lieu de création / d’exécution / d’utilisation

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### LOCA
Localisation

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### LOCA2
[Peut être déprécié : Pas affiché en production ni en consultation]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### LOCA3
[Peut être déprécié : Pas affiché en production ni en consultation]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### MILL
Millésime de création / exécution 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### MILU
Millésime d’utilisation 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### MOSA
[Peut être déprécié : Pas affiché en production ni en consultation]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### MSGCOM
[Surement à nettoyer. J'ai vu du code dans ce champ] Lien commande de reproduction et/ou de conditions d’utilisation 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### MUSEO
Lien Numéro MUSEOFILE

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### NSDA
Numéro de site

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### ONOM
Onomastique

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### PAUT
Précisions /auteur / exécutant / collecteur

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### PDAT
[Peut être déprécié : Pas affiché en production ni en consultation]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### PDEC
Précisions sur la découverte / collecte / récolte

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### PEOC
Période de l’original copié

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### PERI
Période de création / exécution 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### PERU
Période d’utilisation

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### PHOT
Crédits photographiques

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### PINS
Précisions sur les inscriptions

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### PLIEUX
Précisions sur le lieu de création/ d’exécution / d’utilisation

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### PREP
Précisions sur le sujet représenté 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### PUTI
Précisions sur l’utilisation 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### RANG
[Peut être déprécié : Pas affiché en production ni en consultation] 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### REDA
Rédacteur 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### REFIM
Référence image : lien texte/ image : C'est un code qui permet de retrouver l'url de l'image

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### REPR
Sujet représenté 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### RETIF
[Peut être déprécié : Pas affiché en production ni en consultation] 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### SREP
Source de la représentation

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### STAT
Statut juridique (type de propriété ; mode d’acquisition ; institution propriétaire (ville quand la commune est propriétaire) ; établissement affectataire

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|true|false|false|

### TECH
Matériaux et techniques

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### TICO
[Peut être déprécié : A vérifier. Non présent en production] 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### TITR
Titre de l'oeuvre 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### TOUT
[Peut être déprécié : A vérifier. Non présent en production] 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### UTIL
Utilisation / Destination

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### VIDEO
[Peut être déprécié : A vérifier]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### WWW
Lien site associé / site complémentaire

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### LVID
Lien video

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### _id


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|ObjectID|false|false|false|

### __v


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Number|false|false|false|

## Memoire
### PRODUCTEUR
      Producteur de la donnée déterminé grâce à la référence :       IV=INV      OA=CAOA      MH=CRMH      AR=ARCH      AP=SDAP      Autre=SAP

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### BASE
Nom de la base : Photographies (Mémoire)

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### CONTIENT_IMAGE
Champ généré à chaque sauvegarde de la notice. Si notice contient des images, la valeur du champs sera oui', sinon 'non'. Ce champs est utilisé pour l'affichage de la phototèque mais pourrait être supprimé et remplacer par une fonction exist dans ES

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### POP_IMPORT


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### REF
Référence unique de la notice

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### TOUT
Index global [Peut etre déprécié]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### ADRESSE
Adresse 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### AUTOEU
Auteur oeuvre représentée

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### AUTG
Auteur gravure

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### AUTP
Notice biblio

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### AUTOR
Auteur original

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### AUTTI
Auteur tirage

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### COM
Commune

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### DOM
Domaine

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### EDIF
Nom édifice

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### EXPO
Référence d’exposition de l’image 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### JDATPV
Justif date pv

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### LIEUCOR
Lieu cons orig.

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### COTECOR
Cote cons orig. 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### LIEUCTI
Lieu cons tir. 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### COTECTI
Cote conservation du tirage 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### LIEUCP
Lieu cons pho.

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### COTECP
Cote conservation du phototype

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### LEG
Légende 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### OBJT
Nom objet

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### OBS
Obs phototype

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### OBSOR
Obs original

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### OBSTI
Obs tirage

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### PAYS
Pays   

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### PUBLI
Publication 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### TIREDE
Pub. photograph.

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### ROLE


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### PRECOR
Préc original

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### SERIE
Titre série

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### THEATRE


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### TITRE


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

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

### IDPROD
Emetteur (nom) 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### NUMCD
Numéro CD

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### NUMF
No de fond

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### INSEE
Code INSEE

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### NVD
vidéodisque

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### MARQ
Ordre images

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### ACC
Accessoire pose

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### ACQU
Acquisition

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### ADPHOT
Adresse personne 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### AIRE
Aire d'étude

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### ANUMP
Ancien numéro (ancienne cote du phototype)

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### COPY
Crédit photo 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### COULEUR
Couleur [Devrait contenir oui ou non mais contient bcp plus . donnée à nettoyer]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### COSTUME
Costume de la personne représentée

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### DATIMM
Date immatricul

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### DATOEU
Date oeuv année

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### DATPV
Date prise vue 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### DATOR
Date original

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### DATTI
Date tirage

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### DATG
Date gravure

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### DATD
Date dessin

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### DIFF
Droits diffusion

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### DPT
Département 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### EDIARCH
Interprétation

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### ECH
Echelle 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### FORMAT
Format phototype

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### FORMATOR
Format original

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### FORMATTI
Format tirage

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### LBASE
LBASE contient la référence vers la notice Palissy ou Mérimée contenant l'image

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### WEB
Accès Mémoire

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### LIB
Mots candidats

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### LOCA
Localisation 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### LIEUORIG
Lieu de dépôt

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### MCGEO
Nom géographique

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### MCL
Mots clés

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### MENTIONS
Mentions photo

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### MENTOR
Mentions orig

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### MENTTI
Mentions tirage

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### MCPER
Nom personne

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### VUECD
No vue CD

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### NUMAUTP
Cote photographe

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### NUMCAF
No carte fenêtre

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### ANUMOR
No original(anc)

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### NUMOR
No original

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### NUMP
No phototype 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### ANUMTI
Ancien numéro du tirage

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### NUMTI
No tirage

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### RENV
Renvoi 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### REG
Région 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### SENS
Sens [Qu'est ce que c'est ?] 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### SCLE
Date oeuv siècle

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### SUP
Support 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### TECH
Technique photo

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### TECHOR
Technique orig

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### TECHTI
Technique tirage

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### TOILE
Toile de fond

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### TYP
Type  [Qu'est ce que c'est ?]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### TYPDOC
phototype argentique

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### TYPEIMG
Type image num

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### TYPSUPP
Type support num 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### VIDEO
Vidéo [Semble être doublon avec IMG]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### LBASE2
Liens base  [Quelle différence avec LBASE?]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### LEG2
Légende thes. 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### REFIM
Ref Image

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### REFIMG
Nom Image

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### MOSA
Mosaïques 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### SITE
SITE

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### NUMSITE
N° du site 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### NUMOP
N° d'opération

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### CHRONO
Chronologie 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### STRUCT
Structure 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### SUJET
Sujet 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### TICO
Titre du dossier

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### NUMI
Ident. support

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### LIEU
Lieu-dit 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### ADRS
Adresse saisie

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### CONTACT
Contact 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### EMET
Emetteur (nom) 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### NUM
N° support 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### IMG
Lien vers l'image

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### WCOM
Ville [Quelle difference avec COM ?]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### LIENS
Liens divers

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### LAUTP
Notice biblio

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### _id


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|ObjectID|false|false|false|

### __v


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Number|false|false|false|

## Merimee
### REF
Référence unique de la notice

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### PRODUCTEUR


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### BASE
Nom de la base : Patrimoine architectural (Mérimée)

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### CONTIENT_IMAGE
Champ généré à chaque sauvegarde de la notice. Si notice contient des images, la valeur du champs sera oui', sinon 'non'. Ce champs est utilisé pour l'affichage de la phototèque mais pourrait être supprimé et remplacer par une fonction exist dans ES

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### MEMOIRE


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### POP_COORDONNEES.lat
Latitude de la notice en WGS84

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Number|false|true|false|

### POP_COORDONNEES.lon
Longitude de la notice en WGS84

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Number|false|true|false|

### POP_CONTIENT_GEOLOCALISATION
Champ généré à chaque sauvegarde de la notice. Si notice contient des une géolocalisation, la valeur du champs sera 'oui', sinon 'non'

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### POP_COORDINATES_POLYGON.type


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### POP_COORDINATES_POLYGON.coordinates


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### POP_DATE
Champ qui sera utilisé pour traduire les date en format requetable

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|true|false|

### POP_IMPORT


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### TOUT
Champs qui devait contenir tous les champs dans mistral. Aujourd'hui est vide [DEPRECIE ?]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### ACTU
Destinations successives et actuelle 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### ADRS
Adresse

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### AFFE
Affectataire

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### AIRE
Aire d'étude

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### APPL
Appellation et titre

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### APRO


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### ARCHEO
Référence dans la base Patriarche

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### AUTP
Auteurs phototype

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### AUTR
Auteurs de l'oeuvre

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### CADA
Référence cadastrale

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### CANT
Canton

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### COLL
Décompte des oeuvres recensées

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### COM
Commune

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### COOR
Coordonnées Lambert (ou autres) d'un points

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### COORM
Coordonnées Lambert (ou autres) multiples

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### COPY
CopyRight

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### COUV
Type de la couverture

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### DATE
Date protection

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### DBOR
Date de rédaction de la notice

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### DOMN
Domaines

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### DENO
Dénomination 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### DENQ
Date d'enquête

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### DEPL
Partie déplacée

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### DESC
Commentaire description

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### DIMS
Dimensions

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

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

### DOSS
Dossier

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### DPRO
Date protection

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### DPT
Département

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### EDIF
Edifice de conservation

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### ELEV
Parti d’élévation extérieure

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### ENER
Source de l'énergie

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### ESCA
Emplacement, forme et structure de l’escalier 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### ETAG
Vaisseau et étage

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### ETAT
Etat de conservation

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### ETUD
Parties non étud

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### GENR
Destinataire

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### HIST
Commentaire historique

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### HYDR
Cours d'eau

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### IMPL
Milieu d'implantation

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### INSEE
Numéro INSEE de la commune

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### INTE
Intérêt de l'oeuvre

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### JATT
Justification de l'attribution

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### JDAT
Justification de la datation

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### LBASE2
[PAS affiché]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### LIEU
Lieu-dit

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### LOCA
Localisation 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### MFICH
[PAS affiché]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### MOSA
Mosaïques

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### MHPP
Eléments protégés MH

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### MICR
Numéro de microfiche

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### MURS
Matériau du gros-oeuvre et mise en oeuvre 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### NBOR
no Bordereaus

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### NOMS
Noms des rédacteurs de la notice et du dossier

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### OBS
Observations

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### PAFF
Précisions sur l'affectataire 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### PART
Parties constituantes

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### PARN
Parties non étud

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### PDEN
Précision sur la dénomination

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### PERS
Personnalitées

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### PLAN
Parti de plan

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### PLOC
Précision sur la localisation

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### PPRO
Précisions sur la protection MH

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### PREP
Précision sur la représentation

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### PROT
Nature de la protection MH

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### PSTA
Précisions sur le statut de la propriété

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### REFE
Référence de l'édifice de conservation

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### REFP
Références des parties constituantes étudiées

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### REFO
REFO

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### REG
Region

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### REMA
Eléments remarquables

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### REMP
Remploi

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### RENV
N° de renvoi au domaine MH ou au domaine INVENTAIRE

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### REPR
Représentation 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### RFPA
Identifiant Patrimoine

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### SCLD
Datation des campagnes secondaires de construction

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### SCLE
Datation des campagnes principales de construction

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### SCLX
[PAS affiché]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### SITE
Site, secteur ou zone de protection

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### STAT
Statut de la propriété

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### TECH
Technique du décor des immeubles par nature 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### TICO
Titre courant

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### TOIT
Matériau de la couverture 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### TYPO
Typologie 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### VERT
Couvert et découvert de jardin 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### REFIM
[PAS affiché]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### IMG
[PAS affiché]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### VIDEO
[PAS affiché]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### DOSURL
Dossier URL

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### DOSURLPDF
Dossier PDF

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### DOSADRS
Dossier adresse

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### LIENS
Liens Divers

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### IMAGE
[PAS affiché]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### VISI
Ouverture au public

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### VOCA
Vocable 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### VOUT
Type et nature du couvrement 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### WEB
Visite guidé

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### ZONE
Zone Lambert ou autres

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### THEM
Thème 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### ACMH
[PAS affiché]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### ACURL
[PAS affiché]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### WADRS
[PAS affiché]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### WCOM
[PAS affiché]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### WRENV
[PAS affiché]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### REFM
[PAS affiché]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### CONTACT
Contact 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### IDAGR
[PAS affiché]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### LMDP
[PAS affiché]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### PINT
intérêt oeuvre

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### DLAB
Date du label

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### _id


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|ObjectID|false|false|false|

### __v


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Number|false|false|false|

## Mnr
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
[PAS AFFICHE]

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

## Museo
### REF


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### TOUT


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### ACCES


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### ACTIV


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### ADRESSE


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### ADRL1_M


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### AMIS


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### AN_CREAT


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### ANNEE_FE


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### ANNEXE


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### ANTARIF


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### ARTISTE


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### ATOUT


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### CEDEX_AD


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### COPY


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### CP_M


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### CTRLTECH


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### DOMPAL


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### DPT


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### DT_CREAT


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### DT_MODIF


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### DT_SAISI


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### GESTION


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### HIST


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### INTERET


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### ITI2_M


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### ITI_M


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### JOCONDE


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### LABEL


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### LEGS


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### LIEU_M


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### MEL


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### MONOPLUR


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### NB_AMI


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### NOM_AMI


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### NOMANC


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### NOMOFF


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### NOMUSAGE


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### OBS_AMI


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### OBS_TOUR


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### PHARE


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### PROPBAT


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### PROPCOLL


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### PROT


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### PUBLI


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### REGION


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### REPCOLL


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### SERVICES


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### SIGLE_M


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### STATUT


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### SURFACES


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### TEL_M


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### THEMES


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### URL_M2


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### URL_M


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### VIDEO


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### VILLE_M


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### RESP


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### GRESP


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### PSC


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### DPSC


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### DMDF


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### SPUB


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### INVR


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### NUMER


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### LGN


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### REST


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### ACQU


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### RECOL


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### location.lat


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Number|false|false|false|

### location.lon


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Number|false|false|false|

### _id


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|ObjectID|false|false|false|

### __v


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Number|false|false|false|

## Palissy
### PRODUCTEUR


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### CONTIENT_IMAGE
Champ généré à chaque sauvegarde de la notice. Si notice contient des images, la valeur du champs sera oui', sinon 'non'. Ce champs est utilisé pour l'affichage de la phototèque mais pourrait être supprimé et remplacer par une fonction exist dans ES

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### POP_COORDONNEES.lat
Latitude de la notice en WGS84

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Number|false|true|false|

### POP_COORDONNEES.lon
Longitude de la notice en WGS84

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Number|false|true|false|

### POP_CONTIENT_GEOLOCALISATION


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### POP_COORDINATES_POLYGON.type


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### POP_COORDINATES_POLYGON.coordinates


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### BASE
Nom de la base : Patrimoine mobilier (Palissy)

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### MEMOIRE


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### REF
Référence unique de la notice

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### POP_IMPORT


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### ACQU
[PAS AFFICHE]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### ADRS
Adresse 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### ADRS2
[PAS AFFICHE]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### AFIG
Auteur(s) de la source figurée

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### AIRE
Aire d'étude

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### APPL
Appellation et titre

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### ATEL
Nom de l’atelier, de la manufacture, de la fabrique ou de l’école 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### AUTP
Auteurs phototype

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### AUTR
Auteurs de l'oeuvre

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### BIBL
[PAS AFFICHE]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### CANT
Canton 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### CATE
Catégorie technique

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### COM
Commune 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### COM2
[PAS AFFICHE]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### CONTACT
Contact 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### COOR
Coordonnées Lambert (ou autres) d'un points 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### COORM
Coordonnées Lambert (ou autres) multiples 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### COPY
CopyRight

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### DATE
Datation en années

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### DBOR
Date de rédaction de la notice

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### DENO
Dénomination 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### DENQ
Date d'enquête

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### DEPL
Partie déplacée

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### DESC
Commentaire description

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### DIMS
Dimensions 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

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

### DOMN
Domaines 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### DOSADRS
Dossier adresse

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### DOSS
Dossier 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### DOSURL
Dossier URL

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### DOSURLPDF
Dossier PDF 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|true|false|

### DPRO
Date protection

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### DPT
Département 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### EDIF
Edifice de conservation

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### EDIF2
[PAS AFFICHE]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### EMPL
Emplacement de l’œuvre dans l’édifice

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### EMPL2
[PAS AFFICHE]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### ETAT
Etat de conservation

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### ETUD
Parties non étud

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### EXEC
Nom actuel ou historique du lieu d’exécution 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### EXPO
[PAS AFFICHE]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### HIST
Commentaire historique

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### IDAGR
[PAS AFFICHE]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### IMAGE
[PAS AFFICHE]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### IMG
[PAS AFFICHE]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### IMPL
Milieu d'implantation

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### INSC
Inscriptions, marques, emblématique et poinçons

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### INSEE
Numéro INSEE de la commune

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### INSEE2
[PAS AFFICHE]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### INTE
Intérêt de l'oeuvre

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### JDAT
Justification de la datation

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### LBASE2
[PAS AFFICHE]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### LIENS
Liens Divers

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### LIEU
Lieu-dit 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### LMDP
[PAS AFFICHE]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### LOCA
Localisation 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### MATR
Matériaux 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### MFICH
[PAS AFFICHE]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### MICR
Numéro de microfiche

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### MOSA
Mosaïques 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### NART
Numérotation artificielle

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### NINV
[PAS AFFICHE]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### NOMS
Noms des rédacteurs de la notice et du dossier 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### NUMA
[PAS AFFICHE]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### NUMP
[PAS AFFICHE]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### OBS
Observations 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### ORIG
Origine de l’œuvre (lieu de provenance ou de destination)

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### PAPP
Préc. appart

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### PARN
Parties non étud

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### PART
Parties constituantes

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### PDEN
Précision sur la dénomination

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### PDIM
Précisions sur les dimensions

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### PERS
Personnalitées 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### PETA
Précisions sur l’état de conservation

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### PHOTO
[PAS AFFICHE]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### PINS
Précisions sur les inscriptions, marques, emblématique et poinçons 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### PINT
Intérêt oeuvre

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### PLOC
Précision sur la localisation

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### PPRO
Précisions sur la protection MH

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### PREP
Précision sur la représentation

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### PROT
Nature de la protection MH

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### REFA
Référence de l'édifice de conservation

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### REFE
Référence de l’ensemble ou de l'oeuvre

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### REFM
[PAS AFFICHE]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### REFP
Références des parties constituantes étudiées 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### REG
Region 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### RENP
[PAS AFFICHE]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### RENV
N° de renvoi au domaine MH ou au domaine INVENTAIRE

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### REPR
Représentation 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### SCLD
[PAS AFFICHE]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### SCLE
Datation des campagnes principales de construction 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### SCLX
[PAS AFFICHE]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### SOUR
[PAS AFFICHE]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### STAD
Stade de la création

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### STAT
Statut de la propriété

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### STRU
Structure et typologie

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### THEM
Thème 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### TICO
Titre courant

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### TITR
[PAS AFFICHE]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### TOUT
[PAS AFFICHE]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### VIDEO
[PAS AFFICHE]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Array|false|false|false|

### VOLS
Objet(s) volé(s)

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### WADRS
[PAS AFFICHE]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### WCOM
[PAS AFFICHE]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### WEB
Visite guidé 

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### WRENV
[PAS AFFICHE]

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### ZONE
Zone Lambert ou autre

|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### _id


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|ObjectID|false|false|false|

### __v


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Number|false|false|false|

## Thesaurus
### arc


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### value


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### _id


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|ObjectID|false|false|false|

### __v


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Number|false|false|false|

## User
### email


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|true|false|false|

### institution


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|true|false|false|

### nom


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### prenom


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### group


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|true|false|false|

### role


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|true|false|false|

### password


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|true|false|false|

### hasResetPassword


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Boolean|false|false|false|

### lastConnectedAt


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Date|false|false|false|

### museofile


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|String|false|false|false|

### _id


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|ObjectID|false|false|false|

### __v


|Type|Required|Master|Opendata|
|----|--------|------|--------|
|Number|false|false|false|
