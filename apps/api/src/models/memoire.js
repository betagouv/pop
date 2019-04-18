var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");
var mongoosastic = require("mongoosastic");
var getElasticInstance = require("../elasticsearch");

const Schema = new mongoose.Schema(
  {
    PRODUCTEUR: {
      type: String,
      default: "",
      documentation: {
        description: `Producteur de la donnée déterminé grâce à la référence : \n
      Si la REF commence par IVN ou IVR ou IVD ou IVC, alors PRODUCTEUR=INV\n
      Si la condition du dessus n'est pas respectée et la REF commence par OA, alors PRODUCTEUR = CAOA\n
      Si les conditions du dessus ne sont pas respectées et la REF commence par MH, alors PRODUCTEUR = CRMH\n
      Si les conditions du dessus ne sont pas respectées et la REF commence par AR, alors PRODUCTEUR = ARCH\n
      Si les conditions du dessus ne sont pas respectées et la REF commence par AP et IDPROD commence par Service départemental, alors PRODUCTEUR = UDAP\n
      Si les conditions du dessus ne sont pas respectées et la IDPROD commence par SAP ou EMET commence par SAP, alors PRODUCTEUR = SAP\n
      Sinon PRODUCTEUR = AUTRE\n`,
        generated: true,
        label: "Producteur"
      }
    },
    BASE: {
      type: String,
      default: "Photographies (Mémoire)",
      documentation: {
        description: "Nom de la base : Photographies (Mémoire)",
        generated: true
      }
    },
    CONTIENT_IMAGE: {
      type: String,
      default: "",
      documentation: {
        description:
          "Champ généré à chaque sauvegarde de la notice. Si notice contient des images, la valeur du champs sera oui', sinon 'non'. Ce champs est utilisé pour l'affichage de la phototèque mais pourrait être supprimé et remplacer par une fonction exist dans ES",
        generated: true,
        label: "Contient une image"
      }
    },
    POP_COMMENTAIRES: {
      type: [String],
      default: [],
      documentation: {
        description: "Commentaires technique",
        label: "Commentaires POP",
        generated: true
      }
    },
    POP_IMPORT: [{ type: mongoose.Schema.ObjectId, ref: "import" }],
    REF: {
      type: String,
      unique: true,
      index: true,
      trim: true,
      required: true,
      documentation: {
        description: "Référence unique de la notice",
        label: "Référence"
      }
    },
    TOUT: {
      type: String,
      default: "",
      documentation: {
        description: "Index global [Peut etre déprécié]",
        label: "Index global"
      }
    },
    ADRESSE: {
      type: String,
      default: "",
      documentation: {
        description:
          "Hameau, lieu-dit, quartier, cote, bois, etc. ; adresse sous la forme Nom (voie) ##",
        label: "Adresse et/ou lieu-dit"
      }
    },
    AUTOEU: {
      type: String,
      default: "",
      documentation: {
        description: "Nom, Prénom (profession ou titre et/ou dates)",
        label: "Auteur de l'oeuvre représentée"
      }
    },
    AUTG: {
      type: String,
      default: "",
      documentation: {
        description: "Nom, Prénom (profession ou titre et/ou dates)",
        label: "Auteur de la gravure"
      }
    },
    AUTP: {
      type: String,
      default: "",
      documentation: {
        description: "Nom, Prénom (profession ou titre et/ou dates)",
        label: "Photographe"
      }
    },
    AUTOR: {
      type: String,
      default: "",
      documentation: {
        description: "Nom, Prénom (profession ou titre et/ou dates)",
        label: "Auteur du document reproduit / auteur de l'original"
      }
    },
    AUTTI: {
      type: String,
      default: "",
      documentation: {
        description: "Nom, Prénom (profession ou titre et/ou dates)",
        label: "Auteur du tirage"
      }
    },
    COM: {
      type: String,
      default: "",
      documentation: { description: "", label: "Commune" }
    },
    DOM: {
      type: String,
      default: "",
      documentation: {
        description: "Architecture, Objet, Portrait, Reportage",
        label: "Domaine"
      }
    },
    EDIF: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Édifice"
      }
    },
    EXPO: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Référence d’exposition de l’image "
      }
    },
    JDATPV: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Précision sur la date de prise de vue"
      }
    },
    LIEUCOR: {
      type: String,
      default: "",
      documentation: {
        description: "Forme REG ; DPT ; COM ; EDIF",
        label: "Lieu de conservation du document reproduit"
      }
    },
    COTECOR: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Cote de conservation du document reproduit"
      }
    },
    LIEUCTI: {
      type: String,
      default: "",
      documentation: {
        description: "Forme REG ; DPT ; COM ; EDIF",
        label: "Lieu de conservation du tirage"
      }
    },
    COTECTI: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Cote de conservation du tirage"
      }
    },
    LIEUCP: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Lieu de conservation de la photo"
      }
    },
    COTECP: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Cote conservation du phototype"
      }
    },
    LEG: {
      type: String,
      default: "",
      documentation: {
        description: "Texte libre, toutes ponctuations admises",
        label: "Légende"
      }
    },
    OBJT: {
      type: String,
      default: "",
      documentation: {
        description: "Saisir le nom de l'objet et sa description dans le même champ",
        label: "Objet"
      }
    },
    OBS: {
      type: String,
      default: "",
      documentation: {
        description:
          "Concerne tout phototype, négatif ou tirage. Commentaires de l'auteur de la notice ne trouvant pas place dans d'autres champs",
        label: "Observations"
      }
    },
    OBSOR: {
      type: String,
      default: "",
      documentation: {
        description: "Porte sur l'état ou l'histoire du phototype",
        label: "Observations sur l'original"
      }
    },
    OBSTI: {
      type: String,
      default: "",
      documentation: {
        description: "Porte sur l'état ou l'histoire du tirage",
        label: "Observations sur le tirage"
      }
    },
    PAYS: {
      type: String,
      default: "",
      documentation: {
        description:
          "Si plusieurs noms successifs, les citer tous en utilisant le point-virgule comme séparateur",
        label: "Pays"
      }
    },
    PUBLI: {
      type: String,
      default: "",
      documentation: {
        description: "Auteur, titre, lieu, éditeur, date",
        label: "Référence de publication de l'image"
      }
    },
    TIREDE: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Référence bibliographique ou documentaire"
      }
    },
    ROLE: {
      type: String,
      default: "",
      documentation: {
        documentation: {
          description: "Nom de l'acteur : nom du personnage joué",
          label: "Rôle interprété"
        }
      }
    },
    PRECOR: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Précisions sur la conservation de l'original"
      }
    },
    SERIE: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Titre série"
      }
    },
    THEATRE: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Producteur de la pièce de théâtre ou du film"
      }
    },
    TITRE: {
      type: String,
      default: "",
      documentation: { description: "", label: "Titre de la pièce de théâtre ou du film" }
    },
    DMAJ: {
      type: String,
      default: "",
      documentation: {
        description: "Date de la dernière mise à jour",
        generated: true,
        label: "Date de mise à jour"
      }
    },
    DMIS: {
      type: String,
      default: "",
      documentation: {
        description: "Date de la création POP/Mistral",
        generated: true,
        label: "Date de création"
      }
    },
    IDPROD: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Nom du producteur"
      }
    },
    NUMCD: {
      type: String,
      default: "",
      documentation: {
        description: "Référence du CD ayant servi au chargement des images",
        label: "Numéro de CD",
        deprecated: true
      }
    },
    NUMF: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Numero de fond"
      }
    },
    INSEE: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Code INSEE de la commune"
      }
    },
    NVD: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Référence sur le vidéodisque"
      }
    },
    MARQ: {
      type: String,
      default: "",
      documentation: {
        description:
          "Saisir 1 pour sélectionner l'image qui illustrera la notice Mérimée ou Palisssy correspondante",
        label: "Rang d'affichage de l'image"
      }
    },
    ACC: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Accessoire de pose",
        deprecated: true
      }
    },
    ACQU: {
      type: String,
      default: "",
      documentation: {
        description: "Don, legs, dation, achat, dépôt",
        label: "Modalité d'entrée"
      }
    },
    ADPHOT: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Adresse de la personne photographiée",
        deprecated: true
      }
    },
    AIRE: {
      type: String,
      default: "",
      documentation: {
        description: "Aire d'étude",
        label: "Aire d'étude"
      }
    },
    ANUMP: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Ancien numéro du négatif"
      }
    },
    COPY: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Crédit photographique"
      }
    },
    COULEUR: {
      type: String,
      default: "",
      documentation: {
        description:
          "Couleur [Devrait contenir oui ou non mais contient bcp plus . donnée à nettoyer]",
        label: "Couleur"
      }
    },
    COSTUME: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Costume de la personne représentée",
        deprecated: true
      }
    },
    DATIMM: {
      type: String,
      default: "",
      documentation: {
        description: "Date d'entrée dans les collections ou date de traitement intellectuel",
        label: "Date d'immatriculation"
      }
    },
    DATOEU: {
      type: String,
      default: "",
      documentation: {
        description:
          "Date de l'œuvre représentée (édifice, objet, pièce de théâtre, film), en année",
        label: "Date de l'oeuvre"
      }
    },
    DATPV: {
      type: String,
      default: "",
      documentation: {
        description: "AAAA.MM.JJ ; AAAA (vers) ; AAAA-AAAA",
        label: "Date de prise de vue"
      }
    },
    DATOR: {
      type: String,
      default: "",
      documentation: {
        description: "Date de l'original",
        label: "Date de l'original"
      }
    },
    DATTI: {
      type: String,
      default: "",
      documentation: {
        description: "AAAA.MM.JJ ; AAAA (vers) ; AAAA-AAAA",
        label: "Date du tirage "
      }
    },
    DATG: {
      type: String,
      default: "",
      documentation: {
        description: "Date gravure",
        label: "Date gravure",
        deprecated: true
      }
    },
    DATD: {
      type: String,
      default: "",
      documentation: {
        description: "Date dessin",
        label: "Date dessin"
      }
    },
    DIFF: {
      type: String,
      default: "",
      documentation: {
        description: "Droits diffusion",
        label: "Droits diffusion"
      }
    },
    DPT: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Département"
      }
    },
    EDIARCH: {
      type: String,
      default: "",
      documentation: {
        description: "Interprétation",
        label: "Interprétation"
      }
    },
    ECH: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Échelle du graphique"
      }
    },
    FORMAT: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Format du négatif"
      }
    },
    FORMATOR: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Format de l'original"
      }
    },
    FORMATTI: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Format du tirage"
      }
    },
    LBASE: {
      type: [String],
      default: [],
      index: true,
      documentation: {
        description:
          "Lien vers la notice Palissy ou Mérimée contenant le dossier de l'édifice ou de l'objet représenté",
        label: "Référence de la notice Mérimée ou Palissy"
      }
    },
    WEB: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Accès Mémoire"
      }
    },
    LIB: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Mots candidats",
        deprecated: true
      }
    },
    LOCA: {
      type: String,
      default: "",
      documentation: {
        description: "Concaténation des champs PAYS ; REG ; DPT ; COM",
        label: "Localisation"
      }
    },
    LIEUORIG: {
      type: String,
      default: "",
      documentation: {
        description: "Lieu de dépôt",
        label: "Lieu de dépôt"
      }
    },
    MCGEO: {
      type: String,
      default: "",
      documentation: {
        description:
          "Régions non administratives, parcs naturels, fleuves, massifs montagneux, îles…",
        label: "Mots-clés géographiques"
      }
    },
    MCL: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Mots-clés"
      }
    },
    MENTIONS: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Annotations présentes sur le négatif"
      }
    },
    MENTOR: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Annotations présentes sur l'original"
      }
    },
    MENTTI: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Annotations présentes sur le tirage"
      }
    },
    MCPER: {
      type: String,
      default: "",
      documentation: {
        description: "Nom, Prénom (profession ou titre et/ou dates)",
        label: "Identité de la personne photographiée"
      }
    },
    VUECD: {
      type: String,
      default: "",
      documentation: {
        description: "No vue CD",
        label: "No vue CD",
        deprecated: true
      }
    },
    NUMAUTP: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Numéro donné par le photographe"
      }
    },
    NUMCAF: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Numéro de carte à fenêtre",
        deprecated: true
      }
    },
    ANUMOR: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Ancien numéro de l'original"
      }
    },
    NUMOR: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Numéro de l'original"
      }
    },
    NUMP: {
      type: String,
      default: "",
      documentation: {
        description: "",
        validation: "Alphanumeric",
        label: "Numéro du négatif"
      }
    },
    ANUMTI: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Ancien numéro du tirage"
      }
    },
    NUMTI: {
      type: String,
      default: "",
      documentation: {
        description: "",
        validation: "Alphanumeric",
        label: "Numéro du tirage"
      }
    },
    RENV: {
      type: String,
      default: "",
      documentation: { description: "", label: "Phototype(s) en relation" }
    },
    REG: {
      type: String,
      default: "",
      documentation: { description: "", label: "Région" }
    },
    SENS: {
      type: String,
      default: "",
      documentation: {
        description: "V, H, C, O",
        label: "Orientation du phototype"
      }
    },
    SCLE: {
      type: String,
      default: "",
      documentation: {
        description: "12e ; 18e (fin)",
        label: "Siècle de l'œuvre"
      }
    },
    SUP: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Support"
      }
    },
    TECH: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Description technique du négatif"
      }
    },
    TECHOR: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Description technique de l'original"
      }
    },
    TECHTI: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Description technique du tirage"
      }
    },
    TOILE: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Toile de fond",
        deprecated: true
      }
    },
    TYP: {
      type: String,
      default: "",
      documentation: {
        description: "Type  [Qu'est ce que c'est ?]",
        label: "Type"
      }
    },
    TYPDOC: {
      type: String,
      default: "",
      documentation: {
        description:
          "Négatif, Positif original, Image numérique, Tirage photographique, Reproduction",
        label: "Catégorie de phototype"
      }
    },
    TYPEIMG: {
      type: String,
      default: "",
      documentation: {
        description: "Forme : oui ou non selon qu'on charge ou non une image",
        label: "Type d'image numérique",
        deprecated: true
      }
    },
    TYPSUPP: {
      type: String,
      default: "",
      documentation: {
        description: "Doublon de TYPSN utilisé dans les versements plus récents ; valeur : DS1",
        label: "Type de support numérique"
      }
    },
    VIDEO: {
      type: String,
      default: "",
      documentation: {
        description: "Vidéo [Semble être doublon avec IMG]",
        label: "Vidéo"
      }
    },
    LBASE2: {
      type: String,
      default: "",
      documentation: {
        description:
          "Liens base [Quelle différence avec LBASE?] requête système permettant d'activer le lien",
        label: "Liens base",
        deprecated: true
      }
    },
    LEG2: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Légende thes."
      }
    },
    REFIM: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Référence de l'image",
        deprecated: true
      }
    },
    REFIMG: {
      type: String,
      default: "",
      documentation: {
        description:
          "Nom Image. Déprécié dans POP mais utilisé dans certains imports ( import MH dans Mémoire pour les REF : IV,OA,MH,AR,AP )",
        label: "Nom Image",
        deprecated: true
      }
    },
    MOSA: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Mosaïques"
      }
    },
    SITE: {
      type: String,
      default: "",
      documentation: { description: "", label: "Site" }
    },
    NUMSITE: {
      type: String,
      default: "",
      documentation: {
        description: "N° du site",
        label: "N° du site"
      }
    },
    NUMOP: {
      type: String,
      default: "",
      documentation: {
        description: "N° d'opération",
        label: "N° d'opération"
      }
    },
    CHRONO: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Chronologie"
      }
    },
    REPRO: {
      type: String,
      default: "",
      documentation: {
        description: "Contient le numéro du fichier numérique",
        label: "Numéro de reproduction"
      }
    },
    STRUCT: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Structure"
      }
    },
    SUJET: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Sujet représenté par la photographie ou le document graphique"
      }
    },
    TICO: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Titre courant de l'œuvre"
      }
    },
    NUMI: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Numéro du phototype"
      }
    },
    LIEU: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Adresse et/ou lieu-dit"
      }
    },
    ADRS: {
      type: String,
      default: "",
      documentation: {
        description: "Adresse saisie",
        label: "Adresse saisie"
      }
    },
    CONTACT: {
      type: String,
      default: "",
      documentation: {
        description: "",
        validation: "Email",
        label: "Lien vers le service producteur"
      }
    },
    EMET: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Code du producteur"
      }
    },
    NUM: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "N° support"
      }
    },
    IMG: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Lien vers l'image"
      }
    },
    WCOM: {
      type: String,
      default: "",
      documentation: {
        description: "Ville [Quelle difference avec COM ?]",
        label: "Ville"
      }
    },
    LIENS: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Liens divers"
      }
    },
    LAUTP: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Notice biographique"
      }
    }, /////////////////////
    TRL: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Technique de relevé du graphique"
      }
    },
    DENO: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Dénomination de l'œuvre"
      }
    },
    AUT: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Auteur du phototype ou du document graphique"
      }
    },
    AUTR: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Auteur de l'œuvre étudiée"
      }
    },
    DOC: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Technique, support, dimensions et date du document reproduit"
      }
    },
    NUMG: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Numéro de la gravure"
      }
    },
    NOMSN: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Nom de l'image numérisée"
      }
    }
  },
  { collection: "memoire" }
);

Schema.plugin(mongoosePaginate);
Schema.plugin(mongoosastic, {
  esClient: getElasticInstance(),
  index: "memoire",
  bulk: { size: 500, delay: 2000 }
});

const object = mongoose.model("memoire", Schema);

module.exports = object;
