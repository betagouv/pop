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
import Mnr from "../../entities/Mnr";
import Loader from "../../components/Loader";
import API from "../../services/api";
import AccordionHistorique from "./components/AccordionHistorique";

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

        // Mantis 38639 - ajout vérification edition
        let editable = false;
        API.canEdit(notice.REF, notice.MUSEO, notice.PRODUCTEUR, "mnr").then(result => {
          editable = result.validate;
          this.setState({editable: editable});
        });
        
        this.setState({ loading: false, notice });
      })
      .catch(e => {
        this.setState({ loading: false, error: e });
        console.error(`Impossible de charger la notice ${ref}`);
      });
  }

  async onSubmit(values) {
    this.setState({ saving: true });
    const notice = new Mnr(values);
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
        await API.updateNotice(this.state.notice.REF, "mnr", values, this.state.imagesFiles, "manuel");
        toastr.success(
          "Modification enregistrée",
          "La modification sera visible dans 1 à 5 min en diffusion."
        );
      } catch (e) {
        toastr.error("La modification n'a pas été enregistrée", e.msg || "");
      }
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
            href={`https://www.pop.culture.gouv.fr/notice/mnr/${this.state.notice.REF}`}
          >
            voir en diffusion
          </a>
        </h2>

        <Form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))} className="main-body">
          <Comments POP_FLAGS={this.state.notice.POP_FLAGS} />
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
                <CustomField name="INV" disabled={!this.state.editable}/>
                <CustomField name="DOMN" disabled={!this.state.editable}/>
                <CustomField
                  name="RENV"
                  createUrl={e => `/notice/mnr/${e}`}
                  disabled={!this.state.editable}
                />
                <CustomField name="DENO" disabled={!this.state.editable}/>
                <CustomField name="AUTR" disabled={!this.state.editable}/>
                <CustomField name="PAUT" disabled={!this.state.editable}/>
                <CustomField name="ATTR" disabled={!this.state.editable}/>
                <CustomField name="ECOL" disabled={!this.state.editable}/>
                <CustomField name="GENE" disabled={!this.state.editable}/>
                <CustomField name="TITR" disabled={!this.state.editable}/>
                <CustomField name="ATIT" disabled={!this.state.editable}/>
                <CustomField name="PTIT" disabled={!this.state.editable}/>
                <CustomField name="SCLE" disabled={!this.state.editable}/>
                <CustomField name="STYL" disabled={!this.state.editable}/>
                <CustomField name="MILL" disabled={!this.state.editable}/>
                <CustomField name="TECH" disabled={!this.state.editable}/>
                <CustomField name="DIMS" disabled={!this.state.editable}/>
                <CustomField name="DESC" disabled={!this.state.editable}/>
                <CustomField name="INSC" disabled={!this.state.editable}/>
                <CustomField name="HIST" disabled={!this.state.editable}/>
                <CustomField name="PROV" disabled={!this.state.editable}/>
                <CustomField name="EXPO" disabled={!this.state.editable}/>
                <CustomField name="LOCA" disabled={!this.state.editable}/>
              </Col>
              <Col sm={6}>
                <CustomField name="BIBL" disabled={!this.state.editable}/>
                <CustomField name="OBSE" disabled={!this.state.editable}/>
                <CustomField name="REFIM" disabled={!this.state.editable}/>
                <CustomField name="AATT" disabled={!this.state.editable}/>
                <CustomField name="AUTI" disabled={!this.state.editable}/>
                <CustomField name="DMAJ" disabled={!this.state.editable}/>
                <CustomField name="ETAT" disabled={!this.state.editable}/>
                <CustomField name="RESUME" disabled={!this.state.editable}/>
                <CustomField name="NOTE" disabled={!this.state.editable}/>
                <CustomField name="PREP" disabled={!this.state.editable}/>
                <CustomField name="SUITE" disabled={!this.state.editable}/>
                <CustomField name="SREP" disabled={!this.state.editable}/>
                <CustomField name="REPR" disabled={!this.state.editable}/>
                <CustomField name="REDC" disabled={!this.state.editable}/>
                <CustomField name="PHOT" disabled={!this.state.editable}/>
                <CustomField name="NUMS" disabled={!this.state.editable}/>
                <CustomField name="MARQ" disabled={!this.state.editable}/>
                <CustomField name="DREP" disabled={!this.state.editable}/>
                <CustomField name="CATE" disabled={!this.state.editable}/>
                <CustomField name="COMM" disabled={!this.state.editable}/>
                <CustomField name="AFFE" disabled={!this.state.editable}/>
                <CustomField name="SALLES" disabled={!this.state.editable}/>
                <CustomField name="CARTELS" disabled={!this.state.editable}/>
                <CustomField name="RCL" disabled={!this.state.editable}/>
                <CustomField name="NET" disabled={!this.state.editable}/>
              </Col>
            </Row>
            <AccordionHistorique historique={this.state.notice.HISTORIQUE || []}/>
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
