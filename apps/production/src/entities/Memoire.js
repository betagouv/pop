import Notice from "./Notice";
import validator from "validator";

export default class Memoire extends Notice {
  constructor(body) {
    if (body.REF) {
      body.REF = String(body.REF).toUpperCase();
    }
    super(body, "memoire");

    // Every controls errors are *warnings* for now.
    const notice = body;
    // Required properties.
    ["CONTACT", "TYPDOC", "DOM", "LOCA", "LEG", "COPY", "REF", "IDPROD"]
      .filter(prop => !notice[prop])
      .forEach(prop => this._warnings.push(`Le champ ${prop} ne doit pas être vide`));
    // LBASE must be 11 chars and starts with EA, PA, etc.
    if (notice.LBASE) {
      // LBASE must be 11 chars.
      if (notice.LBASE.filter(lb => lb.length !== 11).length > 0) {
        this._warnings.push("Le champ LBASE doit faire 11 caractères");
      }
      // LBASE must start with EA, PA, etc.
      if (
        notice.LBASE.map(lb => lb.substring(0, 2)).filter(
          prefix => !["EA", "PA", "IA", "IM", "PM", "EM"].includes(prefix)
        ).length > 0
      ) {
        this._warnings.push(
          `Le champ LBASE doit commencer par : "EA", "PA", "IA", "IM", "PM" ou "EM"`
        );
      }
    }
    // INSEE must be 5 char or more.
    if (notice.INSEE && notice.INSEE.length < 5) {
      this._warnings.push("Le champ INSEE doit faire 5 caractères minimum");
    }
    // REF must only be alphanum + "_"
    if (notice.REF && !notice.REF.match(/^[A-Z0-9_]$/)) {
      this._warnings.push("Le champ REF doit être alphanumérique");
    }
    // CONTACT must be an email.
    if (notice.CONTACT && !validator.isEmail(notice.CONTACT)) {
      this._warnings.push("CONTACT_INVALID_EMAIL");
    }
    // NUMTI and NUMP must be valid Alphanumeric.
    ["NUMTI", "NUMP"]
      .filter(prop => notice[prop] && !validator.isAlphanumeric(notice[prop]))
      .forEach(prop => this._warnings.push(`${prop}_INVALID_ALNUM`));
  }
}
