import Notice from "./notice";

export default class Palissy extends Notice {
  constructor(body) {
    super();
    this._type = "palissy";

    this.REF = {
      type: "String",
      value: (body.REF || "").trim(),
      required: true
    };
    // PRODUCTEUR= { type: String, value: body.DBOR || '' };
    // CONTIENT_IMAGE= { type: String, value: body.DBOR || '' };
    this.VIDEO = { type: "String", value: body.VIDEO || "" };
    this.CONTACT = { type: "String", value: body.CONTACT || "" };
    this.ACQU = { type: "String", value: body.ACQU || "" };
    this.ADRS = { type: "String", value: body.ADRS || "" };
    this.ADRS2 = { type: "String", value: body.ADRS2 || "" };
    this.AFIG = { type: "Array", value: this.extractArray(body.AFIG) };
    this.AIRE = { type: "String", value: body.AIRE || "" };
    this.APPL = { type: "String", value: body.APPL || "" };
    this.ATEL = { type: "String", value: body.ATEL || "" };
    this.AUTP = { type: "String", value: body.AUTP || "" };
    this.AUTR = { type: "Array", value: this.extractArray(body.AUTR) };
    this.BIBL = { type: "String", value: body.BIBL || "" };
    this.CANT = { type: "String", value: body.CANT || "" };
    this.CATE = { type: "Array", value: this.extractArray(body.CATE) };
    this.COM = { type: "String", value: body.COM || "" };
    this.COM2 = { type: "String", value: body.COM2 || "" };
    this.COOR = { type: "String", value: body.COOR || "" };
    this.COORM = { type: "String", value: body.COORM || "" };
    this.COPY = { type: "String", value: body.COPY || "" };
    this.DATE = { type: "Array", value: this.extractArray(body.DATE) };
    this.DBOR = { type: "Array", value: this.extractArray(body.DBOR) };
    this.DENO = {
      type: "Array",
      value: this.extractArray(body.DENO),
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T69"
    };
    this.DENQ = { type: "Array", value: this.extractArray(body.DENQ) };
    this.DEPL = { type: "String", value: body.DEPL || "" };
    this.DESC = { type: "String", value: body.DESC || "" };
    this.DIMS = { type: "String", value: body.DIMS || "" };
    this.DMAJ = { type: "String", value: body.DMAJ || "", generated: true };
    this.DMIS = { type: "String", value: body.DMIS || "", generated: true };
    this.DOMN = { type: "String", value: body.DOMN || "" };
    this.DOSADRS = { type: "String", value: body.DOSADRS || "" };
    this.DOSS = { type: "Array", value: this.extractArray(body.DOSS) };
    this.DOSURL = { type: "String", value: body.DOSURL || "" };
    this.DOSURLP = { type: "String", value: body.DOSURLP || "" };
    this.DPRO = { type: "String", value: body.DPRO || "" };
    this.DPT = { type: "String", value: body.DPT || "" };
    this.EDIF = { type: "String", value: body.EDIF || "" };
    this.EDIF2 = { type: "String", value: body.EDIF2 || "" };
    this.EMPL = { type: "String", value: body.EMPL || "" };
    this.EMPL2 = { type: "String", value: body.EMPL2 || "" };
    this.ETAT = { type: "Array", value: this.extractArray(body.ETAT) };
    this.ETUD = { type: "String", value: body.ETUD || "" };
    this.EXEC = { type: "String", value: body.EXEC || "" };
    this.EXPO = { type: "String", value: body.EXPO || "" };
    this.HIST = { type: "String", value: body.HIST || "" };
    this.IDAGR = { type: "Array", value: this.extractArray(body.IDAGR) };
    this.IMAGE = { type: "String", value: body.IMAGE || "" };
    this.IMG = { type: "String", value: body.IMG || "" };
    this.IMPL = {
      type: "String",
      value: body.IMPL || "",
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T12"
    };
    this.INSC = { type: "Array", value: this.extractArray(body.INSC) };
    this.INSEE = { type: "String", value: this.extractArray(body.INSEE) };
    this.INSEE2 = { type: "String", value: body.INSEE2 || "" };
    this.INTE = {
      type: "String",
      value: body.INTE || "",
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T33"
    };
    this.JDAT = { type: "Array", value: this.extractArray(body.JDAT) };
    this.LBASE2 = { type: "String", value: body.LBASE2 || "" };
    this.LIENS = { type: "Array", value: this.extractArray(body.LIENS) };
    this.LIEU = { type: "String", value: body.LIEU || "" };
    this.LMDP = { type: "String", value: body.LMDP || "" };
    this.LOCA = { type: "String", value: body.LOCA || "" };
    this.MATR = { type: "Array", value: this.extractArray(body.MATR) };
    this.MFICH = { type: "Array", value: this.extractArray(body.MFICH) };
    this.MICR = { type: "String", value: body.MICR || "" };
    this.MOSA = { type: "String", value: body.MOSA || "" };
    this.NART = { type: "String", value: body.NART || "" };
    this.NINV = { type: "String", value: body.NINV || "" };
    this.NOMS = { type: "Array", value: this.extractArray(body.NOMS) };
    this.NUMA = { type: "String", value: body.NUMA || "" };
    this.NUMP = { type: "String", value: body.NUMP || "" };
    this.OBS = { type: "String", value: body.OBS || "" };
    this.ORIG = { type: "String", value: body.ORIG || "" };
    this.PAPP = { type: "String", value: body.PAPP || "" };
    this.PARN = { type: "Array", value: this.extractArray(body.PARN) };
    this.PART = { type: "Array", value: this.extractArray(body.PART) };
    this.PDEN = { type: "Array", value: this.extractArray(body.PDEN) };
    this.PDIM = { type: "String", value: body.PDIM || "" };
    this.PERS = {
      type: "Array",
      value: this.extractArray(body.PERS),
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T6"
    };
    this.PETA = { type: "String", value: body.PETA || "" };
    this.PHOTO = { type: "String", value: body.PHOTO || "" };
    this.PINS = { type: "String", value: body.PINS || "" };
    this.PINT = { type: "String", value: body.PINT || "" };
    this.PLOC = { type: "String", value: body.PLOC || "" };
    this.PPRO = { type: "String", value: body.PPRO || "" };
    this.PREP = { type: "String", value: body.PREP || "" };
    this.PROT = {
      type: "String",
      value: body.PROT || "",
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T10"
    };
    this.REFA = { type: "Array", value: this.extractArray(body.REFA) };
    this.REFE = { type: "Array", value: this.extractArray(body.REFE) };
    this.REFM = { type: "String", value: body.REFM || "" };
    this.REFP = { type: "Array", value: this.extractArray(body.REFP) };
    this.REG = { type: "String", value: body.REG || "" };
    this.RENP = { type: "Array", value: this.extractArray(body.RENP) };
    this.RENV = { type: "Array", value: this.extractArray(body.RENV) };
    this.REPR = { type: "Array", value: this.extractArray(body.REPR) };
    this.SCLD = { type: "Array", value: this.extractArray(body.SCLD) };
    this.SCLE = {
      type: "Array",
      value: this.extractArray(body.SCLE),
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T17"
    };
    this.SCLX = { type: "Array", value: this.extractArray(body.SCLX) };
    this.SOUR = { type: "String", value: body.SOUR || "" };
    this.STAD = { type: "Array", value: this.extractArray(body.STAD) };
    this.STAT = { type: "Array", value: this.extractArray(body.STAT) };
    this.STRU = { type: "Array", value: this.extractArray(body.STRU) };
    this.THEM = { type: "String", value: body.THEM || "" };
    this.TICO = { type: "String", value: this.stripHTML(body.TICO) };
    this.TITR = { type: "String", value: body.TITR || "" };
    this.TOUT = { type: "String", value: body.TOUT || "" };
    this.VIDEO = { type: "Array", value: this.extractArray(body.VIDEO) };
    this.VOLS = { type: "String", value: body.VOLS || "" };
    this.WADRS = { type: "String", value: body.WADRS || "" };
    this.WCOM = { type: "String", value: body.WCOM || "" };
    this.WEB = { type: "String", value: body.WEB || "" };
    this.WRENV = { type: "String", value: body.WRENV || "" };
    this.ZONE = { type: "String", value: body.ZONE || "" };
    this.PRODUCTEUR = { type: "String", value: body.PRODUCTEUR || "" };

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
