import Notice from "./Notice";

export default class Memoire extends Notice {
  constructor(body) {
    super(body, "memoire");
    this.IMG = this.extractImage(body);
  }

  extractImage(body) {
    let name = body.IMG || body.NOMSN || "";
    if (name) {
      return `memoire/${body.REF}/${name}`;
    }
    // On retourne null car on ne veut pas overwrite les données avec ""
    return null;
  }
}
