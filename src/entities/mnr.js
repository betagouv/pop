import Notice from "./notice";

export default class MNR extends Notice {
  constructor(body) {
    super();
    this._type = "mnr";
    this.REF = {
      type: "String",
      value: (body.REF || "").trim(),
      required: true
    };
    this.TOUT = { type: "String", value: body.TOUT || "" };
    this.AUTR = { type: "Array", value: this.extractArray(body.AUTR) };
    this.PAUT = { type: "String", value: body.PAUT || "" };
    this.ATTR = { type: "String", value: body.ATTR || "" };
    this.ECOL = { type: "String", value: body.ECOL || "" };
    this.TITR = { type: "String", value: body.TITR || "" };
    this.ATIT = { type: "String", value: body.ATIT || "" };
    this.PTIT = { type: "String", value: body.PTIT || "" };
    this.DENO = {
      type: "Array",
      value: this.extractArray(body.DENO),
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T96"
    };
    this.DESC = { type: "String", value: body.DESC || "" };
    this.DOMN = { type: "Array", value: this.extractArray(body.DOMN) };
    this.LOCA = { type: "String", value: body.LOCA || "" };
    this.INSC = { type: "String", value: body.INSC || "" };
    this.MARQ = { type: "String", value: body.MARQ || "" };
    this.OBSE = { type: "String", value: body.OBSE || "" };
    this.ETAT = { type: "String", value: body.ETAT || "" };
    this.GENE = { type: "String", value: body.GENE || "" };
    this.PROV = { type: "String", value: body.PROV || "" };
    this.HIST = { type: "String", value: body.HIST || "" };
    this.HIST2 = { type: "String", value: body.HIST2 || "" };
    this.HIST3 = { type: "String", value: body.HIST3 || "" };
    this.HIST4 = { type: "String", value: body.HIST4 || "" };
    this.HIST5 = { type: "String", value: body.HIST5 || "" };
    this.HIST6 = { type: "String", value: body.HIST6 || "" };
    this.SCLE = { type: "Array", value: this.extractArray(body.SCLE) };
    this.STYL = { type: "String", value: body.STYL || "" };
    this.MILL = { type: "String", value: body.MILL || "" };
    this.TECH = { type: "Array", value: this.extractArray(body.TECH) };
    this.DIMS = { type: "Array", value: this.extractArray(body.DIMS) };
    this.VIDEO = { type: "Array", value: this.extractArray(body.VIDEO) };
    this.INV = { type: "String", value: body.INV || "" };
    this.EXPO = { type: "String", value: body.EXPO || "" };
    this.BIBL = { type: "String", value: body.BIBL || "" };
    this.AATT = { type: "String", value: body.AATT || "" };
    this.AUTI = { type: "String", value: body.AUTI || "" };
    this.CATE = { type: "String", value: body.CATE || "" };
    this.NOTE = { type: "String", value: body.NOTE || "" };
    this.REDC = { type: "Array", value: this.extractArray(body.REDC) };
    this.DREP = { type: "String", value: body.DREP || "" };
    this.PREP = { type: "String", value: body.PREP || "" };
    this.REPR = { type: "String", value: body.REPR || "" };
    this.SREP = { type: "String", value: body.SREP || "" };
    this.REFIM = { type: "String", value: body.REFIM || "" };
    this.DMAJ = { type: "String", value: body.DMAJ || "", generated: true };
    this.NUMS = { type: "String", value: body.NUMS || "" };
    this.SUITE = { type: "String", value: body.SUITE || "" };
    this.COMM = { type: "String", value: body.COMM || "" };
    this.NOTE2 = { type: "String", value: body.NOTE2 || "" };
    this.RESUME = { type: "String", value: body.RESUME || "" };
    this.PHOT = { type: "String", value: body.PHOT || "" };
    this.PRODUCTEUR = { type: "String", value: body.PRODUCTEUR || "" };
    this.CONTIENT_IMAGE = {
      type: "String",
      value: this.VIDEO.value.length > 0 ? "oui" : "non"
    };

    //Check required fields
    for (var property in this) {
      if (
        this.hasOwnProperty(property) &&
        property.indexOf("_") !== 0 &&
        typeof this[property] === "object"
      ) {
        if (this[property].required && !this[property].value) {
          this._errors.push(`Le champs ${property} ne doit pas être vide`);
        }
      }
    }
  }
}
