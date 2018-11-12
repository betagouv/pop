import React, { Component } from "react";
import { Row, Col, Button, Progress, Container } from "reactstrap";
import { Link } from "react-router-dom";
import Steps, { Step } from "rc-steps";
import { connect } from "react-redux";

import DropZone from "./dropZone";
import api from "../../../services/api";
import generate from "./report";
import controleThesaurus from "./thesaurus";
import ExportData from "./export";
import AsideIcon from "../../../assets/outbox.png";

import diff from "./diff";

import "rc-steps/assets/index.css";
import "rc-steps/assets/iconfont.css";
import "./index.css";

class Importer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      importedNotices: [],
      errors: "",
      done: false,
      loading: false,
      loadingMessage: "",
      progress: 0,
      step: 0,
      email: props.email,
      importId: null,
      emailSent: false
    };
  }

  async onFilesDropped(errors, files, encoding) {
    if (errors) {
      this.setState({ errors, loading: false });
      return;
    }

    try {
      //PARSE FILES
      let { importedNotices, fileNames } = await this.props.parseFiles(
        files,
        encoding
      );

      //RECUPERATION DES NOTICES EXISTANTES
      const existingNotices = [];
      for (var i = 0; i < importedNotices.length; i++) {
        this.setState({
          loading: true,
          loadingMessage: `Récuperation des notices existantes ... `,
          progress: Math.floor((i * 100) / (importedNotices.length * 2))
        });
        const collection = importedNotices[i]._type;
        const notice = await api.getNotice(
          collection,
          importedNotices[i].REF.value
        );
        if (notice) {
          existingNotices.push(notice);
        }
      }

      //CALCUL DE LA DIFF
      this.setState({ loadingMessage: "Calcul des différences...." });
      importedNotices = diff(importedNotices, existingNotices);

      await controleThesaurus(importedNotices);

      for (var i = 0; i < importedNotices.length; i++) {
        if (importedNotices[i]._errors.length) {
          importedNotices[i]._status = "rejected";
        }
      }

      this.setState({
        step: 1,
        importedNotices,
        fileNames,
        loading: false,
        loadingMessage: ""
      });
      amplitude.getInstance().logEvent("Import - Drop files", {
        "Files droped": files.length,
        Success: true
      });
    } catch (e) {
      const errors = e || "Erreur detectée";
      // Raven.captureException(errors);
      amplitude.getInstance().logEvent("Import - Drop files", {
        "Files droped": files.length,
        Success: false,
        "Message ": errors
      });
      this.setState({ errors, loading: false });
      return;
    }
  }

  async onSave() {
    const total = this.state.importedNotices.length;
    const created = this.state.importedNotices.filter(
      e => e._status === "created"
    );
    const updated = this.state.importedNotices.filter(
      e => e._status === "updated"
    );
    const rejected = this.state.importedNotices.filter(
      e => e._status === "rejected"
    );

    ///////////////////////////////////////////////
    const doc = await api.createImport({
      institution: this.props.institution,
      user: this.props.userId,
      created: created.length,
      updated: updated.length,
      rejected: updated.length,
      unChanged: total - created.length - updated.length - updated.length
    });
    const importId = doc.doc._id;
    this.setState({ importId });
    for (let i = 0; i < created.length; i++) {
      created[i].POP_IMPORT.value = [importId];
    }
    for (let i = 0; i < updated.length; i++) {
      updated[i].POP_IMPORT.value = [importId];
    }
    //////////////////////////////////////////////
    let count = 0;
    try {
      //Update notice
      for (var i = 0; i < updated.length; i++, count++) {
        this.setState({
          loading: true,
          loadingMessage: `Mise à jour des notices ... `,
          progress: Math.floor((count * 100) / total)
        });
        const notice = updated[i].makeItFlat();
        const collection = updated[i]._type;
        await api.updateNotice(
          notice.REF,
          collection,
          notice,
          updated[i]._images
        );
      }

      //Create notice
      for (var i = 0; i < created.length; i++, count++) {
        this.setState({
          loading: true,
          loadingMessage: `Création des notices ... `,
          progress: Math.floor((count * 100) / total)
        });
        const notice = created[i].makeItFlat();
        const collection = created[i]._type;
        await api.createNotice(collection, notice, created[i]._images);
      }

      //Sending rapport
      this.setState({
        loading: true,
        loadingMessage: `Envoi du  rapport ... `,
        progress: Math.floor((count * 100) / total)
      });

      const generateReport = this.props.report || generate;

      let body = generateReport(
        this.state.importedNotices,
        this.props.collection,
        this.props.email,
        this.props.institution
      );

      const dest = [
        "sandrine.della-bartolomea@culture.gouv.fr",
        "se.legoff@gmail.com",
        "sebastien.legoff@beta.gouv.fr",
        "sophie.daenens@culture.gouv.fr",
        "jeannette.ivain@culture.gouv.fr",
        "jennifer.stephan@beta.gouv.fr"
      ];

      await api.sendReport(
        `Rapport import ${this.props.collection}`,
        dest.join(","),
        body
      );

      this.setState({
        loading: false,
        step: 2,
        loadingMessage: `Import effectué avec succès`
      });
      amplitude.getInstance().logEvent("Import - Done", {
        "Notices total": total,
        "Notices created": created.length,
        "Notices updated": updated.length,
        "Notices rejected": rejected.length
      });
    } catch (e) {
      let errors = e.message ? e.message : e;
      Raven.captureException(errors);
      this.setState({ errors, loading: false });
      return;
    }
  }

  onExport() {
    amplitude.getInstance().logEvent("Import - Download report");
    ExportData.generate(
      this.state.importedNotices,
      this.props.collection,
      this.props.fieldsToExport
    );
  }

  renderSummary() {
    const noticesChargees = this.state.importedNotices.length;
    const noticesCrees = this.state.importedNotices.filter(
      e => e._status === "created"
    ).length;
    const noticesWithImages = this.state.importedNotices.filter(
      e => e._images.length
    ).length;
    const noticesModifiees = this.state.importedNotices.filter(
      e => e._status === "updated"
    ).length;
    const noticesRejetees = this.state.importedNotices.filter(
      e => e._status === "rejected"
    ).length;
    const noticesWarning = this.state.importedNotices.filter(
      e =>
        (e._status === "created" || e._status === "updated") &&
        e._warnings.length
    ).length;

    const filesnames = this.state.fileNames.map(e => <div>{e}</div>);
    return (
      <div className="working-area">
        <h4 className="subtitle">Contrôle et validation de l'import</h4>
        <div className="summary">
          <div>{`Vous vous appretez à verser dans la base ${
            this.props.collection
          } les fichiers suivants: `}</div>
          <div className="filename">{filesnames}</div>
          <div>
            Ces fichiers totalisent {noticesChargees} notices, dont{" "}
            {noticesWithImages} sont illustrées.
          </div>
          <div>Parmi ces {noticesChargees} notices:</div>
          <div className="lines">
            <div className="line">
              <div className="round" style={{ backgroundColor: "#58FB02" }} />
              {`${noticesCrees} sont des nouvelles notices (non créées précedemment)`}
            </div>
            <div className="line">
              <div className="round" style={{ backgroundColor: "#F9B234" }} />
              {`${noticesModifiees} sont des notices modifiées (par rapport aux précedents imports dans ${
                this.props.collection
              })`}
            </div>
            <div className="line">
              <div className="round" style={{ backgroundColor: "#E32634" }} />
              {`${noticesRejetees} notices ne peuvent etre importees car non conformes`}
            </div>
            <div className="line">
              <div className="round" style={{ backgroundColor: "#FEEA10" }} />
              {`${noticesWarning} notices presentent un avertissement non bloquant pour l'import`}
            </div>
          </div>
          <Button
            className="buttonReverse details"
            onClick={() => {
              this.onExport();
              amplitude.getInstance().logEvent("Import - Download report");
            }}
          >
            Téléchargez le détail au format csv (UTF8)
          </Button>
        </div>
        <div className="buttons">
          <Button
            className="buttonReverse"
            color="danger"
            onClick={() => {
              this.setState({ step: 0 });
              amplitude.getInstance().logEvent("Import - Cancel");
            }}
          >
            Annuler l'import
          </Button>
          <Button
            className="button"
            color="primary"
            onClick={() => this.onSave()}
          >
            Confirmer l'import
          </Button>
        </div>
      </div>
    );
  }

  renderDropZone() {
    return (
      <div>
        {/* <h4 className='subtitle'>Sélection et dépot des contenus à importer</h4> */}
        <DropZone
          onFinish={this.onFilesDropped.bind(this)}
          visible={true}
          text={this.props.dropzoneText}
          defaultEncoding={this.props.defaultEncoding}
        />
      </div>
    );
  }

  renderEmail() {
    const noticesupdated = this.state.importedNotices.filter(
      e => e._status === "created" || e._status === "updated"
    ).length;

    const URL = `http://pop${
      process.env.NODE_ENV === "production" ? "" : "-staging"
    }.culture.gouv.fr/search/list?import="${this.state.importId}"`;

    return (
      <div className="working-area">
        <h4 className="subtitle">Confirmation de l'import</h4>
        <div className="feedbacks">
          <div className="feedback">
            Vous avez importé avec succès {noticesupdated} notices.
          </div>
          <div className="feedback">Merci pour votre contribution !</div>
          <div>
            Vous pouvez consulter les notices modifiées lors de cet import ici:{" "}
            <a href={URL} target="_blanck">
              Consulter vos notices importées
            </a>
            <p>
              (Généralement, l'indexation des résultats dans le moteur de
              recherche POP prend de quelques secondes à 1 ou 2 minutes. Vous
              pouvez raffraichir la page si tous les résultats ne sont pas
              disponibles)
            </p>
          </div>
          <div>
            Vous pouvez récupérer le rapport d'import en nous laissant vos
            coordonnées mail
          </div>
          {this.state.emailSent ? (
            <div>{`Rapport envoyé à ${this.state.email}`}</div>
          ) : (
            <div>
              <input
                value={this.state.email}
                onChange={e => {
                  this.setState({ email: e.target.value });
                }}
                placeholder="Saisissez votre mail"
              />
              <Button
                className="button"
                color="primary"
                onClick={() => {
                  const generateReport = this.props.report || generate;
                  const body = generateReport(
                    this.state.importedNotices,
                    this.props.collection,
                    this.props.email,
                    this.props.institution
                  );
                  api
                    .sendReport(
                      `Rapport import ${this.props.collection}`,
                      this.state.email,
                      body
                    )
                    .then(() => {
                      this.setState({ emailSent: true });
                    });
                }}
              >
                Envoyer
              </Button>
            </div>
          )}
          {/* <div>Vous pouvez consulter les notices importées au lien suivant:</div>
                    <Link to={"/"}>Lien vers la consultation avec critères de recherche pre-remplis(établissement + date)</Link> */}
        </div>
      </div>
    );
  }

  render() {
    let currentStep = <div>Error</div>;

    if (this.state.loading) {
      currentStep = (
        <div className="working-area">
          <Progress value={this.state.progress.toString()} />
          <div>{this.state.loadingMessage}</div>
        </div>
      );
    } else if (this.state.errors) {
      console.log(this.state.errors);
      currentStep = (
        <div className="working-area">
          <h2>
            Impossible d'importer le fichier car des erreurs ont été détectées :
          </h2>
          <div>
            {this.state.errors.split("\n").map((e, i) => (
              <div key={i}>{e}</div>
            ))}
          </div>
        </div>
      );
    } else if (this.state.done) {
      currentStep = (
        <div className="working-area">
          <div>{this.state.loadingMessage}</div>
          <Link to="/">Revenir a la page d'accueil</Link>
        </div>
      );
    } else if (this.state.step === 0) {
      currentStep = this.renderDropZone();
    } else if (this.state.step === 1) {
      currentStep = this.renderSummary();
    } else if (this.state.step === 2) {
      currentStep = this.renderEmail();
    }

    return (
      <Container className="importer-container">
        <Row>
          <Col md={4} className="left-col">
            <div className="mb-5">
              <img src={AsideIcon} width={100} alt="" />
            </div>
            <h5>Plateforme Ouverte du Patrimoine</h5>
            <p>
              La plateforme POP regroupe les contenus numériques de patrimoine
              français afin de les rendre accessibles et consultables au plus
              grand nombre
            </p>
          </Col>
          <Col md={8} className="right-col">
            <p className="title">{`Cette section vous permet de verser du contenu numérique (notices, images) dans la base ${
              this.props.collection
            }, selon les trois étapes suivantes`}</p>
            <Steps
              labelPlacement="vertical"
              current={this.state.step}
              size="big"
            >
              <Step title="Sélection et dépot des contenus à importer" />
              <Step title="Contrôle et validation de l'import" />
              <Step title="Confirmation de l'import" />
            </Steps>
            {currentStep}
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapstatetoprops = ({ Auth }) => {
  const { email, institution, _id } = Auth.user;
  return {
    email,
    institution,
    userId: _id
  };
};

export default connect(
  mapstatetoprops,
  {}
)(Importer);
