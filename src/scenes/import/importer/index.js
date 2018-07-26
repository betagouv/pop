import React, { Component } from 'react';
import { Row, Button, Progress, Container } from 'reactstrap';
import { Link } from 'react-router-dom';

import DropZone from './dropZone'
import api from '../../../services/api'
import Report from './report';
import controleThesaurus from './thesaurus';
import ExportData from './export';

import diff from './diff';

import './index.css';

export default class Importer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            importedNotices: [],
            errors: '',
            displaySummary: false,
            done: false,
            loading: false,
            loadingMessage: '',
            progress: 0,
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
                const notice = await (api.getNotice(this.props.collection, importedNotices[i].REF.value));
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

            this.setState({ displaySummary: true, calculating: false, importedNotices, fileName, loading: false, loadingMessage: '' });
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
                await api.updateNotice(notice.REF, this.props.collection, notice, updated[i].images);
            }

            //Create notice
            for (var i = 0; i < created.length; i++ , count++) {
                this.setState({ loading: true, loadingMessage: `Création des notices ... `, progress: Math.floor((count * 100) / total) });
                const notice = created[i].makeItFlat();
                await api.createNotice(this.props.collection, notice, created[i].images);
            }
            //Sending rapport
            this.setState({ loading: true, loadingMessage: `Envoi du  rapport ... `, progress: Math.floor((count * 100) / total) });
            let body = '';
            if (this.props.onReport) {
                body = this.props.onReport(this.state.importedNotices);
            } else {
                body = Report.generate(this.state.importedNotices, this.props.collection)
            }
""
            const dest = [
                'sandrine.della-bartolomea@culture.gouv.fr',
                'sebastien.legoff@beta.gouv.fr',
                'carine.prunet@culture.gouv.fr',
                'jeannette.ivain@culture.gouv.fr',
            ]

            await api.sendReport(`Rapport import ${this.props.collection}`, dest.join(','), body);

            this.setState({ loading: false, done: true, loadingMessage: `Import effectué avec succès` });
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
        if (!this.state.displaySummary) {
            return <div />
        }
        const noticesChargees = this.state.importedNotices.length;
        const noticesCrees = this.state.importedNotices.filter(e => e._status === 'created').length;
        const noticesModifiees = this.state.importedNotices.filter(e => e._status === 'updated').length;
        const noticesRejetees = this.state.importedNotices.filter(e => e._status === 'rejected').length;
        const pbNoticesUpdated = this.state.importedNotices.filter(e => (e._status === 'created' || e._status === 'updated')).filter(e => e._warnings.length).length;

        return (
            <div className='import'>
                <div className='summary'>
                    <h2>Vous vous apprêtez à importer le fichier {this.state.fileName} qui recense {noticesChargees} notice{noticesChargees > 1 ? 's' : ''} dont : </h2>
                    <div>{noticesCrees > 1 ? `${noticesCrees} sont des nouvelles notices` : `${noticesCrees} nouvelle notice`}</div>
                    <div>{noticesModifiees > 1 ? `${noticesModifiees} sont des notices modifiées` : `${noticesModifiees} notice modifiée`}</div>
                    <div>{noticesRejetees > 1 ? `${noticesRejetees}  ont été rejetées ( consultez le rapport à télécharger pour plus de détails)` : `${noticesRejetees} a été rejetée ( consultez le rapport à télécharger pour plus de détails)`}</div>
                    <div>Sur les {noticesCrees + noticesModifiees} notices prêtent à être importées, {pbNoticesUpdated} font l'objet d'un avertissement </div>
                    <Button
                        color="success"
                        onClick={() => this.onExport()}
                    >Télécharger le rapport de chargement </Button>
                </div>
                <div className='buttons'>
                    <Button color="danger" onClick={() => {
                        this.setState({ displaySummary: false })
                        amplitude.getInstance().logEvent('Import - Cancel');
                    }} >Annuler l'import</Button>
                    <Button color="primary" onClick={() => this.onSave()} >Confirmer l'import</Button>
                </div>
            </div>
        )
    }

    render() {
        if (this.state.loading) {
            return (
                <div className='import-container'>
                    <Progress value={this.state.progress.toString()} />
                    <div>{this.state.loadingMessage}</div>
                </div>
            );
        }

        if (this.state.done) {
            return (
                <div className='import-container'>
                    <div>{this.state.loadingMessage}</div>
                    <Link to='/'>Revenir a la page d'accueil</Link>
                </div>
            );
        }

        if (this.state.errors) {

            console.log(this.state.errors)
            return (
                <div className='import-container'>
                    <h2>Impossible d'importer le fichier car des erreurs ont été detectées :</h2>
                    <div>{this.state.errors.split('\n').map((e, i) => <div key={i}>{e}</div>)}</div>
                </div>
            );
        }


        return (
            <Container>
                <Row className='import' type="flex" gutter={16} justify="center">
                    <DropZone
                        onFinish={this.onFilesDropped.bind(this)}
                        storeId={this.props.storeId}
                        visible={!this.state.displaySummary}
                    />
                </Row>
                {this.renderSummary()}
            </Container >
        );
    }
}
