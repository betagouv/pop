import React from 'react';
import { Row, Col, Container, Button, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import { reduxForm } from 'redux-form'
import { toastr } from 'react-redux-toastr'
import { connect } from 'react-redux';

import FieldInput from './components/fieldInput.js'
import FieldImages from './components/fieldImages';
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
        loading: true,
        editable: true,
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
            if (!notice) {
                this.setState({ loading: false, error: `Impossible de charger la notice ${ref}` });
                console.error(`Impossible de charger la notice ${ref}`)
                return;
            }
            console.log('NOTICE', notice)
            this.props.initialize({ ...notice, IMG: notice.IMG ? [notice.IMG] : [] });
            const editable = notice.PRODUCTEUR === "Monument Historique" && this.props.canUpdate;
            this.setState({ loading: false, notice, editable })
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

    delete() {
        const ref = this.props.match.params.ref;
        API.deleteNotice('palissy', ref).then(() => {
            toastr.success('Notice supprimée');
        })
    }

    render() {

        if (this.state.loading) {
            return <Loader />
        }

        if (this.state.error) {
            return <div className='error'>{this.state.error}</div>
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
                            <FieldImages
                                name='MEMOIRE'
                                disabled={!this.state.editable}
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
                        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugia'
                        color='#FF7676'
                    >
                        <Col sm={6}>
                            <FieldInput
                                title='Notice (REF) :'
                                name='REF'
                                disabled={!this.state.editable}
                            />
                            <FieldLink
                                title='N° de renvoi au domaine MH ou au domaine INVENTAIRE (RENV ) :'
                                name='RENV'
                                url="/notice/palissy/"
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title='Référence dans la base Patriarche (ARCHEO) : '
                                name='ARCHEO'
                                disabled={!this.state.editable}
                            />
                            <FieldTags
                                title="Date d'enquête (DENQ) :"
                                name='DENQ'
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title="CopyRight (COPY) :"
                                name='COPY'
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title="Identifiant Patrimoine (RFPA) :"
                                name='RFPA'
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title="Date de mise à jour (DMAJ) :"
                                name='DMAJ'
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title='Domaines (DOMN) : '
                                name='DOMN'
                                disabled={!this.state.editable}
                            />
                            <FieldLink
                                title="Référence de l'édifice de conservation (REFA) : "
                                name='REFA'
                                url="/notice/merimee/"
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title='Auteurs phototype (AUTP) : '
                                name='AUTP'
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title='Dossier adresse (DOSADRS) :'
                                name='DOSADRS'
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title='Contact (CONTACT) :'
                                name='CONTACT'
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title='Préc. appart. (PAPP) : '
                                name='PAPP'
                                disabled={!this.state.editable}
                            />
                        </Col>
                        <Col sm={6}>
                            <FieldTags
                                title='Liens Divers (LIENS) : '
                                name='LIENS'
                                disabled={!this.state.editable}
                            />
                            <FieldTags
                                title='Date de rédaction de la notice (DBOR) :'
                                name='DBOR'
                                disabled={!this.state.editable}
                            />
                            <FieldTags
                                title='Noms des rédacteurs de la notice et du dossier (NOMS) : '
                                name='NOMS'
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title="Cadre de l'étude (ETUD) :"
                                name='ETUD'
                                disabled={!this.state.editable}
                            />
                            <FieldTags
                                title='Dossier (DOSS) : '
                                name='DOSS'
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title="Date de chargement dans la base MERIMEE (DMIS) :"
                                name='DMIS'
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title="Numéro de microfiche (MICR) :"
                                name='MICR'
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title="Catégorie tech. (CATE) :"
                                name='CATE'
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title="Matériaux (MATR) :"
                                name='MATR'
                                disabled={!this.state.editable}
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
                                disabled={!this.state.editable}
                                thesaurus='http://data.culture.fr/thesaurus/resource/ark:/67717/T96'
                            />
                            <FieldInput
                                title='Destinataire (GENR) : '
                                name='GENR'
                                disabled={!this.state.editable}
                            />
                            <FieldTags
                                title='Précision sur la dénomination (PDEN) :'
                                name='PDEN'
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title='Vocable (VOCA) :'
                                name='VOCA'
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title='Appellation et titre (APPL) :'
                                name='APPL'
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title='Destinations successives et actuelle (ACTU) :'
                                name='ACTU'
                                disabled={!this.state.editable}
                            />
                        </Col>
                        <Col sm={6}>
                            <FieldInput
                                title='Titre courant (TICO) : '
                                name='TICO'
                                disabled={!this.state.editable}
                            />
                            <FieldTags
                                title='Parties constituantes (PART) : '
                                name='PART'
                                disabled={!this.state.editable}
                            />
                            <FieldLink
                                title='Références des parties constituantes étudiées (REFP) : '
                                name='REFP'
                                url="/notice/palissy/"
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title='Décompte des oeuvres recensées (COLL) :'
                                name='COLL'
                                disabled={!this.state.editable}
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
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title='Département (DPT) : '
                                name='DPT'
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title='Commune (COM) : '
                                name='COM'
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title='Numéro INSEE de la commune (INSEE) :'
                                name='INSEE'
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title='Précision sur la localisation (PLOC) :'
                                name='PLOC'
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title="Aire d'étude (AIRE) : "
                                name='AIRE'
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title='Canton (CANT) : '
                                name='CANT'
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title='Lieu-dit (LIEU) : '
                                name='LIEU'
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title='Adresse (ADRS) : '
                                name='ADRS'
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title='Edifice de conservation (EDIF) : '
                                name='EDIF'
                                disabled={!this.state.editable}
                            />
                        </Col>
                        <Col sm={6}>

                            <FieldLink
                                title="Référence de l'ensemble contenant (REFE) : "
                                name='REFE'
                                url="/notice/palissy/"
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title='Référence cadastrale (CADA) :'
                                name='CADA'
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title='TODO-Zone Lambert ou autres (ZONE) :'
                                name='ZONE'
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title="TODO-Coordonnées Lambert (ou autres) d'un points (COOR ) :"
                                name='COOR'
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title="TODO-Coordonnées Lambert (ou autres) multiples (COORM ) :"
                                name='COORM'
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title="Milieu d'implantation (IMPL) : "
                                name='IMPL'
                                disabled={!this.state.editable}
                                thesaurus='http://data.culture.fr/thesaurus/resource/ark:/67717/T12'
                            />
                            <FieldInput
                                title="Cours d'eau (HYDR) : "
                                name='HYDR'
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title='Localisation (LOCA) : '
                                name='LOCA'
                                disabled={!this.state.editable}
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
                                disabled={!this.state.editable}
                                thesaurus='http://data.culture.fr/thesaurus/resource/ark:/67717/T17'
                            />
                            <FieldTags
                                title="Datation en années (DATE) :"
                                name='DATE'
                                disabled={!this.state.editable}
                            />
                            <FieldTags
                                title='Justification de la datation (JDAT) :'
                                name='JDAT'
                                disabled={!this.state.editable}
                            />
                            <FieldTags
                                title="Auteurs de l'oeuvre(AUTR) : "
                                name='AUTR'
                                disabled={!this.state.editable}
                            />
                        </Col>
                        <Col sm={6}>
                            <FieldTags
                                title='Personnalitées (PERS) :'
                                name='PERS'
                                disabled={!this.state.editable}
                                thesaurus='http://data.culture.fr/thesaurus/resource/ark:/67717/T6'
                            />

                            <FieldInput
                                title='Remploi (REMP) : '
                                name='REMP'
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title='Partie déplacée (DEPL) : '
                                name='DEPL'
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title='Commentaire historique (HIST) :'
                                name='HIST'
                                disabled={!this.state.editable}
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
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title='Emplacement, forme et structure de l’escalier (ESCA) : '
                                name='ESCA'
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title='Couvert et découvert de jardin (VERT) :'
                                name='VERT'
                                disabled={!this.state.editable}
                            />
                            <FieldTags
                                title='Représentation (REPR) : '
                                name='REPR'
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title='Précision sur la représentation (PREP) : '
                                name='PREP'
                                disabled={!this.state.editable}
                            />
                        </Col>
                        <Col sm={6}>
                            <FieldInput
                                title='Dimensions (DIMS) : '
                                name='DIMS'
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title='Typologie (TYPO) : '
                                name='TYPO'
                                disabled={!this.state.editable}
                            />
                            <FieldTags
                                title='Etat de conservation (ETAT) : '
                                name='ETAT'
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title='Commentaire description (DESC) :'
                                name='DESC'
                                disabled={!this.state.editable}
                            />
                            <FieldTags
                                title='Parties non étud (PARN) : '
                                name='PARN'
                                disabled={!this.state.editable}
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
                                disabled={!this.state.editable}
                                thesaurus='http://data.culture.fr/thesaurus/resource/ark:/67717/T10'
                            />
                            <FieldInput
                                title='Date protection (DPRO) :'
                                name='DPRO'
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title='Précisions sur la protection MH (PPRO) :'
                                name='PPRO'
                                disabled={!this.state.editable}
                            />
                        </Col>
                        <Col sm={6}>
                            <FieldInput
                                title='Eléments protégés MH (MHPP) : '
                                name='MHPP'
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title='Site, secteur ou zone de protection (SITE) :'
                                name='SITE'
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title="Intérêt de l'oeuvre (INTE) :"
                                name='INTE'
                                disabled={!this.state.editable}
                                thesaurus='http://data.culture.fr/thesaurus/resource/ark:/67717/T33'
                            />
                            <FieldInput
                                title='Eléments remarquables (REMA) :'
                                name='REMA'
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title='Observations (OBS) :'
                                name='OBS'
                                disabled={!this.state.editable}
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
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title='Précisions sur le statut de la propriété (PSTA): '
                                name='PSTA'
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title='Affectataire (AFFE) :'
                                name='AFFE'
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title='Date du label (DLAB) :'
                                name='DLAB'
                                disabled={!this.state.editable}
                            />
                        </Col>
                        <Col sm={6}>
                            <FieldInput
                                title="Précisions sur l'affectataire (PAFF) :"
                                name='PAFF'
                                disabled={!this.state.editable}
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
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title='Visite guidé (WEB) : '
                                name='WEB'
                                disabled={!this.state.editable}
                            />
                        </Col>
                        <Col sm={6}>
                            <FieldInput
                                title='Intérêt oeuvre (PINT) :'
                                name='PINT'
                                disabled={!this.state.editable}
                            />
                            <FieldInput
                                title='Mosaïques (MOSA) :'
                                name='MOSA'
                                disabled={!this.state.editable}
                            />
                        </Col>
                    </Section>
                    {
                        this.props.canUpdate ? (
                            <div className='buttons'>
                                <Link style={{ textDecoration: 'none', color: 'white' }} to="/"><Button color="danger">Annuler</Button></Link>
                                <Button color="danger" onClick={() => this.delete()} >Supprimer</Button>
                                <Button disabled={!this.state.editable} color="primary" type="submit" >Sauvegarder</Button>
                            </div>) : <div />
                    }
                </Form >
            </Container >
        );
    }
}



const mapStateToProps = ({ Auth }) => {
    const { role, group } = Auth.user;
    return {
        canUpdate: Auth.user ? (role === "producteur" || role === "administrateur") && (group === "mh" || group === "admin") : false
    }
}

export default connect(mapStateToProps, {})(reduxForm({ form: 'notice' })(Notice));
