import React from "react";
import { Col, Row, Container, Button, Form } from "reactstrap";
import { reduxForm } from "redux-form";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";
import Mapping from "../../services/mapping";
import BackButton from "./components/BackButton";
import Field from "./components/field.js";
import FieldImages from "./components/fieldImages.js";
import Section from "./components/section.js";
import Comments from "./components/comments.js";
import Loader from "../../components/Loader";
import API from "../../services/api";
import { bucket_url } from "../../config";

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
      (this.props.user.role === "administrateur" || this.props.user.museofile.includes(notice.REF));

    this.setState({ loading: false, notice, editable });
  }

  async onSubmit(values) {
    this.setState({ saving: true });
    const notice = await API.updateNotice(
      this.state.notice.REF,
      "museo",
      values,
      this.state.imagesFiles
    );
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
        <h2 className="main-title">
          Notice {this.state.notice.REF}{" "}
          <a
            style={{ fontSize: "small" }}
            target="_blank"
            href={`http://pop.culture.gouv.fr/notice/museo/${this.state.notice.REF}`}
          >
            voir en diffusion
          </a>
        </h2>
        <Form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))} className="main-body">
          <FieldImages
            name="PHOTO"
            canOrder={this.state.editable}
            canEdit={this.state.editable}
            createUrlFromName={e => `museo/${this.state.notice.REF}/${e}`}
            getAbsoluteUrl={e => `${bucket_url}${e}`}
            filesToUpload={imagesFiles => this.setState({ imagesFiles })}
          />
          <Section title="Nom du musée" icon={require("../../assets/info.png")} color="#FF7676">
            <Row>
              <Col sm={6}>
                <CustomField name="NOMOFF" disabled={!this.state.editable} />
                <CustomField name="NOMUSAGE" disabled={!this.state.editable} />
              </Col>
              <Col sm={6}>
                <CustomField name="NOMANC" disabled={!this.state.editable} />
              </Col>
            </Row>
          </Section>
          <Section title="Adresse" icon={require("../../assets/info.png")} color="#FF7676">
            <Row>
              <Col sm={6}>
                <CustomField name="ADRL1_M" disabled={!this.state.editable} />
                <CustomField name="LIEU_M" disabled={!this.state.editable} />
                <CustomField name="CP_M" disabled={!this.state.editable} />
              </Col>
              <Col sm={6}>
                <CustomField name="VILLE_M" disabled={!this.state.editable} />
                <CustomField name="DPT" disabled={!this.state.editable} />
                <CustomField name="REGION" disabled={!this.state.editable} />
              </Col>
            </Row>
          </Section>
          <Section title="Contact" icon={require("../../assets/info.png")} color="#FF7676">
            <Row>
              <Col sm={6}>
                <CustomField name="TEL_M" disabled={!this.state.editable} />
                <CustomField name="MEL" disabled={!this.state.editable} />
                <CustomField name="CONTACT" disabled={!this.state.editable} />
                <CustomField name="CONTACT_MUSEE" disabled={!this.state.editable} />
              </Col>
              <Col sm={6}>
                <CustomField name="URL_M" disabled={!this.state.editable} />
                <CustomField name="ACCES" disabled={!this.state.editable} />
              </Col>
            </Row>
          </Section>
          <Section title="Collection" icon={require("../../assets/info.png")} color="#FF7676">
            <Row>
              <Col sm={6}>
                <CustomField name="CATEG" disabled={!this.state.editable} />
                <CustomField name="DOMPAL" disabled={!this.state.editable} />
                <CustomField name="HIST" disabled={!this.state.editable} />
                <CustomField name="ATOUT" disabled={!this.state.editable} />
              </Col>
              <Col sm={6}>
                <CustomField name="THEMES" disabled={!this.state.editable} />
                <CustomField name="ARTISTE" disabled={!this.state.editable} />
                <CustomField name="PHARE" disabled={!this.state.editable} />
              </Col>
            </Row>
          </Section>
          <Section
            title="Appellation/protection"
            icon={require("../../assets/info.png")}
            color="#FF7676"
          >
            <Row>
              <Col sm={6}>
                <CustomField name="LABEL" disabled={!this.state.editable} />
                <CustomField name="PROT-BAT" disabled={!this.state.editable} />
              </Col>
              <Col sm={6}>
                <CustomField name="PROT-ESP" disabled={!this.state.editable} />
              </Col>
            </Row>
          </Section>
          <Section title="Bâtiment" icon={require("../../assets/info.png")} color="#FF7676">
            <Row>
              <Col sm={6}>
                <CustomField name="INTERET" disabled={!this.state.editable} />
              </Col>
            </Row>
          </Section>
          <Section title="Identifiant" icon={require("../../assets/info.png")} color="#FF7676">
            <Row>
              <Col sm={6}>
                <CustomField name="REF" disabled={true} />
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
