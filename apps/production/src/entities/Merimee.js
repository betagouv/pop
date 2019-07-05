import Notice from "./Notice";
import validator from "validator";
import regions from "../services/regions";

export default class Merimee extends Notice {
  constructor(body) {
    super(body, "merimee");

    if (this.TICO) {
      this.TICO = this.stripHTML(this.TICO);
    }

    const notice = body;
    // Required properties.
    ["DOSS", "ETUD", "COPY", "TICO", "CONTACT", "REF"]
      .filter(prop => !notice[prop])
      .forEach(prop => this._warnings.push(`Le champ ${prop} ne doit pas être vide`));
    // If "existingProp" exists then "requiredProp" must not be empty.
    [["PROT", "DPRO"], ["COM", "WCOM"], ["ADRS", "WADRS"]]
      .filter(([existingProp, requiredProp]) => existingProp && !requiredProp)
      .forEach(([existingProp, requiredProp]) =>
        this._warnings.push(
          `Le champ ${requiredProp} ne doit pas être vide quand ${existingProp} est renseigné`
        )
      );
    // DPT must be 2 char or more.
    if (notice.DPT && notice.DPT.length < 2) {
      this._errors.push("Le champ ${prop} doit avoir une longueur de ${length} caractères minimum");
    }
    // INSEE must be 5 char or more.
    if (notice.INSEE && notice.INSEE.length < 5) {
      this._errors.push("Le champ ${prop} doit avoir une longueur de ${length} caractères minimum");
    }
    // INSEE & DPT must start with the same first 2 letters.
    if (notice.INSEE && notice.DPT && notice.INSEE.substring(0, 2) !== notice.DPT.substring(0, 2)) {
      this._errors.push("INSEE et DPT doivent commencer par les deux même lettres");
    }
    // REF must be an Alphanumeric.
    if (!validator.isAlphanumeric(notice.REF)) {
      this._warnings.push("Le champ REF doit être alphanumérique");
    }
    // DOSURL and DOSURLPDF must be valid URLs.
    ["DOSURL", "DOSURLPDF"]
      .filter(prop => notice[prop] && !validator.isURL(notice[prop]))
      .forEach(prop => this._warnings.push(`Le champ ${prop} doit être un lien valide`));
    // CONTACT must be an email.
    if (notice.CONTACT && !validator.isEmail(notice.CONTACT)) {
      this._warnings.push("Le champ CONTACT doit être un email valide");
    }
    // Region should exist.
    if (notice.REG && !regions.includes(notice.REG)) {
      this._warnings.push(`Le champ REG doit être une région valide : ${regions.join(", ")}`);
    }
  }
}
