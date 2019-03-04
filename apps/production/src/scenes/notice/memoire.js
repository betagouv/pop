import React from "react";
import { Row, Col, Container, Button, Form } from "reactstrap";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import Mapping from "../../services/Mapping";
import DeleteButton from "./components/DeleteButton";
import BackButton from "./components/BackButton";
import Field from "./components/field.js";
import FieldImages from "./components/fieldImages";
import Section from "./components/section.js";
import Comments from "./components/comments.js";

import Loader from "../../components/Loader";
import API from "../../services/api";
import { bucket_url } from "../../config";

import "./index.css";

class Notice extends React.Component {
  state = {
    notice: null,
    error: "",
    loading: true,
    editable: true,
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

  canUpdate(PRODUCTEUR) {
    const { role, group } = this.props;
    const roles = ["producteur", "administrateur"];
    if (group === "mh") {
      return (
        ["CRMH", "CAOA", "UDAP", "ETAT", "AUTRE", "SAP"].includes(PRODUCTEUR) &&
        roles.includes(role)
      );
    } else if (group === "memoire") {
      return ["SAP", "AUTRE"].includes(PRODUCTEUR) && roles.includes(role);
    } else if (group === "admin") {
      return (
        ["CRMH", "CAOA", "UDAP", "INV", "ETAT", "AUTRE", "SAP", "SDAP", ""].includes(PRODUCTEUR) &&
        roles.includes(role)
      );
    }
    return false;
  }

  async load(ref) {
    this.setState({ loading: true });
    const notice = await API.getNotice("memoire", ref);
    if (!notice) {
      this.setState({
        loading: false,
        error: `Impossible de charger la notice ${ref}`
      });
      console.error(`Impossible de charger la notice ${ref}`);
      return;
    }
    const editable = this.canUpdate(notice.PRODUCTEUR);
    this.props.initialize(notice);
    this.setState({ loading: false, notice, editable });
  }

  async onSubmit(values) {
    this.setState({ saving: true });
    await API.updateNotice(this.state.notice.REF, "memoire", values, this.state.imagesFiles);
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
        <h2 class="main-title">Notice {this.state.notice.REF}</h2>
        <Form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))} className="main-body">
          <Comments POP_COMMENTAIRES={this.state.notice.POP_COMMENTAIRES} />

          <FieldImages
            name="IMG"
            disabled={!this.state.editable}
            createUrlFromName={e => `memoire/${this.state.notice.REF}/${e}`}
            getAbsoluteUrl={e => (e.indexOf("www") === -1 ? `${bucket_url}${e}` : e)}
            updateFiles={imagesFiles => this.setState({ imagesFiles })}
          />

          <Section title="Localisation" icon={require("../../assets/info.png")} color="#FF7676">
            <Col sm={6}>
              <CustomField name="LOCA" disabled={!this.state.editable} />
              <CustomField name="PAYS" disabled={!this.state.editable} />
              <CustomField name="REG" disabled={!this.state.editable} />
              <CustomField name="DPT" disabled={!this.state.editable} />
            </Col>
            <Col sm={6}>
              <CustomField name="COM" disabled={!this.state.editable} />
              <CustomField name="INSEE" disabled={!this.state.editable} />
              <CustomField name="ADRESSE" disabled={!this.state.editable} />
              <CustomField name="MCGEO" disabled={!this.state.editable} />
            </Col>
          </Section>

          <Section
            title="Identification MH"
            icon={require("../../assets/info.png")}
            color="#FF7676"
          >
            <Col sm={6}>
              <CustomField name="EDIF" disabled={!this.state.editable} />
              <CustomField name="MARQ" disabled={!this.state.editable} />
            </Col>
            <Col sm={6}>
              <CustomField name="LBASE" createUrl={getUrl} disabled={!this.state.editable} />
              <CustomField name="LBASE2" disabled={!this.state.editable} />
            </Col>
          </Section>
          <Section
            title="Identification conservation"
            icon={require("../../assets/info.png")}
            color="#FF7676"
          >
            <Col sm={6}>
              <CustomField name="TYPDOC" disabled={!this.state.editable} />
              <CustomField name="DATIMM" disabled={!this.state.editable} />
              <CustomField name="ACQU" disabled={!this.state.editable} />
              <CustomField name="COPY" disabled={!this.state.editable} />
              <CustomField name="NUMP" disabled={!this.state.editable} />
              <CustomField name="ANUMP" disabled={!this.state.editable} />
              <CustomField name="NUMAUTP" disabled={!this.state.editable} />
              <CustomField name="NUMTI" disabled={!this.state.editable} />
              <CustomField name="REPRO" disabled={!this.state.editable} />
              <CustomField name="ANUMTI" disabled={!this.state.editable} />
              <CustomField name="LIEUCTI" disabled={!this.state.editable} />
              <CustomField name="COTECTI" disabled={!this.state.editable} />
            </Col>
            <Col sm={6}>
              <CustomField name="NUMOR" disabled={!this.state.editable} />
              <CustomField name="ANUMOR" disabled={!this.state.editable} />
              <CustomField name="LIEUCOR" disabled={!this.state.editable} />
              <CustomField name="COTECOR" disabled={!this.state.editable} />
              <CustomField name="PRECOR" disabled={!this.state.editable} />
              <CustomField name="LIEUORIG" disabled={!this.state.editable} />
              <CustomField name="MENTOR" disabled={!this.state.editable} />
              <CustomField name="OBSOR" disabled={!this.state.editable} />
              <CustomField name="NUMCAF" disabled={!this.state.editable} />
              <CustomField name="MENTTI" disabled={!this.state.editable} />
              <CustomField name="OBSTI" disabled={!this.state.editable} />
              <CustomField name="RENV" disabled={!this.state.editable} />
            </Col>
          </Section>

          <Section
            title="Gestion base de donnée"
            icon={require("../../assets/info.png")}
            color="#FF7676"
          >
            <Col sm={6}>
              <CustomField name="REF" disabled={!this.state.editable} />
              <CustomField name="PRODUCTEUR" disabled={!this.state.editable} />
              <CustomField name="EMET" disabled={!this.state.editable} />
              <CustomField name="IDPROD" disabled={!this.state.editable} />
            </Col>
            <Col sm={6}>
              <CustomField name="IMG" disabled={true} />
              <CustomField name="TYPEIMG" disabled={!this.state.editable} />
              <CustomField name="NVD" disabled={!this.state.editable} />
            </Col>
          </Section>

          <Section title="Auteur" icon={require("../../assets/info.png")} color="#FF7676">
            <Col sm={6}>
              <CustomField name="AUTP" disabled={!this.state.editable} />
              <CustomField name="AUTTI" disabled={!this.state.editable} />
            </Col>
            <Col sm={6}>
              <CustomField name="AUTOR" disabled={!this.state.editable} />
            </Col>
          </Section>

          <Section
            title="Description image"
            icon={require("../../assets/info.png")}
            color="#FF7676"
          >
            <Col sm={6}>
              <CustomField name="DOM" disabled={!this.state.editable} />
              <CustomField name="SERIE" disabled={!this.state.editable} />
              <CustomField name="LEG" disabled={!this.state.editable} />
              <CustomField name="OBJT" disabled={!this.state.editable} />
              <CustomField name="MCL" disabled={!this.state.editable} />
              <CustomField name="MCPER" disabled={!this.state.editable} />
              <CustomField name="ADPHOT" disabled={!this.state.editable} />
            </Col>
            <Col sm={6}>
              <CustomField name="PUBLI" disabled={!this.state.editable} />
              <CustomField name="TIREDE" disabled={!this.state.editable} />
              <CustomField name="OBS" disabled={!this.state.editable} />
              <CustomField name="MENTIONS" disabled={!this.state.editable} />
              <CustomField name="LIB" disabled={!this.state.editable} />
            </Col>
          </Section>

          <Section title="Date" icon={require("../../assets/info.png")} color="#FF7676">
            <Col sm={6}>
              <CustomField name="DATPV" disabled={!this.state.editable} />
              <CustomField name="JDATPV" disabled={!this.state.editable} />
            </Col>
            <Col sm={6}>
              <CustomField name="DATOR" disabled={!this.state.editable} />
              <CustomField name="EXPO" disabled={!this.state.editable} />
            </Col>
          </Section>

          <Section
            title="Oeuvre représentée"
            icon={require("../../assets/info.png")}
            color="#FF7676"
          >
            <Col sm={6}>
              <CustomField name="AUTOEU" disabled={!this.state.editable} />
              <CustomField name="AUTG" disabled={!this.state.editable} />
              <CustomField name="DATOEU" disabled={!this.state.editable} />
              <CustomField name="SCLE" disabled={!this.state.editable} />
              <CustomField name="TITRE" disabled={!this.state.editable} />
            </Col>
            <Col sm={6}>
              <CustomField name="THEATRE" disabled={!this.state.editable} />
              <CustomField name="ROLE" disabled={!this.state.editable} />
              <CustomField name="ACC" disabled={!this.state.editable} />
              <CustomField name="TOILE" disabled={!this.state.editable} />
              <CustomField name="COSTUME" disabled={!this.state.editable} />
            </Col>
          </Section>

          <Section
            title="Technique support original"
            icon={require("../../assets/info.png")}
            color="#FF7676"
          >
            <Col sm={6}>
              <CustomField name="TECH" disabled={!this.state.editable} />
              <CustomField name="FORMAT" disabled={!this.state.editable} />
              <CustomField name="SENS" disabled={!this.state.editable} />
              <CustomField name="COULEUR" disabled={!this.state.editable} />
              <CustomField name="TECHTI" disabled={!this.state.editable} />
            </Col>
            <Col sm={6}>
              <CustomField name="FORMATTI" disabled={!this.state.editable} />
              <CustomField name="FORMATOR" disabled={!this.state.editable} />
              <CustomField name="TECHOR" disabled={!this.state.editable} />
              <CustomField name="ECH" disabled={!this.state.editable} />
            </Col>
          </Section>
          <Section title="AUTRES" icon={require("../../assets/info.png")} color="#FF7676">
            <Col sm={6}>
              <CustomField name="ADRS" disabled={!this.state.editable} />
              <CustomField name="AIRE" disabled={!this.state.editable} />
              <CustomField name="CHRONO" disabled={!this.state.editable} />
              <CustomField name="CONTACT" disabled={!this.state.editable} />
              <CustomField name="COTECP" disabled={!this.state.editable} />
              <CustomField name="DATD" disabled={!this.state.editable} />
              <CustomField name="DATG" disabled={!this.state.editable} />
              <CustomField name="DATTI" disabled={!this.state.editable} />
              <CustomField name="DIFF" disabled={!this.state.editable} />
              <CustomField name="DMAJ" disabled={!this.state.editable} />
              <CustomField name="DMIS" disabled={!this.state.editable} />
              <CustomField name="EDIARCH" disabled={!this.state.editable} />
              <CustomField name="IDPROD" disabled={!this.state.editable} />
              {/* <CustomField name="IMG" disabled={!this.state.editable} /> */}
              <CustomField name="INSEE" disabled={!this.state.editable} />
              <CustomField name="LAUTP" disabled={!this.state.editable} />
              <CustomField name="LEG2" disabled={!this.state.editable} />
              <CustomField name="LIENS" disabled={!this.state.editable} />
              <CustomField name="LIEU" disabled={!this.state.editable} />
              <CustomField name="LIEUCP" disabled={!this.state.editable} />
              <CustomField name="MOSA" disabled={!this.state.editable} />
            </Col>
            <Col sm={6}>
              <CustomField name="NUMI" disabled={!this.state.editable} />
              <CustomField name="NUMOP" disabled={!this.state.editable} />
              <CustomField name="NUMSITE" disabled={!this.state.editable} />
              <CustomField name="SITE" disabled={!this.state.editable} />
              <CustomField name="STRUCT" disabled={!this.state.editable} />
              <CustomField name="SUJET" disabled={!this.state.editable} />
              <CustomField name="SUP" disabled={!this.state.editable} />
              <CustomField name="TICO" disabled={!this.state.editable} />
              <CustomField name="TOUT" disabled={!this.state.editable} />
              <CustomField name="TYP" disabled={!this.state.editable} />
              <CustomField name="TYPSUPP" disabled={!this.state.editable} />
              <CustomField name="VUECD" disabled={!this.state.editable} />
              <CustomField name="WCOM" disabled={!this.state.editable} />
              <CustomField name="WEB" disabled={!this.state.editable} />
              <CustomField name="NUM" disabled={!this.state.editable} />
              <CustomField name="NUMCD" disabled={!this.state.editable} />
              <CustomField name="NUMF" disabled={!this.state.editable} />
            </Col>
          </Section>

          {this.state.editable ? (
            <div className="buttons">
              <BackButton history={this.props.history} />
              <DeleteButton noticeType="memoire" noticeRef={this.state.notice.REF} />
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

function getUrl(ref = "") {
  const prefix = ref.substring(0, 2);
  let url = "";
  switch (prefix) {
    case "EA":
    case "PA":
    case "IA":
      url = `/notice/merimee/${ref}`;
      break;
    case "IM":
    case "PM":
      url = `/notice/palissy/${ref}`;
      break;
    default:
      url = "";
  }
  return url;
}

const CustomField = ({ name, disabled, ...rest }) => {
  return (
    <Field
      {...Mapping.memoire[name]}
      disabled={
        Mapping.memoire[name].generated == true ||
        Mapping.memoire[name].deprecated == true ||
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
    role,
    group
  };
};

export default connect(
  mapStateToProps,
  {}
)(reduxForm({ form: "notice" })(Notice));
