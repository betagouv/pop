const { ovh } = require("../../config.js");

if (ovh) {
  module.exports = {
    settings: {
      analysis: {
        filter: {
          french_elision: {
            type: "elision",
            articles_case: true,
            articles: [
              "l",
              "m",
              "t",
              "qu",
              "n",
              "s",
              "j",
              "d",
              "c",
              "jusqu",
              "quoiqu",
              "lorsqu",
              "puisqu"
            ]
          },
          french_stemmer: {
            type: "stemmer",
            language: "light_french"
          }
        },
        char_filter:{
          replace_and:{
            type: "mapping",
            mappings: [
              "& => and"
            ]
          }
        },
        analyzer: {
          french_fuzzy: {
            tokenizer: "icu_tokenizer",
            filter: ["french_elision", "icu_folding", "french_stemmer"],
            char_filter: ["replace_and"]
          },
          french_strict: {
            tokenizer: "icu_tokenizer",
            filter: ["french_elision", "icu_folding"]
          }
        }
      }
    },
    mappings: {
      properties: {
        ACCES: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        ACQU: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        ACTIV: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        ADRESSE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        ADRL1_AD: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        ADRL1_M: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        AMIS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        ANNEE_FE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        ANNEXE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        ANTARIF: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        AN_CREAT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        AN_REOUV: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        ARTISTE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        ATOUT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        CATEG: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        CEDEX_AD: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        COPY: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        CP_ADM: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        CP_M: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        CTRLTECH: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        CV_PHOTO: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DEPENSES: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DEPO_AUT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DEPO_ETA: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DEPO_EXT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DMAJ: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DMDF: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DOMPAL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        "DPSC-D": {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        "DPSC-S": {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DPT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DT_CREAT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DT_MODIF: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DT_OUVER: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DT_SAISI: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        EFFPERS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        ENVIRON: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        EQUIP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        EXPO_EXT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        EXPO_RES: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        FAX_ADM: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        FAX_M: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        FEDER_M: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        FICHPART: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        FILTER: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        FONCTION: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        FREQ: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        GESTION: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        GRESP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        HIST: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        HORAIRES: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        INFORMAT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        INTERET: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        INVR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        ITI2_M: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        ITI_M: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        JOCONDE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        LABEL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        LEGS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        LGN: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        LIEU_ADM: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        LIEU_M: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        MEL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        MONOPLUR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        NB_AMI: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        AUTNOM: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        NOMOFF: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        NOMUSAGE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        NOM_AMI: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        NOM_COM: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        NUMER: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        OBS_AMI: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        OBS_TOUR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        PERS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        PHARE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        PROPBAT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        PROPCOLL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        "PROT-BAT": {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        "PROT-ESP": {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        PSC: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        PUBLI: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        RECOL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        REF: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        PRODUCTEUR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        REFMEM: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        REFMER: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        REGION: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        REPCOLL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        RESP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        RESSOURC: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        REST: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        RES_M: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        SERVICES: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        SIGLE_M: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        SIGNALON: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        SPUB: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        "SPUB-P": {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        STATUT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        SURFACES: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        TEL_ADM: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        TEL_COM: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        TEL_M: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        THEMES: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        TOUT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        URL_M: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        URL_M2: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        VIDEO: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        VILLE_AD: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        VILLE_M: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        POP_COORDONNEES: {
          type: "geo_point"
        },
        POP_CONTIENT_GEOLOCALISATION: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        HISTORIQUE: {
          properties: {
            _id: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256
                }
              }
            },
            nom: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256
                }
              }
            },
            prenom: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256
                }
              }
            },
            email: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256
                }
              }
            },
            date: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256
                }
              }
            },
            updateMode: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256
                }
              }
            }
          }
        }
      }
    }
  };
} else {
  module.exports = {
    settings: {
      analysis: {
        filter: {
          french_elision: {
            type: "elision",
            articles_case: true,
            articles: [
              "l",
              "m",
              "t",
              "qu",
              "n",
              "s",
              "j",
              "d",
              "c",
              "jusqu",
              "quoiqu",
              "lorsqu",
              "puisqu"
            ]
          },
          french_stemmer: {
            type: "stemmer",
            language: "light_french"
          }
        },
        char_filter:{
          replace_and:{
            type: "mapping",
            mappings: [
              "& => and"
            ]
          }
        },
        analyzer: {
          french_fuzzy: {
            tokenizer: "icu_tokenizer",
            filter: ["french_elision", "icu_folding", "french_stemmer"],
            char_filter: ["replace_and"]
          },
          french_strict: {
            tokenizer: "icu_tokenizer",
            filter: ["french_elision", "icu_folding"]
          }
        },
        normalizer:{
          sort_normalizer:{
            type: "custom",
            filter: ["trim", "lowercase", "asciifolding"],
          }
        }
      }
    },
    mappings: {
      museo: {
        properties: {
          ACCES: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256           
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          ACQU: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          ACTIV: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          ADRESSE: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          ADRL1_AD: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          ADRL1_M: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          AMIS: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          ANNEE_FE: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          ANNEXE: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          ANTARIF: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          AN_CREAT: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          AN_REOUV: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          ARTISTE: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword"            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer"
              }
            }
          },
          ATOUT: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword"            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer"
              }
            }
          },
          CATEG: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          CEDEX_AD: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          COPY: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          CP_ADM: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          CP_M: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          CTRLTECH: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          CV_PHOTO: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          DEPENSES: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          DEPO_AUT: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          DEPO_ETA: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          DEPO_EXT: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          DMAJ: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          DMDF: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          DOMPAL: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword"            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer"
              }
            }
          },
          "DPSC-D": {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          "DPSC-S": {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          DPT: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          DT_CREAT: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          DT_MODIF: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          DT_OUVER: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          DT_SAISI: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          EFFPERS: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          ENVIRON: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          EQUIP: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          EXPO_EXT: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          EXPO_RES: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          FAX_ADM: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          FAX_M: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          FEDER_M: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          FICHPART: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          FILTER: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          FONCTION: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          FREQ: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          GESTION: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          GRESP: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          HIST: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword"            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer"
              }
            }
          },
          HORAIRES: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          INFORMAT: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          INTERET: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          INVR: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          ITI2_M: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          ITI_M: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          JOCONDE: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          LABEL: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          LEGS: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          LGN: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          LIEU_ADM: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          LIEU_M: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          MEL: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          MONOPLUR: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          NB_AMI: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          AUTNOM: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          NOMOFF: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          NOMUSAGE: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          NOM_AMI: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          NOM_COM: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          NUMER: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          OBS_AMI: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          OBS_TOUR: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          PERS: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          PHARE: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword"            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer"
              }
            }
          },
          PROPBAT: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          PROPCOLL: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          "PROT-BAT": {
            type: "text",
            fields: {
              keyword: {
                type: "keyword"           
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer"
              }
            }
          },
          "PROT-ESP": {
            type: "text",
            fields: {
              keyword: {
                type: "keyword"            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer"
              }
            }
          },
          PSC: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          PUBLI: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          RECOL: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          REF: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          PRODUCTEUR: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword"
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer"
              }
            }
          },
          REFMEM: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword"            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer"
              }
            }
          },
          REFMER: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword"            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer"
              }
            }
          },
          REGION: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          REPCOLL: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          RESP: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          RESSOURC: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          REST: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          RES_M: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          SERVICES: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          SIGLE_M: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          SIGNALON: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          SPUB: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          "SPUB-P": {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          STATUT: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          SURFACES: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          TEL_ADM: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          TEL_COM: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          TEL_M: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          THEMES: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword"            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer"
              }
            }
          },
          TOUT: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          URL_M: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          URL_M2: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          VIDEO: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          VILLE_AD: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          VILLE_M: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          POP_COORDONNEES: {
            type: "geo_point"
          },
          POP_CONTIENT_GEOLOCALISATION: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          HISTORIQUE: {
            properties: {
              _id: {
                type: "text",
                fields: {
                  keyword: {
                    type: "keyword",
                    ignore_above: 256
                  },
                  sort: {
                    type: "keyword",
                    normalizer: "sort_normalizer",
                    ignore_above: 256
                  }
                }
              },
              nom: {
                type: "text",
                fields: {
                  keyword: {
                    type: "keyword",
                    ignore_above: 256
                  },
                  sort: {
                    type: "keyword",
                    normalizer: "sort_normalizer",
                    ignore_above: 256
                  }
                }
              },
              prenom: {
                type: "text",
                fields: {
                  keyword: {
                    type: "keyword",
                    ignore_above: 256
                  },
                  sort: {
                    type: "keyword",
                    normalizer: "sort_normalizer",
                    ignore_above: 256
                  }
                }
              },
              email: {
                type: "text",
                fields: {
                  keyword: {
                    type: "keyword",
                    ignore_above: 256
                  },
                  sort: {
                    type: "keyword",
                    normalizer: "sort_normalizer",
                    ignore_above: 256
                  }
                }
              },
              date: {
                type: "text",
                fields: {
                  keyword: {
                    type: "keyword",
                    ignore_above: 256
                  },
                  sort: {
                    type: "keyword",
                    normalizer: "sort_normalizer",
                    ignore_above: 256
                  }
                }
              },
              updateMode: {
                type: "text",
                fields: {
                  keyword: {
                    type: "keyword",
                    ignore_above: 256
                  },
                  sort: {
                    type: "keyword",
                    normalizer: "sort_normalizer",
                    ignore_above: 256
                  }
                }
              }
            }
          }
        }
      }
    }
  };
}
