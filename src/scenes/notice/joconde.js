import React from "react";
import { Row, Col, Container, Button, Form, Tooltip } from "reactstrap";
import { reduxForm } from "redux-form";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";
import { Mapping } from "pop-shared";

import Field from "./components/field.js";
import FieldInput from "./components/fieldInput.js";
import FieldTags from "./components/fieldTags.js";
import FieldImages from "./components/fieldImages";
import Section from "./components/section.js";
import Map from "./components/map.js";

import Loader from "../../components/Loader";
import API from "../../services/api";

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
    API.getNotice("joconde", ref).then(notice => {
      if (!notice) {
        this.setState({
          loading: false,
          error: `Impossible de charger la notice ${ref}`
        });
        return;
      }
      console.log("NOTICE", notice);
      this.props.initialize(notice);
      // As a "producteur", I can edit if "museofile" matches with notice.
      const editable =
        this.props.canUpdate &&
        (this.props.user.role === "administrateur" ||
          notice.MUSEOFILE === this.props.museofile);
      this.setState({ loading: false, notice, editable });
    });
  }

  delete() {
    const ref = this.props.match.params.ref;
    const confirmText =
      `Vous êtes sur le point de supprimer la notice REF ${ref}. ` +
      `Êtes-vous certain·e de vouloir continuer ?`;
    const toastrConfirmOptions = {
      onOk: () => {
        API.deleteNotice("joconde", ref).then(() => {
          toastr.success(
            "Notice supprimée",
            "La modification sera visible dans 1 à 5 min en diffusion"
          );
        });
      }
    };
    toastr.confirm(confirmText, toastrConfirmOptions);
  }

  onSubmit(values) {
    this.setState({ saving: true });
    API.updateNotice(this.state.notice.REF, "joconde", values).then(e => {
      toastr.success(
        "Modification enregistrée",
        "La modification sera visible dans 1 à 5 min en diffusion"
      );
      this.setState({ saving: false });
    });
  }

  render() {
    if (this.state.loading) {
      return <Loader />;
    }

    if (this.state.error) {
      return <div className="error">{this.state.error}</div>;
    }

    return (
      <Container className="notice" fluid>
        <Form
          onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}
          className="main-body"
        >
          <Row>
            <div className="back" onClick={() => this.props.history.goBack()}>
              Retour
            </div>
          </Row>
          <Row>
            <Col className="image" sm={6}>
              <FieldImages name="IMG" disabled={!this.state.editable} />
            </Col>
            <Col className="image" sm={6}>
              <Map notice={this.state.notice} />
            </Col>
          </Row>
          <Section
            title="IDENTIFICATION DU BIEN MUSEAL"
            icon={require("../../assets/info.png")}
            color="#FF7676"
          >
            <Col sm={6}>
              <CustomField name="INV" disabled={!this.state.editable} />
              <CustomField name="DOMN" disabled={!this.state.editable} />
              <FieldTags
                title="Dénomination du bien (DENO) : "
                name="DENO"
                thesaurus="http://data.culture.fr/thesaurus/resource/ark:/67717/T96"
                disabled={!this.state.editable}
              />
              <FieldTags
                title="Appellation (APPL) :"
                name="APPL"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Titre (TITR) :"
                name="TITR"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Auteur /exécutant / collecteur (AUTR) :"
                name="AUTR"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Précisions /auteur / exécutant / collecteur (PAUT) :"
                name="PAUT"
                disabled={!this.state.editable}
              />
              <FieldTags
                title="Ecole (ECOL) :"
                name="ECOL"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Anciennes attributions (ATTR) :"
                name="ATTR"
                disabled={!this.state.editable}
              />
              <FieldTags
                title="Période de création / exécution (PERI) :"
                name="PERI"
                disabled={!this.state.editable}
              />
              <FieldTags
                title="Millésime de création / exécution (MILL) :"
                name="MILL"
                disabled={!this.state.editable}
              />

              <FieldTags
                title="Epoque /style / mouvement (EPOQ) :"
                name="EPOQ"
                disabled={!this.state.editable}
              />
              <FieldTags
                title="Période de l’original copié (PEOC) :"
                name="PEOC"
                disabled={!this.state.editable}
              />
              <FieldTags
                title="Matériaux et techniques (TECH) :"
                name="TECH"
                disabled={!this.state.editable}
              />
            </Col>
            <Col sm={6}>
              <FieldInput
                title="Localisation (LOCA) :"
                name="LOCA"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Mesures (DIMS) :"
                name="DIMS"
                disabled={!this.state.editable}
              />
              <FieldTags
                title="Inscriptions (INSC) :"
                name="INSC"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Précisions sur les inscriptions (PINS) :"
                name="PINS"
                disabled={!this.state.editable}
              />
              <FieldTags
                title="Onomastique (ONOM) :"
                name="ONOM"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Description (DESC) :"
                name="DESC"
                disabled={!this.state.editable}
              />
              <FieldTags
                title="Etat du bien (ETAT) :"
                name="ETAT"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Sujet représenté (REPR) :"
                name="REPR"
                disabled={!this.state.editable}
              />
              <FieldTags
                title="Précisions sur le sujet représenté (PREP) :"
                name="PREP"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Date de la représentation (DREP) :"
                name="DREP"
                disabled={!this.state.editable}
              />
              <FieldTags
                title="Source de la représentation (SREP) :"
                name="SREP"
                disabled={!this.state.editable}
              />
            </Col>
          </Section>
          <Section
            title="CONTEXTE DE CREATION / CONTEXTE HISTORIQUE"
            icon={require("../../assets/date.png")}
            color="#FE997B"
          >
            <Col sm={6}>
              <FieldTags
                title="Genèse (GENE) :"
                name="GENE"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Historique – Objets associés (HIST) :"
                name="HIST"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Lieu de création / d’exécution / d’utilisation(LIEUX) :"
                name="LIEUX"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Précisions sur le lieu de création/ d’exécution / d’utilisation(PLIEUX) :"
                name="PLIEUX"
                disabled={!this.state.editable}
              />
              <FieldTags
                title="Géographie historique (GEOHI) :"
                name="GEOHI"
                disabled={!this.state.editable}
              />
              <FieldTags
                title="Utilisation / Destination (UTIL) :"
                name="UTIL"
                disabled={!this.state.editable}
              />
            </Col>
            <Col sm={6}>
              <FieldTags
                title="Période d’utilisation (PERU) :"
                name="PERU"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Précisions sur l’utilisation (PUTI) :"
                name="PUTI"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Millésime d’utilisation (MILU) :"
                name="MILU"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Découverte / collecte / récolte (lieu de découverte / collecte / récolte) ; Type de site ; Méthode de découverte /collecte / récolte ; Date de découverte / collecte / récolte ; Découvreur / collecteur) (DECV) :"
                name="DECV"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Précisions sur la découverte / collecte / récolte (PDEC) :"
                name="PDEC"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Numéro de site (NSDA) :"
                name="NSDA"
                disabled={!this.state.editable}
              />
            </Col>
          </Section>
          <Section
            title="STATUT JURIDIQUE"
            icon={require("../../assets/law.png")}
            color="#FE997B"
          >
            <Col sm={6}>
              <FieldTags
                title="Statut juridique (type de propriété ; mode d’acquisition ; institution propriétaire (ville quand la commune est propriétaire) ; établissement affectataire (STAT) :"
                name="STAT"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Date d’acquisition (DACQ) :"
                name="DACQ"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Ancienne appartenance (nom du donateur / testateur/ vendeur) (APTN) :"
                name="APTN"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Dépôt / établissement dépositaire (DEPO) :"
                name="DEPO"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Date de dépôt / changement d’affectation (DDPT) :"
                name="DDPT"
                disabled={!this.state.editable}
              />
            </Col>
            <Col sm={6}>
              <FieldTags
                title="Ancien dépôt / changement d’affectation (ADPT) :"
                name="ADPT"
                disabled={!this.state.editable}
              />
            </Col>
          </Section>
          <Section
            title="INFORMATIONS COMPLEMENTAIRES"
            icon={require("../../assets/law.png")}
            color="#FE997B"
          >
            <Col sm={6}>
              <FieldInput
                title="Commentaires (COMM) :"
                name="COMM"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Exposition (EXPO) :"
                name="EXPO"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Bibliographie (BIBL) :"
                name="BIBL"
                disabled={!this.state.editable}
              />
            </Col>
            <Col sm={6}>
              <FieldTags
                title="Rédacteur (REDA) :"
                name="REDA"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Crédits photographiques (PHOT) :"
                name="PHOT"
                disabled={!this.state.editable}
              />
            </Col>
          </Section>
          <Section
            title="INFORMATIONS LIEES A L’EXPORT, LA GESTION ET LA PUBLICATION"
            icon={require("../../assets/date.png")}
            color="#FFC070"
          >
            <Col sm={6}>
              <FieldInput
                title="Référence (numéro système de la notice) (REF) :"
                name="REF"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Référence de mise à jour (marque de la modification de la notice) (REFMIS) :"
                name="REFMIS"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Référence image : lien texte/ image (REFIM) :"
                name="REFIM"
                disabled={!this.state.editable}
              />
              <FieldTags
                title="Videos (VIDEO) :"
                name="VIDEO"
                disabled={!this.state.editable}
              />
              <FieldTags
                title="Images (IMG) :"
                name="IMG"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Appellation musée de France : logo (LABEL) :"
                name="LABEL"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Copyright notice (COPY) :"
                name="COPY"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Lien commande de reproduction et/ou de conditions d’utilisation (MSGCOM) :"
                name="MSGCOM"
                disabled={!this.state.editable}
              />
            </Col>
            <Col sm={6}>
              <FieldInput
                title="Lien contact musée (CONTACT) :"
                name="CONTACT"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Lien site associé / site complémentaire (WWW) :"
                name="WWW"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Lien Vidéo (LVID) :"
                name="LVID"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Lien Numéro MUSEOFILE (MUSEO) :"
                name="MUSEO"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Coordinateur (COOR) :"
                name="COOR"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Date de mise à jour (DMAJ) :"
                name="DMAJ"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Date de création (DMIS) :"
                name="DMIS"
                disabled={!this.state.editable}
              />
            </Col>
          </Section>
          <div className="back" onClick={() => this.props.history.goBack()}>
            Retour
          </div>
          <div className="buttons">
            {this.props.canDelete ? (
              <Button color="danger" onClick={() => this.delete()}>
                Supprimer
              </Button>
            ) : (
              <div />
            )}
            <Button
              disabled={!this.state.editable}
              color="primary"
              type="submit"
            >
              Sauvegarder
            </Button>
          </div>
        </Form>
      </Container>
    );
  }
}

const CustomField = ({ name, ...rest }) => {
  return <Field {...Mapping.joconde[name]} name={name} {...rest} />;
};

const mapStateToProps = ({ Auth }) => {
  const { role, group, museofile } = Auth.user;
  // An "administrateur" (from "joconde" or "admin" group) can delete.
  const canDelete =
    Auth.user &&
    role === "administrateur" &&
    (group === "joconde" || group === "admin");
  // If you can delete, you can update (see above).
  // Also, you can update if you are a "producteur" from "joconde"
  // (assuming user.museofile === notice.museofile, see "editable" state)
  const canUpdate =
    canDelete || (Auth.user && role === "producteur" && group === "joconde");
  return {
    canDelete,
    canUpdate,
    user: { museofile, role, group }
  };
};

export default connect(
  mapStateToProps,
  {}
)(reduxForm({ form: "notice" })(Notice));
