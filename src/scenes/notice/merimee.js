import React from "react";
import { connect } from 'react-redux';
import { Row, Col, Container } from "reactstrap";
import Field from "./components/field";
import LinkedNotices from "./components/LinkedNotices";
import Header from "./components/header";
import Title from "./components/title";
import Loader from "../../components/loader";
import API from "../../services/api";
import ContactUs from "./components/ContactUs";
import Helmet from "../../components/Helmet";
import NotFound from "../../components/NotFound";
import { postFixedLink } from "./utils";

class Merimee extends React.Component {
  state = {
    error: "",
    loading: false
  };

  componentDidMount() {
    const { match, fetchNotice, notice } = this.props;
    if(notice === null) {
      this.setState({ loading: true });
      fetchNotice(match.params.ref, true);
    }
  }

  componentDidUpdate(prevProps) {
    const { notice } = this.props;
    const { notice: prevNotice } = prevProps;
    if(notice !== null && notice !== prevNotice) {
      this.setState({
        loading: false,
      });
    }
  }

  getMeta = ()=> {
    const { notice } = this.props;
    const title =  notice.TICO || notice.TITR;
    const datation = notice.SCLE? notice.SCLE.join(' ') : '';
    if(notice.DENO && notice.DENO.length === 1) {
      const category = notice.DENO[0];
      if(category.toLowerCase() === "église") {
        return {
          title: title? `${title} - POP` : `${notice.REF} - POP`,
          description: `Découvrez ${title? title : notice.REF}, cette ${category} du ${datation}. Cliquez ici !`,
        }
      }
    }

    return {
      title: title? `${title} - POP` : `${notice.REF} - POP`,
      description: `Découvrez ${title? title : notice.REF}, du ${datation}. Cliquez ici !`,
    }
  }

  render() {
    if (this.state.loading) {
      return <Loader />;
    }
    const { notice, links } = this.props;
    if (!notice) {
      return <NotFound />;
    }

    const meta = this.getMeta();
    return (
      <Container className="notice" fluid>
        <Helmet
          title={meta.title}
          description={meta.description}
        />
        <Row className="top-section">
          <Col>
            <h1 className="heading">{notice.TICO}</h1>
          </Col>
        </Row>
        <Row>
          <Col sm="9">
            <Header
              notice={notice}
              externalImages={false}
              images={notice.MEMOIRE}
            />
            <Row>
              <Col sm="12">
                <div className="notice-details">
                  <Title
                    content="Désignation"
                    notice={notice}
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
                    title="Dénomination"
                    content={notice.DENO}
                  />
                  <Field
                    title="Destinataire"
                    content={notice.GENR}
                  />
                  <Field
                    title="Précision sur la dénomination"
                    content={notice.PDEN}
                  />
                  <Field title="Vocable" content={notice.VOCA} />
                  <Field
                    title="Appellation et titre"
                    content={notice.APPL}
                  />
                  <Field
                    title="Destinations successives et actuelle"
                    content={notice.ACTU}
                  />
                  <Field
                    title="Titre courant"
                    content={notice.TICO}
                  />
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
                    content={
                      notice.REG +
                      " " +
                      notice.DPT +
                      " " +
                      notice.COM
                    }
                  />
                  <Field
                    title="Précision sur la localisation"
                    content={notice.PLOC}
                  />
                  <Field
                    title="Aire d'étude"
                    content={notice.AIRE}
                  />
                  <Field title="Canton" content={notice.CANT} />
                  <Field title="Lieu-dit" content={notice.LIEU} />
                  <Field title="Adresse" content={notice.ADRS} />
                  <Field
                    title="Référence cadastrale"
                    content={notice.CADA}
                  />
                  <Field
                    title="Milieu d'implantation"
                    content={notice.IMPL}
                  />
                  <Field
                    title="Cours d'eau"
                    content={notice.HYDR}
                  />
                  <Field
                    title="Parties non étud"
                    content={notice.PARN}
                  />
                  <Field
                    title="Edifice de conservation"
                    content={notice.EDIF}
                  />
                  <Field
                    title="Référence de l'édifice de conservation"
                    content={notice.REFE}
                  />
                  <Field
                    title="Décompte des oeuvres recensées"
                    content={notice.COLL}
                  />
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
                  <Field
                    title="Datation en années"
                    content={notice.DATE}
                  />
                  <Field
                    title="Justification de la datation"
                    content={notice.JDAT}
                  />
                  <Field
                    title="Auteurs de l'oeuvre"
                    content={notice.AUTR}
                  />
                  <Field
                    title="Référence auteur"
                    content={notice.REFM}
                  />
                  <Field
                    title="Justification de l'attribution"
                    content={notice.JATT}
                  />
                  <Field
                    title="Personnalitées"
                    content={notice.PERS}
                  />
                  <Field title="Remploi" content={notice.REMP} />
                  <Field
                    title="Partie déplacée"
                    content={notice.DEPL}
                  />
                  <Field
                    title="Commentaire historique"
                    content={notice.HIST}
                    separator="£"
                  />
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
                  <Field
                    title="Matériau du gros-oeuvre et mise en oeuvre"
                    content={notice.MURS}
                  />
                  <Field
                    title="Matériau de la couverture"
                    content={notice.TOIT}
                  />
                  <Field
                    title="Parti de plan"
                    content={notice.PLAN}
                  />
                  <Field
                    title="Vaisseau et étage"
                    content={notice.ETAG}
                  />
                  <Field
                    title="Type et nature du couvrement"
                    content={notice.VOUT}
                  />
                  <Field
                    title="Parti d’élévation extérieure"
                    content={notice.ELEV}
                  />
                  <Field
                    title="Type de la couverture"
                    content={notice.COUV}
                  />
                  <Field
                    title="Emplacement, forme et structure de l’escalier"
                    content={notice.ESCA}
                  />
                  <Field
                    title="Source de l'énergie"
                    content={notice.ENER}
                  />
                  <Field
                    title="Couvert et découvert de jardin"
                    content={notice.VERT}
                  />
                  <Field
                    title="Commentaire description"
                    content={notice.DESC}
                    separator="£"
                  />
                  <Field
                    title="Technique du décor des immeubles par nature"
                    content={notice.TECH}
                  />
                  <Field
                    title="Représentation"
                    content={notice.REPR}
                  />
                  <Field
                    title="Précision sur la représentation"
                    content={notice.PREP}
                  />
                  <Field
                    title="Dimensions"
                    content={notice.DIMS}
                  />
                  <Field
                    title="Typologie"
                    content={notice.TYPO}
                  />
                  <Field
                    title="Etat de conservation"
                    content={notice.ETAT}
                  />
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
                  <Field
                    title="Nature de la protection MH"
                    content={notice.PROT}
                  />
                  <Field
                    title="Date protection"
                    content={notice.DPRO}
                  />
                  <Field
                    title="Précisions sur la protection MH"
                    content={notice.PPRO}
                  />
                  <Field
                    title="Nature de l'acte de protection MH"
                    content={notice.APRO}
                  />
                  <Field
                    title="Eléments protégés MH"
                    content={notice.MHPP}
                  />
                  <Field
                    title="Référence aux objects conservés dans l'édifice"
                    content={notice.REFO}
                  />
                  <Field
                    title="Site, secteur ou zone de protection"
                    content={notice.SITE}
                  />
                  <Field
                    title="Intérêt de l'oeuvre"
                    content={notice.INTE}
                  />
                  <Field
                    title="intérêt oeuvre"
                    content={notice.PINT}
                  />
                  <Field
                    title="Eléments remarquables"
                    content={notice.REMA}
                  />
                  <Field
                    title="Date du label"
                    content={notice.DLAB}
                  />
                  <Field
                    title="Observations"
                    content={notice.OBS}
                  />
                  <Title
                    content="Statut juridique"
                    notice={notice}
                    fields={["STAT", "PSTA", "AFFE", "PAFF", "VISI"]}
                  />
                  <Field
                    title="Statut de la propriété"
                    content={notice.STAT}
                  />
                  <Field
                    title="Précisions sur le statut de la propriété: "
                    content={notice.PSTA}
                  />
                  <Field
                    title="Affectataire"
                    content={notice.AFFE}
                  />
                  <Field
                    title="Précisions sur l'affectataire"
                    content={notice.PAFF}
                  />
                  <Field
                    title="Ouverture au public"
                    content={notice.VISI}
                  />
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
                  <Field
                    title="Date d'enquête"
                    content={notice.DENQ}
                  />
                  <Field title="Crédits" content={notice.COPY} />
                  <Field
                    title="Date de rédaction de la notice"
                    content={notice.DBOR}
                  />
                  <Field
                    title="Noms des rédacteurs de la notice et du dossier"
                    content={notice.NOMS}
                  />
                  <Field
                    title="Cadre de l'étude"
                    content={notice.ETUD}
                  />
                  <Field title="Dossier" content={notice.DOSS} />
                  <Field
                    title="Référence images"
                    content={notice.REFIM}
                  />
                  <Field
                    title="Visite guidé"
                    content={notice.WEB}
                  />
                  <Field
                    title="Référence dans la base Patriarche"
                    content={notice.ARCHEO}
                  />
                  <Field
                    title="Dossier adresse"
                    content={notice.DOSADRS}
                    separator="£"
                  />
                  <Field
                    title="Autres liens"
                    content={notice.IMAGE}
                  />
                </div>
              </Col>
            </Row>
          </Col>
          <Col sm="3">
            <LinkedNotices links={links} />
            <div className="sidebar-section info">
              <h4>A propos de cette notice</h4>
              <hr />
              <div>
                <Field title="Référence" content={notice.REF} />
                <Field
                  title="Date de création"
                  content={notice.DMIS}
                />
                <Field
                  title="Dernière mise à jour"
                  content={notice.DMAJ}
                />
                <Field title="Rédacteur" content={notice.NOMS} />
                <Field
                  title="Crédits photographiques"
                  content={notice.AUTP}
                />
                <Field title="" content={notice.COPY} />
              </div>
              <ContactUs
                contact={notice.CONTACT}
                reference={notice.REF}
              />
            </div>
            <SeeMore notice={notice} />
          </Col>
        </Row>
      </Container>
    );
  }
}

const SeeMore = ({ notice }) => {
  const arr = [];

  if (notice.DOSURL) {
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

const mapStateToProps = (state) => ({
  notice: state.app.notice,
  links: state.app.links
});

const mapDispatchToProps = (dispatch) => ({
  fetchNotice: (ref, withLinks) => {
    dispatch({
      type: "notice/WILL_FETCH",
      ref,
      withLinks,
      base: "merimee",
    });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Merimee);
