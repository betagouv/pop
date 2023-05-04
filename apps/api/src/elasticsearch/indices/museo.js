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
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        ACQU: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        ACTIV: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        ADRESSE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        ADRL1_AD: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        ADRL1_M: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        AMIS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        ANNEE_FE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        ANNEXE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        ANTARIF: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        AN_CREAT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        AN_REOUV: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        ARTISTE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "sort_normalizer"
            }
          }
        },
        ATOUT: {
          type: "text",
          fields: {
            keyword: {
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
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        CEDEX_AD: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        COPY: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        CP_ADM: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        CP_M: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        CTRLTECH: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        CV_PHOTO: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        DEPENSES: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        DEPO_AUT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        DEPO_ETA: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        DEPO_EXT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        DMAJ: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        DMDF: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        DOMPAL: {
          type: "text",
          fields: {
            keyword: {
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
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        "DPSC-S": {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        DPT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        DT_CREAT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        DT_MODIF: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        DT_OUVER: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        DT_SAISI: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        EFFPERS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        ENVIRON: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        EQUIP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        EXPO_EXT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        EXPO_RES: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        FAX_ADM: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        FAX_M: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        FEDER_M: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        FICHPART: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        FILTER: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        FONCTION: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        FREQ: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        GESTION: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        GRESP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        HIST: {
          type: "text",
          fields: {
            keyword: {
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
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        INFORMAT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        INTERET: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        INVR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        ITI2_M: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        ITI_M: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        JOCONDE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        LABEL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        LEGS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        LGN: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        LIEU_ADM: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        LIEU_M: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        MEL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        MONOPLUR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        NB_AMI: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        AUTNOM: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        NOMOFF: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        NOMUSAGE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        NOM_AMI: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        NOM_COM: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        NUMER: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        OBS_AMI: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        OBS_TOUR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        PERS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        PHARE: {
          type: "text",
          fields: {
            keyword: {
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
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        PROPCOLL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
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
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        PUBLI: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        RECOL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        REF: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
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
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        REPCOLL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        RESP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        RESSOURC: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        REST: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        RES_M: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        SERVICES: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        SIGLE_M: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        SIGNALON: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        SPUB: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        "SPUB-P": {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        STATUT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        SURFACES: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        TEL_ADM: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        TEL_COM: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        TEL_M: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
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
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        URL_M: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        URL_M2: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        VIDEO: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        VILLE_AD: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        VILLE_M: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
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
              ignore_above: 256,
              normalizer: "sort_normalizer"
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
                  ignore_above: 256,
                  normalizer: "sort_normalizer"
                }
              }
            },
            nom: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256,
                  normalizer: "sort_normalizer"
                }
              }
            },
            prenom: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256,
                  normalizer: "sort_normalizer"
                }
              }
            },
            email: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256,
                  normalizer: "sort_normalizer"
                }
              }
            },
            date: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256,
                  normalizer: "sort_normalizer"
                }
              }
            },
            updateMode: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256,
                  normalizer: "sort_normalizer"
                }
              }
            }
          }
        }
      }
    }
  }
};
