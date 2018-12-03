import React from "react";
import { Row, Col, Container, Button, Form } from "reactstrap";
import { Link } from "react-router-dom";
import { reduxForm } from "redux-form";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";

import { bucket_url } from "../../config";

import FieldInput from "./components/fieldInput.js";
import FieldTags from "./components/fieldTags";
import FieldImages from "./components/fieldImages";
import Section from "./components/section.js";

import Loader from "../../components/loader";
import API from "../../services/api";

import "./index.css";

class Notice extends React.Component {
  state = {
    notice: null,
    error: "",
    loading: true,
    editable: true
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
    API.getNotice("memoire", ref).then(notice => {
      if (!notice) {
        this.setState({
          loading: false,
          error: `Impossible de charger la notice ${ref}`
        });
        console.error(`Impossible de charger la notice ${ref}`);
        return;
      }
      console.log("NOTICE", notice);
      const editable =
        ["CRMH", "CAOA", "SAP", "SDAP"].includes(notice.PRODUCTEUR) &&
        this.props.canUpdate;
      this.props.initialize({ ...notice, IMG: [notice.IMG] });
      this.setState({ loading: false, notice, editable });
    });
  }

  onSubmit(values) {
    this.setState({ saving: true });
    API.updateNotice(this.state.notice.REF, "memoire", values).then(e => {
      toastr.success(
        "Modification enregistrée",
        "La modification sera visible dans 1 à 5 min en diffusion"
      );
      this.setState({ saving: false });
    });
  }

  delete() {
    const ref = this.props.match.params.ref;
    const confirmText =
      `Vous êtes sur le point de supprimer la notice REF ${ref}. ` +
      `Êtes-vous certain·e de vouloir continuer ?`;
    const toastrConfirmOptions = {
      onOk: () => {
        API.deleteNotice("memoire", ref).then(() => {
          toastr.success(
            "Notice supprimée",
            "La modification sera visible dans 1 à 5 min en diffusion"
          );
        });
      }
    };
    toastr.confirm(confirmText, toastrConfirmOptions);
  }

  render() {
    if (this.state.loading) {
      return <Loader />;
    }

    if (this.state.error) {
      return <div className="error">{this.state.error}</div>;
    }

    const arr = [];
    for (var key in this.state.notice) {
      if (this.state.notice[key]) {
        arr.push(<span key={key}>{`${key}:${this.state.notice[key]}`}</span>);
      }
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
            <FieldImages name="IMG" disabled={!this.state.editable} />
          </Row>

          <Section
            title="Localisation"
            icon={require("../../assets/info.png")}
            color="#FF7676"
          >
            <Col sm={6}>
              <FieldInput
                title="Localisation (LOCA) :"
                name="LOCA"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Pays (PAYS) :"
                name="PAYS"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Région (REG) :"
                name="REG"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Département (DPT) :"
                name="DPT"
                disabled={!this.state.editable}
              />
            </Col>
            <Col sm={6}>
              <FieldInput
                title="Commune (COM) :"
                name="COM"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Code INSEE (INSEE) :"
                name="INSEE"
                disabled={!this.state.editable}
              />

              <FieldInput
                title="Adresse (ADRESSE) :"
                name="ADRESSE"
                disabled={!this.state.editable}
              />

              <FieldInput
                title="Nom géographique (MCGEO) :"
                name="MCGEO"
                disabled={!this.state.editable}
              />
            </Col>
          </Section>

          <Section
            title="Identification MH"
            icon={require("../../assets/info.png")}
            color="#FF7676"
          >
            <Col sm={6}>
              <FieldInput
                title="Nom édifice (EDIF) :"
                name="EDIF"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Nom objet (OBJT) :"
                name="OBJT"
                disabled={!this.state.editable}
              />
            </Col>
            <Col sm={6}>
              <FieldInput
                title="Liens bases (LBASE) :"
                name="LBASE"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Liens base (LBASE2) :"
                name="LBASE2"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Ordre images (MARQ) :"
                name="MARQ"
                disabled={!this.state.editable}
              />
            </Col>
          </Section>
          <Section
            title="Identification conservation"
            icon={require("../../assets/info.png")}
            color="#FF7676"
          >
            <Col sm={6}>
              <FieldInput
                title="Type document (TYPDOC) :"
                name="TYPDOC"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Date immatricul (DATIMM) :"
                name="DATIMM"
                disabled={!this.state.editable}
              />

              <FieldInput
                title="Acquisition (ACQU) :"
                name="ACQU"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Crédit photo (COPY) :"
                name="COPY"
                disabled={!this.state.editable}
              />

              <FieldInput
                title="No phototype (NUMP) :"
                name="NUMP"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Ancien numéro (ancienne cote du phototype) (ANUMP) :"
                name="ANUMP"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Cote photographe (NUMAUTP) :"
                name="NUMAUTP"
                disabled={!this.state.editable}
              />

              <FieldInput
                title="No tirage (NUMTI) :"
                name="NUMTI"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="REPRO (REPRO) :"
                name="REPRO"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Ancien numéro du  tirage (ANUMTI) :"
                name="ANUMTI"
                disabled={!this.state.editable}
              />

              <FieldInput
                title="Lieu cons tir. (LIEUCTI) :"
                name="LIEUCTI"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Cote conservation du tirage (COTECTI) :"
                name="COTECTI"
                disabled={!this.state.editable}
              />

              <FieldInput
                title="Mentions tirage (MENTTI) :"
                name="MENTTI"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Obs tirage (OBSTI) :"
                name="OBSTI"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Renvoi (RENV) :"
                name="RENV"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="NUMG (NUMG) :"
                name="NUMG"
                disabled={!this.state.editable}
              />
            </Col>
            <Col sm={6}>
              <FieldInput
                title="No original (NUMOR) :"
                name="NUMOR"
                disabled={!this.state.editable}
              />

              <FieldInput
                title="No original(anc) (ANUMOR) :"
                name="ANUMOR"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Lieu cons orig. (LIEUCOR) :"
                name="LIEUCOR"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Cote cons orig. (COTECOR) :"
                name="COTECOR"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Préc original (PRECOR) :"
                name="PRECOR"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Lieu de dépôt (LIEUORIG) :"
                name="LIEUORIG"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Mentions orig (MENTOR) :"
                name="MENTOR"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Obs original (OBSOR) :"
                name="OBSOR"
                disabled={!this.state.editable}
              />

              <FieldInput
                title="No carte fenêtre (NUMCAF) :"
                name="NUMCAF"
                disabled={!this.state.editable}
              />
            </Col>
          </Section>

          <Section
            title="Gestion base de donnée"
            icon={require("../../assets/info.png")}
            color="#FF7676"
          >
            <Col sm={6}>
            <FieldInput
                title="Référence (REF) :"
                name="REF"
                disabled={true}
              />
              <FieldInput
                title="Producteur (PRODUCTEUR) :"
                name="PRODUCTEUR"
                disabled={true}
              />
              <FieldInput
                title="Emetteur (code) (EMET) :"
                name="EMET"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Emetteur (nom) (IDPROD) :"
                name="IDPROD"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="vidéodisque (NVD	REF ) :"
                name="NVD	REF "
                disabled={!this.state.editable}
              />
            </Col>
            <Col sm={6}>
              <FieldInput
                title="Nom Image (REFIMG) :"
                name="REFIMG"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Ref Image (REFIM) :"
                name="REFIM"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Vidéo (VIDEO) :"
                name="VIDEO"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Type image num (TYPEIMG) :"
                name="TYPEIMG"
                disabled={!this.state.editable}
              />
            </Col>
          </Section>

          <Section
            title="Auteur"
            icon={require("../../assets/info.png")}
            color="#FF7676"
          >
            <Col sm={6}>
              <FieldInput
                title="Auteur photo (AUTP) :"
                name="AUTP"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Auteur tirage (AUTTI) :"
                name="AUTTI"
                disabled={!this.state.editable}
              />
            </Col>
            <Col sm={6}>
              <FieldInput
                title="Auteur original (AUTOR) :"
                name="AUTOR"
                disabled={!this.state.editable}
              />
            </Col>
          </Section>

          <Section
            title="Description image"
            icon={require("../../assets/info.png")}
            color="#FF7676"
          >
            <Col sm={6}>
              <FieldInput
                title="Domaine (DOM) :"
                name="DOM"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Titre série (SERIE) :"
                name="SERIE"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Légende (LEG) :"
                name="LEG"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Mots clés (MCL) :"
                name="MCL"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Nom personne (MCPER) :"
                name="MCPER"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Adresse personne (ADPHOT) :"
                name="ADPHOT"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Mots candidats (LIB) :"
                name="LIB"
                disabled={!this.state.editable}
              />
            </Col>
            <Col sm={6}>
              <FieldInput
                title="Publication (PUBLI) :"
                name="PUBLI"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Pub. photograph. (TIREDE) :"
                name="TIREDE"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Obs phototype (OBS) :"
                name="OBS"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Mentions photo (MENTIONS) :"
                name="MENTIONS"
                disabled={!this.state.editable}
              />
            </Col>
          </Section>

          <Section
            title="Date"
            icon={require("../../assets/info.png")}
            color="#FF7676"
          >
            <Col sm={6}>
              <FieldInput
                title="Date prise vue (DATPV) :"
                name="DATPV"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Justif date pv (JDATPV) :"
                name="JDATPV"
                disabled={!this.state.editable}
              />
            </Col>
            <Col sm={6}>
              <FieldInput
                title="Date original (DATOR) :"
                name="DATOR"
                disabled={!this.state.editable}
              />
            </Col>
          </Section>

          <Section
            title="Oeuvre représentée"
            icon={require("../../assets/info.png")}
            color="#FF7676"
          >
            <Col sm={6}>
              <FieldInput
                title="Auteur oeuvre représentée (AUTOEU) :"
                name="AUTOEU"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Auteur gravure (AUTG) :"
                name="AUTG"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Date oeuv année (DATOEU) :"
                name="DATOEU"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Date oeuv siècle (SCLE) :"
                name="SCLE"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Titre (TITRE) :"
                name="TITRE"
                disabled={!this.state.editable}
              />
            </Col>
            <Col sm={6}>
              <FieldInput
                title="Nom de théâtre (THEATRE) :"
                name="THEATRE"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Rôle joué (ROLE) :"
                name="ROLE"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Accessoire pose (ACC) :"
                name="ACC"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Toile de fond (TOILE) :"
                name="TOILE"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Costume de la personne représentée (COSTUME) :"
                name="COSTUME"
                disabled={!this.state.editable}
              />
            </Col>
          </Section>

          <Section
            title="Technique support original
                        "
            icon={require("../../assets/info.png")}
            color="#FF7676"
          >
            <Col sm={6}>
              <FieldInput
                title="Technique photo (TECH) :"
                name="TECH"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Format phototype (FORMAT) :"
                name="FORMAT"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Sens (SENS) :"
                name="SENS"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Couleur (COULEUR) :"
                name="COULEUR"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Technique tirage (TECHTI) :"
                name="TECHTI"
                disabled={!this.state.editable}
              />
            </Col>
            <Col sm={6}>
              <FieldInput
                title="Format tirage (FORMATTI) :"
                name="FORMATTI"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Format original (FORMATOR) :"
                name="FORMATOR"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Technique orig (TECHOR) :"
                name="TECHOR"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Echelle (ECH) :"
                name="ECH"
                disabled={!this.state.editable}
              />
            </Col>
          </Section>

          <Section
            title="AUTRES"
            icon={require("../../assets/info.png")}
            color="#FF7676"
          >
            <Col sm={6}>
              <FieldInput
                title="Adresse saisie (ADRS) :"
                name="ADRS"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Aire d'étude (AIRE) :"
                name="AIRE"
                disabled={!this.state.editable}
              />

              <FieldInput
                title="Chronologie (CHRONO) :"
                name="CHRONO"
                disabled={!this.state.editable}
              />

              <FieldInput
                title="Contact (CONTACT) :"
                name="CONTACT"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Cote conservation du phototype (COTECP) :"
                name="COTECP"
                disabled={!this.state.editable}
              />

              <FieldInput
                title="Date dessin (DATD) :"
                name="DATD"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Date gravure (DATG) :"
                name="DATG"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Date tirage (DATTI) :"
                name="DATTI"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Droits diffusion (DIFF) :"
                name="DIFF"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Date mise à jour (DMAJ) :"
                name="DMAJ"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Date Mistral (DMIS) :"
                name="DMIS"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Interprétation (EDIARCH) :"
                name="EDIARCH"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Emetteur (nom) (IDPROD) :"
                name="IDPROD"
                disabled={!this.state.editable}
              />
              <FieldTags
                title="Images (IMG) :"
                name="IMG"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Code INSEE (INSEE) :"
                name="INSEE"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Notice biblio (LAUTP) :"
                name="LAUTP"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Légende thes. (LEG2) :"
                name="LEG2"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Liens divers (LIENS) :"
                name="LIENS"
                disabled={!this.state.editable}
              />

              <FieldInput
                title="Lieu-dit (LIEU) :"
                name="LIEU"
                disabled={!this.state.editable}
              />

              <FieldInput
                title="Lieu cons pho. (LIEUCP) :"
                name="LIEUCP"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Mosaïques (MOSA) :"
                name="MOSA"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="N° support (NUM) :"
                name="NUM"
                disabled={!this.state.editable}
              />

              <FieldInput
                title="No CD (NUMCD) :"
                name="NUMCD"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="No de fond (NUMF) :"
                name="NUMF"
                disabled={!this.state.editable}
              />
            </Col>
            <Col sm={6}>
              <FieldInput
                title="Ident. support (NUMI) :"
                name="NUMI"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="N° d'opération (NUMOP) :"
                name="NUMOP"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="N° du site (NUMSITE) :"
                name="NUMSITE"
                disabled={!this.state.editable}
              />

              <FieldInput
                title="Site (SITE) :"
                name="SITE"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Structure (STRUCT) :"
                name="STRUCT"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Sujet (SUJET) :"
                name="SUJET"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Support (SUP) :"
                name="SUP"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Titre du dossier (TICO) :"
                name="TICO"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Index global (TOUT) :"
                name="TOUT"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Type (TYP) :"
                name="TYP"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Type support num (TYPSUPP) :"
                name="TYPSUPP"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="No vue CD (VUECD) :"
                name="VUECD"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Ville (WCOM) :"
                name="WCOM"
                disabled={!this.state.editable}
              />
              <FieldInput
                title="Accès Mémoire (WEB) :"
                name="WEB"
                disabled={!this.state.editable}
              />
            </Col>
          </Section>
          <div className="back" onClick={() => this.props.history.goBack()}>
            Retour
          </div>
          {this.props.canUpdate ? (
            <div className="buttons">
              <Button color="danger" onClick={() => this.delete()}>
                Supprimer
              </Button>
              <Button
                disabled={!this.state.editable}
                color="primary"
                type="submit"
              >
                Sauvegarder
              </Button>
            </div>
          ) : (
            <div />
          )}
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = ({ Auth }) => {
  const { role, group } = Auth.user;
  return {
    canUpdate: Auth.user
      ? (role === "producteur" || role === "administrateur") &&
        (group === "mh" || group === "admin")
      : false
  };
};

export default connect(
  mapStateToProps,
  {}
)(reduxForm({ form: "notice" })(Notice));
