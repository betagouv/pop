import React from "react";
import { Row, Col, Container } from "reactstrap";
import Field from "./components/field";
import Header from "./components/header";
import Loader from "../../components/loader";
import API from "../../services/api";
import NotFound from "./components/not-found";

import "./index.css";

class Notice extends React.Component {
  state = {
    notice: null,
    error: "",
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
    API.getNotice("mnr", ref).then(notice => {
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
          {/* <Col sm="4">
            <div
              className="back notice-btn"
              onClick={() => this.props.history.goBack()}
            >
              Revenir à la recherche
            </div>
          </Col> */}
          <Col>
            <h1 className="heading">{this.state.notice.TICO || this.state.notice.TITR}</h1>
          </Col>
        </Row>
        <Row>
          <Col sm="9">
            <Header
              notice={this.state.notice}
              externalImages={false}
              images={this.state.notice.VIDEO}
            />
            <Row>
              <Col className="image" sm="12">
                <div className="notice-details">
                  <Field
                    title="N°Inventaire, ancien(s) numéros(s), autres numéros, N° de dépôt :"
                    content={this.state.notice.INV}
                  />
                  <Field
                    title="Domaine (catégorie du bien) :"
                    content={this.state.notice.DOMN}
                  />
                  <Field
                    title="Auteur / exécutant / collecteur :"
                    content={this.state.notice.AUTR}
                  />
                  <Field
                    title="Precisions auteur :"
                    content={this.state.notice.PAUT}
                  />
                  <Field
                    title="Anciennes attributions :"
                    content={this.state.notice.ATTR}
                  />
                  <Field
                    title="Ancienne attribution :"
                    content={this.state.notice.AATT}
                  />
                  <Field title="Ecole :" content={this.state.notice.ECOL} />
                  <Field title="Titre :" content={this.state.notice.TITR} />
                  <Field
                    title="Ancien titre :"
                    content={this.state.notice.ATIT}
                  />
                  <Field
                    title="Précision titre :"
                    content={this.state.notice.PTIT}
                  />
                  <Field
                    title="Autre titre :"
                    content={this.state.notice.AUTI}
                  />
                  <Field
                    title="Dénomination :"
                    content={this.state.notice.DENO}
                  />
                  <Field
                    title="Millénaire :"
                    content={this.state.notice.MILL}
                  />
                  <Field title="Siècle :" content={this.state.notice.SCLE} />
                  <Field title="Style :" content={this.state.notice.STYL} />
                  <Field title="Technique :" content={this.state.notice.TECH} />
                  <Field
                    title="Dimensions :"
                    content={this.state.notice.DIMS}
                  />
                  <Field
                    title="Description :"
                    content={this.state.notice.DESC}
                    separator="#"
                  />
                  <Field
                    title="Inscriptions :"
                    content={this.state.notice.INSC}
                  />
                  <Field title="Genèse :" content={this.state.notice.GENE} />
                  <Field
                    title="Historique :"
                    content={this.state.notice.HIST}
                    separator="#"
                  />
                  <Field
                    title="Provenance :"
                    content={this.state.notice.PROV}
                  />
                  <Field
                    title="Commentaire :"
                    content={this.state.notice.COMM}
                  />
                  <Field title="Catégorie :" content={this.state.notice.CATE} />
                  <Field
                    title="Observations :"
                    content={this.state.notice.OBSE}
                  />
                  <Field
                    title="Autres numéros :"
                    content={this.state.notice.NUMS}
                  />
                  <Field
                    title="Marquages :"
                    content={this.state.notice.MARQ}
                    separator="#"
                  />
                  <Field
                    title="Localisation :"
                    content={this.state.notice.LOCA}
                  />
                  <Field
                    title="Etablissement affectataire qui existe dans d’autres bases :"
                    content={this.state.notice.AFFE}
                  />
                  <Field
                    title="Expositions :"
                    content={this.state.notice.EXPO}
                    separator="#"
                  />
                  <Field
                    title="Bibliographie :"
                    content={this.state.notice.BIBL}
                    separator="#"
                  />
                  <Field title="Notes :" content={this.state.notice.NOTE} />
                  <Field title="Résumé :" content={this.state.notice.RESUME} />
                  <Field
                    title="Etat de conservation :"
                    content={this.state.notice.ETAT}
                  />
                  <Field
                    title="OEuvres liées, ensemble :"
                    content={this.state.notice.SUITE}
                  />
                  <Field
                    title="Représentation :"
                    content={this.state.notice.REPR}
                  />
                  <Field
                    title="Sujet de la représentation (source littéraire ou musicale) :"
                    content={this.state.notice.SREP}
                  />
                  <Field
                    title="Précisions sur la représentation. :"
                    content={this.state.notice.PREP}
                  />
                  <Field
                    title="Date de la représentation :"
                    content={this.state.notice.DREP}
                  />
                  <Field
                    title="Date mise à jour :"
                    content={this.state.notice.DMAJ}
                  />

                  <Field
                    title="Droits de copie photo :"
                    content={this.state.notice.PHOT}
                    separator="#"
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
                <Field title="Référence : " content={this.state.notice.REF} />
                <Field
                  title="Dernière mise à jour : "
                  content={this.state.notice.DMAJ}
                />
                <Field title="Rédacteur : " content={this.state.notice.NOMS} />
                <Field
                  title="Crédits photographiques : "
                  content={this.state.notice.AUTP}
                />
              </div>
              <a
                href={`mailto:${
                  this.state.notice.CONTACT
                }?subject=Demande à propos de la notice n°${
                  this.state.notice.REF
                }`}
                className="notice-btn"
              >
                Contactez-nous
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Notice;
