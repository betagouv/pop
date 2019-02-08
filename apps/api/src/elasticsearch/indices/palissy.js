module.exports = {
  mappings: {
    palissy: {
      properties: {
        ACQU: {
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
        ADRS2: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        AFIG: {
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
        ATEL: {
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
          analyzer: "french",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        AUTR: {
          type: "text",
          analyzer: "french",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
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
        BIBL: {
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
        CATE: {
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
          analyzer: "french",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        COM2: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
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
          analyzer: "french",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DBOR: {
          type: "text",
          analyzer: "french",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DENO: {
          type: "text",
          analyzer: "french",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
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
              ignore_above: 256
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
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
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
        DOSURLP: {
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
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        EDIF2: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        EMPL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        EMPL2: {
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
        EXEC: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        EXPO: {
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
        IMPL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        INSC: {
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
        INSEE2: {
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
        JDAT: {
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
          analyzer: "french",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        MATR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        MEMOIRE: {
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
        NART: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        NINV: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        NOMS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        NUMA: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        NUMP: {
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
        ORIG: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        PAPP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        PARN: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        PART: {
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
          analyzer: "french",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        PDIM: {
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
          analyzer: "french",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        PETA: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        PHOTO: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        PINS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
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
        PLOC: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        PPRO: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        PREP: {
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
        REF: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        REFA: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        REFE: {
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
        REFP: {
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
          analyzer: "french",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        RENP: {
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
          analyzer: "french",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        SCLD: {
          type: "text",
          analyzer: "french",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        SCLE: {
          type: "text",
          analyzer: "french",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
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
        SOUR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        STAD: {
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
        STRU: {
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
          analyzer: "french",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        TITR: {
          type: "text",
          analyzer: "french",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
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
        VIDEO: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        VOLS: {
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
