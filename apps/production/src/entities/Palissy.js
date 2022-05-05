import Notice from "./Notice";
import regions from "../services/regions";
import validator from "validator";

export default class Palissy extends Notice {
  constructor(body) { console.log(body.DPT)
    super(body, "palissy");
  }
  validate(body) {
    super.validate(body);
    
    // Required properties.
    ["DOSS", "ETUD", "COPY", "TICO", "CONTACT", "REF"]
      .filter(prop => !body[prop])
      .forEach(prop => this._warnings.push(`Le champ ${prop} ne doit pas être vide`));
    // If "existingProp" exists then "requiredProp" must not be empty.
    [["PROT", "DPRO"], ["COM", "WCOM"], ["ADRS", "WADRS"]]
      .filter(([existingProp, requiredProp]) => body[existingProp] && !body[requiredProp])
      .forEach(([existingProp, requiredProp]) =>
        this._warnings.push(
          `Le champ ${requiredProp} ne doit pas être vide quand ${existingProp} est renseigné`
        )
      );
   
    if(body.DPT && body.DPT.length > 0){
      let arrayDpt = Array.isArray(body.DPT) ? body.DPT : body.DPT.split(";"); 
      arrayDpt.forEach((val) => {
        // DPT must be 2 char or more.
        if (val && val.length < 2) {
          this._errors.push(`Le champ DPT doit avoir une longueur de 2 caractères minimum`);
        }
      });
    }

    if(body.INSEE && body.INSEE.length > 0){
      let arrayInsee = Array.isArray(body.INSEE) ? body.INSEE : body.INSEE.split(";"); 
      arrayInsee.forEach((val) => {
        // INSEE must be 5 char or more.
        if (val && val.length < 5) {
          this._errors.push(`Le champ INSEE doit avoir une longueur de 5 caractères minimum`);
        }

        let arrayDpt = Array.isArray(body.DPT) ? body.DPT : body.DPT.split(";"); 

        if(body.DPT && body.DPT.length > 0){
          // INSEE & DPT must start with the same first 2 letters or 3 letters.
          if ( val && !body.DPT.includes(val.substring(0, 2)) && !body.DPT.includes(val.substring(0, 3)) ){
            this._errors.push("INSEE et DPT doivent commencer par les deux même lettres");
          }
        }
      });
    }

    // REF must be an Alphanumeric.
    if (!validator.isAlphanumeric(body.REF)) {
      this._warnings.push("Le champ REF doit être alphanumérique");
    }
    // REF max length should be 10 characters.
    if (body.REF && body.REF.length > 10) {
      this._errors.push("La longueur du champ REF ne doit pas dépasser 10 caractères");
    }
    // DOSURL and DOSURLPDF must be valid URLs.
    ["DOSURL", "DOSURLPDF"]
      .filter(prop => body[prop] && !validator.isURL(body[prop]))
      .forEach(prop => this._warnings.push(`Le champ ${prop} doit être un lien valide`));
    // CONTACT must be an email.
    if (body.CONTACT && !validator.isEmail(body.CONTACT)) {
      this._warnings.push("Le champ CONTACT doit être un email valide");
    }
    // Region should exist.
    if (body.REG && body.REG.length > 0) {
      let arrayReg = Array.isArray(body.REG) ? body.REG : body.REG.split(";"); 
      arrayReg.forEach((val) => {
        if(!regions.includes(val)){
          this._warnings.push(`Le champ REG doit être une région valide : ${regions.join(", ")}`);
        }
      })
    }
  }
}
