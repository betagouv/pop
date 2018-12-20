import React from "react";
import { connect } from 'react-redux';
import { Row, Col, Container } from "reactstrap";
import LinkedNotices from "./components/LinkedNotices";
import Field from "./components/field";
import Loader from "../../components/loader";
import Title from "./components/title";
import API from "../../services/api";
import Helmet from "../../components/Helmet";
import NotFound from "../../components/NotFound";
import Header from "./components/header";
import ContactUs from "./components/ContactUs";

class Joconde extends React.Component {
  state = {
    loading: false,
    links: []
  };

  componentDidMount() {
    const { match, fetchNotice, notice } = this.props;
    if(notice === null) {
      this.setState({ loading: true });
      fetchNotice(match.params.ref, false);
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
    const auteur = notice.AUTR? notice.AUTR : '';
    if(notice.DOMN && notice.DOMN.length === 1) {
      const category = notice.DOMN[0];
      if(category.toLowerCase() === "peinture") {
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

    const { notice } = this.props;
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
              images={notice.IMG}
            />
            <Row>
              <Col sm="12">
                <div className="notice-details">
                  <Title
                    content="Identification du bien culturel"
                    notice={notice}
                    fields={[
                      "INV",
                      "DOMN",
                      "DENO",
                      "APPL",
                      "TITR",
                      "AUTR",
                      "PAUT",
                      "ECOL",
                      "ATTR",
                      "PERI",
                      "MILL",
                      "EPOQ",
                      "PEOC",
                      "TECH",
                      "DIMS",
                      "INSC",
                      "PINS",
                      "ONOM",
                      "DESC",
                      "ETAT",
                      "REPR",
                      "PREP",
                      "DREP",
                      "SREP"
                    ]}
                  />

                  <Field
                    title="N°Inventaire, ancien(s) numéros(s), autres numéros, N° de dépôt"
                    content={notice.INV}
                  />
                  <Field
                    title="Domaine (catégorie du bien)"
                    content={notice.DOMN}
                  />
                  <Field
                    title="Dénomination du bien"
                    content={notice.DENO}
                  />
                  <Field
                    title="Appellation"
                    content={notice.APPL}
                  />
                  <Field title="Titre" content={notice.TITR} />
                  <Field
                    title="Auteur / exécutant / collecteur"
                    content={notice.AUTR}
                  />
                  <Field
                    title="Précisions / auteur / exécutant / collecteur"
                    content={notice.PAUT}
                  />
                  <Field title="Ecole" content={notice.ECOL} />
                  <Field
                    title="Anciennes attributions"
                    content={notice.ATTR}
                  />
                  <Field
                    title="Période de création / exécution"
                    content={notice.PERI}
                  />
                  <Field
                    title="Millésime de création / exécution"
                    content={notice.MILL}
                  />

                  <Field
                    title="Epoque / style / mouvement"
                    content={notice.EPOQ}
                  />
                  <Field
                    title="Période de l’original copié"
                    content={notice.PEOC}
                  />
                  <Field
                    title="Matériaux et techniques"
                    content={notice.TECH}
                  />
                  <Field title="Mesures" content={notice.DIMS} />
                  <Field
                    title="Inscriptions"
                    content={notice.INSC}
                  />
                  <Field
                    title="Précisions sur les inscriptions"
                    content={notice.PINS}
                  />
                  <Field
                    title="Onomastique"
                    content={notice.ONOM}
                  />
                  <Field
                    title="Description"
                    content={notice.DESC}
                  />
                  <Field
                    title="Etat du bien"
                    content={notice.ETAT}
                  />
                  <Field
                    title="Sujet représenté"
                    content={notice.REPR}
                    separator="#"
                  />
                  <Field
                    title="Précisions sur le sujet représenté"
                    content={notice.PREP}
                  />
                  <Field
                    title="Date de la représentation"
                    content={notice.DREP}
                  />
                  <Field
                    title="Source de la représentation"
                    content={notice.SREP}
                  />
                  <Title
                    content="Contexte historique"
                    notice={notice}
                    fields={[
                      "GENE",
                      "HIST",
                      "LIEUX",
                      "PLIEUX",
                      "GEOHI",
                      "UTIL",
                      "PUTI",
                      "PERU",
                      "MILU",
                      "DECV",
                      "PDEC",
                      "NSDA"
                    ]}
                  />
                  <Field title="Genèse" content={notice.GENE} />
                  <Field
                    title="Historique – Objets associés"
                    content={notice.HIST}
                  />
                  <Field
                    title="Lieu de création / d’exécution / d’utilisation"
                    content={notice.LIEUX}
                  />
                  <Field
                    title="Précisions sur le lieu de création / d’exécution / d’utilisation"
                    content={notice.PLIEUX}
                  />
                  <Field
                    title="Géographie historique"
                    content={notice.GEOHI}
                  />
                  <Field
                    title="Utilisation / Destination"
                    content={notice.UTIL}
                  />
                  <Field
                    title="Précisions sur l’utilisation"
                    content={notice.PUTI}
                  />
                  <Field
                    title="Période d’utilisation"
                    content={notice.PERU}
                  />
                  <Field
                    title="Millésime d’utilisation"
                    content={notice.MILU}
                  />
                  <Field
                    title="Découverte / collecte"
                    content={notice.DECV}
                  />
                  <Field
                    title="Précisions sur la découverte / collecte / récolte"
                    content={notice.PDEC}
                  />
                  <Field
                    title="Numéro de site"
                    content={notice.NSDA}
                  />
                  <Title
                    content="Informations juridiques"
                    notice={notice}
                    fields={[
                      "STAT",
                      "DACQ",
                      "APTN",
                      "DEPO",
                      "DDPT",
                      "ADPT",
                      "LOCA"
                    ]}
                  />
                  <Field
                    title="Statut juridique"
                    content={notice.STAT}
                  />
                  <Field
                    title="Date d’acquisition"
                    content={notice.DACQ}
                  />
                  <Field
                    title="Ancienne appartenance"
                    content={notice.APTN}
                    separator="#"
                  />
                  <Field
                    title="Dépôt / établissement dépositaire"
                    content={notice.DEPO}
                  />
                  <Field
                    title="Date de dépôt / changement d’affectation"
                    content={notice.DDPT}
                  />

                  <Field
                    title="Ancien dépôt / changement d’affectation"
                    content={notice.ADPT}
                  />
                  <Field
                    title="Localisation"
                    content={notice.LOCA}
                  />
                  <Title
                    content="Informations complémentaires"
                    notice={notice}
                    fields={["COMM", "EXPO", "BIBL"]}
                  />
                  <Field
                    title="Commentaires"
                    content={notice.COMM}
                    separator="#"
                  />
                  <Field
                    title="Exposition"
                    content={notice.EXPO}
                  />
                  <Field
                    title="Bibliographie"
                    content={notice.BIBL}
                    separator="#"
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
                <Field title="Référence" content={notice.REF} />
                <Field
                  title="Date de création"
                  content={notice.DMIS}
                />
                <Field
                  title="Dernière mise à jour"
                  content={notice.DMAJ}
                />
                <Field
                  title="Crédits photographiques"
                  content={notice.AUTP}
                />
                <Field
                  title="Auteur de l'oeuvre ou de l'original"
                  content={notice.AUTOR}
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

  if (notice.LVID) {
    arr.push(
      <Field title="Lien Vidéo" content={notice.LVID} key={`notice.LVID`} />
    );
  }

  if (notice.WWW) {
    arr.push(
      <p className="field" key={`notice.WWW`}>
        Site complémentaire:
        <span style={{ width: "100%" }}>
          <a href={notice.WWW}>{notice.WWW}</a>
        </span>
      </p>
    );
  }

  if (notice.MUSEO) {
    arr.push(
      <p className="field" key={`notice.MUSEO`}>
        Lien vers la base MUSEOFILE :
        <span style={{ width: "100%" }}>
          <a
            href={`http://www2.culture.gouv.fr/public/mistral/museo_fr?ACTION=CHERCHER&FIELD_98=REF&VALUE_98=${
              notice.MUSEO
            }`}
            target="_blank"
          >
            {notice.MUSEO}
          </a>
        </span>
      </p>
    );
  }

  if (!arr.length) {
    return <div />;
  }

  return (
    <div className="sidebar-section info">
      <h4>Voir aussi</h4>
      <hr />
      <div>{arr}</div>
    </div>
  );
};

//http://www2.culture.gouv.fr/public/mistral/museo_fr?ACTION=CHERCHER&FIELD_98=REF&VALUE_98=M5027


const mapStateToProps = (state) => ({
  notice: state.app.notice
});

const mapDispatchToProps = (dispatch) => ({
  fetchNotice: (ref, withLinks) => {
    dispatch({
      type: "notice/WILL_FETCH",
      ref,
      withLinks,
      base: "joconde",
    });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Joconde);
