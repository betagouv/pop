import React from "react";
import { Row, Col, Container } from "reactstrap";
import Field from "./components/field";
import Header from "./components/header";
import Loader from "../../components/loader";
import API from "../../services/api";
import ContactUs from "./components/ContactUs";
import NotFound from "../../components/NotFound";
import Helmet from "../../components/Helmet";
import { schema } from "./utils.js";

import "./index.css";

class Mnr extends React.Component {
  state = {
    notice: null,
    error: "",
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
    API.getNotice("mnr", ref).then(notice => {
      this.setState({ loading: false, notice });
    });
  }

  getMetaDescription = () => {
    const titre = this.state.notice.TICO || this.state.notice.TITR;
    const auteur = this.state.notice.AUTR
      ? this.state.notice.AUTR.join(" ")
      : "";
    if (this.state.notice.DOMN && this.state.notice.DOMN.length === 1) {
      const category = this.state.notice.DOMN[0];
      if (category.toLowerCase() === "peinture") {
        return `Découvrez ${titre}, cette ${category}, réalisée par ${auteur}. Cliquez ici !`;
      }
    }
    return `Découvrez ${titre}, par ${auteur}. Cliquez ici !`;
  };

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
      name: notice.TITR,
      created_at: notice.SCLE.length ? notice.SCLE[0] : "",
      artform: notice.DOM,
      image: notice.VIDEO.length
        ? `https://s3.eu-west-3.amazonaws.com/pop-phototeque/${
            notice.VIDEO[0]
          }`
        : "",
      description: notice.DESC,
      artMedium: notice.TECH.join(", "),
      creator: notice.AUTR,
      comment: notice.HIST,
      contentLocation: notice.LOCA
    };
    return (
      <Container className="notice" fluid>
        <Helmet
          title={`${notice.TICO || notice.TITR} - ${
            notice.AUTR ? notice.AUTR.join(" ") : ""
          } - POP`}
          description={description}
          schema={schema(obj)}
        />
        <Row className="top-section">
          <Col>
            <h1 className="heading">{notice.TICO || notice.TITR}</h1>
          </Col>
        </Row>
        <Row>
          <Col sm="9">
            <Header
              notice={notice}
              externalImages={false}
              images={notice.VIDEO}
            />
            <Row>
              <Col className="image" sm="12">
                <div className="notice-details">
                  <Field title="N°Inventaire" content={notice.INV} join=" ; " />
                  <Field
                    title="Domaine (catégorie du bien)"
                    content={notice.DOMN}
                    join=" ; "
                  />
                  <Field
                    title="Auteur"
                    content={notice.AUTR}
                    separator="#"
                    join=" ; "
                  />
                  <Field
                    title="Precisions auteur"
                    content={notice.PAUT}
                    join=" ; "
                  />
                  <Field
                    title="Anciennes attributions"
                    content={notice.ATTR}
                    join=" ; "
                    separator="#"
                  />
                  <Field
                    title="Ancienne attribution"
                    content={notice.AATT}
                    join=" ; "
                  />
                  <Field
                    title="Ecole"
                    content={notice.ECOL}
                    separator="#"
                    join=" ; "
                  />
                  <Field title="Titre" content={notice.TITR} join=" ; " />
                  <Field
                    title="Ancien titre"
                    content={notice.ATIT}
                    join=" ; "
                  />
                  <Field
                    title="Précision titre"
                    content={notice.PTIT}
                    join=" ; "
                  />
                  <Field title="Autre titre" content={notice.AUTI} join=" ; " />
                  <Field
                    title="Dénomination"
                    content={notice.DENO}
                    join=" ; "
                  />
                  <Field title="Millénaire" content={notice.MILL} join=" ; " />
                  <Field title="Siècle" content={notice.SCLE} join=" ; " />
                  <Field title="Style" content={notice.STYL} join=" ; " />
                  <Field
                    title="Technique"
                    content={notice.TECH}
                    separator="#"
                    join=" ; "
                  />
                  <Field title="Dimensions" content={notice.DIMS} join=" ; " />
                  <Field
                    title="Description"
                    content={notice.DESC}
                    join=" ; "
                    separator="#"
                  />
                  <Field
                    title="Inscriptions"
                    content={notice.INSC}
                    join=" ; "
                    separator="#"
                  />
                  <Field
                    title="Genèse"
                    content={notice.GENE}
                    separator="#"
                    join=" ; "
                  />
                  <Field
                    title="Historique"
                    content={notice.HIST}
                    separator="#"
                    join=" ; "
                  />
                  <Field title="Provenance" content={notice.PROV} join=" ; " />
                  <Field
                    title="Commentaire"
                    content={notice.COMM}
                    separator="#"
                    join=" ; "
                  />
                  <Field title="Catégorie" content={notice.CATE} join=" ; " />
                  <Field
                    title="Observations"
                    content={notice.OBSE}
                    separator="#"
                    join=" ; "
                  />
                  <Field
                    title="Autres numéros"
                    content={notice.NUMS}
                    separator="#"
                    join=" ; "
                  />
                  <Field
                    title="Marquages"
                    content={notice.MARQ}
                    separator="#"
                    join=" ; "
                  />
                  <Field
                    title="Localisation"
                    content={notice.LOCA}
                    join=" ; "
                  />
                  <Field
                    title="Etablissement affectataire qui existe dans d’autres bases"
                    content={notice.AFFE}
                    join=" ; "
                  />
                  <Field
                    title="Expositions"
                    content={notice.EXPO}
                    separator="#"
                    join=" ; "
                  />
                  <Field
                    title="Bibliographie"
                    content={notice.BIBL}
                    separator="#"
                    join=" ; "
                  />
                  <Field
                    title="Notes"
                    content={notice.NOTE}
                    separator="#"
                    join=" ; "
                  />
                  <Field title="Résumé" content={notice.RESUME} join=" ; " />
                  <Field
                    title="Etat de conservation"
                    content={notice.ETAT}
                    join=" ; "
                  />
                  <Field
                    title="OEuvres liées, ensemble"
                    content={notice.SUITE}
                    join=" ; "
                  />
                  <Field
                    title="Représentation"
                    content={notice.REPR}
                    join=" ; "
                  />
                  <Field
                    title="Sujet de la représentation (source littéraire ou musicale)"
                    content={notice.SREP}
                    join=" ; "
                  />
                  <Field
                    title="Précisions sur la représentation."
                    content={notice.PREP}
                    join=" ; "
                  />
                  <Field
                    title="Date de la représentation"
                    content={notice.DREP}
                    join=" ; "
                  />
                  <Field
                    title="Date mise à jour"
                    content={notice.DMAJ}
                    join=" ; "
                  />

                  <Field
                    title="Droits de copie photo"
                    content={notice.PHOT}
                    separator="#"
                    join=" ; "
                  />
                </div>
              </Col>
            </Row>
          </Col>
          <Col sm="3">
            <div className="sidebar-section info">
              <h4>A propos de cette notice</h4>
              <hr />
              <div>
                <Field title="Référence" content={notice.REF} />
                <Field title="Dernière mise à jour" content={notice.DMAJ} />
                <Field title="Rédacteur" content={notice.NOMS} join=" ; " />
                <Field
                  title="Crédits photographiques"
                  content={notice.AUTP}
                  join=" ; "
                />
              </div>
              <ContactUs
                contact={notice.CONTACT || "francoise.gaborit@culture.gouv.fr"}
                reference={notice.REF}
              />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Mnr;
