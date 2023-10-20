import Notice from "./Notice";
import validator from "validator";
import API from "../services/api";
import regions from "../services/regions";

let foreignRegion = false;

export default class Memoire extends Notice {
  constructor(body) {
    if (body.REF) {
      body.REF = String(body.REF).toUpperCase();
    }
    // Condition pour le contrôle de la région pour l'import MAP
    foreignRegion = body._foreign_region || false;
    super(body, "memoire");
  }
  async validate(body) {
    super.validate(body);
    // Every controls errors are *warnings* for now.
    // Required properties.
    const listPrefix = await API.getPrefixesFromProducteurs(["autor", "palissy", "merimee"]);

    ["CONTACT", "TYPDOC", "DOM", "LOCA", "LEG", "COPY", "REF", "IDPROD"]
      .filter(prop => !body[prop])
      .forEach(prop => this._warnings.push(`Le champ ${prop} ne doit pas être vide`));
    // LBASE must be 10 chars and starts with EA, PA, etc.

    if (body.LBASE) {
      // LBASE must be 10 chars.
      if (body.LBASE.filter(lb => lb.length !== 10).length > 0) {
        this._warnings.push("Le champ LBASE doit faire 10 caractères");
      }
      // LBASE must start with EA, PA, etc.
      if (
        body.LBASE.map(lb => lb.substring(0, 2)).filter(
          prefix => !listPrefix.listePrefix.includes(prefix)
        ).length > 0
      ) {
        this._warnings.push(
          `Le champ LBASE doit commencer par : ` + listPrefix.listePrefix.reduce((result, prefix) => result == null ? prefix : result + ", " + prefix)
        );
      }
    }
    
    if(body.INSEE && body.INSEE.length > 0){
      body.INSEE.forEach((val) => {
        // INSEE must be 5 char or more.
        if (val && val.length < 5) {
          this._errors.push(`Le champ ${prop} doit avoir une longueur de ${length} caractères minimum`);
        }
      });
    }

    // REF must only be alphanum + "_"
    if (body.REF && !body.REF.match(/^[A-Z0-9_]+$/)) {
      this._warnings.push("Le champ REF doit être alphanumérique");
    }
    // CONTACT must be an email.
    if (body.CONTACT && !validator.isEmail(body.CONTACT)) {
      this._warnings.push("CONTACT_INVALID_EMAIL");
    }
    // NUMTI and NUMP must be valid Alphanumeric.
    ["NUMTI", "NUMP"]
      .filter(prop => body[prop] && !validator.isAlphanumeric(body[prop]))
      .forEach(prop => this._warnings.push(`${prop}_INVALID_ALNUM`));

    // M45867 - Ajout condition sur le contrôle des régions, si le champ PAYS contient uniquement france la vérification est effectué sinon pas de vérification
    // Le controle est présent pour les producteurs MPP
    let checkRegion = true;
    // Si le producteur existe et égale MPP (cas d'une notice existante)
    // OU les champs PAYS et REG sont renseignés pour une nouvelle notice
    if(body.PRODUCTEUR && "MPP" == body.PRODUCTEUR || foreignRegion){
      checkRegion = Array.isArray(body.PAYS) && body.PAYS.length < 2 && String(body.PAYS[0]).toLowerCase() === "france";
    }

    // Region should exist.
    // M45079 - Ajout vérification sur le champ REG
    if (checkRegion && body.REG && body.REG.length > 0) {
      let arrayReg = Array.isArray(body.REG) ? body.REG : body.REG.split(";"); 
      arrayReg.forEach((val) => {
        if(!regions.includes(val)){
          this._warnings.push(`Le champ REG doit être une région valide : ${regions.join(", ")}`);
        }
      });
    }
  }
}
