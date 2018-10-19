module.exports = {
  settings: {
    analysis: {
      normalizer: {
        my_normalizer: {
          type: "custom",
          char_filter: [],
          filter: ["lowercase", "asciifolding"]
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
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        APPL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        APTN: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        ATTR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        AUTR: {
          type: "text",
          analyzer: "french",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer",
              ignore_above: 256
            }
          }
        },
        BASE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        BIBL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        COMM: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        CONTACT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        CONTIENT_IMAGE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        COOR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        COPY: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        DACQ: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        DATA: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        DATION: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        DDPT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        DECV: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        DENO: {
          type: "text",
          analyzer: "french",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer",
              ignore_above: 256
            }
          }
        },
        DEPO: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        DESC: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        DESY: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        DIFFU: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        DIMS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        DMAJ: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        DMIS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        DOMN: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        DREP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        ECOL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        EPOQ: {
          type: "text",
          analyzer: "french",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer",
              ignore_above: 256
            }
          }
        },
        ETAT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        EXPO: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        GENE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        GEOHI: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        HIST: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        IMAGE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        IMG: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        INSC: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        INV: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        LABEL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        LABO: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        LARC: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        LIEUX: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        LOCA: {
          type: "text",
          analyzer: "french",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer",
              ignore_above: 256
            }
          }
        },
        LOCA2: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        LOCA3: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        LVID: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        MILL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        MILU: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        MOSA: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        MSGCOM: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        MUSEO: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        NSDA: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        ONOM: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        PAUT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        PDAT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        PDEC: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        PEOC: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        PERI: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        PERU: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        PHOT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        PINS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        PLIEUX: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        PREP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        PRODUCTEUR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        PUTI: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        RANG: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        REDA: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        REF: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        REFIM: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        REFMIS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        REPR: {
          type: "text",
          analyzer: "french",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer",
              ignore_above: 256
            }
          }
        },
        RETIF: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        SREP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        STAT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        TECH: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        TICO: {
          type: "text",
          analyzer: "french"
        },
        TITR: {
          type: "text",
          analyzer: "french"
        },
        TOUT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        UTIL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        VIDEO: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        },
        WWW: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "my_normalizer"
            }
          }
        }
      }
    }
  }
};
