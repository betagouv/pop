import React, { Component } from 'react';
import { Row, Button, Progress, Container, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';

import DropZone from './dropZone'
import Loader from '../../../components/loader';
import api from '../../../services/api'
import Report from './report';
import ExportData from './export';

import { diff } from './utils'
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
            progress: 0,
            fileName: '',
        }
    }

    async onFilesDropped(files, encoding) {    //check if there are not more fields*

        let importedNotices;

        try {
            //PARSE FILES
            let { importedNotices, fileName } = await (this.props.parseFiles(files, encoding));

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

            importedNotices = diff(importedNotices, existingNotices, this.props.mapping.filter(e => e.generated).map(e => e.value));

            //CHECK DU THESAURUS
            const optimMap = {};
            const allfieldswiththesaurus = this.props.mapping.filter(e => e.thesaurus);

            for (var i = 0; i < importedNotices.length; i++) {
                this.setState({ loading: true, loadingMessage: `Vérification de la conformité thesaurus ...`, progress: Math.floor(((i + importedNotices.length) * 100) / (importedNotices.length * 2)) });
                for (var j = 0; j < allfieldswiththesaurus.length; j++) {
                    const field = allfieldswiththesaurus[j].value;
                    const thesaurus = allfieldswiththesaurus[j].thesaurus;
                    const values = [].concat(importedNotices[i].notice[field]);

                    for (var k = 0; k < values.length; k++) {
                        const value = values[k];
                        if (value) {
                            let val = null;
                            if (optimMap[thesaurus] && optimMap[thesaurus][value] !== undefined) {
                                val = optimMap[thesaurus][value];
                            } else {
                                val = await (api.validateWithThesaurus(thesaurus, value));
                            }
                            if (!val) {
                                if (allfieldswiththesaurus[j].thesaurus_strict === true) {
                                    importedNotices[i].errors.push(`Le champs ${field} avec la valeur ${value} n'est pas conforme avec le thesaurus ${thesaurus}`)
                                } else {
                                    importedNotices[i].warnings.push(`Le champs ${field} avec la valeur ${value} n'est pas conforme avec le thesaurus ${thesaurus}`)
                                }
                            }

                            if (!optimMap[thesaurus]) optimMap[thesaurus] = {};
                            optimMap[thesaurus][value] = val;
                        }
                    }
                }
            }

            for (var i = 0; i < importedNotices.length; i++) {
                if (importedNotices[i].errors.length) {
                    importedNotices[i].status = 'rejected';
                }
            }

            this.setState({ displaySummary: true, calculating: false, importedNotices, fileName, loading: false, loadingMessage: '' });

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
            let errors = e.message ? e.message : e;
            this.setState({ errors, loading: false })
            return;
        }
    }

    onExport() {
        ExportData.generate(this.state.importedNotices, 'joconde')
    }

    renderSummary() {
        if (!this.state.displaySummary) {
            return <div />
        }

        const noticesChargees = this.state.importedNotices.length;
        const noticesCrees = this.state.importedNotices.filter(e => e.status === 'created').length;
        const noticesModifiees = this.state.importedNotices.filter(e => e.status === 'updated').length;
        const noticesRejetees = this.state.importedNotices.filter(e => e.status === 'rejected').length;

        const pbNoticesUpdated = this.state.importedNotices.filter(e => (e.status === 'created' || e.status === 'updated')).filter(e => e.warnings.length).length;

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
                    <Button
                        color="danger"
                        onClick={() => this.setState({ displaySummary: false })}
                    >Annuler l'import</Button>
                    <Button
                        color="primary"
                        onClick={() => this.onSave()}
                    >Confirmer l'import</Button>
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
