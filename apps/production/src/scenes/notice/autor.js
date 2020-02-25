import React from "react";
import { bucket_url} from "../../config.js"
import { Col, Container, Button, Form, Row } from "reactstrap";
import { reduxForm } from "redux-form";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";
import Mapping from "../../services/mapping";
import FieldImages from "./components/fieldImages";
import { Link } from "react-router-dom";
import BackButton from "./components/BackButton";
import DeleteButton from "./components/DeleteButton";
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
        <FieldImages
            name="MEMOIRE"
            canOrder={this.state.editable} // We can ordering images only if we have the proper rights on the notice
            canEdit={false} // As image come from memoire, we can't delete or update an image from autor
            external={true}
            hideButton={true} // As image come from memoire, we can't delete or update an image from autor
            getAbsoluteUrl={e => {
              if (!e.url) {
                return "";
              }
              if (e.url && e.url.indexOf("memoire/") === 0) {
                return `${bucket_url}${e.url}`;
              } else {
                return e.url;
              }
            }}
            footer={e => {
              return (
                <Link to={`/notice/memoire/${e.ref}`} target="_blank" rel="noopener">
                  {e.ref}
                </Link>
              );
            }}
          />
          <Section title="Identification" icon={require("../../assets/info.png")} color="#FF7676">
            <Row>
              <Col sm={6}>
                <CustomField name="REF" disabled={this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="ISNI" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="ISNI_VERIFIEE" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="ALIAS" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="BASE" disabled={this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="BIBLIO" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="BIO" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="CONTACT" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="COPY" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="DMORT" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="DNAISS" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="EXPO" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="INI" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="FONC" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="VIDEO" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="LIENS" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="LMDP" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="LMORT" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="LOCA" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="LNAISS" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="NATIO" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="IDENT" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="ARK" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="OBS" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="DMAJ" disabled={this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="DMIS" disabled={this.state.editable} hidedescriptionifempty={true}/>
              </Col>
              <Col sm={6}>
                <CustomField name="NOM" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="PREN" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="PNOM" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="ADRS" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="TYPAPE" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="SCLE" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="DATES" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="REJET" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="OEUVR" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="PUBLI" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="PRODUCTEUR" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="ALAMAP" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="PREF" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="LOCACT" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="LBASE" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="BIF" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="REDAC" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="LRELA" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="FORM" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="SOURCES" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="STAT" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="SYMB" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="INS" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="TITR" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="GAR" disabled={!this.state.editable} hidedescriptionifempty={true}/>
                <CustomField name="TYPID" disabled={!this.state.editable} hidedescriptionifempty={true}/>
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
  // An "administrateur" (from "autor" or "admin" group) can delete.
  const canDelete =
    Auth.user && role === "administrateur" && (group === "autor" || group === "admin");
  // If you can delete, you can update (see above).
  // Also, you can update if you are a "producteur" from "autor"
  const canUpdate = canDelete || (Auth.user && role === "producteur" && group === "autor");
  return {
    canDelete,
    canUpdate,
    user: { role, group }
  };
};

export default connect(
  mapStateToProps,
  {}
)(reduxForm({ form: "notice" })(Notice));
