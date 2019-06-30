import Notice from "./Notice";

export default class Memoire extends Notice {
  constructor(body) {
    if (body.REF) {
      body.REF = String(body.REF).toUpperCase();
    }
    super(body, "memoire");
  }
}
