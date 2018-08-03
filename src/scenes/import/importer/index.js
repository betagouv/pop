import React, { Component } from 'react';
import { Row, Col, Button, Progress, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import Steps, { Step } from 'rc-steps';

import DropZone from './dropZone'
import api from '../../../services/api'
import Report from './report';
import controleThesaurus from './thesaurus';
import ExportData from './export';
import AsideIcon from '../../../assets/outbox.png';

import diff from './diff';

import 'rc-steps/assets/index.css';
import 'rc-steps/assets/iconfont.css';
import './index.css';

export default class Importer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            importedNotices: [],
            errors: '',
            done: false,
            loading: false,
            loadingMessage: '',
            progress: 0,
            step: 0,
            email: '',
            emailSent: false
        }
    }

    async onFilesDropped(files, encoding) {

        try {
            //PARSE FILES
            let { importedNotices, fileName } = await (this.props.parseFiles(files, encoding));

            //RECUPERATION DES NOTICES EXISTANTES
            const existingNotices = []
            for (var i = 0; i < importedNotices.length; i++) {
                this.setState({ loading: true, loadingMessage: `Récuperation des notices existantes ... `, progress: Math.floor((i * 100) / (importedNotices.length * 2)) });
                const collection = created[i]._type;
                const notice = await (api.getNotice(collection, importedNotices[i].REF.value));
                if (notice) {
                    existingNotices.push(notice);
                }
            }

            //CALCUL DE LA DIFF
            this.setState({ loadingMessage: 'Calcul des differences....' });
            importedNotices = diff(importedNotices, existingNotices);

            // //DELETE GENERATED FIELDS 
            // for (var i = 0; i < importedNotices.length; i++) {
            //     for (var j = 0; j < generatedFields.length; j++) {
            //         delete importedNotices[i][generatedFields[j]];
            //     }
            // }

            controleThesaurus(importedNotices, this.props.mapping);

            for (var i = 0; i < importedNotices.length; i++) {
                if (importedNotices[i]._errors.length) {
                    importedNotices[i]._status = 'rejected';
                }
            }

            this.setState({ step: 1, importedNotices, fileName, loading: false, loadingMessage: '' });
            amplitude.getInstance().logEvent('Import - Drop files', { "Files droped": files.length, "Success": true });

        } catch (e) {
            const errors = e || "Erreur detectée";
            Raven.captureException(errors)
            amplitude.getInstance().logEvent('Import - Drop files', { "Files droped": files.length, "Success": false, "Message ": errors });
            this.setState({ errors, loading: false })
            return;
        }
    }

    async onSave() {

        const total = this.state.importedNotices.length;
        const created = this.state.importedNotices.filter(e => e._status === 'created');
        const updated = this.state.importedNotices.filter(e => e._status === 'updated');
        const rejected = this.state.importedNotices.filter(e => e._status === 'rejected');



        let count = 0;
        try {
            //Update notice
            for (var i = 0; i < updated.length; i++ , count++) {
                this.setState({ loading: true, loadingMessage: `Mise à jour des notices ... `, progress: Math.floor((count * 100) / total) });
                const notice = updated[i].makeItFlat();
                console.log('update notice ', notice);
                const collection = created[i]._type;
                await api.updateNotice(notice.REF, collection, notice, updated[i].images);
            }

            //Create notice
            for (var i = 0; i < created.length; i++ , count++) {
                this.setState({ loading: true, loadingMessage: `Création des notices ... `, progress: Math.floor((count * 100) / total) });
                const notice = created[i].makeItFlat();
                const collection = created[i]._type;
                await api.createNotice(collection, notice, created[i].images);
            }
            //Sending rapport
            this.setState({ loading: true, loadingMessage: `Envoi du  rapport ... `, progress: Math.floor((count * 100) / total) });
            let body = '';
            if (this.props.onReport) {
                body = this.props.onReport(this.state.importedNotices);
            } else {
                body = Report.generate(this.state.importedNotices, this.props.collection)
            }
            const dest = [
                'sandrine.della-bartolomea@culture.gouv.fr',
                'sebastien.legoff@beta.gouv.fr',
                'carine.prunet@culture.gouv.fr',
                'jeannette.ivain@culture.gouv.fr',
                'sophie.daenens@culture.gouv.fr'
            ]

            await api.sendReport(`Rapport import ${this.props.collection}`, dest.join(','), body);

            this.setState({ loading: false, step: 2, loadingMessage: `Import effectué avec succès`, step: 2 });
            amplitude.getInstance().logEvent('Import - Done', { "Notices total": total, "Notices created": created.length, "Notices updated": updated.length, "Notices rejected": rejected.length });
        } catch (e) {
            let errors = e.message ? e.message : e;
            Raven.captureException(errors)
            this.setState({ errors, loading: false })
            return;
        }
    }

    onExport() {
        amplitude.getInstance().logEvent('Import - Download report');
        if (this.props.onExport) {
            this.props.onExport(this.state.importedNotices);
        } else {
            ExportData.generate(this.state.importedNotices, this.props.collection);
        }
    }

    renderSummary() {

        const noticesChargees = this.state.importedNotices.length;
        const noticesCrees = this.state.importedNotices.filter(e => e._status === 'created').length;
        const noticesWithImages = this.state.importedNotices.filter(e => e._images.length).length;
        const noticesModifiees = this.state.importedNotices.filter(e => e._status === 'updated').length;
        const noticesRejetees = this.state.importedNotices.filter(e => e._status === 'rejected').length;

        return (
            <div className='working-area'>
                <h4 className='subtitle'>Contrôle et validation de l'import</h4>
                <div className='summary'>
                    <div>{`Vous vous appretez à verser dans la base ${this.props.collection} les fichiers suivants: `}</div>
                    <div className='filename'>{this.state.fileName}</div>
                    <div>Ces fichiers totalisent {noticesChargees} notices, dont {noticesWithImages} dont illustrées.</div>
                    <div>Parmi ces {noticesChargees} notices:</div>
                    <div className="lines">
                        <div className='line'><div className="round" style={{ backgroundColor: '#58FB02' }} />{`${noticesCrees} sont des nouvelles notices (non créees précedemment)`}</div>
                        <div className='line'><div className="round" style={{ backgroundColor: '#F9B234' }} />{`${noticesModifiees} sont des notices modifiées (par rapport aux précedents imports dans ${this.props.collection})`}</div>
                        <div className='line'><div className="round" style={{ backgroundColor: '#E32634' }} />{`${noticesRejetees} notices ne peuvent etre importees car non conformes`}</div>
                        <div className='line'><div className="round" style={{ backgroundColor: '#FEEA10' }} />{`${noticesRejetees} notices presentent un avertissement non bloquant pour l'import`}</div>
                    </div>
                    <Button className="buttonReverse details" onClick={() => {
                        this.onExport()
                        // amplitude.getInstance().logEvent('Import - Cancel');
                    }} >
                        + de details</Button>
                </div>
                <div className='buttons'>
                    <Button className="buttonReverse" color="danger" onClick={() => {
                        this.setState({ step: 0 })
                        amplitude.getInstance().logEvent('Import - Cancel');
                    }} >
                        Annuler l'import</Button>
                    <Button className="button" color="primary" onClick={() => this.onSave()} >Confirmer l'import</Button>
                </div>
            </div>
        )
    }

    renderDropZone() {
        return (
            <div>
                <h4 className='subtitle'>Sélection et dépot des contenus à importer</h4>
                <DropZone
                    onFinish={this.onFilesDropped.bind(this)}
                    visible={true}
                />
            </div>
        )
    }

    renderEmail() {
        const noticesupdated = this.state.importedNotices.filter(e => e._status === 'created' || e._status === 'updated').length;

        return (
            <div className='working-area'>
                <h4 className='subtitle'>Confirmation de l'import</h4>
                <div className='feedbacks'>
                    <div className='feedback'>Vous avez importé avec succès {noticesupdated} notices.</div>
                    <div className='feedback'>Merci pour votre contribution !</div>
                    <div>Vous pouvez récupérer le rapport d'import en nous laissant vos coordonnées mail</div>
                    {
                        this.state.emailSent ? <div>{`Rapport envoyé à ${this.state.email}`}</div> : <div>
                            <input value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value }) }} placeholder="Saisissez votre mail" />
                            <Button className="button" color="primary" onClick={() => {
                                const body = Report.generate(this.state.importedNotices, this.props.collection)
                                api.sendReport(`Rapport import ${this.props.collection}`, this.state.email, body).then(() => {
                                    this.setState({ emailSent: true })
                                })
                            }} >
                                Envoyer
                            </Button>
                        </div>
                    }
                    <div>Vous pouvez consulter les notices importées au lien suivant:</div>
                    <Link to={"/"}>Lien vers la consultation avec critères de recherche pre-remplis(établissement + date)</Link>
                </div>
            </div>
        )
    }

    render() {

        let currentStep = (<div >Error</div>);

        if (this.state.loading) {
            currentStep = (
                <div className='working-area'>
                    <Progress value={this.state.progress.toString()} />
                    <div>{this.state.loadingMessage}</div>
                </div>
            );
        } else if (this.state.errors) {
            console.log(this.state.errors)
            currentStep = (
                <div className='working-area'>
                    <h2>Impossible d'importer le fichier car des erreurs ont été détectées :</h2>
                    <div>{this.state.errors.split('\n').map((e, i) => <div key={i}>{e}</div>)}</div>
                </div>
            );
        } else if (this.state.done) {
            currentStep = (
                <div className='working-area'>
                    <div>{this.state.loadingMessage}</div>
                    <Link to='/'>Revenir a la page d'accueil</Link>
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
                <Row >
                    <Col md={4} className="left-col">
                        <div className="mb-5">
                            <img src={AsideIcon} width={100} alt="" />
                        </div>
                        <h5>Plateforme Ouverte du Patrimoine</h5>
                        <p>La plateforme POP regroupe les contenus numériques de patrimoine français afin de les rendre accessibles et consultables au plus grand nombre</p>
                    </Col>
                    <Col md={8} className="right-col">
                        <p className="title">{`Cette section vous permet de verser du contenu numérique (notices, images) dans la base ${this.props.collection}, selon les trois étapes suivantes`}</p>
                        <Steps labelPlacement="vertical" current={this.state.step} size='big'>
                            <Step title="Etape 1" />
                            <Step title="Etape 2" />
                            <Step title="Etape 3" />
                        </Steps>
                        {currentStep}
                    </Col>
                </Row>
            </Container>
        )

        // return (
        //     <Container>
        //         <Row className='import' type="flex" gutter={16} justify="center">
        //             <DropZone
        //                 onFinish={this.onFilesDropped.bind(this)}
        //                 storeId={this.props.storeId}
        //                 visible={!this.state.displaySummary}
        //             />
        //         </Row>
        //         {this.renderSummary()}
        //     </Container >
        // );
    }
}
