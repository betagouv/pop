import Notice from "./notice";

export default class Palissy extends Notice {
  constructor(body) {
    super();
    this._type = "palissy";

    this.setProperty("REF", "String", (body.REF || "").trim(), {
      required: true
    });
    this.setProperty("PRODUCTEUR", "String", body.PRODUCTEUR, {
      generated: true
    });
    this.setProperty("CONTACT", "String", body.CONTACT);
    this.setProperty("ACQU", "String", body.ACQU);
    this.setProperty("ADRS", "String", body.ADRS);
    this.setProperty("ADRS2", "String", body.ADRS2);
    this.setProperty("AFIG", "Array", this.extractArray(body.AFIG));
    this.setProperty("AIRE", "String", body.AIRE);
    this.setProperty("APPL", "String", body.APPL);
    this.setProperty("ATEL", "String", body.ATEL);
    this.setProperty("AUTP", "String", body.AUTP);
    this.setProperty("AUTR", "Array", this.extractArray(body.AUTR));
    this.setProperty("BIBL", "String", body.BIBL);
    this.setProperty("CANT", "String", body.CANT);
    this.setProperty("CATE", "Array", this.extractArray(body.CATE));
    this.setProperty("COM", "String", body.COM);
    this.setProperty("COM2", "String", body.COM2);
    this.setProperty("COOR", "String", body.COOR);
    this.setProperty("COORM", "String", body.COORM);
    this.setProperty("COPY", "String", body.COPY);
    this.setProperty("DATE", "Array", this.extractArray(body.DATE));
    this.setProperty("DBOR", "Array", this.extractArray(body.DBOR));
    this.setProperty("DENO", "Array", this.extractArray(body.DENO), {
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T69"
    });
    this.setProperty("DENQ", "Array", this.extractArray(body.DENQ));
    this.setProperty("DEPL", "String", body.DEPL);
    this.setProperty("DESC", "String", body.DESC);
    this.setProperty("DIMS", "String", body.DIMS);
    this.setProperty("DMAJ", "String", body.DMAJ, { generated: true });
    this.setProperty("DMIS", "String", body.DMIS, { generated: true });
    this.setProperty("DOMN", "String", body.DOMN);
    this.setProperty("DOSADRS", "String", body.DOSADRS);
    this.setProperty("DOSS", "Array", this.extractArray(body.DOSS));
    this.setProperty("DOSURL", "String", body.DOSURL);
    this.setProperty("DOSURLP", "String", body.DOSURLP);
    this.setProperty("DPRO", "String", body.DPRO);
    this.setProperty("DPT", "String", body.DPT);
    this.setProperty("EDIF", "String", body.EDIF);
    this.setProperty("EDIF2", "String", body.EDIF2);
    this.setProperty("EMPL", "String", body.EMPL);
    this.setProperty("EMPL2", "String", body.EMPL2);
    this.setProperty("ETAT", "Array", this.extractArray(body.ETAT));
    this.setProperty("ETUD", "String", body.ETUD);
    this.setProperty("EXEC", "String", body.EXEC);
    this.setProperty("EXPO", "String", body.EXPO);
    this.setProperty("HIST", "String", body.HIST);
    this.setProperty("IDAGR", "Array", this.extractArray(body.IDAGR));
    this.setProperty("IMAGE", "String", body.IMAGE);
    this.setProperty("IMG", "String", body.IMG);
    this.setProperty("IMPL", "String", body.IMPL, {
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T12"
    });
    this.setProperty("INSC", "Array", this.extractArray(body.INSC));
    this.setProperty("INSEE", "String", this.extractArray(body.INSEE));
    this.setProperty("INSEE2", "String", body.INSEE2);
    this.setProperty("INTE", "String", body.INTE, {
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T33"
    });
    this.setProperty("JDAT", "Array", this.extractArray(body.JDAT));
    this.setProperty("LBASE2", "String", body.LBASE2);
    this.setProperty("LIENS", "Array", this.extractArray(body.LIENS));
    this.setProperty("LIEU", "String", body.LIEU);
    this.setProperty("LMDP", "String", body.LMDP);
    this.setProperty("LOCA", "String", body.LOCA);
    this.setProperty("MATR", "Array", this.extractArray(body.MATR));
    this.setProperty("MFICH", "Array", this.extractArray(body.MFICH));
    this.setProperty("MICR", "String", body.MICR);
    this.setProperty("MOSA", "String", body.MOSA);
    this.setProperty("NART", "String", body.NART);
    this.setProperty("NINV", "String", body.NINV);
    this.setProperty("NOMS", "Array", this.extractArray(body.NOMS));
    this.setProperty("NUMA", "String", body.NUMA);
    this.setProperty("NUMP", "String", body.NUMP);
    this.setProperty("OBS", "String", body.OBS);
    this.setProperty("ORIG", "String", body.ORIG);
    this.setProperty("PAPP", "String", body.PAPP);
    this.setProperty("PARN", "Array", this.extractArray(body.PARN));
    this.setProperty("PART", "Array", this.extractArray(body.PART));
    this.setProperty("PDEN", "Array", this.extractArray(body.PDEN));
    this.setProperty("PDIM", "String", body.PDIM);
    this.setProperty("PERS", "Array", this.extractArray(body.PERS), {
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T6"
    });
    this.setProperty("PETA", "String", body.PETA);
    this.setProperty("PHOTO", "String", body.PHOTO);
    this.setProperty("PINS", "String", body.PINS);
    this.setProperty("PINT", "String", body.PINT);
    this.setProperty("PLOC", "String", body.PLOC);
    this.setProperty("PPRO", "String", body.PPRO);
    this.setProperty("PREP", "String", body.PREP);
    this.setProperty("PROT", "String", body.PROT, {
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T10"
    });
    this.setProperty("REFA", "Array", this.extractArray(body.REFA));
    this.setProperty("REFE", "Array", this.extractArray(body.REFE));
    this.setProperty("REFM", "String", body.REFM);
    this.setProperty("REFP", "Array", this.extractArray(body.REFP));
    this.setProperty("REG", "String", body.REG);
    this.setProperty("RENP", "Array", this.extractArray(body.RENP));
    this.setProperty("RENV", "Array", this.extractArray(body.RENV));
    this.setProperty("REPR", "Array", this.extractArray(body.REPR));
    this.setProperty("SCLD", "Array", this.extractArray(body.SCLD));
    this.setProperty("SCLE", "Array", this.extractArray(body.SCLE), {
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T17"
    });
    this.setProperty("SCLX", "Array", this.extractArray(body.SCLX));
    this.setProperty("SOUR", "String", body.SOUR);
    this.setProperty("STAD", "Array", this.extractArray(body.STAD));
    this.setProperty("STAT", "Array", this.extractArray(body.STAT));
    this.setProperty("STRU", "Array", this.extractArray(body.STRU));
    this.setProperty("THEM", "String", body.THEM);
    this.setProperty("TICO", "String", this.stripHTML(body.TICO));
    this.setProperty("TITR", "String", body.TITR);
    this.setProperty("TOUT", "String", body.TOUT);
    this.setProperty("VIDEO", "Array", this.extractArray(body.VIDEO));
    this.setProperty("VOLS", "String", body.VOLS);
    this.setProperty("WADRS", "String", body.WADRS);
    this.setProperty("WCOM", "String", body.WCOM);
    this.setProperty("WEB", "String", body.WEB);
    this.setProperty("WRENV", "String", body.WRENV);
    this.setProperty("ZONE", "String", body.ZONE);
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
