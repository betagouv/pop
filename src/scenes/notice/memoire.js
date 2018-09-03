import React from 'react';
import { Row, Col, Container, Button, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import { reduxForm } from 'redux-form'
import { toastr } from 'react-redux-toastr'
import { connect } from 'react-redux';


import { bucket_url } from '../../config';

import FieldInput from './components/fieldInput.js';
import FieldTags from './components/fieldTags';
import FieldImages from './components/fieldImages';
import Section from './components/section.js';

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
            if (!notice) {
                this.setState({ loading: false, error: `Impossible de charger la notice ${ref}` });
                console.error(`Impossible de charger la notice ${ref}`)
                return;
            }

            let image = null;
            if(notice.IMG.indexOf("memoire") === 0){
                image = `${bucket_url}${notice.IMG}`
            }else{
                image = `${notice.IMG}` 
            }

            console.log(notice.IMG,image)
            this.props.initialize({ ...notice, IMG: [image]  });
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

    delete() {
        const ref = this.props.match.params.ref;
        API.deleteNotice('memoire', ref).then(() => {
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
                        <FieldImages
                            name='IMG'
                            disabled
                            external={true}
                        />
                    </Row>

                    <Section
                        title='Localisation'
                        icon={require('../../assets/info.png')}
                        color='#FF7676'
                    >
                        <Col sm={6}>
                            <FieldInput
                                title="Localisation (LOCA) :"
                                name='LOCA'
                                disabled
                            />
                            <FieldInput
                                title="Pays (PAYS) :"
                                name='PAYS'
                                disabled
                            />
                            <FieldInput
                                title="Région (REG) :"
                                name='REG'
                                disabled
                            />
                            <FieldInput
                                title="Département (DPT) :"
                                name='DPT'
                                disabled
                            />
                        </Col>
                        <Col sm={6}>
                            <FieldInput
                                title="Commune (COM) :"
                                name='COM'
                                disabled
                            />
                            <FieldInput
                                title="Code INSEE (INSEE) :"
                                name='INSEE'
                                disabled
                            />

                            <FieldInput
                                title='Adresse (ADRESSE) :'
                                name='ADRESSE'
                                disabled
                            />

                            <FieldInput
                                title="Nom géographique (MCGEO) :"
                                name='MCGEO'
                                disabled
                            />
                        </Col>
                    </Section >

                    <Section
                        title='Identification MH'
                        icon={require('../../assets/info.png')}
                        color='#FF7676'
                    >
                        <Col sm={6}>
                            <FieldInput
                                title="Nom édifice (EDIF) :"
                                name='EDIF'
                                disabled
                            />
                            <FieldInput
                                title="Nom objet (OBJT) :"
                                name='OBJT'
                                disabled
                            />
                        </Col>
                        <Col sm={6}>
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
                                title="Ordre images (MARQ) :"
                                name='MARQ'
                                disabled
                            />
                        </Col>
                    </Section>
                    <Section
                        title='Identification conservation'
                        icon={require('../../assets/info.png')}
                        color='#FF7676'
                    >
                        <Col sm={6}>
                            <FieldInput
                                title="Type document (TYPDOC) :"
                                name='TYPDOC'
                                disabled
                            />
                            <FieldInput
                                title="Date immatricul (DATIMM) :"
                                name='DATIMM'
                                disabled
                            />

                            <FieldInput
                                title='Acquisition (ACQU) :'
                                name='ACQU'
                                disabled
                            />
                            <FieldInput
                                title="Crédit photo (COPY) :"
                                name='COPY'
                                disabled
                            />

                            <FieldInput
                                title="No phototype (NUMP) :"
                                name='NUMP'
                                disabled
                            />
                            <FieldInput
                                title="Ancien numéro (ancienne cote du phototype) (ANUMP) :"
                                name='ANUMP'
                                disabled
                            />
                            <FieldInput
                                title="Cote photographe (NUMAUTP) :"
                                name='NUMAUTP'
                                disabled
                            />

                            <FieldInput
                                title="No tirage (NUMTI) :"
                                name='NUMTI'
                                disabled
                            />
                            <FieldInput
                                title="REPRO (REPRO) :"
                                name='REPRO'
                                disabled
                            />
                            <FieldInput
                                title="Ancien numéro du  tirage (ANUMTI) :"
                                name='ANUMTI'
                                disabled
                            />

                            <FieldInput
                                title="Lieu cons tir. (LIEUCTI) :"
                                name='LIEUCTI'
                                disabled
                            />
                            <FieldInput
                                title="Cote conservation du tirage (COTECTI) :"
                                name='COTECTI'
                                disabled
                            />

                            <FieldInput
                                title="Mentions tirage (MENTTI) :"
                                name='MENTTI'
                                disabled
                            />
                            <FieldInput
                                title="Obs tirage (OBSTI) :"
                                name='OBSTI'
                                disabled
                            />
                            <FieldInput
                                title="Renvoi (RENV) :"
                                name='RENV'
                                disabled
                            />
                            <FieldInput
                                title="NUMG (NUMG) :"
                                name='NUMG'
                                disabled
                            />



                        </Col>
                        <Col sm={6}>
                            <FieldInput
                                title="No original (NUMOR) :"
                                name='NUMOR'
                                disabled
                            />

                            <FieldInput
                                title="No original(anc) (ANUMOR) :"
                                name='ANUMOR'
                                disabled
                            />
                            <FieldInput
                                title="Lieu cons orig. (LIEUCOR) :"
                                name='LIEUCOR'
                                disabled
                            />
                            <FieldInput
                                title="Cote cons orig. (COTECOR) :"
                                name='COTECOR'
                                disabled
                            />
                            <FieldInput
                                title="Préc original (PRECOR) :"
                                name='PRECOR'
                                disabled
                            />
                            <FieldInput
                                title="Lieu de dépôt (LIEUORIG) :"
                                name='LIEUORIG'
                                disabled
                            />
                            <FieldInput
                                title="Mentions orig (MENTOR) :"
                                name='MENTOR'
                                disabled
                            />
                            <FieldInput
                                title="Obs original (OBSOR) :"
                                name='OBSOR'
                                disabled
                            />

                            <FieldInput
                                title="No carte fenêtre (NUMCAF) :"
                                name='NUMCAF'
                                disabled
                            />
                        </Col>
                    </Section>

                    <Section
                        title='Gestion base de donnée'
                        icon={require('../../assets/info.png')}
                        color='#FF7676'
                    >
                        <Col sm={6}>
                            <FieldInput
                                title='Reference (REF) :'
                                name='REF'
                                disabled
                            />
                            <FieldInput
                                title="Emetteur (code) (EMET) :"
                                name='EMET'
                                disabled
                            />
                            <FieldInput
                                title="Emetteur (nom) (IDPROD) :"
                                name='IDPROD'
                                disabled
                            />
                            <FieldInput
                                title="vidéodisque (NVD	REF ) :"
                                name='NVD	REF '
                                disabled
                            />
                        </Col>
                        <Col sm={6}>
                            <FieldInput
                                title="Nom Image (REFIMG) :"
                                name='REFIMG'
                                disabled
                            />
                            <FieldInput
                                title="Ref Image (REFIM) :"
                                name='REFIM'
                                disabled
                            />
                            <FieldInput
                                title="Vidéo (VIDEO) :"
                                name='VIDEO'
                                disabled
                            />
                            <FieldInput
                                title="Type image num (TYPEIMG) :"
                                name='TYPEIMG'
                                disabled
                            />

                        </Col>
                    </ Section >

                    <Section
                        title='Auteur'
                        icon={require('../../assets/info.png')}
                        color='#FF7676'
                    >
                        <Col sm={6}>
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
                        </Col>
                        <Col sm={6}>
                            <FieldInput
                                title="Auteur original (AUTOR) :"
                                name='AUTOR'
                                disabled
                            />
                        </Col>
                    </Section >



                    <Section
                        title='Description image'
                        icon={require('../../assets/info.png')}
                        color='#FF7676'
                    >
                        <Col sm={6}>
                            <FieldInput
                                title="Domaine (DOM) :"
                                name='DOM'
                                disabled
                            />
                            <FieldInput
                                title="Titre série (SERIE) :"
                                name='SERIE'
                                disabled
                            />
                            <FieldInput
                                title="Légende (LEG) :"
                                name='LEG'
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
                                title='Adresse personne (ADPHOT) :'
                                name='ADPHOT'
                                disabled
                            />
                            <FieldInput
                                title="Mots candidats (LIB) :"
                                name='LIB'
                                disabled
                            />


                        </Col>
                        <Col sm={6}>
                            <FieldInput
                                title="Publication (PUBLI) :"
                                name='PUBLI'
                                disabled
                            />
                            <FieldInput
                                title="Pub. photograph. (TIREDE) :"
                                name='TIREDE'
                                disabled
                            />
                            <FieldInput
                                title="Obs phototype (OBS) :"
                                name='OBS'
                                disabled
                            />
                            <FieldInput
                                title="Mentions photo (MENTIONS) :"
                                name='MENTIONS'
                                disabled
                            />
                        </Col>
                    </Section >

                    <Section
                        title='Date'
                        icon={require('../../assets/info.png')}
                        color='#FF7676'
                    >
                        <Col sm={6}>
                            <FieldInput
                                title="Date prise vue (DATPV) :"
                                name='DATPV'
                                disabled
                            />
                            <FieldInput
                                title="Justif date pv (JDATPV) :"
                                name='JDATPV'
                                disabled
                            />

                        </Col>
                        <Col sm={6}>
                            <FieldInput
                                title="Date original (DATOR) :"
                                name='DATOR'
                                disabled
                            />
                        </Col>
                    </Section >

                    <Section
                        title='Oeuvre représentée'
                        icon={require('../../assets/info.png')}
                        color='#FF7676'
                    >
                        <Col sm={6}>
                            <FieldInput
                                title="Auteur oeuvre représentée (AUTOEU) :"
                                name='AUTOEU'
                                disabled
                            />
                            <FieldInput
                                title="Auteur gravure (AUTG) :"
                                name='AUTG'
                                disabled
                            />
                            <FieldInput
                                title="Date oeuv année (DATOEU) :"
                                name='DATOEU'
                                disabled
                            />
                            <FieldInput
                                title="Date oeuv siècle (SCLE) :"
                                name='SCLE'
                                disabled
                            />
                            <FieldInput
                                title="Titre (TITRE) :"
                                name='TITRE'
                                disabled
                            />

                        </Col>
                        <Col sm={6}>
                            <FieldInput
                                title="Nom de théâtre (THEATRE) :"
                                name='THEATRE'
                                disabled
                            />
                            <FieldInput
                                title="Rôle joué (ROLE) :"
                                name='ROLE'
                                disabled
                            />
                            <FieldInput
                                title='Accessoire pose (ACC) :'
                                name='ACC'
                                disabled
                            />
                            <FieldInput
                                title="Toile de fond (TOILE) :"
                                name='TOILE'
                                disabled
                            />
                            <FieldInput
                                title="Costume de la personne représentée (COSTUME) :"
                                name='COSTUME'
                                disabled
                            />
                        </Col>
                    </Section >

                    <Section
                        title='Technique support original
                        '
                        icon={require('../../assets/info.png')}
                        color='#FF7676'
                    >
                        <Col sm={6}>
                        <FieldInput
                                title="Technique photo (TECH) :"
                                name='TECH'
                                disabled
                            />
                            <FieldInput
                                title="Format phototype (FORMAT) :"
                                name='FORMAT'
                                disabled
                            />
                            <FieldInput
                                title="Sens (SENS) :"
                                name='SENS'
                                disabled
                            />
                            <FieldInput
                                title="Couleur (COULEUR) :"
                                name='COULEUR'
                                disabled
                            />
                            <FieldInput
                                title="Technique tirage (TECHTI) :"
                                name='TECHTI'
                                disabled
                            />
                        </Col>
                        <Col sm={6}>
                        <FieldInput
                                title="Format tirage (FORMATTI) :"
                                name='FORMATTI'
                                disabled
                            />
                            <FieldInput
                                title="Format original (FORMATOR) :"
                                name='FORMATOR'
                                disabled
                            />
                            <FieldInput
                                title="Technique orig (TECHOR) :"
                                name='TECHOR'
                                disabled
                            />
                            <FieldInput
                                title="Echelle (ECH) :"
                                name='ECH'
                                disabled
                            />
                        </Col>
                    </Section >


                    <Section
                        title='AUTRES'
                        icon={require('../../assets/info.png')}
                        color='#FF7676'
                    >
                        <Col sm={6}>

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
                                title="Chronologie (CHRONO) :"
                                name='CHRONO'
                                disabled
                            />

                            <FieldInput
                                title="Contact (CONTACT) :"
                                name='CONTACT'
                                disabled
                            />
                            <FieldInput
                                title="Cote conservation du phototype (COTECP) :"
                                name='COTECP'
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
                                title="Interprétation (EDIARCH) :"
                                name='EDIARCH'
                                disabled
                            />
                            <FieldInput
                                title="Emetteur (nom) (IDPROD) :"
                                name='IDPROD'
                                disabled
                            />
                            <FieldTags
                                title="Images (IMG) :"
                                name='IMG'
                                disabled
                            />
                            <FieldInput
                                title="Code INSEE (INSEE) :"
                                name='INSEE'
                                disabled
                            />
                            <FieldInput
                                title="Notice biblio (LAUTP) :"
                                name='LAUTP'
                                disabled
                            />
                            <FieldInput
                                title="Légende thes. (LEG2) :"
                                name='LEG2'
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
                                title="Lieu cons pho. (LIEUCP) :"
                                name='LIEUCP'
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
                                title="N° du site (NUMSITE) :"
                                name='NUMSITE'
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
                                title="Titre du dossier (TICO) :"
                                name='TICO'
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
                                title="Type support num (TYPSUPP) :"
                                name='TYPSUPP'
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
                    {
                        this.props.canUpdate ? (
                            <div className='buttons'>
                                <Link style={{ textDecoration: 'none', color: 'white' }} to="/"><Button color="danger">Annuler</Button></Link>
                                <Button color="danger" onClick={() => this.delete()} >Supprimer</Button>
                                {/* <Button color="primary" type="submit" >Sauvegarder</Button> */}
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
        canUpdate: Auth.user ? (role === "producteur" || role === "administrateur") && (group === "memoire" || group === "admin") : false
    }
}

export default connect(mapStateToProps, {})(reduxForm({ form: 'notice' })(Notice));
