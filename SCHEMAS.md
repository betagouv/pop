# POP SCHEMAS
## Import
|Name|Type|Required|Master|Opendata|Description|
|----|----|--------|------|--------|-----------|
|user|ObjectID|false|true|false|Identifiant de l'utilisateur à l'origine de l'import|
|importedAt|Date|false|true|false|Date de l'import |
|institution|String|false|true|false|Institution à l'origine de l'import|
|created|Number|false|true|false|Nombre de notices créées lors de l'import|
|updated|Number|false|true|false|Nombre de notices mises à jour lors de l'import|
|rejected|Number|false|true|false|Nombre de notices rejetées lors de l'import|
|unChanged|Number|false|true|false|Nombre de notices non mises à jour lors de l'import|
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
|POP_CONTIENT_GEOLOCALISATION|String|false|true|false|Champ qui permet de savoir si la geolocalisation est disponible ou non|
|REF|String|true|false|false|Référence unique de la notice|
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
|STAT|Array|true|false|false|Statut juridique (type de propriété ; mode d’acquisition ; institution propriétaire (ville quand la commune est propriétaire) ; établissement affectataire|
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
|POP_CONTIENT_GEOLOCALISATION|String|false|true|false|Champ généré à chaque sauvegarde de la notice. Si notice contient des une géolocalisation, la valeur du champs sera 'oui', sinon 'non'|
|POP_COORDINATES_POLYGON.type|String|false|false|false||
|POP_COORDINATES_POLYGON.coordinates|Array|false|false|false||
|POP_DATE|Array|false|true|false|Champ qui sera utilisé pour traduire les date en format requetable|
|POP_IMPORT|Array|false|false|false||
|TOUT|String|false|false|false|Champs qui devait contenir tous les champs dans mistral. Aujourd'hui est vide [DEPRECIE ?]|
|ACTU|String|false|false|false|Destinations successives et actuelle |
|ADRS|String|false|false|false|Adresse|
|AFFE|String|false|false|false|Affectataire|
|AIRE|String|false|false|false|Aire d'étude|
|APPL|String|false|false|false|Appellation et titre|
|APRO|Array|false|false|false||
|ARCHEO|String|false|false|false|Référence dans la base Patriarche|
|AUTP|Array|false|false|false|Auteurs phototype|
|AUTR|Array|false|false|false|Auteurs de l'oeuvre|
|CADA|Array|false|false|false|Référence cadastrale|
|CANT|String|false|false|false|Canton|
|COLL|Array|false|false|false|Décompte des oeuvres recensées|
|COM|String|false|false|false|Commune|
|COOR|String|false|false|false|Coordonnées Lambert (ou autres) d'un points|
|COORM|String|false|false|false|Coordonnées Lambert (ou autres) multiples|
|COPY|Array|false|false|false|CopyRight|
|COUV|Array|false|false|false|Type de la couverture|
|DATE|Array|false|false|false|Date protection|
|DBOR|String|false|false|false|Date de rédaction de la notice|
|DOMN|Array|false|false|false|Domaines|
|DENO|Array|false|false|false|Dénomination |
|DENQ|String|false|false|false|Date d'enquête|
|DEPL|String|false|false|false|Partie déplacée|
|DESC|String|false|false|false|Commentaire description|
|DIMS|String|false|false|false|Dimensions|
|DMAJ|String|false|true|false|Date de la dernière mise à jour|
|DMIS|String|false|true|false|Date de la création POP/Mistral|
|DOSS|String|false|false|false|Dossier|
|DPRO|String|false|false|false|Date protection|
|DPT|String|false|false|false|Département|
|EDIF|String|false|false|false|Edifice de conservation|
|ELEV|Array|false|false|false|Parti d’élévation extérieure|
|ENER|Array|false|false|false|Source de l'énergie|
|ESCA|Array|false|false|false|Emplacement, forme et structure de l’escalier |
|ETAG|Array|false|false|false|Vaisseau et étage|
|ETAT|String|false|false|false|Etat de conservation|
|ETUD|String|false|false|false|Parties non étud|
|GENR|String|false|false|false|Destinataire|
|HIST|String|false|false|false|Commentaire historique|
|HYDR|String|false|false|false|Cours d'eau|
|IMPL|Array|false|false|false|Milieu d'implantation|
|INSEE|String|false|false|false|Numéro INSEE de la commune|
|INTE|Array|false|false|false|Intérêt de l'oeuvre|
|JATT|Array|false|false|false|Justification de l'attribution|
|JDAT|Array|false|false|false|Justification de la datation|
|LBASE2|String|false|false|false|[PAS affiché]|
|LIEU|String|false|false|false|Lieu-dit|
|LOCA|String|false|false|false|Localisation |
|MFICH|String|false|false|false|[PAS affiché]|
|MOSA|String|false|false|false|Mosaïques|
|MHPP|String|false|false|false|Eléments protégés MH|
|MICR|String|false|false|false|Numéro de microfiche|
|MURS|Array|false|false|false|Matériau du gros-oeuvre et mise en oeuvre |
|NBOR|String|false|false|false|no Bordereaus|
|NOMS|Array|false|false|false|Noms des rédacteurs de la notice et du dossier|
|OBS|String|false|false|false|Observations|
|PAFF|String|false|false|false|Précisions sur l'affectataire |
|PART|Array|false|false|false|Parties constituantes|
|PARN|Array|false|false|false|Parties non étud|
|PDEN|String|false|false|false|Précision sur la dénomination|
|PERS|Array|false|false|false|Personnalitées|
|PLAN|String|false|false|false|Parti de plan|
|PLOC|String|false|false|false|Précision sur la localisation|
|PPRO|String|false|false|false|Précisions sur la protection MH|
|PREP|Array|false|false|false|Précision sur la représentation|
|PROT|Array|false|false|false|Nature de la protection MH|
|PSTA|String|false|false|false|Précisions sur le statut de la propriété|
|REFE|Array|false|false|false|Référence de l'édifice de conservation|
|REFP|Array|false|false|false|Références des parties constituantes étudiées|
|REFO|Array|false|false|false|REFO|
|REG|String|false|false|false|Region|
|REMA|String|false|false|false|Eléments remarquables|
|REMP|String|false|false|false|Remploi|
|RENV|Array|false|false|false|N° de renvoi au domaine MH ou au domaine INVENTAIRE|
|REPR|String|false|false|false|Représentation |
|RFPA|String|false|false|false|Identifiant Patrimoine|
|SCLD|Array|false|false|false|Datation des campagnes secondaires de construction|
|SCLE|Array|false|false|false|Datation des campagnes principales de construction|
|SCLX|Array|false|false|false|[PAS affiché]|
|SITE|String|false|false|false|Site, secteur ou zone de protection|
|STAT|String|false|false|false|Statut de la propriété|
|TECH|Array|false|false|false|Technique du décor des immeubles par nature |
|TICO|String|false|false|false|Titre courant|
|TOIT|Array|false|false|false|Matériau de la couverture |
|TYPO|String|false|false|false|Typologie |
|VERT|String|false|false|false|Couvert et découvert de jardin |
|REFIM|String|false|false|false|[PAS affiché]|
|IMG|Array|false|false|false|[PAS affiché]|
|VIDEO|String|false|false|false|[PAS affiché]|
|DOSURL|String|false|false|false|Dossier URL|
|DOSURLPDF|String|false|true|false|Dossier PDF|
|DOSADRS|String|false|false|false|Dossier adresse|
|LIENS|Array|false|false|false|Liens Divers|
|IMAGE|String|false|false|false|[PAS affiché]|
|VISI|Array|false|false|false|Ouverture au public|
|VOCA|String|false|false|false|Vocable |
|VOUT|Array|false|false|false|Type et nature du couvrement |
|WEB|String|false|false|false|Visite guidé|
|ZONE|String|false|false|false|Zone Lambert ou autres|
|THEM|String|false|false|false|Thème |
|ACMH|String|false|false|false|[PAS affiché]|
|ACURL|String|false|false|false|[PAS affiché]|
|WADRS|String|false|false|false|[PAS affiché]|
|WCOM|String|false|false|false|[PAS affiché]|
|WRENV|String|false|false|false|[PAS affiché]|
|REFM|String|false|false|false|[PAS affiché]|
|CONTACT|String|false|true|false|Contact |
|IDAGR|String|false|false|false|[PAS affiché]|
|LMDP|String|false|false|false|[PAS affiché]|
|PINT|String|false|false|false|intérêt oeuvre|
|DLAB|String|false|false|false|Date du label|
|_id|ObjectID|false|false|false||
|__v|Number|false|false|false||
## Mnr
|Name|Type|Required|Master|Opendata|Description|
|----|----|--------|------|--------|-----------|
|PRODUCTEUR|String|false|true|false|Producteur de la donnée : Valeur MNR|
|BASE|String|false|true|false|Nom de la base : Valeur Récupération artistique (MNR Rose-Valland)|
|CONTIENT_IMAGE|String|false|true|false|Champ généré à chaque sauvegarde de la notice. Si notice contient des images, la valeur du champs sera oui', sinon 'non'. Ce champs est utilisé pour l'affichage de la phototèque mais pourrait être supprimé et remplacer par une fonction exist dans ES|
|REF|String|false|true|false|Référence unique de la notice|
|POP_IMPORT|Array|false|false|false||
|TOUT|String|false|true|false|[PAS AFFICHE]|
|AUTR|Array|false|true|false|Auteur /exécutant / collecteur|
|PAUT|String|false|true|false|Precisions auteur|
|ATTR|String|false|true|false|Anciennes attributions|
|ECOL|String|false|true|false|Ecole |
|TITR|String|false|true|false|Titre |
|ATIT|String|false|true|false|Ancien titre|
|PTIT|String|false|true|false|Précision titre|
|DENO|Array|false|true|false|Dénomination du bien|
|DESC|String|false|true|false|Description |
|DOMN|Array|false|true|false|Domaine (catégorie du bien)|
|LOCA|String|false|true|false|Localisation |
|INSC|String|false|true|false|Inscriptions |
|MARQ|String|false|true|false|Marques |
|OBSE|String|false|true|false|Observations |
|ETAT|String|false|true|false|Etat de conservation|
|GENE|String|false|true|false|Genèse |
|PROV|String|false|true|false|Provenance |
|HIST|String|false|true|false|Historique |
|HIST2|String|false|true|false|[PAS AFFICHE]|
|HIST3|String|false|true|false|[PAS AFFICHE]|
|HIST4|String|false|true|false|[PAS AFFICHE]|
|HIST5|String|false|true|false|[PAS AFFICHE]|
|HIST6|String|false|true|false|[PAS AFFICHE]|
|SCLE|Array|false|true|false|Siècle |
|STYL|String|false|true|false|Style |
|MILL|String|false|true|false|Millenaire |
|TECH|Array|false|true|false|Technique |
|DIMS|Array|false|true|false|Dimensions |
|VIDEO|Array|false|true|false|[PAS AFFICHE]|
|INV|String|false|true|false|N°Inventaire, ancien(s) numéros(s), autres numéros, N° de dépôt|
|EXPO|String|false|true|false|Exposition |
|BIBL|String|false|true|false|Bibliographie |
|AATT|String|false|true|false|Ancienne attribution|
|AUTI|String|false|true|false|Autre titre|
|CATE|String|false|true|false|Catégorie |
|CATE_DEPREC|String|false|true|false|[PAS AFFICHE]|
|NOTE|String|false|true|false|Notes |
|REDC|Array|false|true|false|Rédacteurs |
|DREP|String|false|true|false|Date de la représentation|
|PREP|String|false|true|false|Précisions sur la représentation|
|REPR|String|false|true|false|Représentation |
|SREP|String|false|true|false|Sujet de la représentation (source littéraire ou musicale) |
|REFIM|String|false|true|false|Adresses images jointes générique (actuellement non utilisé)|
|DMAJ|String|false|true|false|Date de la dernière mise à jour|
|DMIS|String|false|true|false|Date de la création POP/Mistral|
|AFFE|String|false|true|false|Etablissement affectataire qui existe dans d’autres bases|
|NUMS|String|false|true|false|Autres numéros|
|SUITE|String|false|true|false|OEuvres liées, ensemble|
|COMM|String|false|true|false|Commentaire |
|NOTE2|String|false|true|false|[PAS AFFICHE]|
|RESUME|String|false|true|false|Résumé |
|PHOT|String|false|true|false|Droits de copie photo |
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
|ACQU|String|false|false|false|[PAS AFFICHE]|
|ADRS|String|false|false|false|Adresse |
|ADRS2|String|false|false|false|[PAS AFFICHE]|
|AFIG|Array|false|false|false|Auteur(s) de la source figurée|
|AIRE|String|false|false|false|Aire d'étude|
|APPL|String|false|false|false|Appellation et titre|
|ATEL|String|false|false|false|Nom de l’atelier, de la manufacture, de la fabrique ou de l’école |
|AUTP|String|false|false|false|Auteurs phototype|
|AUTR|Array|false|false|false|Auteurs de l'oeuvre|
|BIBL|String|false|false|false|[PAS AFFICHE]|
|CANT|String|false|false|false|Canton |
|CATE|Array|false|false|false|Catégorie technique|
|COM|String|false|false|false|Commune |
|COM2|String|false|false|false|[PAS AFFICHE]|
|CONTACT|String|false|true|false|Contact |
|COOR|String|false|false|false|Coordonnées Lambert (ou autres) d'un points |
|COORM|String|false|false|false|Coordonnées Lambert (ou autres) multiples |
|COPY|String|false|false|false|CopyRight|
|DATE|Array|false|false|false|Datation en années|
|DBOR|Array|false|false|false|Date de rédaction de la notice|
|DENO|Array|false|false|false|Dénomination |
|DENQ|Array|false|false|false|Date d'enquête|
|DEPL|String|false|false|false|Partie déplacée|
|DESC|String|false|false|false|Commentaire description|
|DIMS|String|false|false|false|Dimensions |
|DMAJ|String|false|true|false|Date de la dernière mise à jour|
|DMIS|String|false|true|false|Date de la création POP/Mistral|
|DOMN|String|false|false|false|Domaines |
|DOSADRS|String|false|false|false|Dossier adresse|
|DOSS|Array|false|false|false|Dossier |
|DOSURL|String|false|false|false|Dossier URL|
|DOSURLPDF|String|false|true|false|Dossier PDF |
|DPRO|String|false|false|false|Date protection|
|DPT|String|false|false|false|Département |
|EDIF|String|false|false|false|Edifice de conservation|
|EDIF2|String|false|false|false|[PAS AFFICHE]|
|EMPL|String|false|false|false|Emplacement de l’œuvre dans l’édifice|
|EMPL2|String|false|false|false|[PAS AFFICHE]|
|ETAT|Array|false|false|false|Etat de conservation|
|ETUD|String|false|false|false|Parties non étud|
|EXEC|String|false|false|false|Nom actuel ou historique du lieu d’exécution |
|EXPO|String|false|false|false|[PAS AFFICHE]|
|HIST|String|false|false|false|Commentaire historique|
|IDAGR|Array|false|false|false|[PAS AFFICHE]|
|IMAGE|String|false|false|false|[PAS AFFICHE]|
|IMG|Array|false|false|false|[PAS AFFICHE]|
|IMPL|String|false|false|false|Milieu d'implantation|
|INSC|Array|false|false|false|Inscriptions, marques, emblématique et poinçons|
|INSEE|String|false|false|false|Numéro INSEE de la commune|
|INSEE2|String|false|false|false|[PAS AFFICHE]|
|INTE|String|false|false|false|Intérêt de l'oeuvre|
|JDAT|Array|false|false|false|Justification de la datation|
|LBASE2|String|false|false|false|[PAS AFFICHE]|
|LIENS|Array|false|false|false|Liens Divers|
|LIEU|String|false|false|false|Lieu-dit |
|LMDP|String|false|false|false|[PAS AFFICHE]|
|LOCA|String|false|false|false|Localisation |
|MATR|Array|false|false|false|Matériaux |
|MFICH|Array|false|false|false|[PAS AFFICHE]|
|MICR|String|false|false|false|Numéro de microfiche|
|MOSA|String|false|false|false|Mosaïques |
|NART|String|false|false|false|Numérotation artificielle|
|NINV|String|false|false|false|[PAS AFFICHE]|
|NOMS|Array|false|false|false|Noms des rédacteurs de la notice et du dossier |
|NUMA|String|false|false|false|[PAS AFFICHE]|
|NUMP|String|false|false|false|[PAS AFFICHE]|
|OBS|String|false|false|false|Observations |
|ORIG|String|false|false|false|Origine de l’œuvre (lieu de provenance ou de destination)|
|PAPP|String|false|false|false|Préc. appart|
|PARN|Array|false|false|false|Parties non étud|
|PART|Array|false|false|false|Parties constituantes|
|PDEN|Array|false|false|false|Précision sur la dénomination|
|PDIM|String|false|false|false|Précisions sur les dimensions|
|PERS|Array|false|false|false|Personnalitées |
|PETA|String|false|false|false|Précisions sur l’état de conservation|
|PHOTO|String|false|false|false|[PAS AFFICHE]|
|PINS|String|false|false|false|Précisions sur les inscriptions, marques, emblématique et poinçons |
|PINT|String|false|false|false|Intérêt oeuvre|
|PLOC|String|false|false|false|Précision sur la localisation|
|PPRO|String|false|false|false|Précisions sur la protection MH|
|PREP|String|false|false|false|Précision sur la représentation|
|PROT|String|false|false|false|Nature de la protection MH|
|REFA|Array|false|false|false|Référence de l'édifice de conservation|
|REFE|Array|false|false|false|Référence de l’ensemble ou de l'oeuvre|
|REFM|String|false|false|false|[PAS AFFICHE]|
|REFP|Array|false|false|false|Références des parties constituantes étudiées |
|REG|String|false|false|false|Region |
|RENP|Array|false|false|false|[PAS AFFICHE]|
|RENV|Array|false|false|false|N° de renvoi au domaine MH ou au domaine INVENTAIRE|
|REPR|Array|false|false|false|Représentation |
|SCLD|Array|false|false|false|[PAS AFFICHE]|
|SCLE|Array|false|false|false|Datation des campagnes principales de construction |
|SCLX|Array|false|false|false|[PAS AFFICHE]|
|SOUR|String|false|false|false|[PAS AFFICHE]|
|STAD|Array|false|false|false|Stade de la création|
|STAT|Array|false|false|false|Statut de la propriété|
|STRU|Array|false|false|false|Structure et typologie|
|THEM|String|false|false|false|Thème |
|TICO|String|false|false|false|Titre courant|
|TITR|String|false|false|false|[PAS AFFICHE]|
|TOUT|String|false|false|false|[PAS AFFICHE]|
|VIDEO|Array|false|false|false|[PAS AFFICHE]|
|VOLS|String|false|false|false|Objet(s) volé(s)|
|WADRS|String|false|false|false|[PAS AFFICHE]|
|WCOM|String|false|false|false|[PAS AFFICHE]|
|WEB|String|false|false|false|Visite guidé |
|WRENV|String|false|false|false|[PAS AFFICHE]|
|ZONE|String|false|false|false|Zone Lambert ou autre|
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