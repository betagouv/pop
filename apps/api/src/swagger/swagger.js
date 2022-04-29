const swaggerAutogen = require('swagger-autogen')();
require("dotenv").config();

let api_url = process.env.API_URL | 'localhost:3000';

const doc = {
    info: {
        version: "1.0.0",
        title: "POP Api",
        description: "Documentation sur les webservices de l'application Api"
    },
    host: api_url,
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Auth",
            "description": "Webservices Authentification"
        },
        {
            "name": "Autor",
            "description": "Webservices de la collection Autor"
        },
        {
            "name": "Enluminures",
            "description": "Webservices de la collection Enluminures"
        },
        {
            "name": "DeleteHistorique",
            "description": "Webservices de la collection DeleteHistorique"
        },
        {
            "name": "Gallery",
            "description": "Webservices de la collection Gallery"
        },
        {
            "name": "Groups",
            "description": "Webservices de la collection Groups (Utilisateur)"
        },
        {
            "name": "Import",
            "description": "Webservices de la collection import"
        },
        {
            "name": "Joconde",
            "description": "Webservices de la collection Joconde"
        },
        {
            "name": "Mémoire",
            "description": "Webservices de la collection Mémoire"
        },
        {
            "name": "Mérimée",
            "description": "Webservices de la collection Mérimée"
        },
        {
            "name": "Mnr",
            "description": "Webservices de la collection Mnr"
        },
        {
            "name": "Museo",
            "description": "Webservices de la collection Museo"
        },
        {
            "name": "Oai",
            "description": "Webservices de la collection Oai"
        },
        {
            "name": "Palissy",
            "description": "Webservices de la collection Palissy"
        },
        {
            "name": "Producteurs",
            "description": "Webservices de la collection Producteurs"
        },
        {
            "name": "Reporting",
            "description": "Webservices de la collection Reporting"
        },
        {
            "name": "Thesaurus",
            "description": "Webservices de la collection Thesaurus"
        },
        {
            "name": "Users",
            "description": "Webservices de la collection Users"
        }
    ],
    securityDefinitions: {
        apiKeyAuth:{
            type: "apiKey",
            in: "header",       // can be "header", "query" or "cookie"
            name: "X-API-KEY",  // name of the header, query parameter or cookie
            description: "any description..."
        }
    },
    definitions: {
        GetAutor:{
            "REF": "OR000001",
            "ISNI": "",
            "ISNI_VERIFIEE": "non",
            "ALIAS": [],
            "BIBLIO": "",
            "BIO": "",
            "CONTACT": "",
            "COPY": "",
            "DMORT": "",
            "DNAISS": "",
            "EXPO": "",
            "FONC": [
              "Fabricant orfèvre"
            ],
            "VIDEO": "",
            "LIENS": "",
            "LMDP": "",
            "LMORT": "",
            "LNAISS": "",
            "AUTORLOCA": "",
            "NATIO": "",
            "NOM": "Abit",
            "PREN": "Armand",
            "PNOM": "",
            "TYPAPE": "",
            "REJET": [],
            "OEUVR": "",
            "PUBLI": "",
            "ALAMAP": [],
            "PRODUCTEUR": "Inventaire",
            "REDAC": "",
            "LRELA": "",
            "SOURCES": "",
            "TITR": [],
            "TYPID": [],
            "ARK": "",
            "OBS": "",
            "BASE": "Ressources biographiques (Autor)",
            "INI": "A.A.",
            "ADRS": "71 rue du Temple",
            "SCLE": [],
            "DATES": [],
            "FORM": "",
            "SYMB": "un habit",
            "INS": "16 octobre 1895",
            "GAR": "B882",
            "PREF": "11298",
            "BIF": "4 juillet 1898",
            "LOCACT": "Paris",
            "LBASE": [],
            "NOMPRENOM": "Armand Abit",
            "CONTIENT_IMAGE": "non",
            "DMAJ": "2020-06-11",
            "POP_FLAGS": [],
            "DMIS": "2020-06-11",
            "_id": "5ee1efbe65451d2f5a1c8b02",
            "LOCA": "",
            "MEMOIRE": [],
            "__v": 0,
            "HISTORIQUE": []
        },
        GetDeleteHistorique:{
            "success": true,
            "deleteHistorique": [
              {
                "_id": "608aad9288387d7a2811bb1a",
                "REF": "PA94000002",
                "BASE": "merimee",
                "USER": "Nom utilisateur",
                "EMAIL": "Email utilisateur",
                "DATE": "2021-4-29 14:58",
                "__v": 0
              },
              {
                "_id": "5f6cc49c3998404bdf7d6487",
                "REF": "AP13R001264",
                "BASE": "memoire",
                "USER": "Nom utilisateur",
                "EMAIL": "Email utilisateur",
                "DATE": "2020-9-24 16:9",
                "__v": 0
              }
            ]
        },
        GetEnluminures: {
            "BASE": "Enluminures (Enluminures)",
            "CONTIENT_IMAGE": "oui",
            "ATTRIB": "Maître de la Légende dorée de Munich (proche du)",
            "APPL": "",
            "AUTR": "",
            "AUTS": "",
            "CONSERV": "",
            "CONTXT": "Miniature",
            "COTE": "ms. 0002",
            "DATE": "vers 1430-1440",
            "DATDEB": "1430",
            "DATFIN": "1440",
            "DIMS": "",
            "ETAB": "Aurillac - BM",
            "FOPG": "f. 015",
            "FOLIOS": "",
            "LANGOUV": "latin ; français",
            "NFICH": "",
            "NVUE": "",
            "NOMENC": [
                "Liturgie",
                "Dévotion"
            ],
            "NOTES": "Les 16 grandes miniatures de style parisien (proche du Maître de la Légende de Munich ?), les 24 petites miniatures du calendrier et la décoration ornée, avec lés éléments figurés très variés des encadrements (parfois en rapport avec le texte ?), d'un autre style (France de l'ouest, influencé par l'Angleterre ?). Calendrier illustré.",
            "NOTDEC": "Grand disque d'or à liseré rouge (gloire), rayonnant au-dessus du groupe (cf. f. 59v). L'ermite, lanterne à la main, se tient au seuil d'une chapelle avec enclos construite au bord d'une forêt, sur un promontoire.",
            "OPHOT": "",
            "ORIGG": "France (ouest)",
            "ORIGH": "Normandie",
            "ORIGP": "",
            "DOMN": "décor",
            "TYPE": "enluminure ; manuscrit",
            "POSS": [
                "anonyme femme (destinataire)",
                "Morel, Gabriel"
            ],
            "REFD": "Aurillac - BM - ms. 0002",
            "REFIM": "",
            "ENRGFP": "",
            "ENRGMS": "",
            "DROIT": "cliché IRHT ; droits collectivité, CNRS et MCC",
            "COPY": "© Institut de recherche et d'histoire des textes - CNRS",
            "SUJET": "Saint Christophe portant l'Enfant Jésus",
            "SUPP": "",
            "TITR": "Heures à l'usage de Bayeux",
            "TYPDEC": "page décorée (en nombre)/miniature (40)/encadrement animé (en nombre)/encadrement orné (en nombre)/initiale ornée (en nombre)/initiale champie (en nombre)/bout-de-ligne champi (en nombre)/armoiries",
            "TYPCOD": "codex",
            "LOCA": "Aurillac",
            "LOCA2": "",
            "VISITE": "",
            "VIDEO": [
                "enluminures/D-000001/IRHT_079949-p.jpg"
            ],
            "TOUT": "",
            "IMG": "",
            "DMAJ": "2019-01-01",
            "DMIS": "2019-01-01",
            "_id": "5c7f7f85c6342ed5afeea4c3",
            "REF": "D-000001",
            "__v": 0,
            "HISTORIQUE": []
        },
        GetGallery: {
           createdBy: "anonyme",
           institution: "public",
           createdAt: "2021-06-18T08:32:25.186Z",
           _id: "5c9a6074ae8d106e1142d96b",
           params: {
               view: "mosaic",
               mode: "simple",
               base: "[\"Photographies (Mémoire)\"]",
               auteur: "[\"Nadar (atelier)\"]",
               image: "[\"oui\"]"
           },
           __v: 0
        },
        GetJoconde:{
            "POP_COORDONNEES": {
                "lat": 44.931125,
                "lon": 4.889563
            },
            "PRODUCTEUR": "",
            "BASE": "",
            "CONTIENT_IMAGE": "oui",
            "POP_CONTIENT_GEOLOCALISATION": "oui",
            "POP_FLAGS": [],
            "POP_IMPORT": [],
            "REFMIS": "",
            "MANQUANT": [],
            "MANQUANT_COM": "",
            "ADPT": "",
            "APPL": "",
            "APTN": "",
            "ATTR": "",
            "AUTR": [],
            "BIBL": "",
            "COMM": "",
            "CONTACT": "",
            "COOR": "",
            "COPY": "",
            "DACQ": "",
            "DATA": "",
            "DATION": "",
            "DDPT": "",
            "DECV": "",
            "DENO": [
            ""
            ],
            "DEPO": [],
            "DESC": "",
            "DESY": "",
            "DIFFU": "",
            "DIMS": "",
            "DMAJ": "",
            "DMIS": "",
            "DOMN": [
            ""
            ],
            "DREP": "",
            "ECOL": [],
            "EPOQ": [
            ""
            ],
            "ETAT": "",
            "EXPO": "",
            "GENE": [],
            "GEOHI": [],
            "HIST": "",
            "IMAGE": "oui",
            "IMG": [
            "",
            ""
            ],
            "INSC": [],
            "INV": "",
            "LABEL": "",
            "LABO": "",
            "LARC": "",
            "LIEUX": [],
            "REGION": "",
            "DPT": "",
            "VILLE_M": "",
            "NOMOFF": "",
            "LOCA": "",
            "LOCA2": "",
            "LOCA3": "",
            "MILL": [],
            "MILU": "",
            "MOSA": "",
            "MSGCOM": "",
            "MUSEO": "",
            "NSDA": "",
            "ONOM": [],
            "PAUT": "",
            "PDAT": "",
            "PDEC": "",
            "PEOC": [],
            "PERI": [],
            "PERU": [],
            "PHOT": "",
            "PINS": "",
            "PLIEUX": "",
            "PREP": "",
            "PUTI": "",
            "RANG": "",
            "REDA": [],
            "REFIM": "",
            "REFMEM": [],
            "REFMER": [],
            "REFPAL": [],
            "REPR": [
            ""
            ],
            "RETIF": "",
            "SREP": [],
            "STAT": [],
            "TECH": [
            ""
            ],
            "TICO": "",
            "TITR": "",
            "TOUT": "",
            "UTIL": [
            ""
            ],
            "VIDEO": [
            ""
            ],
            "WWW": [
            ""
            ],
            "LVID": "",
            "_id": "",
            "REF": "",
            "__v": 0,
            "HISTORIQUE": [ 
                {
                    "_id": "",
                    "nom": "",
                    "prenom": "",
                    "email": "",
                    "date": "",
                    "updateMode": ""
                }
            ]
        },
        GetMemoire:{
            "PRODUCTEUR": "",
            "BASE": "",
            "CONTIENT_IMAGE": "oui",
            "POP_FLAGS": [
                ""
            ],
            "POP_IMPORT": [],
            "TOUT": "",
            "ADRESSE": "",
            "AUTOEU": "",
            "AUTG": "",
            "AUTP": [
                ""
            ],
            "AUTOR": "",
            "AUTTI": "",
            "COM": "",
            "DOM": "",
            "EDIF": "",
            "EXPO": "",
            "JDATPV": "",
            "LIEUCOR": "",
            "COTECOR": "",
            "LIEUCTI": "",
            "COTECTI": "",
            "LIEUCP": "",
            "COTECP": "",
            "LEG": "",
            "OBJT": "",
            "OBS": "",
            "OBSOR": "",
            "OBSTI": "",
            "PAYS": "",
            "PUBLI": "",
            "TIREDE": "",
            "ROLE": "",
            "PRECOR": "",
            "SERIE": "",
            "THEATRE": "",
            "TITRE": "",
            "DMAJ": "",
            "DMIS": "",
            "IDPROD": "",
            "NUMCD": "",
            "NUMF": "",
            "INSEE": "",
            "NVD": "",
            "MARQ": "",
            "PLOC": "",
            "ACQU": "",
            "ADPHOT": "",
            "AIRE": "",
            "ANUMP": "",
            "COPY": "",
            "COULEUR": "",
            "DPT_LETTRE": "",
            "DATIMM": "",
            "DATOEU": "",
            "DATPV": "",
            "DATOR": "",
            "DATTI": "",
            "DATG": "",
            "DATD": "",
            "DIFF": "",
            "DPT": "",
            "EDIARCH": "",
            "ECH": "",
            "FORMAT": "",
            "FORMATOR": "",
            "FORMATTI": "",
            "LBASE": [
                ""
            ],
            "WEB": "",
            "LIB": "",
            "LOCA": "",
            "LIEUORIG": "",
            "MCGEO": "",
            "MCL": "",
            "MENTIONS": "",
            "MENTOR": "",
            "MENTTI": "",
            "MCPER": "",
            "VUECD": "",
            "NUMAUTP": "",
            "NUMVERS": "",
            "ANUMOR": "",
            "NUMOR": "",
            "NUMP": "",
            "ANUMTI": "",
            "NUMTI": "",
            "RENV": "",
            "REG": "",
            "SENS": "",
            "SCLE": "",
            "SUP": "",
            "TECHN": "",
            "TECHOR": "",
            "TECHTI": "",
            "CINEPROD": "",
            "TYP": "AREF",
            "TYPDOC": "",
            "TYPEIMG": "",
            "TYPSUPP": "",
            "VIDEO": "",
            "LBASE2": "",
            "LEG2": "",
            "REFIM": "",
            "REFIMG": "",
            "REFJOC": [],
            "REFMUS": [],
            "MOSA": "",
            "SITE": "",
            "NUMSITE": "",
            "NUMOP": "",
            "CHRONO": "",
            "REPRO": "",
            "STRUCT": "",
            "SUJET": "",
            "TICO": "",
            "NUMI": "",
            "LIEU": "",
            "WADRS": "",
            "CONTACT": "",
            "EMET": "",
            "NUM": "",
            "IMG": "",
            "WCOM": "",
            "LIENS": "",
            "LAUTP": "",
            "TRL": "",
            "DENO": "",
            "AUT": "",
            "AUTR": "",
            "DOC": "",
            "NEGPOS": "",
            "NOMSN": "",
            "_id": "",
            "REF": "",
            "__v": 1,
            "MEMOIRE": [],
            "POP_COMMENTAIRES": [
                ""
            ],
            "HISTORIQUE": [
                {
                    "_id": "",
                    "nom": "",
                    "prenom": "",
                    "email": "",
                    "date": "",
                    "updateMode": ""
                  }
            ]
        },
        GetMerimee:{
            "POP_COORDONNEES": {
                "lat": 0,
                "lon": 0
              },
              "POP_COORDINATES_POLYGON": {
                "type": "Polygon",
                "coordinates": []
              },
              "PRODUCTEUR": "",
              "BASE": "",
              "CONTIENT_IMAGE": "",
              "POP_FLAGS": [
                ""
              ],
              "POP_CONTIENT_GEOLOCALISATION": "",
              "POP_DATE": [
                1500
              ],
              "POP_IMPORT": [
                "5c0b8dd6d0c49a0e191ccdf4"
              ],
              "TOUT": "",
              "ACTU": "",
              "ADRS": "",
              "AFFE": "",
              "AIRE": "",
              "APPL": "",
              "APRO": [
                "Arrêté"
              ],
              "ARCHEO": "",
              "AUTP": [
                ""
              ],
              "AUTR": [],
              "CADA": [],
              "CANT": "",
              "COLL": [],
              "COM": "",
              "COOR": "",
              "COORM": "",
              "COPY": [
                ""
              ],
              "COUV": [],
              "DATE": [],
              "DBOR": "",
              "DOMN": [],
              "DENO": [
                ""
              ],
              "DENQ": "",
              "DEPL": "",
              "DESC": "",
              "DIMS": "",
              "DMAJ": "",
              "DMIS": "",
              "DOSS": "",
              "DPRO": "",
              "DPT": "",
              "DPT_LETTRE": "",
              "EDIF": "",
              "ELEV": [],
              "ENER": [],
              "ESCA": [],
              "ETAG": [],
              "ETAT": [],
              "ETUD": [
                ""
              ],
              "GENR": [],
              "HIST": "",
              "HYDR": "",
              "IMPL": [],
              "INSEE": "",
              "INTE": [
                ""
              ],
              "JATT": [],
              "JDAT": [],
              "LINHA": [],
              "LREG": [],
              "LBASE2": "",
              "LIEU": "",
              "LOCA": "",
              "MFICH": "",
              "MOSA": "",
              "MHPP": "",
              "MICR": "",
              "MURS": [],
              "NBOR": "",
              "NOMS": [],
              "OBS": "",
              "PAFF": "",
              "PART": [],
              "PARN": [],
              "PDEN": "",
              "PERS": [],
              "PLAN": "",
              "PLOC": "",
              "PPRO": "",
              "PREP": [],
              "PROT": [
                ""
              ],
              "PSTA": "",
              "REFE": [],
              "REFP": [],
              "REFO": [
                ""
              ],
              "REFJOC": [
                ""
              ],
              "REFMUS": [
                ""
              ],
              "REG": "",
              "REMA": "",
              "REMP": "",
              "RENV": [],
              "REPR": "",
              "RFPA": "",
              "SCLD": [],
              "SCLE": [
                ""
              ],
              "SCLX": [
                "16e s."
              ],
              "SITE": "",
              "STAT": "",
              "TECH": [
                "Vitrail"
              ],
              "TICO": "",
              "TOIT": [],
              "TYPO": "",
              "VERT": "",
              "REFIM": "",
              "IMG": [
                ""
              ],
              "VIDEO": "",
              "POP_DOSSIER_VERT": "",
              "POP_ARRETE_PROTECTION": [],
              "POP_DOSSIER_PROTECTION": [],
              "DOSURL": "",
              "DOSURLPDF": "",
              "DOSADRS": "",
              "LIENS": [],
              "IMAGE": "",
              "VISI": [],
              "VOCA": "",
              "VOUT": [],
              "WEB": "",
              "ZONE": "",
              "THEM": "",
              "ACMH": "",
              "ACURL": "",
              "WADRS": "",
              "WCOM": "Auxon",
              "WRENV": "",
              "REFM": "",
              "CONTACT": "",
              "IDAGR": "",
              "LMDP": "",
              "PINT": "",
              "DLAB": "",
              "_id": "5b8418e054caee0d1410972b",
              "POP_COORDINATES_POINT": {
                "type": "Point",
                "coordinates": []
              },
              "POP_HAS_LOCATION": [
                "non"
              ],
              "DOSURLP": "",
              "REF": "PA00078021",
              "MEMOIRE": [
                {
                  "_id": "",
                  "ref": "",
                  "name": "",
                  "url": "",
                  "copy": ""
                }
              ],
              "__v": 14,
              "POP_COMMENTAIRES": [],
              "HISTORIQUE": [
                {
                    "_id": "",
                    "nom": "",
                    "prenom": "",
                    "email": "",
                    "date": "",
                    "updateMode": ""
                  }
              ]
        },
        GetMnr:{
            "PRODUCTEUR": "",
            "BASE": "",
            "CONTIENT_IMAGE": "",
            "POP_FLAGS": [],
            "POP_IMPORT": [
              ""
            ],
            "NET": "",
            "AUTR": [
              ""
            ],
            "PAUT": "",
            "ATTR": "",
            "ECOL": "",
            "TITR": "",
            "ATIT": "",
            "PTIT": "",
            "DENO": [],
            "DESC": "",
            "DOMN": [
              ""
            ],
            "LOCA": "",
            "INSC": "",
            "MARQ": "",
            "OBSE": "",
            "ETAT": "B",
            "GENE": "",
            "PROV": "",
            "HIST": "",
            "HIST2": "",
            "HIST3": "",
            "HIST4": "",
            "SALLES": "",
            "CARTELS": "",
            "SCLE": [
              ""
            ],
            "STYL": "",
            "MILL": "",
            "TECH": [
              ""
            ],
            "DIMS": [
              ""
            ],
            "VIDEO": [
              ""
            ],
            "INV": "",
            "EXPO": "",
            "BIBL": "",
            "AATT": "",
            "AUTI": "",
            "CATE": "",
            "RCL": "",
            "NOTE": "",
            "REDC": [
              ""
            ],
            "DREP": "",
            "PREP": "",
            "REPR": "",
            "SREP": "",
            "REFIM": "",
            "DMAJ": "",
            "DMIS": "",
            "AFFE": "",
            "NUMS": "",
            "SUITE": "",
            "COMM": "",
            "NOTE2": "",
            "RESUME": "",
            "PHOT": "",
            "RENV": [],
            "_id": "",
            "REF": "AGR00001",
            "__v": 0,
            "POP_COMMENTAIRES": [],
            "HISTORIQUE": [
              {
                "_id": "",
                "nom": "",
                "prenom": "",
                "email": "",
                "date": "",
                "updateMode": ""
              }
            ]
        },
        GetMuseo:{
            "POP_COORDONNEES": {
                "lat": 0,
                "lon": 0
              },
              "REF": "M1128",
              "POP_FLAGS": [],
              "POP_IMPORT": [
                ""
              ],
              "BASE": "",
              "ACCES": "",
              "ADRL1_M": "",
              "ARTISTE": "",
              "ATOUT": "",
              "CATEG": "",
              "COPY": "",
              "CP_M": "",
              "DOMPAL": [
                ""
              ],
              "DPT": "",
              "DT_MODIF": "",
              "HIST": "",
              "INTERET": "",
              "LABEL": "",
              "LIEU_M": "",
              "AUTNOM": "",
              "NOMOFF": "",
              "NOMUSAGE": "",
              "PHARE": "",
              "PROT-BAT": "",
              "PROT-ESP": "",
              "REFMEM": [
                ""
              ],
              "REFMER": [
                ""
              ],
              "REFPAL": [
                ""
              ],
              "REGION": "",
              "TEL_M": "",
              "CONTACT_GENERIQUE": "",
              "CONTACT_MUSEO": "",
              "THEMES": [
                ""
              ],
              "CONTIENT_IMAGE": "",
              "URL_M": "",
              "VILLE_M": "",
              "PHOTO": "",
              "TOUT": "",
              "ACTIV": "",
              "ADRESSE": "",
              "AMIS": "",
              "AN_CREAT": "",
              "ANNEE_FE": "",
              "ANNEXE": "",
              "ANTARIF": "",
              "CEDEX_AD": "",
              "CTRLTECH": "",
              "DT_CREAT": "",
              "DT_SAISI": "",
              "GESTION": "",
              "ITI2_M": "",
              "ITI_M": "",
              "JOCONDE": "",
              "LEGS": "",
              "MONOPLUR": "",
              "NB_AMI": "",
              "NOM_AMI": "",
              "DMAJ": "",
              "DMIS": "",
              "OBS_AMI": "",
              "OBS_TOUR": "",
              "PROPBAT": "",
              "PROPCOLL": "",
              "PUBLI": "",
              "REPCOLL": "",
              "SERVICES": "",
              "SIGLE_M": "",
              "STATUT": "",
              "SURFACES": "",
              "URL_M2": "",
              "VIDEO": "",
              "RESP": "",
              "GRESP": "",
              "PSC": "",
              "DPSC-D": "",
              "DPSC-S": "",
              "DMDF": "",
              "SPUB": "",
              "SPUB-P": "",
              "INVR": "",
              "NUMER": "",
              "LGN": "",
              "REST": "",
              "ACQU": "",
              "RECOL": "",
              "POP_CONTIENT_GEOLOCALISATION": "",
              "_id": "",
              "POP_COMMENTAIRES": [],
              "MEL": "",
              "__v": 0,
              "CONTACT": "",
              "HISTORIQUE": [
                {
                  "_id": "",
                  "nom": "",
                  "prenom": "",
                  "email": "",
                  "date": "",
                  "updateMode": ""
                }
              ]
        },
        GetPalissy:{
            "POP_COORDONNEES": {
                "lat": 0,
                "lon": 0
              },
              "POP_COORDINATES_POLYGON": {
                "type": "Polygon",
                "coordinates": []
              },
              "PRODUCTEUR": "",
              "BASE": "",
              "CONTIENT_IMAGE": "",
              "POP_FLAGS": [
                ""
              ],
              "POP_CONTIENT_GEOLOCALISATION": "",
              "POP_DATE": [
                1500
              ],
              "POP_IMPORT": [
                "5c0b8dd6d0c49a0e191ccdf4"
              ],
              "TOUT": "",
              "ACTU": "",
              "ADRS": "",
              "AFFE": "",
              "AIRE": "",
              "APPL": "",
              "APRO": [
                "Arrêté"
              ],
              "ARCHEO": "",
              "AUTP": [
                ""
              ],
              "AUTR": [],
              "CADA": [],
              "CANT": "",
              "COLL": [],
              "COM": "",
              "COOR": "",
              "COORM": "",
              "COPY": [
                ""
              ],
              "COUV": [],
              "DATE": [],
              "DBOR": "",
              "DOMN": [],
              "DENO": [
                ""
              ],
              "DENQ": "",
              "DEPL": "",
              "DESC": "",
              "DIMS": "",
              "DMAJ": "",
              "DMIS": "",
              "DOSS": "",
              "DPRO": "",
              "DPT": "",
              "DPT_LETTRE": "",
              "EDIF": "",
              "ELEV": [],
              "ENER": [],
              "ESCA": [],
              "ETAG": [],
              "ETAT": [],
              "ETUD": [
                ""
              ],
              "GENR": [],
              "HIST": "",
              "HYDR": "",
              "IMPL": [],
              "INSEE": "",
              "INTE": [
                ""
              ],
              "JATT": [],
              "JDAT": [],
              "LINHA": [],
              "LREG": [],
              "LBASE2": "",
              "LIEU": "",
              "LOCA": "",
              "MFICH": "",
              "MOSA": "",
              "MHPP": "",
              "MICR": "",
              "MURS": [],
              "NBOR": "",
              "NOMS": [],
              "OBS": "",
              "PAFF": "",
              "PART": [],
              "PARN": [],
              "PDEN": "",
              "PERS": [],
              "PLAN": "",
              "PLOC": "",
              "PPRO": "",
              "PREP": [],
              "PROT": [
                ""
              ],
              "PSTA": "",
              "REFE": [],
              "REFP": [],
              "REFO": [
                ""
              ],
              "REFJOC": [
                ""
              ],
              "REFMUS": [
                ""
              ],
              "REG": "",
              "REMA": "",
              "REMP": "",
              "RENV": [],
              "REPR": "",
              "RFPA": "",
              "SCLD": [],
              "SCLE": [
                ""
              ],
              "SCLX": [
                "16e s."
              ],
              "SITE": "",
              "STAT": "",
              "TECH": [
                "Vitrail"
              ],
              "TICO": "",
              "TOIT": [],
              "TYPO": "",
              "VERT": "",
              "REFIM": "",
              "IMG": [
                ""
              ],
              "VIDEO": "",
              "POP_DOSSIER_VERT": "",
              "POP_ARRETE_PROTECTION": [],
              "POP_DOSSIER_PROTECTION": [],
              "DOSURL": "",
              "DOSURLPDF": "",
              "DOSADRS": "",
              "LIENS": [],
              "IMAGE": "",
              "VISI": [],
              "VOCA": "",
              "VOUT": [],
              "WEB": "",
              "ZONE": "",
              "THEM": "",
              "ACMH": "",
              "ACURL": "",
              "WADRS": "",
              "WCOM": "Auxon",
              "WRENV": "",
              "REFM": "",
              "CONTACT": "",
              "IDAGR": "",
              "LMDP": "",
              "PINT": "",
              "DLAB": "",
              "_id": "5b8418e054caee0d1410972b",
              "POP_COORDINATES_POINT": {
                "type": "Point",
                "coordinates": []
              },
              "POP_HAS_LOCATION": [
                "non"
              ],
              "DOSURLP": "",
              "REF": "PA00078021",
              "MEMOIRE": [
                {
                  "_id": "",
                  "ref": "",
                  "name": "",
                  "url": "",
                  "copy": ""
                }
              ],
              "__v": 14,
              "POP_COMMENTAIRES": [],
              "HISTORIQUE": [
                {
                    "_id": "",
                    "nom": "",
                    "prenom": "",
                    "email": "",
                    "date": "",
                    "updateMode": ""
                }
              ]
        },
        GetProducteurs:{
            "success": true,
            "producteurs": [
                {
                    "BASE": [
                      {
                        "base": "joconde",
                        "prefixes": []
                      },
                      {
                        "base": "museo",
                        "prefixes": []
                      }
                    ],
                    "_id": "",
                    "LABEL": "MUSEE",
                    "__v": 1
                }
            ]
        }
    }
}

const outputFile = './src/swagger/swagger_ui.json'
const endpointsFiles = [
  './src/controllers/auth.js',
    './src/controllers/autor.js',
    './src/controllers/enluminures.js',
    './src/controllers/deleteHistorique.js',
    './src/controllers/gallery.js',
    './src/controllers/import.js',
    './src/controllers/joconde.js',
    './src/controllers/memoire.js',
    './src/controllers/merimee.js',
    './src/controllers/mnr.js',
    './src/controllers/museo.js',
    './src/controllers/oai.js',
    './src/controllers/palissy.js',
   './src/controllers/producteurs.js',
   './src/controllers/reporting.js',
   './src/controllers/groups.js',
   './src/controllers/thesaurus.js',
   './src/controllers/users.js',
]

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    // require('../app')           // Your project's root file
})