import React from "react";
import { Row, Col, Container, Button, Form } from "reactstrap";
import { reduxForm } from "redux-form";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";
import Mapping from "../../services/mapping";
import { Link } from "react-router-dom";
import DeleteButton from "./components/DeleteButton";
import BackButton from "./components/BackButton";
import Field from "./components/field";
import FieldImages from "./components/fieldImages";
import Section from "./components/section.js";
import Comments from "./components/comments.js";
import Map from "./components/map.js";
import { bucket_url } from "../../config.js";
import Loader from "../../components/Loader";
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
    if (this.props.match && this.props.match.params.ref !== newProps.match.params.ref) {
      this.load(newProps.match.params.ref);
    }
  }

  async load(ref) {
    this.setState({ loading: true });
    const notice = await API.getNotice("palissy", ref);
    if (!notice) {
      this.setState({ loading: false, error: "Cette notice n'existe pas" });
      return;
    }

    console.log("NOTICE", notice);
    this.props.initialize(notice);
    const editable = this.canEdit(notice);
    this.setState({ loading: false, notice, editable });
  }

  canEdit(notice) {
    if (this.props.group === "admin") {
      return true;
    }
    if (this.props.group === "mh") {
      return (
        ["producteur", "administrateur"].includes(this.props.role) &&
        ["Monuments Historiques", "Architecture", "Etat", "Autre"].includes(notice.PRODUCTEUR)
      );
    }
    return false;
  }

  async onSubmit(values) {
    this.setState({ saving: true });
    try {
      await API.updateNotice(this.state.notice.REF, "palissy", values);
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

    const arr = [];
    for (var key in this.state.notice) {
      if (this.state.notice[key]) {
        arr.push(<span key={key}>{`${key}:${this.state.notice[key]}`}</span>);
      }
    }

    return (
      <Container className="notice">
        <BackButton left history={this.props.history} />
        <h2 className="main-title">
          {`${this.state.notice.TICO} (${this.state.notice.REF})`}{" "}
          <a
            style={{ fontSize: "small" }}
            target="_blank"
            rel="noopener"
            href={`https://www.pop.culture.gouv.fr/notice/palissy/${this.state.notice.REF}`}
          >
            voir en diffusion
          </a>
        </h2>
        <Form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))} className="main-body">
          <Comments POP_FLAGS={this.state.notice.POP_FLAGS} />

          <FieldImages
            name="MEMOIRE"
            canOrder={this.state.editable} // We can ordering images only if we have the proper rights on the notice
            canEdit={false} // As image come from memoire, we can't delete or update an image from palissy
            external={true}
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

          <Section
            title="Références documentaires"
            icon={require("../../assets/info.png")}
            color="#FF7676"
          >
            <Row>
              <Col sm={6}>
                <CustomField name="REF" disabled={true} />
                <CustomField name="PRODUCTEUR" disabled={true} />
                <CustomField name="DOMN" disabled={!this.state.editable} />
                <CustomField
                  name="RENV"
                  createUrl={e => `/notice/palissy/${e}`}
                  disabled={!this.state.editable}
                />
                <CustomField name="DENQ" disabled={!this.state.editable} />
                <CustomField name="DBOR" disabled={!this.state.editable} />
                <CustomField name="NOMS" disabled={!this.state.editable} />
                <CustomField name="DMIS" disabled={!this.state.editable} />
                <CustomField name="DMAJ" disabled={!this.state.editable} />
              </Col>
              <Col sm={6}>
                <CustomField name="THEM" disabled={!this.state.editable} />
                <CustomField name="ETUD" disabled={!this.state.editable} />
                <CustomField name="DOSS" disabled={!this.state.editable} />
                <CustomField name="COPY" disabled={!this.state.editable} />
                <CustomField name="CONTACT" disabled={!this.state.editable} />
              </Col>
            </Row>
          </Section>

          <Section
            title="Désignation de l'objet"
            icon={require("../../assets/info.png")}
            color="#FF7676"
          >
            <Row>
              <Col sm={6}>
                <CustomField name="DENO" disabled={!this.state.editable} />
                <CustomField name="PDEN" disabled={!this.state.editable} />
                <CustomField name="TITR" disabled={!this.state.editable} />
                <CustomField name="NART" disabled={!this.state.editable} />
                <CustomField name="APPL" disabled={!this.state.editable} />
                <CustomField name="TICO" disabled={!this.state.editable} />
              </Col>
              <Col sm={6}>
                <CustomField name="PART" disabled={!this.state.editable} />
                <CustomField
                  name="REFP"
                  createUrl={e => `/notice/palissy/${e}`}
                  disabled={!this.state.editable}
                />
                <CustomField name="PARN" disabled={!this.state.editable} />
                <CustomField name="PAPP" disabled={!this.state.editable} />

                <CustomField
                  name="REFE"
                  createUrl={e => `/notice/palissy/${e}`}
                  disabled={!this.state.editable}
                />
              </Col>
            </Row>
          </Section>

          <Section
            title="Localisation de l'objet"
            icon={require("../../assets/info.png")}
            color="#FF7676"
          >
            <Row>
              <Col sm={6}>
                <CustomField name="REG" disabled={!this.state.editable} />
                <CustomField name="DPT" disabled={!this.state.editable} />
                <CustomField name="COM" disabled={!this.state.editable} />
                <CustomField name="WCOM" disabled={!this.state.editable} />
                <CustomField name="INSEE" disabled={!this.state.editable} />
                <CustomField name="PLOC" disabled={!this.state.editable} />
                <CustomField name="AIRE" disabled={!this.state.editable} />
                <CustomField name="CANT" disabled={!this.state.editable} />
                <CustomField name="LIEU" disabled={!this.state.editable} />
                <CustomField name="ADRS" disabled={!this.state.editable} />
                <CustomField name="WADRS" disabled={!this.state.editable} />
                <CustomField name="EDIF" disabled={!this.state.editable} />
                <CustomField
                  name="REFA"
                  createUrl={e => `/notice/merimee/${e}`}
                  disabled={!this.state.editable}
                />
              </Col>
              <Col sm={6}>
                <CustomField name="ZONE" disabled={!this.state.editable} />
                <CustomField name="COOR" disabled={!this.state.editable} />
                <CustomField name="COORM" disabled={!this.state.editable} />
                <CustomField name="POP_COORDONNEES.lat" disabled={!this.state.editable} />
                <CustomField name="POP_COORDONNEES.lon" disabled={!this.state.editable} />
                <CustomField name="IMPL" disabled={!this.state.editable} />
                <CustomField name="EMPL" disabled={!this.state.editable} />
                <CustomField name="DEPL" disabled={!this.state.editable} />
                <CustomField name="VOLS" disabled={!this.state.editable} />
                <div className="subtitle">Pour certains objets privés</div>
                <CustomField name="COM2" disabled={!this.state.editable} />
                <CustomField name="INSEE2" disabled={!this.state.editable} />
                <CustomField name="EDIF2" disabled={!this.state.editable} />
                <CustomField name="ADRS2" disabled={!this.state.editable} />
                <CustomField name="EMPL2" disabled={!this.state.editable} />
              </Col>
            </Row>
          </Section>

          <Section
            title="Description de l'objet"
            icon={require("../../assets/info.png")}
            color="#FF7676"
          >
            <Row>
              <Col sm={6}>
                <CustomField name="CATE" disabled={!this.state.editable} />
                <CustomField name="STRU" disabled={!this.state.editable} />
                <CustomField name="MATR" disabled={!this.state.editable} />
                <CustomField name="DESC" disabled={!this.state.editable} />
                <CustomField name="REPR" disabled={!this.state.editable} />
                <CustomField name="PREP" disabled={!this.state.editable} />
                <CustomField name="DIMS" disabled={!this.state.editable} />
              </Col>
              <Col sm={6}>
                <CustomField name="PDIM" disabled={!this.state.editable} />
                <CustomField name="ETAT" disabled={!this.state.editable} />
                <CustomField name="PETA" disabled={!this.state.editable} />
                <CustomField name="INSC" disabled={!this.state.editable} />
                <CustomField name="PINS" disabled={!this.state.editable} />
              </Col>
            </Row>
          </Section>

          <Section
            title="Historique de l'objet"
            icon={require("../../assets/info.png")}
            color="#FF7676"
          >
            <Row>
              <Col sm={6}>
                <CustomField name="SCLE" disabled={!this.state.editable} />
                <CustomField name="SCLX" disabled={!this.state.editable} />
                <CustomField name="DATE" disabled={!this.state.editable} />
                <CustomField name="AUTR" disabled={!this.state.editable} />
                <CustomField name="PERS" disabled={!this.state.editable} />
                <CustomField name="AFIG" disabled={!this.state.editable} />
              </Col>
              <Col sm={6}>
                <CustomField name="ATEL" disabled={!this.state.editable} />
                <CustomField name="EXEC" disabled={!this.state.editable} />
                <CustomField name="ORIG" disabled={!this.state.editable} />
                <CustomField name="STAD" disabled={!this.state.editable} />
                <CustomField name="HIST" disabled={!this.state.editable} />
              </Col>
            </Row>
          </Section>

          <Section
            title="Statut juridique de l'objet"
            icon={require("../../assets/info.png")}
            color="#FF7676"
          >
            <Row>
              <Col sm={6}>
                <CustomField name="STAT" disabled={!this.state.editable} />
                <CustomField name="PROT" disabled={!this.state.editable} />
                <CustomField name="DPRO" disabled={!this.state.editable} />
                <CustomField name="PPRO" disabled={!this.state.editable} />
                <CustomField name="INTE" disabled={!this.state.editable} />
              </Col>
              <Col sm={6}>
                <CustomField name="NINV" disabled={!this.state.editable} />
                <CustomField name="NUMA" disabled={!this.state.editable} />
                <CustomField name="OBS" disabled={!this.state.editable} />
                <CustomField name="PRECISION_JURIDIQUE" disabled={!this.state.editable} />
              </Col>
            </Row>
          </Section>

          <Section
            title="Références documentaires de l'objet"
            icon={require("../../assets/info.png")}
            color="#FF7676"
          >
            <Row>
              <Col sm={6}>
                <CustomField name="ACQU" disabled={!this.state.editable} />
                <CustomField name="EXPO" disabled={!this.state.editable} />
                <CustomField name="BIBL" disabled={!this.state.editable} />
              </Col>
              <Col sm={6}>
                <CustomField name="SOUR" disabled={!this.state.editable} />
                <CustomField name="PHOTO" disabled={!this.state.editable} />
              </Col>
            </Row>
          </Section>

          <Section
            title="Gestion de la base de données"
            icon={require("../../assets/info.png")}
            color="#FF7676"
          >
            <Row>
              <Col sm={6}>
                <CustomField name="IDAGR" disabled={!this.state.editable} />
                <CustomField name="MICR" disabled={!this.state.editable} />
                <CustomField name="MFICH" disabled={!this.state.editable} />
                <CustomField name="VIDEO" disabled={!this.state.editable} />
                <CustomField name="NUMP" disabled={!this.state.editable} />
                <CustomField name="AUTP" disabled={!this.state.editable} />
                <CustomField name="DIFF" disabled={!this.state.editable} />
                <CustomField name="IMAGE" disabled={!this.state.editable} />
              </Col>
              <Col sm={6}>
                <CustomField name="LBASE2" disabled={!this.state.editable} />
                <CustomField name="WEB" disabled={!this.state.editable} />
                <CustomField name="DOSADRS" disabled={!this.state.editable} />
                <CustomField name="DOSURL" disabled={!this.state.editable} />
                <CustomField name="DOSURLPDF" disabled={true} />
                <CustomField name="LIENS" disabled={!this.state.editable} />
                <CustomField name="MOSA" disabled={!this.state.editable} />
                <CustomField name="RENP" disabled={!this.state.editable} />
              </Col>
            </Row>
          </Section>
          <Map notice={this.state.notice} />
          <div className="buttons">
            <BackButton history={this.props.history} />
            {this.state.editable ? (
              <React.Fragment>
                <DeleteButton noticeType="palissy" noticeRef={this.state.notice.REF} />
                <Button disabled={!this.state.editable} color="primary" type="submit">
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
  if (!Mapping.palissy[name]) {
    console.log(name, " n'existe pas");
    return <div />;
  }
  return (
    <Field
      {...Mapping.palissy[name]}
      disabled={Mapping.palissy[name].generated == true || disabled}
      name={name}
      {...rest}
    />
  );
};

const mapStateToProps = ({ Auth }) => {
  const { role, group } = Auth.user;
  return { role, group };
};

export default connect(
  mapStateToProps,
  {}
)(reduxForm({ form: "notice" })(Notice));
