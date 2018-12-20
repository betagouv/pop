import React from "react";
import { Row, Col, Container } from "reactstrap";
import Field from "./components/field";
import Header from "./components/header";
import Loader from "../../components/loader";
import API from "../../services/api";
import ContactUs from "./components/ContactUs";
import NotFound from "../../components/NotFound";
import Helmet from "../../components/Helmet";

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

  getMetaDescription = ()=> {
    const titre =  this.state.notice.TICO || this.state.notice.TITR;
    const auteur = this.state.notice.AUTR? this.state.notice.AUTR.join(' ') : '';
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
            title={`${this.state.notice.TICO || this.state.notice.TITR} - ${this.state.notice.AUTR? this.state.notice.AUTR.join(' ') : ''} - POP`}
            description={description}
        />
        <Row className="top-section">
          <Col>
            <h1 className="heading">
              {this.state.notice.TICO || this.state.notice.TITR}
            </h1>
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
                    title="N°Inventaire"
                    content={this.state.notice.INV}
                    join=" ; "
                  />
                  <Field
                    title="Domaine (catégorie du bien)"
                    content={this.state.notice.DOMN}
                    join=" ; "
                  />
                  <Field
                    title="Auteur"
                    content={this.state.notice.AUTR}
                    separator="#"
                    join=" ; "
                  />
                  <Field
                    title="Precisions auteur"
                    content={this.state.notice.PAUT}
                    join=" ; "
                  />
                  <Field
                    title="Anciennes attributions"
                    content={this.state.notice.ATTR}
                    join=" ; "
                    separator="#"
                  />
                  <Field
                    title="Ancienne attribution"
                    content={this.state.notice.AATT}
                    join=" ; "
                  />
                  <Field
                    title="Ecole"
                    content={this.state.notice.ECOL}
                    separator="#"
                    join=" ; "
                  />
                  <Field
                    title="Titre"
                    content={this.state.notice.TITR}
                    join=" ; "
                  />
                  <Field
                    title="Ancien titre"
                    content={this.state.notice.ATIT}
                    join=" ; "
                  />
                  <Field
                    title="Précision titre"
                    content={this.state.notice.PTIT}
                    join=" ; "
                  />
                  <Field
                    title="Autre titre"
                    content={this.state.notice.AUTI}
                    join=" ; "
                  />
                  <Field
                    title="Dénomination"
                    content={this.state.notice.DENO}
                    join=" ; "
                  />
                  <Field
                    title="Millénaire"
                    content={this.state.notice.MILL}
                    join=" ; "
                  />
                  <Field
                    title="Siècle"
                    content={this.state.notice.SCLE}
                    join=" ; "
                  />
                  <Field
                    title="Style"
                    content={this.state.notice.STYL}
                    join=" ; "
                  />
                  <Field
                    title="Technique"
                    content={this.state.notice.TECH}
                    separator="#"
                    join=" ; "
                  />
                  <Field
                    title="Dimensions"
                    content={this.state.notice.DIMS}
                    join=" ; "
                  />
                  <Field
                    title="Description"
                    content={this.state.notice.DESC}
                    join=" ; "
                    separator="#"
                  />
                  <Field
                    title="Inscriptions"
                    content={this.state.notice.INSC}
                    join=" ; "
                    separator="#"
                  />
                  <Field
                    title="Genèse"
                    content={this.state.notice.GENE}
                    separator="#"
                    join=" ; "
                  />
                  <Field
                    title="Historique"
                    content={this.state.notice.HIST}
                    separator="#"
                    join=" ; "
                  />
                  <Field
                    title="Provenance"
                    content={this.state.notice.PROV}
                    join=" ; "
                  />
                  <Field
                    title="Commentaire"
                    content={this.state.notice.COMM}
                    separator="#"
                    join=" ; "
                  />
                  <Field
                    title="Catégorie"
                    content={this.state.notice.CATE}
                    join=" ; "
                  />
                  <Field
                    title="Observations"
                    content={this.state.notice.OBSE}
                    separator="#"
                    join=" ; "
                  />
                  <Field
                    title="Autres numéros"
                    content={this.state.notice.NUMS}
                    separator="#"
                    join=" ; "
                  />
                  <Field
                    title="Marquages"
                    content={this.state.notice.MARQ}
                    separator="#"
                    join=" ; "
                  />
                  <Field
                    title="Localisation"
                    content={this.state.notice.LOCA}
                    join=" ; "
                  />
                  <Field
                    title="Etablissement affectataire qui existe dans d’autres bases"
                    content={this.state.notice.AFFE}
                    join=" ; "
                  />
                  <Field
                    title="Expositions"
                    content={this.state.notice.EXPO}
                    separator="#"
                    join=" ; "
                  />
                  <Field
                    title="Bibliographie"
                    content={this.state.notice.BIBL}
                    separator="#"
                    join=" ; "
                  />
                  <Field
                    title="Notes"
                    content={this.state.notice.NOTE}
                    separator="#"
                    join=" ; "
                  />
                  <Field
                    title="Résumé"
                    content={this.state.notice.RESUME}
                    join=" ; "
                  />
                  <Field
                    title="Etat de conservation"
                    content={this.state.notice.ETAT}
                    join=" ; "
                  />
                  <Field
                    title="OEuvres liées, ensemble"
                    content={this.state.notice.SUITE}
                    join=" ; "
                  />
                  <Field
                    title="Représentation"
                    content={this.state.notice.REPR}
                    join=" ; "
                  />
                  <Field
                    title="Sujet de la représentation (source littéraire ou musicale)"
                    content={this.state.notice.SREP}
                    join=" ; "
                  />
                  <Field
                    title="Précisions sur la représentation."
                    content={this.state.notice.PREP}
                    join=" ; "
                  />
                  <Field
                    title="Date de la représentation"
                    content={this.state.notice.DREP}
                    join=" ; "
                  />
                  <Field
                    title="Date mise à jour"
                    content={this.state.notice.DMAJ}
                    join=" ; "
                  />

                  <Field
                    title="Droits de copie photo"
                    content={this.state.notice.PHOT}
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
                <Field title="Référence" content={this.state.notice.REF} />
                <Field
                  title="Dernière mise à jour"
                  content={this.state.notice.DMAJ}
                />
                <Field
                  title="Rédacteur"
                  content={this.state.notice.NOMS}
                  join=" ; "
                />
                <Field
                  title="Crédits photographiques"
                  content={this.state.notice.AUTP}
                  join=" ; "
                />
              </div>
              <ContactUs
                contact={this.state.notice.CONTACT}
                reference={this.state.notice.REF}
              />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Mnr;
