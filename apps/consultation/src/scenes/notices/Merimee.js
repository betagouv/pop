import React from "react";
import { Row, Col, Container } from "reactstrap";

import Field from "./Field";
import LinkedNotices from "./LinkedNotices";
import Title from "./Title";
import Map from "./Map";
import ContactUs from "./ContactUs";
import FieldImages from "./FieldImages";

import API from "../../services/api";
import Loader from "../../components/Loader";
import Helmet from "../../components/Helmet";
import NotFound from "../../components/NotFound";

import { postFixedLink, schema, toFieldImages, hasCoordinates } from "./utils";

class Merimee extends React.Component {
  state = {
    notice: null,
    links: null,
    loading: true
  };

  componentDidMount() {
    const { match } = this.props;
    this.load(match.params.ref);
  }

  componentWillReceiveProps(newProps) {
    const { match } = this.props;
    if (match && match.params.ref !== newProps.match.params.ref) {
      this.load(newProps.match.params.ref);
    }
  }

  load(ref) {
    this.setState({ loading: true });
    API.getNotice("merimee", ref).then(notice => {
      console.log(notice);
      this.setState({ loading: false, notice });
      if (!notice) {
        return;
      }

      const { RENV, REFP, REFE, REFO } = notice;
      // RENV -> MERIMEE
      // REFP -> MERIMEE
      // REFE -> MERIMEE
      // REFO -> PALISSY
      const arr = [];
      for (let i = 0; Array.isArray(RENV) && i < RENV.length; i++) {
        arr.push(API.getNotice("merimee", RENV[i]));
        if (arr.length > 50) break;
      }
      for (let i = 0; Array.isArray(REFP) && i < REFP.length; i++) {
        arr.push(API.getNotice("merimee", REFP[i]));
        if (arr.length > 50) break;
      }
      for (let i = 0; Array.isArray(REFE) && i < REFE.length; i++) {
        arr.push(API.getNotice("merimee", REFE[i]));
        if (arr.length > 50) break;
      }
      for (let i = 0; Array.isArray(REFO) && i < REFO.length; i++) {
        arr.push(API.getNotice("palissy", REFO[i]));
        if (arr.length > 50) break;
      }
      Promise.all(arr).then(values => {
        const links = [];
        for (let i = 0; i < values.length; i++) {
          if (!values[i]) {
            console.log("IMPOSSIBLE DE CHARGER LA NOTICE");
          } else {
            links.push(values[i]);
          }
        }
        this.setState({ links });
      });
    });
  }

  getMetaDescription = () => {
    const titre = this.state.notice.TICO || this.state.notice.TITR || "";
    const datation = this.state.notice.SCLE ? this.state.notice.SCLE.join(" ") : "";
    if (this.state.notice.DENO && this.state.notice.DENO.length === 1) {
      const category = this.state.notice.DENO[0];
      if (category.toLowerCase() === "église") {
        return `Découvrez ${titre}, cette ${category} du ${datation}. Cliquez ici !`;
      }
    }
    return `Découvrez ${titre}, du ${datation}. Cliquez ici !`;
  };

  fieldImage(notice) {
    const images = toFieldImages(notice.MEMOIRE);
    if (images.length) {
      return (
        <FieldImages images={images} disabled name={notice.TICO || notice.TITR} external={false} />
      );
    }
  }

  // Display a list of links to authors
  authors() {
    const authors = this.state.notice.AUTR;
    if (!authors || !Array.isArray(authors) || !authors.length) {
      return <div />;
    }
    const links = authors
      .map(a => a.trim())
      .map(a => (
        <a href={`/search/list?auteur=["${a}"]`} key={a}>
          {a}
        </a>
      ))
      .reduce((p, c) => [p, " ; ", c]);
    return <React.Fragment>{links}</React.Fragment>;
  }

  render() {
    if (this.state.loading) {
      return <Loader />;
    }

    const notice = this.state.notice;
    if (!notice) {
      return <NotFound />;
    }

    const description = this.getMetaDescription();

    const obj = {
      name: notice.TICO,
      created_at: notice.SCLE.length ? notice.SCLE[0] : "",
      artform: "Architecture",
      image: notice.MEMOIRE.length ? notice.MEMOIRE[0].url : "",
      description: notice.LEG,
      contentLocation: notice.LOCA,
      creator: notice.AUTR
    };

    return (
      <div className="notice">
        <Container>
          <Helmet
            title={`${notice.TICO || notice.TITR || ""} - POP`}
            description={description}
            schema={schema(obj)}
          />
          <h1 className="heading">{notice.TICO}</h1>

          {this.fieldImage(notice)}
          <Row>
            <Col md="8">
              <div className="notice-details">
                <Title
                  content="Désignation"
                  notice={notice}
                  fields={["DENO", "GENR", "PDEN", "VOCA", "APPL", "ACTU", "TICO"]}
                />
                <Field title="Dénomination" content={notice.DENO} />
                <Field title="Destinataire" content={notice.GENR} />
                <Field title="Précision sur la dénomination" content={notice.PDEN} />
                <Field title="Vocable" content={notice.VOCA} />
                <Field title="Appellation et titre" content={notice.APPL} />
                <Field title="Destinations successives et actuelle" content={notice.ACTU} />
                <Field title="Titre courant" content={notice.TICO} />
                <Title
                  content="Localisation"
                  notice={notice}
                  fields={[
                    "REG",
                    "DPT",
                    "COM",
                    "PLOC",
                    "AIRE",
                    "CANT",
                    "LIEU",
                    "ADRS",
                    "CADA",
                    "IMPL",
                    "HYDR",
                    "PARN",
                    "EDIF",
                    "REFE",
                    "COLL"
                  ]}
                />
                <Field
                  title="Localisation"
                  content={notice.REG + " " + notice.DPT + " " + notice.COM}
                />
                <Field title="Précision sur la localisation" content={notice.PLOC} />
                <Field title="Aire d'étude" content={notice.AIRE} />
                <Field title="Canton" content={notice.CANT} />
                <Field title="Lieu-dit" content={notice.LIEU} />
                <Field title="Adresse" content={notice.ADRS} />
                <Field title="Référence cadastrale" content={notice.CADA} />
                <Field title="Milieu d'implantation" content={notice.IMPL} />
                <Field title="Cours d'eau" content={notice.HYDR} />
                <Field title="Parties non étud" content={notice.PARN} />
                <Field title="Edifice de conservation" content={notice.EDIF} />
                <Field title="Référence de l'édifice de conservation" content={notice.REFE} />
                <Field title="Décompte des oeuvres recensées" content={notice.COLL} />
                <Title
                  content="Historique"
                  notice={notice}
                  fields={[
                    "SCLE",
                    "SCLD",
                    "DATE",
                    "JDAT",
                    "AUTR",
                    "REFM",
                    "JATT",
                    "PERS",
                    "REMP",
                    "DEPL",
                    "HIST"
                  ]}
                />
                <Field
                  title="Datation des campagnes principales de construction"
                  content={notice.SCLE}
                />
                <Field
                  title="Datation des campagnes secondaires de construction"
                  content={notice.SCLD}
                />
                <Field title="Datation en années" content={notice.DATE} />
                <Field title="Justification de la datation" content={notice.JDAT} />
                <Field title="Auteurs de l'oeuvre" content={this.authors()} />
                <Field title="Référence auteur" content={notice.REFM} />
                <Field title="Justification de l'attribution" content={notice.JATT} />
                <Field title="Personnalitées" content={notice.PERS} separator="£" />
                <Field title="Remploi" content={notice.REMP} />
                <Field title="Partie déplacée" content={notice.DEPL} />
                <Field title="Commentaire historique" content={notice.HIST} separator="£" />
                <Title
                  content="Description"
                  notice={notice}
                  fields={[
                    "MURS",
                    "TOIT",
                    "PLAN",
                    "ETAG",
                    "VOUT",
                    "ELEV",
                    "COUV",
                    "ESCA",
                    "ENER",
                    "VERT",
                    "DESC",
                    "TECH",
                    "REPR",
                    "PREP",
                    "DIMS",
                    "TYPO",
                    "ETAT"
                  ]}
                />
                <Field title="Matériau du gros-oeuvre et mise en oeuvre" content={notice.MURS} />
                <Field title="Matériau de la couverture" content={notice.TOIT} />
                <Field title="Parti de plan" content={notice.PLAN} />
                <Field title="Vaisseau et étage" content={notice.ETAG} />
                <Field title="Type et nature du couvrement" content={notice.VOUT} />
                <Field title="Parti d’élévation extérieure" content={notice.ELEV} />
                <Field title="Type de la couverture" content={notice.COUV} />
                <Field
                  title="Emplacement, forme et structure de l’escalier"
                  content={notice.ESCA}
                />
                <Field title="Source de l'énergie" content={notice.ENER} />
                <Field title="Couvert et découvert de jardin" content={notice.VERT} />
                <Field title="Commentaire description" content={notice.DESC} separator="£" />
                <Field title="Technique du décor des immeubles par nature" content={notice.TECH} />
                <Field title="Représentation" content={notice.REPR} />
                <Field title="Précision sur la représentation" content={notice.PREP} />
                <Field title="Dimensions" content={notice.DIMS} />
                <Field title="Typologie" content={notice.TYPO} />
                <Field title="Etat de conservation" content={notice.ETAT} />
                <Title
                  content="Protection"
                  notice={notice}
                  fields={[
                    "PROT",
                    "DPRO",
                    "PPRO",
                    "APRO",
                    "MHPP",
                    "REFO",
                    "SITE",
                    "INTE",
                    "PINT",
                    "REMA",
                    "DLAB",
                    "OBS"
                  ]}
                />
                <Field title="Nature de la protection MH" content={notice.PROT} />
                <Field title="Date protection" content={notice.DPRO} />
                <Field title="Précisions sur la protection MH" content={notice.PPRO} />
                <Field title="Nature de l'acte de protection MH" content={notice.APRO} />
                <Field title="Eléments protégés MH" content={notice.MHPP} />
                <Field
                  title="Référence aux objects conservés dans l'édifice"
                  content={notice.REFO}
                />
                <Field title="Site, secteur ou zone de protection" content={notice.SITE} />
                <Field title="Intérêt de l'oeuvre" content={notice.INTE} />
                <Field title="intérêt oeuvre" content={notice.PINT} />
                <Field title="Eléments remarquables" content={notice.REMA} />
                <Field title="Date du label" content={notice.DLAB} />
                <Field title="Observations" content={notice.OBS} />
                <Title
                  content="Statut juridique"
                  notice={notice}
                  fields={["STAT", "PSTA", "AFFE", "PAFF", "VISI"]}
                />
                <Field title="Statut de la propriété" content={notice.STAT} />
                <Field title="Précisions sur le statut de la propriété: " content={notice.PSTA} />
                <Field title="Affectataire" content={notice.AFFE} />
                <Field title="Précisions sur l'affectataire" content={notice.PAFF} />
                <Field title="Ouverture au public" content={notice.VISI} />
                <Title
                  content="Références documentaires"
                  notice={notice}
                  fields={[
                    "DENQ",
                    "COPY",
                    "DBOR",
                    "NOMS",
                    "ETUD",
                    "DOSS",
                    "REFIM",
                    "WEB",
                    "ARCHEO",
                    "DOSADRS",
                    "IMAGE"
                  ]}
                />
                <Field title="Date d'enquête" content={notice.DENQ} />
                <Field title="Crédits" content={notice.COPY} />
                <Field title="Date de rédaction de la notice" content={notice.DBOR} />
                <Field
                  title="Noms des rédacteurs de la notice et du dossier"
                  content={notice.NOMS}
                />
                <Field title="Cadre de l'étude" content={notice.ETUD} />
                <Field title="Dossier" content={notice.DOSS} />
                <Field title="Référence images" content={notice.REFIM} />
                <Field title="Visite guidé" content={notice.WEB} />
                <Field title="Référence dans la base Patriarche" content={notice.ARCHEO} />
                <Field title="Dossier adresse" content={notice.DOSADRS} separator="£" />
                <Field title="Autres liens" content={notice.IMAGE} />
              </div>
            </Col>
            <Col sm="4">
              <LinkedNotices links={this.state.links} />
              <div className="sidebar-section info">
                <h2>À propos de la notice</h2>
                <div>
                  <Field title="Référence" content={notice.REF} />
                  <Field title="Date de création" content={notice.DMIS} />
                  <Field title="Dernière mise à jour" content={notice.DMAJ} />
                  <Field title="Rédacteur" content={notice.NOMS} />
                  <Field title="Crédits photographiques" content={notice.AUTP} />
                  <Field title="" content={notice.COPY} />
                </div>
                <ContactUs contact={notice.CONTACT} reference={notice.REF} />
              </div>
              <SeeMore notice={notice} />
              {hasCoordinates(notice.POP_COORDONNEES) ? <Map notice={notice} /> : <div />}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const SeeMore = ({ notice }) => {
  const arr = [];

  if (notice.DOSURL) {
    arr.push(
      <Field
        title="Dossier électronique"
        content={<a href={notice.DOSURL}>Télécharger</a>}
        key="notice.DOSURL"
      />
    );
  }

  if (notice.DOSURLPDF) {
    arr.push(
      <Field
        title="Dossier PDF"
        content={<a href={postFixedLink(notice.DOSURLPDF)}>Télécharger</a>}
        key="notice.LVID"
      />
    );
  }

  if (notice.LIENS && notice.LIENS.length) {
    for (let i = 0; i < notice.LIENS.length; i++) {
      arr.push(
        <Field
          title="Liens"
          content={<a href={notice.LIENS[i]}>{notice.LIENS[i]}</a>}
          key={`notice.LIENS${i}`}
        />
      );
    }
  }

  if (notice.LMDP) {
    arr.push(
      <Field
        title="Lien vers les archives MH"
        content={
          <a href="http://www.mediatheque-patrimoine.culture.gouv.fr/pages/bases/mediathek_cible.html">
            Base Mediathek
          </a>
        }
        key="mediathek_cible"
      />
    );
  }

  if (!arr.length) {
    return <div />;
  }

  return (
    <div className="sidebar-section info">
      <h2>Voir aussi</h2>
      {arr}
    </div>
  );
};

export default Merimee;
