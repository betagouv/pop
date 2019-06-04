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
      analyzer: {
        french_fuzzy: {
          tokenizer: "icu_tokenizer",
          filter: ["french_elision", "icu_folding", "french_stemmer"]
        },
        french_strict: {
          tokenizer: "icu_tokenizer",
          filter: ["french_elision", "icu_folding"]
        }
      }
    }
  },
  mappings: {
    merimee: {
      properties: {
        ACMH: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        ACTU: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        ACURL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        ADRS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        AFFE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        AIRE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        APPL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        APRO: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        ARCHEO: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        AUTP: {
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
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        CADA: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        CANT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        COM: {
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
        CONTACT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        CONTIENT_IMAGE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        COOR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        COORM: {
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
        DATE: {
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
        DBOR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
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
        DENQ: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DEPL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
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
        DIMS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DLAB: {
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
        DMIS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
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
        DOSADRS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DOSS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DOSURL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DOSURLPDF: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DPRO: {
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
        EDIF: {
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
        ENER: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        ETAT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        ETUD: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        GENR: {
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
        HYDR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        IDAGR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        IMAGE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        IMG: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        INSEE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        INTE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        LBASE2: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        LIENS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        LIEU: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        LMDP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
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
        MEMOIRE: {
          properties: {
            ref: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256
                }
              }
            },
            url: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256
                }
              }
            }
          }
        },
        MFICH: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        MHPP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        MICR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        MOSA: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        NBOR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        OBS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        PAFF: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        PDEN: {
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
        PERS: {
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
        PINT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        PLAN: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        PLOC: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
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
        POP_DATE: {
          type: "long"
        },
        PPRO: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 8000
            }
          }
        },
        PRODUCTEUR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        PROT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        PSTA: {
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
        REFIM: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        REFM: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        REFO: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        REG: {
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
        REMA: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        REMP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        RENV: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
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
        RFPA: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        SCLE: {
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
        SCLX: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        SITE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        STAT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        TECH: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        THEM: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
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
        TOUT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        TYPO: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        VERT: {
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
        VISI: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        VOCA: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        WADRS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        WCOM: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        WEB: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        WRENV: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        ZONE: {
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
};
