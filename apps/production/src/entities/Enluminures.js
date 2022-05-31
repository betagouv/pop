import Notice from "./Notice";

export default class Enluminures extends Notice {
  constructor(body) {
    super(body, "enluminures");
  }
}

Enluminures.convertLongNameToShort = function(str) {
  return str
    .substring(str.lastIndexOf("/") + 1)
    .replace(/_[a-zA-Z0-9]\./g, ".")
    .replace(/^.*[\\\/]/g, "")
    .replace(/[a-zA-Z0-9]*_/g, "")
    .toLowerCase();
};
