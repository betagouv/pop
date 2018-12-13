import React from "react";
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
    notice: null,
    error: "",
    loading: true,
    links: []
  };

  componentDidMount() {
    const { match } = this.props;
    this.load(match.params.ref);
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
    API.getNotice("joconde", ref).then(notice => {
      this.setState({
        loading: false,
        notice
      });
    });
  }

  getMetaDescription = ()=> {
    const titre =  this.state.notice.TICO || this.state.notice.TITR;
    const auteur = this.state.notice.AUTR? this.state.notice.AUTR : '';
    if(this.state.notice.DOMN && this.state.notice.DOMN.length === 1) {
      const category = this.state.notice.DOMN[0];
      if(category.toLowerCase() === "peinture") {
        return `Découvrez ${titre}, cette ${category}, réalisée par ${auteur}. Cliquez ici !`;
      }
    }
    return `Découvrez ${titre}, par ${auteur}. Cliquez ici !`;
  }

  render() {
    if (this.state.loading) {
      return <Loader />;
    }

    if (!this.state.notice) {
      return <NotFound />;
    }

    const description = this.getMetaDescription();
    return (
      <Container className="notice" fluid>
        <Helmet 
            title={`${this.state.notice.TICO || this.state.notice.TITR} - POP`}
            description={description}
        />
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
              images={this.state.notice.IMG}
            />
            <Row>
              <Col sm="12">
                <div className="notice-details">
                  <Title
                    content="Identification du bien culturel"
                    notice={this.state.notice}
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
                    title="N°Inventaire, ancien(s) numéros(s), autres numéros, N° de dépôt :"
                    content={this.state.notice.INV}
                  />
                  <Field
                    title="Domaine (catégorie du bien) :"
                    content={this.state.notice.DOMN}
                  />
                  <Field
                    title="Dénomination du bien : "
                    content={this.state.notice.DENO}
                  />
                  <Field
                    title="Appellation :"
                    content={this.state.notice.APPL}
                  />
                  <Field title="Titre :" content={this.state.notice.TITR} />
                  <Field
                    title="Auteur / exécutant / collecteur :"
                    content={this.state.notice.AUTR}
                  />
                  <Field
                    title="Précisions / auteur / exécutant / collecteur :"
                    content={this.state.notice.PAUT}
                  />
                  <Field title="Ecole :" content={this.state.notice.ECOL} />
                  <Field
                    title="Anciennes attributions :"
                    content={this.state.notice.ATTR}
                  />
                  <Field
                    title="Période de création / exécution :"
                    content={this.state.notice.PERI}
                  />
                  <Field
                    title="Millésime de création / exécution :"
                    content={this.state.notice.MILL}
                  />

                  <Field
                    title="Epoque / style / mouvement :"
                    content={this.state.notice.EPOQ}
                  />
                  <Field
                    title="Période de l’original copié :"
                    content={this.state.notice.PEOC}
                  />
                  <Field
                    title="Matériaux et techniques :"
                    content={this.state.notice.TECH}
                  />
                  <Field title="Mesures :" content={this.state.notice.DIMS} />
                  <Field
                    title="Inscriptions :"
                    content={this.state.notice.INSC}
                  />
                  <Field
                    title="Précisions sur les inscriptions :"
                    content={this.state.notice.PINS}
                  />
                  <Field
                    title="Onomastique :"
                    content={this.state.notice.ONOM}
                  />
                  <Field
                    title="Description :"
                    content={this.state.notice.DESC}
                  />
                  <Field
                    title="Etat du bien :"
                    content={this.state.notice.ETAT}
                  />
                  <Field
                    title="Sujet représenté :"
                    content={this.state.notice.REPR}
                    separator="#"
                  />
                  <Field
                    title="Précisions sur le sujet représenté :"
                    content={this.state.notice.PREP}
                  />
                  <Field
                    title="Date de la représentation :"
                    content={this.state.notice.DREP}
                  />
                  <Field
                    title="Source de la représentation :"
                    content={this.state.notice.SREP}
                  />
                  <Title
                    content="Contexte historique"
                    notice={this.state.notice}
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
                  <Field title="Genèse :" content={this.state.notice.GENE} />
                  <Field
                    title="Historique – Objets associés :"
                    content={this.state.notice.HIST}
                  />
                  <Field
                    title="Lieu de création / d’exécution / d’utilisation :"
                    content={this.state.notice.LIEUX}
                  />
                  <Field
                    title="Précisions sur le lieu de création / d’exécution / d’utilisation :"
                    content={this.state.notice.PLIEUX}
                  />
                  <Field
                    title="Géographie historique :"
                    content={this.state.notice.GEOHI}
                  />
                  <Field
                    title="Utilisation / Destination :"
                    content={this.state.notice.UTIL}
                  />
                  <Field
                    title="Précisions sur l’utilisation :"
                    content={this.state.notice.PUTI}
                  />
                  <Field
                    title="Période d’utilisation :"
                    content={this.state.notice.PERU}
                  />
                  <Field
                    title="Millésime d’utilisation :"
                    content={this.state.notice.MILU}
                  />
                  <Field
                    title="Découverte / collecte :"
                    content={this.state.notice.DECV}
                  />
                  <Field
                    title="Précisions sur la découverte / collecte / récolte :"
                    content={this.state.notice.PDEC}
                  />
                  <Field
                    title="Numéro de site :"
                    content={this.state.notice.NSDA}
                  />
                  <Title
                    content="Informations juridiques"
                    notice={this.state.notice}
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
                    title="Statut juridique :"
                    content={this.state.notice.STAT}
                  />
                  <Field
                    title="Date d’acquisition :"
                    content={this.state.notice.DACQ}
                  />
                  <Field
                    title="Ancienne appartenance :"
                    content={this.state.notice.APTN}
                    separator="#"
                  />
                  <Field
                    title="Dépôt / établissement dépositaire :"
                    content={this.state.notice.DEPO}
                  />
                  <Field
                    title="Date de dépôt / changement d’affectation :"
                    content={this.state.notice.DDPT}
                  />

                  <Field
                    title="Ancien dépôt / changement d’affectation :"
                    content={this.state.notice.ADPT}
                  />
                  <Field
                    title="Localisation :"
                    content={this.state.notice.LOCA}
                  />
                  <Title
                    content="Informations complémentaires"
                    notice={this.state.notice}
                    fields={["COMM", "EXPO", "BIBL"]}
                  />
                  <Field
                    title="Commentaires :"
                    content={this.state.notice.COMM}
                    separator="#"
                  />
                  <Field
                    title="Exposition :"
                    content={this.state.notice.EXPO}
                  />
                  <Field
                    title="Bibliographie :"
                    content={this.state.notice.BIBL}
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
                <Field title="Référence : " content={this.state.notice.REF} />
                <Field
                  title="Date de création : "
                  content={this.state.notice.DMIS}
                />
                <Field
                  title="Dernière mise à jour : "
                  content={this.state.notice.DMAJ}
                />
                <Field
                  title="Crédits photographiques : "
                  content={this.state.notice.AUTP}
                />
                <Field
                  title="Auteur de l'oeuvre ou de l'original : "
                  content={this.state.notice.AUTOR}
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

  if (notice.LVID) {
    arr.push(
      <Field title="Lien Vidéo :" content={notice.LVID} key={`notice.LVID`} />
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

export default Joconde;
