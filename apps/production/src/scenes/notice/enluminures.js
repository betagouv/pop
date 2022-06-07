import React from "react";
import { Col, Container, Button, Form, Row } from "reactstrap";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import Mapping from "../../services/mapping";
import BackButton from "./components/BackButton";
import Field from "./components/field.js";
import Section from "./components/section.js";
import Comments from "./components/comments.js";
import Loader from "../../components/Loader";
import FieldImages from "./components/fieldImages";
import EnluminuresEntity from "../../entities/Enluminures";
import API from "../../services/api";
import AccordionHistorique from "./components/AccordionHistorique";
import { bucket_url } from "../../config";
import { toastr } from "react-redux-toastr";
import "./index.css";

class Enluminures extends React.Component {
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
    const notice = await API.getNotice("enluminures", ref);
    this.props.initialize(notice);
    //const editable = false;
    let editable = false;
    API.canEdit(notice.REF, "", notice.PRODUCTEUR, "enluminures").then(result => {
      editable = result.validate;
      this.setState({editable: editable});
    });

    this.setState({ loading: false, notice, editable });
  }

  async onSubmit(values) {
    this.setState({ saving: true });
    const notice = new EnluminuresEntity(values);
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
        await API.updateNotice(this.state.notice.REF, "enluminures", values, this.state.imagesFiles, "manuel");
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
            href={`https://www.pop.culture.gouv.fr/notice/enluminures/${this.state.notice.REF}`}
          >
            voir en diffusion
          </a>
        </h2>
        <Form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))} className="main-body">
          <Comments POP_FLAGS={this.state.notice.POP_FLAGS} />
          <FieldImages
            name="VIDEO"
            createUrlFromName={e => `enluminures/${this.state.notice.REF}/${e}`}
            canOrder={this.state.editable}
            canEdit={this.state.editable}
            getAbsoluteUrl={e => `${bucket_url}${e}`}
            filesToUpload={imagesFiles => this.setState({ imagesFiles })}
          />
          <Section title="Identification" icon={require("../../assets/info.png")} color="#FF7676">
            <Row>
              <Col sm={6}>
                <CustomField name="REF" disabled={!this.state.editable} />
                <CustomField name="ATTRIB" disabled={!this.state.editable} />
                <CustomField name="APPL" disabled={!this.state.editable} />
                <CustomField name="AUTR" disabled={!this.state.editable} />
                <CustomField name="AUTS" disabled={!this.state.editable} />
                <CustomField name="CONSERV" disabled={!this.state.editable} />
                <CustomField name="CONTXT" disabled={!this.state.editable} />
                <CustomField name="COTE" disabled={!this.state.editable} />
                <CustomField name="DATE" disabled={!this.state.editable} />
                <CustomField name="DATDEB" disabled={!this.state.editable} />
                <CustomField name="DATFIN" disabled={!this.state.editable} />
                <CustomField name="DIMS" disabled={!this.state.editable} />
                <CustomField name="ETAB" disabled={!this.state.editable} />
                <CustomField name="FOPG" disabled={!this.state.editable} />
                <CustomField name="FOLIOS" disabled={!this.state.editable} />
                <CustomField name="LANGOUV" disabled={!this.state.editable} />
                <CustomField name="NFICH" disabled={!this.state.editable} />
                <CustomField name="NVUE" disabled={!this.state.editable} />
                <CustomField name="NOMENC" disabled={!this.state.editable} />
                <CustomField name="NOTES" disabled={!this.state.editable} />
                <CustomField name="NOTDEC" disabled={!this.state.editable} />
                <CustomField name="RENV" 
                  createUrl={e => `/notice/enluminures/${e}`}
                  disabled={!this.state.editable} />
                <CustomField name="REFC" 
                  createUrl={e => `/notice/enluminures/${e}`}
                  disabled={!this.state.editable} />
                <CustomField name="REFDE" 
                  createUrl={e => `/notice/enluminures/${e}`}
                  disabled={!this.state.editable} />
                <CustomField name="LIENS" disabled={!this.state.editable} />
              </Col>
              <Col sm={6}>
                <CustomField name="OPHOT" disabled={!this.state.editable} />
                <CustomField name="ORIGG" disabled={!this.state.editable} />
                <CustomField name="ORIGH" disabled={!this.state.editable} />
                <CustomField name="ORIGP" disabled={!this.state.editable} />
                <CustomField name="DOMN" disabled={!this.state.editable} />
                <CustomField name="TYPE" disabled={!this.state.editable} />
                <CustomField name="POSS" disabled={!this.state.editable} />
                <CustomField name="REFD" disabled={!this.state.editable} />
                <CustomField name="REFIM" disabled={!this.state.editable} />
                <CustomField name="ENRGFP" disabled={!this.state.editable} />
                <CustomField name="ENRGMS" disabled={!this.state.editable} />
                <CustomField name="DROIT" disabled={!this.state.editable} />
                <CustomField name="COPY" disabled={!this.state.editable} />
                <CustomField name="SUJET" disabled={!this.state.editable} />
                <CustomField name="SUPP" disabled={!this.state.editable} />
                <CustomField name="TITR" disabled={!this.state.editable} />
                <CustomField name="TYPDEC" disabled={!this.state.editable} />
                <CustomField name="TYPCOD" disabled={!this.state.editable} />
                <CustomField name="LOCA" disabled={!this.state.editable} />
                <CustomField name="LOCA2" disabled={!this.state.editable} />
                <CustomField name="VISITE" disabled={!this.state.editable} />
                <CustomField name="VIDEO" disabled={!this.state.editable} />
                <CustomField name="TOUT" disabled={!this.state.editable} />
              </Col>
            </Row>
            <AccordionHistorique historique={this.state.notice.HISTORIQUE || []}/>
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
  if (!Mapping.enluminures[name]) {
    return null;
  }
  return (
    <Field
      {...Mapping.enluminures[name]}
      disabled={
        Mapping.enluminures[name].generated == true ||
        Mapping.enluminures[name].deprecated == true ||
        disabled
      }
      name={name}
      {...rest}
    />
  );
};

const mapStateToProps = ({ Auth }) => {};

export default connect(
  mapStateToProps,
  {}
)(reduxForm({ form: "notice" })(Enluminures));
