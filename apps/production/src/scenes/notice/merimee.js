import React from "react";
import { Row, Col, Input, Container, Button, Form } from "reactstrap";
import { reduxForm } from "redux-form";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";
import Mapping from "../../services/Mapping";
import { Link } from "react-router-dom";
import DeleteButton from "./components/DeleteButton";
import BackButton from "./components/BackButton";
import Field from "./components/field.js";
import FieldImages from "./components/fieldImages";
import Section from "./components/section.js";
import Map from "./components/map.js";
import Comments from "./components/comments.js";
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

  load(ref) {
    this.setState({ loading: true });
    API.getNotice("merimee", ref).then(notice => {
      if (!notice) {
        this.setState({ loading: false, error: "Cette notice n'existe pas" });
        return;
      }
      console.log(notice);
      this.props.initialize(notice);

      const editable = notice.PRODUCTEUR === "Monuments Historiques" && this.props.canUpdate;
      this.setState({ loading: false, notice, editable });
    });
  }

  async onSubmit(values) {
    this.setState({ saving: true });
    await API.updateNotice(this.state.notice.REF, "merimee", values);
    toastr.success(
      "Modification enregistrée",
      "La modification sera visible dans 1 à 5 min en diffusion"
    );
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
        <h2 className="main-title">{`${this.state.notice.TICO} (${this.state.notice.REF})`}</h2>
        <Form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))} className="main-body">
          <Comments POP_COMMENTAIRES={this.state.notice.POP_COMMENTAIRES} />

          <FieldImages
            name="MEMOIRE"
            canOrder={this.state.editable} // We can ordering images only if we have the proper rights on the notice
            canEdit={false} // As image come from memoire, we can't delete or update an image from merimee
            external={true}
            getAbsoluteUrl={e => {
              if (e.url.indexOf("memoire/") === 0) {
                return `${bucket_url}${e.url}`;
              } else {
                return e.url;
              }
            }}
            footer={e => {
              return (
                <Link to={`/notice/memoire/${e.ref}`} target="_blank">
                  {e.ref}
                </Link>
              );
            }}
          />

          <Section
            title="Références documentaires"
            icon={require("../../assets/law.png")}
            color="#FE997B"
          >
            <Row>
              <Col sm={6}>
                <CustomField name="REF" disabled={true} />
                <CustomField name="DOMN" disabled={true} />
                <CustomField
                  title="N° de renvoi au domaine MH ou au domaine INVENTAIRE (RENV ) :"
                  name="RENV"
                  createUrl={e => `/notice/merimee/${e}`}
                  disabled={!this.state.editable}
                />
                <CustomField
                  name="REFO"
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
            title="Désignation de l'édifice"
            icon={require("../../assets/law.png")}
            color="#FE997B"
          >
            <Row>
              <Col sm={6}>
                <CustomField name="GENR" disabled={!this.state.editable} />
                <CustomField name="DENO" disabled={!this.state.editable} />
                <CustomField name="PDEN" disabled={!this.state.editable} />
                <CustomField name="VOCA" disabled={!this.state.editable} />
                <CustomField name="APPL" disabled={!this.state.editable} />
                <CustomField name="ACTU" disabled={!this.state.editable} />
              </Col>
              <Col sm={6}>
                <CustomField name="TICO" disabled={!this.state.editable} />
                <CustomField name="PART" disabled={!this.state.editable} />
                <CustomField
                  name="REFP"
                  createUrl={e => `/notice/merimee/${e}`}
                  disabled={!this.state.editable}
                />
                <CustomField name="PARN" disabled={!this.state.editable} />
                <CustomField name="COLL" disabled={!this.state.editable} />
              </Col>
            </Row>
          </Section>

          <Section
            title="Localisation de l'édifice"
            icon={require("../../assets/law.png")}
            color="#FE997B"
          >
            <Row>
              <Col sm={6}>
                <CustomField name="LOCA" disabled={!this.state.editable} />
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
              </Col>
              <Col sm={6}>
                <CustomField name="EDIF" disabled={!this.state.editable} />
                <CustomField
                  name="REFE"
                  createUrl={e => `/notice/merimee/${e}`}
                  disabled={!this.state.editable}
                  footer={key => {
                    <Link to={`/notice/memoire/${key}`} target="_blank">
                      {key}
                    </Link>;
                  }}
                />
                <CustomField name="CADA" disabled={!this.state.editable} />
                <CustomField name="ZONE" disabled={!this.state.editable} />
                <CustomField name="COOR" disabled={!this.state.editable} />
                <CustomField name="COORM" disabled={!this.state.editable} />
                <CustomField name="POP_COORDONNEES.lat" disabled={true} />
                <CustomField name="POP_COORDONNEES.lon" disabled={true} />
                <CustomField name="IMPL" disabled={!this.state.editable} />
                <CustomField name="HYDR" disabled={!this.state.editable} />
              </Col>
            </Row>
          </Section>

          <Section
            title="Description de l'édifice"
            icon={require("../../assets/law.png")}
            color="#FE997B"
          >
            <Row>
              <Col sm={6}>
                <CustomField name="MURS" disabled={!this.state.editable} />
                <CustomField name="TOIT" disabled={!this.state.editable} />
                <CustomField name="PLAN" disabled={!this.state.editable} />
                <CustomField name="ETAG" disabled={!this.state.editable} />
                <CustomField name="VOUT" disabled={!this.state.editable} />
                <CustomField name="ELEV" disabled={!this.state.editable} />
                <CustomField name="COUV" disabled={!this.state.editable} />
                <CustomField name="ESCA" disabled={!this.state.editable} />
                <CustomField name="ENER" disabled={!this.state.editable} />
              </Col>
              <Col sm={6}>
                <CustomField name="VERT" disabled={!this.state.editable} />
                <CustomField name="DESC" disabled={!this.state.editable} />
                <CustomField name="TECH" disabled={!this.state.editable} />
                <CustomField name="REPR" disabled={!this.state.editable} />
                <CustomField name="PREP" disabled={!this.state.editable} />
                <CustomField name="DIMS" disabled={!this.state.editable} />
                <CustomField name="TYPO" disabled={!this.state.editable} />
                <CustomField name="ETAT" disabled={!this.state.editable} />
              </Col>
            </Row>
          </Section>

          <Section
            title="Historique de l'édifice"
            icon={require("../../assets/law.png")}
            color="#FE997B"
          >
            <Row>
              <Col sm={6}>
                <CustomField name="SCLE" disabled={!this.state.editable} />
                <CustomField name="SCLD" disabled={!this.state.editable} />
                <CustomField name="DATE" disabled={!this.state.editable} />
                <CustomField name="JDAT" disabled={!this.state.editable} />
                <CustomField name="AUTR" disabled={!this.state.editable} />
              </Col>
              <Col sm={6}>
                <CustomField name="JATT" disabled={!this.state.editable} />
                <CustomField name="PERS" disabled={!this.state.editable} />
                <CustomField name="REMP" disabled={!this.state.editable} />
                <CustomField name="DEPL" disabled={!this.state.editable} />
                <CustomField name="HIST" disabled={!this.state.editable} />
              </Col>
            </Row>
          </Section>
          <Section
            title="Protection Monument historique de l'édifice"
            icon={require("../../assets/law.png")}
            color="#FE997B"
          >
            <Row>
              <Col sm={6}>
                <CustomField name="PROT" disabled={!this.state.editable} />
                <CustomField name="DPRO" disabled={!this.state.editable} />
                <CustomField name="PPRO" disabled={!this.state.editable} />
                <CustomField name="APRO" disabled={!this.state.editable} />
                <CustomField name="MHPP" disabled={!this.state.editable} />
                <CustomField name="SITE" disabled={!this.state.editable} />
              </Col>
              <Col sm={6}>
                <CustomField name="DLAB" disabled={!this.state.editable} />
                <CustomField name="INTE" disabled={!this.state.editable} />
                <CustomField name="REMA" disabled={!this.state.editable} />
                <CustomField name="OBS" disabled={!this.state.editable} />
                <CustomField name="ARCHEO" disabled={!this.state.editable} />
              </Col>
            </Row>
          </Section>

          <Section
            title="Statut juridique de l'édifice"
            icon={require("../../assets/law.png")}
            color="#FE997B"
          >
            <Row>
              <Col sm={6}>
                <CustomField name="STAT" disabled={!this.state.editable} />
                <CustomField name="PSTA" disabled={!this.state.editable} />
                <CustomField name="AFFE" disabled={!this.state.editable} />
              </Col>
              <Col sm={6}>
                <CustomField name="PAFF" disabled={!this.state.editable} />
                <CustomField name="VISI" disabled={!this.state.editable} />
              </Col>
            </Row>
          </Section>
          <Section
            title="Gestion de la base de données"
            icon={require("../../assets/law.png")}
            color="#FE997B"
          >
            <Row>
              <Col sm={6}>
                <CustomField name="IDAGR" disabled={!this.state.editable} />
                <CustomField name="MICR" disabled={!this.state.editable} />
                <CustomField name="MFICH" disabled={!this.state.editable} />
                <CustomField name="VIDEO" disabled={!this.state.editable} />
                <CustomField name="AUTP" disabled={!this.state.editable} />
                <CustomField name="IMAGE" disabled={!this.state.editable} />
                <CustomField name="IMG" disabled={!this.state.editable} />
                <CustomField name="LBASE2" disabled={!this.state.editable} />
                <CustomField name="WEB" disabled={!this.state.editable} />
                <CustomField name="DOSADRS" disabled={!this.state.editable} />
                <CustomField name="DOSURL" disabled={!this.state.editable} />
              </Col>
              <Col sm={6}>
                <CustomField name="DOSURLPDF" disabled={!this.state.editable} />
                <CustomField name="LIENS" disabled={!this.state.editable} />
                <CustomField name="MOSA" disabled={!this.state.editable} />
                <CustomField name="WRENV" disabled={!this.state.editable} />
                <CustomField name="ACMH" disabled={!this.state.editable} />
                <CustomField name="ACURL" disabled={!this.state.editable} />
                <CustomField name="LMDP" disabled={!this.state.editable} />
                <CustomField name="RFPA" disabled={!this.state.editable} />
                <CustomField name="NBOR" disabled={!this.state.editable} />
              </Col>
            </Row>
          </Section>

          <Map notice={this.state.notice} />
          {this.props.canUpdate ? (
            <div className="buttons">
              <BackButton history={this.props.history} />
              <DeleteButton noticeType="merimee" noticeRef={this.state.notice.REF} />
              <Button disabled={!this.state.editable} color="primary" type="submit">
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
const CustomField = ({ name, disabled, ...rest }) => {
  return (
    <Field
      {...Mapping.merimee[name]}
      disabled={
        Mapping.merimee[name].generated == true ||
        // Mapping.merimee[name].deprecated == true ||
        disabled
      }
      name={name}
      {...rest}
    />
  );
};

const mapStateToProps = ({ Auth }) => {
  const { role, group } = Auth.user;
  return {
    canUpdate: Auth.user
      ? (role === "producteur" || role === "administrateur") &&
        (group === "mh" || group === "admin")
      : false
  };
};

export default connect(
  mapStateToProps,
  {}
)(reduxForm({ form: "notice" })(Notice));
