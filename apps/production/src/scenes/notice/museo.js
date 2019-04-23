import React from "react";
import { Col, Row, Container, Button, Form } from "reactstrap";
import { reduxForm } from "redux-form";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";
import Mapping from "../../services/Mapping";
import BackButton from "./components/BackButton";
import Field from "./components/field.js";
import Section from "./components/section.js";
import Comments from "./components/comments.js";
import Loader from "../../components/Loader";
import API from "../../services/api";

import "./index.css";

class Museo extends React.Component {
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
    if (this.props.match && this.props.match.params.ref !== newProps.match.params.ref) {
      this.load(newProps.match.params.ref);
    }
  }

  async load(ref) {
    this.setState({ loading: true });
    const notice = await API.getNotice("museo", ref);
    this.props.initialize(notice);
    // As a "producteur", I can edit if "museofile" matches with notice.
    const editable =
      this.props.canUpdate &&
      (this.props.user.role === "administrateur" || notice.REF === this.props.user.museofile);

    this.setState({ loading: false, notice, editable });
  }

  async onSubmit(values) {
    this.setState({ saving: true });
    const notice = await API.updateNotice(this.state.notice.REF, "museo", values);
    toastr.success(
      "Modification enregistrée",
      "La modification sera visible dans 1 à 5 min en diffusion"
    );
    this.setState({ saving: false, notice });
  }

  render() {
    if (this.state.loading) {
      return <Loader />;
    }

    if (this.state.error) {
      return <div className="error">{this.state.error}</div>;
    }

    return (
      <Container className="notice">
        <BackButton left history={this.props.history} />
        <h2 className="main-title">Notice {this.state.notice.REF}</h2>
        <Form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))} className="main-body">
          <Section title="Identification" icon={require("../../assets/info.png")} color="#FF7676">
            <Row>
              <Col sm={6}>
                <CustomField name="ACCES" disabled={!this.state.editable} />
                <CustomField name="ACQU" disabled={!this.state.editable} />
                <CustomField name="ACTIV" disabled={!this.state.editable} />
                <CustomField name="ADRESSE" disabled={!this.state.editable} />
                <CustomField name="ADRL1_AD" disabled={!this.state.editable} />
                <CustomField name="ADRL1_M" disabled={!this.state.editable} />
                <CustomField name="AMIS" disabled={!this.state.editable} />
                <CustomField name="ANNEE_FE" disabled={!this.state.editable} />
                <CustomField name="ANNEXE" disabled={!this.state.editable} />
                <CustomField name="ANTARIF" disabled={!this.state.editable} />
                <CustomField name="AN_CREAT" disabled={!this.state.editable} />
                <CustomField name="AN_REOUV" disabled={!this.state.editable} />
                <CustomField name="ARTISTE" disabled={!this.state.editable} />
                <CustomField name="ATOUT" disabled={!this.state.editable} />
                <CustomField name="CATEG" disabled={!this.state.editable} />
                <CustomField name="CEDEX_AD" disabled={!this.state.editable} />
                <CustomField name="COPY" disabled={!this.state.editable} />
                <CustomField name="CP_ADM" disabled={!this.state.editable} />
                <CustomField name="CP_M" disabled={!this.state.editable} />
                <CustomField name="CTRLTECH" disabled={!this.state.editable} />
                <CustomField name="CV_PHOTO" disabled={!this.state.editable} />
                <CustomField name="DEPENSES" disabled={!this.state.editable} />
                <CustomField name="DEPO_AUT" disabled={!this.state.editable} />
                <CustomField name="DEPO_ETA" disabled={!this.state.editable} />
                <CustomField name="DEPO_EXT" disabled={!this.state.editable} />
                <CustomField name="DMAJ" disabled={!this.state.editable} />
                <CustomField name="DMDF" disabled={!this.state.editable} />
                <CustomField name="DOMPAL" disabled={!this.state.editable} />
                <CustomField name="DPSC" disabled={!this.state.editable} />
                <CustomField name="DPSC" disabled={!this.state.editable} />
                <CustomField name="DPT" disabled={!this.state.editable} />
                <CustomField name="DT_CREAT" disabled={!this.state.editable} />
                <CustomField name="DT_MODIF" disabled={!this.state.editable} />
                <CustomField name="DT_OUVER" disabled={!this.state.editable} />
                <CustomField name="DT_SAISI" disabled={!this.state.editable} />
                <CustomField name="EFFPERS" disabled={!this.state.editable} />
                <CustomField name="ENVIRON" disabled={!this.state.editable} />
                <CustomField name="EQUIP" disabled={!this.state.editable} />
                <CustomField name="EXPO_EXT" disabled={!this.state.editable} />
                <CustomField name="EXPO_RES" disabled={!this.state.editable} />
                <CustomField name="FAX_ADM" disabled={!this.state.editable} />
                <CustomField name="FAX_M" disabled={!this.state.editable} />
                <CustomField name="FEDER_M" disabled={!this.state.editable} />
                <CustomField name="FICHPART" disabled={!this.state.editable} />
                <CustomField name="FILTER" disabled={!this.state.editable} />
                <CustomField name="FONCTION" disabled={!this.state.editable} />
                <CustomField name="FREQ" disabled={!this.state.editable} />
                <CustomField name="GESTION" disabled={!this.state.editable} />
                <CustomField name="GRESP" disabled={!this.state.editable} />
                <CustomField name="HIST" disabled={!this.state.editable} />
                <CustomField name="HORAIRES" disabled={!this.state.editable} />
                <CustomField name="INFORMAT" disabled={!this.state.editable} />
                <CustomField name="INTERET" disabled={!this.state.editable} />
                <CustomField name="INVR" disabled={!this.state.editable} />
                <CustomField name="ITI2_M" disabled={!this.state.editable} />
                <CustomField name="ITI_M" disabled={!this.state.editable} />
                <CustomField name="JOCONDE" disabled={!this.state.editable} />
                <CustomField name="LABEL" disabled={!this.state.editable} />
                <CustomField name="MEL" disabled={!this.state.editable} />
                <CustomField name="MONOPLUR" disabled={!this.state.editable} />
                <CustomField name="NB_AMI" disabled={!this.state.editable} />
              </Col>
              <Col sm={6}>
                <CustomField name="NOMANC" disabled={!this.state.editable} />
                <CustomField name="NOMOFF" disabled={!this.state.editable} />
                <CustomField name="NOMUSAGE" disabled={!this.state.editable} />
                <CustomField name="NOM_AMI" disabled={!this.state.editable} />
                <CustomField name="NOM_COM" disabled={!this.state.editable} />
                <CustomField name="NUMER" disabled={!this.state.editable} />
                <CustomField name="OBS_AMI" disabled={!this.state.editable} />
                <CustomField name="OBS_TOUR" disabled={!this.state.editable} />
                <CustomField name="PERS" disabled={!this.state.editable} />
                <CustomField name="PHARE" disabled={!this.state.editable} />
                <CustomField name="PROPBAT" disabled={!this.state.editable} />
                <CustomField name="PROPCOLL" disabled={!this.state.editable} />
                <CustomField name="PROT" disabled={!this.state.editable} />
                <CustomField name="PROT" disabled={!this.state.editable} />
                <CustomField name="PSC" disabled={!this.state.editable} />
                <CustomField name="PUBLI" disabled={!this.state.editable} />
                <CustomField name="RECOL" disabled={!this.state.editable} />
                <CustomField name="REF" disabled={!this.state.editable} />
                <CustomField name="REGION" disabled={!this.state.editable} />
                <CustomField name="REPCOLL" disabled={!this.state.editable} />
                <CustomField name="RESP" disabled={!this.state.editable} />
                <CustomField name="RESSOURC" disabled={!this.state.editable} />
                <CustomField name="REST" disabled={!this.state.editable} />
                <CustomField name="RES_M" disabled={!this.state.editable} />
                <CustomField name="SERVICES" disabled={!this.state.editable} />
                <CustomField name="SIGLE_M" disabled={!this.state.editable} />
                <CustomField name="SIGNALON" disabled={!this.state.editable} />
                <CustomField name="SPUB" disabled={!this.state.editable} />
                <CustomField name="SPUB" disabled={!this.state.editable} />
                <CustomField name="STATUT" disabled={!this.state.editable} />
                <CustomField name="SURFACES" disabled={!this.state.editable} />
                <CustomField name="TEL_ADM" disabled={!this.state.editable} />
                <CustomField name="TEL_COM" disabled={!this.state.editable} />
                <CustomField name="TEL_M" disabled={!this.state.editable} />
                <CustomField name="THEMES" disabled={!this.state.editable} />
                <CustomField name="TOUT" disabled={!this.state.editable} />
                <CustomField name="URL_M" disabled={!this.state.editable} />
                <CustomField name="URL_M2" disabled={!this.state.editable} />
                <CustomField name="VIDEO" disabled={!this.state.editable} />
                <CustomField name="VILLE_AD" disabled={!this.state.editable} />
                <CustomField name="VILLE_M" disabled={!this.state.editable} />
                <CustomField name="LEGS" disabled={!this.state.editable} />
                <CustomField name="LGN" disabled={!this.state.editable} />
                <CustomField name="LIEU_ADM" disabled={!this.state.editable} />
                <CustomField name="LIEU_M" disabled={!this.state.editable} />
              </Col>
            </Row>
          </Section>
          <div className="buttons">
            <BackButton history={this.props.history} />
            <Button disabled={!this.state.editable} color="primary" type="submit">
              Sauvegarder
            </Button>
          </div>
        </Form>
      </Container>
    );
  }
}

const CustomField = ({ name, disabled, ...rest }) => {
  if (!Mapping.museo[name]) {
    return null;
  }
  return (
    <Field
      {...Mapping.museo[name]}
      disabled={
        Mapping.museo[name].generated == true || Mapping.museo[name].deprecated == true || disabled
      }
      name={name}
      {...rest}
    />
  );
};

const mapStateToProps = ({ Auth }) => {
  const { role, group, museofile } = Auth.user;
  console.log(Auth.user);
  const canUpdate =
    (Auth.user && role === "administrateur" && (group === "joconde" || group === "admin")) ||
    (Auth.user && role === "producteur" && group === "joconde");
  return {
    canUpdate,
    user: { museofile, role, group }
  };
};

export default connect(
  mapStateToProps,
  {}
)(reduxForm({ form: "notice" })(Museo));
