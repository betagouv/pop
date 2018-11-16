import React from "react";
import { Row, Col, Container } from "reactstrap";
import Field from "./components/field";
import LinkedNotices from "./components/LinkedNotices";
import Header from "./components/header";
import Title from "./components/title";
import Loader from "../../components/loader";
import API from "../../services/api";
import ContactUs from "./components/ContactUs";
import NotFound from "../../components/NotFound";
import { postFixedLink } from "./utils";
import "./index.css";

class Notice extends React.Component {
  state = {
    notice: null,
    error: "",
    links: null,
    loading: true
  };

  componentWillMount() {
    this.load(this.props.match.params.ref);
  }

  componentWillReceiveProps(newProps) {
    if (
      this.props.match &&
      this.props.match.params.ref !== newProps.match.params.ref
    ) {
      this.load(newProps.match.params.ref);
    }
  }

  load(ref) {
    this.setState({ loading: true });
    API.getNotice("merimee", ref).then(notice => {
      console.log(notice);
      this.setState({ loading: false, notice });

      const { RENV, REFP, REFE, REFO } = notice;
      // RENV -> MERIMEE
      // REFP -> MERIMEE
      // REFE -> MERIMEE
      // REFO -> PALISSY
      const arr = [];
      for (let i = 0; i < RENV.length; i++) {
        arr.push(API.getNotice("merimee", RENV[i]));
        if (arr.length > 50) break;
      }
      for (let i = 0; i < REFP.length; i++) {
        arr.push(API.getNotice("merimee", REFP[i]));
        if (arr.length > 50) break;
      }
      for (let i = 0; i < REFE.length; i++) {
        arr.push(API.getNotice("merimee", REFE[i]));
        if (arr.length > 50) break;
      }
      for (let i = 0; i < REFO.length; i++) {
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

  render() {
    if (this.state.loading) {
      return <Loader />;
    }

    if (!this.state.notice) {
      return <NotFound />;
    }

    console.log(this.state.notice);
    return (
      <Container className="notice" fluid>
        <Row className="top-section">
          <Col>
            <h1 className="heading">{this.state.notice.TICO}</h1>
          </Col>
        </Row>
        <Row>
          <Col sm="9">
            <Header
              notice={this.state.notice}
              externalImages={false}
              images={this.state.notice.MEMOIRE}
            />
            <Row>
              <Col sm="12">
                <div className="notice-details">
                  <Title
                    content="Désignation"
                    notice={this.state.notice}
                    fields={[
                      "DENO",
                      "GENR",
                      "PDEN",
                      "VOCA",
                      "APPL",
                      "ACTU",
                      "TICO"
                    ]}
                  />
                  <Field
                    title="Dénomination : "
                    content={this.state.notice.DENO}
                  />
                  <Field
                    title="Destinataire : "
                    content={this.state.notice.GENR}
                  />
                  <Field
                    title="Précision sur la dénomination :"
                    content={this.state.notice.PDEN}
                  />
                  <Field title="Vocable :" content={this.state.notice.VOCA} />
                  <Field
                    title="Appellation et titre :"
                    content={this.state.notice.APPL}
                  />
                  <Field
                    title="Destinations successives et actuelle :"
                    content={this.state.notice.ACTU}
                  />
                  <Field
                    title="Titre courant : "
                    content={this.state.notice.TICO}
                  />
                  <Title
                    content="Localisation"
                    notice={this.state.notice}
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
                    title="Localisation : "
                    content={
                      this.state.notice.REG +
                      " " +
                      this.state.notice.DPT +
                      " " +
                      this.state.notice.COM
                    }
                  />
                  <Field
                    title="Précision sur la localisation :"
                    content={this.state.notice.PLOC}
                  />
                  <Field
                    title="Aire d'étude : "
                    content={this.state.notice.AIRE}
                  />
                  <Field title="Canton : " content={this.state.notice.CANT} />
                  <Field title="Lieu-dit : " content={this.state.notice.LIEU} />
                  <Field title="Adresse : " content={this.state.notice.ADRS} />
                  <Field
                    title="Référence cadastrale :"
                    content={this.state.notice.CADA}
                  />
                  <Field
                    title="Milieu d'implantation : "
                    content={this.state.notice.IMPL}
                  />
                  <Field
                    title="Cours d'eau : "
                    content={this.state.notice.HYDR}
                  />
                  <Field
                    title="Parties non étud : "
                    content={this.state.notice.PARN}
                  />
                  <Field
                    title="Edifice de conservation : "
                    content={this.state.notice.EDIF}
                  />
                  <Field
                    title="Référence de l'édifice de conservation : "
                    content={this.state.notice.REFE}
                  />
                  <Field
                    title="Décompte des oeuvres recensées :"
                    content={this.state.notice.COLL}
                  />
                  <Title
                    content="Historique"
                    notice={this.state.notice}
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
                    title="Datation des campagnes principales de construction :"
                    content={this.state.notice.SCLE}
                  />
                  <Field
                    title="Datation des campagnes secondaires de construction :"
                    content={this.state.notice.SCLD}
                  />
                  <Field
                    title="Datation en années :"
                    content={this.state.notice.DATE}
                  />
                  <Field
                    title="Justification de la datation :"
                    content={this.state.notice.JDAT}
                  />
                  <Field
                    title="Auteurs de l'oeuvre : "
                    content={this.state.notice.AUTR}
                  />
                  <Field
                    title="Référence auteur : "
                    content={this.state.notice.REFM}
                  />
                  <Field
                    title="Justification de l'attribution :"
                    content={this.state.notice.JATT}
                  />
                  <Field
                    title="Personnalitées :"
                    content={this.state.notice.PERS}
                  />
                  <Field title="Remploi : " content={this.state.notice.REMP} />
                  <Field
                    title="Partie déplacée : "
                    content={this.state.notice.DEPL}
                  />
                  <Field
                    title="Commentaire historique :"
                    content={this.state.notice.HIST}
                    separator="£"
                  />
                  <Title
                    content="Description"
                    notice={this.state.notice}
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
                  <Field
                    title="Matériau du gros-oeuvre et mise en oeuvre : "
                    content={this.state.notice.MURS}
                  />
                  <Field
                    title="Matériau de la couverture : "
                    content={this.state.notice.TOIT}
                  />
                  <Field
                    title="Parti de plan :"
                    content={this.state.notice.PLAN}
                  />
                  <Field
                    title="Vaisseau et étage :"
                    content={this.state.notice.ETAG}
                  />
                  <Field
                    title="Type et nature du couvrement :"
                    content={this.state.notice.VOUT}
                  />
                  <Field
                    title="Parti d’élévation extérieure :"
                    content={this.state.notice.ELEV}
                  />
                  <Field
                    title="Type de la couverture :"
                    content={this.state.notice.COUV}
                  />
                  <Field
                    title="Emplacement, forme et structure de l’escalier : "
                    content={this.state.notice.ESCA}
                  />
                  <Field
                    title="Source de l'énergie :"
                    content={this.state.notice.ENER}
                  />
                  <Field
                    title="Couvert et découvert de jardin :"
                    content={this.state.notice.VERT}
                  />
                  <Field
                    title="Commentaire description :"
                    content={this.state.notice.DESC}
                    separator="£"
                  />
                  <Field
                    title="Technique du décor des immeubles par nature : "
                    content={this.state.notice.TECH}
                  />
                  <Field
                    title="Représentation : "
                    content={this.state.notice.REPR}
                  />
                  <Field
                    title="Précision sur la représentation : "
                    content={this.state.notice.PREP}
                  />
                  <Field
                    title="Dimensions : "
                    content={this.state.notice.DIMS}
                  />
                  <Field
                    title="Typologie : "
                    content={this.state.notice.TYPO}
                  />
                  <Field
                    title="Etat de conservation : "
                    content={this.state.notice.ETAT}
                  />
                  <Title
                    content="Protection"
                    notice={this.state.notice}
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
                  <Field
                    title="Nature de la protection MH :"
                    content={this.state.notice.PROT}
                  />
                  <Field
                    title="Date protection :"
                    content={this.state.notice.DPRO}
                  />
                  <Field
                    title="Précisions sur la protection MH :"
                    content={this.state.notice.PPRO}
                  />
                  <Field
                    title="Nature de l'acte de protection MH :"
                    content={this.state.notice.APRO}
                  />
                  <Field
                    title="Eléments protégés MH : "
                    content={this.state.notice.MHPP}
                  />
                  <Field
                    title="Référence aux objects conservés dans l'édifice : "
                    content={this.state.notice.REFO}
                  />
                  <Field
                    title="Site, secteur ou zone de protection :"
                    content={this.state.notice.SITE}
                  />
                  <Field
                    title="Intérêt de l'oeuvre :"
                    content={this.state.notice.INTE}
                  />
                  <Field
                    title="intérêt oeuvre :"
                    content={this.state.notice.PINT}
                  />
                  <Field
                    title="Eléments remarquables :"
                    content={this.state.notice.REMA}
                  />
                  <Field
                    title="Date du label :"
                    content={this.state.notice.DLAB}
                  />
                  <Field
                    title="Observations :"
                    content={this.state.notice.OBS}
                  />
                  <Title
                    content="Statut juridique"
                    notice={this.state.notice}
                    fields={["STAT", "PSTA", "AFFE", "PAFF", "VISI"]}
                  />
                  <Field
                    title="Statut de la propriété :"
                    content={this.state.notice.STAT}
                  />
                  <Field
                    title="Précisions sur le statut de la propriété: "
                    content={this.state.notice.PSTA}
                  />
                  <Field
                    title="Affectataire :"
                    content={this.state.notice.AFFE}
                  />
                  <Field
                    title="Précisions sur l'affectataire :"
                    content={this.state.notice.PAFF}
                  />
                  <Field
                    title="Ouverture au public :"
                    content={this.state.notice.VISI}
                  />
                  <Title
                    content="Références documentaires"
                    notice={this.state.notice}
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
                  <Field
                    title="Date d'enquête :"
                    content={this.state.notice.DENQ}
                  />
                  <Field title="Crédits :" content={this.state.notice.COPY} />
                  <Field
                    title="Date de rédaction de la notice :"
                    content={this.state.notice.DBOR}
                  />
                  <Field
                    title="Noms des rédacteurs de la notice et du dossier : "
                    content={this.state.notice.NOMS}
                  />
                  <Field
                    title="Cadre de l'étude :"
                    content={this.state.notice.ETUD}
                  />
                  <Field title="Dossier : " content={this.state.notice.DOSS} />
                  <Field
                    title="Référence images : "
                    content={this.state.notice.REFIM}
                  />
                  <Field
                    title="Visite guidé : "
                    content={this.state.notice.WEB}
                  />
                  <Field
                    title="Référence dans la base Patriarche : "
                    content={this.state.notice.ARCHEO}
                  />
                  <Field
                    title="Dossier adresse :"
                    content={this.state.notice.DOSADRS}
                    separator="£"
                  />
                  <Field
                    title="Autres liens :"
                    content={this.state.notice.IMAGE}
                  />
                </div>
              </Col>
            </Row>
          </Col>
          <Col sm="3">
            <LinkedNotices links={this.state.links} />
            <div className="sidebar-section info">
              <h4>A propos de cette notice</h4>
              <hr />
              <div>
                <Field title="Référence : " content={this.state.notice.REF} />
                <Field
                  title="Date de création : "
                  content={this.state.notice.DMIS}
                />
                <Field
                  title="Dernière mise à jour : "
                  content={this.state.notice.DMAJ}
                />
                <Field title="Rédacteur : " content={this.state.notice.NOMS} />
                <Field
                  title="Crédits photographiques : "
                  content={this.state.notice.AUTP}
                />
                <Field title="" content={this.state.notice.COPY} />
              </div>
              <ContactUs
                contact={this.state.notice.CONTACT}
                reference={this.state.notice.REF}
              />
            </div>
            <SeeMore notice={this.state.notice} />
          </Col>
        </Row>
      </Container>
    );
  }
}

const SeeMore = ({ notice }) => {
  const arr = [];

  if (notice.DOSUR) {
    arr.push(
      <li key="notice.DOSURL">
        <a href={notice.DOSURL}>Dossier électronique</a>
      </li>
    );
  }

  if (notice.DOSURLPDF) {
    arr.push(
      <li key="notice.DOSURLPDF">
        <a href={postFixedLink(notice.DOSURLPDF)} target="_blank">
          Dossier pdf
        </a>
      </li>
    );
  }

  if (notice.LIENS && notice.LIENS.length) {
    for (let i = 0; i < notice.LIENS.length; i++) {
      arr.push(
        <li key={`notice.LIENS${i}`}>
          <a href={notice.LIENS[i]}>LIENS</a>
        </li>
      );
    }
  }

  if (notice.LMDP) {
    arr.push(
      <li key={`mediathek_cible`}>
        <a href="http://www.mediatheque-patrimoine.culture.gouv.fr/pages/bases/mediathek_cible.html">
          Lien vers les archives MH (base Mediathek)
        </a>
      </li>
    );
  }

  if (!arr.length) {
    return <div />;
  }

  return (
    <div className="sidebar-section info">
      <h4>Voir aussi</h4>
      <hr />
      <ul>{arr}</ul>
    </div>
  );
};

export default Notice;
