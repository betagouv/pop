import Mapping from "../services/mapping";
import Notice from "./Notice";
import validator from "validator";

export default class Joconde extends Notice {
  constructor(body) {
    super(body, "joconde");

    if (body.REFIM) {
      this.IMG = this.extractIMGNames(body.REFIM).map(e => `joconde/${this.REF}/${e}`);
    }

    if (body.LOCA) {
      const { LOCA, MANQUANT, MANQUANT_COM } = this.extractManquant(body.LOCA, body.MANQUANT, body.MANQUANT_COM);
      this.LOCA = body.LOCA = LOCA;
      this.MANQUANT = body.MANQUANT = MANQUANT;
      this.MANQUANT_COM = body.MANQUANT_COM = MANQUANT_COM;
    }
    
    // ADD Boring stuff in order to split text to check for the thesaurus
    const obj = {};
    obj["AUTR"] = /[,;]/g; 
    obj["DECV"] = /[(),;]/g;
    obj["DENO"] = /[(),;]/g;
    obj["DOMN"] = /[(),;]/g;
    obj["ECOL"] = /[(),;]/g;
    obj["EPOQ"] = /[(),;]/g;
    obj["GENE"] = /[(),;]/g;
    obj["INSC"] = /[(),;]/g;
    obj["LIEUX"] = /[(),;]/g;
    obj["LOCA"] = /[(),;]/g;
    obj["PEOC"] = /[(),;]/g;
    obj["PERI"] = /[(),;]/g;
    obj["PERU"] = /[(),;]/g;
    obj["REPR"] = /[(),;]/g;
    obj["SREP"] = /[(),;]/g;
    obj["TECH"] = /[(),;]/g;
    obj["UTIL"] = /[(),;]/g;
    obj["STAT"] = /[(),;]/g;
    obj["LOCA"] = /[(),;]/g;
    obj["DEPO"] = /[(),;]/g;

    for (let key in obj) {
      this._mapping[key].thesaurus_separator = obj[key];
    }
  }

  validate(body) {
    super.validate(body);
    //WWW doit contenir une liste d'urls valides
    const arr = body.WWW;
    if(arr){
      for(let i=0; i<arr.length; i++){
        if(arr[i] && !validator.isURL(arr[i])){
          this._warnings.push(`Le champ WWW doit être une URL valide`);
        }
      }
    }

    ["LVID"]
      .filter(prop => body[prop] && !validator.isURL(body[prop]))
      .forEach(prop => this._warnings.push(`Le champ ${prop} doit être une URL valide`));
  }

  removeElemenLoca = (loca, element) => {
    return loca.replace(new RegExp(element, 'i'), "");
  }

  /**
   * Liste des valeurs possibles pour le champ LOCA
   */
  LIST_MANQUANT = ["; manquantes", "; manquants",  "; manquante", "; manquant"];
  LIST_VOLE = ["; volées", "; volés", "; volée", "; volé", "; vole", "; volee"];
  LIST_DISPARU = ["; disparues", "; disparus", "; disparue", "; disparu"];
  LIST_PILLE = ["; pillées", "; pillés", "; pillée", "; pillé", "; pille", "; pillee"];
  LIST_PRESUME = ["; présumé détruit", "; presume detruit"];

  /**
   * 
   * @param { String } loca 
   * @param { String } manquant 
   * @param { String } manquantcom 
   * @returns 
   * 
   * Règles de détermination
   * Mantis 38684 - 44867
   * - si LOCA contient "manquant", valeur "manquant" va dans MANQUANT, champ MANQUANT_COM non impacté
   * - si LOCA contient "volé", valeur "volé" va dans MANQUANT, champ MANQUANT_COM non impacté
   * - si LOCA contient "disparu", ou "localisation inconnue", ou "pillé " ou "présumé détruit", champ MANQUANT prend la valeur "manquant" ET "disparu"ou "localisation inconnue", ou "pillé " ou "présumée détruit" va dans MANQUANT_COM
   * --> dans les 4 cas, LOCA est "vidé" de la valeur "manquant", "disparu", "volé","localisation inconnue", "pillé ", "présumé détruit".
   */
  extractManquant = function(loca, manquant, manquantcom) { 

    if (this.LIST_MANQUANT.some(e => loca.toLowerCase().indexOf(e) !== -1)) {
      let element = this.LIST_MANQUANT.find(e => loca.toLowerCase().indexOf(e) !== -1);
      return { LOCA: this.removeElemenLoca(loca, element), MANQUANT:["manquant"], MANQUANT_COM: manquantcom };
    }

    if (this.LIST_VOLE.some(e => loca.toLowerCase().indexOf(e) !== -1 )) {
      let element = this.LIST_VOLE.find(e => loca.toLowerCase().indexOf(e) !== -1);
      return { LOCA: this.removeElemenLoca(loca, element), MANQUANT:['volé'], MANQUANT_COM: manquantcom };
    }

    if (this.LIST_DISPARU.some(e => loca.toLowerCase().indexOf(e) !== -1)) {
      let element = this.LIST_DISPARU.find(e => loca.toLowerCase().indexOf(e) !== -1);
      return this.addManquantCom(loca, manquantcom, element, "disparu");
    }

    if(loca.toLowerCase().indexOf("; localisation inconnue") !== -1){
      return this.addManquantCom(loca, manquantcom, "; localisation inconnue", "localisation inconnue");
    }

    if (this.LIST_PILLE.some(e => loca.toLowerCase().indexOf(e) !== -1)) {
      let element = this.LIST_PILLE.find(e => loca.toLowerCase().indexOf(e) !== -1);
      return this.addManquantCom(loca, manquantcom, element, "pillé");
    }

    if (this.LIST_PRESUME.some(e => loca.toLowerCase().indexOf(e) !== -1)) {
      let element = this.LIST_PRESUME.find(e => loca.toLowerCase().indexOf(e) !== -1);
      return { LOCA: this.removeElemenLoca(loca, element), MANQUANT:["manquant"], MANQUANT_COM: "présumé détruit" };
    }

    if(manquant == ""){  
      manquant = [];
    } 
    
    return { LOCA: loca, MANQUANT: manquant, MANQUANT_COM: manquantcom };
  };

  addManquantCom = function(loca, manquantcom, element, addon){
    if(typeof manquantcom !== "undefined" && manquantcom !== "" && manquantcom !== " "){
      manquantcom = manquantcom + " ; " + addon;
    }else{
      manquantcom = addon ;
    }
    return { LOCA:this.removeElemenLoca(loca, element), MANQUANT:["manquant"], MANQUANT_COM: manquantcom };
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
