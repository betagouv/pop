import React from "react";
import { Row, Col, Container, Button, Form } from "reactstrap";
import { reduxForm } from "redux-form";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";
import Mapping from "../../services/mapping";
import DeleteButton from "./components/DeleteButton";
import BackButton from "./components/BackButton";
import { bucket_url } from "../../config";
import Field from "./components/field.js";
import FieldImages from "./components/fieldImages";
import Section from "./components/section.js";
import Comments from "./components/comments.js";

import Loader from "../../components/Loader";
import API from "../../services/api";

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

  async onSubmit(values) {
    this.setState({ saving: true });
    try {
      await API.updateNotice(this.state.notice.REF, "mnr", values, this.state.imagesFiles);
      toastr.success(
        "Modification enregistrée",
        "La modification sera visible dans 1 à 5 min en diffusion."
      );
    } catch (e) {
      toastr.error("La modification n'a pas été enregistrée", e.msg || "");
    }
    this.setState({ saving: false });
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
            rel="noopener"
            href={`https://www.pop.culture.gouv.fr/.fr/notice/mnr/${this.state.notice.REF}`}
          >
            voir en diffusion
          </a>
        </h2>

        <Form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))} className="main-body">
          <Comments POP_COMMENTAIRES={this.state.notice.POP_COMMENTAIRES} />
          <FieldImages
            name="VIDEO"
            canOrder={this.props.canUpdate}
            canEdit={this.props.canUpdate}
            createUrlFromName={e => `mnr/${this.state.notice.REF}/${e}`}
            getAbsoluteUrl={e => `${bucket_url}${e}`}
            filesToUpload={imagesFiles => this.setState({ imagesFiles })}
          />
          <Section
            title="IDENTIFICATION DU BIEN"
            icon={require("../../assets/info.png")}
            color="#FF7676"
          >
            <Row>
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
            </Row>
          </Section>
          <div className="buttons">
            <BackButton history={this.props.history} />
            {this.props.canUpdate ? (
              <React.Fragment>
                <DeleteButton noticeType="mnr" noticeRef={this.state.notice.REF} />
                <Button color="primary" type="submit">
                  Sauvegarder
                </Button>
              </React.Fragment>
            ) : (
              <div />
            )}
          </div>
        </Form>
      </Container>
    );
  }
}
const CustomField = ({ name, disabled, ...rest }) => {
  return (
    <Field
      {...Mapping.mnr[name]}
      disabled={
        Mapping.mnr[name].generated == true || Mapping.mnr[name].deprecated == true || disabled
      }
      name={name}
      {...rest}
    />
  );
};

const mapStateToProps = ({ Auth }) => {
  return {
    canUpdate: Auth.user
      ? (Auth.user.role === "producteur" || Auth.user.role === "administrateur") &&
        (Auth.user.group === "mnr" || Auth.user.group === "admin")
      : false
  };
};

export default connect(
  mapStateToProps,
  {}
)(reduxForm({ form: "notice" })(Notice));
