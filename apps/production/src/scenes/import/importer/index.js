import React, { Component } from "react";
import { Row, Col, Button, Progress, Container } from "reactstrap";
import { Link } from "react-router-dom";
import Steps, { Step } from "rc-steps";
import { connect } from "react-redux";

import DropZone from "./dropZone";
import api from "../../../services/api";
import generate from "./report";
import { checkOpenTheso } from "./thesaurus";
import { downloadDetails, generateCSVFile } from "./export";
import AsideIcon from "../../../assets/outbox.png";
import utils from "../utils";

import { compare } from "./diff";

import "rc-steps/assets/index.css";
import "rc-steps/assets/iconfont.css";
import "./index.css";
import { pop_url } from "../../../config";

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
      emailSent: false,
      loadOpenTheso: false,
      countRecupNotice: 0,
      countControleNotice: 0,
      localStorage: null,
      saveDisabled: false,
      collection: props.collection,
      avertissement: []
    };
  }

  componentDidMount(){
    this.setState({ localStorage: window.localStorage });
  }

  async onFilesDropped(errors, files, encoding) {
    if (errors) {
      this.setState({ errors, loading: false });
      return;
    }

    try {
      // Parse files.
      let { importedNotices, fileNames } = await this.props.parseFiles(files, encoding);

      if (!importedNotices.length) {
        this.setState({ errors: "Aucune notice détectée à l'import", loading: false });
        return;
      }

      let existingNotices = [];
      const doublonNotice = [];
      // Vérification de notice en doublon dans l'import
      for (var i = 0; i < importedNotices.length; i++) {

        if(!existingNotices.includes(importedNotices[i].REF)){
          existingNotices.push(importedNotices[i].REF);
        } else {
          doublonNotice.push(importedNotices[i].REF);
        }
      }

      if(doublonNotice.length > 0){
        this.setState({ errors: `Détection de notices en double dans le fichier : voir ${doublonNotice.join(', ')}`, loading: false });
        return;
      }

      const encodingIssueErrors = utils.checkEncodingIssue(importedNotices);
      if (encodingIssueErrors) {
        this.setState({ errors: encodingIssueErrors, loading: false });
        return;
      }

      // Get existing notices.
      existingNotices = {};
      for (var i = 0; i < importedNotices.length; i++) {
        this.setState({ countRecupNotice: this.state.countRecupNotice + 1})
        this.setState({
          loading: true,
          loadingMessage: `Récupération des notices existantes ... ${this.state.countRecupNotice} / ${importedNotices.length} notices`,
          progress: Math.floor((i * 100) / (importedNotices.length * 2))
        });
        const collection = importedNotices[i]._type;
        const notice = await api.getNotice(collection, importedNotices[i].REF);
        if (notice) {
          existingNotices[importedNotices[i].REF] = notice;
        } 
      }

      // Compute diff.
      this.setState({ 
        loadingMessage: "Calcul des différences....",
        countRecupNotice: 0 
      });

      // START DIFF
      for (let i = 0; i < importedNotices.length; i++) {
        const existingNotice = existingNotices[importedNotices[i].REF];
        if (existingNotice) {
          let from ="";
          let differences = compare(importedNotices[i], existingNotice);
          importedNotices[i]._messages = differences.map(e => {
            if(e === 'POP_COORDONNEES.lat'){
            from = JSON.stringify(existingNotice.POP_COORDONNEES.lat);
            } else if(e === 'POP_COORDONNEES.lon'){
            from = JSON.stringify(existingNotice.POP_COORDONNEES.lon);
            } else{
              from = JSON.stringify(existingNotice[e]);
            }
            const to = JSON.stringify(importedNotices[i][e]);
            return `Le champ ${e} a évolué de ${from} à ${to}`;
          });
          if (differences.length) {
            importedNotices[i]._status = "updated";
          } else {
            importedNotices[i]._status = "unchanged";
          }
        } else {
          importedNotices[i]._status = "created";
        }
        await importedNotices[i].validate({ ...existingNotice, ...importedNotices[i] });
      }

      this.setState({ loadOpenTheso : true });

      Object.keys(localStorage).forEach((key) => {
        if(key.indexOf('opentheso-') === 0){
          localStorage.removeItem(key);
        }

      })

      for (var i = 0; i < importedNotices.length; i++) {
        await checkOpenTheso(importedNotices[i]);
        this.setState({ countControleNotice: this.state.countControleNotice + 1})
      }

      this.setState({ loadOpenTheso : false });
      this.setState({ countControleNotice: 0});

      for (var i = 0; i < importedNotices.length; i++) {
        if (importedNotices[i]._errors.length) {
          importedNotices[i]._status = "rejected";
        }
      }

      this.setState({ step: 1, importedNotices, fileNames, loading: false, loadingMessage: "" });
      

      amplitude
        .getInstance()
        .logEvent("Import - Drop files", { "Files droped": files.length, Success: true });
    } catch (e) {
      const errors = e || "Erreur detectée";

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

    this.setState({
      saveDisabled: true,
      loading: true,
      loadingMessage: "Sauvegarde de l'import...",
      avertissement: []
    });


    const total = this.state.importedNotices.length;
    const created = this.state.importedNotices.filter(e => e._status === "created");
    const updated = this.state.importedNotices.filter(e => e._status === "updated");
    const rejected = this.state.importedNotices.filter(e => e._status === "rejected");

    let file = generateCSVFile(
      this.state.importedNotices,
      this.props.collection,
      this.props.fieldsToExport
    );
    
    const doc = await api.createImport(
      {
        institution: this.props.institution,
        user: this.props.userId,
        email: this.props.email,
        created: created.length,
        importedAt: Date.now(),
        updated: updated.length,
        rejected: rejected.length,
        notices: this.state.importedNotices.map(({ REF }) => REF),
        unChanged: total - created.length - updated.length - rejected.length
      },
      file
    ).catch((e) => {
      const avert = this.state.avertissement;
      avert.push("POP n'a pas pu enregistrer cet import dans l'historique des imports. L'import a échoué.");
      this.setState({ avertissement: avert, loading: false});
    });

    const importId = doc.doc._id;

    try {
      const arr = [];
      for (let i = 0; i < this.state.importedNotices.length; i++) {
        const notice = this.state.importedNotices[i];
        if (notice._status === "created" || notice._status === "updated") {
          notice.POP_IMPORT = [importId];
          arr.push({
            action: notice._status,
            collection: notice._type,
            notice: notice.makeItFlat(),
            files: notice._files
          });
        }
      }

      this.setState({
        importId,
        loading: true,
        loadingMessage: "Mises à jour et création des notices"
      });

      const resultNotices = await api.bulkUpdateAndCreate(arr, (progress, loadingMessage) => {
        this.setState({ progress, loadingMessage });
      });

      // Vérification de la mise à jour
      if(resultNotices.length > 0){
        // Regroupement des références de notices rejetées à l'import
        const listRefError = resultNotices.map((n) => Object.keys(n)[0]);
        // Suppression des notices en erreur de la liste des imports
        let avert = this.state.avertissement;
        avert.push(`Notices ayant des erreurs non importées : [${listRefError.join(', ')}]`);
        this.setState(
          {
            importedNotices: this.state.importedNotices.filter((el) => !listRefError.includes(el.REF)), 
            avertissement: avert
          });

        // Recacul des modifications sur les notices suite aux erreurs rencontrées
        let updateObjImport = {
          created:  this.state.importedNotices.filter(e => e._status === "created").length,
          updated:  this.state.importedNotices.filter(e => e._status === "updated").length,
          rejected: this.state.importedNotices.filter(e => e._status === "rejected").length,
          notices: this.state.importedNotices.map(({ REF }) => REF)
        }

        // Recalcul des notices inchangées.
        updateObjImport.unChanged = total - updateObjImport.created - updateObjImport.updated - updateObjImport.rejected;

        // Mise à jour du fichier sans les notices rejetées
        file = generateCSVFile(
          this.state.importedNotices,
          this.props.collection,
          this.props.fieldsToExport
        );

        // Mise à jour des élements de l'import
        await api.updateImport(importId, updateObjImport, file)
        .catch((e) => {
          const avert = this.state.avertissement;
          avert.push("POP n'a pas pu enregistrer les modifications dans l'historique des imports.");
          this.setState({ avertissement: avert, loading: false});
        });;
      }

      const generateReport = this.props.report || generate;

      let body = generateReport(
        this.state.importedNotices,
        this.props.collection,
        this.props.email,
        this.props.institution,
        importId,
        this.state.fileNames
      );

      await api.sendReport(`Rapport import ${this.props.collection}`, this.props.recipient, body)
            .catch((e) => {
              const avert = this.state.avertissement;
              avert.push("Erreur pendant l'envoi du rapport d'import par mail, vous trouverez les informations relatives à cet import directement dans l'historique des imports");
              this.setState({ avertissement: avert});
            });

      this.setState({
        loading: false,
        step: 2,
        loadingMessage: `Import effectué avec succès`,
        saveDisabled: false
      });

      // End send report

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
    const { collection, fieldsToExport } = this.props;
    downloadDetails(this.state.importedNotices, collection, fieldsToExport);
  }

  renderSummary() {
    const noticesChargees = this.state.importedNotices.length;
    const noticesCrees = this.state.importedNotices.filter(e => e._status === "created").length;
    const noticesWithImages = this.state.importedNotices.filter(e => e._files.length).length;
    const noticesModifiees = this.state.importedNotices.filter(e => e._status === "updated").length;
    const noticesRejetees = this.state.importedNotices.filter(e => e._status === "rejected").length;
    const noticesWarning = this.state.importedNotices.filter(
      e => (e._status === "created" || e._status === "updated") && e._warnings.length
    ).length;

    const filesnames = this.state.fileNames.map(e => <div key={e}>{e}</div>);
    return (
      <div className="working-area">
        <h4 className="subtitle">Contrôle et validation de l'import</h4>
        <div className="summary">
          <div>{`Vous vous appretez à verser dans la base ${
            this.props.collection
          } les fichiers suivants: `}</div>
          <div className="filename">{filesnames}</div>
          <div>
            Ces fichiers{" "}
            {noticesChargees === 1
              ? `totalisent 1 notice`
              : `totalisent ${noticesChargees} notices`}
            , dont{" "}
            {noticesWithImages === 1 ? `1 est illustrée.` : `${noticesWithImages} sont illustrées.`}
          </div>
          <div>Parmi ces {noticesChargees} notices:</div>
          <div className="lines">
            <div className="line">
              <div className="round" style={{ backgroundColor: "#58FB02" }} />
              {noticesCrees === 1
                ? `${noticesCrees} est une nouvelle notice (non créée précedemment)`
                : `${noticesCrees} sont des nouvelles notices (non créées précedemment)`}
            </div>
            <div className="line">
              <div className="round" style={{ backgroundColor: "#F9B234" }} />
              {noticesModifiees === 1
                ? `${noticesModifiees} est une notice modifiée par rapport aux précedents imports dans ${
                    this.props.collection
                  })`
                : `${noticesModifiees} sont des notices modifiées (par rapport aux précedents imports dans ${
                    this.props.collection
                  })`}
            </div>
            <div className="line">
              <div className="round" style={{ backgroundColor: "#E32634" }} />
              {noticesRejetees === 1
                ? `${noticesRejetees} notice ne peut être importée car non conforme`
                : `${noticesRejetees} notices ne peuvent être importées car non conformes`}
            </div>
            <div className="line">
              <div className="round" style={{ backgroundColor: "#FEEA10" }} />
              {noticesWarning === 1
                ? `${noticesWarning} notice contient un ou plusieurs avertissements non bloquants pour l'import`
                : `${noticesWarning} notices contiennent un ou plusieurs avertissements non bloquants pour l'import`}
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
          <Button className="button" color="primary" onClick={() => this.onSave()} disabled={ this.props.saveDisabled }>
            Confirmer l'import
          </Button>
        </div>
      </div>
    );
  }

  renderDropZone() {
    return (
      <div style={{ width: "100%" }}>
        {/* <h4 className='subtitle'>Sélection et dépot des contenus à importer</h4> */}
        <DropZone
          onFinish={this.onFilesDropped.bind(this)}
          visible={true}
          text={this.props.dropzoneText}
          defaultEncoding={this.props.defaultEncoding}
          collection={this.state.collection}
        />
      </div>
    );
  }

  renderEmail() {
    const noticesupdated = this.state.importedNotices.filter(
      e => e._status === "created" || e._status === "updated"
    ).length;

    const URL = `${pop_url}/search/list?import=["${this.state.importId}"]`;

    return (
      <div className="working-area">
        <h4 className="subtitle">Confirmation de l'import</h4>
        <div className="feedbacks">
          <div className="feedback">Vous avez importé avec succès {noticesupdated} notices.</div>
          <div className="feedback">Merci pour votre contribution !</div>
          <div>
            Vous pouvez consulter les notices modifiées lors de cet import ici&nbsp;:{" "}
            <a href={URL} target="_blanck">
              Consulter vos notices importées
            </a>
            <p>
              (Généralement, l'indexation des résultats dans le moteur de recherche POP prend de
              quelques secondes à 1 ou 2 minutes. Vous pouvez raffraichir la page si tous les
              résultats ne sont pas disponibles)
            </p>
          </div>
          <div>Vous pouvez récupérer le rapport d'import en nous laissant vos coordonnées mail</div>
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
                    this.props.institution,
                    this.state.importId,
                    this.state.fileNames
                  );
                  api
                    .sendReport(`Rapport import ${this.props.collection}`, this.state.email, body)
                    .then(() => {
                      this.setState({ emailSent: true });
                    }).catch((err) => console.log("erreur ", err) );
                }}
              >
                Envoyer
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  renderErrors() {
    let errors = this.state.errors;
    if (typeof this.state.errors !== "string") {
      console.error(this.state.errors);
      errors = "Erreur ! Merci de contacter l'équipe technique.";
    }

    return (
      <div className="working-area">
        <h2>Impossible d'importer le fichier car des erreurs ont été détectées :</h2>
        <div>
          {errors.split("\n").map((e, i) => (
            <div key={i}>{e}</div>
          ))}
        </div>
      </div>
    );
  }

  renderAvertissement(){
    return this.state.avertissement.length > 0 ? (
      <div>
        <p className="text-center" style={{fontSize: "20px", color: "red"}}>Avertissements sur l'import</p>
        <ul>
          { this.state.avertissement.map((element) => {
              return (<li>{element}</li>);
            })
          }
        </ul>
      </div>
    ) : <div />
  }

  render() {
    let currentStep = <div>Error</div>;

    if (this.state.loading) {
      currentStep = (
        <div className="working-area">
          <Progress value={this.state.progress.toString()} />
          <div>{this.state.loadingMessage}</div>
          { this.state.loadOpenTheso ?
          <div>
            <div>Contrôle des notices</div> 
            <div>{this.state.countControleNotice} notices contrôlées</div>
          </div>
          : "" 
          }
          
        </div>
      );
    } else if (this.state.errors) {
      currentStep = this.renderErrors();
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
          <Col md={5} className="left-col">
            <div className="image-container">
              <img src={AsideIcon} width={100} alt="" />
            </div>
            {this.props.readme()}
          </Col>
          <Col md={7} className="right-col">
            <p className="title">{`Cette section vous permet de verser du contenu numérique (notices, images) dans la base ${
              this.props.collection
            }, selon les trois étapes suivantes`}</p>
            <Steps labelPlacement="vertical" current={this.state.step} size="big">
              <Step title="Sélection et dépot des contenus à importer" />
              <Step title="Contrôle et validation de l'import" />
              <Step title="Confirmation de l'import" />
            </Steps>
            {this.renderAvertissement()}
            {currentStep}
            {this.props.children}
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
