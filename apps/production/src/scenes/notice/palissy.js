import React from "react";
import { Row, Col, Container, Button, Form } from "reactstrap";
import { reduxForm } from "redux-form";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";
import { Mapping } from "pop-shared";
import { Link } from "react-router-dom";

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

  load(ref) {
    this.setState({ loading: true });
    API.getNotice("palissy", ref).then(notice => {
      if (!notice) {
        this.setState({
          loading: false,
          error: `Impossible de charger la notice ${ref}`
        });
        console.error(`Impossible de charger la notice ${ref}`);
        return;
      }
      console.log("NOTICE", notice);
      this.props.initialize({ ...notice, IMG: notice.IMG ? [notice.IMG] : [] });
      const editable = notice.PRODUCTEUR === "Monuments Historiques" && this.props.canUpdate;
      this.setState({ loading: false, notice, editable });
    });
  }

  onSubmit(values) {
    this.setState({ saving: true });

    console.log("VALUES", values);
    API.updateNotice(this.state.notice.REF, "palissy", values).then(e => {
      toastr.success(
        "Modification enregistrée",
        "La modification sera visible dans 1 à 5 min en diffusion"
      );
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
        API.deleteNotice("palissy", ref).then(() => {
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

    const arr = [];
    for (var key in this.state.notice) {
      if (this.state.notice[key]) {
        arr.push(<span key={key}>{`${key}:${this.state.notice[key]}`}</span>);
      }
    }

    return (
      <Container className="notice" fluid>
        <Form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))} className="main-body">
          <Comments POP_COMMENTAIRES={this.state.notice.POP_COMMENTAIRES} />
          <Row>
            <div className="back" onClick={() => this.props.history.goBack()}>
              Retour
            </div>
          </Row>
          <Row>
            <Col className="image" sm={6}>
              <FieldImages
                name="MEMOIRE"
                disabled
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
            </Col>
            <Col className="image" sm={6}>
              <Map notice={this.state.notice} />
            </Col>
          </Row>
          <Section
            title="REFERENCES ET GESTION DOCUMENTAIRES"
            icon={require("../../assets/info.png")}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugia"
            color="#FF7676"
          >
            <Col sm={6}>
              <CustomField name="REF" disabled={true} />
              <CustomField name="PRODUCTEUR" disabled={true} />
              <CustomField
                name="RENV"
                createUrl={e => `/notice/palissy/${e}`}
                disabled={!this.state.editable}
              />
              <CustomField name="DENQ" disabled={!this.state.editable} />
              <CustomField name="COPY" disabled={!this.state.editable} />
              <CustomField name="DMAJ" disabled={!this.state.editable} />
              <CustomField name="DOMN" disabled={!this.state.editable} />
              <CustomField
                name="REFA"
                createUrl={e => `/notice/merimee/${e}`}
                disabled={!this.state.editable}
              />
              <CustomField name="AUTP" disabled={!this.state.editable} />
              <CustomField name="DOSADRS" disabled={!this.state.editable} />
              <CustomField name="CONTACT" disabled={!this.state.editable} />
              <CustomField name="PAPP" disabled={!this.state.editable} />
              <CustomField name="DOSURL" disabled={!this.state.editable} />
              <CustomField name="DOSURLPDF" disabled={true} />
            </Col>
            <Col sm={6}>
              <CustomField name="LIENS" disabled={!this.state.editable} />
              <CustomField name="DBOR" disabled={!this.state.editable} />
              <CustomField name="NOMS" disabled={!this.state.editable} />
              <CustomField name="ETUD" disabled={!this.state.editable} />
              <CustomField name="DOSS" disabled={!this.state.editable} />
              <CustomField name="DMIS" disabled={!this.state.editable} />
              <CustomField name="MICR" disabled={!this.state.editable} />
              <CustomField name="THEM" disabled={!this.state.editable} />
              <CustomField name="WEB" disabled={!this.state.editable} />
              <CustomField name="MOSA" disabled={!this.state.editable} />
            </Col>
          </Section>
          <Section
            title="DESIGNATION"
            icon={require("../../assets/law.png")}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugia"
            color="#FE997B"
          >
            <Col sm={6}>
              <CustomField name="DENO" disabled={!this.state.editable} />
              <CustomField name="PDEN" disabled={!this.state.editable} />
              <CustomField name="APPL" disabled={!this.state.editable} />
              <CustomField name="NART" disabled={!this.state.editable} />
            </Col>
            <Col sm={6}>
              <CustomField name="TICO" disabled={!this.state.editable} />
              <CustomField name="PART" disabled={!this.state.editable} />
              <CustomField
                name="REFP"
                createUrl={e => `/notice/palissy/"${e}`}
                disabled={!this.state.editable}
              />
              <CustomField
                name="REFE"
                createUrl={e => `/notice/palissy/"${e}`}
                disabled={!this.state.editable}
              />
            </Col>
          </Section>

          <Section
            title="LOCALISATION"
            icon={require("../../assets/map.png")}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugia"
            color="#FFC070"
          >
            <Col sm={6}>
              <CustomField name="REG" disabled={!this.state.editable} />
              <CustomField name="DPT" disabled={!this.state.editable} />
              <CustomField name="COM" disabled={!this.state.editable} />
              <CustomField name="INSEE" disabled={!this.state.editable} />
              <CustomField name="PLOC" disabled={!this.state.editable} />
              <CustomField name="AIRE" disabled={!this.state.editable} />
              <CustomField name="CANT" disabled={!this.state.editable} />
              <CustomField name="LIEU" disabled={!this.state.editable} />
              <CustomField name="ADRS" disabled={!this.state.editable} />
              <CustomField name="EDIF" disabled={!this.state.editable} />
            </Col>
            <Col sm={6}>
              <CustomField name="ZONE" disabled={!this.state.editable} />
              <CustomField name="COOR" disabled={!this.state.editable} />
              <CustomField name="COORM" disabled={!this.state.editable} />
              <CustomField name="IMPL" disabled={!this.state.editable} />
              <CustomField name="LOCA" disabled={!this.state.editable} />
              <CustomField name="EMPL" disabled={!this.state.editable} />
              <CustomField name="VOLS" disabled={!this.state.editable} />
            </Col>
          </Section>
          <Section
            title="Historique"
            icon={require("../../assets/date.png")}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugia"
            color="#668796"
          >
            <Col sm={6}>
              <CustomField name="SCLE" disabled={!this.state.editable} />
              <CustomField name="DATE" disabled={!this.state.editable} />
              <CustomField name="JDAT" disabled={!this.state.editable} />
              <CustomField name="AUTR" disabled={!this.state.editable} />
              <CustomField name="AFIG" disabled={!this.state.editable} />
              <CustomField name="ATEL" disabled={!this.state.editable} />
              <CustomField name="EXEC" disabled={!this.state.editable} />
              <CustomField name="ORIG" disabled={!this.state.editable} />
            </Col>
            <Col sm={6}>
              <CustomField name="PERS" disabled={!this.state.editable} />
              <CustomField name="DEPL" disabled={!this.state.editable} />
              <CustomField name="HIST" disabled={!this.state.editable} />
              <CustomField name="STAD" disabled={!this.state.editable} />
            </Col>
          </Section>
          <Section title="DESCRIPTION" icon={require("../../assets/tool.png")} color="#FBE367">
            <Col sm={6}>
              <CustomField name="REPR" disabled={!this.state.editable} />
              <CustomField name="PREP" disabled={!this.state.editable} />
              <CustomField name="CATE" disabled={!this.state.editable} />
              <CustomField name="STRU" disabled={!this.state.editable} />
              <CustomField name="MATR" disabled={!this.state.editable} />
              <CustomField name="PINT" disabled={!this.state.editable} />
            </Col>
            <Col sm={6}>
              <CustomField name="DIMS" disabled={!this.state.editable} />
              <CustomField name="ETAT" disabled={!this.state.editable} />
              <CustomField name="DESC" disabled={!this.state.editable} />
              <CustomField name="PARN" disabled={!this.state.editable} />
              <CustomField name="PDIM" disabled={!this.state.editable} />
              <CustomField name="PETA" disabled={!this.state.editable} />
              <CustomField name="INSC" disabled={!this.state.editable} />
              <CustomField name="PINS" disabled={!this.state.editable} />
            </Col>
          </Section>
          <Section
            title="INTERET ET PROTECTION"
            icon={require("../../assets/law.png")}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugia"
            color="#FE997B"
          >
            <Col sm={6}>
              <CustomField name="PROT" disabled={!this.state.editable} />
              <CustomField name="DPRO" disabled={!this.state.editable} />
              <CustomField name="PPRO" disabled={!this.state.editable} />
            </Col>
            <Col sm={6}>
              <CustomField name="INTE" disabled={!this.state.editable} />
              <CustomField name="OBS" disabled={!this.state.editable} />
            </Col>
          </Section>
          <Section
            title="STATUT JURIDIQUE"
            icon={require("../../assets/time.png")}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugia"
            color="#00BEB2"
          >
            <Col sm={6}>
              <CustomField name="STAT" disabled={!this.state.editable} />
            </Col>
            <Col sm={6} />
          </Section>
          <Section title="AUTRE" icon={require("../../assets/law.png")} color="#FE997B">
            <Col sm={6}>
              <CustomField name="TITR" disabled={!this.state.editable} />
              <CustomField name="NINV" disabled={!this.state.editable} />
              <CustomField name="NUMA" disabled={!this.state.editable} />
              <CustomField name="IDAGR" disabled={!this.state.editable} />
              <CustomField name="ACQU" disabled={!this.state.editable} />
              <CustomField name="EXPO" disabled={!this.state.editable} />
              <CustomField name="BIBL" disabled={!this.state.editable} />
              <CustomField name="SOUR" disabled={!this.state.editable} />
              <CustomField name="PHOTO" disabled={!this.state.editable} />
            </Col>
            <Col sm={6}>
              <CustomField name="MFICH" disabled={!this.state.editable} />
              <CustomField name="VIDEO" disabled={!this.state.editable} />
              <CustomField name="NUMP" disabled={!this.state.editable} />
              <CustomField name="DIFF" disabled={!this.state.editable} />
              <CustomField name="IMAGE" disabled={!this.state.editable} />
              <CustomField name="LBASE2" disabled={!this.state.editable} />
              <CustomField name="WCOM" disabled={!this.state.editable} />
              <CustomField name="RENP" disabled={!this.state.editable} />
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
  if (!Mapping.palissy[name]) {
    console.log(name, " n'existe pas");
    return <div />;
  }
  return (
    <Field
      {...Mapping.palissy[name]}
      disabled={
        Mapping.palissy[name].generated == true ||
        // Mapping.palissy[name].deprecated == true ||
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
