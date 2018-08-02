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
                            />
                            {/* <div>
                                <div>N° de renvoi au domaine MH ou au domaine INVENTAIRE (RENV ) :</div>
                                {this.state.notice.RENV ? <NoticeLink url={this.state.notice.RENV.replace('merimee/', '')} /> : <div />}
                            </div> */}
                            {/* <FieldInput
                            title='TODO-N° de renvoi au domaine MH ou au domaine INVENTAIRE (RENV ) : '
                            name='RENV'
                        /> */}
                            <FieldInput
                                title='Référence dans la base Patriarche (ARCHEO) : '
                                name='ARCHEO'
                            />
                            <FieldTags
                                title="Date d'enquête (DENQ) :"
                                name='DENQ'
                            />
                            <FieldInput
                                title="CopyRight (COPY) :"
                                name='COPY'
                            />
                            <FieldInput
                                title="Identifiant Patrimoine (RFPA) :"
                                name='RFPA'
                            />
                            <FieldInput
                                title="Date de mise à jour (DMAJ) :"
                                name='DMAJ'
                            />
                            <FieldInput
                                title='Domaines (DOMN) : '
                                name='DOMN'
                            />
                            <FieldLink
                                title='REFA (REFA) : '
                                name='REFA'
                                url="/notice/merimee/"
                            />
                            <FieldInput
                                title='Auteurs phototype (AUTP) : '
                                name='AUTP'
                            />
                            <FieldInput
                                title='Dossier adresse (DOSADRS) :'
                                name='DOSADRS'
                            />
                            <FieldInput
                                title='Contact (CONTACT) :'
                                name='CONTACT'
                            />

                        </Col>
                        <Col sm={6}>
                            <FieldTags
                                title='Liens Divers (LIENS) : '
                                name='LIENS'
                            />
                            <FieldTags
                                title='Date de rédaction de la notice (DBOR) :'
                                name='DBOR'
                            />
                            <FieldTags
                                title='Noms des rédacteurs de la notice et du dossier (NOMS) : '
                                name='NOMS'
                            />
                            <FieldInput
                                title="Cadre de l'étude (ETUD) :"
                                name='ETUD'
                            />
                            <FieldTags
                                title='Dossier (DOSS) : '
                                name='DOSS'
                            />
                            <FieldInput
                                title="Date de chargement dans la base MERIMEE (DMIS) :"
                                name='DMIS'
                            />
                            <FieldInput
                                title="Numéro de microfiche (MICR) :"
                                name='MICR'
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
                                thesaurus='http://data.culture.fr/thesaurus/resource/ark:/67717/T96'
                            />
                            <FieldInput
                                title='Destinataire (GENR) : '
                                name='GENR'
                            />
                            <FieldTags
                                title='Précision sur la dénomination (PDEN) :'
                                name='PDEN'
                            />
                            <FieldInput
                                title='Vocable (VOCA) :'
                                name='VOCA'
                            />
                            <FieldInput
                                title='Appellation et titre (APPL) :'
                                name='APPL'
                            />
                            <FieldInput
                                title='Destinations successives et actuelle (ACTU) :'
                                name='ACTU'
                            />
                        </Col>
                        <Col sm={6}>
                            <FieldInput
                                title='Titre courant (TICO) : '
                                name='TICO'
                            />
                            <FieldTags
                                title='Parties constituantes (PART) : '
                                name='PART'
                            />
                            <FieldLink
                                title='Références des parties constituantes étudiées (REFP) : '
                                name='REFP'
                                url="/notice/palissy/"
                            />
                            <FieldInput
                                title='Décompte des oeuvres recensées (COLL) :'
                                name='COLL'
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
                            />
                            <FieldInput
                                title='Département (DPT) : '
                                name='DPT'
                            />
                            <FieldInput
                                title='Commune (COM) : '
                                name='COM'
                            />
                            <FieldInput
                                title='Numéro INSEE de la commune (INSEE) :'
                                name='INSEE'
                            />
                            <FieldInput
                                title='Précision sur la localisation (PLOC) :'
                                name='PLOC'
                            />
                            <FieldInput
                                title="Aire d'étude (AIRE) : "
                                name='AIRE'
                            />
                            <FieldInput
                                title='Canton (CANT) : '
                                name='CANT'
                            />
                            <FieldInput
                                title='Lieu-dit (LIEU) : '
                                name='LIEU'
                            />
                            <FieldInput
                                title='Adresse (ADRS) : '
                                name='ADRS'
                            />
                            <FieldInput
                                title='Edifice de conservation (EDIF) : '
                                name='EDIF'
                            />
                        </Col>
                        <Col sm={6}>

                            <FieldLink
                                title="Référence de l'édifice de conservation (REFE) : "
                                name='REFE'
                                url="/notice/palissy/"
                            />
                            <FieldInput
                                title='Référence cadastrale (CADA) :'
                                name='CADA'
                            />
                            <FieldInput
                                title='TODO-Zone Lambert ou autres (ZONE) :'
                                name='ZONE'
                            />
                            <FieldInput
                                title="TODO-Coordonnées Lambert (ou autres) d'un points (COOR ) :"
                                name='COOR'
                            />
                            <FieldInput
                                title="TODO-Coordonnées Lambert (ou autres) multiples (COORM ) :"
                                name='COORM'
                            />
                            <FieldInput
                                title="Milieu d'implantation (IMPL) : "
                                name='IMPL'
                                thesaurus='http://data.culture.fr/thesaurus/resource/ark:/67717/T12'
                            />
                            <FieldInput
                                title="Cours d'eau (HYDR) : "
                                name='HYDR'
                            />
                            <FieldInput
                                title='Localisation (LOCA) : '
                                name='LOCA'
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
                                thesaurus='http://data.culture.fr/thesaurus/resource/ark:/67717/T17'
                            />
                            <FieldTags
                                title="Datation en années (DATE) :"
                                name='DATE'
                            />
                            <FieldTags
                                title='Justification de la datation (JDAT) :'
                                name='JDAT'
                            />
                            <FieldTags
                                title="Auteurs de l'oeuvre(AUTR) : "
                                name='AUTR'
                            />
                        </Col>
                        <Col sm={6}>

                            <FieldTags
                                title='Personnalitées (PERS) :'
                                name='PERS'
                                thesaurus='http://data.culture.fr/thesaurus/resource/ark:/67717/T6'
                            />

                            <FieldInput
                                title='Remploi (REMP) : '
                                name='REMP'
                            />
                            <FieldInput
                                title='Partie déplacée (DEPL) : '
                                name='DEPL'
                            />
                            <FieldInput
                                title='Commentaire historique (HIST) :'
                                name='HIST'
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
                            />
                            <FieldInput
                                title='Emplacement, forme et structure de l’escalier (ESCA) : '
                                name='ESCA'
                            />
                            <FieldInput
                                title='Couvert et découvert de jardin (VERT) :'
                                name='VERT'
                            />
                            <FieldTags
                                title='Représentation (REPR) : '
                                name='REPR'
                            />
                            <FieldInput
                                title='Précision sur la représentation (PREP) : '
                                name='PREP'
                            />
                        </Col>
                        <Col sm={6}>
                            <FieldInput
                                title='Dimensions (DIMS) : '
                                name='DIMS'
                            />
                            <FieldInput
                                title='Typologie (TYPO) : '
                                name='TYPO'
                            />
                            <FieldTags
                                title='Etat de conservation (ETAT) : '
                                name='ETAT'
                            />
                            <FieldInput
                                title='Commentaire description (DESC) :'
                                name='DESC'
                            />
                            <FieldTags
                                title='Parties non étud (PARN) : '
                                name='PARN'
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
                                thesaurus='http://data.culture.fr/thesaurus/resource/ark:/67717/T10'
                            />
                            <FieldInput
                                title='Date protection (DPRO) :'
                                name='DPRO'
                            />
                            <FieldInput
                                title='Précisions sur la protection MH (PPRO) :'
                                name='PPRO'
                            />
                        </Col>
                        <Col sm={6}>
                            <FieldInput
                                title='Eléments protégés MH (MHPP) : '
                                name='MHPP'
                            />
                            <FieldInput
                                title='Site, secteur ou zone de protection (SITE) :'
                                name='SITE'
                            />
                            <FieldInput
                                title="Intérêt de l'oeuvre (INTE) :"
                                name='INTE'
                                thesaurus='http://data.culture.fr/thesaurus/resource/ark:/67717/T33'
                            />
                            <FieldInput
                                title='Eléments remarquables (REMA) :'
                                name='REMA'
                            />
                            <FieldInput
                                title='Observations (OBS) :'
                                name='OBS'
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
                            />
                            <FieldInput
                                title='Précisions sur le statut de la propriété (PSTA): '
                                name='PSTA'
                            />
                            <FieldInput
                                title='Affectataire (AFFE) :'
                                name='AFFE'
                            />
                            <FieldInput
                                title='Date du label (DLAB) :'
                                name='DLAB'
                            />
                        </Col>
                        <Col sm={6}>
                            <FieldInput
                                title="Précisions sur l'affectataire (PAFF) :"
                                name='PAFF'
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
                            />
                            <FieldInput
                                title='Visite guidé (WEB) : '
                                name='WEB'
                            />
                        </Col>
                        <Col sm={6}>
                            <FieldInput
                                title='Intérêt oeuvre (PINT) :'
                                name='PINT'
                            />
                            <FieldInput
                                title='Mosaïques (MOSA) :'
                                name='MOSA'
                            />
                        </Col>
                    </Section>
                    <div className='buttons'>
                        <Link style={{ textDecoration: 'none', color: 'white' }} to="/"><Button color="danger">Annuler</Button></Link>
                        <Button
                            disabled={false}
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

