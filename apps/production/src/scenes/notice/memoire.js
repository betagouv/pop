import React from "react";
import { Row, Col, Container, Button, Form } from "reactstrap";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import Mapping from "../../services/mapping";
import DeleteButton from "./components/DeleteButton";
import BackButton from "./components/BackButton";
import Field from "./components/field.js";
import FieldImages from "./components/fieldImages";
import Section from "./components/section.js";
import Comments from "./components/comments.js";
import Memoire from "../../entities/Memoire";
import Loader from "../../components/Loader";
import API from "../../services/api";
import { bucket_url, pop_url } from "../../config";
import AccordionHistorique from "./components/AccordionHistorique";

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
        ["CRMH", "CAOA", "UDAP", "ETAT", "AUTRE", "MAP"].includes(PRODUCTEUR) &&
        roles.includes(role)
      );
    } else if (group === "memoire") {
      return ["MAP", "AUTRE"].includes(PRODUCTEUR) && roles.includes(role);
    } else if (group === "admin") {
      return (
        ["CRMH", "CAOA", "UDAP", "INV", "ETAT", "AUTRE", "MAP", "SDAP", "ARCH", ""].includes(PRODUCTEUR) &&
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
    //const editable = this.canUpdate(notice.PRODUCTEUR);
    let editable = false;
    API.canEdit(notice.REF, "", notice.PRODUCTEUR, "memoire").then(result => {
      editable = result.validate;
      this.setState({editable: editable});
    });

    this.props.initialize(notice);
    this.setState({ loading: false, notice, editable });
  }

  async onSubmit(values) {
    this.setState({ saving: true });
    const notice = new Memoire(values);
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
        await API.updateNotice(this.state.notice.REF, "memoire", values, this.state.imagesFiles, "manuel");
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
          Notice {this.state.notice.REF}{" "}
          <a
            style={{ fontSize: "small" }}
            target="_blank"
            rel="noopener"
            href={`${pop_url}/notice/memoire/${this.state.notice.REF}`}
          >
            voir en diffusion
          </a>
        </h2>
        <Form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))} className="main-body">
          <Comments POP_FLAGS={this.state.notice.POP_FLAGS} />

          <FieldImages
            name="IMG"
            canOrder={this.state.editable}
            canEdit={this.state.editable}
            createUrlFromName={e => `memoire/${this.state.notice.REF}/${e}`}
            getAbsoluteUrl={e => (e.indexOf("www") === -1 ? `${bucket_url}${e}` : e)}
            filesToUpload={imagesFiles => this.setState({ imagesFiles })}
          />
          <Section
            title="1. Sujet de la photographie ou du document graphique"
            icon={require("../../assets/info.png")}
            color="#FF7676"
          >
            <div className="subtitle">1.1. Localisation</div>
            <Row>
              <Col sm={6}>
                <CustomField name="REF" disabled={true} />
                <CustomField name="PAYS" disabled={!this.state.editable} />
                <CustomField name="REG" disabled={!this.state.editable} />
                <CustomField name="DPT" disabled={!this.state.editable} />
                <CustomField name="DPT_LETTRE" disabled={!this.state.editable} />
                <CustomField name="COM" disabled={!this.state.editable} />
                <CustomField name="WCOM" disabled={!this.state.editable} />
              </Col>
              <Col sm={6}>
                <CustomField name="INSEE" disabled={!this.state.editable} />
                <CustomField name="ADRESSE" disabled={!this.state.editable} />
                <CustomField name="WADRS" disabled={!this.state.editable} />
                <CustomField name="LIEU" disabled={!this.state.editable} />
                <CustomField name="PLOC" disabled={!this.state.editable} />
                <CustomField name="LOCA" disabled={!this.state.editable} />
                <CustomField name="MCGEO" disabled={!this.state.editable} />
              </Col>
            </Row>
            <div className="subtitle">1.2. Provence de l'objet ou du document</div>
            <Row>
              <Col sm={6}>
                <CustomField name="EDIF" disabled={!this.state.editable} />
                <CustomField name="LEG" disabled={!this.state.editable} />
                <CustomField name="OBJT" disabled={!this.state.editable} />
                <CustomField name="DENO" disabled={!this.state.editable} />
                <CustomField name="TICO" disabled={!this.state.editable} />
                <CustomField name="SUJET" disabled={!this.state.editable} />
                <CustomField name="THEATRE" disabled={!this.state.editable} />
                <CustomField name="CINEPROD" disabled={!this.state.editable} />
                <CustomField name="ROLE" disabled={!this.state.editable} />
                <CustomField name="AUTOEU" disabled={!this.state.editable} />
                <CustomField name="AUTR" disabled={!this.state.editable} />
                
              </Col>
              <Col sm={6}>
                <CustomField name="SCLE" disabled={!this.state.editable} />
                <CustomField name="DATOEU" disabled={!this.state.editable} />
                <CustomField name="LIEUORIG" disabled={!this.state.editable} />
                <CustomField name="LBASE" disabled={!this.state.editable} />
                <CustomField name="LBASE2" disabled={!this.state.editable} />
                <CustomField name="SERIE" disabled={!this.state.editable} />
                <CustomField name="MCL" disabled={!this.state.editable} />
                <CustomField name="MCPER" disabled={!this.state.editable} />
                <CustomField name="DOM" disabled={!this.state.editable} />
              </Col>
            </Row>
            <div className="subtitle">1.3. Références des documents reproduits et des objets photographiés</div>
            <Row>
              <Col sm={6}>
                <CustomField name="AUTG" disabled={!this.state.editable} />
                <CustomField name="AUTOR" disabled={!this.state.editable} />
                <CustomField name="COTECOR" disabled={!this.state.editable} />
                <CustomField name="NUMOR" disabled={!this.state.editable} />
              </Col>
              <Col sm={6}>
                <CustomField name="ANUMOR" disabled={!this.state.editable} />
                <CustomField name="DOC" disabled={!this.state.editable} />
                <CustomField name="TIREDE" disabled={!this.state.editable} />
                <CustomField name="LIEUCOR" disabled={!this.state.editable} />
              </Col>
            </Row>
          </Section>
          <Section title="2. Auteur" icon={require("../../assets/info.png")} color="#FF7676">
            <Row>
              <Col sm={6}>
                <CustomField name="AUT" disabled={!this.state.editable} />
                <CustomField name="AUTP" disabled={!this.state.editable} />
              </Col>
              <Col sm={6}>
                <CustomField name="AUTTI" disabled={!this.state.editable} />
                <CustomField name="LAUTP" disabled={!this.state.editable} />
              </Col>
            </Row>
          </Section>
          <Section
            title="3. Description de la photographie ou du document graphique"
            icon={require("../../assets/info.png")}
            color="#FF7676"
          >
            <div className="subtitle">3.1. Éléments d’identification</div>
            <Row>
              <Col sm={6}>
                <CustomField name="TYPDOC" disabled={!this.state.editable} />
                <CustomField name="NEGPOS" disabled={!this.state.editable} />
                <CustomField name="NUMI" disabled={!this.state.editable} />
                <CustomField name="NUMP" disabled={!this.state.editable} />
                <CustomField name="NUMTI" disabled={!this.state.editable} />
                <CustomField name="ANUMTI" disabled={!this.state.editable} />
                <CustomField name="NUMAUTP" disabled={!this.state.editable} />
                <CustomField name="NUMVERS" disabled={!this.state.editable} />
              </Col>
              <Col sm={6}>
              <CustomField name="RENV" disabled={!this.state.editable} />
                <CustomField name="LIEUCTI" disabled={!this.state.editable} />
                <CustomField name="COTECTI" disabled={!this.state.editable} />
                <CustomField name="PRECOR" disabled={!this.state.editable} />
                <CustomField name="DATIMM" disabled={!this.state.editable} />
                <CustomField name="ACQU" disabled={!this.state.editable} />
                <CustomField name="COPY" disabled={!this.state.editable} />
                <CustomField name="DIFF" disabled={!this.state.editable} />
              </Col>
            </Row>
            <div className="subtitle">
              3.2. Description technique du phototype ou du document graphique
            </div>
            <Row>
              <Col sm={6}>
                <CustomField name="TECHN" disabled={!this.state.editable} />
                <CustomField name="FORMAT" disabled={!this.state.editable} />
                <CustomField name="TECHTI" disabled={!this.state.editable} />
                <CustomField name="FORMATTI" disabled={!this.state.editable} />
                <CustomField name="TECHOR" disabled={!this.state.editable} />
                <CustomField name="FORMATOR" disabled={!this.state.editable} />
              </Col>
              <Col sm={6}>
                <CustomField name="MENTIONS" disabled={!this.state.editable} />
                <CustomField name="MENTTI" disabled={!this.state.editable} />
                <CustomField name="MENTOR" disabled={!this.state.editable} />
                <CustomField name="COULEUR" disabled={!this.state.editable} />
                <CustomField name="TRL" disabled={!this.state.editable} />
                <CustomField name="ECH" disabled={!this.state.editable} />
              </Col>
            </Row>
            <div className="subtitle">3.3. Datation et événements liés à l’image</div>
            <Row>
              <Col sm={6}>
                <CustomField name="DATPV" disabled={!this.state.editable} />
                <CustomField name="JDATPV" disabled={!this.state.editable} />
                <CustomField name="DATOR" disabled={!this.state.editable} />
                <CustomField name="DATTI" disabled={!this.state.editable} />
                <CustomField name="EXPO" disabled={!this.state.editable} />
              </Col>
              <Col sm={6}>
                <CustomField name="PUBLI" disabled={!this.state.editable} />
                <CustomField name="OBS" disabled={!this.state.editable} />
                <CustomField name="OBSTI" disabled={!this.state.editable} />
                <CustomField name="OBSOR" disabled={!this.state.editable} />
              </Col>
            </Row>
          </Section>
          <Section
            title="4. Gestion de la base de données"
            icon={require("../../assets/info.png")}
            color="#FF7676"
          >
            <Row>
              <Col sm={6}>
                <CustomField name="REF" disabled={!this.state.editable} />
                <CustomField name="DMIS" disabled={!this.state.editable} />
                <CustomField name="DMAJ" disabled={!this.state.editable} />
                <CustomField name="CONTACT" disabled={!this.state.editable} />
                <CustomField name="PRODUCTEUR" disabled={!this.state.editable} />
                <CustomField name="IDPROD" disabled={!this.state.editable} />
                <CustomField name="EMET" disabled={!this.state.editable} />
                <CustomField name="REFIMG" disabled={!this.state.editable} />
                <CustomField name="MARQ" disabled={!this.state.editable} />
                <CustomField name="TYPSUPP" disabled={!this.state.editable} />
                <CustomField
                  name="REFMUS"
                  createUrl={e => `/notice/museo/${e}`}
                  disabled={!this.state.editable}
                />
                <CustomField name="LIENS" disabled={!this.state.editable} />
              </Col>
              <Col sm={6}>
                <CustomField name="TYPEIMG" disabled={!this.state.editable} />
                <CustomField name="REFIM" disabled={!this.state.editable} />
                <CustomField name="VIDEO" disabled={!this.state.editable} />
                <CustomField name="NVD" disabled={!this.state.editable} />
                <CustomField name="VUECD" disabled={!this.state.editable} />
                <CustomField name="IMG" disabled={!this.state.editable} />
                <CustomField name="WEB" disabled={!this.state.editable} />
                <CustomField name="SENS" disabled={!this.state.editable} />
                <CustomField name="ADPHOT" disabled={!this.state.editable} />
                <CustomField
                  name="REFJOC"
                  createUrl={e => `/notice/joconde/${e}`}
                  disabled={!this.state.editable}
                />
              </Col>
            </Row>
            <AccordionHistorique historique={this.state.notice.HISTORIQUE || []}/>
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

const CustomField = ({ name, disabled, ...rest }) => {
  if (!Mapping.memoire[name]) {
    console.log("ERROR with ", name);
  }
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
