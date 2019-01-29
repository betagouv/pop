import Notice from "./Notice";

export default class Memoire extends Notice {
  constructor(body) {
    super(body, "memoire");
    this.IMG = this.extractImage(body);
  }

  extractImage(body) {
    let name = body.IMG || body.NOMSN || "";
    name = convertLongNameToShort(name)
    if (name) {
      return `memoire/${body.REF}/${name}`;
    }
    // On retourne null car on ne veut pas overwrite les données avec ""
    return null;
  }
}

function convertLongNameToShort(str) {
  return str
    .substring(str.lastIndexOf("/") + 1)
    .replace(/_[a-zA-Z0-9]\./g, ".")
    .replace(/^.*[\\\/]/g, "")
    .replace(/[a-zA-Z0-9]*_/g, "")
    .toLowerCase();
}
