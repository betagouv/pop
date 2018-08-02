import React from 'react';
import { Row, Col, Input, Container, Button, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import { reduxForm } from 'redux-form'
import { toastr } from 'react-redux-toastr'

import FieldInput from './components/fieldInput.js';
import FieldTags from './components/fieldTags.js';
import FieldLink from './components/fieldLink.js';
import FieldImages from './components/fieldImages';
import Section from './components/section.js';
import Map from './components/map.js';

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
        API.getNotice('merimee', ref).then((notice) => {
            console.log('NOTICE', notice)
            this.props.initialize({ ...notice, IMG: notice.IMG ? [notice.IMG] : [] });
            this.setState({ loading: false, notice })
        })
    }

    onSubmit(values) {
        this.setState({ saving: true })
        API.updateNotice(this.state.notice.REF, 'merimee', values).then((e) => {
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
                            <FieldImages
                                name='IMG'
                                disabled
                                external={true}
                            />
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
                                disabled
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
                                disabled
                            />
                            <FieldInput
                                title="Date d'enquête (DENQ) :"
                                name='DENQ'
                                disabled
                            />
                            <FieldTags
                                title="CopyRight (COPY) :"
                                name='COPY'
                                disabled
                            />
                            <FieldInput
                                title="TODO-Identifiant Patrimoine (RFPA) :"
                                name='RFPA'
                                disabled
                            />
                            <FieldInput
                                title="TODO-Date de mise à jour (DMAJ) :"
                                name='DMAJ'
                                disabled
                            />
                            <FieldInput
                                title='Domaines (DOMN) : '
                                name='DOMN'
                                disabled
                            />
                            <FieldTags
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
                            <FieldInput
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
                            <FieldInput
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
                                title="TODO-Numéro de microfiche (MICR) :"
                                name='MICR'
                                disabled
                            />
                        </Col>
                    </Section>
                    <Section
                        title='DESIGNATION'
                        icon={require('../../assets/law.png')}
                        color='#FE997B'
                    >
                        <Col sm={6}>
                            <FieldTags
                                title='Denomination (DENO) : '
                                name='DENO'
                                thesaurus='http://data.culture.fr/thesaurus/resource/ark:/67717/T96'
                                disabled
                            />
                            <FieldInput
                                title='Destinataire (GENR) : '
                                name='GENR'
                                disabled
                            />
                            <FieldInput
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
                                title='TODO-Références des parties constituantes étudiées (REFP) : '
                                name='REFP'
                                disabled
                            />
                            <FieldTags
                                title='Décompte des oeuvres recensées (COLL) :'
                                name='COLL'
                                disabled
                            />
                        </Col>
                    </Section>

                    <Section
                        title='LOCALISATION'
                        icon={require('../../assets/map.png')}
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
                                title="TODO-Référence de l'édifice de conservation (REFE) : "
                                name='REFE'
                                disabled
                            />
                            <FieldTags
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
                            <FieldTags
                                title="Milieu d'implantation (IMPL) : "
                                name='IMPL'
                                thesaurus='http://data.culture.fr/thesaurus/resource/ark:/67717/T12'
                                disabled
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
                        title='HISTORIQUE'
                        icon={require('../../assets/date.png')}
                        color='#668796'
                    >
                        <Col sm={6}>
                            <FieldTags
                                title='Datation des campagnes principales de construction (SCLE) :'
                                name='SCLE'
                                thesaurus='http://data.culture.fr/thesaurus/resource/ark:/67717/T17'
                                disabled
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
                            <FieldTags
                                title="Justification de l'attribution (JATT) :"
                                name='JATT'
                                disabled
                            />
                        </Col>
                        <Col sm={6}>

                            <FieldTags
                                title='Personnalitées (PERS) :'
                                name='PERS'
                                thesaurus='http://data.culture.fr/thesaurus/resource/ark:/67717/T6'
                                disabled
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
                            <FieldTags
                                title='Matériau du gros-oeuvre et mise en oeuvre (MURS) : '
                                name='MURS'
                                thesaurus='http://data.culture.fr/thesaurus/resource/ark:/67717/T57'
                                disabled
                            />
                            <FieldTags
                                title='Matériau de la couverture (TOIT) : '
                                name='TOIT'
                                disabled
                            />
                            <FieldInput
                                title='Parti de plan (PLAN) :'
                                name='PLAN'
                                disabled
                            />
                            <FieldTags
                                title='Vaisseau et étage (ETAG) :'
                                name='ETAG'
                                thesaurus='http://data.culture.fr/thesaurus/resource/ark:/67717/T23'
                                disabled
                            />
                            <FieldTags
                                title='Type et nature du couvrement (VOUT) :'
                                name='VOUT'
                                disabled
                            />
                            <FieldTags
                                title='Parti d’élévation extérieure (ELEV) :'
                                name='ELEV'
                                thesaurus='http://data.culture.fr/thesaurus/resource/ark:/67717/T25'
                                disabled
                            />
                            <FieldTags
                                title='Type de la couverture (COUV) :'
                                name='COUV'
                                thesaurus='http://data.culture.fr/thesaurus/resource/ark:/67717/T26'
                                disabled
                            />
                            <FieldTags
                                title='Emplacement, forme et structure de l’escalier (ESCA) : '
                                name='ESCA'
                                disabled
                            />
                            <FieldTags
                                title="Source de l'énergie (ENER) :"
                                name='ENER'
                                thesaurus='http://data.culture.fr/thesaurus/resource/ark:/67717/T27'
                                disabled
                            />
                            <FieldInput
                                title='Couvert et découvert de jardin (VERT) :'
                                name='VERT'
                                disabled
                            />
                        </Col>
                        <Col sm={6}>
                            <FieldTags
                                title='Technique du décor des immeubles par nature (TECH) : '
                                name='TECH'
                                disabled
                            />
                            <FieldInput
                                title='Représentation (REPR) : '
                                name='REPR'
                                disabled
                            />
                            <FieldInput
                                title='TODO-Précision sur la représentation (PREP) : '
                                name='PREP'
                                disabled
                            />
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
                            <FieldInput
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
                        color='#FE997B'
                    >
                        <Col sm={6}>
                            <FieldTags
                                title='Nature de la protection MH (PROT) :'
                                name='PROT'
                                thesaurus='http://data.culture.fr/thesaurus/resource/ark:/67717/T10'
                                disabled
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
                            <FieldTags
                                title="Nature de l'acte de protection MH (APRO) :"
                                name='APRO'
                                thesaurus='http://data.culture.fr/thesaurus/resource/ark:/67717/T98'
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
                            <FieldTags
                                title="Intérêt de l'oeuvre (INTE) :"
                                name='INTE'
                                thesaurus='http://data.culture.fr/thesaurus/resource/ark:/67717/T33'
                                disabled
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
                        color='#00BEB2'
                    >
                        <Col sm={6}>
                            <FieldInput
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
                                title="TODO-Précisions sur l'affectataire (PAFF) :"
                                name='PAFF'
                                disabled
                            />
                            <FieldTags
                                title='Ouverture au public (VISI) :'
                                name='VISI'
                                disabled
                            />
                            <FieldInput
                                title='Proprietaire (STAT) : '
                                name='STAT'
                                disabled
                            />
                        </Col>
                    </Section>
                    <Section
                        title='AUTRES'
                        icon={require('../../assets/law.png')}
                        color='#FE997B'
                    >

                        <Col sm={6}>
                            <FieldInput
                                title='Thème (THEM) : '
                                name='THEM'
                                disabled
                            />
                            <FieldLink
                                title='REFO (REFO) : '
                                name='REFO'
                                disabled
                            />
                            <FieldInput
                                title='Visite guidé (WEB) : '
                                name='WEB'
                                disabled
                            />
                            <FieldInput
                                title='intérêt oeuvre (PINT) :'
                                name='PINT'
                                disabled
                            />
                            <FieldInput
                                title='no Bordereaus (NBOR) : '
                                name='NBOR'
                                disabled
                            />
                        </Col>
                        <Col sm={6}>
                            <FieldInput
                                title='Mosaïques (MOSA) :'
                                name='MOSA'
                                disabled
                            />
                        </Col>
                    </Section>
                    <div className='buttons'>
                        <Link style={{ textDecoration: 'none', color: 'white' }} to="/"><Button color="danger">Annuler</Button></Link>
                        <Button disabled color="primary" type="submit" > Sauvegarder </Button>
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

