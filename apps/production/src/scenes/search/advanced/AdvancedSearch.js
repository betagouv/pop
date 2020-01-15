import React, { useState, useEffect } from "react";
import {
  Elasticsearch,
  Results,
  toUrlQueryString,
  fromUrlQueryString,
  QueryBuilder
} from "react-elasticsearch";
import Mapping from "../../../services/mapping";
import { Container } from "reactstrap";
import { es_url } from "../../../config.js";
import Header from "../components/Header";
import ExportComponent from "../components/ExportComponent";
import DeleteComponent from "../components/DeleteComponent";
import utils from "../components/utils";
import Tooltip from "./Tooltip";

export default function AdvancedSearch({ collection, card }) {
  const initialValues = fromUrlQueryString(window.location.search.replace(/^\?/, ""));
  let fields = Object.entries(Mapping[collection])
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
  switch (collection) {
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
          value: ["GENE.keyword", "HIST.keyword", "PUTI.keyword", "DECV.keyword", "PDEC.keyword"],
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
          value: ["AATT.keyword"],
          text: "AATT : Autre attribution"
        },
        {
          value: ["AFFE.keyword"], 
          text: "AFFE : Etablissement affectataire"
        },
        {
          value: ["ATIT.keyword"], 
          text: "ATIT : Ancien titre"
        },
        {
          value: ["ATTR.keyword"], 
          text: "ATTR : Ancienne attribution"
        },
        {
          value: ["AUTI.keyword"], 
          text: "AUTI : Autre titre"
        },
        {
          value: ["AUTR.keyword"],
          text: "AUTR : Auteur"
        },
        {
          value: ["BIBL.keyword"], 
          text: "BIBL : Bibliographie"
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
          value: ["DENO.keyword"], 
          text: "DENO : Dénomination"
        },
        {
          value: ["DESC.keyword"], 
          text: "DESC : Description"
        },
        {
          value: ["DIMS.keyword"], 
          text: "DIMS : Dimensions"
        },
        {
          value: ["DMAJ.keyword"],
          text: "DMAJ : date de mise à jour"
        },
        {
          value: ["DOMN.keyword"], 
          text: "DOMN : Domaine"
        },
        {
          value: ["DREP.keyword"], 
          text: "DREP : Date représentation"
        },
        {
          value: ["ECOL.keyword"], 
          text: "ECOL : Ecole"
        },
        {
          value: ["ETAT.keyword"], 
          text: "ETAT : Etat de conservation"
        },
        {
          value: ["EXPO.keyword"], 
          text: "EXPO : Expositions"
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
          value: ["INSC.keyword"], 
          text: "INSC : Inscriptions"
        },
        {
          value: ["INV.keyword"], 
          text: "INV : numéro d’inventaire"
        },
        {
          value: ["LOCA.keyword"], 
          text: "LOCA : Localisation"
        },
        {
          value: ["MARQ.keyword"], 
          text: "MARQ : Marques"
        },
        {
          value: ["MILL.keyword"], 
          text: "MILL : Millénaire"
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
          value: ["OBSE.keyword"], 
          text: "OBSE : Observations"
        },
        {
          value: ["PAUT.keyword"],
          text: "PAUT : Précisions auteur"
        },
        {
          value: ["PHOT.keyword"], 
          text: "PHOT : Droits de photographies"
        },
        {
          value: ["PREP.keyword"], 
          text: "PREP : Précisions sur représentation"
        },
        {
          value: ["PROV.keyword"], 
          text: "PROV : Provenance"
        },
        {
          value: ["PTIT.keyword"], 
          text: "PTIT : Précision titre"
        },
        {
          value: ["RESUME.keyword"], 
          text: "RESUME : Résumé"
        },
        {
          value: ["SCLE.keyword"], 
          text: "SCLE : Siècle"
        },
        {
          value: ["STYL.keyword"], 
          text: "STYL : Style"
        },
        {
          value: ["SUITE.keyword"], 
          text: "SUITE : Oeuvres liées ensemble"
        },
        {
          value: ["TECH.keyword"], 
          text: "TECH : Technique"
        },
        {
          value: ["TITR.keyword"], 
          text: "TITR : Titre"
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
  }

  const [sortKey, setSortKey] = useState(initialValues.get("sortKey") || "REF.keyword");
  const [sortOrder, setSortOrder] = useState(initialValues.get("sortOrder") || "desc");
  const [sortQuery, setSortQuery] = useState([{ [sortKey]: { order: sortOrder } }]);

  useEffect(() => {
    setSortQuery([{ [sortKey]: { order: sortOrder } }]);
  }, [sortKey, sortOrder]);

  return (
    <Container className="search">
      <Header base={collection} normalMode={false} />
      <Elasticsearch
        url={`${es_url}/${collection}`}
        onChange={values => {
          if (values.size) {
            values.set("sortKey", sortKey);
            values.set("sortOrder", sortOrder);
          }
          const q = toUrlQueryString(values);
          if (q) {
            window.history.replaceState("x", "y", `?${q}`);
          }
        }}
      >
        <div style={{ position: "relative" }}>
          <QueryBuilder
            initialValue={initialValues.get("qb")}
            id="qb"
            fields={fields}
            operators={utils.operators}
            autoComplete={true}
            combinators={[{ value: "AND", text: "ET" }, { value: "OR", text: "OU" }]}
          />
          <Tooltip />
        </div>

        <div className="text-center my-3">
          Trier par:{" "}
          <select className="ml-2" onChange={e => setSortKey(e.target.value)} value={sortKey}>
            {Object.keys(Mapping[collection])
              .filter(e => !["TICO", "TITR", "__v", "__id"].includes(e))
              .map(e => (
                <option key={e} value={`${e}.keyword`}>
                  {e}
                </option>
              ))}
          </select>
          <select className="ml-2" onChange={e => setSortOrder(e.target.value)} value={sortOrder}>
            <option value="asc">Ascendant</option>
            <option value="desc">Descendant</option>
          </select>
        </div>
        <Results
          sort={sortQuery}
          id="result"
          initialPage={initialValues.get("resultPage")}
          items={data => data.map(({ _source, _score, _id }) => card(_source, _score, _id))}
          pagination={utils.pagination}
          stats={total => (
            <div>
              {total} résultat{total === 1 ? "" : "s"}
            </div>
          )}
        />
        <div>
          <ExportComponent collection={collection} />
          <DeleteComponent collection={collection} />
        </div>
      </Elasticsearch>
    </Container>
  );
}
