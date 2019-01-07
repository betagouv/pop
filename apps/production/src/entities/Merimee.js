import Notice from "./Notice";

export default class Merimee extends Notice {
  constructor(body) {
    super(body, "merimee");

    if (this.TICO) {
      this.TICO = this.stripHTML(this.TICO);
    }
  }
}
