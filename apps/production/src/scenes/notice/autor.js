import React from "react";
import { Col, Container, Button, Form, Row } from "reactstrap";
import { reduxForm } from "redux-form";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";
import Mapping from "../../services/mapping";
import BackButton from "./components/BackButton";
import Field from "./components/field.js";
import Section from "./components/section.js";
import Loader from "../../components/Loader";
import API from "../../services/api";
import Autor from "../../entities/Autor";


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
    if (this.props.match && this.props.match.params.ref !== newProps.match.params.ref) {
      this.load(newProps.match.params.ref);
    }
  }

  async load(ref) {
    this.setState({ loading: true });
    const notice = await API.getNotice("autor", ref);
    if (!notice) {
      this.setState({ error: `Notice introuvable ${ref}`, loading: false });
      return;
    }
    this.props.initialize(notice);
    const editable = true;
    this.setState({ loading: false, notice, editable });
  }

  // Not implemented yet (not editable)
  async onSubmit(values) {
    this.setState({ saving: true });
    const notice = new Autor(values);
    if (notice._errors.length) {
      toastr.error("La modification n'a pas été enregistrée", "", {
        component: () => (
          <div>
            {notice._errors.map(e => (
              <p>{e}</p>
            ))}
          </div>
        )
      });
    } else {
      try {
        await API.updateNotice(this.state.notice.REF, "autor", values, this.state.imagesFiles);
        toastr.success(
          "Modification enregistrée",
          "La modification sera visible dans 1 à 5 min en diffusion."
        );
      } catch (e) {
        toastr.error("La modification n'a pas été enregistrée", e.msg || "");
      }
    }
    this.setState({ saving: false });  }

  render() {
    if (this.state.loading) {
      return <Loader />;
    }

    if (this.state.error) {
      return <div className="error">{this.state.error}</div>;
    }

    console.log("this.state.notice", this.state.notice);

    return (
      <Container className="notice">
        <BackButton left history={this.props.history} />
        <h2 className="main-title">Notice {this.state.notice.REF}</h2>
        <Form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))} className="main-body">
          <Section title="Identification" icon={require("../../assets/info.png")} color="#FF7676">
            <Row>
              <Col sm={6}>
                <CustomField name="REF" disabled={this.state.editable} />
                <CustomField name="ISNI" disabled={!this.state.editable} />
                <CustomField name="ALIAS" disabled={!this.state.editable} />
                <CustomField name="BIBLIO" disabled={!this.state.editable} />
                <CustomField name="BIO" disabled={!this.state.editable} />
                <CustomField name="CONTACT" disabled={!this.state.editable} />
                <CustomField name="COPY" disabled={!this.state.editable} />
                <CustomField name="DMORT" disabled={!this.state.editable} />
                <CustomField name="DNAISS" disabled={!this.state.editable} />
                <CustomField name="EXPO" disabled={!this.state.editable} />
                <CustomField name="FONC" disabled={!this.state.editable} />
                <CustomField name="VIDEO" disabled={!this.state.editable} />
                <CustomField name="LIENS" disabled={!this.state.editable} />
                <CustomField name="LWEB" disabled={!this.state.editable} />
                <CustomField name="LMDP" disabled={!this.state.editable} />
                <CustomField name="LMEM" disabled={!this.state.editable} />
                <CustomField name="LMORT" disabled={!this.state.editable} />
                <CustomField name="LNAISS" disabled={!this.state.editable} />
                <CustomField name="RESID" disabled={!this.state.editable} />
                <CustomField name="NATIO" disabled={!this.state.editable} />
              </Col>
              <Col sm={6}>
                <CustomField name="NOM" disabled={!this.state.editable} />
                <CustomField name="PNOM" disabled={!this.state.editable} />
                <CustomField name="TYPAPE" disabled={!this.state.editable} />
                <CustomField name="REJET" disabled={!this.state.editable} />
                <CustomField name="OEUVR" disabled={!this.state.editable} />
                <CustomField name="PUBLI" disabled={!this.state.editable} />
                <CustomField name="ALAMAP" disabled={!this.state.editable} />
                <CustomField name="EMET" disabled={this.state.editable} />
                <CustomField name="REDAC" disabled={!this.state.editable} />
                <CustomField name="LRELA" disabled={!this.state.editable} />
                <CustomField name="SEXE" disabled={!this.state.editable} />
                <CustomField name="SOCSAV" disabled={!this.state.editable} />
                <CustomField name="SOURCES" disabled={!this.state.editable} />
                <CustomField name="STAT" disabled={!this.state.editable} />
                <CustomField name="TITR" disabled={!this.state.editable} />
                <CustomField name="TYPID" disabled={!this.state.editable} />
                <CustomField name="IDENT" disabled={!this.state.editable} />
                <CustomField name="ARK" disabled={!this.state.editable} />
                <CustomField name="OBSMAP" disabled={!this.state.editable} />
                <CustomField name="DMAJ" disabled={this.state.editable} />
                <CustomField name="DMIS" disabled={this.state.editable} />
              </Col>
            </Row>
          </Section>
          <div className="buttons">
            <BackButton history={this.props.history} />
            {this.props.canDelete ? (
              <DeleteButton noticeType="autor" noticeRef={this.state.notice.REF} />
            ) : (
              <div />
            )}
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
  if (!Mapping.autor[name]) {
    return null;
  }
  return (
    <Field
      {...Mapping.autor[name]}
      disabled={
        Mapping.autor[name].generated == true || Mapping.autor[name].deprecated == true || disabled
      }
      name={name}
      {...rest}
    />
  );
};

const mapStateToProps = ({ Auth }) => {
  const { role, group } = Auth.user;
  return {
    user: { role, group }
  };
};

export default connect(
  mapStateToProps,
  {}
)(reduxForm({ form: "notice" })(Notice));
