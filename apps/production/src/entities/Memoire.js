import Notice from "./Notice";
import validator from "validator";

export default class Memoire extends Notice {
  constructor(body) {
    if (body.REF) {
      body.REF = String(body.REF).toUpperCase();
    }
    super(body, "memoire");

    // Every controls errors are *warnings* for now.
    // Required properties.
    ["CONTACT", "TYPDOC", "DOM", "LOCA", "LEG", "COPY", "REF", "IDPROD"]
      .filter(prop => !this[prop])
      .forEach(prop => this._warnings.push(`Le champ ${prop} ne doit pas être vide`));
    // LBASE must be 10 chars and starts with EA, PA, etc.

    if (this.LBASE) {
      // LBASE must be 10 chars.
      if (this.LBASE.filter(lb => lb.length !== 10).length > 0) {
        this._warnings.push("Le champ LBASE doit faire 10 caractères");
      }
      // LBASE must start with EA, PA, etc.
      if (
        this.LBASE.map(lb => lb.substring(0, 2)).filter(
          prefix => !["EA", "PA", "IA", "IM", "PM", "EM"].includes(prefix)
        ).length > 0
      ) {
        this._warnings.push(
          `Le champ LBASE doit commencer par : "EA", "PA", "IA", "IM", "PM" ou "EM"`
        );
      }
    }
    // INSEE must be 5 char or more.
    if (this.INSEE && this.INSEE.length < 5) {
      this._warnings.push("Le champ INSEE doit faire 5 caractères minimum");
    }
    // REF must only be alphanum + "_"
    if (this.REF && !this.REF.match(/^[A-Z0-9_]+$/)) {
      this._warnings.push("Le champ REF doit être alphanumérique");
    }
    // CONTACT must be an email.
    if (this.CONTACT && !validator.isEmail(this.CONTACT)) {
      this._warnings.push("CONTACT_INVALID_EMAIL");
    }
    // NUMTI and NUMP must be valid Alphanumeric.
    ["NUMTI", "NUMP"]
      .filter(prop => this[prop] && !validator.isAlphanumeric(this[prop]))
      .forEach(prop => this._warnings.push(`${prop}_INVALID_ALNUM`));
  }
}
