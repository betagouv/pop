import React from "react";
import { Row, Col, Container, Button, Form, Tooltip } from "reactstrap";
import { reduxForm } from "redux-form";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";
import { Mapping } from "pop-shared";

import Field from "./components/field.js";
import FieldImages from "./components/fieldImages";
import Section from "./components/section.js";
import Map from "./components/map.js";

import Loader from "../../components/Loader";
import API from "../../services/api";
import { bucket_url } from "../../config";

import "./index.css";

class Notice extends React.Component {
  state = {
    notice: null,
    error: "",
    loading: true,
    imagesFiles: []
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
          notice.MUSEO === this.props.user.museofile);

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
    API.updateNotice(
      this.state.notice.REF,
      "joconde",
      values,
      this.state.imagesFiles
    ).then(e => {
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
              <FieldImages
                name="IMG"
                disabled={!this.state.editable}
                createUrlFromName={e => `joconde/${this.state.notice.REF}/${e}`}
                getAbsoluteUrl={e => `${bucket_url}${e}`}
                updateFiles={imagesFiles => this.setState({ imagesFiles })}
              />
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
              <CustomField name="DENO" disabled={!this.state.editable} />
              <CustomField name="APPL" disabled={!this.state.editable} />
              <CustomField name="TITR" disabled={!this.state.editable} />
              <CustomField name="AUTR" disabled={!this.state.editable} />
              <CustomField name="PAUT" disabled={!this.state.editable} />
              <CustomField name="ECOL" disabled={!this.state.editable} />
              <CustomField name="ATTR" disabled={!this.state.editable} />
              <CustomField name="PERI" disabled={!this.state.editable} />
              <CustomField name="MILL" disabled={!this.state.editable} />
              <CustomField name="EPOQ" disabled={!this.state.editable} />
              <CustomField name="PEOC" disabled={!this.state.editable} />
              <CustomField name="TECH" disabled={!this.state.editable} />
            </Col>
            <Col sm={6}>
              <CustomField name="LOCA" disabled={!this.state.editable} />
              <CustomField name="DIMS" disabled={!this.state.editable} />
              <CustomField name="INSC" disabled={!this.state.editable} />
              <CustomField name="PINS" disabled={!this.state.editable} />
              <CustomField name="ONOM" disabled={!this.state.editable} />
              <CustomField name="DESC" disabled={!this.state.editable} />
              <CustomField name="ETAT" disabled={!this.state.editable} />
              <CustomField name="REPR" disabled={!this.state.editable} />
              <CustomField name="PREP" disabled={!this.state.editable} />
              <CustomField name="DREP" disabled={!this.state.editable} />
              <CustomField name="SREP" disabled={!this.state.editable} />
            </Col>
          </Section>
          <Section
            title="CONTEXTE DE CREATION / CONTEXTE HISTORIQUE"
            icon={require("../../assets/date.png")}
            color="#FE997B"
          >
            <Col sm={6}>
              <CustomField name="GENE" disabled={!this.state.editable} />
              <CustomField name="HIST" disabled={!this.state.editable} />
              <CustomField name="LIEUX" disabled={!this.state.editable} />
              <CustomField name="PLIEUX" disabled={!this.state.editable} />
              <CustomField name="GEOHI" disabled={!this.state.editable} />
              <CustomField name="UTIL" disabled={!this.state.editable} />
            </Col>
            <Col sm={6}>
              <CustomField name="PERU" disabled={!this.state.editable} />
              <CustomField name="PUTI" disabled={!this.state.editable} />
              <CustomField name="MILU" disabled={!this.state.editable} />
              <CustomField name="DECV" disabled={!this.state.editable} />
              <CustomField name="PDEC" disabled={!this.state.editable} />
              <CustomField name="NSDA" disabled={!this.state.editable} />
            </Col>
          </Section>
          <Section
            title="STATUT JURIDIQUE"
            icon={require("../../assets/law.png")}
            color="#FE997B"
          >
            <Col sm={6}>
              <CustomField name="STAT" disabled={!this.state.editable} />
              <CustomField name="DACQ" disabled={!this.state.editable} />
              <CustomField name="APTN" disabled={!this.state.editable} />
              <CustomField name="DEPO" disabled={!this.state.editable} />
              <CustomField name="DDPT" disabled={!this.state.editable} />
            </Col>
            <Col sm={6}>
              <CustomField name="ADPT" disabled={!this.state.editable} />
            </Col>
          </Section>
          <Section
            title="INFORMATIONS COMPLEMENTAIRES"
            icon={require("../../assets/law.png")}
            color="#FE997B"
          >
            <Col sm={6}>
              <CustomField name="COMM" disabled={!this.state.editable} />
              <CustomField name="EXPO" disabled={!this.state.editable} />
              <CustomField name="BIBL" disabled={!this.state.editable} />
            </Col>
            <Col sm={6}>
              <CustomField name="REDA" disabled={!this.state.editable} />
              <CustomField name="PHOT" disabled={!this.state.editable} />
            </Col>
          </Section>
          <Section
            title="INFORMATIONS LIEES A L’EXPORT, LA GESTION ET LA PUBLICATION"
            icon={require("../../assets/date.png")}
            color="#FFC070"
          >
            <Col sm={6}>
              <CustomField name="REF" disabled={!this.state.editable} />
              <CustomField name="REFMIS" disabled={!this.state.editable} />
              <CustomField name="REFIM" disabled={!this.state.editable} />
              <CustomField name="VIDEO" disabled={!this.state.editable} />
              <CustomField name="IMG" disabled={!this.state.editable} />
              <CustomField name="LABEL" disabled={!this.state.editable} />
              <CustomField name="COPY" disabled={!this.state.editable} />
              <CustomField name="MSGCOM" disabled={!this.state.editable} />
            </Col>
            <Col sm={6}>
              <CustomField name="CONTACT" disabled={!this.state.editable} />
              <CustomField name="WWW" disabled={!this.state.editable} />
              <CustomField name="LVID" disabled={!this.state.editable} />
              <CustomField name="MUSEO" disabled={!this.state.editable} />
              <CustomField name="COOR" disabled={!this.state.editable} />
              <CustomField name="DMAJ" disabled={!this.state.editable} />
              <CustomField name="DMIS" disabled={!this.state.editable} />
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

const CustomField = ({ name, disabled, ...rest }) => {
  return (
    <Field
      {...Mapping.joconde[name]}
      disabled={
        Mapping.joconde[name].generated == true ||
        Mapping.joconde[name].deprecated == true ||
        disabled
      }
      name={name}
      {...rest}
    />
  );
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
