import React from 'react';
import { Row, Col, Input, Container, Button, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import { reduxForm } from 'redux-form'
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
        API.getNotice('palissy', ref).then((notice) => {
            console.log('NOTICE', notice)
            this.props.initialize({ ...notice, IMG: notice.IMG ? [notice.IMG] : [] });
            this.setState({ loading: false, notice })
        })
    }

    onSubmit(values) {
        this.setState({ saving: true })

        console.log('VALUES', values)
        API.updateNotice(this.state.notice.REF, 'palissy', values).then((e) => {
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
                        <div className="back" onClick={() => this.props.history.goBack()}>Retour</div>
                    </Row>
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
                        title='REFERENCES ET GESTION DOCUMENTAIRES'
                        icon={require('../../assets/info.png')}
                        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugia'
                        color='#FF7676'
                    >
                        <Col sm={6}>
                            <FieldInput
                                title='Notice (REF) :'
                                name='REF'
                                disabled
                            />
                            <FieldLink
                                title='N° de renvoi au domaine MH ou au domaine INVENTAIRE (RENV ) :'
                                name='RENV'
                                url="/notice/palissy/"
                                disabled
                            />
                            <FieldInput
                                title='Référence dans la base Patriarche (ARCHEO) : '
                                name='ARCHEO'
                                disabled
                            />
                            <FieldTags
                                title="Date d'enquête (DENQ) :"
                                name='DENQ'
                                disabled
                            />
                            <FieldInput
                                title="CopyRight (COPY) :"
                                name='COPY'
                                disabled
                            />
                            <FieldInput
                                title="Identifiant Patrimoine (RFPA) :"
                                name='RFPA'
                                disabled
                            />
                            <FieldInput
                                title="Date de mise à jour (DMAJ) :"
                                name='DMAJ'
                                disabled
                            />
                            <FieldInput
                                title='Domaines (DOMN) : '
                                name='DOMN'
                                disabled
                            />
                            <FieldLink
                                title='REFA (REFA) : '
                                name='REFA'
                                url="/notice/merimee/"
                                disabled
                            />
                            <FieldInput
                                title='Auteurs phototype (AUTP) : '
                                name='AUTP'
                                disabled
                            />
                            <FieldInput
                                title='Dossier adresse (DOSADRS) :'
                                name='DOSADRS'
                                disabled
                            />
                            <FieldInput
                                title='Contact (CONTACT) :'
                                name='CONTACT'
                                disabled
                            />

                        </Col>
                        <Col sm={6}>
                            <FieldTags
                                title='Liens Divers (LIENS) : '
                                name='LIENS'
                                disabled
                            />
                            <FieldTags
                                title='Date de rédaction de la notice (DBOR) :'
                                name='DBOR'
                                disabled
                            />
                            <FieldTags
                                title='Noms des rédacteurs de la notice et du dossier (NOMS) : '
                                name='NOMS'
                                disabled
                            />
                            <FieldInput
                                title="Cadre de l'étude (ETUD) :"
                                name='ETUD'
                                disabled
                            />
                            <FieldTags
                                title='Dossier (DOSS) : '
                                name='DOSS'
                                disabled
                            />
                            <FieldInput
                                title="Date de chargement dans la base MERIMEE (DMIS) :"
                                name='DMIS'
                                disabled
                            />
                            <FieldInput
                                title="Numéro de microfiche (MICR) :"
                                name='MICR'
                                disabled
                            />
                        </Col>
                    </Section>
                    <Section
                        title='DESIGNATION'
                        icon={require('../../assets/law.png')}
                        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugia'
                        color='#FE997B'
                    >
                        <Col sm={6}>
                            <FieldTags
                                title='Denomination (DENO) : '
                                name='DENO'
                                disabled
                                thesaurus='http://data.culture.fr/thesaurus/resource/ark:/67717/T96'
                            />
                            <FieldInput
                                title='Destinataire (GENR) : '
                                name='GENR'
                                disabled
                            />
                            <FieldTags
                                title='Précision sur la dénomination (PDEN) :'
                                name='PDEN'
                                disabled
                            />
                            <FieldInput
                                title='Vocable (VOCA) :'
                                name='VOCA'
                                disabled
                            />
                            <FieldInput
                                title='Appellation et titre (APPL) :'
                                name='APPL'
                                disabled
                            />
                            <FieldInput
                                title='Destinations successives et actuelle (ACTU) :'
                                name='ACTU'
                                disabled
                            />
                        </Col>
                        <Col sm={6}>
                            <FieldInput
                                title='Titre courant (TICO) : '
                                name='TICO'
                                disabled
                            />
                            <FieldTags
                                title='Parties constituantes (PART) : '
                                name='PART'
                                disabled
                            />
                            <FieldLink
                                title='Références des parties constituantes étudiées (REFP) : '
                                name='REFP'
                                url="/notice/palissy/"
                                disabled
                            />
                            <FieldInput
                                title='Décompte des oeuvres recensées (COLL) :'
                                name='COLL'
                                disabled
                            />
                        </Col>
                    </Section>

                    <Section
                        title='LOCALISATION'
                        icon={require('../../assets/map.png')}
                        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugia'
                        color='#FFC070'
                    >
                        <Col sm={6}>
                            <FieldInput
                                title='Region (REG) : '
                                name='REG'
                                disabled
                            />
                            <FieldInput
                                title='Département (DPT) : '
                                name='DPT'
                                disabled
                            />
                            <FieldInput
                                title='Commune (COM) : '
                                name='COM'
                                disabled
                            />
                            <FieldInput
                                title='Numéro INSEE de la commune (INSEE) :'
                                name='INSEE'
                                disabled
                            />
                            <FieldInput
                                title='Précision sur la localisation (PLOC) :'
                                name='PLOC'
                                disabled
                            />
                            <FieldInput
                                title="Aire d'étude (AIRE) : "
                                name='AIRE'
                                disabled
                            />
                            <FieldInput
                                title='Canton (CANT) : '
                                name='CANT'
                                disabled
                            />
                            <FieldInput
                                title='Lieu-dit (LIEU) : '
                                name='LIEU'
                                disabled
                            />
                            <FieldInput
                                title='Adresse (ADRS) : '
                                name='ADRS'
                                disabled
                            />
                            <FieldInput
                                title='Edifice de conservation (EDIF) : '
                                name='EDIF'
                                disabled
                            />
                        </Col>
                        <Col sm={6}>

                            <FieldLink
                                title="Référence de l'édifice de conservation (REFE) : "
                                name='REFE'
                                url="/notice/palissy/"
                                disabled
                            />
                            <FieldInput
                                title='Référence cadastrale (CADA) :'
                                name='CADA'
                                disabled
                            />
                            <FieldInput
                                title='TODO-Zone Lambert ou autres (ZONE) :'
                                name='ZONE'
                                disabled
                            />
                            <FieldInput
                                title="TODO-Coordonnées Lambert (ou autres) d'un points (COOR ) :"
                                name='COOR'
                                disabled
                            />
                            <FieldInput
                                title="TODO-Coordonnées Lambert (ou autres) multiples (COORM ) :"
                                name='COORM'
                                disabled
                            />
                            <FieldInput
                                title="Milieu d'implantation (IMPL) : "
                                name='IMPL'
                                disabled
                                thesaurus='http://data.culture.fr/thesaurus/resource/ark:/67717/T12'
                            />
                            <FieldInput
                                title="Cours d'eau (HYDR) : "
                                name='HYDR'
                                disabled
                            />
                            <FieldInput
                                title='Localisation (LOCA) : '
                                name='LOCA'
                                disabled
                            />
                        </Col>
                    </Section>
                    <Section
                        title='Historique'
                        icon={require('../../assets/date.png')}
                        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugia'
                        color='#668796'
                    >
                        <Col sm={6}>
                            <FieldTags
                                title='Datation des campagnes principales de construction (SCLE) :'
                                name='SCLE'
                                disabled
                                thesaurus='http://data.culture.fr/thesaurus/resource/ark:/67717/T17'
                            />
                            <FieldTags
                                title="Datation en années (DATE) :"
                                name='DATE'
                                disabled
                            />
                            <FieldTags
                                title='Justification de la datation (JDAT) :'
                                name='JDAT'
                                disabled
                            />
                            <FieldTags
                                title="Auteurs de l'oeuvre(AUTR) : "
                                name='AUTR'
                                disabled
                            />
                        </Col>
                        <Col sm={6}>
                            <FieldTags
                                title='Personnalitées (PERS) :'
                                name='PERS'
                                disabled
                                thesaurus='http://data.culture.fr/thesaurus/resource/ark:/67717/T6'
                            />

                            <FieldInput
                                title='Remploi (REMP) : '
                                name='REMP'
                                disabled
                            />
                            <FieldInput
                                title='Partie déplacée (DEPL) : '
                                name='DEPL'
                                disabled
                            />
                            <FieldInput
                                title='Commentaire historique (HIST) :'
                                name='HIST'
                                disabled
                            />
                        </Col>
                    </Section>
                    <Section
                        title='DESCRIPTION'
                        icon={require('../../assets/tool.png')}
                        color='#FBE367'
                    >
                        <Col sm={6}>
                            <FieldInput
                                title='Parti de plan (PLAN) :'
                                name='PLAN'
                                disabled
                            />
                            <FieldInput
                                title='Emplacement, forme et structure de l’escalier (ESCA) : '
                                name='ESCA'
                                disabled
                            />
                            <FieldInput
                                title='Couvert et découvert de jardin (VERT) :'
                                name='VERT'
                                disabled
                            />
                            <FieldTags
                                title='Représentation (REPR) : '
                                name='REPR'
                                disabled
                            />
                            <FieldInput
                                title='Précision sur la représentation (PREP) : '
                                name='PREP'
                                disabled
                            />
                        </Col>
                        <Col sm={6}>
                            <FieldInput
                                title='Dimensions (DIMS) : '
                                name='DIMS'
                                disabled
                            />
                            <FieldInput
                                title='Typologie (TYPO) : '
                                name='TYPO'
                                disabled
                            />
                            <FieldTags
                                title='Etat de conservation (ETAT) : '
                                name='ETAT'
                                disabled
                            />
                            <FieldInput
                                title='Commentaire description (DESC) :'
                                name='DESC'
                                disabled
                            />
                            <FieldTags
                                title='Parties non étud (PARN) : '
                                name='PARN'
                                disabled
                            />
                        </Col>
                    </Section>
                    <Section
                        title='INTERET ET PROTECTION'
                        icon={require('../../assets/law.png')}
                        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugia'
                        color='#FE997B'
                    >
                        <Col sm={6}>
                            <FieldInput
                                title='Nature de la protection MH (PROT) :'
                                name='PROT'
                                disabled
                                thesaurus='http://data.culture.fr/thesaurus/resource/ark:/67717/T10'
                            />
                            <FieldInput
                                title='Date protection (DPRO) :'
                                name='DPRO'
                                disabled
                            />
                            <FieldInput
                                title='Précisions sur la protection MH (PPRO) :'
                                name='PPRO'
                                disabled
                            />
                        </Col>
                        <Col sm={6}>
                            <FieldInput
                                title='Eléments protégés MH (MHPP) : '
                                name='MHPP'
                                disabled
                            />
                            <FieldInput
                                title='Site, secteur ou zone de protection (SITE) :'
                                name='SITE'
                                disabled
                            />
                            <FieldInput
                                title="Intérêt de l'oeuvre (INTE) :"
                                name='INTE'
                                disabled
                                thesaurus='http://data.culture.fr/thesaurus/resource/ark:/67717/T33'
                            />
                            <FieldInput
                                title='Eléments remarquables (REMA) :'
                                name='REMA'
                                disabled
                            />
                            <FieldInput
                                title='Observations (OBS) :'
                                name='OBS'
                                disabled
                            />
                        </Col>
                    </Section>
                    <Section
                        title='STATUT JURIDIQUE'
                        icon={require('../../assets/time.png')}
                        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugia'
                        color='#00BEB2'
                    >
                        <Col sm={6}>
                            <FieldTags
                                title='Statut de la propriété (STAT) :'
                                name='STAT'
                                disabled
                            />
                            <FieldInput
                                title='Précisions sur le statut de la propriété (PSTA): '
                                name='PSTA'
                                disabled
                            />
                            <FieldInput
                                title='Affectataire (AFFE) :'
                                name='AFFE'
                                disabled
                            />
                            <FieldInput
                                title='Date du label (DLAB) :'
                                name='DLAB'
                                disabled
                            />
                        </Col>
                        <Col sm={6}>
                            <FieldInput
                                title="Précisions sur l'affectataire (PAFF) :"
                                name='PAFF'
                                disabled
                            />
                        </Col>
                    </Section>
                    <Section
                        title='AUTRES'
                        icon={require('../../assets/law.png')}
                        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugia'
                        color='#FE997B'
                    >

                        <Col sm={6}>
                            <FieldInput
                                title='Thème (THEM) : '
                                name='THEM'
                                disabled
                            />
                            <FieldInput
                                title='Visite guidé (WEB) : '
                                name='WEB'
                                disabled
                            />
                        </Col>
                        <Col sm={6}>
                            <FieldInput
                                title='Intérêt oeuvre (PINT) :'
                                name='PINT'
                                disabled
                            />
                            <FieldInput
                                title='Mosaïques (MOSA) :'
                                name='MOSA'
                                disabled
                            />
                        </Col>
                    </Section>
                </Form >
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

