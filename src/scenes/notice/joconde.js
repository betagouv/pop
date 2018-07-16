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
        API.getNotice('joconde', ref)
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
    }

    onSubmit(values) {
        this.setState({ saving: true })
        API.updateNotice(this.state.notice.REF, 'joconde', values).then((e) => {
            toastr.success('Modification enregistrée');
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
                            <FieldImages name='IMG' disabled />
                        </Col>
                        <Col className='image' sm={6}>
                            <Map notice={this.state.notice} />
                        </Col>
                    </Row>
                    <Section
                        title='IDENTIFICATION DU BIEN MUSEAL'
                        icon={require('../../assets/info.png')}
                        color='#FF7676'
                    >
                        <Col sm={6}>
                            <FieldInput
                                title='N°Inventaire, ancien(s) numéros(s), autres numéros, N° de dépôt (INV) :'
                                name='INV'
                                disabled
                            />
                            <FieldTags
                                title='Domaine (catégorie du bien) (DOMN) :'
                                name='DOMN'
                                disabled
                            />
                            <FieldTags
                                title='Dénomination du bien (DENO) : '
                                name='DENO'
                                thesaurus='http://data.culture.fr/thesaurus/resource/ark:/67717/T96'
                                disabled
                            />
                            <FieldTags
                                title='Appellation (APPL) :'
                                name='APPL'
                                disabled
                            />
                            <FieldInput
                                title='Titre (TITR) :'
                                name='TITR'
                                disabled
                            />
                            <FieldInput
                                title='Auteur /exécutant / collecteur (AUTR) :'
                                name='AUTR'
                                disabled
                            />
                            <FieldInput
                                title='Précisions /auteur / exécutant / collecteur (PAUT) :'
                                name='PAUT'
                                type='textarea'
                                rows={4}
                                disabled
                            />
                            <FieldTags
                                title='Ecole (ECOL) :'
                                name='ECOL'
                                disabled
                            />
                            <FieldInput
                                title='Anciennes attributions (ATTR) :'
                                name='ATTR'
                                disabled
                            />
                            <FieldTags
                                title='Période de création / exécution (PERI) :'
                                name='PERI'
                                disabled
                            />
                            <FieldTags
                                title='Millésime de création / exécution (MILL) :'
                                name='MILL'
                                disabled
                            />

                            <FieldTags
                                title='Epoque /style / mouvement (EPOQ) :'
                                name='EPOQ'
                                disabled
                            />
                            <FieldTags
                                title='Période de l’original copié (PEOC) :'
                                name='PEOC'
                                disabled
                            />
                            <FieldTags
                                title='Matériaux et techniques (TECH) :'
                                name='TECH'
                                disabled
                            />
                        </Col>
                        <Col sm={6}>
                            <FieldInput
                                title='Mesures (DIMS) :'
                                name='DIMS'
                                disabled
                            />
                            <FieldTags
                                title='Inscriptions (INSC) :'
                                name='INSC'
                                disabled
                            />
                            <FieldInput
                                title='Précisions sur les inscriptions (PINS) :'
                                name='PINS'
                                disabled
                            />
                            <FieldTags
                                title='Onomastique (ONOM) :'
                                name='ONOM'
                                disabled
                            />
                            <FieldInput
                                title='Description (DESC) :'
                                name='DESC'
                                type='textarea'
                                rows={4}
                                disabled
                            />
                            <FieldTags
                                title='Etat du bien (ETAT) :'
                                name='ETAT'
                                disabled
                            />
                            <FieldInput
                                title='Sujet représenté (REPR) :'
                                name='REPR'
                                type='textarea'
                                rows={4}
                                disabled
                            />
                            <FieldTags
                                title='Précisions sur le sujet représenté (PREP) :'
                                name='PREP'
                                type='textarea'
                                rows={4}
                                disabled
                            />
                            <FieldInput
                                title='Date de la représentation (DREP) :'
                                name='DREP'
                                disabled
                            />
                            <FieldTags
                                title='Source de la représentation (SREP) :'
                                name='SREP'
                                disabled
                            />
                        </Col>
                    </Section>
                    <Section
                        title='CONTEXTE DE CREATION / CONTEXTE HISTORIQUE'
                        icon={require('../../assets/date.png')}
                        color='#FE997B'
                    >
                        <Col sm={6}>
                            <FieldTags
                                title='Genèse (GENE) :'
                                name='GENE'
                                disabled
                            />
                            <FieldInput
                                title='Historique – Objets associés (HIST) :'
                                name='HIST'
                                disabled
                            />
                            <FieldInput
                                title='Lieu de création / d’exécution / d’utilisation, destination (LIEUX) :'
                                name='LIEUX'
                                disabled
                            />
                            <FieldInput
                                title='Précisions sur le lieu de création/ d’exécution / d’utilisation, destination (PLIEUX) :'
                                name='PLIEUX'
                                disabled
                            />
                            <FieldTags
                                title='Géographie historique (GEOHI) :'
                                name='GEOHI'
                                disabled
                            />
                            <FieldTags
                                title='Utilisation / Destination (UTIL) :'
                                name='UTIL'
                                disabled
                            />
                        </Col>
                        <Col sm={6}>
                            <FieldTags
                                title='Précisions sur l’utilisation / destination (PERU) :'
                                name='PERU'
                                disabled
                            />
                            <FieldInput
                                title='Millésime d’utilisation / destination (MILU) :'
                                name='MILU'
                                disabled
                            />
                            <FieldInput
                                title='Découverte / collecte / récolte (lieu de découverte / collecte / récolte) ; Type de site ; Méthode de découverte /collecte / récolte ; Date de découverte / collecte / récolte ; Découvreur / collecteur) (DECV) :'
                                name='DECV'
                                disabled
                            />
                            <FieldInput
                                title='Précisions sur la découverte / collecte / récolte (PDEC) :'
                                name='PDEC'
                                type='textarea'
                                rows={4}
                                disabled
                            />
                            <FieldInput
                                title='Numéro de site (NSDA) :'
                                name='NSDA'
                                disabled
                            />
                        </Col>
                    </Section>
                    <Section
                        title='STATUT JURIDIQUE'
                        icon={require('../../assets/law.png')}
                        color='#FE997B'
                    >
                        <Col sm={6}>
                            <FieldTags
                                title='Statut juridique (type de propriété ; mode d’acquisition ; institution propriétaire (ville quand la commune est propriétaire) ; établissement affectataire (STAT) :'
                                name='STAT'
                                disabled
                            />
                            <FieldInput
                                title='Date d’acquisition (DACQ) :'
                                name='DACQ'
                                disabled
                            />
                            <FieldInput
                                title='Ancienne appartenance (nom du donateur / testateur/ vendeur) (APTN) :'
                                name='APTN'
                                disabled
                            />
                            <FieldInput
                                title='Dépôt / établissement dépositaire (DEPO) :'
                                name='DEPO'
                                disabled
                            />
                            <FieldInput
                                title='Date de dépôt / changement d’affectation (DDPT) :'
                                name='DDPT'
                                disabled
                            />
                        </Col>
                        <Col sm={6}>
                            <FieldTags
                                title='Ancien dépôt / changement d’affectation (ADPT) :'
                                name='ADPT'
                                disabled
                            />

                        </Col>
                    </Section>
                    <Section
                        title='INFORMATIONS COMPLEMENTAIRES'
                        icon={require('../../assets/law.png')}
                        color='#FE997B'
                    >
                        <Col sm={6}>
                            <FieldInput
                                title='Commentaires (COMM) :'
                                name='COMM'
                                disabled
                            />
                            <FieldInput
                                title='Exposition (EXPO) :'
                                name='EXPO'
                                type='textarea'
                                rows={10}
                                disabled
                            />
                            <FieldInput
                                title='Bibliographie (BIBL) :'
                                name='BIBL'
                                type='textarea'
                                rows={10}
                                disabled
                            />
                        </Col>
                        <Col sm={6}>
                            <FieldTags
                                title='Rédacteur (REDA) :'
                                name='REDA'
                                disabled
                            />
                            <FieldInput
                                title='Crédits photographiques (PHOT) :'
                                name='PHOT'
                                disabled
                            />
                        </Col>
                    </Section>
                    <Section
                        title='INFORMATIONS LIEES A L’EXPORT, LA GESTION ET LA PUBLICATION'
                        icon={require('../../assets/date.png')}
                        color='#FFC070'
                    >
                        <Col sm={6}>
                            <FieldInput
                                title='Référence (numéro système de la notice) (REF) :'
                                name='REF'
                                disabled
                            />
                            <FieldInput
                                title='Référence de mise à jour (marque de la modification de la notice) (REFMIS) :'
                                name='REFMIS'
                                disabled
                            />
                            <FieldInput
                                title='Référence image : lien texte/ image (REFIM) :'
                                name='REFIM'
                                disabled
                            />
                            <FieldInput
                                title='Appellation musée de France : logo (LABEL) :'
                                name='LABEL'
                                disabled
                            />
                            <FieldInput
                                title='Copyright notice (COPY) :'
                                name='COPY'
                                disabled
                            />
                            <FieldInput
                                title='Lien commande de reproduction et/ou de conditions d’utilisation (MSGCOM) :'
                                name='MSGCOM'
                                disabled
                            />
                        </Col>
                        <Col sm={6}>
                            <FieldInput
                                title='Lien contact musée (CONTACT) :'
                                name='CONTACT'
                                disabled
                            />
                            <FieldInput
                                title='Lien site associé / site complémentaire (WWW) :'
                                name='WWW'
                                disabled
                            />
                            <FieldInput
                                title='Lien Vidéo (LVID) :'
                                name='LVID'
                                disabled
                            />
                            <FieldInput
                                title='Lien Numéro MUSEOFILE (MUSEO) :'
                                name='MUSEO'
                                disabled
                            />
                            <FieldInput
                                title='Coordinateur (COOR) :'
                                name='COOR'
                                disabled
                            />
                            <FieldInput
                                title='Date de mise a jour (DMAJ) :'
                                name='DMAJ'
                                disabled
                            />
                            <FieldInput
                                title='Date de creation (DMIS) :'
                                name='DMIS'
                                disabled
                            />
                        </Col>
                    </Section>
                    <div className='buttons'>
                        <Button color="danger">
                            <Link to="/">
                                Annuler
                         </Link>
                        </Button>
                        <Button
                            disabled={true}
                            color="primary"
                            type="submit"
                        >
                            Sauvegarder
                    </Button>
                    </div>
                </Form >
            </Container >
        );
    }
}



export default reduxForm({
    form: 'notice'
})(Notice)


