import Mapping from "../services/mapping";
import Notice from "./Notice";

export default class Joconde extends Notice {
  constructor(body) {
    super(body, "joconde");

    if (body.REFIM) {
      this.IMG = this.extractIMGNames(body.REFIM).map(e => `joconde/${this.REF}/${e}`);
    }

    if (body.LOCA) {
      const { MANQUANT, MANQUANT_COM } = this.extractManquant(body.LOCA);
      this.MANQUANT = MANQUANT;
      this.MANQUANT_COM = MANQUANT_COM;
    }

    //ADD Boring stuff in order to split text to check for the thesaurus
    const obj = {};
    obj["AUTR"] = /[(,);#]/g;
    obj["DECV"] = /[(,);#]/g;
    obj["DENO"] = /[(,);#]/g;
    obj["DOMN"] = /[(,);#]/g;
    obj["ECOL"] = /[(,);#]/g;
    obj["EPOQ"] = /[(,);#]/g;
    obj["GENE"] = /[(,);#]/g;
    obj["INSC"] = /[(,);#]/g;
    obj["LIEUX"] = /[(,);#]/g;
    obj["LOCA"] = /[(,);#]/g;
    obj["PEOC"] = /[(,);#]/g;
    obj["PERI"] = /[(,);#]/g;
    obj["PERU"] = /[(,);#]/g;
    obj["REPR"] = /[(,);#]/g;
    obj["SREP"] = /[(,);#]/g;
    obj["TECH"] = /[(,);#]/g;
    obj["UTIL"] = /[(,);#]/g;

    for (let key in obj) {
      this._mapping[key].thesaurus_separator = obj[key];
    }
  }

  extractManquant = function(str) {
    const MANQUANT = "manquant";

    if (["détruit", "détruite", "detruit", "detruite"].some(e => str.indexOf(e) !== -1)) {
      return { MANQUANT: "", MANQUANT_COM: "détruit" };
    }
    if (["localisation inconnue"].some(e => str.indexOf(e) !== -1)) {
      return { MANQUANT, MANQUANT_COM: "" };
    }
    if (["disparu", "disparue", "disparus"].some(e => str.indexOf(e) !== -1)) {
      return { MANQUANT, MANQUANT_COM: "disparu" };
    }
    if (["pillé", "pillée"].some(e => str.indexOf(e) !== -1)) {
      return { MANQUANT, MANQUANT_COM: "pillé" };
    }
    if (["volé", "volée", "volés", "volées"].some(e => str.indexOf(e) !== -1)) {
      return { MANQUANT, MANQUANT_COM: "volé" };
    }
    if (["manquant", "manquants", "manquante", "manquantes"].some(e => str.indexOf(e) !== -1)) {
      return { MANQUANT, MANQUANT_COM: "" };
    }
    return { MANQUANT: "", MANQUANT_COM: "" };
  };

  extractIMGNames = function(str) {
    if (!str) {
      return [];
    }
    let tempImages = str.split(";");
    return tempImages.map(e => {
      let name = e.split(",")[0];
      return Joconde.convertLongNameToShort(name);
    });
  };
}

Joconde.has = function(key) {
  return Mapping.joconde[key] !== undefined;
};

Joconde.convertLongNameToShort = function(str) {
  return str
    .substring(str.lastIndexOf("/") + 1)
    .replace(/_[a-zA-Z0-9]\./g, ".")
    .replace(/^.*[\\\/]/g, "")
    .replace(/[a-zA-Z0-9]*_/g, "")
    .toLowerCase();
};
