## Import
{"name":"user","type":"ObjectID","master":true,"description":"Identifiant de l'utilisateur à l'origine de l'import"}
{"name":"importedAt","type":"Date","master":true,"description":"Date de l'import "}
{"name":"institution","type":"String","master":true,"description":"Institution à l'origine de l'import"}
{"name":"created","type":"Number","master":true,"description":"Nombre de notices créées lors de l'import"}
{"name":"updated","type":"Number","master":true,"description":"Nombre de notices mises à jour lors de l'import"}
{"name":"rejected","type":"Number","master":true,"description":"Nombre de notices rejetées lors de l'import"}
{"name":"unChanged","type":"Number","master":true,"description":"Nombre de notices non mises à jour lors de l'import"}
{"name":"_id","type":"ObjectID","opendata":"","master":"","description":""}
{"name":"__v","type":"Number","opendata":"","master":"","description":""}
## Joconde
{"name":"PRODUCTEUR","type":"String","master":true,"description":"Producteur de la donnée : MUSEE"}
{"name":"BASE","type":"String","master":true,"description":"Nom de la base : Collections des musées de France (Joconde)"}
{"name":"CONTIENT_IMAGE","type":"String","master":true,"description":"Champ généré à chaque sauvegarde de la notice. Si notice contient des images, la valeur du champs sera oui', sinon 'non'. Ce champs est utilisé pour l'affichage de la phototèque mais pourrait être supprimé et remplacer par une fonction exist dans ES"}
{"name":"POP_COORDONNEES.lat","type":"Number","master":true,"description":"Latitude de la notice en WGS84"}
{"name":"POP_COORDONNEES.lon","type":"Number","master":true,"description":"Longitude de la notice en WGS84"}
{"name":"POP_CONTIENT_GEOLOCALISATION","type":"String","master":true,"description":"Champ qui permet de savoir si la geolocalisation est disponible ou non"}
{"name":"REF","type":"String","required":true,"master":false,"description":"Référence unique de la notice"}
{"name":"POP_IMPORT","type":"Array","opendata":"","master":"","description":""}
{"name":"REFMIS","type":"String","master":false,"description":"Référence de mise à jour (marque de la modification de la notice)"}
{"name":"ADPT","type":"Array","master":false,"description":"[Peut être déprécié : Pas affiché en production ni en consultation] Ancien dépôt / changement d’affectation"}
{"name":"APPL","type":"String","master":false,"description":"Appellation"}
{"name":"APTN","type":"String","master":false,"description":"Ancienne appartenance (nom du donateur / testateur/ vendeur) "}
{"name":"ATTR","type":"String","master":false,"description":"Anciennes attributions"}
{"name":"AUTR","type":"String","master":false,"description":"Auteur /exécutant / collecteur"}
{"name":"BIBL","type":"String","master":false,"description":"Bibliographie"}
{"name":"COMM","type":"String","master":false,"description":"Commentaires"}
{"name":"CONTACT","type":"String","master":true,"description":"Lien contact musée"}
{"name":"COOR","type":"String","master":false,"description":"Coordinateur"}
{"name":"COPY","type":"String","master":false,"description":"Copyright notice"}
{"name":"DACQ","type":"String","master":false,"description":"Date d’acquisition"}
{"name":"DATA","type":"String","master":false,"description":"[Peut être déprécié : Pas affiché en production ni en consultation]  "}
{"name":"DATION","type":"String","master":false,"description":"[Peut être déprécié : Pas affiché en production ni en consultation]  "}
{"name":"DDPT","type":"String","master":false,"description":"Date de dépôt / changement d’affectation"}
{"name":"DECV","type":"String","master":false,"description":"Découverte / collecte / récolte (lieu de découverte / collecte / récolte) ; Type de site ; Méthode de découverte /collecte / récolte ; Date de découverte / collecte / récolte ; Découvreur / collecteur) "}
{"name":"DENO","type":"Array","master":false,"description":"Dénomination du bien"}
{"name":"DEPO","type":"String","master":false,"description":"Dépôt / établissement dépositaire"}
{"name":"DESC","type":"String","master":false,"description":"Description "}
{"name":"DESY","type":"String","master":false,"description":"[Peut être déprécié : Pas affiché en production ni en consultation]"}
{"name":"DIFFU","type":"String","master":false,"description":"[Peut être déprécié : Pas affiché en production ni en consultation]"}
{"name":"DIMS","type":"String","master":false,"description":"Mesures  / Dimensions"}
{"name":"DMAJ","type":"String","master":true,"description":"Date de la dernière mise à jour"}
{"name":"DMIS","type":"String","master":true,"description":"Date de la création POP/Mistral"}
{"name":"DOMN","type":"Array","master":false,"description":"Domaine (catégorie du bien) "}
{"name":"DREP","type":"String","master":false,"description":"Date de la représentation"}
{"name":"ECOL","type":"Array","master":false,"description":"Ecole "}
{"name":"EPOQ","type":"Array","master":false,"description":"Epoque /style / mouvement "}
{"name":"ETAT","type":"Array","master":false,"description":"[surement à nettoyer] Etat du bien. C'est une liste finie de valeurs possibles"}
{"name":"EXPO","type":"String","master":false,"description":"Exposition "}
{"name":"GENE","type":"Array","master":false,"description":"Genèse "}
{"name":"GEOHI","type":"Array","master":false,"description":"Géographie historique"}
{"name":"HIST","type":"String","master":false,"description":"Historique – Objets associés "}
{"name":"IMAGE","type":"String","master":false,"description":"[Je ne sais pas à quoi ce champ sert]  "}
{"name":"IMG","type":"Array","master":true,"description":"Contient les images. Le plus souvent généré grâce à REFIM"}
{"name":"INSC","type":"Array","master":false,"description":"Inscriptions "}
{"name":"INV","type":"String","master":false,"description":"N°Inventaire, ancien(s) numéros(s), autres numéros, N° de dépôt"}
{"name":"LABEL","type":"String","master":true,"description":"Appellation musée de France : logo : Champs ayant toujours la valeur 'Musée de France au sens de la loi n°2002-5 du 4 janvier 2002'"}
{"name":"LABO","type":"String","master":false,"description":"[Peut être déprécié : Pas affiché en production ni en consultation]"}
{"name":"LARC","type":"String","master":false,"description":"[Peut être déprécié : Pas affiché en production ni en consultation]"}
{"name":"LIEUX","type":"String","master":false,"description":"Lieu de création / d’exécution / d’utilisation"}
{"name":"LOCA","type":"String","master":false,"description":"Localisation"}
{"name":"LOCA2","type":"String","master":false,"description":"[Peut être déprécié : Pas affiché en production ni en consultation]"}
{"name":"LOCA3","type":"String","master":false,"description":"[Peut être déprécié : Pas affiché en production ni en consultation]"}
{"name":"MILL","type":"Array","master":false,"description":"Millésime de création / exécution "}
{"name":"MILU","type":"String","master":false,"description":"Millésime d’utilisation "}
{"name":"MOSA","type":"String","master":false,"description":"[Peut être déprécié : Pas affiché en production ni en consultation]"}
{"name":"MSGCOM","type":"String","master":false,"description":"[Surement à nettoyer. J'ai vu du code dans ce champ] Lien commande de reproduction et/ou de conditions d’utilisation "}
{"name":"MUSEO","type":"String","master":false,"description":"Lien Numéro MUSEOFILE"}
{"name":"NSDA","type":"String","master":false,"description":"Numéro de site"}
{"name":"ONOM","type":"Array","master":false,"description":"Onomastique"}
{"name":"PAUT","type":"String","master":false,"description":"Précisions /auteur / exécutant / collecteur"}
{"name":"PDAT","type":"String","master":false,"description":"[Peut être déprécié : Pas affiché en production ni en consultation]"}
{"name":"PDEC","type":"String","master":false,"description":"Précisions sur la découverte / collecte / récolte"}
{"name":"PEOC","type":"Array","master":false,"description":"Période de l’original copié"}
{"name":"PERI","type":"Array","master":false,"description":"Période de création / exécution "}
{"name":"PERU","type":"Array","master":false,"description":"Période d’utilisation"}
{"name":"PHOT","type":"String","master":false,"description":"Crédits photographiques"}
{"name":"PINS","type":"String","master":false,"description":"Précisions sur les inscriptions"}
{"name":"PLIEUX","type":"String","master":false,"description":"Précisions sur le lieu de création/ d’exécution / d’utilisation"}
{"name":"PREP","type":"Array","master":false,"description":"Précisions sur le sujet représenté "}
{"name":"PUTI","type":"String","master":false,"description":"Précisions sur l’utilisation "}
{"name":"RANG","type":"String","master":false,"description":"[Peut être déprécié : Pas affiché en production ni en consultation] "}
{"name":"REDA","type":"Array","master":false,"description":"Rédacteur "}
{"name":"REFIM","type":"String","master":false,"description":"Référence image : lien texte/ image : C'est un code qui permet de retrouver l'url de l'image"}
{"name":"REPR","type":"String","master":false,"description":"Sujet représenté "}
{"name":"RETIF","type":"String","master":false,"description":"[Peut être déprécié : Pas affiché en production ni en consultation] "}
{"name":"SREP","type":"Array","master":false,"description":"Source de la représentation"}
{"name":"STAT","type":"Array","required":true,"master":false,"description":"Statut juridique (type de propriété ; mode d’acquisition ; institution propriétaire (ville quand la commune est propriétaire) ; établissement affectataire"}
{"name":"TECH","type":"Array","master":false,"description":"Matériaux et techniques"}
{"name":"TICO","type":"String","master":false,"description":"[Peut être déprécié : A vérifier. Non présent en production] "}
{"name":"TITR","type":"String","master":false,"description":"Titre de l'oeuvre "}
{"name":"TOUT","type":"String","master":false,"description":"[Peut être déprécié : A vérifier. Non présent en production] "}
{"name":"UTIL","type":"Array","master":false,"description":"Utilisation / Destination"}
{"name":"VIDEO","type":"Array","master":false,"description":"[Peut être déprécié : A vérifier]"}
{"name":"WWW","type":"String","master":false,"description":"Lien site associé / site complémentaire"}
{"name":"LVID","type":"String","master":false,"description":"Lien video"}
{"name":"_id","type":"ObjectID","opendata":"","master":"","description":""}
{"name":"__v","type":"Number","opendata":"","master":"","description":""}
## Memoire
{"name":"PRODUCTEUR","type":"String","master":true,"description":"      Producteur de la donnée déterminé grâce à la référence :       IV=INV      OA=CAOA      MH=CRMH      AR=ARCH      AP=SDAP      Autre=SAP"}
{"name":"BASE","type":"String","master":true,"description":"Nom de la base : Photographies (Mémoire)"}
{"name":"CONTIENT_IMAGE","type":"String","master":true,"description":"Champ généré à chaque sauvegarde de la notice. Si notice contient des images, la valeur du champs sera oui', sinon 'non'. Ce champs est utilisé pour l'affichage de la phototèque mais pourrait être supprimé et remplacer par une fonction exist dans ES"}
{"name":"POP_IMPORT","type":"Array","opendata":"","master":"","description":""}
{"name":"REF","type":"String","master":false,"description":"Référence unique de la notice"}
{"name":"TOUT","type":"String","master":false,"description":"Index global [Peut etre déprécié]"}
{"name":"ADRESSE","type":"String","master":false,"description":"Adresse "}
{"name":"AUTOEU","type":"String","master":false,"description":"Auteur oeuvre représentée"}
{"name":"AUTG","type":"String","master":false,"description":"Auteur gravure"}
{"name":"AUTP","type":"String","master":false,"description":"Notice biblio"}
{"name":"AUTOR","type":"String","master":false,"description":"Auteur original"}
{"name":"AUTTI","type":"String","master":false,"description":"Auteur tirage"}
{"name":"COM","type":"String","master":false,"description":"Commune"}
{"name":"DOM","type":"String","master":false,"description":"Domaine"}
{"name":"EDIF","type":"String","master":false,"description":"Nom édifice"}
{"name":"EXPO","type":"String","master":false,"description":"Référence d’exposition de l’image "}
{"name":"JDATPV","type":"String","master":false,"description":"Justif date pv"}
{"name":"LIEUCOR","type":"String","master":false,"description":"Lieu cons orig."}
{"name":"COTECOR","type":"String","master":false,"description":"Cote cons orig. "}
{"name":"LIEUCTI","type":"String","master":false,"description":"Lieu cons tir. "}
{"name":"COTECTI","type":"String","master":false,"description":"Cote conservation du tirage "}
{"name":"LIEUCP","type":"String","master":false,"description":"Lieu cons pho."}
{"name":"COTECP","type":"String","master":false,"description":"Cote conservation du phototype"}
{"name":"LEG","type":"String","master":false,"description":"Légende "}
{"name":"OBJT","type":"String","master":false,"description":"Nom objet"}
{"name":"OBS","type":"String","master":false,"description":"Obs phototype"}
{"name":"OBSOR","type":"String","master":false,"description":"Obs original"}
{"name":"OBSTI","type":"String","master":false,"description":"Obs tirage"}
{"name":"PAYS","type":"String","master":false,"description":"Pays   "}
{"name":"PUBLI","type":"String","master":false,"description":"Publication "}
{"name":"TIREDE","type":"String","master":false,"description":"Pub. photograph."}
{"name":"ROLE","type":"String"}
{"name":"PRECOR","type":"String","master":false,"description":"Préc original"}
{"name":"SERIE","type":"String","master":false,"description":"Titre série"}
{"name":"THEATRE","type":"String","master":false,"description":""}
{"name":"TITRE","type":"String","master":false,"description":""}
{"name":"DMAJ","type":"String","master":true,"description":"Date de la dernière mise à jour"}
{"name":"DMIS","type":"String","master":true,"description":"Date de la création POP/Mistral"}
{"name":"IDPROD","type":"String","master":false,"description":"Emetteur (nom) "}
{"name":"NUMCD","type":"String","master":false,"description":"Numéro CD"}
{"name":"NUMF","type":"String","master":false,"description":"No de fond"}
{"name":"INSEE","type":"String","master":false,"description":"Code INSEE"}
{"name":"NVD","type":"String","master":false,"description":"vidéodisque"}
{"name":"MARQ","type":"String","master":false,"description":"Ordre images"}
{"name":"ACC","type":"String","master":false,"description":"Accessoire pose"}
{"name":"ACQU","type":"String","master":false,"description":"Acquisition"}
{"name":"ADPHOT","type":"String","master":false,"description":"Adresse personne "}
{"name":"AIRE","type":"String","master":false,"description":"Aire d'étude"}
{"name":"ANUMP","type":"String","master":false,"description":"Ancien numéro (ancienne cote du phototype)"}
{"name":"COPY","type":"String","master":false,"description":"Crédit photo "}
{"name":"COULEUR","type":"String","master":false,"description":"Couleur [Devrait contenir oui ou non mais contient bcp plus . donnée à nettoyer]"}
{"name":"COSTUME","type":"String","master":false,"description":"Costume de la personne représentée"}
{"name":"DATIMM","type":"String","master":false,"description":"Date immatricul"}
{"name":"DATOEU","type":"String","master":false,"description":"Date oeuv année"}
{"name":"DATPV","type":"String","master":false,"description":"Date prise vue "}
{"name":"DATOR","type":"String","master":false,"description":"Date original"}
{"name":"DATTI","type":"String","master":false,"description":"Date tirage"}
{"name":"DATG","type":"String","master":false,"description":"Date gravure"}
{"name":"DATD","type":"String","master":false,"description":"Date dessin"}
{"name":"DIFF","type":"String","master":false,"description":"Droits diffusion"}
{"name":"DPT","type":"String","master":false,"description":"Département "}
{"name":"EDIARCH","type":"String","master":false,"description":"Interprétation"}
{"name":"ECH","type":"String","master":false,"description":"Echelle "}
{"name":"FORMAT","type":"String","master":false,"description":"Format phototype"}
{"name":"FORMATOR","type":"String","master":false,"description":"Format original"}
{"name":"FORMATTI","type":"String","master":false,"description":"Format tirage"}
{"name":"LBASE","type":"Array","master":false,"description":"LBASE contient la référence vers la notice Palissy ou Mérimée contenant l'image"}
{"name":"WEB","type":"String","master":false,"description":"Accès Mémoire"}
{"name":"LIB","type":"String","master":false,"description":"Mots candidats"}
{"name":"LOCA","type":"String","master":false,"description":"Localisation "}
{"name":"LIEUORIG","type":"String","master":false,"description":"Lieu de dépôt"}
{"name":"MCGEO","type":"String","master":false,"description":"Nom géographique"}
{"name":"MCL","type":"String","master":false,"description":"Mots clés"}
{"name":"MENTIONS","type":"String","master":false,"description":"Mentions photo"}
{"name":"MENTOR","type":"String","master":false,"description":"Mentions orig"}
{"name":"MENTTI","type":"String","master":false,"description":"Mentions tirage"}
{"name":"MCPER","type":"String","master":false,"description":"Nom personne"}
{"name":"VUECD","type":"String","master":false,"description":"No vue CD"}
{"name":"NUMAUTP","type":"String","master":false,"description":"Cote photographe"}
{"name":"NUMCAF","type":"String","master":false,"description":"No carte fenêtre"}
{"name":"ANUMOR","type":"String","master":false,"description":"No original(anc)"}
{"name":"NUMOR","type":"String","master":false,"description":"No original"}
{"name":"NUMP","type":"String","master":false,"description":"No phototype "}
{"name":"ANUMTI","type":"String","master":false,"description":"Ancien numéro du tirage"}
{"name":"NUMTI","type":"String","master":false,"description":"No tirage"}
{"name":"RENV","type":"String","master":false,"description":"Renvoi "}
{"name":"REG","type":"String","master":false,"description":"Région "}
{"name":"SENS","type":"String","master":false,"description":"Sens [Qu'est ce que c'est ?] "}
{"name":"SCLE","type":"String","master":false,"description":"Date oeuv siècle"}
{"name":"SUP","type":"String","master":false,"description":"Support "}
{"name":"TECH","type":"String","master":false,"description":"Technique photo"}
{"name":"TECHOR","type":"String","master":false,"description":"Technique orig"}
{"name":"TECHTI","type":"String","master":false,"description":"Technique tirage"}
{"name":"TOILE","type":"String","master":false,"description":"Toile de fond"}
{"name":"TYP","type":"String","master":false,"description":"Type  [Qu'est ce que c'est ?]"}
{"name":"TYPDOC","type":"String","master":false,"description":"phototype argentique"}
{"name":"TYPEIMG","type":"String","master":false,"description":"Type image num"}
{"name":"TYPSUPP","type":"String","master":false,"description":"Type support num "}
{"name":"VIDEO","type":"String","master":false,"description":"Vidéo [Semble être doublon avec IMG]"}
{"name":"LBASE2","type":"String","master":false,"description":"Liens base  [Quelle différence avec LBASE?]"}
{"name":"LEG2","type":"String","master":false,"description":"Légende thes. "}
{"name":"REFIM","type":"String","master":false,"description":"Ref Image"}
{"name":"REFIMG","type":"String","master":false,"description":"Nom Image"}
{"name":"MOSA","type":"String","master":false,"description":"Mosaïques "}
{"name":"SITE","type":"String","master":false,"description":"SITE"}
{"name":"NUMSITE","type":"String","master":false,"description":"N° du site "}
{"name":"NUMOP","type":"String","master":false,"description":"N° d'opération"}
{"name":"CHRONO","type":"String","master":false,"description":"Chronologie "}
{"name":"STRUCT","type":"String","master":false,"description":"Structure "}
{"name":"SUJET","type":"String","master":false,"description":"Sujet "}
{"name":"TICO","type":"String","master":false,"description":"Titre du dossier"}
{"name":"NUMI","type":"String","master":false,"description":"Ident. support"}
{"name":"LIEU","type":"String","master":false,"description":"Lieu-dit "}
{"name":"ADRS","type":"String","master":false,"description":"Adresse saisie"}
{"name":"CONTACT","type":"String","master":true,"description":"Contact "}
{"name":"EMET","type":"String","master":false,"description":"Emetteur (nom) "}
{"name":"NUM","type":"String","master":false,"description":"N° support "}
{"name":"IMG","type":"String","master":false,"description":"Lien vers l'image"}
{"name":"WCOM","type":"String","master":false,"description":"Ville [Quelle difference avec COM ?]"}
{"name":"LIENS","type":"String","master":false,"description":"Liens divers"}
{"name":"LAUTP","type":"String","master":false,"description":"Notice biblio"}
{"name":"_id","type":"ObjectID","opendata":"","master":"","description":""}
{"name":"__v","type":"Number","opendata":"","master":"","description":""}
## Merimee
{"name":"REF","type":"String","master":false,"description":"Référence unique de la notice"}
{"name":"PRODUCTEUR","type":"String","master":false,"description":""}
{"name":"BASE","type":"String","master":true,"description":"Nom de la base : Patrimoine architectural (Mérimée)"}
{"name":"CONTIENT_IMAGE","type":"String","master":true,"description":"Champ généré à chaque sauvegarde de la notice. Si notice contient des images, la valeur du champs sera oui', sinon 'non'. Ce champs est utilisé pour l'affichage de la phototèque mais pourrait être supprimé et remplacer par une fonction exist dans ES"}
{"name":"MEMOIRE","type":"Array","opendata":"","master":"","description":""}
{"name":"POP_COORDONNEES.lat","type":"Number","master":true,"description":"Latitude de la notice en WGS84"}
{"name":"POP_COORDONNEES.lon","type":"Number","master":true,"description":"Longitude de la notice en WGS84"}
{"name":"POP_CONTIENT_GEOLOCALISATION","type":"String","master":true,"description":"Champ généré à chaque sauvegarde de la notice. Si notice contient des une géolocalisation, la valeur du champs sera 'oui', sinon 'non'"}
{"name":"POP_COORDINATES_POLYGON.type","type":"String","opendata":"","master":"","description":""}
{"name":"POP_COORDINATES_POLYGON.coordinates","type":"Array","opendata":"","master":"","description":""}
{"name":"POP_DATE","type":"Array","master":true,"description":"Champ qui sera utilisé pour traduire les date en format requetable"}
{"name":"POP_IMPORT","type":"Array","opendata":"","master":"","description":""}
{"name":"TOUT","type":"String","master":false,"description":"Champs qui devait contenir tous les champs dans mistral. Aujourd'hui est vide [DEPRECIE ?]"}
{"name":"ACTU","type":"String","master":false,"description":"Destinations successives et actuelle "}
{"name":"ADRS","type":"String","master":false,"description":"Adresse"}
{"name":"AFFE","type":"String","master":false,"description":"Affectataire"}
{"name":"AIRE","type":"String","master":false,"description":"Aire d'étude"}
{"name":"APPL","type":"String","master":false,"description":"Appellation et titre"}
{"name":"APRO","type":"Array","master":false,"description":""}
{"name":"ARCHEO","type":"String","master":false,"description":"Référence dans la base Patriarche"}
{"name":"AUTP","type":"Array","master":false,"description":"Auteurs phototype"}
{"name":"AUTR","type":"Array","master":false,"description":"Auteurs de l'oeuvre"}
{"name":"CADA","type":"Array","master":false,"description":"Référence cadastrale"}
{"name":"CANT","type":"String","master":false,"description":"Canton"}
{"name":"COLL","type":"Array","master":false,"description":"Décompte des oeuvres recensées"}
{"name":"COM","type":"String","master":false,"description":"Commune"}
{"name":"COOR","type":"String","master":false,"description":"Coordonnées Lambert (ou autres) d'un points"}
{"name":"COORM","type":"String","master":false,"description":"Coordonnées Lambert (ou autres) multiples"}
{"name":"COPY","type":"Array","master":false,"description":"CopyRight"}
{"name":"COUV","type":"Array","master":false,"description":"Type de la couverture"}
{"name":"DATE","type":"Array","master":false,"description":"Date protection"}
{"name":"DBOR","type":"String","master":false,"description":"Date de rédaction de la notice"}
{"name":"DOMN","type":"Array","master":false,"description":"Domaines"}
{"name":"DENO","type":"Array","master":false,"description":"Dénomination "}
{"name":"DENQ","type":"String","master":false,"description":"Date d'enquête"}
{"name":"DEPL","type":"String","master":false,"description":"Partie déplacée"}
{"name":"DESC","type":"String","master":false,"description":"Commentaire description"}
{"name":"DIMS","type":"String","master":false,"description":"Dimensions"}
{"name":"DMAJ","type":"String","master":true,"description":"Date de la dernière mise à jour"}
{"name":"DMIS","type":"String","master":true,"description":"Date de la création POP/Mistral"}
{"name":"DOSS","type":"String","master":false,"description":"Dossier"}
{"name":"DPRO","type":"String","master":false,"description":"Date protection"}
{"name":"DPT","type":"String","master":false,"description":"Département"}
{"name":"EDIF","type":"String","master":false,"description":"Edifice de conservation"}
{"name":"ELEV","type":"Array","master":false,"description":"Parti d’élévation extérieure"}
{"name":"ENER","type":"Array","master":false,"description":"Source de l'énergie"}
{"name":"ESCA","type":"Array","master":false,"description":"Emplacement, forme et structure de l’escalier "}
{"name":"ETAG","type":"Array","master":false,"description":"Vaisseau et étage"}
{"name":"ETAT","type":"Array","master":false,"description":"Etat de conservation"}
{"name":"ETUD","type":"Array","master":false,"description":"Parties non étud"}
{"name":"GENR","type":"Array","master":false,"description":"Destinataire"}
{"name":"HIST","type":"String","master":false,"description":"Commentaire historique"}
{"name":"HYDR","type":"String","master":false,"description":"Cours d'eau"}
{"name":"IMPL","type":"Array","master":false,"description":"Milieu d'implantation"}
{"name":"INSEE","type":"String","master":false,"description":"Numéro INSEE de la commune"}
{"name":"INTE","type":"Array","master":false,"description":"Intérêt de l'oeuvre"}
{"name":"JATT","type":"Array","master":false,"description":"Justification de l'attribution"}
{"name":"JDAT","type":"Array","master":false,"description":"Justification de la datation"}
{"name":"LBASE2","type":"String","master":false,"description":"[PAS affiché]"}
{"name":"LIEU","type":"String","master":false,"description":"Lieu-dit"}
{"name":"LOCA","type":"String","master":false,"description":"Localisation "}
{"name":"MFICH","type":"String","master":false,"description":"[PAS affiché]"}
{"name":"MOSA","type":"String","master":false,"description":"Mosaïques"}
{"name":"MHPP","type":"String","master":false,"description":"Eléments protégés MH"}
{"name":"MICR","type":"String","master":false,"description":"Numéro de microfiche"}
{"name":"MURS","type":"Array","master":false,"description":"Matériau du gros-oeuvre et mise en oeuvre "}
{"name":"NBOR","type":"String","master":false,"description":"no Bordereaus"}
{"name":"NOMS","type":"Array","master":false,"description":"Noms des rédacteurs de la notice et du dossier"}
{"name":"OBS","type":"String","master":false,"description":"Observations"}
{"name":"PAFF","type":"String","master":false,"description":"Précisions sur l'affectataire "}
{"name":"PART","type":"Array","master":false,"description":"Parties constituantes"}
{"name":"PARN","type":"Array","master":false,"description":"Parties non étud"}
{"name":"PDEN","type":"String","master":false,"description":"Précision sur la dénomination"}
{"name":"PERS","type":"Array","master":false,"description":"Personnalitées"}
{"name":"PLAN","type":"String","master":false,"description":"Parti de plan"}
{"name":"PLOC","type":"String","master":false,"description":"Précision sur la localisation"}
{"name":"PPRO","type":"String","master":false,"description":"Précisions sur la protection MH"}
{"name":"PREP","type":"Array","master":false,"description":"Précision sur la représentation"}
{"name":"PROT","type":"Array","master":false,"description":"Nature de la protection MH"}
{"name":"PSTA","type":"String","master":false,"description":"Précisions sur le statut de la propriété"}
{"name":"REFE","type":"Array","master":false,"description":"Référence de l'édifice de conservation"}
{"name":"REFP","type":"Array","master":false,"description":"Références des parties constituantes étudiées"}
{"name":"REFO","type":"Array","master":false,"description":"REFO"}
{"name":"REG","type":"String","master":false,"description":"Region"}
{"name":"REMA","type":"String","master":false,"description":"Eléments remarquables"}
{"name":"REMP","type":"String","master":false,"description":"Remploi"}
{"name":"RENV","type":"Array","master":false,"description":"N° de renvoi au domaine MH ou au domaine INVENTAIRE"}
{"name":"REPR","type":"String","master":false,"description":"Représentation "}
{"name":"RFPA","type":"String","master":false,"description":"Identifiant Patrimoine"}
{"name":"SCLD","type":"Array","master":false,"description":"Datation des campagnes secondaires de construction"}
{"name":"SCLE","type":"Array","master":false,"description":"Datation des campagnes principales de construction"}
{"name":"SCLX","type":"Array","master":false,"description":"[PAS affiché]"}
{"name":"SITE","type":"String","master":false,"description":"Site, secteur ou zone de protection"}
{"name":"STAT","type":"String","master":false,"description":"Statut de la propriété"}
{"name":"TECH","type":"Array","master":false,"description":"Technique du décor des immeubles par nature "}
{"name":"TICO","type":"String","master":false,"description":"Titre courant"}
{"name":"TOIT","type":"Array","master":false,"description":"Matériau de la couverture "}
{"name":"TYPO","type":"String","master":false,"description":"Typologie "}
{"name":"VERT","type":"String","master":false,"description":"Couvert et découvert de jardin "}
{"name":"REFIM","type":"String","master":false,"description":"[PAS affiché]"}
{"name":"IMG","type":"Array","master":false,"description":"[PAS affiché]"}
{"name":"VIDEO","type":"String","master":false,"description":"[PAS affiché]"}
{"name":"DOSURL","type":"String","master":false,"description":"Dossier URL"}
{"name":"DOSURLPDF","type":"String","master":true,"description":"Dossier PDF"}
{"name":"DOSADRS","type":"String","master":false,"description":"Dossier adresse"}
{"name":"LIENS","type":"Array","master":false,"description":"Liens Divers"}
{"name":"IMAGE","type":"String","master":false,"description":"[PAS affiché]"}
{"name":"VISI","type":"Array","master":false,"description":"Ouverture au public"}
{"name":"VOCA","type":"String","master":false,"description":"Vocable "}
{"name":"VOUT","type":"Array","master":false,"description":"Type et nature du couvrement "}
{"name":"WEB","type":"String","master":false,"description":"Visite guidé"}
{"name":"ZONE","type":"String","master":false,"description":"Zone Lambert ou autres"}
{"name":"THEM","type":"String","master":false,"description":"Thème "}
{"name":"ACMH","type":"String","master":false,"description":"[PAS affiché]"}
{"name":"ACURL","type":"String","master":false,"description":"[PAS affiché]"}
{"name":"WADRS","type":"String","master":false,"description":"[PAS affiché]"}
{"name":"WCOM","type":"String","master":false,"description":"[PAS affiché]"}
{"name":"WRENV","type":"String","master":false,"description":"[PAS affiché]"}
{"name":"REFM","type":"String","master":false,"description":"[PAS affiché]"}
{"name":"CONTACT","type":"String","master":true,"description":"Contact "}
{"name":"IDAGR","type":"String","master":false,"description":"[PAS affiché]"}
{"name":"LMDP","type":"String","master":false,"description":"[PAS affiché]"}
{"name":"PINT","type":"String","master":false,"description":"intérêt oeuvre"}
{"name":"DLAB","type":"String","master":false,"description":"Date du label"}
{"name":"_id","type":"ObjectID","opendata":"","master":"","description":""}
{"name":"__v","type":"Number","opendata":"","master":"","description":""}
## Mnr
{"name":"PRODUCTEUR","type":"String","master":true,"description":"Producteur de la donnée : Valeur MNR"}
{"name":"BASE","type":"String","master":true,"description":"Nom de la base : Valeur Récupération artistique (MNR Rose-Valland)"}
{"name":"CONTIENT_IMAGE","type":"String","master":true,"description":"Champ généré à chaque sauvegarde de la notice. Si notice contient des images, la valeur du champs sera oui', sinon 'non'. Ce champs est utilisé pour l'affichage de la phototèque mais pourrait être supprimé et remplacer par une fonction exist dans ES"}
{"name":"REF","type":"String","master":true,"description":"Référence unique de la notice"}
{"name":"POP_IMPORT","type":"Array","opendata":"","master":"","description":""}
{"name":"TOUT","type":"String","master":true,"description":"[PAS AFFICHE]"}
{"name":"AUTR","type":"Array","master":true,"description":"Auteur /exécutant / collecteur"}
{"name":"PAUT","type":"String","master":true,"description":"Precisions auteur"}
{"name":"ATTR","type":"String","master":true,"description":"Anciennes attributions"}
{"name":"ECOL","type":"String","master":true,"description":"Ecole "}
{"name":"TITR","type":"String","master":true,"description":"Titre "}
{"name":"ATIT","type":"String","master":true,"description":"Ancien titre"}
{"name":"PTIT","type":"String","master":true,"description":"Précision titre"}
{"name":"DENO","type":"Array","master":true,"description":"Dénomination du bien"}
{"name":"DESC","type":"String","master":true,"description":"Description "}
{"name":"DOMN","type":"Array","master":true,"description":"Domaine (catégorie du bien)"}
{"name":"LOCA","type":"String","master":true,"description":"Localisation "}
{"name":"INSC","type":"String","master":true,"description":"Inscriptions "}
{"name":"MARQ","type":"String","master":true,"description":"Marques "}
{"name":"OBSE","type":"String","master":true,"description":"Observations "}
{"name":"ETAT","type":"String","master":true,"description":"Etat de conservation"}
{"name":"GENE","type":"String","master":true,"description":"Genèse "}
{"name":"PROV","type":"String","master":true,"description":"Provenance "}
{"name":"HIST","type":"String","master":true,"description":"Historique "}
{"name":"HIST2","type":"String","master":true,"description":"[PAS AFFICHE]"}
{"name":"HIST3","type":"String","master":true,"description":"[PAS AFFICHE]"}
{"name":"HIST4","type":"String","master":true,"description":"[PAS AFFICHE]"}
{"name":"HIST5","type":"String","master":true,"description":"[PAS AFFICHE]"}
{"name":"HIST6","type":"String","master":true,"description":"[PAS AFFICHE]"}
{"name":"SCLE","type":"Array","master":true,"description":"Siècle "}
{"name":"STYL","type":"String","master":true,"description":"Style "}
{"name":"MILL","type":"String","master":true,"description":"Millenaire "}
{"name":"TECH","type":"Array","master":true,"description":"Technique "}
{"name":"DIMS","type":"Array","master":true,"description":"Dimensions "}
{"name":"VIDEO","type":"Array","master":true,"description":"[PAS AFFICHE]"}
{"name":"INV","type":"String","master":true,"description":"N°Inventaire, ancien(s) numéros(s), autres numéros, N° de dépôt"}
{"name":"EXPO","type":"String","master":true,"description":"Exposition "}
{"name":"BIBL","type":"String","master":true,"description":"Bibliographie "}
{"name":"AATT","type":"String","master":true,"description":"Ancienne attribution"}
{"name":"AUTI","type":"String","master":true,"description":"Autre titre"}
{"name":"CATE","type":"String","master":true,"description":"Catégorie "}
{"name":"CATE_DEPREC","type":"String","master":true,"description":"[PAS AFFICHE]"}
{"name":"NOTE","type":"String","master":true,"description":"Notes "}
{"name":"REDC","type":"Array","master":true,"description":"Rédacteurs "}
{"name":"DREP","type":"String","master":true,"description":"Date de la représentation"}
{"name":"PREP","type":"String","master":true,"description":"Précisions sur la représentation"}
{"name":"REPR","type":"String","master":true,"description":"Représentation "}
{"name":"SREP","type":"String","master":true,"description":"Sujet de la représentation (source littéraire ou musicale) "}
{"name":"REFIM","type":"String","master":true,"description":"Adresses images jointes générique (actuellement non utilisé)"}
{"name":"DMAJ","type":"String","master":true,"description":"Date de la dernière mise à jour"}
{"name":"DMIS","type":"String","master":true,"description":"Date de la création POP/Mistral"}
{"name":"AFFE","type":"String","master":true,"description":"Etablissement affectataire qui existe dans d’autres bases"}
{"name":"NUMS","type":"String","master":true,"description":"Autres numéros"}
{"name":"SUITE","type":"String","master":true,"description":"OEuvres liées, ensemble"}
{"name":"COMM","type":"String","master":true,"description":"Commentaire "}
{"name":"NOTE2","type":"String","master":true,"description":"[PAS AFFICHE]"}
{"name":"RESUME","type":"String","master":true,"description":"Résumé "}
{"name":"PHOT","type":"String","master":true,"description":"Droits de copie photo "}
{"name":"_id","type":"ObjectID","opendata":"","master":"","description":""}
{"name":"__v","type":"Number","opendata":"","master":"","description":""}
## Museo
{"name":"REF","type":"String","opendata":"","master":"","description":""}
{"name":"TOUT","type":"String","opendata":"","master":"","description":""}
{"name":"ACCES","type":"String","opendata":"","master":"","description":""}
{"name":"ACTIV","type":"String","opendata":"","master":"","description":""}
{"name":"ADRESSE","type":"String","opendata":"","master":"","description":""}
{"name":"ADRL1_M","type":"String","opendata":"","master":"","description":""}
{"name":"AMIS","type":"String","opendata":"","master":"","description":""}
{"name":"AN_CREAT","type":"String","opendata":"","master":"","description":""}
{"name":"ANNEE_FE","type":"String","opendata":"","master":"","description":""}
{"name":"ANNEXE","type":"String","opendata":"","master":"","description":""}
{"name":"ANTARIF","type":"String","opendata":"","master":"","description":""}
{"name":"ARTISTE","type":"String","opendata":"","master":"","description":""}
{"name":"ATOUT","type":"String","opendata":"","master":"","description":""}
{"name":"CEDEX_AD","type":"String","opendata":"","master":"","description":""}
{"name":"COPY","type":"String","opendata":"","master":"","description":""}
{"name":"CP_M","type":"String","opendata":"","master":"","description":""}
{"name":"CTRLTECH","type":"String","opendata":"","master":"","description":""}
{"name":"DOMPAL","type":"String","opendata":"","master":"","description":""}
{"name":"DPT","type":"String","opendata":"","master":"","description":""}
{"name":"DT_CREAT","type":"String","opendata":"","master":"","description":""}
{"name":"DT_MODIF","type":"String","opendata":"","master":"","description":""}
{"name":"DT_SAISI","type":"String","opendata":"","master":"","description":""}
{"name":"GESTION","type":"String","opendata":"","master":"","description":""}
{"name":"HIST","type":"String","opendata":"","master":"","description":""}
{"name":"INTERET","type":"String","opendata":"","master":"","description":""}
{"name":"ITI2_M","type":"String","opendata":"","master":"","description":""}
{"name":"ITI_M","type":"String","opendata":"","master":"","description":""}
{"name":"JOCONDE","type":"String","opendata":"","master":"","description":""}
{"name":"LABEL","type":"String","opendata":"","master":"","description":""}
{"name":"LEGS","type":"String","opendata":"","master":"","description":""}
{"name":"LIEU_M","type":"String","opendata":"","master":"","description":""}
{"name":"MEL","type":"String","opendata":"","master":"","description":""}
{"name":"MONOPLUR","type":"String","opendata":"","master":"","description":""}
{"name":"NB_AMI","type":"String","opendata":"","master":"","description":""}
{"name":"NOM_AMI","type":"String","opendata":"","master":"","description":""}
{"name":"NOMANC","type":"String","opendata":"","master":"","description":""}
{"name":"NOMOFF","type":"String","opendata":"","master":"","description":""}
{"name":"NOMUSAGE","type":"String","opendata":"","master":"","description":""}
{"name":"OBS_AMI","type":"String","opendata":"","master":"","description":""}
{"name":"OBS_TOUR","type":"String","opendata":"","master":"","description":""}
{"name":"PHARE","type":"String","opendata":"","master":"","description":""}
{"name":"PROPBAT","type":"String","opendata":"","master":"","description":""}
{"name":"PROPCOLL","type":"String","opendata":"","master":"","description":""}
{"name":"PROT","type":"String","opendata":"","master":"","description":""}
{"name":"PUBLI","type":"String","opendata":"","master":"","description":""}
{"name":"REGION","type":"String","opendata":"","master":"","description":""}
{"name":"REPCOLL","type":"String","opendata":"","master":"","description":""}
{"name":"SERVICES","type":"String","opendata":"","master":"","description":""}
{"name":"SIGLE_M","type":"String","opendata":"","master":"","description":""}
{"name":"STATUT","type":"String","opendata":"","master":"","description":""}
{"name":"SURFACES","type":"String","opendata":"","master":"","description":""}
{"name":"TEL_M","type":"String","opendata":"","master":"","description":""}
{"name":"THEMES","type":"String","opendata":"","master":"","description":""}
{"name":"URL_M2","type":"String","opendata":"","master":"","description":""}
{"name":"URL_M","type":"String","opendata":"","master":"","description":""}
{"name":"VIDEO","type":"String","opendata":"","master":"","description":""}
{"name":"VILLE_M","type":"String","opendata":"","master":"","description":""}
{"name":"RESP","type":"String","opendata":"","master":"","description":""}
{"name":"GRESP","type":"String","opendata":"","master":"","description":""}
{"name":"PSC","type":"String","opendata":"","master":"","description":""}
{"name":"DPSC","type":"String","opendata":"","master":"","description":""}
{"name":"DMDF","type":"String","opendata":"","master":"","description":""}
{"name":"SPUB","type":"String","opendata":"","master":"","description":""}
{"name":"INVR","type":"String","opendata":"","master":"","description":""}
{"name":"NUMER","type":"String","opendata":"","master":"","description":""}
{"name":"LGN","type":"String","opendata":"","master":"","description":""}
{"name":"REST","type":"String","opendata":"","master":"","description":""}
{"name":"ACQU","type":"String","opendata":"","master":"","description":""}
{"name":"RECOL","type":"String","opendata":"","master":"","description":""}
{"name":"location.lat","type":"Number","opendata":"","master":"","description":""}
{"name":"location.lon","type":"Number","opendata":"","master":"","description":""}
{"name":"_id","type":"ObjectID","opendata":"","master":"","description":""}
{"name":"__v","type":"Number","opendata":"","master":"","description":""}
## Palissy
{"name":"PRODUCTEUR","type":"String","master":false,"description":""}
{"name":"CONTIENT_IMAGE","type":"String","master":true,"description":"Champ généré à chaque sauvegarde de la notice. Si notice contient des images, la valeur du champs sera oui', sinon 'non'. Ce champs est utilisé pour l'affichage de la phototèque mais pourrait être supprimé et remplacer par une fonction exist dans ES"}
{"name":"POP_COORDONNEES.lat","type":"Number","master":true,"description":"Latitude de la notice en WGS84"}
{"name":"POP_COORDONNEES.lon","type":"Number","master":true,"description":"Longitude de la notice en WGS84"}
{"name":"POP_CONTIENT_GEOLOCALISATION","type":"String","opendata":"","master":"","description":""}
{"name":"POP_COORDINATES_POLYGON.type","type":"String","opendata":"","master":"","description":""}
{"name":"POP_COORDINATES_POLYGON.coordinates","type":"Array","opendata":"","master":"","description":""}
{"name":"BASE","type":"String","master":true,"description":"Nom de la base : Patrimoine mobilier (Palissy)"}
{"name":"MEMOIRE","type":"Array","opendata":"","master":"","description":""}
{"name":"REF","type":"String","master":false,"description":"Référence unique de la notice"}
{"name":"POP_IMPORT","type":"Array","opendata":"","master":"","description":""}
{"name":"ACQU","type":"String","master":false,"description":"[PAS AFFICHE]"}
{"name":"ADRS","type":"String","master":false,"description":"Adresse "}
{"name":"ADRS2","type":"String","master":false,"description":"[PAS AFFICHE]"}
{"name":"AFIG","type":"Array","master":false,"description":"Auteur(s) de la source figurée"}
{"name":"AIRE","type":"String","master":false,"description":"Aire d'étude"}
{"name":"APPL","type":"String","master":false,"description":"Appellation et titre"}
{"name":"ATEL","type":"String","master":false,"description":"Nom de l’atelier, de la manufacture, de la fabrique ou de l’école "}
{"name":"AUTP","type":"String","master":false,"description":"Auteurs phototype"}
{"name":"AUTR","type":"Array","master":false,"description":"Auteurs de l'oeuvre"}
{"name":"BIBL","type":"String","master":false,"description":"[PAS AFFICHE]"}
{"name":"CANT","type":"String","master":false,"description":"Canton "}
{"name":"CATE","type":"Array","master":false,"description":"Catégorie technique"}
{"name":"COM","type":"String","master":false,"description":"Commune "}
{"name":"COM2","type":"String","master":false,"description":"[PAS AFFICHE]"}
{"name":"CONTACT","type":"String","master":true,"description":"Contact "}
{"name":"COOR","type":"String","master":false,"description":"Coordonnées Lambert (ou autres) d'un points "}
{"name":"COORM","type":"String","master":false,"description":"Coordonnées Lambert (ou autres) multiples "}
{"name":"COPY","type":"String","master":false,"description":"CopyRight"}
{"name":"DATE","type":"Array","master":false,"description":"Datation en années"}
{"name":"DBOR","type":"Array","master":false,"description":"Date de rédaction de la notice"}
{"name":"DENO","type":"Array","master":false,"description":"Dénomination "}
{"name":"DENQ","type":"Array","master":false,"description":"Date d'enquête"}
{"name":"DEPL","type":"String","master":false,"description":"Partie déplacée"}
{"name":"DESC","type":"String","master":false,"description":"Commentaire description"}
{"name":"DIMS","type":"String","master":false,"description":"Dimensions "}
{"name":"DMAJ","type":"String","master":true,"description":"Date de la dernière mise à jour"}
{"name":"DMIS","type":"String","master":true,"description":"Date de la création POP/Mistral"}
{"name":"DOMN","type":"String","master":false,"description":"Domaines "}
{"name":"DOSADRS","type":"String","master":false,"description":"Dossier adresse"}
{"name":"DOSS","type":"Array","master":false,"description":"Dossier "}
{"name":"DOSURL","type":"String","master":false,"description":"Dossier URL"}
{"name":"DOSURLPDF","type":"String","master":true,"description":"Dossier PDF "}
{"name":"DPRO","type":"String","master":false,"description":"Date protection"}
{"name":"DPT","type":"String","master":false,"description":"Département "}
{"name":"EDIF","type":"String","master":false,"description":"Edifice de conservation"}
{"name":"EDIF2","type":"String","master":false,"description":"[PAS AFFICHE]"}
{"name":"EMPL","type":"String","master":false,"description":"Emplacement de l’œuvre dans l’édifice"}
{"name":"EMPL2","type":"String","master":false,"description":"[PAS AFFICHE]"}
{"name":"ETAT","type":"Array","master":false,"description":"Etat de conservation"}
{"name":"ETUD","type":"String","master":false,"description":"Parties non étud"}
{"name":"EXEC","type":"String","master":false,"description":"Nom actuel ou historique du lieu d’exécution "}
{"name":"EXPO","type":"String","master":false,"description":"[PAS AFFICHE]"}
{"name":"HIST","type":"String","master":false,"description":"Commentaire historique"}
{"name":"IDAGR","type":"Array","master":false,"description":"[PAS AFFICHE]"}
{"name":"IMAGE","type":"String","master":false,"description":"[PAS AFFICHE]"}
{"name":"IMG","type":"Array","master":false,"description":"[PAS AFFICHE]"}
{"name":"IMPL","type":"String","master":false,"description":"Milieu d'implantation"}
{"name":"INSC","type":"Array","master":false,"description":"Inscriptions, marques, emblématique et poinçons"}
{"name":"INSEE","type":"String","master":false,"description":"Numéro INSEE de la commune"}
{"name":"INSEE2","type":"String","master":false,"description":"[PAS AFFICHE]"}
{"name":"INTE","type":"String","master":false,"description":"Intérêt de l'oeuvre"}
{"name":"JDAT","type":"Array","master":false,"description":"Justification de la datation"}
{"name":"LBASE2","type":"String","master":false,"description":"[PAS AFFICHE]"}
{"name":"LIENS","type":"Array","master":false,"description":"Liens Divers"}
{"name":"LIEU","type":"String","master":false,"description":"Lieu-dit "}
{"name":"LMDP","type":"String","master":false,"description":"[PAS AFFICHE]"}
{"name":"LOCA","type":"String","master":false,"description":"Localisation "}
{"name":"MATR","type":"Array","master":false,"description":"Matériaux "}
{"name":"MFICH","type":"Array","master":false,"description":"[PAS AFFICHE]"}
{"name":"MICR","type":"String","master":false,"description":"Numéro de microfiche"}
{"name":"MOSA","type":"String","master":false,"description":"Mosaïques "}
{"name":"NART","type":"String","master":false,"description":"Numérotation artificielle"}
{"name":"NINV","type":"String","master":false,"description":"[PAS AFFICHE]"}
{"name":"NOMS","type":"Array","master":false,"description":"Noms des rédacteurs de la notice et du dossier "}
{"name":"NUMA","type":"String","master":false,"description":"[PAS AFFICHE]"}
{"name":"NUMP","type":"String","master":false,"description":"[PAS AFFICHE]"}
{"name":"OBS","type":"String","master":false,"description":"Observations "}
{"name":"ORIG","type":"String","master":false,"description":"Origine de l’œuvre (lieu de provenance ou de destination)"}
{"name":"PAPP","type":"String","master":false,"description":"Préc. appart"}
{"name":"PARN","type":"Array","master":false,"description":"Parties non étud"}
{"name":"PART","type":"Array","master":false,"description":"Parties constituantes"}
{"name":"PDEN","type":"Array","master":false,"description":"Précision sur la dénomination"}
{"name":"PDIM","type":"String","master":false,"description":"Précisions sur les dimensions"}
{"name":"PERS","type":"Array","master":false,"description":"Personnalitées "}
{"name":"PETA","type":"String","master":false,"description":"Précisions sur l’état de conservation"}
{"name":"PHOTO","type":"String","master":false,"description":"[PAS AFFICHE]"}
{"name":"PINS","type":"String","master":false,"description":"Précisions sur les inscriptions, marques, emblématique et poinçons "}
{"name":"PINT","type":"String","master":false,"description":"Intérêt oeuvre"}
{"name":"PLOC","type":"String","master":false,"description":"Précision sur la localisation"}
{"name":"PPRO","type":"String","master":false,"description":"Précisions sur la protection MH"}
{"name":"PREP","type":"String","master":false,"description":"Précision sur la représentation"}
{"name":"PROT","type":"String","master":false,"description":"Nature de la protection MH"}
{"name":"REFA","type":"Array","master":false,"description":"Référence de l'édifice de conservation"}
{"name":"REFE","type":"Array","master":false,"description":"Référence de l’ensemble ou de l'oeuvre"}
{"name":"REFM","type":"String","master":false,"description":"[PAS AFFICHE]"}
{"name":"REFP","type":"Array","master":false,"description":"Références des parties constituantes étudiées "}
{"name":"REG","type":"String","master":false,"description":"Region "}
{"name":"RENP","type":"Array","master":false,"description":"[PAS AFFICHE]"}
{"name":"RENV","type":"Array","master":false,"description":"N° de renvoi au domaine MH ou au domaine INVENTAIRE"}
{"name":"REPR","type":"Array","master":false,"description":"Représentation "}
{"name":"SCLD","type":"Array","master":false,"description":"[PAS AFFICHE]"}
{"name":"SCLE","type":"Array","master":false,"description":"Datation des campagnes principales de construction "}
{"name":"SCLX","type":"Array","master":false,"description":"[PAS AFFICHE]"}
{"name":"SOUR","type":"String","master":false,"description":"[PAS AFFICHE]"}
{"name":"STAD","type":"Array","master":false,"description":"Stade de la création"}
{"name":"STAT","type":"Array","master":false,"description":"Statut de la propriété"}
{"name":"STRU","type":"Array","master":false,"description":"Structure et typologie"}
{"name":"THEM","type":"String","master":false,"description":"Thème "}
{"name":"TICO","type":"String","master":false,"description":"Titre courant"}
{"name":"TITR","type":"String","master":false,"description":"[PAS AFFICHE]"}
{"name":"TOUT","type":"String","master":false,"description":"[PAS AFFICHE]"}
{"name":"VIDEO","type":"Array","master":false,"description":"[PAS AFFICHE]"}
{"name":"VOLS","type":"String","master":false,"description":"Objet(s) volé(s)"}
{"name":"WADRS","type":"String","master":false,"description":"[PAS AFFICHE]"}
{"name":"WCOM","type":"String","master":false,"description":"[PAS AFFICHE]"}
{"name":"WEB","type":"String","master":false,"description":"Visite guidé "}
{"name":"WRENV","type":"String","master":false,"description":"[PAS AFFICHE]"}
{"name":"ZONE","type":"String","master":false,"description":"Zone Lambert ou autre"}
{"name":"_id","type":"ObjectID","opendata":"","master":"","description":""}
{"name":"__v","type":"Number","opendata":"","master":"","description":""}
## Thesaurus
{"name":"arc","type":"String","opendata":"","master":"","description":""}
{"name":"value","type":"String","opendata":"","master":"","description":""}
{"name":"_id","type":"ObjectID","opendata":"","master":"","description":""}
{"name":"__v","type":"Number","opendata":"","master":"","description":""}
## User
{"name":"email","type":"String","required":true,"opendata":"","master":"","description":""}
{"name":"institution","type":"String","required":true,"opendata":"","master":"","description":""}
{"name":"nom","type":"String","opendata":"","master":"","description":""}
{"name":"prenom","type":"String","opendata":"","master":"","description":""}
{"name":"group","type":"String","required":true,"opendata":"","master":"","description":""}
{"name":"role","type":"String","required":true,"opendata":"","master":"","description":""}
{"name":"password","type":"String","required":true,"opendata":"","master":"","description":""}
{"name":"hasResetPassword","type":"Boolean","opendata":"","master":"","description":""}
{"name":"lastConnectedAt","type":"Date","opendata":"","master":"","description":""}
{"name":"museofile","type":"String","opendata":"","master":"","description":""}
{"name":"_id","type":"ObjectID","opendata":"","master":"","description":""}
{"name":"__v","type":"Number","opendata":"","master":"","description":""}