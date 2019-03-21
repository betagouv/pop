import Notice from "./Notice";

export default class Memoire extends Notice {
  constructor(body) {
    if (body.REF) {
      body.REF = body.REF.toUpperCase();
    }
    super(body, "memoire");
  }

  /*
    pour inventaire gertrude, les images sont dans NOMI ou NUMI
    Pour MAP, elles sont dans NOMSN OK
    Pour MH, elles sont dans REFIMG 
    Et pour inventaire renable, elles sont dans FNU2 

    Cette complexité a été bougée au niveau de chanque import

    Cette migration est effectuée au niveau de chaque import
*/
}
