import React from 'react';
import { Row, Col, Input, Container, Button, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form'
import { toastr } from 'react-redux-toastr'

import FieldInput from './components/fieldInput.js'
import FieldTags from './components/fieldTags.js'
import FieldLink from './components/fieldLink.js'
import FieldImages from './components/fieldImages';
import Section from './components/section.js'
import Map from './components/map.js'

import Loader from '../../components/loader'
import API from '../../services/api'

import './index.css';

class Notice extends React.Component {

    state = {
        notice: null,
        error: '',
        loading: true
    }

    componentWillMount() {
        this.load(this.props.match.params.ref)
    }

    componentWillReceiveProps(newProps) {
        if (this.props.match && this.props.match.params.ref !== newProps.match.params.ref) {
            this.load(newProps.match.params.ref);
        }
    }

    load(ref) {
        this.setState({ loading: true })
        API.getNotice('mnr', ref)
            .then((notice) => {
                if (!notice) {
                    this.setState({ loading: false, error: `Impossible de charger la notice ${ref}` });
                    console.error(`Impossible de charger la notice ${ref}`)
                }
                console.log('NOTICE', notice)
                const initData = notice;
                this.props.initialize(initData);
                this.setState({ loading: false, notice })
            })
            .catch((e) => {
                this.setState({ loading: false, error: e });
                console.error(`Impossible de charger la notice ${ref}`)
            })
    }

    onSubmit(values) {
        this.setState({ saving: true })


        const files = [];
        for (var i = 0; i < values.VIDEO.length; i++) {
            if (values.VIDEO[i] instanceof File) {
                files.push(values.VIDEO[i]);
                values.VIDEO[i] = `mnr/${values.REF}/${values.VIDEO[i].name}`
            }
        }

        console.log('values.VIDEO', values.VIDEO)
        API.updateNotice(this.state.notice.REF, 'mnr', values, files)
            .then((e) => {
                toastr.success('Modification enregistrée');
                this.setState({ saving: false })
            })
            .catch((e) => {
                toastr.error('Impossible d\'enregistrer la modification');
                this.setState({ saving: false })
            })
    }

    render() {

        if (this.state.loading) {
            return <Loader />
        }

        if (this.state.error) {
            return <div className='error'>{this.state.error}</div>
        }


        return (
            <Container className='notice' fluid>
                <Form
                    onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}
                    className='main-body'
                >
                    <Row>
                        <Col className='image' sm={6}>
                            <FieldImages
                                name='VIDEO'
                            />
                        </Col>
                        <Col className='image' sm={6}>
                            <Map
                                notice={this.state.notice}
                            />
                        </Col>
                    </Row>
                    <Section
                        title='IDENTIFICATION DU BIEN'
                        icon={require('../../assets/info.png')}
                        color='#FF7676'
                    >
                        <Col sm={6}>
                            <FieldInput
                                title='REF (REF) :'
                                name='REF'
                                disabled
                            />
                            <FieldInput
                                title='Références mistral (REFMIS) :'
                                name='REFMIS'
                                disabled
                            />
                            <FieldInput
                                title='N°Inventaire, ancien(s) numéros(s), autres numéros, N° de dépôt (INV) :'
                                name='INV'
                            />
                            <FieldTags
                                title='Domaine (catégorie du bien) (DOMN) :'
                                name='DOMN'
                            />
                            <FieldTags
                                title='Dénomination du bien (DENO) : '
                                name='DENO'
                                thesaurus='http://data.culture.fr/thesaurus/resource/ark:/67717/T96'
                            />
                            <FieldTags
                                title='Auteur /exécutant / collecteur (AUTR) :'
                                name='AUTR'
                            />
                            <FieldInput
                                title='Precisions auteur (PAUT) :'
                                name='PAUT'
                            />
                            <FieldInput
                                title='Anciennes attributions (ATTR) :'
                                name='ATTR'
                            />
                            <FieldInput
                                title='Ecole (ECOL) :'
                                name='ECOL'
                            />
                            <FieldInput
                                title='Genèse (GENE) :'
                                name='GENE'
                            />
                            <FieldInput
                                title='Titre (TITR) :'
                                name='TITR'
                            />
                            <FieldInput
                                title='Ancien titre (ATIT) :'
                                name='ATIT'
                            />
                            <FieldInput
                                title='Précision titre (PTIT) :'
                                name='PTIT'
                            />
                            <FieldTags
                                title='Siècle (SCLE) :'
                                name='SCLE'
                            />
                            <FieldInput
                                title='Style (STYL) :'
                                name='STYL'
                            />
                            <FieldInput
                                title='Millenaire (MILL) :'
                                name='MILL'
                            />
                            <FieldTags
                                title='Technique (TECH) :'
                                name='TECH'
                            />
                            <FieldTags
                                title='Dimensions (DIMS) :'
                                name='DIMS'
                            />
                            <FieldInput
                                title='Description (DESC) :'
                                name='DESC'
                                type='textarea'
                                rows={8}
                            />
                            <FieldInput
                                title='Inscriptions (INSC) :'
                                name='INSC'
                            />
                            <FieldInput
                                title='Historique (HIST) :'
                                name='HIST'
                            />
                            <FieldInput
                                title='Provenance (PROV) :'
                                name='PROV'
                            />
                            <FieldInput
                                title='Exposition (EXPO) :'
                                name='EXPO'
                            />
                            <FieldInput
                                title='Localisation (LOCA) :'
                                name='LOCA'
                            />
                        </Col>
                        <Col sm={6}>
                            <FieldInput
                                title='Bibliographie (BIBL) :'
                                name='BIBL'
                                type='textarea'
                                rows={8}
                            />
                            <FieldInput
                                title='Observations (OBSE) :'
                                name='OBSE'
                            />
                            <FieldInput
                                title='Adresses images jointes générique (actuellement non utilisé) (REFIM) :'
                                name='REFIM'
                            />
                            <FieldInput
                                title='Ancienne attribution (AATT) :'
                                name='AATT'
                            />
                            <FieldInput
                                title='Autre titre (AUTI) :'
                                name='AUTI'
                            />
                            <FieldInput
                                title='Date mise à jour (DMAJ) :'
                                name='DMAJ'
                            />
                            <FieldInput
                                title='Etat de conservation (ETAT) :'
                                name='ETAT'
                            />
                            <FieldInput
                                title='Notes (NOTE) :'
                                name='NOTE'
                            />
                            <FieldInput
                                title='Précisions sur la représentation. (PREP) :'
                                name='PREP'
                            />
                            <FieldInput
                                title='OEuvres liées, ensemble (SUITE) :'
                                name='SUITE'
                            />
                            <FieldInput
                                title='Sujet de la représentation (source littéraire ou musicale) (SREP) :'
                                name='SREP'
                            />
                            <FieldInput
                                title='Représentation (REPR) :'
                                name='REPR'
                            />
                            <FieldTags
                                title='Rédacteurs (REDC) :'
                                name='REDC'
                            />
                            <FieldInput
                                title='Droits de copie photo (PHOT) :'
                                name='PHOT'
                            />
                            <FieldInput
                                title='Autres numéros (NUMS) :'
                                name='NUMS'
                            />
                            <FieldInput
                                title='Marques (MARQ) :'
                                name='MARQ'
                            />
                            <FieldInput
                                title='Date de la représentation (DREP) :'
                                name='DREP'
                            />
                            <FieldInput
                                title='Catégorie (CATE) :'
                                name='CATE'
                            />
                            <FieldInput
                                title='Commentaire (COMM) :'
                                name='COMM'
                            />
                            <FieldInput
                                title='Etablissement affectataire qui existe dans d’autres bases (AFFE) :'
                                name='AFFE'
                            />

                            <FieldInput
                                title='Mentions de spoliations (SPOL) :'
                                name='SPOL'
                            />
                        </Col>
                    </Section>
                    <div className='buttons'>
                        <Button color="danger"><Link style={{ textDecoration: 'none', color: 'white' }} to="/">Annuler</Link></Button>
                        <Button color="primary" type="submit" >Sauvegarder</Button>
                    </div>
                </Form >
            </Container >
        );
    }
}



export default reduxForm({
    form: 'notice',
    // enableReinitialize: true
})(Notice)


