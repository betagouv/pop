import React from "react";
import { Row } from "reactstrap";
import { withRouter } from "next/router";
import Mapping from "../../services/mapping";
import { QueryBuilder } from "react-elasticsearch-pop";
import { operators } from "../utils";

export const bases = [
  { key: "joconde", base: "Collections des musées de France (Joconde)" },
  { key: "mnr", base: "Récupération artistique (MNR Rose-Valland)" },
  { key: "merimee", base: "Patrimoine architectural (Mérimée)" },
  { key: "memoire", base: "Photographies (Mémoire)" },
  { key: "palissy", base: "Patrimoine mobilier (Palissy)" },
  { key: "enluminures", base: "Enluminures (Enluminures)" },
  { key: "museo", base: "Répertoire des Musées de France (Muséofile)" },
  { key: "autor", base: "Ressources biographiques (Autor)"}
];

class SearchAdvanced extends React.Component {
  onBaseChange = e => {
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
            ...fields,
            {
              value: [
                "AIRE.keyword",
                "PAYS.keyword",
                "REG.keyword",
                "DPT.keyword",
                "COM.keyword",
                "WCOM.keyword",
                "INSEE.keyword",
                "MCGEO.keyword",
                "LIEUORIG.keyword"
              ],
              text: "AIRE, PAYS, REG, DPT, COM, WCOM, INSEE, MCGEO, LIEUORIG - Localisation"
            },
            {
              value: ["ADRESSE.keyword", "LIEU.keyword"],
              text: "ADRESSE, LIEU - Adresse ou lieu-dit"
            },
            {
              value: [
                "DATPV.keyword",
                "DATOR.keyword",
                "DATOEU.keyword",
                "SCLE.keyword",
                "DATTI.keyword"
              ],
              text: "DATPV, DATOR, DATOEU, SCLE, DATTI - Époque"
            },
            {
              value: [
                "AUTP.keyword",
                "AUTOR.keyword",
                "AUTTI.keyword",
                "AUTG.keyword",
                "AUTOEU.keyword"
              ],
              text: "AUTP, AUTOR, AUTTI, AUTG, AUTOEU - Auteur ou photographe"
            },
            {
              value: ["MCPER.keyword", "THEATRE.keyword", "ROLE.keyword"],
              text: "MCPER, THEATRE, ROLE - Personne représentée"
            },
            {
              value: [
                "DOM.keyword",
                "EDIF.keyword",
                "MCL.keyword",
                "LEG.keyword",
                "SERIE.keyword",
                "TITRE.keyword",
                "OBJT.keyword",
                "DENO.keyword",
                "TICO.keyword",
                "SUJET.keyword"
              ],
              text:
                "DOM, EDIF, MCL, LEG, SERIE, TITRE, OBJT, DENO, TICO, SUJET - Sujet de la photographie"
            },
            {
              value: ["EXPO.keyword", "PUBLI.keyword"],
              text: "EXPO, PUBLI - Références d'exposition ou de publication"
            },
            {
              value: [
                "NUMP.keyword",
                "ANUMP.keyword",
                "NUMG.keyword",
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
                "REF.keyword"
              ],
              text:
                "NUMP, ANUMP, NUMG, NUMAUTP, NUMOR, ANUMOR, RENVOI, NUMTI, ANUMTI, REPRO, COTECOR, COTECTI, PRECOR, REF - Numéro ou cote"
            },
            {
              value: ["TYPDOC.keyword", "TECH.keyword", "TECHOR.keyword", "TECHTI.keyword"],
              text: "TYPDOC, TECH, TECHOR, TECHTI - Type de document"
            },
            {
              value: ["PRODUCTEUR.keyword", "IDPROD.keyword", "COPY.keyword"],
              text: "PRODUCTEUR, IDPROD, COPY - Producteur de la notice"
            },
            {
              value: ["OBS.keyword", "OBSOR.keyword", "OBSTI.keyword"],
              text: "OBS, OBSOR, OBSTI - Producteur de la notice"
            }
          ];
          break;
        case "joconde":
          fields = [
            ...fields,
            {
              value: ["DENO.keyword", "APPL.keyword", "UTIL.keyword", "DOMN.keyword"],
              text: "DENO, APPL, UTIL, DOMN - Désignation"
            },
            {
              value: ["GEOHI.keyword", "LIEUX.keyword", "PLIEUX.keyword"],
              text: "GEOHI, LIEUX, PLIEUX - Lieu création"
            },
            {
              value: ["PERI.keyword", "PERU.keyword", "MILL.keyword", "MILLU.keyword"],
              text: "PERI, PERU, MILL, MILLU - Siècle / Millénaire / date création"
            },
            {
              value: ["DESC.keyword", "ETAT.keyword", "PREP.keyword", "REPR.keyword"],
              text: "DESC, ETAT, PREP, REPR - Description"
            },
            {
              value: [
                "GENE.keyword",
                "HIST.keyword",
                "PUTI.keyword",
                "DECV.keyword",
                "PDEC.keyword"
              ],
              text: "GENE, HIST, PUTI, DECV, PDEC - Contexte de création"
            }
          ];
          break;
        case "palissy":
          fields = [
            ...fields,
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
              text: "COM, WCOM, REG, PLOC, LIEU, DPT, CANT - Localisation"
            },
            {
              value: ["ADRS.keyword", "WADRS.keyword"],
              text: "ADRS, WADRS - Adresse"
            },
            {
              value: ["SCLE.keyword", "SCLD.keyword", "DATE.keyword"],
              text: "SCLE, SCLD, DATE - Époque"
            },
            {
              value: ["DENO.keyword", "PARN.keyword", "PART.keyword", "CATE.keyword"],
              text: "DENO, PARN, PART, CATE - Désignation"
            },
            {
              value: ["PINS.keyword", "INSC.keyword"],
              text: "PINS, INSC - Inscription portée sur l'objet"
            },
            {
              value: ["EXEC.keyword", "ORIG.keyword", "ATEL.keyword"],
              text: "EXEC, ORIG, ATEL - Lieu de provenance ou d'exécution"
            },
            {
              value: ["AUTR.keyword", "AFIG.keyword"],
              text: "AUTR, AFIG - Auteur de l'oeuvre ou du modèle"
            }
          ];
          break;
        case "merimee":
          fields = [
            ...fields,
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
              text: "COM, WCOM, REG, PLOC, LIEU, DPT, CANT - Localisation"
            },
            {
              value: ["ADRS.keyword", "WADRS.keyword"],
              text: "ADRS, WADRS - Adresse"
            },
            {
              value: ["SCLE.keyword", "SCLD.keyword", "DATE.keyword"],
              text: "SCLE, SCLD, DATE - Époque"
            },
            {
              value: ["DENO.keyword", "PARN.keyword", "PART.keyword"],
              text: "DENO, PARN, PART - Désignation"
            }
          ];
          break;
        case "mnr":
          fields = [
            {
              value: ["AUTR.keyword"],
              text: "AUTR : Auteur"
            },
            {
              value: ["PAUT.keyword"],
              text: "PAUT : Précisions auteur"
            },
            {
              value: ["AATT.keyword"],
              text: "AATT : Autre attribution"
            },
            {
              value: ["ATTR.keyword"], 
              text: "ATTR : Ancienne attribution"
            },
            {
              value: ["ECOL.keyword"], 
              text: "ECOL : Ecole"
            },
            {
              value: ["STYL.keyword"], 
              text: "STYL : Style"
            },
            {
              value: ["MILL.keyword"], 
              text: "MILL : Millénaire"
            },
            {
              value: ["SCLE.keyword"], 
              text: "SCLE : Siècle"
            },
            {
              value: ["DENO.keyword"], 
              text: "DENO : Dénomination"
            },
            {
              value: ["DOMN.keyword"], 
              text: "DOMN : Domaine"
            },
            {
              value: ["INV.keyword"], 
              text: "INV : numéro d’inventaire"
            },
            {
              value: ["TITR.keyword"], 
              text: "TITR : Titre"
            },
            {
              value: ["ATIT.keyword"], 
              text: "ATIT : Ancien titre"
            },
            {
              value: ["AUTI.keyword"], 
              text: "AUTI : Autre titre"
            },
            {
              value: ["PTIT.keyword"], 
              text: "PTIT : Précision titre"
            },
            {
              value: ["TECH.keyword"], 
              text: "TECH : Technique"
            },
            {
              value: ["DIMS.keyword"], 
              text: "DIMS : Dimensions"
            },
            {
              value: ["DESC.keyword"], 
              text: "DESC : Description"
            },
            {
              value: ["INSC.keyword"], 
              text: "INSC : Inscriptions"
            },
            {
              value: ["GENE.keyword"], 
              text: "GENE : Génèse"
            },
            {
              value: ["HIST.keyword"], 
              text: "HIST : Historique"
            },
            {
              value: ["PROV.keyword"], 
              text: "PROV : Provenance"
            },
            {
              value: ["NOTE.keyword"], 
              text: "NOTE : Note"
            },
            {
              value: ["NUMS.keyword"], 
              text: "NUMS : Autres numéros"
            },
            {
              value: ["MARQ.keyword"], 
              text: "MARQ : Marques"
            },
            {
              value: ["PREP.keyword"], 
              text: "PREP : Précisions sur représentation"
            },
            {
              value: ["DREP.keyword"], 
              text: "DREP : Date représentation"
            },
            {
              value: ["SUITE.keyword"], 
              text: "SUITE : Oeuvres liées ensemble"
            },
            {
              value: ["EXPO.keyword"], 
              text: "EXPO : Expositions"
            },
            {
              value: ["BIBL.keyword"], 
              text: "BIBL : Bibliographie"
            },
            {
              value: ["ETAT.keyword"], 
              text: "ETAT : Etat de conservation"
            },
            {
              value: ["OBSE.keyword"], 
              text: "OBSE : Observations"
            },
            {
              value: ["RESUME.keyword"], 
              text: "RESUME : Résumé"
            },
            {
              value: ["LOCA.keyword"], 
              text: "LOCA : Localisation"
            },
            {
              value: ["PHOT.keyword"], 
              text: "PHOT : Droits de photographies"
            },
            {
              value: ["CATE.keyword"], 
              text: "CATE : Catégorie"
            },
            {
              value: ["COMM.keyword"], 
              text: "COMM : Commentaire"
            },
            {
              value: ["AFFE.keyword"], 
              text: "AFFE : Etablissement affectataire"
            },
            {
              value: ["DMAJ.keyword"],
              text: "DMAJ : date de mise à jour"
            },
            {
              value: ["AUTR.keyword", "ATTR.keyword", "AATT.keyword", "ECOL.keyword", "STYL.keyword"],
              text: "AUTR, ATTR, AATT, ECOL, STYL - Auteur"
            },
            {
              value: ["TITR.keyword", "ATIT.keyword", "AUTI.keyword"],
              text: "TITR, ATIT, AUTI - Titre"
            },
            {
              value: ["SCLE.keyword", "MILL.keyword"],
              text: "SCLE, MILL - Époque"
            },
            {
              value: ["GENE.keyword", "HIST.keyword", "NOTE.keyword"],
              text: "GENE, HIST, NOTE - Historique"
            },
            {
              value: ["TECH.keyword", "ETAT.keyword"],
              text: "TECH, ETAT - Technique"
            },
            {
              value: ["INSC.keyword", "MARQ.keyword"],
              text: "INSC, MARQ - Inscription portée sur l’œuvre"
            },
            {
              value: ["EXPO.keyword", "BIBL.keyword"],
              text: "EXPO, BIBL - Annexes"
            }
          ];
          break;
        case "autor":
          fields = [
            {
              value: ["REF.keyword"], 
              text: "REF - Référence"
            },
            {
              value: ["NOM.keyword"], 
              text: "NOM - Nom"
            },
            {
              value: ["PREN.keyword"], 
              text: "PREN - Prenom"
            },
            {
              value: ["PNOM.keyword"], 
              text: "PNOM - Précision sur le nom"
            },
            {
              value: ["TYPID.keyword"], 
              text: "TYPID - Type"
            },
            {
              value: ["ALIAS.keyword"], 
              text: "ALIAS - Autre forme du nom"
            },
            {
              value: ["INI.keyword"], 
              text: "INI - Initiales"
            },
            {
              value: ["REJET.keyword"], 
              text: "REJET - Forme rejetée"
            },
            {
              value: ["NATIO.keyword"], 
              text: "NATIO - Nationalité"
            },
            {
              value: ["DNAISS.keyword"], 
              text: "DNAISS - Date de naissance"
            },
            {
              value: ["DMORT.keyword"], 
              text: "DMORT - Date de décès"
            },
            {
              value: ["LNAISS.keyword"], 
              text: "LNAISS - Lieu de naissance"
            },{
              value: ["LMORT.keyword"], 
              text: "LMORT - Lieu de décès"
            },
            {
              value: ["FONC.keyword"], 
              text: "FONC - Fonctions"
            },
            {
              value: ["DATES.keyword"], 
              text: "DATES - Dates"
            },
            {
              value: ["SCLE.keyword"], 
              text: "SCLE - Siècle d'activité"
            },
            {
              value: ["LOCA.keyword"], 
              text: "LOCA - Localisations"
            },
            {
              value: ["LOCACT.keyword"], 
              text: "LOCACT - Localisation d'activité"
            },
            {
              value: ["ADRS.keyword"], 
              text: "ADRS - Adresse"
            },
            {
              value: ["LRELA.keyword"], 
              text: "LRELA - Personnes associées"
            },
            {
              value: ["FORM.keyword"], 
              text: "FORM - Formateur"
            },
            {
              value: ["OEUVR.keyword"], 
              text: "OEUVR - Oeuvre réalisée"
            },
            {
              value: ["SYMB.keyword"], 
              text: "SYMB - Symbole"
            },
            {
              value: ["INS.keyword"], 
              text: "INS - Date d'inculpation"
            },
            {
              value: ["GAR.keyword"], 
              text: "GAR - Numéro du registre de la garantie de Paris"
            },
            {
              value: ["PREF.keyword"], 
              text: "PREF - Numéro du registre de la préfecture"
            },
            {
              value: ["BIF.keyword"], 
              text: "BIF - Date de biffage"
            },
            {
              value: ["BIO.keyword"], 
              text: "BIO - Biographie"
            },{
              value: ["OBS.keyword"], 
              text: "OBS - Observations"
            },
            {
              value: ["SOURCES.keyword"], 
              text: "SOURCES - Sources"
            },
            {
              value: ["BIBLIO.keyword"], 
              text: "BIBLIO - Bibliographie"
            },
            {
              value: ["PUBLI.keyword"], 
              text: "PUBLI - Publications liées à la personne"
            },
            {
              value: ["EXPO.keyword"], 
              text: "EXPO - Expositions en référence"
            },
            {
              value: ["ISNI_VERIFIEE.keyword"], 
              text: "ISNI_VERIFIEE - Référence ISNI"
            },
            {
              value: ["ARK.keyword"], 
              text: "ARK - Lien ARK"
            },
          ];
          break;
      }
    }

    return (
      <div className="advanced-search">
        <div className="collection">
          <Row className="advanced-search-title">
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
          </Row>
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
            margin-top: 5px;
            margin-bottom: 5px;
          }
          .react-es-rule > select {
            margin-right: 5px;
          }
          .react-es-rule-field {
            max-width: 35%;
          }
          .react-es-rule-operator {
            max-width: 25%;
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
            background-color: #008000;
            color: white;
          }

          .react-es-rule button.react-es-rule-delete {
            background-color: #c43a2f;
            color: white;
          }

          .react-autosuggest__container {
            position: relative;
            display: inline-block;
          }
          .react-autosuggest__container > .react-es-rule-value {
            width: 100%;
          }
          .react-es-rule-value {
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
          }
          .react-es-rule:first-of-type > .react-es-rule-field {
            margin-left: 60px;
          }
          .react-es-query-builder {
            margin-top: 25px;
          }
        `}</style>
      </div>
    );
  }
}

export default withRouter(SearchAdvanced);
