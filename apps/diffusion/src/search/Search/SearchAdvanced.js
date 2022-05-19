import React from "react";
import { Row } from "reactstrap";
import { withRouter } from "next/router";
import Mapping from "../../services/mapping";
import { QueryBuilder } from "react-elasticsearch-pop";
import { operators } from "../utils";

export const bases = [
  { key: "joconde", base: "Collections des musées de France (Joconde)", img: "/static/topics/mdf.jpg" },
  { key: "mnr", base: "Récupération artistique (MNR Rose-Valland)", img: "/static/topics/mnr.jpg" },
  { key: "merimee", base: "Patrimoine architectural (Mérimée)", img: "/static/topics/mhr.jpg" },
  { key: "memoire", base: "Photographies (Mémoire)", img: "/static/topics/memoire.jpg" },
  { key: "palissy", base: "Patrimoine mobilier (Palissy)", img: "/static/topics/mobilier.jpg" },
  { key: "enluminures", base: "Enluminures (Enluminures)", img: "/static/topics/enluminures.jpg" },
  { key: "museo", base: "Répertoire des Musées de France (Muséofile)", img: "/static/topics/museo.jpg" },
  { key: "autor", base: "Ressources biographiques (Autor)", img: "/static/topics/autor.jpeg"}
];

class SearchAdvanced extends React.Component {
  onBaseChange(e){
    const value = e.target.value;
    this.props.router.push(value ? `/advanced-search/list/${value}` : "/advanced-search/list");
  };

  render() {
    const hasBase = Boolean(this.props.base);
    let key, fields;
    if (hasBase) {
      key = bases.find(e => e.key === this.props.base).key;
      fields = Object.entries(Mapping[key])
        .filter(e => e[1].deprecated !== true)
        .filter(([k]) => !["_id", "__v"].includes(k))
        .sort((a, b) => {
          if (a[0] === "REF") {
            return -1;
          }
          if (b[0] === "REF") {
            return 1;
          }
          if (a[0].startsWith("POP") && !b[0].startsWith("POP")) {
            return -1;
          }
          if (b[0].startsWith("POP") && !a[0].startsWith("POP")) {
            return 1;
          }
          return a[0].localeCompare(b[0]);
        })
        .map(([k, v]) => {
          return { value: `${k}.keyword`, text: `${k} - ${v.label}` };
        });
      switch (this.props.base) {
        case "memoire":
          fields = [
            //Catalogue
            {
              value: ["MCPER.keyword",
                      "ROLE.keyword",
                      "THEATRE.keyword",
                      "DOM.keyword",
                      "EDIF.keyword",
                      "MCL.keyword",
                      "LEG.keyword",
                      "SERIE.keyword",
                      "TITRE.keyword",
                      "OBJT.keyword",
                      "DENO.keyword",
                      "TICO.keyword",
                      "SUJET.keyword"],
              text: "Sujet de la photographie ou personne représentée",
              fields: "MCPER, ROLE, THEATRE, DOM, EDIF, MCL, LEG, SERIE, TITRE, OBJT, DENO, TICO, SUJET"
            },
            {
              value: [ "AIRE.keyword",
                      "PAYS.keyword",
                      "REG.keyword",
                      "DPT.keyword",
                      "COM.keyword",
                      "WCOM.keyword",
                      "INSEE.keyword",
                      "MCGEO.keyword",
                      "LIEUORIG.keyword",
                      "WADRS.keyword"
                    ],
              text: "Localisation",
              fields: "AIRE, PAYS, REG, DPT, COM, WCOM, INSEE, MCGEO, LIEUORIG, WADRS"
            },
            {
              value: [ "ADRESSE.keyword",
                       "LIEU.keyword",
                       "WADRS.keyword"
                      ],
              text: "Adresse ou lieu-dit",
              fields: "ADRESSE, LIEU, WADRS"
            },
            {
              value: ["AUTP.keyword",
                      "AUTOR.keyword",
                      "AUTTI.keyword",
                      "AUTG.keyword",
                      "AUTOEU.keyword"],
              text: "Auteur ou photographe",
              fields: "AUTP, AUTOR, AUTTI, AUTG, AUTOEU"
            },
            {
              value: ["TECHTI.keyword",
                      "TECHOR.keyword",
                      "TECHN.keyword",
                      "TYPDOC.keyword"],
              text: "Type de document",
              fields: "TYPDOC, TECHN, TECHOR, TECHTI"
            },
            {
              value: ["DATPV.keyword",
                      "DATOR.keyword",
                      "DATOEU.keyword",
                      "SCLE.keyword",
                      "DATTI.keyword"],
              text: "Datation",
              fields: "DATPV, DATOR, DATOEU, SCLE, DATTI"
            },
            {
              value: ["TIREDE.keyword",
                      "EXPO.keyword",
                      "PUBLI.keyword"],
              text: "Références d’expositions ou de publications",
              fields: "TIREDE, EXPO, PUBLI"
            },
            {
              value: [ "NUMP.keyword",
                      "ANUMP.keyword",
                      "NEGPOS.keyword",
                      "NUMAUTP.keyword",
                      "NUMOR.keyword",
                      "ANUMOR.keyword",
                      "RENVOI.keyword",
                      "NUMTI.keyword",
                      "ANUMTI.keyword",
                      "REPRO.keyword",
                      "COTECOR.keyword",
                      "COTECTI.keyword",
                      "PRECOR.keyword",
                      "REF.keyword",
                      "NUMVERS.keyword"],
              text: "Numéro ou cote",
              fields: "NUMP, ANUMP, NEGPOS, NUMAUTP, NUMOR, ANUMOR, RENVOI, NUMTI, ANUMTI, REPRO, COTECOR, COTECTI, PRECOR, REF, NUMVERS"
            },
            {
              value: ["NUMVERS.keyword"],
              text: "Numéro de versement",
              fields: "NUMVERS"
            },
            {
              value: ["OBS.keyword",
                      "OBSOR.keyword",
                      "OBSTI.keyword"],
              text: "Observations",
              fields: "OBS, OBSOR, OBSTI"
            },
            {
              value: ["PRODUCTEUR.keyword",
                      "IDPROD.keyword",
                      "COPY.keyword",
                      "EMET.keyword"],
              text: "Producteur de la notice",
              fields: "PRODUCTEUR, IDPROD, COPY, EMET"
            },
            {
              value: ["WADRS.keyword"],
              text: "Adresse éditoriale",
              fields: "WADRS"
            },
            //Tous les champs
            {value: ["PLOC.keyword"], text:"Précision sur la localisation", fields: "PLOC"},
            {value: ["ACQU.keyword"], text:"Modalité d'entrée", fields: "ACQU"},
            {value: ["ADPHOT.keyword"], text:"Adresse de la personne photographiée", fields: "ADPHOT"},
            {value: ["ANUMOR.keyword"], text:"Ancien numéro de l'original", fields: "ANUMOR"},
            {value: ["ANUMP.keyword"], text:"Ancien numéro du négatif", fields: "ANUMP"},
            {value: ["ANUMTI.keyword"], text:"Ancien numéro du tirage", fields: "ANUMTI"},
            {value: ["AUT.keyword"], text:"Auteur du phototype ou du document graphique", fields: "AUT"},
            {value: ["AUTG.keyword"], text:"Auteur de la gravure", fields: "AUTG"},
            {value: ["AUTOEU.keyword"], text:"Auteur de l'oeuvre représentée", fields: "AUTOEU"},
            {value: ["AUTOR.keyword"], text:"Auteur du document reproduit / auteur de l'original", fields: "AUTOR"},
            {value: ["AUTP.keyword"], text:"Photographe", fields: "AUTP"},
            {value: ["AUTR.keyword"], text:"Auteur de l'oeuvre étudiée", fields: "AUTR"},
            {value: ["AUTTI.keyword"], text:"Auteur du tirage", fields: "AUTTI"},
            {value: ["COM.keyword"], text:"Commune", fields: "COM"},
            {value: ["COPY.keyword"], text:"Crédit photographique", fields: "COPY"},
            {value: ["DPT_LETTRE.keyword"], text:"Département en lettre", fields: "DPT_LETTRE"},
            {value: ["COTECOR.keyword"], text:"Cote de conservation du document reproduit", fields: "COTECOR"},
            {value: ["COTECTI.keyword"], text:"Cote de conservation du tirage", fields: "COTECTI"},
            {value: ["COULEUR.keyword"], text:"Couleur", fields: "COULEUR"},
            {value: ["DATOEU.keyword"], text:"Date de l'oeuvre", fields: "DATOEU"},
            {value: ["DATOR.keyword"], text:"Date de l'original", fields: "DATOR"},
            {value: ["DATPV.keyword"], text:"Date de prise de vue", fields: "DATPV"},
            {value: ["DATTI.keyword"], text:"Date du tirage", fields: "DATTI"},
            {value: ["DENO.keyword"], text:"Dénomination de l’oeuvre", fields: "DENO"},
            {value: ["DIFF.keyword"], text:"Droits diffusion", fields: "DIFF"},
            {value: ["DMAJ.keyword"], text:"Date de mise à jour", fields: "DMAJ"},
            {value: ["DMIS.keyword"], text:"Date de création", fields: "DMIS"},
            {value: ["DOC.keyword"], text:"Technique, support, dimensions et date du document reproduit", fields: "DOC"},
            {value: ["DOM.keyword"], text:"Domaine", fields: "DOM"},
            {value: ["DPT.keyword"], text:"Département", fields: "DPT"},
            {value: ["EDIF.keyword"], text:"Édifice", fields: "EDIF"},
            {value: ["EMET.keyword"], text:"Code du producteur", fields: "EMET"},
            {value: ["EXPO.keyword"], text:"Référence d’exposition de l’image", fields: "EXPO"},
            {value: ["FORMAT.keyword"], text:"Format du négatif", fields: "FORMAT"},
            {value: ["FORMATOR.keyword"], text:"Format de l'original", fields: "FORMATOR"},
            {value: ["FORMATTI.keyword"], text:"Format du tirage", fields: "FORMATTI"},
            {value: ["IDPROD.keyword"], text:"Nom du producteur", fields: "IDPROD"},
            {value: ["INSEE.keyword"], text:"Code INSEE de la commune", fields: "INSEE"},
            {value: ["JDATPV.keyword"], text:"Précision sur la date de prise de vue", fields: "JDATPV"},
            {value: ["LAUTP.keyword"], text:"Notice biographique", fields: "LAUTP"},
            {value: ["LBASE.keyword"], text:"Références liées", fields: "LBASE"},
            {value: ["LEG.keyword"], text:"Légende", fields: "LEG"},
            {value: ["LIEU.keyword"], text:"Lieu-dit", fields: "LIEU"},
            {value: ["LIEUCOR.keyword"], text:"Lieu de conservation du document reproduit ou de l'objet", fields: "LIEUCOR"},
            {value: ["LIEUCTI.keyword"], text:"Lieu de conservation du tirage", fields: "LIEUCTI"},
            {value: ["LIEUORIG.keyword"], text:"Lieu d'origine", fields: "LIEUORIG"},
            {value: ["LOCA.keyword"], text:"Localisation", fields: "LOCA"},
            {value: ["MCGEO.keyword"], text:"Mots-clefs géographiques", fields: "MCGEO"},
            {value: ["MCL.keyword"], text:"Mots-clés", fields: "MCL"},
            {value: ["MCPER.keyword"], text:"Identité de la personne photographiée", fields: "MCPER"},
            {value: ["MENTIONS.keyword"], text:"Annotations présentes sur le négatif", fields: "MENTIONS"},
            {value: ["MENTOR.keyword"], text:"Annotations présentes sur l'original", fields: "MENTOR"},
            {value: ["MENTTI.keyword"], text:"Annotations présentes sur le tirage", fields: "MENTTI"},
            {value: ["NUMAUTP.keyword"], text:"Numéro donné par le photographe", fields: "NUMAUTP"},
            {value: ["NUMI.keyword"], text:"Numéro du phototype", fields: "NUMI"},
            {value: ["NUMOR.keyword"], text:"Numéro de l'original", fields: "NUMOR"},
            {value: ["NUMP.keyword"], text:"Numéro du négatif", fields: "NUMP"},
            {value: ["NUMTI.keyword"], text:"Numéro du tirage", fields: "NUMTI"},
            {value: ["NVD.keyword"], text:"Référence sur le vidéodisque", fields: "NVD"},
            {value: ["OBJT.keyword"], text:"Objet", fields: "OBJT"},
            {value: ["OBS.keyword"], text:"Observations", fields: "OBS"},
            {value: ["OBSOR.keyword"], text:"Observations sur l'original", fields: "OBSOR"},
            {value: ["OBSTI.keyword"], text:"Observations sur le tirage", fields: "OBSTI"},
            {value: ["PAYS.keyword"], text:"Pays", fields: "PAYS"},
            {value: ["PRECOR.keyword"], text:"Précisions sur la conservation de l'original", fields: "PRECOR"},
            {value: ["PUBLI.keyword"], text:"Référence de publication de l'image", fields: "PUBLI"},
            {value: ["REF.keyword"], text:"Référence", fields: "REF"},
            {value: ["REG.keyword"], text:"Région", fields: "REG"},
            {value: ["RENV.keyword"], text:"Phototypes en relation", fields: "RENV"},
            {value: ["REPRO.keyword"], text:"Numéro de reproduction", fields: "REPRO"},
            {value: ["ROLE.keyword"], text:"Rôle interprété", fields: "ROLE"},
            {value: ["SCLE.keyword"], text:"Siècle de l'oeuvre", fields: "SCLE"},
            {value: ["SENS.keyword"], text:"Orientation du phototype", fields: "SENS"},
            {value: ["SERIE.keyword"], text:"Titre de la série", fields: "SERIE"},
            {value: ["SUJET.keyword"], text:"Sujet représenté par la photographie ou le document graphique", fields: "SUJET"},
            {value: ["TECHN.keyword"], text:"Description technique du négatif", fields: "TECHN"},
            {value: ["TECHOR.keyword"], text:"Description technique de l'original", fields: "TECHOR"},
            {value: ["TECHTI.keyword"], text:"Description technique du tirage", fields: "TECHTI"},
            {value: ["THEATRE.keyword"], text:"Lieu de représentation", fields: "THEATRE"},
            {value: ["TICO.keyword"], text:"Titre courant de l’oeuvre", fields: "TICO"},
            {value: ["TIREDE.keyword"], text:"Référence bibliographique ou documentaire", fields: "TIREDE"},
            {value: ["TITRE.keyword"], text:"Titre de la pièce de théâtre ou du film", fields: "TITRE"},
            {value: ["CINEPROD.keyword"], text:"Producteur du film", fields: "CINEPROD"},
            {value: ["TYPDOC.keyword"], text:"Catégorie de phototype", fields: "TYPDOC"},
            {value: ["WCOM.keyword"], text:"Ville", fields: "WCOM"}
          ];
          break;
        case "joconde":
          fields = [
            //Catalogue
            {
              value: ["DENO.keyword", "APPL.keyword", "UTIL.keyword", "DOMN.keyword"],
              text: "Désignation de l'oeuvre",
              fields: "DENO, APPL, UTIL, DOMN"
            },
            {
              value: ["AUTR.keyword", "PAUT.keyword", "ATTR.keyword", "ECOL.keyword"],
              text: "Auteurs",
              fields: "AUTR, PAUT, ATTR, ECOL"
            },
            {
              value: ["REPR.keyword", "PREP.keyword", "SREP.keyword", "DESC.keyword", "DREP.keyword"],
              text: "Iconographie",
              fields: "REPR, PREP, SREP, DESC, DREP"
            },
            {
              value: ["MILL.keyword","MILU.keyword","PEOC.keyword","PERI.keyword","PERU.keyword","EPOQ.keyword"],
              text: "Datation",
              fields: "MILL, MILU, PEOC, PERI, PERU, EPOQ"
            },
            {
              value: ["GEOHI.keyword","LIEUX.keyword","PLIEUX.keyword","DECV.keyword","PDEC.keyword"],
              text: "Lieux",
              fields: "GEOHI, LIEUX, PLIEUX, DECV, PDEC"
            },
            {
              value: ["GENE.keyword","HIST.keyword","APTN.keyword","PUTI.keyword"],
              text: "Contexte de création",
              fields: "GENE, HIST, APTN, PUTI"
            },
            {
              value: ["INS.keyword","PINSC.keyword","ONOM.keyword"],
              text: "Marquage",
              fields: "INS, PINSC, ONOM"
            },
            {
              value: ["LOCA.keyword","DEPO.keyword","MUSEO.keyword","REGION.keyword","DPT.keyword","VILLE_M.keyword","NOMOFF.keyword"],
              text: "Lieux de conservation",
              fields: "LOCA, DEPO, MUSEO, REGION, DPT, VILLE_M, NOMOFF"
            },
            {
              value: ["EXPO.keyword","BIBL.keyword","COMM.keyword"],
              text: "Sources complémentaires",
              fields: "EXPO, BIBL, COMM"
            },
            //Tous les champs
            { value:["ADPT.keyword"], text: "Ancien dépôt", fields: "ADPT"},
            { value:["APPL.keyword"], text: "Appellation", fields: "APPL"},
            { value:["APTN.keyword"], text: "Ancienne appartenance", fields: "APTN"},
            { value:["ATTR.keyword"], text: "Anciennes attributions", fields: "ATTR"},
            { value:["AUTR.keyword"], text: "Auteur", fields: "AUTR"},
            { value:["BIBL.keyword"], text: "Bibliographie", fields: "BIBL"},
            { value:["COMM.keyword"], text: "Commentaires", fields: "COMM"},
            { value:["CONTIENT_IMAGE.keyword"], text: "Contient une image", fields: "CONTIENT_IMAGE"},
            { value:["DACQ.keyword"], text:"Date d'acquisition", fields: "DACQ"},
            { value:["DDPT.keyword"], text:"Date de dépôt", fields: "DDPT"},
            { value:["DECV.keyword"], text:"Découverte / Collecte", fields: "DECV"},
            { value:["DENO.keyword"], text:"Dénomination", fields: "DENO"},
            { value:["DEPO.keyword"], text:"Lieu de dépôt", fields: "DEPO"},
            { value:["DESC.keyword"], text:"Description", fields: "DESC"},
            { value:["DMAJ.keyword"], text:"Date de mise à jour", fields: "DMAJ"},
            { value:["DMIS.keyword"], text:"Date de création", fields: "DMIS"},
            { value:["DOMN.keyword"], text:"Domaine", fields: "DOMN"},
            { value:["DPT.keyword"], text:"Département", fields: "DPT"},
            { value:["DREP.keyword"], text:"Date sujet représenté", fields: "DREP"},
            { value:["ECOL.keyword"], text:"École-pays", fields: "ECOL"},
            { value:["EPOQ.keyword"], text:"Époque", fields: "EPOQ"},
            { value:["EXPO.keyword"], text:"Exposition", fields: "EXPO"},
            { value:["GENE.keyword"], text:"Genèse", fields: "GENE"},
            { value:["GEOHI.keyword"], text:"Lieu historique", fields: "GEOHI"},
            { value:["HIST.keyword"], text:"Historique", fields: "HIST"},
            { value:["IMG.keyword"], text:"Adresse image", fields: "IMG"},
            { value:["INSC.keyword"], text:"Inscriptions", fields: "INSC"},
            { value:["INV.keyword"], text:"N° d’nventaire", fields: "INV"},
            { value:["LIEUX.keyword"], text:"Lieux de création", fields: "LIEUX"},
            { value:["LOCA.keyword"], text:"Localisation", fields: "LOCA"},
            { value:["LVID.keyword"], text:"Lien video", fields: "LVID"},
            { value:["MANQUANT.keyword"], text:"MANQUANT", fields: "MANQUANT"},
            { value:["MANQUANT_COM.keyword"], text:"Situation particulière", fields: "MANQUANT_COM"},
            { value:["MILL.keyword"], text:"Millésime de création", fields: "MILL"},
            { value:["MILU.keyword"], text:"Millésime d'utilisation", fields: "MILU"},
            { value:["MUSEO.keyword"], text:"Lien MUSEOFILE", fields: "MUSEO"},
            { value:["NOMOFF.keyword"], text:"Nom du musée", fields: "NOMOFF"},
            { value:["PAUT.keyword"], text:"Précision sur l'auteur", fields: "PAUT"},
            { value:["PDEC.keyword"], text:"Précisions découverte", fields: "PDEC"},
            { value:["PEOC.keyword"], text:"Période de l'original copié", fields: "PEOC"},
            { value:["PERI.keyword"], text:"Période de création", fields: "PERI"},
            { value:["PERU.keyword"], text:"Période d'utilisation", fields: "PERU"},
            { value:["PHOT.keyword"], text:"Crédits photographiques", fields: "PHOT"},
            { value:["PINS.keyword"], text:"Précisions inscriptions", fields: "PINS"},
            { value:["PLIEUX.keyword"], text:"Précisions lieu création", fields: "PLIEUX"},
            { value:["PREP.keyword"], text:"Précisions sur la représentation", fields: "PREP"},
            { value:["PUTI.keyword"], text:"Précisions utilisation", fields: "PUTI"},
            { value:["REDA.keyword"], text:"Rédacteur", fields: "REDA"},
            { value:["REF.keyword"], text:"Référence", fields: "REF"},
            { value:["REGION.keyword"], text:"Région", fields: "REGION"},
            { value:["REPR.keyword"], text:"Sujet représenté", fields: "REPR"},
            { value:["RETIF.keyword"], text:"Lien INHA", fields: "RETIF"},
            { value:["SREP.keyword"], text:"Source représentation", fields: "SREP"},
            { value:["STAT.keyword"], text:"Statut juridique", fields: "STAT"},
            { value:["TECH.keyword"], text:"Matériaux - Techniques", fields: "TECH"},
            { value:["TITR.keyword"], text:"Titre", fields: "TITR"},
            { value:["UTIL.keyword"], text:"Utilisation / Destination", fields: "UTIL"},
            { value:["VILLE_M.keyword"], text:"Ville", fields: "VILLE_M"},
            { value:["WWW.keyword"], text:"Lien site associé", fields: "WWW"}
          ];
          break;
        case "palissy":
          fields = [
            //Catalogue
            {
              value: [
                "COM.keyword",
                "WCOM.keyword",
                "REG.keyword",
                "PLOC.keyword",
                "LIEU.keyword",
                "DPT.keyword",
                "CANT.keyword"
              ],
              text: "Localisation",
              fields: "COM, WCOM, REG, PLOC, LIEU, DPT, CANT"
            },
            {
              value: ["ADRS.keyword", "WADRS.keyword"],
              text: "Adresse",
              fields: "ADRS, WADRS"
            },
            {
              value: ["SCLE.keyword", "SCLD.keyword", "DATE.keyword"],
              text: "Époque",
              fields: "SCLE, SCLD, DATE"
            },
            {
              value: ["DENO.keyword", "PARN.keyword", "PART.keyword", "CATE.keyword"],
              text: "Désignation",
              fields: "DENO, PARN, PART, CATE"
            },
            {
              value: ["PINS.keyword", "INSC.keyword"],
              text: "Inscription portée sur l'objet",
              fields: "PINS, INSC"
            },
            {
              value: ["EXEC.keyword", "ORIG.keyword", "ATEL.keyword"],
              text: "Lieu de provenance ou d'exécution",
              fields: "EXEC, ORIG, ATEL"
            },
            {
              value: ["AUTR.keyword", "AFIG.keyword"],
              text: "Auteur de l'oeuvre ou du modèle",
              fields: "AUTR, AFIG"
            },
            //Tous les champs
            {value: ["REF.keyword"], text: "Référence de la notice", fields: "REF"},
            {value: ["ACQU.keyword"], text: "Contexte d'acquisition", fields: "ACQU"},
            {value: ["ADRS.keyword"], text: "Adresse de l'édifice", fields: "ADRS"},
            {value: ["AFIG.keyword"], text: "Auteur du projet", fields: "AFIG"},
            {value: ["AIRE.keyword"], text: "Aire d'étude pour le domaine Inventaire", fields: "AIRE"},
            {value: ["APPL.keyword"], text: "Appelation d'usage", fields: "APPL"},
            {value: ["ATEL.keyword"], text: "Personne morale créatrice de l'objet", fields: "ATEL"},
            {value: ["AUTP.keyword"], text: "Auteur de la photographie (Mémoire)", fields: "AUTP"},
            {value: ["AUTR.keyword"], text: "Auteur de l'œuvre ou créateur de l'objet", fields: "AUTR"},
            {value: ["BASE.keyword"], text: "Nom de la base", fields: "BASE"},
            {value: ["BIBL.keyword"], text: "Référence(s) de publication(s)", fields: "BIBL"},
            {value: ["CANT.keyword"], text: "Canton", fields: "CANT"},
            {value: ["CATE.keyword"], text: "Catégorie technique", fields: "CATE"},
            {value: ["COM.keyword"], text: "Commune", fields: "COM"},
            {value: ["CONTACT.keyword"], text: "Adresse courriel de contact", fields: "CONTACT"},
            {value: ["CONTIENT_IMAGE.keyword"], text: "Contient une image", fields: "CONTIENT_IMAGE"},
            {value: ["COOR.keyword"], text: "Coordonnées géographiques d'un point", fields: "COOR"},
            {value: ["COORM.keyword"], text: "Coordonnées géographiques multiples", fields: "COORM"},
            {value: ["COPY.keyword"], text: "Copyright de la notice ", fields: "COPY"},
            {value: ["DATE.keyword"], text: "Année de création", fields: "DATE"},
            {value: ["DBOR.keyword"], text: "Date de rédaction de la notice", fields: "DBOR"},
            {value: ["DENO.keyword"], text: "Dénomination de l'objet", fields: "DENO"},
            {value: ["DENQ.keyword"], text: "Date de l'enquête ou du dernier récolement", fields: "DENQ"},
            {value: ["DEPL.keyword"], text: "Lieu de déplacement de l'objet", fields: "DEPL"},
            {value: ["DESC.keyword"], text: "Description matérielle", fields: "DESC"},
            {value: ["DIMS.keyword"], text: "Dimensions normalisées", fields: "DIMS"},
            {value: ["DMAJ.keyword"], text: "Date de la dernière modification de la notice", fields: "DMAJ"},
            {value: ["DMIS.keyword"], text: "Date de versement de la notice", fields: "DMIS"},
            {value: ["DOSADRS.keyword"], text: "Adresse du dossier Inventaire", fields: "DOSADRS"},
            {value: ["DOSS.keyword"], text: "Dénomination du dossier", fields: "DOSS"},
            {value: ["DOSURL.keyword"], text: "URL du dossier Inventaire", fields: "DOSURL"},
            {value: ["DOSURLPDF.keyword"], text: "Précisions sur l'URL du dossier Inventaire", fields: "DOSURLPDF"},
            {value: ["DPRO.keyword"], text: "Date et typologie de la protection", fields: "DPRO"},
            {value: ["DPT.keyword"], text: "Département", fields: "DPT"},
            {value: ["DPT_LETTRE.keyword"], text: "Département en lettre", fields: "DPT_LETTRE"},
            {value: ["EDIF.keyword"], text: "Nom de l'édifice", fields: "EDIF"},
            {value: ["EMPL.keyword"], text: "Emplacement de l’œuvre dans l’édifice", fields: "EMPL"},
            {value: ["ETAT.keyword"], text: "État de conservation (normalisé)", fields: "ETAT"},
            {value: ["ETUD.keyword"], text: "Cadre de l'étude", fields: "ETUD"},
            {value: ["EXEC.keyword"], text: "Lieu de création", fields: "EXEC"},
            {value: ["EXPO.keyword"], text: "Référence(s) d'exposition(s)", fields: "EXPO"},
            {value: ["HIST.keyword"], text: "Description historique", fields: "HIST"},
            {value: ["IDAGR.keyword"], text: "Référence informatique SIMH", fields: "IDAGR"},
            {value: ["IMPL.keyword"], text: "Milieu d'implantation pour le domaine Inventaire", fields: "IMPL"},
            {value: ["INSC.keyword"], text: "Inscription", fields: "INSC"},
            {value: ["INSEE.keyword"], text: "Numéro INSEE de la commune", fields: "INSEE"},
            {value: ["INTE.keyword"], text: "Intérêt de l'objet", fields: "INTE"},
            {value: ["JDAT.keyword"], text: "Justification de la datation", fields: "JDAT"},
            {value: ["LIENS.keyword"], text: "Liens externes éventuels", fields: "LIENS"},
            {value: ["LIEU.keyword"], text: "Lieu-dit", fields: "LIEU"},
            {value: ["LOCA.keyword"], text: "Localisation complète", fields: "LOCA"},
            {value: ["MANQUANT.keyword"], text: "Statut juridique de l'objet", fields: "MANQUANT"},
            {value: ["MATR.keyword"], text: "Matériaux et techniques d'interventions", fields: "MATR"},
            {value: ["MEMOIRE.keyword"], text: "", fields: "MEMOIRE"},
            {value: ["NART.keyword"], text: "Numéro artificiel de différenciation de l'objet", fields: "NART"},
            {value: ["NINV.keyword"], text: "Numéro d'inventaire affecté à l'objet", fields: "NINV"},
            {value: ["NOMS.keyword"], text: "Nom du rédacteur", fields: "NOMS"},
            {value: ["NUMP.keyword"], text: "Cote de la photographie (Mémoire)", fields: "NUMP"},
            {value: ["OBS.keyword"], text: "Observations", fields: "OBS"},
            {value: ["ORIG.keyword"], text: "Lieu de provenance", fields: "ORIG"},
            {value: ["PAPP.keyword"], text: "Intitulé de l'ensemble", fields: "PAPP"},
            {value: ["PARN.keyword"], text: "Partie constituante non étudiée", fields: "PARN"},
            {value: ["PART.keyword"], text: "Partie constituante", fields: "PART"},
            {value: ["PDEN.keyword"], text: "Précision sur la typologie de l'objet", fields: "PDEN"},
            {value: ["PERS.keyword"], text: "Personnalités liées à l'histoire de l'objet", fields: "PERS"},
            {value: ["PETA.keyword"], text: "Précisions sur l'état de conservation", fields: "PETA"},
            {value: ["PHOTO.keyword"], text: "Photographies liées au dossier de protection", fields: "PHOTO"},
            {value: ["PINS.keyword"], text: "Précisions sur l'inscription", fields: "PINS"},
            {value: ["PINT.keyword"], text: "Intérêt oeuvre", fields: "PINT"},
            {value: ["PLOC.keyword"], text: "Précision sur la localisation", fields: "PLOC"},
            {value: ["PPRO.keyword"], text: "Précisions sur la protection", fields: "PPRO"},
            {value: ["PRECISION_JURIDIQUE.keyword"], text: "Précision juridique", fields: "PRECISION_JURIDIQUE"},
            {value: ["PREP.keyword"], text: "Description de l'iconographie", fields: "PREP"},
            {value: ["PRODUCTEUR.keyword"], text: "Producteur", fields: "PRODUCTEUR"},
            {value: ["PROT.keyword"], text: "Typologie de la protection", fields: "PROT"},
            {value: ["REFA.keyword"], text: "Référence Mérimée de l'édifice", fields: "REFA"},
            {value: ["REFE.keyword"], text: "Référence de l'ensemble", fields: "REFE"},
            {value: ["REFP.keyword"], text: "Références des parties constituantes étudiées", fields: "REFP"},
            {value: ["REG.keyword"], text: "Région", fields: "REG"},
            {value: ["RENP.keyword"], text: "Renvoi vers dossier 'peinture'", fields: "RENP"},
            {value: ["RENV.keyword"], text: "Numéro de renvoi vers un autre domaine", fields: "RENV"},
            {value: ["REPR.keyword"], text: "Indexation iconographique normalisée", fields: "REPR"},
            {value: ["SCLE.keyword"], text: "Siècle de création", fields: "SCLE"},
            {value: ["SOUR.keyword"], text: "Sources d'archives et bases de données de référence", fields: "SOUR"},
            {value: ["STAD.keyword"], text: "Etape de création", fields: "STAD"},
            {value: ["STAT.keyword"], text: "Statut juridique du propriétaire", fields: "STAT"},
            {value: ["STRU.keyword"], text: "Structure et typologie", fields: "STRU"},
            {value: ["THEM.keyword"], text: "Thème de l'étude", fields: "THEM"},
            {value: ["TICO.keyword"], text: "Titre courant", fields: "TICO"},
            {value: ["TITR.keyword"], text: "Titre iconographique", fields: "TITR"},
            {value: ["VIDEO.keyword"], text: "Url de liaison avec Mémoire", fields: "VIDEO"},
            {value: ["VOLS.keyword"], text: "Informations relatives aux vols", fields: "VOLS"},
            {value: ["WADRS.keyword"], text: "Adresse pour l'affichage", fields: "WADRS"},
            {value: ["WCOM.keyword"], text: "Commune pour l'affichage", fields: "WCOM"},
            {value: ["WEB.keyword"], text: "Accès Mémoire", fields: "WEB"},
            {value: ["ZONE.keyword"], text: "Typologie de la coordonnée géographique de l'édifice", fields: "ZONE"}
          ];
          break;
        case "merimee":
          fields = [
            {
              value: [
                "COM.keyword",
                "WCOM.keyword",
                "REG.keyword",
                "PLOC.keyword",
                "LIEU.keyword",
                "DPT.keyword",
                "CANT.keyword"
              ],
              text: "Localisation",
              fields: "COM, WCOM, REG, PLOC, LIEU, DPT, CANT"
            },
            {
              value: ["ADRS.keyword", "WADRS.keyword"],
              text: "Adresse",
              fields: "ADRS, WADRS"
            },
            {
              value: ["SCLE.keyword", "SCLD.keyword", "DATE.keyword"],
              text: "Époque",
              fields: "SCLE, SCLD, DATE"
            },
            {
              value: ["DENO.keyword", "PARN.keyword", "PART.keyword"],
              text: "Désignation",
              fields: "DENO, PARN, PART"
            },
            //Tous les champs
            {value: ["REF.keyword"], text: "Référence de la notice", fields: "REF"},
            {value: ["ACTU.keyword"], text: "Destination actuelle de l'édifice", fields: "ACTU"},
            {value: ["ADRS.keyword"], text: "Adresse de l'édifice", fields: "ADRS"},
            {value: ["AFFE.keyword"], text: "Affectataire de l'édifice", fields: "AFFE"},
            {value: ["AIRE.keyword"], text: "Aire d'étude pour le domaine Inventaire", fields: "AIRE"},
            {value: ["APPL.keyword"], text: "Appelation d'usage", fields: "APPL"},
            {value: ["APRO.keyword"], text: "Nature de l'acte de protection", fields: "APRO"},
            {value: ["AUTP.keyword"], text: "Auteur de la photographie (Mémoire)", fields: "AUTP"},
            {value: ["AUTR.keyword"], text: "Auteur de l'édifice", fields: "AUTR"},
            {value: ["BASE.keyword"], text: "Nom de la base", fields: "BASE"},
            {value: ["CADA.keyword"], text: "Références cadastrales", fields: "CADA"},
            {value: ["CANT.keyword"], text: "Canton", fields: "CANT"},
            {value: ["COLL.keyword"], text: "Nombre d'édifices concernés par l'étude", fields: "COLL"},
            {value: ["COM.keyword"], text: "Commune normalisée", fields: "COM"},
            {value: ["CONTACT.keyword"], text: "Adresse courriel de contact", fields: "CONTACT"},
            {value: ["CONTIENT_IMAGE.keyword"], text: "Contient une image", fields: "CONTIENT_IMAGE"},
            {value: ["COOR.keyword"], text: "Coordonnées géographiques d'un point", fields: "COOR"},
            {value: ["COORM.keyword"], text: "Coordonnées géographiques multiples", fields: "COORM"},
            {value: ["COPY.keyword"], text: "Copyright de la notice", fields: "COPY"},
            {value: ["COUV.keyword"], text: "Typologie de couverture", fields: "COUV"},
            {value: ["DATE.keyword"], text: "Année(s) de(s) campagne(s) de construction", fields: "DATE"},
            {value: ["DBOR.keyword"], text: "Date de rédaction de la notice", fields: "DBOR"},
            {value: ["DENO.keyword"], text: "Dénomination de l'édifice", fields: "DENO"},
            {value: ["DENQ.keyword"], text: "Date de l'enquête ou du dernier récolement", fields: "DENQ"},
            {value: ["DEPL.keyword"], text: "Lieu de conservation d'un élément architectural déplacé", fields: "DEPL"},
            {value: ["DESC.keyword"], text: "Commentaire descriptif de l'édifice", fields: "DESC"},
            {value: ["DIMS.keyword"], text: "Dimensions normalisées des édicules uniquement", fields: "DIMS"},
            {value: ["DLAB.keyword"], text: "Date de label", fields: "DLAB"},
            {value: ["DMAJ.keyword"], text: "Date de la dernière modification de la notice", fields: "DMAJ"},
            {value: ["DMIS.keyword"], text: "Date de versement de la notice", fields: "DMIS"},
            {value: ["DOSADRS.keyword"], text: "Adresse du dossier Inventaire", fields: "DOSADRS"},
            {value: ["DOSS.keyword"], text: "Typologie du dossier", fields: "DOSS"},
            {value: ["DOSURL.keyword"], text: "URL du dossier Inventaire", fields: "DOSURL"},
            {value: ["DOSURLPDF.keyword"], text: "Lien vers le dossier PDF", fields: "DOSURLPDF"},
            {value: ["DPRO.keyword"], text: "Date et niveau de protection de l'édifice", fields: "DPRO"},
            {value: ["DPT.keyword"], text: "Département", fields: "DPT"},
            {value: ["DPT_LETTRE.keyword"], text: "Département en lettre", fields: "DPT_LETTRE"},
            {value: ["EDIF.keyword"], text: "Nom de l'édifice", fields: "EDIF"},
            {value: ["ELEV.keyword"], text: "Partie d'élévation extérieure", fields: "ELEV"},
            {value: ["ENER.keyword"], text: "Source de l'énergie utilisée par l'édifice", fields: "ENER"},
            {value: ["ESCA.keyword"], text: "Emplacement, forme et structure de l'escalier", fields: "ESCA"},
            {value: ["ETAG.keyword"], text: "Description de l'élévation intérieure", fields: "ETAG"},
            {value: ["ETAT.keyword"], text: "État de conservation (normalisé)", fields: "ETAT"},
            {value: ["ETUD.keyword"], text: "Cadre de l'étude", fields: "ETUD"},
            {value: ["GENR.keyword"], text: "Genre du destinataire", fields: "GENR"},
            {value: ["HIST.keyword"], text: "Description historique", fields: "HIST"},
            {value: ["HYDR.keyword"], text: "Nom du cours d'eau traversant ou bordant l'édifice", fields: "HYDR"},
            {value: ["IDAGR.keyword"], text: "Référence informatique SIMH", fields: "IDAGR"},
            {value: ["IMPL.keyword"], text: "Milieu d'implantation pour le domaine Inventaire", fields: "IMPL"},
            {value: ["INSEE.keyword"], text: "Numéro INSEE de la commune", fields: "INSEE"},
            {value: ["INTE.keyword"], text: "Intérêt de l'édifice", fields: "INTE"},
            {value: ["JATT.keyword"], text: "Commentaires concernant l'attribution de l'édifice", fields: "JATT"},
            {value: ["JDAT.keyword"], text: "Commentaires concernant la datation", fields: "JDAT"},
            {value: ["LIENS.keyword"], text: "Liens externes éventuels", fields: "LIENS"},
            {value: ["LIEU.keyword"], text: "Lieu-dit", fields: "LIEU"},
            {value: ["LOCA.keyword"], text: "Localisation complète", fields: "LOCA"},
            {value: ["MEMOIRE.keyword"], text: "Mémoire", fields: "MEMOIRE"},
            {value: ["MHPP.keyword"], text: "Précisions sur les éléments protégés", fields: "MHPP"},
            {value: ["MURS.keyword"], text: "Matériaux du gros-œuvre", fields: "MURS"},
            {value: ["NOMS.keyword"], text: "Nom du rédacteur", fields: "NOMS"},
            {value: ["OBS.keyword"], text: "Observations concernant la protection de l'édifice", fields: "OBS"},
            {value: ["PAFF.keyword"], text: "Précisions concernant l'affectataire de l'édifice", fields: "PAFF"},
            {value: ["PARN.keyword"], text: "Partie constituante non étudiée", fields: "PARN"},
            {value: ["PART.keyword"], text: "Partie constituante", fields: "PART"},
            {value: ["PDEN.keyword"], text: "Précision sur la dénomination de l'édifice", fields: "PDEN"},
            {value: ["PERS.keyword"], text: "Personnalités liées à l'histoire de l'édifice", fields: "PERS"},
            {value: ["PINT.keyword"], text: "Intérêt oeuvre", fields: "PINT"},
            {value: ["PLAN.keyword"], text: "Typologie de plan", fields: "PLAN"},
            {value: ["PLOC.keyword"], text: "Précision sur la localisation", fields: "PLOC"},
            {value: ["PPRO.keyword"], text: "Précision sur la protection de l'édifice", fields: "PPRO"},
            {value: ["PREP.keyword"], text: "Description de l'iconographie", fields: "PREP"},
            {value: ["PRODUCTEUR.keyword"], text: "PRODUCTEUR", fields: "PRODUCTEUR"},
            {value: ["PROT.keyword"], text: "Nature de la protection de l'édifice", fields: "PROT"},
            {value: ["PSTA.keyword"], text: "Précisions sur le statut juridique du propriétaire", fields: "PSTA"},
            {value: ["REFE.keyword"], text: "Références de l'édifice de conservation", fields: "REFE"},
            {value: ["REFO.keyword"], text: "Référence aux objets conservés", fields: "REFO"},
            {value: ["REFP.keyword"], text: "Références des parties constituantes étudiées", fields: "REFP"},
            {value: ["REG.keyword"], text: "Région", fields: "REG"},
            {value: ["REMA.keyword"], text: "Eléments remarquables dans l'édifice", fields: "REMA"},
            {value: ["REMP.keyword"], text: "Remploi", fields: "REMP"},
            {value: ["RENV.keyword"], text: "Numéro de renvoi vers un autre domaine", fields: "RENV"},
            {value: ["REPR.keyword"], text: "Indexation iconographique normalisée", fields: "REPR"},
            {value: ["RFPA.keyword"], text: "Identifiant de la base TrouveTout", fields: "RFPA"},
            {value: ["SCLD.keyword"], text: "Siècle de campagne secondaire de consctruction", fields: "SCLD"},
            {value: ["SCLE.keyword"], text: "Siècle de la campagne principale de construction", fields: "SCLE"},
            {value: ["SITE.keyword"], text: "Typologie de la zone de protection", fields: "SITE"},
            {value: ["STAT.keyword"], text: "Statut juridique du propriétaire", fields: "STAT"},
            {value: ["TECH.keyword"], text: "Technique du décor porté de l'édifice", fields: "TECH"},
            {value: ["TICO.keyword"], text: "Titre courant", fields: "TICO"},
            {value: ["TOIT.keyword"], text: "Matériaux de la couverture ", fields: "TOIT"},
            {value: ["TOUT.keyword"], text: "Tout", fields: "TOUT"},
            {value: ["TYPO.keyword"], text: "Commentaires d'usage régional", fields: "TYPO"},
            {value: ["VERT.keyword"], text: "Couverts ou découverts du jardin de l'édifice", fields: "VERT"},
            {value: ["VISI.keyword"], text: "Conditions d'ouverture au public", fields: "VISI"},
            {value: ["VOCA.keyword"], text: "pour les édifices cultuels", fields: "VOCA"},
            {value: ["VOUT.keyword"], text: "Typologie du couvrement", fields: "VOUT"},
            {value: ["WADRS.keyword"], text: "Adresse pour l'affichage", fields: "WADRS"},
            {value: ["WCOM.keyword"], text: "Commune pour l'affichage", fields: "WCOM"},
            {value: ["WEB.keyword"], text: "Accès Mémoire", fields: "WEB"}

          ];
          break;
        case "mnr":
          fields = [
            //Catalogue
            {
              value: ["INV.keyword"], 
              text: "Numéro d’inventaire",
              fields: "INV"
            },
            {
              value: ["AUTR.keyword", "ATTR.keyword", "AATT.keyword", "ECOL.keyword", "STYL.keyword"],
              text: "Auteur",
              fields: "AUTR, ATTR, AATT, ECOL, STYL"
            },
            {
              value: ["TITR.keyword", "ATIT.keyword", "AUTI.keyword"],
              text: "Titre",
              fields: "TITR, ATIT, AUTI"
            },
            {
              value: ["SCLE.keyword", "MILL.keyword"],
              text: "Époque",
              fields: "SCLE, MILL"
            },
            {
              value: ["GENE.keyword", "HIST.keyword", "NOTE.keyword"],
              text: "Historique",
              fields: "GENE, HIST, NOTE"
            },
            {
              value: ["INSC.keyword", "MARQ.keyword"],
              text: "Inscription portée sur l’œuvre",
              fields: "INSC, MARQ"
            },
            {
              value: ["EXPO.keyword", "BIBL.keyword"],
              text: "Annexes",
              fields: "EXPO, BIBL"
            },
            //Tous les champs
            {value: "AATT.keyword",  text: "Ancienne attribution", fields: "AATT"},
            {value: "AFFE.keyword",  text: "Établissement affectataire", fields: "AFFE"},
            {value: "ATIT.keyword",  text: "Ancien titre", fields: "ATIT"},
            {value: "ATTR.keyword",  text: "Autre attribution", fields: "ATTR"},
            {value: "AUTI.keyword",  text: "Autre titre", fields: "AUTI"},
            {value: "AUTR.keyword",  text: "Auteur", fields: "AUTR"},
            {value: "BIBL.keyword",  text: "Bibliographie", fields: "BIBL"},
            {value: "CATE.keyword",  text: "Catégorie", fields: "CATE"},
            {value: "COMM.keyword",  text: "Commentaire", fields: "COMM"},
            {value: "DENO.keyword",  text: "Dénomination", fields: "DENO"},
            {value: "DESC.keyword",  text: "Description", fields: "DESC"},
            {value: "DIMS.keyword",  text: "Dimensions", fields: "DIMS"},
            {value: "DMAJ.keyword",  text: "Date de mise à jour", fields: "DMAJ"},
            {value: "DOMN.keyword",  text: "Domaine", fields: "DOMN"},
            {value: "DREP.keyword",  text: "Date représentation", fields: "DREP"},
            {value: "ECOL.keyword",  text: "École", fields: "ECOL"},
            {value: "EXPO.keyword",  text: "Exposition", fields: "EXPO"},
            {value: "GENE.keyword",  text: "Genèse", fields: "GENE"},
            {value: "HIST.keyword",  text: "Historique", fields: "HIST"},
            {value: "INSC.keyword",  text: "Inscriptions", fields: "INSC"},
            {value: "LOCA.keyword",  text: "Localisation", fields: "LOCA"},
            {value: "MARQ.keyword",  text: "Marques", fields: "MARQ"},
            {value: "MILL.keyword",  text: "Millénaire", fields: "MILL"},
            {value: "NOTE.keyword",  text: "Notes", fields: "NOTE"},
            {value: "NUMS.keyword",  text: "Autres numéros", fields: "NUMS"},
            {value: "OBSE.keyword",  text: "Observations", fields: "OBSE"},
            {value: "PAUTR.keyword", text: "Précisions sur l’auteur", fields: "PAUTR"},
            {value: "PHOT.keyword",  text: "Droits de photographie", fields: "PHOT"},
            {value: "PREP.keyword",  text: "Précision sur représentation", fields: "PREP"},
            {value: "PROV.keyword",  text: "Provenance", fields: "PROV"},
            {value: "PTIT.keyword",  text: "Précisions sur le titre", fields: "PTIT"},
            {value: "RESUME.keyword",text: "Résumé", fields: "RESUME"},
            {value: "SCLE.keyword",  text: "Siècle", fields: "SCLE"},
            {value: "STYL.keyword",  text: "Style", fields: "STYL"},
            {value: "SUITE.keyword", text: "OEuvres liées ensemble", fields: "SUITE"},
            {value: "TECH.keyword",  text: "Technique", fields: "TECH"},
            {value: "TITR.keyword",  text: "Titre", fields: "TITR"}    
          ];
          break;
        case "autor":
          fields = [
            {
              value: ["REF.keyword"], 
              text: "Référence",
              fields: "REF"
            },
            {
              value: ["NOM.keyword"], 
              text: "Nom",
              fields: "NOM"
            },
            {
              value: ["PREN.keyword"], 
              text: "Prenom",
              fields: "PREN"
            },
            {
              value: ["PNOM.keyword"], 
              text: "Précision sur le nom",
              fields: "PNOM"
            },
            {
              value: ["TYPID.keyword"], 
              text: "Type",
              fields: "TYPID"
            },
            {
              value: ["ALIAS.keyword"], 
              text: "Autre forme du nom",
              fields: "ALIAS"
            },
            {
              value: ["INI.keyword"], 
              text: "Initiales",
              fields: "INI"
            },
            {
              value: ["REJET.keyword"], 
              text: "Forme rejetée du nom",
              fields: "REJET"
            },
            {
              value: ["NATIO.keyword"], 
              text: "Nationalité",
              fields: "NATIO"
            },
            {
              value: ["DNAISS.keyword"], 
              text: "Date de naissance",
              fields: "DNAISS"
            },
            {
              value: ["DMORT.keyword"], 
              text: "Date de décès",
              fields: "DMORT"
            },
            {
              value: ["LNAISS.keyword"], 
              text: "Lieu de naissance",
              fields: "LNAISS"
            },{
              value: ["LMORT.keyword"], 
              text: "Lieu de décès",
              fields: "LMORT"
            },
            {
              value: ["FONC.keyword"], 
              text: "Profession",
              fields: "FONC"
            },
            {
              value: ["DATES.keyword"], 
              text: "Période d'activités",
              fields: "DATES"
            },
            {
              value: ["SCLE.keyword"], 
              text: "Siècle d'activité",
              fields: "SCLE"
            },
            {
              value: ["AUTORLOCA.keyword"], 
              text: "Localisations",
              fields: "AUTORLOCA"
            },
            {
              value: ["LOCACT.keyword"], 
              text: "Lieu d'activité",
              fields: "LOCACT"
            },
            {
              value: ["ADRS.keyword"], 
              text: "Adresse",
              fields: "ADRS"
            },
            {
              value: ["LRELA.keyword"], 
              text: "Personnes associées",
              fields: "LRELA"
            },
            {
              value: ["FORM.keyword"], 
              text: "Formateur",
              fields: "FORM"
            },
            {
              value: ["OEUVR.keyword"], 
              text: "Oeuvre réalisée",
              fields: "OEUVR"
            },
            {
              value: ["SYMB.keyword"], 
              text: "Symbole (pour les orfèvres)",
              fields: "SYMB"
            },
            {
              value: ["INS.keyword"], 
              text: "Date d'insculpation (pour les orfèvres)",
              fields: "INS"
            },
            {
              value: ["GAR.keyword"], 
              text: "Numéro du registre de la garantie (pour les orfèvres)",
              fields: "GAR"
            },
            {
              value: ["PREF.keyword"], 
              text: "Numéro du registre de la préfecture (pour les orfèvres)",
              fields: "PREF"
            },
            {
              value: ["BIF.keyword"], 
              text: "Date de biffage (pour les orfèvres)",
              fields: "BIF"
            },
            {
              value: ["BIO.keyword"], 
              text: "Biographie",
              fields: "BIO"
            },{
              value: ["OBS.keyword"], 
              text: "Observations",
              fields: "OBS"
            },
            {
              value: ["SOURCES.keyword"], 
              text: "Sources",
              fields: "SOURCES"
            },
            {
              value: ["BIBLIO.keyword"], 
              text: "Bibliographie",
              fields: "BIBLIO"
            },
            {
              value: ["PUBLI.keyword"], 
              text: "Publications liées à la personne",
              fields: "PUBLI"
            },
            {
              value: ["EXPO.keyword"], 
              text: "Expositions en référence",
              fields: "EXPO"
            },
            {
              value: ["ISNI_VERIFIEE.keyword"], 
              text: "Référence ISNI",
              fields: "ISNI_VERIFIEE"
            },
            {
              value: ["ARK.keyword"], 
              text: "Lien ARK",
              fields: "ARK"
            },
          ];
          break;
        case "enluminures":
          fields = [
            {value: ["REF.keyword"], text: "Référence", fields: "REF"},
            {value: ["APPL.keyword"], text: "APPL", fields: "APPL"},
            {value: ["ATTRIB.keyword"], text: "Auteur de l'oeuvre ou de l'original", fields: "ATTRIB"},
            {value: ["AUTR.keyword"], text: "AUTR", fields: "AUTR"},
            {value: ["AUTS.keyword"], text: "AUTS", fields: "AUTS"},
            {value: ["BASE.keyword"], text: "Nom de la base", fields: "BASE"},
            {value: ["CONSERV.keyword"], text: "CONSERV", fields: "CONSERV"},
            {value: ["CONTIENT_IMAGE.keyword"], text: "Contient une image", fields: "CONTIENT_IMAGE"},
            {value: ["CONTXT.keyword"], text: "Contexte", fields: "CONTXT"},
            {value: ["COPY.keyword"], text: "Copyright notice", fields: "COPY"},
            {value: ["COTE.keyword"], text: "COTE", fields: "COTE"},
            {value: ["DATDEB.keyword"], text: "DATDEB", fields: "DATDEB"},
            {value: ["DATE.keyword"], text: "Datation", fields: "DATE"},
            {value: ["DATFIN.keyword"], text: "DATFIN", fields: "DATFIN"},
            {value: ["DIMS.keyword"], text: "DIMS", fields: "DIMS"},
            {value: ["DMAJ.keyword"], text: "Date de mise à jour", fields: "DMAJ"},
            {value: ["DMIS.keyword"], text: "Date de création", fields: "DMIS"},
            {value: ["DOMN.keyword"], text: "DOMN", fields: "DOMN"},
            {value: ["DROIT.keyword"], text: "Crédits photographiques", fields: "DROIT"},
            {value: ["ENRGFP.keyword"], text: "ENRGFP", fields: "ENRGFP"},
            {value: ["ENRGMS.keyword"], text: "ENRGMS", fields: "ENRGMS"},
            {value: ["ETAB.keyword"], text: "ETAB", fields: "ETAB"},
            {value: ["FOLIOS.keyword"], text: "FOLIOS", fields: "FOLIOS"},
            {value: ["FOPG.keyword"], text: "FOPG", fields: "FOPG"},
            {value: ["IMG.keyword"], text: "IMG", fields: "IMG"},
            {value: ["LANGOUV.keyword"], text: "LANGOUV", fields: "LANGOUV"},
            {value: ["LOCA.keyword"], text: "LOCA", fields: "LOCA"},
            {value: ["LOCA2.keyword"], text: "LOCA2", fields: "LOCA2"},
            {value: ["NFICH.keyword"], text: "NFICH", fields: "NFICH"},
            {value: ["NOMENC.keyword"], text: "Domaine", fields: "NOMENC"},
            {value: ["NOTDEC.keyword"], text: "Remarques sur le décors", fields: "NOTDEC"},
            {value: ["NOTES.keyword"], text: "Notes manuscrit", fields: "NOTES"},
            {value: ["NVUE.keyword"], text: "NVUE", fields: "NVUE"},
            {value: ["OPHOT.keyword"], text: "OPHOT", fields: "OPHOT"},
            {value: ["ORIGG.keyword"], text: "Origine géographique", fields: "ORIGG"},
            {value: ["ORIGH.keyword"], text: "Origine historique", fields: "ORIGH"},
            {value: ["ORIGP.keyword"], text: "ORIGP", fields: "ORIGP"},
            {value: ["POSS.keyword"], text: "Possesseur", fields: "POSS"},
            {value: ["REFD.keyword"], text: "Cote", fields: "REFD"},
            {value: ["REFIM.keyword"], text: "REFIM", fields: "REFIM"},
            {value: ["SUJET.keyword"], text: "Titre de l'enluminure / Sujet", fields: "SUJET"},
            {value: ["SUPP.keyword"], text: "SUPP", fields: "SUPP"},
            {value: ["TITR.keyword"], text: "Titre de l'ouvrage", fields: "TITR"},
            {value: ["TOUT.keyword"], text: "TOUT", fields: "TOUT"},
            {value: ["TYPCOD.keyword"], text: "TYPCOD", fields: "TYPCOD"},
            {value: ["TYPDEC.keyword"], text: "Typologie du décors", fields: "TYPDEC"},
            {value: ["TYPE.keyword"], text: "TYPE", fields: "TYPE"},
            {value: ["VIDEO.keyword"], text: "VIDEO", fields: "VIDEO"},
            {value: ["VISITE.keyword"], text: "VISITE", fields: "VISITE"}
          ];
          break;
        case "museo":
          fields = [
            {value: ["REF.keyword"], text: "Identifiant du musée", fields: "REF"},
            {value: ["ACCES.keyword"], text: "Musée ouvert (Oui/Non)", fields: "ACCES"},
            {value: ["ACQU.keyword"], text: "ACQU", fields: "ACQU"},
            {value: ["ADRL1_M.keyword"], text: "Adresse", fields: "ADRL1_M"},
            {value: ["AN_CREAT.keyword"], text: "Année de création du musée", fields: "AN_CREAT"},
            {value: ["ARTISTE.keyword"], text: "Artistes phares", fields: "ARTISTE"},
            {value: ["ATOUT.keyword"], text: "Atouts majeurs", fields: "ATOUT"},
            {value: ["BASE.keyword"], text: "Nom de la base", fields: "BASE"},
            {value: ["CATEG.keyword"], text: "Catégorie de musée", fields: "CATEG"},
            {value: ["CONTACT_GENERIQUE.keyword"], text: "Contact générique du musée", fields: "CONTACT_GENERIQUE"},
            {value: ["CONTACT_MUSEO.keyword"], text: "Contact coordinateur museo", fields: "CONTACT_MUSEO"},
            {value: ["CONTIENT_IMAGE.keyword"], text: "Contient une image", fields: "CONTIENT_IMAGE"},
            {value: ["COPY.keyword"], text: "Copyright photo", fields: "COPY"},
            {value: ["CP_M.keyword"], text: "Code postal", fields: "CP_M"},
            {value: ["DMAJ.keyword"], text: "Date de la dernière mise à jour", fields: "DMAJ"},
            {value: ["DMIS.keyword"], text: "Date de la création POP/Mistral", fields: "DMIS"},
            {value: ["DOMPAL.keyword"], text: "Thématiques principales", fields: "DOMPAL"},
            {value: ["DPT.keyword"], text: "Département", fields: "DPT"},
            {value: ["DT_MODIF.keyword"], text: "Date de modification", fields: "DT_MODIF"},
            {value: ["DT_SAISI.keyword"], text: "Date de création", fields: "DT_SAISI"},
            {value: ["HIST.keyword"], text: "Historique", fields: "HIST"},
            {value: ["INTERET.keyword"], text: "Intérêt architectural", fields: "INTERET"},
            {value: ["LABEL.keyword"], text: "Appellation musée de France", fields: "LABEL"},
            {value: ["LIEU_M.keyword"], text: "Adresse complementaire", fields: "LIEU_M"},
            {value: ["AUTNOM.keyword"], text: "Autres noms", fields: "AUTNOM"},
            {value: ["NOMOFF.keyword"], text: "Dénomination officielle du musée", fields: "NOMOFF"},
            {value: ["NOMUSAGE.keyword"], text: "Nom usuel", fields: "NOMUSAGE"},
            {value: ["PHARE.keyword"], text: "Personnages phares", fields: "PHARE"},
            {value: ["PHOTO.keyword"], text: "Image", fields: "PHOTO"},
            {value: ["PROT-BAT.keyword"], text: "Protection bâtiment", fields: "PROT-BAT"},
            {value: ["PROT-ESP.keyword"], text: "Protection espace", fields: "PROT-ESP"},
            {value: ["RECOL.keyword"], text: "RECOL", fields: "RECOL"},
            {value: ["REFMEM.keyword"], text: "Références Mémoire liées", fields: "REFMEM"},
            {value: ["REFMER.keyword"], text: "Références Mérimée liées", fields: "REFMER"},
            {value: ["REFPAL.keyword"], text: "Références Palissy liées", fields: "REFPAL"},
            {value: ["REGION.keyword"], text: "Région", fields: "REGION"},
            {value: ["REST.keyword"], text: "REST", fields: "REST"},
            {value: ["TEL_M.keyword"], text: "Téléphone", fields: "TEL_M"},
            {value: ["THEMES.keyword"], text: "Thèmes des collections (détail)", fields: "THEMES"},
            {value: ["URL_M.keyword"], text: "Site web", fields: "URL_M"},
            {value: ["VILLE_M.keyword"], text: "Ville", fields: "VILLE_M"}
          ]
          break;
      }
    }

    return (
      <div className="advanced-search">
        {(this.props.base == "" || this.props.base == null) &&
          <div className="radioContainer">
            {bases.map( base => 
              <div className="radioCard">
                <div className="radioButtonContainer">
                  <input  className="radioButton" key={base.key} type="radio" value={base.key} checked={this.props.base == base.key ? true : false}
                          onChange={e => this.onBaseChange(e)}/>
                  <div className="radioName">
                    {base.base}
                  </div>
                </div>
              </div>
            )}
          </div>
        }
        <div className="collection">          
          {/* <Row className="advanced-search-title">
            {hasBase ? <div>Dans la base</div> : ""}
            <select value={this.props.base} onChange={this.onBaseChange}>
              <option value="">{!hasBase ? "Sélectionnez une base" : null}</option>
              {bases.map(e => (
                <option key={e.key} value={e.key}>
                  {e.base}
                </option>
              ))}
            </select> 
            {hasBase ? <div>je recherche</div> : null}
          </Row>*/}
        </div>
        {hasBase ? (
          <QueryBuilder
            initialValue={this.props.initialValues.get("qb")}
            id="qb"
            fields={fields}
            operators={operators}
            autoComplete={true}
            combinators={[{ value: "AND", text: "ET" }, { value: "OR", text: "OU" }]}
          />
        ) : null}
        <style jsx global>{`
          .search .advanced-search {
            width: inherit;
          }
          .search .advanced-search .advanced-search-title {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .search .advanced-search .collection {
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 600;
            font-size: 18px;
            color: #2a282b;
          }

          .search .advanced-search select,
          .search .advanced-search input {
            background-color: #f8f8f8;
            border-radius: 5px;
            box-shadow: 1px 2px 2px 0 rgba(197, 197, 197, 0.5);
            max-height: 325px;
            height: 40px;
            border-style: none;
            font-weight: normal;
            color: black;
            font-size: 15px;
          }

          .search .advanced-search .ruleGroup {
            margin-left: 0px;
          }

          .search .advanced-search .collection select {
            margin-left: 20px;
            margin-right: 20px;
          }
          .react-es-rule {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center
            margin-top: 5px;
            margin-bottom: 5px;
          }
          .react-es-rule > select {
            margin-right: 5px;
          }
          .react-es-rule-field {
            max-width: 250px !important;
          }
          .react-es-rule-operator {
            max-width: 230px !important;
          }
          .react-es-rule button {
            margin-left: 5px;
            padding: 2px 7px;
            border-radius: 5px;
            border: none;
            width: 30px;
          }
          .react-es-rule button:focus {
            outline: none;
          }
          .react-es-rule button.react-es-rule-add {
            min-width: 40px;
            width: 40px;
            background-color: #008000;
            color: white;
          }

          .react-es-rule button.react-es-rule-delete {
            min-width: 25px;
            background-color: #c43a2f;
            color: white;
          }

          .react-autosuggest__container {
            position: relative;
            display: inline-block;
            width: inherit;
          }
          .react-autosuggest__container > .react-es-rule-value {
            width: 100%;
          }
          .react-es-rule-value {
            min-width: 350px;
            width: inherit;
            padding-left: 5px;
          }
          .react-es-rule-value:focus {
            outline: none;
          }

          .react-autosuggest__suggestions-container {
            display: none;
            width: 20%;
          }

          .react-autosuggest__suggestions-container--open {
            display: block;
            position: absolute;
            width: 100%;
            border: 1px solid #aaa;
            background-color: #fff;
            font-size: 14px;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
            z-index: 2;
          }

          .react-autosuggest__suggestions-list {
            margin: 0;
            padding: 0;
            list-style-type: none;
          }

          .react-autosuggest__suggestion {
            cursor: pointer;
            padding: 5px 10px;
            overflow: hidden;
            white-space: nowrap;
          }

          .react-autosuggest__suggestion--highlighted {
            background-color: #ddd;
          }
          .react-es-rule > .react-es-rule-combinator {
            width: 55px;
            min-width: 50px;
          }
          .react-es-rule:first-of-type > .react-es-rule-field {
            margin-left: 10px;
          }
          .react-es-query-builder {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 5px;
          }
          .seeMoreOption {
            font-size: 15px;
            font-weight: bold;
            max-width: 400px;
          }
          .option_enabled {
            text-indent: 10px;
            font-size: 15px;
            font-weight: bold;
            max-width: 400px;
          }
          .option_disabled {
            left: 10px;
            font-size: 10px;
            max-width: 400px;
          }
          .option_invisible{
            font-size: 3px;
          }
          .radioContainer{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
          }
          .radioCard{
            display: flex;
            flex-direction: column;
            margin: 15px;
            max-width: 200px;
            max-height: 70px;
          }
          .radioImg{
            width: 100%;
            height: 150px;
            object-fit: cover;
            border: 1px solid rgba(0,0,0,.125);
            border-radius: .25rem;
          }
          .radioButtonContainer{
            display: flex;
            flex-direction: row;
            align-items: center;
          }
          .radioButton{
            box-shadow: none !important;
          }
          .radioName{
            font-weight: 600;
            font-size: 15px;
            margin-left: 5px;
          }
        `}</style>
      </div>
    );
  }
}

export default withRouter(SearchAdvanced);
