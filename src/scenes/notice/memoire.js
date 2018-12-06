import React from "react";
import { Row, Col, Container } from "reactstrap";
import Header from "./components/header";
import Field from "./components/field";
import LinkedNotices from "./components/LinkedNotices";
import Title from "./components/title";
import Loader from "../../components/loader";
import API from "../../services/api";
import ContactUs from "./components/ContactUs";
import NotFound from "../../components/NotFound";
import { findCollection } from "./utils";


class Memoire extends React.Component {
  state = {
    notice: null,
    error: "",
    links: null,
    loading: true
  };

  componentDidMount() {
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
    API.getNotice("memoire", ref).then(notice => {
      const arr = [];
      const collection = findCollection(notice.LBASE);
      if (collection) {
        arr.push(API.getNotice(collection, notice.LBASE));
      } else {
        console.log("Cant get notice of ", notice.LBASE);
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
      this.setState({ loading: false, notice });
    });
  }

  render() {
    if (this.state.loading) {
      return <Loader />;
    }

    if (!this.state.notice) {
      return <NotFound />;
    }

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
              images={[this.state.notice.IMG]}
              externalImages={true}
            />
            <Row>
              <Col sm="12">
                <div className="notice-details">
                  <Title
                    content="1. Sujet de la photographie"
                    notice={this.state.notice}
                    fields={[
                      "LOCA",
                      "INSEE",
                      "ADRESSE",
                      "MCGEO",
                      "EDIF",
                      "OBJT",
                      "TICO",
                      "LEG",
                      "TITRE",
                      "THEATRE",
                      "ROLE",
                      "AUTOEU",
                      "SCLE",
                      "DATOEU",
                      "LIEUORIG",
                      "SERIE",
                      "MCL",
                      "SUJET",
                      "MCPER",
                      "AUTOR",
                      "TIREDE",
                      "LIEUCOR",
                      "COTECOR",
                      "AUTG"
                    ]}
                  />
                  <Title
                    content="Localisation"
                    h5={true}
                    notice={this.state.notice}
                    fields={["LOCA", "INSEE", "ADRESSE", "MCGEO"]}
                  />
                  <Field
                    title="Localisation :"
                    content={this.state.notice.LOCA}
                  />
                  <Field
                    title="Code INSEE :"
                    content={this.state.notice.INSEE}
                  />
                  <Field title="Adresse:" content={this.state.notice.ADRESSE} />
                  <Field
                    title="Nom géographique :"
                    content={this.state.notice.MCGEO}
                  />
                  <Title
                    content="Identification"
                    h5={true}
                    notice={this.state.notice}
                    fields={[
                      "EDIF",
                      "OBJT",
                      "TICO",
                      "LEG",
                      "TITRE",
                      "THEATRE",
                      "ROLE",
                      "AUTOEU",
                      "SCLE",
                      "DATOEU",
                      "LIEUORIG",
                      "SERIE",
                      "MCL",
                      "SUJET",
                      "MCPER"
                    ]}
                  />
                  <Field
                    title="Nom édifice :"
                    content={this.state.notice.EDIF}
                  />
                  <Field title="Nom objet :" content={this.state.notice.OBJT} />
                  <Field
                    title="Titre du dossier :"
                    content={this.state.notice.TICO}
                  />

                  <Field title="Légende :" content={this.state.notice.LEG} />
                  <Field title="Titre :" content={this.state.notice.TITRE} />
                  <Field
                    title="Nom de théâtre :"
                    content={this.state.notice.THEATRE}
                  />
                  <Field title="Rôle joué :" content={this.state.notice.ROLE} />
                  <Field
                    title="Auteur de l’œuvre :"
                    content={this.state.notice.AUTOEU}
                  />
                  <Field
                    title="Siècle de l’œuvre :"
                    content={this.state.notice.SCLE}
                  />
                  <Field
                    title="Date de l’œuvre :"
                    content={this.state.notice.DATOEU}
                  />
                  <Field
                    title="Lieu d’origine de l’élément réemployé :"
                    content={this.state.notice.LIEUORIG}
                  />
                  <Field
                    title="Titre de la série :"
                    content={this.state.notice.SERIE}
                  />
                  <Field
                    title="Mots-clés :"
                    content={
                      this.state.notice.MCL + " " + this.state.notice.SUJET
                    }
                  />
                  <Field
                    title="Identité de la personne photographiée :"
                    content={this.state.notice.MCPER}
                  />
                  <Title
                    content="Références des documents reproduits"
                    h5={true}
                    notice={this.state.notice}
                    fields={["AUTOR", "TIREDE", "LIEUCOR", "COTECOR", "AUTG"]}
                  />
                  <Field
                    title="Auteur du document original :"
                    content={this.state.notice.AUTOR}
                  />
                  <Field
                    title="Référence bibliographique ou documentaire :"
                    content={this.state.notice.TIREDE}
                  />
                  <Field
                    title="Lieu de conservation :"
                    content={this.state.notice.LIEUCOR}
                  />
                  <Field
                    title="Cote de conservation :"
                    content={this.state.notice.COTECOR}
                  />
                  <Field
                    title="Auteur de la gravure :"
                    content={this.state.notice.AUTG}
                  />
                </div>
                <div className="notice-details">
                  <Title
                    content="2. Auteur"
                    notice={this.state.notice}
                    fields={["AUTP", "AUTTI"]}
                  />
                  <Field
                    title="Photographe ou dessinateur :"
                    content={this.state.notice.AUTP}
                  />
                  <Field
                    title="Auteur du tirage :"
                    content={this.state.notice.AUTTI}
                  />
                </div>
                <div className="notice-details">
                  <Title
                    content="3. Description de la photographie"
                    notice={this.state.notice}
                    fields={[
                      "TYPDOC",
                      "NUMI",
                      "NUMP",
                      "ANUMP",
                      "NUMAUTP",
                      "NUMTI",
                      "ANUMTI",
                      "REPRO",
                      "NUMG",
                      "NUMOR",
                      "ANUMOR",
                      "RENV",
                      "LIEUCTI",
                      "COTECTI",
                      "PRECOR",
                      "ACQU",
                      "DIFF",
                      "ECH",
                      "TECH",
                      "FORMAT",
                      "TECHTI",
                      "FORMATTI",
                      "TECHOR",
                      "FORMATOR",
                      "MENTIONS",
                      "MENTTI",
                      "SENS",
                      "DATPV",
                      "JDATPV",
                      "DATOR",
                      "PUBLI",
                      "OBS",
                      "OBSTI",
                      "OBSOR"
                    ]}
                  />
                  <Title
                    content="Éléments d’identification"
                    h5={true}
                    notice={this.state.notice}
                    fields={[
                      "TYPDOC",
                      "NUMI",
                      "NUMP",
                      "ANUMP",
                      "NUMAUTP",
                      "NUMTI",
                      "ANUMTI",
                      "REPRO",
                      "NUMG",
                      "NUMOR",
                      "ANUMOR",
                      "RENV",
                      "LIEUCTI",
                      "COTECTI",
                      "PRECOR",
                      "ACQU",
                      "DIFF",
                      "ECH"
                    ]}
                  />
                  <Field
                    title="Catégorie de phototype :"
                    content={this.state.notice.TYPDOC}
                  />

                  <Field
                    title="Numéro du phototype :"
                    content={this.state.notice.NUMI}
                  />
                  <Field
                    title="Numéro du négatif :"
                    content={this.state.notice.NUMP}
                  />
                  <Field
                    title="Ancien numéro du négatif :"
                    content={this.state.notice.ANUMP}
                  />
                  <Field
                    title="Numéro donné par le photographe :"
                    content={this.state.notice.NUMAUTP}
                  />
                  <Field
                    title="Numéro du tirage :"
                    content={this.state.notice.NUMTI}
                  />
                  <Field
                    title="Ancien numéro du tirage :"
                    content={this.state.notice.ANUMTI}
                  />
                  <Field
                    title="Numéro de reproduction :"
                    content={this.state.notice.REPRO}
                  />
                  <Field
                    title="Numéro de la gravure :"
                    content={this.state.notice.NUMG}
                  />
                  <Field
                    title="Numéro de l’original :"
                    content={this.state.notice.NUMOR}
                  />
                  <Field
                    title="Ancien numéro de l’original :"
                    content={this.state.notice.ANUMOR}
                  />
                  <Field
                    title="Phototype(s) en relation :"
                    content={this.state.notice.RENV}
                  />
                  <Field
                    title="Lieu de conservation du tirage :"
                    content={this.state.notice.LIEUCTI}
                  />
                  <Field
                    title="Cote de conservation du tirage :"
                    content={this.state.notice.COTECTI}
                  />
                  <Field
                    title="Précisions sur la conservation de l’original :"
                    content={this.state.notice.PRECOR}
                  />
                  <Field
                    title="Modalité d’entrée :"
                    content={this.state.notice.ACQU}
                  />
                  <Field
                    title="Droits de diffusion :"
                    content={this.state.notice.DIFF}
                  />
                  <Field
                    title="Échelle du graphique :"
                    content={this.state.notice.ECH}
                  />
                  <Title
                    content="Description technique du phototype"
                    h5={true}
                    notice={this.state.notice}
                    fields={[
                      "TECH",
                      "FORMAT",
                      "TECHTI",
                      "FORMATTI",
                      "TECHOR",
                      "FORMATOR",
                      "MENTIONS",
                      "MENTTI",
                      "SENS"
                    ]}
                  />
                  <Field
                    title="Description technique du négatif :"
                    content={this.state.notice.TECH}
                  />
                  <Field
                    title="Format du négatif :"
                    content={this.state.notice.FORMAT}
                  />
                  <Field
                    title="Description technique du tirage :"
                    content={this.state.notice.TECHTI}
                  />
                  <Field
                    title="Format du tirage :"
                    content={this.state.notice.FORMATTI}
                  />
                  <Field
                    title="Description technique de l’original :"
                    content={this.state.notice.TECHOR}
                  />
                  <Field
                    title="Format de l'original :"
                    content={this.state.notice.FORMATOR}
                  />
                  <Field
                    title="Annotations présentes sur le négatif :"
                    content={this.state.notice.MENTIONS}
                  />
                  <Field
                    title="Mentions tirage :"
                    content={this.state.notice.MENTTI}
                  />
                  <Field
                    title="Orientation du phototype :"
                    content={this.state.notice.SENS}
                  />
                  <Title
                    content="Datation et événements liés à l’image"
                    h5={true}
                    notice={this.state.notice}
                    fields={[
                      "DATPV",
                      "JDATPV",
                      "DATOR",
                      "PUBLI",
                      "OBS",
                      "OBSTI",
                      "OBSOR"
                    ]}
                  />
                  <Field
                    title="Date prise vue :"
                    content={this.state.notice.DATPV}
                  />
                  <Field
                    title="Précision sur la date de prise de vue :"
                    content={this.state.notice.JDATPV}
                  />
                  <Field
                    title="Date de l'original :"
                    content={this.state.notice.DATOR}
                  />
                  <Field
                    title="Référence de publication de l’image :"
                    content={this.state.notice.PUBLI}
                  />
                  <Field
                    title="Observations :"
                    content={this.state.notice.OBS}
                  />
                  <Field
                    title="Observations sur le tirage :"
                    content={this.state.notice.OBSTI}
                  />
                  <Field
                    title="Observations sur l’original :"
                    content={this.state.notice.OBSOR}
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
                  title="Date de modification : "
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
  if (!notice.LAUTP) {
    return <div />;
  }

  return (
    <div className="sidebar-section info">
      <h4>Voir aussi</h4>
      <hr />
      <div>
        <p className="field">
          Lien vers la base Autor:
          <span>
            <a href="http://www.mediatheque-patrimoine.culture.gouv.fr/pages/bases/autor_cible.html">
              {notice.LAUTP}
            </a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Memoire;
