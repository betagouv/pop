import React from "react";
import { Row, Col, Container, Button, Form } from "reactstrap";
import { reduxForm } from "redux-form";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";
import { Mapping } from "pop-shared";

import Field from "./components/field.js";
import FieldImages from "./components/fieldImages";
import Section from "./components/section.js";

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
    API.getNotice("mnr", ref)
      .then(notice => {
        if (!notice) {
          this.setState({
            loading: false,
            error: `Impossible de charger la notice ${ref}`
          });
          console.error(`Impossible de charger la notice ${ref}`);
          return;
        }
        console.log("NOTICE", notice);
        this.props.initialize(notice);
        this.setState({ loading: false, notice });
      })
      .catch(e => {
        this.setState({ loading: false, error: e });
        console.error(`Impossible de charger la notice ${ref}`);
      });
  }

  onSubmit(values) {
    this.setState({ saving: true });
    const files = [];

    //copy the object so the image is not changing while its uploading
    const VIDEO = [...values.VIDEO];
    for (var i = 0; i < VIDEO.length; i++) {
      if (VIDEO[i] instanceof File) {
        files.push(VIDEO[i]);
        VIDEO[i] = `mnr/${values.REF}/${VIDEO[i].name}`;
      }
    }

    API.updateNotice(
      this.state.notice.REF,
      "mnr",
      { ...values, ...{ VIDEO } },
      files
    )
      .then(e => {
        toastr.success(
          "Modification enregistrée",
          "La modification sera visible dans 1 à 5 min en diffusion"
        );
        this.setState({ saving: false });
      })
      .catch(e => {
        toastr.error("Impossible d'enregistrer la modification");
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
        API.deleteNotice("mnr", ref).then(() => {
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
            <Col className="image" sm={12}>
              <FieldImages name="VIDEO" />
            </Col>
          </Row>
          <Section
            title="IDENTIFICATION DU BIEN"
            icon={require("../../assets/info.png")}
            color="#FF7676"
          >
            <Col sm={6}>
              <CustomField title="REF (REF) :" name="REF" disabled />
              <CustomField name="INV" />
              <CustomField name="DOMN" />
              <CustomField name="DENO" />
              <CustomField name="AUTR" />
              <CustomField name="PAUT" />
              <CustomField name="ATTR" />
              <CustomField name="ECOL" />
              <CustomField name="GENE" />
              <CustomField name="TITR" />
              <CustomField name="ATIT" />
              <CustomField name="PTIT" />
              <CustomField name="SCLE" />
              <CustomField name="STYL" />
              <CustomField name="MILL" />
              <CustomField name="TECH" />
              <CustomField name="DIMS" />
              <CustomField name="DESC" />
              <CustomField name="INSC" />
              <CustomField name="HIST" />
              <CustomField name="PROV" />
              <CustomField name="EXPO" />
              <CustomField name="LOCA" />
            </Col>
            <Col sm={6}>
              <CustomField name="BIBL" />
              <CustomField name="OBSE" />
              <CustomField name="REFIM" />
              <CustomField name="AATT" />
              <CustomField name="AUTI" />
              <CustomField name="DMAJ" />
              <CustomField name="ETAT" />
              <CustomField name="RESUME" />
              <CustomField name="NOTE" />
              <CustomField name="PREP" />
              <CustomField name="SUITE" />
              <CustomField name="SREP" />
              <CustomField name="REPR" />
              <CustomField name="REDC" />
              <CustomField name="PHOT" />
              <CustomField name="NUMS" />
              <CustomField name="MARQ" />
              <CustomField name="DREP" />
              <CustomField name="CATE" />
              <CustomField name="COMM" />
              <CustomField name="AFFE" />
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
              <Button color="primary" type="submit">
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

const CustomField = ({ name, ...rest }) => {
  return <Field {...Mapping.mnr[name]} name={name} {...rest} />;
};

const mapStateToProps = ({ Auth }) => {
  return {
    canUpdate: Auth.user
      ? (Auth.user.role === "producteur" ||
          Auth.user.role === "administrateur") &&
        (Auth.user.group === "mnr" || Auth.user.group === "admin")
      : false
  };
};

export default connect(
  mapStateToProps,
  {}
)(reduxForm({ form: "notice" })(Notice));
