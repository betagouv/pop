import Notice from "./Notice";
import regions from "../services/regions";
import validator from "validator";

export default class Palissy extends Notice {
  constructor(body) {
    super(body, "palissy");

    // Required properties.
    ["DOSS", "ETUD", "COPY", "TICO", "CONTACT", "REF"]
      .filter(prop => !this[prop])
      .forEach(prop => this._warnings.push(`Le champ ${prop} ne doit pas être vide`));
    // If "existingProp" exists then "requiredProp" must not be empty.
    [["PROT", "DPRO"], ["COM", "WCOM"], ["ADRS", "WADRS"]]
      .filter(([existingProp, requiredProp]) => this[existingProp] && !this[requiredProp])
      .forEach(([existingProp, requiredProp]) =>
        this._warnings.push(
          `Le champ ${requiredProp} ne doit pas être vide quand ${existingProp} est renseigné`
        )
      );
    // DPT must be 2 char or more.
    if (this.DPT && this.DPT.length < 2) {
      this._errors.push("Le champ ${prop} doit avoir une longueur de ${length} caractères minimum");
    }
    // INSEE must be 5 char or more.
    if (this.INSEE && this.INSEE.length < 5) {
      this._errors.push("Le champ ${prop} doit avoir une longueur de ${length} caractères minimum");
    }
    // INSEE & DPT must start with the same first 2 letters.
    if (this.INSEE && this.DPT && this.INSEE.substring(0, 2) !== this.DPT.substring(0, 2)) {
      this._errors.push("INSEE et DPT doivent commencer par les deux même lettres");
    }
    // REF must be an Alphanumeric.
    if (!validator.isAlphanumeric(this.REF)) {
      this._warnings.push("Le champ REF doit être alphanumérique");
    }
    // DOSURL and DOSURLPDF must be valid URLs.
    ["DOSURL", "DOSURLPDF"]
      .filter(prop => this[prop] && !validator.isURL(this[prop]))
      .forEach(prop => this._warnings.push(`Le champ ${prop} doit être un lien valide`));
    // CONTACT must be an email.
    if (this.CONTACT && !validator.isEmail(this.CONTACT)) {
      this._warnings.push("Le champ CONTACT doit être un email valide");
    }
    // Region should exist.
    if (this.REG && !regions.includes(this.REG)) {
      this._warnings.push(`Le champ REG doit être une région valide : ${regions.join(", ")}`);
    }
  }
}
