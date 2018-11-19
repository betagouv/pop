# POP SCHEMAS
## Import
|Name|Type|Required|Master|Opendata|Description|
|----|----|--------|------|--------|-----------|
|user|ObjectID|false|false|false||
|importedAt|Date|false|false|false||
|institution|String|false|false|false||
|created|Number|false|false|false||
|updated|Number|false|false|false||
|rejected|Number|false|false|false||
|unChanged|Number|false|false|false||
|_id|ObjectID|false|false|false||
|__v|Number|false|false|false||
## Joconde
|Name|Type|Required|Master|Opendata|Description|
|----|----|--------|------|--------|-----------|
|PRODUCTEUR|String|false|true|false|Producteur de la donnée : MUSEE|
|BASE|String|false|true|false|Nom de la base : Collections des musées de France (Joconde)|
|CONTIENT_IMAGE|String|false|true|false|Champ généré à chaque sauvegarde de la notice. Si notice contient des images, la valeur du champs sera oui', sinon 'non'. Ce champs est utilisé pour l'affichage de la phototèque mais pourrait être supprimé et remplacer par une fonction exist dans ES|
|POP_COORDONNEES.lat|Number|false|true|false|Latitude de la notice en WGS84|
|POP_COORDONNEES.lon|Number|false|true|false|Longitude de la notice en WGS84|
|REF|String|false|false|false|Référence unique de la notice|
|POP_IMPORT|Array|false|false|false||
|REFMIS|String|false|false|false|Référence de mise à jour (marque de la modification de la notice)|
|ADPT|Array|false|false|false|[Peut être déprécié : Pas affiché en production ni en consultation] Ancien dépôt / changement d’affectation|
|APPL|Array|false|false|false|Appellation|
|APTN|String|false|false|false|Ancienne appartenance (nom du donateur / testateur/ vendeur) |
|ATTR|String|false|false|false|Anciennes attributions|
|AUTR|String|false|false|false|Auteur /exécutant / collecteur|
|BIBL|String|false|false|false|Bibliographie|
|COMM|String|false|false|false|Commentaires|
|CONTACT|String|false|true|false|Lien contact musée|
|COOR|String|false|false|false|Coordinateur|
|COPY|String|false|false|false|Copyright notice|
|DACQ|String|false|false|false|Date d’acquisition|
|DATA|String|false|false|false|[Peut être déprécié : Pas affiché en production ni en consultation]  |
|DATION|String|false|false|false|[Peut être déprécié : Pas affiché en production ni en consultation]  |
|DDPT|String|false|false|false|Date de dépôt / changement d’affectation|
|DECV|String|false|false|false|Découverte / collecte / récolte (lieu de découverte / collecte / récolte) ; Type de site ; Méthode de découverte /collecte / récolte ; Date de découverte / collecte / récolte ; Découvreur / collecteur) |
|DENO|Array|false|false|false|Dénomination du bien|
|DEPO|String|false|false|false|Dépôt / établissement dépositaire|
|DESC|String|false|false|false|Description |
|DESY|String|false|false|false|[Peut être déprécié : Pas affiché en production ni en consultation]|
|DIFFU|String|false|false|false|[Peut être déprécié : Pas affiché en production ni en consultation]|
|DIMS|String|false|false|false|Mesures  / Dimensions|
|DMAJ|String|false|true|false|Date de la dernière mise à jour|
|DMIS|String|false|true|false|Date de la création POP/Mistral|
|DOMN|Array|false|false|false|Domaine (catégorie du bien) |
|DREP|String|false|false|false|Date de la représentation|
|ECOL|Array|false|false|false|Ecole |
|EPOQ|Array|false|false|false|Epoque /style / mouvement |
|ETAT|Array|false|false|false|[surement à nettoyer] Etat du bien. C'est une liste finie de valeurs possibles|
|EXPO|String|false|false|false|Exposition |
|GENE|Array|false|false|false|Genèse |
|GEOHI|Array|false|false|false|Géographie historique|
|HIST|String|false|false|false|Historique – Objets associés |
|IMAGE|String|false|false|false|[Je ne sais pas à quoi ce champ sert]  |
|IMG|Array|false|true|false|Contient les images. Le plus souvent généré grâce à REFIM|
|INSC|Array|false|false|false|Inscriptions |
|INV|String|false|false|false|N°Inventaire, ancien(s) numéros(s), autres numéros, N° de dépôt|
|LABEL|String|false|true|false|Appellation musée de France : logo : Champs ayant toujours la valeur 'Musée de France au sens de la loi n°2002-5 du 4 janvier 2002'|
|LABO|String|false|false|false|[Peut être déprécié : Pas affiché en production ni en consultation]|
|LARC|String|false|false|false|[Peut être déprécié : Pas affiché en production ni en consultation]|
|LIEUX|String|false|false|false|Lieu de création / d’exécution / d’utilisation|
|LOCA|String|false|false|false|Localisation|
|LOCA2|String|false|false|false|[Peut être déprécié : Pas affiché en production ni en consultation]|
|LOCA3|String|false|false|false|[Peut être déprécié : Pas affiché en production ni en consultation]|
|MILL|Array|false|false|false|Millésime de création / exécution |
|MILU|String|false|false|false|Millésime d’utilisation |
|MOSA|String|false|false|false|[Peut être déprécié : Pas affiché en production ni en consultation]|
|MSGCOM|String|false|false|false|[Surement à nettoyer. J'ai vu du code dans ce champ] Lien commande de reproduction et/ou de conditions d’utilisation |
|MUSEO|String|false|false|false|Lien Numéro MUSEOFILE|
|NSDA|String|false|false|false|Numéro de site|
|ONOM|Array|false|false|false|Onomastique|
|PAUT|String|false|false|false|Précisions /auteur / exécutant / collecteur|
|PDAT|String|false|false|false|[Peut être déprécié : Pas affiché en production ni en consultation]|
|PDEC|String|false|false|false|Précisions sur la découverte / collecte / récolte|
|PEOC|Array|false|false|false|Période de l’original copié|
|PERI|Array|false|false|false|Période de création / exécution |
|PERU|Array|false|false|false|Période d’utilisation|
|PHOT|String|false|false|false|Crédits photographiques|
|PINS|String|false|false|false|Précisions sur les inscriptions|
|PLIEUX|String|false|false|false|Précisions sur le lieu de création/ d’exécution / d’utilisation|
|PREP|Array|false|false|false|Précisions sur le sujet représenté |
|PUTI|String|false|false|false|Précisions sur l’utilisation |
|RANG|String|false|false|false|[Peut être déprécié : Pas affiché en production ni en consultation] |
|REDA|Array|false|false|false|Rédacteur |
|REFIM|String|false|false|false|Référence image : lien texte/ image : C'est un code qui permet de retrouver l'url de l'image|
|REPR|String|false|false|false|Sujet représenté |
|RETIF|String|false|false|false|[Peut être déprécié : Pas affiché en production ni en consultation] |
|SREP|Array|false|false|false|Source de la représentation|
|STAT|Array|false|false|false|Statut juridique (type de propriété ; mode d’acquisition ; institution propriétaire (ville quand la commune est propriétaire) ; établissement affectataire|
|TECH|Array|false|false|false|Matériaux et techniques|
|TICO|String|false|false|false|[Peut être déprécié : A vérifier. Non présent en production] |
|TITR|String|false|false|false|Titre de l'oeuvre |
|TOUT|String|false|false|false|[Peut être déprécié : A vérifier. Non présent en production] |
|UTIL|Array|false|false|false|Utilisation / Destination|
|VIDEO|Array|false|false|false|[Peut être déprécié : A vérifier]|
|WWW|String|false|false|false|Lien site associé / site complémentaire|
|LVID|String|false|false|false|Lien video|
|_id|ObjectID|false|false|false||
|__v|Number|false|false|false||
## Memoire
|Name|Type|Required|Master|Opendata|Description|
|----|----|--------|------|--------|-----------|
|PRODUCTEUR|String|false|true|false|      Producteur de la donnée déterminé grâce à la référence :       IV=INV      OA=CAOA      MH=CRMH      AR=ARCH      AP=SDAP      Autre=SAP|
|BASE|String|false|true|false|Nom de la base : Photographies (Mémoire)|
|CONTIENT_IMAGE|String|false|true|false|Champ généré à chaque sauvegarde de la notice. Si notice contient des images, la valeur du champs sera oui', sinon 'non'. Ce champs est utilisé pour l'affichage de la phototèque mais pourrait être supprimé et remplacer par une fonction exist dans ES|
|POP_IMPORT|Array|false|false|false||
|REF|String|false|false|false|Référence unique de la notice|
|TOUT|String|false|false|false|Index global [Peut etre déprécié]|
|ADRESSE|String|false|false|false|Adresse |
|AUTOEU|String|false|false|false|Auteur oeuvre représentée|
|AUTG|String|false|false|false|Auteur gravure|
|AUTP|String|false|false|false|Notice biblio|
|AUTOR|String|false|false|false|Auteur original|
|AUTTI|String|false|false|false|Auteur tirage|
|COM|String|false|false|false|Commune|
|DOM|String|false|false|false|Domaine|
|EDIF|String|false|false|false|Nom édifice|
|EXPO|String|false|false|false|[Peut être déprécié. Non afficher en production]|
|JDATPV|String|false|false|false|Justif date pv|
|LIEUCOR|String|false|false|false|Lieu cons orig.|
|COTECOR|String|false|false|false|Cote cons orig. |
|LIEUCTI|String|false|false|false|Lieu cons tir. |
|COTECTI|String|false|false|false|Cote conservation du tirage |
|LIEUCP|String|false|false|false|Lieu cons pho.|
|COTECP|String|false|false|false|Cote conservation du phototype|
|LEG|String|false|false|false|Légende |
|OBJT|String|false|false|false|Nom objet|
|OBS|String|false|false|false|Obs phototype|
|OBSOR|String|false|false|false|Obs original|
|OBSTI|String|false|false|false|Obs tirage|
|PAYS|String|false|false|false|Pays   |
|PUBLI|String|false|false|false|Publication |
|TIREDE|String|false|false|false|Pub. photograph.|
|ROLE|String|false|false|false||
|PRECOR|String|false|false|false|Préc original|
|SERIE|String|false|false|false|Titre série|
|THEATRE|String|false|false|false||
|TITRE|String|false|false|false||
|DMAJ|String|false|true|false|Date de la dernière mise à jour|
|DMIS|String|false|true|false|Date de la création POP/Mistral|
|IDPROD|String|false|false|false|Emetteur (nom) |
|NUMCD|String|false|false|false|Numéro CD|
|NUMF|String|false|false|false|No de fond|
|INSEE|String|false|false|false|Code INSEE|
|NVD|String|false|false|false|vidéodisque|
|MARQ|String|false|false|false|Ordre images|
|ACC|String|false|false|false|Accessoire pose|
|ACQU|String|false|false|false|Acquisition|
|ADPHOT|String|false|false|false|Adresse personne |
|AIRE|String|false|false|false|Aire d'étude|
|ANUMP|String|false|false|false|Ancien numéro (ancienne cote du phototype)|
|COPY|String|false|false|false|Crédit photo |
|COULEUR|String|false|false|false|Couleur [Devrait contenir oui ou non mais contient bcp plus . donnée à nettoyer]|
|COSTUME|String|false|false|false|Costume de la personne représentée|
|DATIMM|String|false|false|false|Date immatricul|
|DATOEU|String|false|false|false|Date oeuv année|
|DATPV|String|false|false|false|Date prise vue |
|DATOR|String|false|false|false|Date original|
|DATTI|String|false|false|false|Date tirage|
|DATG|String|false|false|false|Date gravure|
|DATD|String|false|false|false|Date dessin|
|DIFF|String|false|false|false|Droits diffusion|
|DPT|String|false|false|false|Département |
|EDIARCH|String|false|false|false|Interprétation|
|ECH|String|false|false|false|Echelle |
|FORMAT|String|false|false|false|Format phototype|
|FORMATOR|String|false|false|false|Format original|
|FORMATTI|String|false|false|false|Format tirage|
|LBASE|String|false|false|false|Liens bases|
|WEB|String|false|false|false|Accès Mémoire|
|LIB|String|false|false|false|Mots candidats|
|LOCA|String|false|false|false|Localisation |
|LIEUORIG|String|false|false|false|Lieu de dépôt|
|MCGEO|String|false|false|false|Nom géographique|
|MCL|String|false|false|false|Mots clés|
|MENTIONS|String|false|false|false|Mentions photo|
|MENTOR|String|false|false|false|Mentions orig|
|MENTTI|String|false|false|false|Mentions tirage|
|MCPER|String|false|false|false|Nom personne|
|VUECD|String|false|false|false|No vue CD|
|NUMAUTP|String|false|false|false|Cote photographe|
|NUMCAF|String|false|false|false|No carte fenêtre|
|ANUMOR|String|false|false|false|No original(anc)|
|NUMOR|String|false|false|false|No original|
|NUMP|String|false|false|false|No phototype |
|ANUMTI|String|false|false|false|Ancien numéro du tirage|
|NUMTI|String|false|false|false|No tirage|
|RENV|String|false|false|false|Renvoi |
|REG|String|false|false|false|Région |
|SENS|String|false|false|false|Sens [Qu'est ce que c'est ?] |
|SCLE|String|false|false|false|Date oeuv siècle|
|SUP|String|false|false|false|Support |
|TECH|String|false|false|false|Technique photo|
|TECHOR|String|false|false|false|Technique orig|
|TECHTI|String|false|false|false|Technique tirage|
|TOILE|String|false|false|false|Toile de fond|
|TYP|String|false|false|false|Type  [Qu'est ce que c'est ?]|
|TYPDOC|String|false|false|false|phototype argentique|
|TYPEIMG|String|false|false|false|Type image num|
|TYPSUPP|String|false|false|false|Type support num |
|VIDEO|String|false|false|false|Vidéo [Semble être doublon avec IMG]|
|LBASE2|String|false|false|false|Liens base  [Quelle différence avec LBASE?]|
|LEG2|String|false|false|false|Légende thes. |
|REFIM|String|false|false|false|Ref Image|
|REFIMG|String|false|false|false|Nom Image|
|MOSA|String|false|false|false|Mosaïques |
|SITE|String|false|false|false|SITE|
|NUMSITE|String|false|false|false|N° du site |
|NUMOP|String|false|false|false|N° d'opération|
|CHRONO|String|false|false|false|Chronologie |
|STRUCT|String|false|false|false|Structure |
|SUJET|String|false|false|false|Sujet |
|TICO|String|false|false|false|Titre du dossier|
|NUMI|String|false|false|false|Ident. support|
|LIEU|String|false|false|false|Lieu-dit |
|ADRS|String|false|false|false|Adresse saisie|
|CONTACT|String|false|true|false|Contact |
|EMET|String|false|false|false|Emetteur (nom) |
|NUM|String|false|false|false|N° support |
|IMG|String|false|false|false|Lien vers l'image|
|WCOM|String|false|false|false|Ville [Quelle difference avec COM ?]|
|LIENS|String|false|false|false|Liens divers|
|LAUTP|String|false|false|false|Notice biblio|
|_id|ObjectID|false|false|false||
|__v|Number|false|false|false||
## Merimee
|Name|Type|Required|Master|Opendata|Description|
|----|----|--------|------|--------|-----------|
|REF|String|false|false|false|Référence unique de la notice|
|PRODUCTEUR|String|false|false|false||
|BASE|String|false|true|false|Nom de la base : Patrimoine architectural (Mérimée)|
|CONTIENT_IMAGE|String|false|true|false|Champ généré à chaque sauvegarde de la notice. Si notice contient des images, la valeur du champs sera oui', sinon 'non'. Ce champs est utilisé pour l'affichage de la phototèque mais pourrait être supprimé et remplacer par une fonction exist dans ES|
|MEMOIRE|Array|false|false|false||
|POP_COORDONNEES.lat|Number|false|true|false|Latitude de la notice en WGS84|
|POP_COORDONNEES.lon|Number|false|true|false|Longitude de la notice en WGS84|
|POP_CONTIENT_GEOLOCALISATION|String|false|false|false||
|POP_COORDINATES_POLYGON.type|String|false|false|false||
|POP_COORDINATES_POLYGON.coordinates|Array|false|false|false||
|POP_DATE|Array|false|false|false||
|POP_IMPORT|Array|false|false|false||
|TOUT|String|false|false|false||
|ACTU|String|false|false|false||
|ADRS|String|false|false|false||
|AFFE|String|false|false|false||
|AIRE|String|false|false|false||
|APPL|String|false|false|false||
|APRO|Array|false|false|false||
|ARCHEO|String|false|false|false||
|AUTP|Array|false|false|false||
|AUTR|Array|false|false|false||
|CADA|Array|false|false|false||
|CANT|String|false|false|false||
|COLL|Array|false|false|false||
|COM|String|false|false|false||
|COOR|String|false|false|false||
|COORM|String|false|false|false||
|COPY|Array|false|false|false||
|COUV|Array|false|false|false||
|DATE|Array|false|false|false||
|DBOR|String|false|false|false||
|DOMN|Array|false|false|false||
|DENO|Array|false|false|false||
|DENQ|String|false|false|false||
|DEPL|String|false|false|false||
|DESC|String|false|false|false||
|DIMS|String|false|false|false||
|DMAJ|String|false|true|false|Date de la dernière mise à jour|
|DMIS|String|false|true|false|Date de la création POP/Mistral|
|DOSS|String|false|false|false||
|DPRO|String|false|false|false||
|DPT|String|false|false|false||
|EDIF|String|false|false|false||
|ELEV|Array|false|false|false||
|ENER|Array|false|false|false||
|ESCA|Array|false|false|false||
|ETAG|Array|false|false|false||
|ETAT|String|false|false|false||
|ETUD|String|false|false|false||
|GENR|String|false|false|false||
|HIST|String|false|false|false||
|HYDR|String|false|false|false||
|IMPL|Array|false|false|false||
|INSEE|String|false|false|false||
|INTE|Array|false|false|false||
|JATT|Array|false|false|false||
|JDAT|Array|false|false|false||
|LBASE2|String|false|false|false||
|LIEU|String|false|false|false||
|LOCA|String|false|false|false||
|MFICH|String|false|false|false||
|MOSA|String|false|false|false||
|MHPP|String|false|false|false||
|MICR|String|false|false|false||
|MURS|Array|false|false|false||
|NBOR|String|false|false|false||
|NOMS|Array|false|false|false||
|OBS|String|false|false|false||
|PAFF|String|false|false|false||
|PART|Array|false|false|false||
|PARN|Array|false|false|false||
|PDEN|String|false|false|false||
|PERS|Array|false|false|false||
|PLAN|String|false|false|false||
|PLOC|String|false|false|false||
|PPRO|String|false|false|false||
|PREP|Array|false|false|false||
|PROT|Array|false|false|false||
|PSTA|String|false|false|false||
|REFE|Array|false|false|false||
|REFP|Array|false|false|false||
|REFO|Array|false|false|false||
|REG|String|false|false|false||
|REMA|String|false|false|false||
|REMP|String|false|false|false||
|RENV|Array|false|false|false||
|REPR|String|false|false|false||
|RFPA|String|false|false|false||
|SCLD|Array|false|false|false||
|SCLE|Array|false|false|false||
|SCLX|Array|false|false|false||
|SITE|String|false|false|false||
|STAT|String|false|false|false||
|TECH|Array|false|false|false||
|TICO|String|false|false|false||
|TOIT|Array|false|false|false||
|TYPO|String|false|false|false||
|VERT|String|false|false|false||
|REFIM|String|false|false|false||
|IMG|Array|false|false|false||
|VIDEO|String|false|false|false||
|DOSURL|String|false|false|false||
|DOSURLPDF|String|false|false|false||
|DOSADRS|String|false|false|false||
|LIENS|Array|false|false|false||
|IMAGE|String|false|false|false||
|VISI|Array|false|false|false||
|VOCA|String|false|false|false||
|VOUT|Array|false|false|false||
|WEB|String|false|false|false||
|ZONE|String|false|false|false||
|THEM|String|false|false|false||
|ACMH|String|false|false|false||
|ACURL|String|false|false|false||
|WADRS|String|false|false|false||
|WCOM|String|false|false|false||
|WRENV|String|false|false|false||
|REFM|String|false|false|false||
|CONTACT|String|false|false|false||
|IDAGR|String|false|false|false||
|LMDP|String|false|false|false||
|PINT|String|false|false|false||
|DLAB|String|false|false|false||
|_id|ObjectID|false|false|false||
|__v|Number|false|false|false||
## Mnr
|Name|Type|Required|Master|Opendata|Description|
|----|----|--------|------|--------|-----------|
|PRODUCTEUR|String|false|true|false|Producteur de la donnée : Valeur MNR|
|BASE|String|false|true|false|Nom de la base : Valeur Récupération artistique (MNR Rose-Valland)|
|CONTIENT_IMAGE|String|false|true|false|Champ généré à chaque sauvegarde de la notice. Si notice contient des images, la valeur du champs sera oui', sinon 'non'. Ce champs est utilisé pour l'affichage de la phototèque mais pourrait être supprimé et remplacer par une fonction exist dans ES|
|REF|String|false|false|false|Référence unique de la notice|
|POP_IMPORT|Array|false|false|false||
|TOUT|String|false|false|false||
|AUTR|Array|false|false|false||
|PAUT|String|false|false|false||
|ATTR|String|false|false|false||
|ECOL|String|false|false|false||
|TITR|String|false|false|false||
|ATIT|String|false|false|false||
|PTIT|String|false|false|false||
|DENO|Array|false|false|false||
|DESC|String|false|false|false||
|DOMN|Array|false|false|false||
|LOCA|String|false|false|false||
|INSC|String|false|false|false||
|MARQ|String|false|false|false||
|OBSE|String|false|false|false||
|ETAT|String|false|false|false||
|GENE|String|false|false|false||
|PROV|String|false|false|false||
|HIST|String|false|false|false||
|HIST2|String|false|false|false||
|HIST3|String|false|false|false||
|HIST4|String|false|false|false||
|HIST5|String|false|false|false||
|HIST6|String|false|false|false||
|SCLE|Array|false|false|false||
|STYL|String|false|false|false||
|MILL|String|false|false|false||
|TECH|Array|false|false|false||
|DIMS|Array|false|false|false||
|VIDEO|Array|false|false|false||
|INV|String|false|false|false||
|EXPO|String|false|false|false||
|BIBL|String|false|false|false||
|AATT|String|false|false|false||
|AUTI|String|false|false|false||
|CATE|String|false|false|false||
|CATE_DEPREC|String|false|false|false||
|NOTE|String|false|false|false||
|REDC|Array|false|false|false||
|DREP|String|false|false|false||
|PREP|String|false|false|false||
|REPR|String|false|false|false||
|SREP|String|false|false|false||
|REFIM|String|false|false|false||
|DMAJ|String|false|true|false|Date de la dernière mise à jour|
|DMIS|String|false|true|false|Date de la création POP/Mistral|
|AFFE|String|false|false|false||
|NUMS|String|false|false|false||
|SUITE|String|false|false|false||
|COMM|String|false|false|false||
|NOTE2|String|false|false|false||
|RESUME|String|false|false|false||
|PHOT|String|false|false|false||
|_id|ObjectID|false|false|false||
|__v|Number|false|false|false||
## Museo
|Name|Type|Required|Master|Opendata|Description|
|----|----|--------|------|--------|-----------|
|REF|String|false|false|false||
|TOUT|String|false|false|false||
|ACCES|String|false|false|false||
|ACTIV|String|false|false|false||
|ADRESSE|String|false|false|false||
|ADRL1_M|String|false|false|false||
|AMIS|String|false|false|false||
|AN_CREAT|String|false|false|false||
|ANNEE_FE|String|false|false|false||
|ANNEXE|String|false|false|false||
|ANTARIF|String|false|false|false||
|ARTISTE|String|false|false|false||
|ATOUT|String|false|false|false||
|CEDEX_AD|String|false|false|false||
|COPY|String|false|false|false||
|CP_M|String|false|false|false||
|CTRLTECH|String|false|false|false||
|DOMPAL|String|false|false|false||
|DPT|String|false|false|false||
|DT_CREAT|String|false|false|false||
|DT_MODIF|String|false|false|false||
|DT_SAISI|String|false|false|false||
|GESTION|String|false|false|false||
|HIST|String|false|false|false||
|INTERET|String|false|false|false||
|ITI2_M|String|false|false|false||
|ITI_M|String|false|false|false||
|JOCONDE|String|false|false|false||
|LABEL|String|false|false|false||
|LEGS|String|false|false|false||
|LIEU_M|String|false|false|false||
|MEL|String|false|false|false||
|MONOPLUR|String|false|false|false||
|NB_AMI|String|false|false|false||
|NOM_AMI|String|false|false|false||
|NOMANC|String|false|false|false||
|NOMOFF|String|false|false|false||
|NOMUSAGE|String|false|false|false||
|OBS_AMI|String|false|false|false||
|OBS_TOUR|String|false|false|false||
|PHARE|String|false|false|false||
|PROPBAT|String|false|false|false||
|PROPCOLL|String|false|false|false||
|PROT|String|false|false|false||
|PUBLI|String|false|false|false||
|REGION|String|false|false|false||
|REPCOLL|String|false|false|false||
|SERVICES|String|false|false|false||
|SIGLE_M|String|false|false|false||
|STATUT|String|false|false|false||
|SURFACES|String|false|false|false||
|TEL_M|String|false|false|false||
|THEMES|String|false|false|false||
|URL_M2|String|false|false|false||
|URL_M|String|false|false|false||
|VIDEO|String|false|false|false||
|VILLE_M|String|false|false|false||
|RESP|String|false|false|false||
|GRESP|String|false|false|false||
|PSC|String|false|false|false||
|DPSC|String|false|false|false||
|DMDF|String|false|false|false||
|SPUB|String|false|false|false||
|INVR|String|false|false|false||
|NUMER|String|false|false|false||
|LGN|String|false|false|false||
|REST|String|false|false|false||
|ACQU|String|false|false|false||
|RECOL|String|false|false|false||
|location.lat|Number|false|false|false||
|location.lon|Number|false|false|false||
|_id|ObjectID|false|false|false||
|__v|Number|false|false|false||
## Palissy
|Name|Type|Required|Master|Opendata|Description|
|----|----|--------|------|--------|-----------|
|PRODUCTEUR|String|false|false|false||
|CONTIENT_IMAGE|String|false|true|false|Champ généré à chaque sauvegarde de la notice. Si notice contient des images, la valeur du champs sera oui', sinon 'non'. Ce champs est utilisé pour l'affichage de la phototèque mais pourrait être supprimé et remplacer par une fonction exist dans ES|
|POP_COORDONNEES.lat|Number|false|true|false|Latitude de la notice en WGS84|
|POP_COORDONNEES.lon|Number|false|true|false|Longitude de la notice en WGS84|
|POP_CONTIENT_GEOLOCALISATION|String|false|false|false||
|POP_COORDINATES_POLYGON.type|String|false|false|false||
|POP_COORDINATES_POLYGON.coordinates|Array|false|false|false||
|BASE|String|false|true|false|Nom de la base : Patrimoine mobilier (Palissy)|
|MEMOIRE|Array|false|false|false||
|REF|String|false|false|false|Référence unique de la notice|
|POP_IMPORT|Array|false|false|false||
|ACQU|String|false|false|false||
|ADRS|String|false|false|false||
|ADRS2|String|false|false|false||
|AFIG|Array|false|false|false||
|AIRE|String|false|false|false||
|APPL|String|false|false|false||
|ATEL|String|false|false|false||
|AUTP|String|false|false|false||
|AUTR|Array|false|false|false||
|BIBL|String|false|false|false||
|CANT|String|false|false|false||
|CATE|Array|false|false|false||
|COM|String|false|false|false||
|COM2|String|false|false|false||
|CONTACT|String|false|false|false||
|COOR|String|false|false|false||
|COORM|String|false|false|false||
|COPY|String|false|false|false||
|DATE|Array|false|false|false||
|DBOR|Array|false|false|false||
|DENO|Array|false|false|false||
|DENQ|Array|false|false|false||
|DEPL|String|false|false|false||
|DESC|String|false|false|false||
|DIMS|String|false|false|false||
|DMAJ|String|false|true|false|Date de la dernière mise à jour|
|DMIS|String|false|true|false|Date de la création POP/Mistral|
|DOMN|String|false|false|false||
|DOSADRS|String|false|false|false||
|DOSS|Array|false|false|false||
|DOSURL|String|false|false|false||
|DOSURLPDF|String|false|false|false||
|DPRO|String|false|false|false||
|DPT|String|false|false|false||
|EDIF|String|false|false|false||
|EDIF2|String|false|false|false||
|EMPL|String|false|false|false||
|EMPL2|String|false|false|false||
|ETAT|Array|false|false|false||
|ETUD|String|false|false|false||
|EXEC|String|false|false|false||
|EXPO|String|false|false|false||
|HIST|String|false|false|false||
|IDAGR|Array|false|false|false||
|IMAGE|String|false|false|false||
|IMG|Array|false|false|false||
|IMPL|String|false|false|false||
|INSC|Array|false|false|false||
|INSEE|String|false|false|false||
|INSEE2|String|false|false|false||
|INTE|String|false|false|false||
|JDAT|Array|false|false|false||
|LBASE2|String|false|false|false||
|LIENS|Array|false|false|false||
|LIEU|String|false|false|false||
|LMDP|String|false|false|false||
|LOCA|String|false|false|false||
|MATR|Array|false|false|false||
|MFICH|Array|false|false|false||
|MICR|String|false|false|false||
|MOSA|String|false|false|false||
|NART|String|false|false|false||
|NINV|String|false|false|false||
|NOMS|Array|false|false|false||
|NUMA|String|false|false|false||
|NUMP|String|false|false|false||
|OBS|String|false|false|false||
|ORIG|String|false|false|false||
|PAPP|String|false|false|false||
|PARN|Array|false|false|false||
|PART|Array|false|false|false||
|PDEN|Array|false|false|false||
|PDIM|String|false|false|false||
|PERS|Array|false|false|false||
|PETA|String|false|false|false||
|PHOTO|String|false|false|false||
|PINS|String|false|false|false||
|PINT|String|false|false|false||
|PLOC|String|false|false|false||
|PPRO|String|false|false|false||
|PREP|String|false|false|false||
|PROT|String|false|false|false||
|REFA|Array|false|false|false||
|REFE|Array|false|false|false||
|REFM|String|false|false|false||
|REFP|Array|false|false|false||
|REG|String|false|false|false||
|RENP|Array|false|false|false||
|RENV|Array|false|false|false||
|REPR|Array|false|false|false||
|SCLD|Array|false|false|false||
|SCLE|Array|false|false|false||
|SCLX|Array|false|false|false||
|SOUR|String|false|false|false||
|STAD|Array|false|false|false||
|STAT|Array|false|false|false||
|STRU|Array|false|false|false||
|THEM|String|false|false|false||
|TICO|String|false|false|false||
|TITR|String|false|false|false||
|TOUT|String|false|false|false||
|VIDEO|Array|false|false|false||
|VOLS|String|false|false|false||
|WADRS|String|false|false|false||
|WCOM|String|false|false|false||
|WEB|String|false|false|false||
|WRENV|String|false|false|false||
|ZONE|String|false|false|false||
|_id|ObjectID|false|false|false||
|__v|Number|false|false|false||
## Thesaurus
|Name|Type|Required|Master|Opendata|Description|
|----|----|--------|------|--------|-----------|
|arc|String|false|false|false||
|value|String|false|false|false||
|_id|ObjectID|false|false|false||
|__v|Number|false|false|false||
## User
|Name|Type|Required|Master|Opendata|Description|
|----|----|--------|------|--------|-----------|
|email|String|true|false|false||
|institution|String|true|false|false||
|nom|String|false|false|false||
|prenom|String|false|false|false||
|group|String|true|false|false||
|role|String|true|false|false||
|password|String|true|false|false||
|hasResetPassword|Boolean|false|false|false||
|lastConnectedAt|Date|false|false|false||
|_id|ObjectID|false|false|false||
|__v|Number|false|false|false||