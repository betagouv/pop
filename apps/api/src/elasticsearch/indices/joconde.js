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
    joconde: {
      properties: {
        ADPT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        APPL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        APTN: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        ATTR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        AUTR: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            },
            strict: {
              type: "text",
              analyzer: "french_strict"
            }
          }
        },
        BASE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        BIBL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 8000
            }
          }
        },
        COMM: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        CONTACT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        CONTIENT_IMAGE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        COOR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        COPY: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        DACQ: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        DATA: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        DATION: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        DDPT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        DECV: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        DENO: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            },
            strict: {
              type: "text",
              analyzer: "french_strict"
            }
          }
        },
        DEPO: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        DESC: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 8000
            }
          }
        },
        DESY: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        DIFFU: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        DIMS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        DMAJ: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        DMIS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        DOMN: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            },
            strict: {
              type: "text",
              analyzer: "french_strict"
            }
          }
        },
        DREP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        ECOL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        EPOQ: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            },
            strict: {
              type: "text",
              analyzer: "french_strict"
            }
          }
        },
        ETAT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        EXPO: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        GENE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        GEOHI: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        HIST: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            },
            strict: {
              type: "text",
              analyzer: "french_strict"
            }
          }
        },
        IMAGE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        IMG: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        INSC: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        INV: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        LABEL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        LABO: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        LARC: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        LIEUX: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        LOCA: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            },
            strict: {
              type: "text",
              analyzer: "french_strict"
            }
          }
        },
        LOCA2: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        LOCA3: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        LVID: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        MILL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        MILU: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        MOSA: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        MSGCOM: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        MUSEO: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        NSDA: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        ONOM: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        PAUT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        PDAT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        PDEC: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        PEOC: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        PERI: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        PERU: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        PHOT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        PINS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        PLIEUX: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        PREP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
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
        PUTI: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        RANG: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        REDA: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        REF: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        REFIM: {
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
        REFPAL: {
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
        REFMIS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        REPR: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            },
            strict: {
              type: "text",
              analyzer: "french_strict"
            }
          }
        },
        RETIF: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        SREP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        STAT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        TECH: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        TICO: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            },
            strict: {
              type: "text",
              analyzer: "french_strict"
            }
          }
        },
        TITR: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            },
            strict: {
              type: "text",
              analyzer: "french_strict"
            }
          }
        },
        TOUT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        UTIL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        VIDEO: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        WWW: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
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
        POP_COORDONNEES: {
          type: "geo_point"
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
  }
};
