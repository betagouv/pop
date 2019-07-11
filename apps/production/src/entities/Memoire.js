import Notice from "./Notice";
import validator from "validator";

export default class Memoire extends Notice {
  constructor(body) {
    if (body.REF) {
      body.REF = String(body.REF).toUpperCase();
    }
    super(body, "memoire");
  }
  validate(body) {
    // Every controls errors are *warnings* for now.
    // Required properties.
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
          prefix => !["EA", "PA", "IA", "IM", "PM", "EM"].includes(prefix)
        ).length > 0
      ) {
        this._warnings.push(
          `Le champ LBASE doit commencer par : "EA", "PA", "IA", "IM", "PM" ou "EM"`
        );
      }
    }
    // INSEE must be 5 char or more.
    if (body.INSEE && body.INSEE.length < 5) {
      this._warnings.push("Le champ INSEE doit faire 5 caractères minimum");
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

    super.validate(body);
  }
}
