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
        API.getNotice('memoire', ref).then((notice) => {
            console.log('NOTICE', notice)
            this.props.initialize({ ...notice, IMG: notice.IMG ? [notice.IMG] : [] });
            this.setState({ loading: false, notice })
        })
    }

    onSubmit(values) {
        this.setState({ saving: true })
        API.updateNotice(this.state.notice.REF, 'memoire', values).then((e) => {
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
                        <FieldImages
                            name='IMG'
                            disabled
                            external={true}
                        />
                    </Row>
                    <Section
                        title='REFERENCES ET GESTION DOCUMENTAIRES'
                        icon={require('../../assets/info.png')}
                        color='#FF7676'
                    >
                        <Col sm={6}>
                            <FieldInput
                                title='Accessoire pose (ACC) :'
                                name='ACC'
                                disabled
                            />
                            <FieldInput
                                title='Acquisition (ACQU) :'
                                name='ACQU'
                                disabled
                            />
                            <FieldInput
                                title='Adresse personne (ADPHOT) :'
                                name='ADPHOT'
                                disabled
                            />
                            <FieldInput
                                title='Adresse (ADRESSE) :'
                                name='ADRESSE'
                                disabled
                            />
                            <FieldInput
                                title='Adresse saisie (ADRS) :'
                                name='ADRS'
                                disabled
                            />
                            <FieldInput
                                title="Aire d'étude (AIRE) :"
                                name='AIRE'
                                disabled
                            />
                            <FieldInput
                                title="No original(anc) (ANUMOR) :"
                                name='ANUMOR'
                                disabled
                            />
                            <FieldInput
                                title="Ancien numéro (ancienne cote du phototype) (ANUMP) :"
                                name='ANUMP'
                                disabled
                            />
                            <FieldInput
                                title="Ancien numéro du  tirage (ANUMTI) :"
                                name='ANUMTI'
                                disabled
                            />
                            <FieldInput
                                title="Ancien numéro du  tirage (ANUMTI) :"
                                name='ANUMTI'
                                disabled
                            />
                            <FieldInput
                                title="Auteur gravure (AUTG) :"
                                name='AUTG'
                                disabled
                            />
                            <FieldInput
                                title="Auteur oeuvre représentée (AUTOEU) :"
                                name='AUTOEU'
                                disabled
                            />
                            <FieldInput
                                title="Auteur original (AUTOR) :"
                                name='AUTOR'
                                disabled
                            />
                            <FieldInput
                                title="Auteur photo (AUTP) :"
                                name='AUTP'
                                disabled
                            />
                            <FieldInput
                                title="Auteur tirage (AUTTI) :"
                                name='AUTTI'
                                disabled
                            />
                            <FieldInput
                                title="Chronologie (CHRONO) :"
                                name='CHRONO'
                                disabled
                            />
                            <FieldInput
                                title="Commune (COM) :"
                                name='COM'
                                disabled
                            />
                            <FieldInput
                                title="Contact (CONTACT) :"
                                name='CONTACT'
                                disabled
                            />
                            <FieldInput
                                title="Crédit photo (COPY) :"
                                name='COPY'
                                disabled
                            />
                            <FieldInput
                                title="Costume de la personne représentée (COSTUME) :"
                                name='COSTUME'
                                disabled
                            />
                            <FieldInput
                                title="Cote cons orig. (COTECOR) :"
                                name='COTECOR'
                                disabled
                            />
                            <FieldInput
                                title="Cote conservation du phototype (COTECP) :"
                                name='COTECP'
                                disabled
                            />
                            <FieldInput
                                title="Cote conservation du tirage (COTECTI) :"
                                name='COTECTI'
                                disabled
                            />
                            <FieldInput
                                title="Couleur (COULEUR) :"
                                name='COULEUR'
                                disabled
                            />
                            <FieldInput
                                title="Date dessin (DATD) :"
                                name='DATD'
                                disabled
                            />
                            <FieldInput
                                title="Date gravure (DATG) :"
                                name='DATG'
                                disabled
                            />
                            <FieldInput
                                title="Date immatricul (DATIMM) :"
                                name='DATIMM'
                                disabled
                            />
                            <FieldInput
                                title="Date oeuv année (DATOEU) :"
                                name='DATOEU'
                                disabled
                            />
                            <FieldInput
                                title="Date oeuv année (DATOEU) :"
                                name='DATOEU'
                                disabled
                            />
                            <FieldInput
                                title="Date original (DATOR) :"
                                name='DATOR'
                                disabled
                            />
                            <FieldInput
                                title="Date prise vue (DATPV) :"
                                name='DATPV'
                                disabled
                            />
                            <FieldInput
                                title="Date tirage (DATTI) :"
                                name='DATTI'
                                disabled
                            />
                            <FieldInput
                                title="Droits diffusion (DIFF) :"
                                name='DIFF'
                                disabled
                            />
                            <FieldInput
                                title="Date mise à jour (DMAJ) :"
                                name='DMAJ'
                                disabled
                            />
                            <FieldInput
                                title="Date Mistral (DMIS) :"
                                name='DMIS'
                                disabled
                            />
                            <FieldInput
                                title="Domaine (DOM) :"
                                name='DOM'
                                disabled
                            />
                            <FieldInput
                                title="Département (DPT) :"
                                name='DPT'
                                disabled
                            />
                            <FieldInput
                                title="Echelle (ECH) :"
                                name='ECH'
                                disabled
                            />
                            <FieldInput
                                title="Interprétation (EDIARCH) :"
                                name='EDIARCH'
                                disabled
                            />
                            <FieldInput
                                title="Nom édifice (EDIF) :"
                                name='EDIF'
                                disabled
                            />
                            <FieldInput
                                title="Emetteur (code) (EMET) :"
                                name='EMET'
                                disabled
                            />
                            <FieldInput
                                title="Format phototype (FORMAT) :"
                                name='FORMAT'
                                disabled
                            />
                            <FieldInput
                                title="Format original (FORMATOR) :"
                                name='FORMATOR'
                                disabled
                            />
                            <FieldInput
                                title="Format tirage (FORMATTI) :"
                                name='FORMATTI'
                                disabled
                            />
                            <FieldInput
                                title="Emetteur (nom) (IDPROD) :"
                                name='IDPROD'
                                disabled
                            />
                            <FieldInput
                                title="Images qy (IMG) :"
                                name='IMG'
                                disabled
                            />
                            <FieldInput
                                title="Code INSEE (INSEE) :"
                                name='INSEE'
                                disabled
                            />
                            <FieldInput
                                title="Justif date pv (JDATPV) :"
                                name='JDATPV'
                                disabled
                            />
                            <FieldInput
                                title="Notice biblio (LAUTP) :"
                                name='LAUTP'
                                disabled
                            />
                            <FieldInput
                                title="Liens bases (LBASE) :"
                                name='LBASE'
                                disabled
                            />
                            <FieldInput
                                title="Liens base (LBASE2) :"
                                name='LBASE2'
                                disabled
                            />
                            <FieldInput
                                title="Légende (LEG) :"
                                name='LEG'
                                disabled
                            />
                            <FieldInput
                                title="Légende thes. (LEG2) :"
                                name='LEG2'
                                disabled
                            />
                            <FieldInput
                                title="Mots candidats (LIB) :"
                                name='LIB'
                                disabled
                            />
                            <FieldInput
                                title="Liens divers (LIENS) :"
                                name='LIENS'
                                disabled
                            />

                            <FieldInput
                                title="Lieu-dit (LIEU) :"
                                name='LIEU'
                                disabled
                            />
                            <FieldInput
                                title="Lieu cons orig. (LIEUCOR) :"
                                name='LIEUCOR'
                                disabled
                            />
                            <FieldInput
                                title="Lieu cons pho. (LIEUCP) :"
                                name='LIEUCP'
                                disabled
                            />
                            <FieldInput
                                title="Lieu cons tir. (LIEUCTI) :"
                                name='LIEUCTI'
                                disabled
                            />
                            <FieldInput
                                title="Lieu de dépôt (LIEUORIG) :"
                                name='LIEUORIG'
                                disabled
                            />
                            <FieldInput
                                title="Localisation (LOCA) :"
                                name='LOCA'
                                disabled
                            />
                            <FieldInput
                                title="Ordre images (MARQ) :"
                                name='MARQ'
                                disabled
                            />
                            <FieldInput
                                title="Nom géographique (MCGEO) :"
                                name='MCGEO'
                                disabled
                            />
                            <FieldInput
                                title="Mots clés (MCL) :"
                                name='MCL'
                                disabled
                            />
                            <FieldInput
                                title="Nom personne (MCPER) :"
                                name='MCPER'
                                disabled
                            />
                            <FieldInput
                                title="Mentions photo (MENTIONS) :"
                                name='MENTIONS'
                                disabled
                            />
                            <FieldInput
                                title="Mentions orig (MENTOR) :"
                                name='MENTOR'
                                disabled
                            />
                            <FieldInput
                                title="Mentions tirage (MENTTI) :"
                                name='MENTTI'
                                disabled
                            />
                            <FieldInput
                                title="Mosaïques (MOSA) :"
                                name='MOSA'
                                disabled
                            />
                            <FieldInput
                                title="N° support (NUM) :"
                                name='NUM'
                                disabled
                            />
                            <FieldInput
                                title="Cote photographe (NUMAUTP) :"
                                name='NUMAUTP'
                                disabled
                            />
                            <FieldInput
                                title="No carte fenêtre (NUMCAF) :"
                                name='NUMCAF'
                                disabled
                            />
                            <FieldInput
                                title="No CD (NUMCD) :"
                                name='NUMCD'
                                disabled
                            />
                            <FieldInput
                                title="No de fond (NUMF) :"
                                name='NUMF'
                                disabled
                            />

                        </Col>
                        <Col sm={6}>
                            <FieldInput
                                title="Ident. support (NUMI) :"
                                name='NUMI'
                                disabled
                            />
                            <FieldInput
                                title="N° d'opération (NUMOP) :"
                                name='NUMOP'
                                disabled
                            />

                            <FieldInput
                                title="No original (NUMOR) :"
                                name='NUMOR'
                                disabled
                            />
                            <FieldInput
                                title="No phototype (NUMP) :"
                                name='NUMP'
                                disabled
                            />
                            <FieldInput
                                title="N° du site (NUMSITE) :"
                                name='NUMSITE'
                                disabled
                            />
                            <FieldInput
                                title="No tirage (NUMTI) :"
                                name='NUMTI'
                                disabled
                            />
                            <FieldInput
                                title="vidéodisque (NVD	REF ) :"
                                name='NVD	REF '
                                disabled
                            />
                            <FieldInput
                                title="Nom objet (OBJT) :"
                                name='OBJT'
                                disabled
                            />
                            <FieldInput
                                title="Obs phototype (OBS) :"
                                name='OBS'
                                disabled
                            />
                            <FieldInput
                                title="Obs original (OBSOR) :"
                                name='OBSOR'
                                disabled
                            />
                            <FieldInput
                                title="Obs tirage (OBSTI) :"
                                name='OBSTI'
                                disabled
                            />
                            <FieldInput
                                title="Pays (PAYS) :"
                                name='PAYS'
                                disabled
                            />
                            <FieldInput
                                title="Préc original (PRECOR) :"
                                name='PRECOR'
                                disabled
                            />
                            <FieldInput
                                title="Publication (PUBLI) :"
                                name='PUBLI'
                                disabled
                            />
                            <FieldInput
                                title="Ref Image (REFIM) :"
                                name='REFIM'
                                disabled
                            />
                            <FieldInput
                                title="Nom Image (REFIMG) :"
                                name='REFIMG'
                                disabled
                            />
                            <FieldInput
                                title="Région (REG) :"
                                name='REG'
                                disabled
                            />
                            <FieldInput
                                title="Renvoi (RENV) :"
                                name='RENV'
                                disabled
                            />
                            <FieldInput
                                title="Rôle joué (ROLE) :"
                                name='ROLE'
                                disabled
                            />
                            <FieldInput
                                title="Date oeuv siècle (SCLE) :"
                                name='SCLE'
                                disabled
                            />
                            <FieldInput
                                title="Sens (SENS) :"
                                name='SENS'
                                disabled
                            />
                            <FieldInput
                                title="Titre série (SERIE) :"
                                name='SERIE'
                                disabled
                            />
                            <FieldInput
                                title="Site (SITE) :"
                                name='SITE'
                                disabled
                            />
                            <FieldInput
                                title="Structure (STRUCT) :"
                                name='STRUCT'
                                disabled
                            />
                            <FieldInput
                                title="Sujet (SUJET) :"
                                name='SUJET'
                                disabled
                            />
                            <FieldInput
                                title="Support (SUP) :"
                                name='SUP'
                                disabled
                            />
                            <FieldInput
                                title="Technique photo (TECH) :"
                                name='TECH'
                                disabled
                            />
                            <FieldInput
                                title="Technique orig (TECHOR) :"
                                name='TECHOR'
                                disabled
                            />
                            <FieldInput
                                title="Technique tirage (TECHTI) :"
                                name='TECHTI'
                                disabled
                            />
                            <FieldInput
                                title="Nom de théâtre (THEATRE) :"
                                name='THEATRE'
                                disabled
                            />
                            <FieldInput
                                title="Titre du dossier (TICO) :"
                                name='TICO'
                                disabled
                            />
                            <FieldInput
                                title="Pub. photograph. (TIREDE) :"
                                name='TIREDE'
                                disabled
                            />

                            <FieldInput
                                title="Titre (TITRE) :"
                                name='TITRE'
                                disabled
                            />
                            <FieldInput
                                title="Toile de fond (TOILE) :"
                                name='TOILE'
                                disabled
                            />
                            <FieldInput
                                title="Index global (TOUT) :"
                                name='TOUT'
                                disabled
                            />
                            <FieldInput
                                title="Type (TYP) :"
                                name='TYP'
                                disabled
                            />
                            <FieldInput
                                title="Type document (TYPDOC) :"
                                name='TYPDOC'
                                disabled
                            />
                            <FieldInput
                                title="Type image num (TYPEIMG) :"
                                name='TYPEIMG'
                                disabled
                            />
                            <FieldInput
                                title="Type support num (TYPSUPP) :"
                                name='TYPSUPP'
                                disabled
                            />
                            <FieldInput
                                title="Vidéo (VIDEO) :"
                                name='VIDEO'
                                disabled
                            />
                            <FieldInput
                                title="No vue CD (VUECD) :"
                                name='VUECD'
                                disabled
                            />
                            <FieldInput
                                title="Ville (WCOM) :"
                                name='WCOM'
                                disabled
                            />
                            <FieldInput
                                title="Accès Mémoire (WEB) :"
                                name='WEB'
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

