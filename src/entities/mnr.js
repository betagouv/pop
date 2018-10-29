import Notice from "./notice";

export default class MNR extends Notice {
  constructor(body) {
    super();
    this._type = "mnr";
    this.setProperty("REF", "String", (body.REF || "").trim(), {
      required: true
    });
    this.setProperty("TOUT", "String", body.TOUT);
    this.setProperty("AUTR", "Array", this.extractArray(body.AUTR));
    this.setProperty("PAUT", "String", body.PAUT);
    this.setProperty("ATTR", "String", body.ATTR);
    this.setProperty("ECOL", "String", body.ECOL);
    this.setProperty("TITR", "String", body.TITR);
    this.setProperty("ATIT", "String", body.ATIT);
    this.setProperty("PTIT", "String", body.PTIT);
    this.setProperty("DENO", "Array", this.extractArray(body.DENO), {
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T96"
    });
    this.setProperty("DESC", "String", body.DESC);
    this.setProperty("DOMN", "Array", this.extractArray(body.DOMN));
    this.setProperty("LOCA", "String", body.LOCA);
    this.setProperty("INSC", "String", body.INSC);
    this.setProperty("MARQ", "String", body.MARQ);
    this.setProperty("OBSE", "String", body.OBSE);
    this.setProperty("ETAT", "String", body.ETAT);
    this.setProperty("GENE", "String", body.GENE);
    this.setProperty("PROV", "String", body.PROV);
    this.setProperty("HIST", "String", body.HIST);
    this.setProperty("HIST2", "String", body.HIST2);
    this.setProperty("HIST3", "String", body.HIST3);
    this.setProperty("HIST4", "String", body.HIST4);
    this.setProperty("HIST5", "String", body.HIST5);
    this.setProperty("HIST6", "String", body.HIST6);
    this.setProperty("SCLE", "Array", this.extractArray(body.SCLE));
    this.setProperty("STYL", "String", body.STYL);
    this.setProperty("MILL", "String", body.MILL);
    this.setProperty("TECH", "Array", this.extractArray(body.TECH));
    this.setProperty("DIMS", "Array", this.extractArray(body.DIMS));
    this.setProperty("VIDEO", "Array", this.extractArray(body.VIDEO));
    this.setProperty("INV", "String", body.INV);
    this.setProperty("EXPO", "String", body.EXPO);
    this.setProperty("BIBL", "String", body.BIBL);
    this.setProperty("AATT", "String", body.AATT);
    this.setProperty("AUTI", "String", body.AUTI);
    this.setProperty("CATE", "String", body.CATE);
    this.setProperty("NOTE", "String", body.NOTE);
    this.setProperty("REDC", "Array", this.extractArray(body.REDC));
    this.setProperty("DREP", "String", body.DREP);
    this.setProperty("PREP", "String", body.PREP);
    this.setProperty("REPR", "String", body.REPR);
    this.setProperty("SREP", "String", body.SREP);
    this.setProperty("REFIM", "String", body.REFIM);
    this.setProperty("DMAJ", "String", body.DMAJ, { generated: true });
    this.setProperty("NUMS", "String", body.NUMS);
    this.setProperty("SUITE", "String", body.SUITE);
    this.setProperty("COMM", "String", body.COMM);
    this.setProperty("NOTE2", "String", body.NOTE2);
    this.setProperty("RESUME", "String", body.RESUME);
    this.setProperty("PHOT", "String", body.PHOT);
    this.setProperty("PRODUCTEUR", "String", body.PRODUCTEUR);

    //Check required fields
    for (var property in this) {
      if (
        this.hasOwnProperty(property) &&
        property.indexOf("_") !== 0 &&
        typeof this[property] === "object"
      ) {
        if (this[property].required && !this[property].value) {
          this._errors.push(`Le champ ${property} ne doit pas être vide`);
        }
      }
    }
  }
}
