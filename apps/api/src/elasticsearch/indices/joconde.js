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
    joconde: {
      properties: {
        ADPT: {
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
        APPL: {
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
        APTN: {
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
        ATTR: {
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
        AUTR: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256            
            },
            sort: {
              type: "keyword",
              normalizer: "sort_normalizer",
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
            },
            sort: {
              type: "keyword",
              normalizer: "sort_normalizer"
            }
          }
        },
        BIBL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 8000            
            },
            sort: {
              type: "keyword",
              normalizer: "sort_normalizer",
              ignore_above: 8000
            }
          }
        },
        COMM: {
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
        CONTACT: {
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
        CONTIENT_IMAGE: {
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
        COOR: {
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
        COPY: {
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
        DACQ: {
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
        DATA: {
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
        DATION: {
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
        DDPT: {
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
        DECV: {
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
        DENO: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256            
            },
            sort: {
              type: "keyword",
              normalizer: "sort_normalizer",
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
            },
            sort: {
              type: "keyword",
              normalizer: "sort_normalizer"
            }
          }
        },
        DESC: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 8000            
            },
            sort: {
              type: "keyword",
              normalizer: "sort_normalizer",
              ignore_above: 8000
            }
          }
        },
        DESY: {
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
        DIFFU: {
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
        DIMS: {
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
        DMAJ: {
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
        DMIS: {
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
        DOMN: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256            
            },
            sort: {
              type: "keyword",
              normalizer: "sort_normalizer",
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
            },
            sort: {
              type: "keyword",
              normalizer: "sort_normalizer"
            }
          }
        },
        ECOL: {
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
        EPOQ: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256            
            },
            sort: {
              type: "keyword",
              normalizer: "sort_normalizer",
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
            },
            sort: {
              type: "keyword",
              normalizer: "sort_normalizer"
            }
          }
        },
        EXPO: {
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
        GENE: {
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
        GEOHI: {
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
        HIST: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256            
            },
            sort: {
              type: "keyword",
              normalizer: "sort_normalizer",
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
            },
            sort: {
              type: "keyword",
              normalizer: "sort_normalizer"
            }
          }
        },
        IMG: {
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
        INSC: {
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
        INV: {
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
        LABEL: {
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
        LABO: {
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
        LARC: {
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
        LIEUX: {
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
        LOCA: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256            
            },
            sort: {
              type: "keyword",
              normalizer: "sort_normalizer",
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
            },
            sort: {
              type: "keyword",
              normalizer: "sort_normalizer"
            }
          }
        },
        LOCA3: {
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
        LVID: {
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
        MILL: {
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
        MILU: {
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
        MOSA: {
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
        MSGCOM: {
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
        MUSEO: {
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
        NSDA: {
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
        ONOM: {
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
        PAUT: {
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
        PDAT: {
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
        PDEC: {
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
        PEOC: {
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
        PERI: {
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
        PERU: {
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
        PHOT: {
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
        PINS: {
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
        PLIEUX: {
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
        PREP: {
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
        PUTI: {
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
        RANG: {
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
        REDA: {
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
        REF: {
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
        REFIM: {
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
        REFPAL: {
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
        REFMIS: {
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
        REPR: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256            
            },
            sort: {
              type: "keyword",
              normalizer: "sort_normalizer",
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
            },
            sort: {
              type: "keyword",
              normalizer: "sort_normalizer"
            }
          }
        },
        SREP: {
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
        STAT: {
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
        TECH: {
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
        TICO: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256            
            },
            sort: {
              type: "keyword",
              normalizer: "sort_normalizer",
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
            sort: {
              type: "keyword",
              normalizer: "sort_normalizer",
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
            },
            sort: {
              type: "keyword",
              normalizer: "sort_normalizer"
            }
          }
        },
        UTIL: {
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
        VIDEO: {
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
        WWW: {
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
