import React from "react";
import { connect } from 'react-redux';
import { Row, Col, Container } from "reactstrap";
import Field from "./components/field";
import Helmet from "../../components/Helmet";
import NotFound from "../../components/NotFound";
import LinkedNotices from "./components/LinkedNotices";
import Title from "./components/title";
import Loader from "../../components/loader";
import Header from "./components/header";
import API from "../../services/api";
import ContactUs from "./components/ContactUs";

class Palissy extends React.Component {
  state = {
    error: "",
    loading: false,
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
    const auteur = notice.AUTR? notice.AUTR.join(' ') : '';
    if(notice.CATE && notice.CATE.length === 1) {
      const category = notice.CATE[0];
      if(category.toLowerCase() === "sculpture") {
        return {
          title: title? `${title} - POP` : `${notice.REF} - POP`,
          description: `Découvrez ${title? title : notice.REF}, cette ${category}, réalisée par ${auteur}. Cliquez ici !`,
        }
      }
    }
    return {
      title: title? `${title} - POP` : `${notice.REF} - POP`,
      description: `Découvrez ${title? title : notice.REF}, par ${auteur}. Cliquez ici !`,
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
              externalImages={true}
              images={notice.MEMOIRE}
            />
            <Row>
              <Col sm="12">
                <div className="notice-details">
                  <Title
                    content="Désignation"
                    notice={notice}
                    fields={["DENO", "PDEN", "NART", "APPL", "TICO"]}
                  />
                  <Field
                    title="Dénomination"
                    content={notice.DENO}
                  />
                  <Field
                    title="Précision sur la dénomination"
                    content={notice.PDEN}
                  />
                  <Field title="Numéro" content={notice.NART} />
                  <Field
                    title="Appellation et titre"
                    content={notice.APPL}
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
                      "INSEE",
                      "PLOC",
                      "AIRE",
                      "CANT",
                      "LIEU",
                      "ADRS",
                      "EDIF",
                      "REFA",
                      "IMPL",
                      "EMPL",
                      "DEPL",
                      "VOLS"
                    ]}
                  />
                  <Field title="Région" content={notice.REG} />
                  <Field
                    title="Département"
                    content={notice.DPT}
                  />
                  <Field title="Commune" content={notice.COM} />
                  <Field
                    title="Numéro INSEE de la commune"
                    content={notice.INSEE}
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
                  <Field title="Lieu-dit " content={notice.LIEU} />
                  <Field title="Adresse" content={notice.ADRS} />
                  <Field
                    title="Edifice de conservation"
                    content={notice.EDIF}
                  />
                  <Field
                    title="Référence de l'édifice de conservation"
                    content={notice.REFA}
                  />
                  <Field
                    title="Milieu d'implantation"
                    content={notice.IMPL}
                  />
                  <Field
                    title="Emplacement de l’œuvre dans l’édifice"
                    content={notice.EMPL}
                  />
                  <Field
                    title="Partie déplacée"
                    content={notice.DEPL}
                  />
                  <Field title="Vols" content={notice.VOLS} />

                  <Title
                    content="Description"
                    notice={notice}
                    fields={[
                      "CATE",
                      "STRU",
                      "MATR",
                      "DESC",
                      "REPR",
                      "PREP",
                      "DIMS",
                      "PDIM",
                      "ETAT",
                      "PETA",
                      "INSC",
                      "PINS"
                    ]}
                  />
                  <Field
                    title="Catégorie technique"
                    content={notice.CATE}
                  />
                  <Field
                    title="Structure et typologie"
                    content={notice.STRU}
                  />
                  <Field
                    title="Matériaux et techniques"
                    content={notice.MATR}
                  />
                  <Field
                    title="Commentaire description"
                    content={notice.DESC}
                    separator="£"
                  />
                  <Field
                    title="Représentation"
                    content={notice.REPR}
                    separator="£"
                  />
                  <Field
                    title="Précision sur la représentation"
                    content={notice.PREP}
                  />
                  <Field
                    title="Dimensions"
                    content={notice.DIMS}
                    separator="£"
                  />
                  <Field
                    title="Précisions sur les dimensions"
                    content={notice.PDIM}
                  />
                  <Field
                    title="Etat de conservation"
                    content={notice.ETAT}
                  />
                  <Field
                    title="Précisions sur l’état de conservation"
                    content={notice.PETA}
                  />
                  <Field
                    title="Inscriptions"
                    content={notice.INSC}
                  />
                  <Field
                    title="Précisions sur l’inscription"
                    content={notice.PINS}
                  />
                  <Title
                    content="Historique"
                    notice={notice}
                    fields={[
                      "AUTR",
                      "AFIG",
                      "ATEL",
                      "REFM",
                      "PERS",
                      "EXEC",
                      "ORIG",
                      "STAD",
                      "SCLE",
                      "DATE",
                      "JDAT",
                      "HIST"
                    ]}
                  />
                  <Field
                    title="Auteurs de l'oeuvre"
                    content={notice.AUTR}
                  />
                  <Field
                    title="Auteur de la source figurée"
                    content={notice.AFIG}
                  />
                  <Field title="Atelier" content={notice.ATEL} />
                  <Field
                    title="Référence auteur"
                    content={notice.REFM}
                  />
                  <Field
                    title="Personnalitées"
                    content={notice.PERS}
                  />
                  <Field
                    title="Lieu d’exécution"
                    content={notice.EXEC}
                  />
                  <Field
                    title="Lieu de provenance"
                    content={notice.ORIG}
                  />
                  <Field
                    title="Stade de création"
                    content={notice.STAD}
                  />

                  <Field
                    title="Datation des campagnes principales de construction"
                    content={notice.SCLE}
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
                    title="Commentaire historique"
                    content={notice.HIST}
                    separator="£"
                  />
                  <Title
                    content="Statut juridique et protection"
                    notice={notice}
                    fields={[
                      "STAT",
                      "PROT",
                      "DPRO",
                      "PPRO",
                      "NUMA",
                      "NINV",
                      "OBS",
                      "INTE",
                      "PINT",
                      "ACQU",
                      "EXPO",
                      "BIBL",
                      "SOUR",
                      "PHOTO"
                    ]}
                  />
                  <Field
                    title="Statut de la propriété"
                    content={notice.STAT}
                  />
                  <Field
                    title="Nature de la protection MH"
                    content={notice.PROT}
                  />
                  <Field
                    title="Date de protection"
                    content={notice.DPRO}
                  />
                  <Field
                    title="Précisions sur la protection MH"
                    content={notice.PPRO}
                  />
                  <Field
                    title="Numéro de l’arrêté"
                    content={notice.NUMA}
                  />
                  <Field
                    title="Numéro d’inventaire"
                    content={notice.NINV}
                  />

                  <Field
                    title="Observations"
                    content={notice.OBS}
                  />
                  <Field
                    title="Intérêt de l'oeuvre"
                    content={notice.INTE}
                  />
                  <Field
                    title="Intérêt oeuvre"
                    content={notice.PINT}
                  />
                  <Field
                    title="Acquisition"
                    content={notice.ACQU}
                  />
                  <Field
                    title="Exposition"
                    content={notice.EXPO}
                  />
                  <Field
                    title="Bibliographie"
                    content={notice.BIBL}
                  />
                  <Field title="Sources" content={notice.SOUR} />
                  <Field
                    title="Photographies"
                    content={notice.PHOTO}
                  />

                  <Title
                    content="Références documentaires"
                    notice={notice}
                    fields={[
                      "ETUD",
                      "DOSS",
                      "PART",
                      "REFP",
                      "PARN",
                      "PAPP",
                      "REFE",
                      "DENQ",
                      "DBOR",
                      "RENP",
                      "DOSADRS",
                      "IMAGE",
                      "WEB"
                    ]}
                  />
                  <Field
                    title="Cadre de l'étude"
                    content={notice.ETUD}
                  />
                  <Field title="Dossier" content={notice.DOSS} />
                  <Field
                    title="Parties constituantes"
                    content={notice.PART}
                  />
                  <Field
                    title="Références des parties constituantes étudiées"
                    content={notice.REFP}
                  />
                  <Field
                    title="Parties non étud"
                    content={notice.PARN}
                  />
                  <Field
                    title="Préc. appart."
                    content={notice.PAPP}
                  />
                  <Field
                    title="Référence de l'édifice de conservation"
                    content={notice.REFE}
                  />
                  <Field
                    title="Date d'enquête"
                    content={notice.DENQ}
                  />
                  <Field
                    title="Date de rédaction de la notice"
                    content={notice.DBOR}
                  />
                  <Field
                    title="Lexique noms propres"
                    content={notice.RENP}
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
                  <Field
                    title="Visite guidé"
                    content={notice.WEB}
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
        <a href={notice.DOSURLPDF}>Dossier pdf</a>
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

  //

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
      base: "palissy",
    });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Palissy);
