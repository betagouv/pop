import { Mapping } from "pop-shared";
import validator from "validator";
import Notice from "./Notice";

export default class Memoire extends Notice {
  constructor(body) {
    super();
    this._type = "memoire";
    this.setProperty("REF", "String", (body.REF || "").trim(), {
      required: true
    });
    this.setProperty("PRODUCTEUR", "String", body.PRODUCTEUR, {
      generated: true
    });
    this.setProperty("ACC", "String", body.ACC);
    this.setProperty("ACQU", "String", body.ACQU);
    this.setProperty("ADPHOT", "String", body.ADPHOT);
    this.setProperty("ADRESSE", "String", body.ADRESSE);
    this.setProperty("ADRS", "String", body.ADRS);
    this.setProperty("AIRE", "String", body.AIRE);
    this.setProperty("ANUMOR", "String", body.ANUMOR);
    this.setProperty("ANUMP", "String", body.ANUMP);
    this.setProperty("ANUMTI", "String", body.ANUMTI);
    this.setProperty("AUTG", "String", body.AUTG);
    this.setProperty("AUTOEU", "String", body.AUTOEU);
    this.setProperty("AUTOR", "String", body.AUTOR);
    this.setProperty("AUTP", "String", body.AUTP);
    this.setProperty("AUTTI", "String", body.AUTTI);
    this.setProperty("CHRONO", "String", body.CHRONO);
    this.setProperty("COM", "String", body.COM);
    this.setProperty("CONTACT", "String", body.CONTACT);
    this.setProperty("COPY", "String", body.COPY);
    this.setProperty("COSTUME", "String", body.COSTUME);
    this.setProperty("COTECOR", "String", body.COTECOR);
    this.setProperty("COTECP", "String", body.COTECP);
    this.setProperty("COTECTI", "String", body.COTECTI);
    this.setProperty("COULEUR", "String", body.COULEUR);
    this.setProperty("DATD", "String", body.DATD);
    this.setProperty("DATG", "String", body.DATG);
    this.setProperty("DATIMM", "String", body.DATIMM);
    this.setProperty("DATOEU", "String", body.DATOEU);
    this.setProperty("DATOR", "String", body.DATOR);
    this.setProperty("DATPV", "String", body.DATPV);
    this.setProperty("DATTI", "String", body.DATTI);
    this.setProperty("DIFF", "String", body.DIFF);
    this.setProperty("DMAJ", "String", body.DMAJ, { generated: true });
    this.setProperty("DMIS", "String", body.DMIS, { generated: true });
    this.setProperty("DOM", "String", body.DOM);
    this.setProperty("DPT", "String", body.DPT);
    this.setProperty("ECH", "String", body.ECH);
    this.setProperty("EDIARCH", "String", body.EDIARCH);
    this.setProperty("EDIF", "String", body.EDIF);
    this.setProperty("EMET", "String", body.EMET);
    this.setProperty("FORMAT", "String", body.FORMAT);
    this.setProperty("FORMATOR", "String", body.FORMATOR);
    this.setProperty("FORMATTI", "String", body.FORMATTI);
    this.setProperty("IDPROD", "String", body.IDPROD);
    this.setProperty("IMG", "String", this.extractImage(body));
    this.setProperty("INSEE", "String", body.INSEE);
    this.setProperty("JDATPV", "String", body.JDATPV);
    this.setProperty("LAUTP", "String", body.LAUTP);
    this.setProperty("LBASE", "Array", this.extractArray(body.LBASE));
    this.setProperty("LBASE2", "String", body.LBASE2);
    this.setProperty("LEG", "String", body.LEG);
    this.setProperty("LEG2", "String", body.LEG2);
    this.setProperty("LIB", "String", body.LIB);
    this.setProperty("LIENS", "String", body.LIENS);
    this.setProperty("LIEU", "String", body.LIEU);
    this.setProperty("LIEUCOR", "String", body.LIEUCOR);
    this.setProperty("LIEUCP", "String", body.LIEUCP);
    this.setProperty("LIEUCTI", "String", body.LIEUCTI);
    this.setProperty("LIEUORIG", "String", body.LIEUORIG);
    this.setProperty("LOCA", "String", body.LOCA);
    this.setProperty("MARQ", "String", body.MARQ);
    this.setProperty("MCGEO", "String", body.MCGEO);
    this.setProperty("MCL", "String", body.MCL);
    this.setProperty("MCPER", "String", body.MCPER);
    this.setProperty("MENTIONS", "String", body.MENTIONS);
    this.setProperty("MENTOR", "String", body.MENTOR);
    this.setProperty("MENTTI", "String", body.MENTTI);
    this.setProperty("MOSA", "String", body.MOSA);
    this.setProperty("NUM", "String", body.NUM);
    this.setProperty("NUMAUTP", "String", body.NUMAUTP);
    this.setProperty("NUMCAF", "String", body.NUMCAF);
    this.setProperty("NUMCD", "String", body.NUMCD);
    this.setProperty("NUMF", "String", body.NUMF);
    this.setProperty("NUMI", "String", body.NUMI);
    this.setProperty("NUMOP", "String", body.NUMOP);
    this.setProperty("NUMOR", "String", body.NUMOR);
    this.setProperty("NUMP", "String", body.NUMP);
    this.setProperty("NUMSITE", "String", body.NUMSITE);
    this.setProperty("NUMTI", "String", body.NUMTI);
    this.setProperty("NVD", "String", body.NVD);
    this.setProperty("OBJT", "String", body.OBJT);
    this.setProperty("OBS", "String", body.OBS);
    this.setProperty("OBSOR", "String", body.OBSOR);
    this.setProperty("OBSTI", "String", body.OBSTI);
    this.setProperty("PAYS", "String", body.PAYS);
    this.setProperty("PRECOR", "String", body.PRECOR);
    this.setProperty("PUBLI", "String", body.PUBLI);
    this.setProperty("REFIM", "String", body.REFIM);
    this.setProperty("REFIMG", "String", body.REFIMG);
    this.setProperty("REG", "String", body.REG);
    this.setProperty("RENV", "String", body.RENV);
    this.setProperty("ROLE", "String", body.ROLE);
    this.setProperty("SCLE", "String", body.SCLE);
    this.setProperty("SENS", "String", body.SENS);
    this.setProperty("SERIE", "String", body.SERIE);
    this.setProperty("SITE", "String", body.SITE);
    this.setProperty("STRUCT", "String", body.STRUCT);
    this.setProperty("SUJET", "String", body.SUJET);
    this.setProperty("SUP", "String", body.SUP);
    this.setProperty("TECH", "String", body.TECH);
    this.setProperty("TECHOR", "String", body.TECHOR);
    this.setProperty("TECHTI", "String", body.TECHTI);
    this.setProperty("THEATRE", "String", body.THEATRE);
    this.setProperty("TICO", "String", body.TICO);
    this.setProperty("TIREDE", "String", body.TIREDE);
    this.setProperty("TITRE", "String", body.TITRE);
    this.setProperty("TOILE", "String", body.TOILE);
    this.setProperty("TOUT", "String", body.TOUT);
    this.setProperty("TYP", "String", body.TYP);
    this.setProperty("TYPDOC", "String", body.TYPDOC);
    this.setProperty("TYPEIMG", "String", body.TYPEIMG);
    this.setProperty("TYPSUPP", "String", body.TYPSUPP);
    this.setProperty("VIDEO", "String", body.VIDEO);
    this.setProperty("VUECD", "String", body.VUECD);
    this.setProperty("WCOM", "String", body.WCOM);
    this.setProperty("WEB", "String", body.WEB);

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

    ////////////////////////////We can mutualise this code to all notice. Must be done after the MVP
    const memoireMapping = Mapping.memoire;
    for (let key in memoireMapping) {
      if (memoireMapping[key].validation && this[key]) {
        let validate = true;
        switch (memoireMapping[key].validation) {
          case "Alphanumeric":
            validate = validator.isAlphanumeric(this[key].value, "fr-FR");
            break;
          default:
            console.log("TODO", memoireMapping[key].validation);
            break;
        }

        if(!validate){
          this._errors.push(`Le champ ${key} n'est pas de type ${memoireMapping[key].validation}`)
        }
      }
    }
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
