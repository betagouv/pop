import React from 'react';
import { Row, Col, Input, Container, Button, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { toastr } from 'react-redux-toastr'

import FieldInput from './components/fieldInput.js'
import FieldTags from './components/fieldTags.js'
import FieldLink from './components/fieldLink.js'
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
        API.getNotice('joconde', ref).then((notice) => {
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

        const arr = [];
        for (var key in this.state.notice) {
            if (this.state.notice[key]) {
                arr.push(<span key={key}>{`${key}:${this.state.notice[key]}`}</span>)
            }
        }

        return (
            <Container className='notice' fluid>
                <Form
                    onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}
                    className='main-body'
                >
                    <Row>
                        <Col className='image' sm={6}>
                            <div className="thumbs-box">
                                <div className="thumb-lg mb-3">
                                    <img src={this.state.notice.IMG} alt="" className="img-fluid w-100" />
                                </div>
                            </div>
                        </Col>
                        <Col className='image' sm={6}>
                            <Map
                                notice={this.state.notice}
                            />
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
                                title='Appellation (APPL) :'
                                name='APPL'
                            />
                            <FieldInput
                                title='Titre (TITR) :'
                                name='TITR'
                            />
                            <FieldInput
                                title='Auteur /exécutant / collecteur (AUTR) :'
                                name='AUTR'
                            />
                            <FieldInput
                                title='Précisions /auteur / exécutant / collecteur (PAUT) :'
                                name='PAUT'
                            />
                            <FieldTags
                                title='Ecole (ECOL) :'
                                name='ECOL'
                            />
                            <FieldInput
                                title='Anciennes attributions (ATTR) :'
                                name='ATTR'
                            />
                            <FieldTags
                                title='Période de création / exécution (PERI) :'
                                name='PERI'
                            />
                            <FieldTags
                                title='Millésime de création / exécution (MILL) :'
                                name='MILL'
                            />

                            <FieldTags
                                title='Epoque /style / mouvement (EPOQ) :'
                                name='EPOQ'
                            />
                            <FieldTags
                                title='Période de l’original copié (PEOC) :'
                                name='PEOC'
                            />
                            <FieldTags
                                title='Matériaux et techniques (TECH) :'
                                name='TECH'
                            />
                        </Col>
                        <Col sm={6}>
                            <FieldInput
                                title='Mesures (DIMS) :'
                                name='DIMS'
                            />
                            <FieldTags
                                title='Inscriptions (INSC) :'
                                name='INSC'
                            />
                            <FieldInput
                                title='Précisions sur les inscriptions (PINS) :'
                                name='PINS'
                            />
                            <FieldTags
                                title='Onomastique (ONOM) :'
                                name='ONOM'
                            />
                            <FieldInput
                                title='Description (DESC) :'
                                name='DESC'
                                type='textarea'
                                rows={4}
                            />
                            <FieldTags
                                title='Etat du bien (ETAT) :'
                                name='ETAT'
                            />
                            <FieldInput
                                title='Sujet représenté (REPR) :'
                                name='REPR'
                                type='textarea'
                                rows={4}
                            />
                            <FieldTags
                                title='Précisions sur le sujet représenté (PREP) :'
                                name='PREP'
                                type='textarea'
                                rows={4}
                            />
                            <FieldInput
                                title='Date de la représentation (DREP) :'
                                name='DREP'
                            />
                            <FieldTags
                                title='Source de la représentation (SREP) :'
                                name='SREP'
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
                            />
                            <FieldInput
                                title='Historique – Objets associés (HIST) :'
                                name='HIST'
                            />
                            <FieldInput
                                title='Lieu de création / d’exécution / d’utilisation, destination (LIEUX) :'
                                name='LIEUX'
                            />
                            <FieldInput
                                title='Précisions sur le lieu de création/ d’exécution / d’utilisation, destination (PLIEUX) :'
                                name='PLIEUX'
                            />
                            <FieldTags
                                title='Géographie historique (GEOHI) :'
                                name='GEOHI'
                            />
                            <FieldTags
                                title='Utilisation / Destination (UTIL) :'
                                name='UTIL'
                            />
                        </Col>
                        <Col sm={6}>
                            <FieldTags
                                title='Précisions sur l’utilisation / destination (PERU) :'
                                name='PERU'
                            />
                            <FieldInput
                                title='Millésime d’utilisation / destination (MILU) :'
                                name='MILU'
                            />
                            <FieldInput
                                title='Découverte / collecte / récolte (lieu de découverte / collecte / récolte) ; Type de site ; Méthode de découverte /collecte / récolte ; Date de découverte / collecte / récolte ; Découvreur / collecteur) (DECV) :'
                                name='DECV'
                            />
                            <FieldInput
                                title='Précisions sur la découverte / collecte / récolte (PDEC) :'
                                name='PDEC'
                                type='textarea'
                                rows={4}
                            />
                            <FieldInput
                                title='Numéro de site (NSDA) :'
                                name='NSDA'
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
                            />
                            <FieldInput
                                title='Date d’acquisition (DACQ) :'
                                name='DACQ'
                            />
                            <FieldInput
                                title='Ancienne appartenance (nom du donateur / testateur/ vendeur) (APTN) :'
                                name='APTN'
                            />
                            <FieldInput
                                title='Dépôt / établissement dépositaire (DEPO) :'
                                name='DEPO'
                            />
                            <FieldInput
                                title='Date de dépôt / changement d’affectation (DDPT) :'
                                name='DDPT'
                            />
                        </Col>
                        <Col sm={6}>
                            <FieldTags
                                title='Ancien dépôt / changement d’affectation (ADPT) :'
                                name='ADPT'
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
                            />
                            <FieldInput
                                title='Exposition (EXPO) :'
                                name='EXPO'      
                                type='textarea'
                                rows={10}
                            />
                            <FieldInput
                                title='Bibliographie (BIBL) :'
                                name='BIBL'      
                                type='textarea'
                                rows={10}
                            />
                        </Col>
                        <Col sm={6}>
                            <FieldTags
                                title='Rédacteur (REDA) :'
                                name='REDA'
                            />
                            <FieldInput
                                title='Crédits photographiques (PHOT) :'
                                name='PHOT'
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
                            />
                            <FieldInput
                                title='Référence image : lien texte/ image (REFIM) :'
                                name='REFIM'
                            />
                            <FieldInput
                                title='Appellation musée de France : logo (LABEL) :'
                                name='LABEL'
                            />
                            <FieldInput
                                title='Copyright notice (COPY) :'
                                name='COPY'
                            />
                            <FieldInput
                                title='Lien commande de reproduction et/ou de conditions d’utilisation (MGSCOM) :'
                                name='MGSCOM'
                            />
                        </Col>
                        <Col sm={6}>
                            <FieldInput
                                title='Lien contact musée (CONTACT) :'
                                name='CONTACT'
                            />
                            <FieldInput
                                title='Lien site associé / site complémentaire (WWW) :'
                                name='WWW'
                            />
                            <FieldInput
                                title='Lien Vidéo (LVID) :'
                                name='LVID'
                            />
                            <FieldInput
                                title='Lien Numéro MUSEOFILE (MUSEO) :'
                                name='MUSEO'
                            />
                            <FieldInput
                                title='Coordinateur (COOR) :'
                                name='COOR'
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
                {/* <div className='rawdata'>
                    {arr}
                </div> */}
            </Container >
        );
    }
}



export default reduxForm({
    form: 'notice',
    // enableReinitialize: true
})(Notice)




const Images = ({ images }) => {
    if (images && images.length) {
        return (
            <Col xs={12} sm={12} md={6}>
                <div className="thumbs-box">
                    <div className="thumb-lg mb-3">
                        <img src={images[0]} alt="" className="img-fluid w-100" />
                    </div>
                </div>
            </Col>
        )
    } else {
        return <div />
    }
}

