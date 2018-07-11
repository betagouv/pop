import React, { Component } from 'react';
import { Row, Button, Progress, Container, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';

import DropZone from './dropZone'
import Loader from '../../../components/loader';
import api from '../../../services/api'
import Report from './report';

import { diff, exportData } from './utils'
import checkThesaurus from './thesaurus'
import TableComponent from './table';

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
            progress: 0
        }
    }

    async onFilesDropped(files, encoding) {    //check if there are not more fields*

        let importedNotices;

        try {
            //PARSE FILES
            importedNotices = await (this.props.parseFiles(files, encoding));

            //RECUPERATION DES NOTICES EXISTANTES
            const existingNotices = []
            for (var i = 0; i < importedNotices.length; i++) {
                this.setState({ loading: true, loadingMessage: `Récuperation des notices existantes ... `, progress: Math.floor((i * 100) / (importedNotices.length * 2)) });
                const notice = await (api.getNotice(this.props.collection, importedNotices[i].notice.REF));
                if (notice) {
                    existingNotices.push(notice);
                }
            }

            //CALCUL DE LA DIFF
            this.setState({ loadingMessage: 'Calcul des differences....' });
            importedNotices = diff(importedNotices, existingNotices);


            //CHECK DU THESAURUS
            for (var i = 0; i < importedNotices.length; i++) {
                this.setState({ loading: true, loadingMessage: `Vérification de la conformité thesaurus ...`, progress: Math.floor(((i + importedNotices.length) * 100) / (importedNotices.length * 2)) });
                importedNotices[i].warnings = [];
                const allfieldswiththesaurus = this.props.allfieldswiththesaurus;
                for (var j = 0; j < allfieldswiththesaurus.length; j++) {
                    const field = allfieldswiththesaurus[j].value;
                    const warnings = await (checkThesaurus(field, importedNotices[i].notice[field], allfieldswiththesaurus[j].thesaurus));
                    importedNotices[i].warnings = importedNotices[i].warnings.concat(warnings);
                }
            }

            this.setState({ displaySummary: true, calculating: false, importedNotices, loading: false, loadingMessage: '' });

        } catch (e) {
            if (e) {
                this.setState({ errors: e, loading: false })
                return;
            }
        }
    }

    async onSave() {

        const total = this.state.importedNotices.length;
        const created = this.state.importedNotices.filter(e => e.status === 'created');
        const updated = this.state.importedNotices.filter(e => e.status === 'updated');

        let count = 0;
        try {
            //Update notice
            for (var i = 0; i < updated.length; i++ , count++) {
                this.setState({ loading: true, loadingMessage: `Mise à jour des notices ... `, progress: Math.floor((count * 100) / total) });
                const ref = updated[i].notice.REF;
                await api.updateNotice(ref, this.props.collection, updated[i].notice);
            }

            //Create notice
            for (var i = 0; i < created.length; i++ , count++) {
                this.setState({ loading: true, loadingMessage: `Création des notices ... `, progress: Math.floor((count * 100) / total) });
                await api.createNotice(this.props.collection, created[i].notice, created[i].images);
            }

            //Sending rapport
            this.setState({ loading: true, loadingMessage: `Envoi du  rapport ... `, progress: Math.floor((count * 100) / total) });
            const body = Report.generate(this.state.importedNotices);
            await api.sendReport('Rapport import joconde', 'sandrine.della-bartolomea@culture.gouv.fr, sebastien.legoff@beta.gouv.fr', body);

            this.setState({ loading: false, done: true, loadingMessage: `Import effectué avec succès` });
        } catch (e) {
            if (e) {
                this.setState({ errors: e.message, loading: false })
                return;
            }
        }
    }

    sendReport() {

        //'se.legoff@gmail.com, se.legoff@gmail.com'


    }

    onExport() {
        exportData(this.state.importedNotices, this.props.collection)
    }

    renderSummary() {
        if (!this.state.displaySummary) {
            return <div />
        }

        const noticesChargees = this.state.importedNotices.length;
        const noticesCrees = this.state.importedNotices.filter(e => e.status === 'created').length;
        const noticesModifiees = this.state.importedNotices.filter(e => e.status === 'updated').length;

        return (
            <div className='import'>
                <div className='summary'>
                    <h2>Chargement terminé</h2>
                    <div>Notice chargées : {noticesChargees} notice{noticesChargees > 1 ? 's' : ''}</div>
                    <div>Créations : {noticesCrees} notice{noticesCrees > 1 ? 's' : ''}</div>
                    <div>Modifications : {noticesModifiees} notice{noticesModifiees > 1 ? 's' : ''}</div>
                    <div>Rejets : 0 notice{0 > 1 ? 's' : ''}</div>
                </div>
                <div className='buttons'>
                    <Button
                        color="secondary"
                        onClick={() => this.onExport()}
                    >
                        Télécharger le rapport de chargement
          </Button>
                    <Button
                        color="danger"
                        onClick={() => this.setState({ displaySummary: false })}
                    >
                        Annuler l'import
          </Button>
                    <Button
                        color="primary"
                        onClick={() => this.onSave()}
                    >
                        Confirmer l'import
          </Button>
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
