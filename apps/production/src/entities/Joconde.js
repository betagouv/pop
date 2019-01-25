import { Mapping } from "pop-shared";
import Notice from "./Notice";

export default class Joconde extends Notice {
  constructor(body) {
    super(body, "joconde");

    if (body.REFIM) {
      this.IMG = this.extractIMGNames(body.REFIM).map(e => `joconde/${this.REF}/${e}`);
    }

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

    //REFMIS ?
  }

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
