import Notice from "./Notice";
import validator from "validator";
import regions from "../services/regions";

export default class Merimee extends Notice {
  constructor(body) {
    super(body, "merimee");
    if (this.TICO) {
      this.TICO = this.stripHTML(this.TICO);
    }
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
    // DPT must be 2 char or more.
    if (body.DPT && body.DPT.length < 2) {
      this._errors.push("Le champ ${prop} doit avoir une longueur de ${length} caractères minimum");
    }
    // INSEE must be 5 char or more.
    if (body.INSEE && body.INSEE.length < 5) {
      this._errors.push("Le champ ${prop} doit avoir une longueur de ${length} caractères minimum");
    }
    // INSEE & DPT must start with the same first 2 letters.
    if (body.INSEE && body.DPT && body.INSEE.substring(0, 2) !== body.DPT.substring(0, 2)) {
      this._errors.push("INSEE et DPT doivent commencer par les deux même lettres");
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
    if (body.REG && !regions.includes(body.REG)) {
      this._warnings.push(`Le champ REG doit être une région valide : ${regions.join(", ")}`);
    }
  }
}
