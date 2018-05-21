import React from 'react';
import { Row, Col, Input, Container, Button, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import FieldInput from './components/fieldInput.js'
import FieldTags from './components/fieldTags.js'

import Section from './components/section.js'

import Loader from '../../components/loader'
import API from '../../services/api'

import dummyImg_s from './../../assets/small.jpg';
import dummyImg_l from './../../assets/small.jpg';
import dummyImg_plus from './../../assets/small.jpg';

import './index.css';

class Notice extends React.Component {

    state = {
        notice: null,
        error: '',
        loading: true
    }

    componentWillMount() {
        API.getNotice(this.props.match.params.id).then((notice) => {

            console.log('NOTICE', notice)
            const initData = {
                REF: notice.REF,
                ACTU: notice.ACTU,
                ADRS: notice.ADRS,
                AFFE: notice.AFFE,
                AIRE: notice.AIRE,
                APPL: notice.APPL,
                APRO: notice.APRO,
                ARCHEO: notice.ARCHEO,
                AUTP: notice.AUTP,
                AUTR: notice.AUTR,
                CADA: notice.CADA,
                CANT: notice.CANT,
                COLL: notice.COLL,
                COM: notice.COM,
                COOR: notice.COOR,
                COORM: notice.COORM,
                COPY: notice.COPY,
                COUV: notice.COUV,
                DATE: notice.DATE,
                DBOR: notice.DBOR,
                DOMN: notice.DOMN,
                DENO: notice.DENO,
                DENQ: notice.DENQ,
                DEPL: notice.DEPL,
                DESC: notice.DESC,
                DIMS: notice.DIMS,
                DOSS: notice.DOSS,
                DPRO: notice.DPRO,
                DPT: notice.DPT,
                EDIF: notice.EDIF,
                ELEV: notice.ELEV,
                ENER: notice.ENER,
                ESCA: notice.ESCA,
                ETAG: notice.ETAG,
                ETAT: notice.ETAT,
                ETUD: notice.ETUD,
                GENR: notice.GENR,
                HIST: notice.HIST,
                HYDR: notice.HYDR,
                IMPL: notice.IMPL,
                INSEE: notice.INSEE,
                INTE: notice.INTE,
                JATT: notice.JATT,
                JDAT: notice.JDAT,
                LBASE2: notice.LBASE2,
                LIEU: notice.LIEU,
                LOCA: notice.LOCA,
                MFICH: notice.MFICH,
                MOSA: notice.MOSA,
                MHPP: notice.MHPP,
                MICR: notice.MICR,
                MURS: notice.MURS,
                NBOR: notice.NBOR,
                NOMS: notice.NOMS,
                OBS: notice.OBS,
                PAFF: notice.PAFF,
                PART: notice.PART,
                PARN: notice.PARN,
                PDEN: notice.PDEN,
                PERS: notice.PERS,
                PLAN: notice.PLAN,
                PLOC: notice.PLOC,
                PPRO: notice.PPRO,
                PREP: notice.PREP,
                PROT: notice.PROT,
                PSTA: notice.PSTA,
                REFE: notice.REFE,
                REFO: notice.REFO,
                REFP: notice.REFP,
                REG: notice.REG,
                REMA: notice.REMA,
                REMP: notice.REMP,
                RENV: notice.RENV,
                REPR: notice.REPR,
                RFPA: notice.RFPA,
                SCLD: notice.SCLD,
                SCLE: notice.SCLE,
                SCLX: notice.SCLX,
                SITE: notice.SITE,
                STAT: notice.STAT,
                TECH: notice.TECH,
                TICO: notice.TICO,
                TOIT: notice.TOIT,
                TYPO: notice.TYPO,
                VERT: notice.VERT,
                REFIM: notice.REFIM,
                IMG: notice.IMG,
                VIDEO: notice.VIDEO,
                DOSURL: notice.DOSURL,
                DOSURLP: notice.DOSURLP,
                DOSADRS: notice.DOSADRS,
                LIENS: notice.LIENS,
                IMAGE: notice.IMAGE,
                VISI: notice.VISI,
                VOCA: notice.VOCA,
                VOUT: notice.VOUT,
                WEB: notice.WEB,
                ZONE: notice.ZONE,
                THEM: notice.THEM,
                ACMH: notice.ACMH,
                ACURL: notice.ACURL,
                WADRS: notice.WADRS,
                WCOM: notice.WCOM,
                WRENV: notice.WRENV,
                REFM: notice.REFM,
                CONTACT: notice.CONTACT,
                IDAGR: notice.IDAGR,
                LMDP: notice.LMDP,
                PINT: notice.PINT,
                DLAB: notice.DLAB,
                APPL: notice.APPL,

            }
            this.props.initialize(initData);
            this.setState({ loading: false, notice })


        })
    }

    onSubmit(values) {
        API.update(this.state.notice._id, 'merimee', values)
        this.setState({ saving: true })
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
                <h2 className='main-title'>Vous travaillez dans la base Mérimée</h2>
                <Form
                    onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}
                    className='main-body'
                >
                    <div className='section'>
                        <Row>
                            <Col md="8">
                                <div className='sectionheader'>
                                    <img src={require('../../assets/info.png')} alt="GENERALES INFORMATIONS" />
                                    <div className='title'>GENERALES INFORMATIONS</div>
                                </div>
                                <hr />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="8">
                                <FieldInput
                                    title='Titre courant (TICO) : '
                                    name='TICO'
                                />
                                <FieldTags
                                    title='Denomination (DENO) : '
                                    name='DENO'
                                />
                                <FieldInput
                                    title='préc. DENO (PDEN) :'
                                    name='PDEN'
                                />
                                <FieldInput
                                    title='Domaines (DOMN) : '
                                    name='DOMN'
                                />
                                <FieldInput
                                    title='Region (REG) : '
                                    name='REG'
                                />
                                <FieldInput
                                    title='Département (DPT) : '
                                    name='DPT'
                                />
                                <FieldInput
                                    title='Canton (CANT) : '
                                    name='CANT'
                                />
                                <FieldInput
                                    title='Commune (COM) : '
                                    name='COM'
                                />
                                <FieldInput
                                    title='Lieu-dit (LIEU) : '
                                    name='LIEU'
                                />
                                <FieldInput
                                    title='Localisation (LOCA) : '
                                    name='LOCA'
                                />
                                <FieldTags
                                    title='Implantation (IMPL) : '
                                    name='IMPL'
                                />
                            </Col>
                            <Col md="4">
                                <span className='verticalLine' />
                                <div className='subtitle'>Comment remplir cette section</div>
                                <div>
                                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugia
                                </div>
                                <Button >En savoir plus</Button>
                            </Col>
                        </Row>
                    </div>
                    <Section />
                    <Row>
                        <Col className='image' xs={12} sm={12} md='4'>
                            <div className="thumbs-box">
                                <div className="thumb-lg mb-3">
                                    <img src={this.state.notice.IMG} alt="" className="img-fluid w-100" />
                                </div>
                            </div>
                        </Col>
                        <Col md="12">
                            <FieldInput
                                title='Histoire (HIST) :'
                                name='HIST'
                                type='textarea'
                                rows={10}
                            />
                            <FieldInput
                                title='Observations (OBS) :'
                                name='OBS'
                                type='textarea'
                                rows={10}
                            />
                            <FieldInput
                                title='Description (DESC) :'
                                name='DESC'
                                type='textarea'
                                rows={4}
                            />
                            <FieldInput
                                title='préc. Protection (PPRO) :'
                                name='PPRO'
                                type='textarea'
                                rows={10}
                            />

                            <FieldTags
                                title='Collectifs (COLL) :'
                                name='COLL'
                            />
                            <FieldTags
                                title='Cadastre (CADA) :'
                                name='CADA'
                            />
                            <FieldTags
                                title='Acte protection (APRO) :'
                                name='APRO'
                            />
                            <FieldTags
                                title='Coûte couvrement (VOUT) :'
                                name='VOUT'
                            />
                            <FieldTags
                                title='Visite (VISI) :'
                                name='VISI'
                            />
                            <FieldTags
                                title='couverture (COUV) :'
                                name='COUV'
                            />
                            <FieldTags
                                title='Personnalitées (PERS) :'
                                name='PERS'
                            />
                            <FieldTags
                                title='Intérêt (INTE) :'
                                name='INTE'
                            />

                            <FieldTags
                                title='Energie (ENER) :'
                                name='ENER'
                            />
                            <FieldTags
                                title='Elevation (ELEV) :'
                                name='ELEV'
                            />
                            <FieldTags
                                title='Etages (ETAG) :'
                                name='ETAG'
                            />
                            <FieldTags
                                title='Protection (PROT) :'
                                name='PROT'
                            />





                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <FieldInput
                                title='MH éléments (MHPP) : '
                                name='MHPP'
                            />
                            <FieldInput
                                title='Date MAJ (DMAJ) :'
                                name='DMAJ'
                                disabled
                            />
                            <FieldInput
                                title='Date MIS (DMIS) :'
                                name='DMIS'
                                disabled
                            />



                            <FieldInput
                                title='Notice (REF) :'
                                name='REF'
                                disabled
                            />

                            <FieldInput
                                title='Dossier (DOSS) : '
                                name='DOSS'
                            />


                            <FieldTags
                                title='Siecle (SCLE) :'
                                name='SCLE'
                            />
                            <FieldTags
                                title='Siecle X (SCLX) :'
                                name='SCLX'
                            />
                            <FieldTags
                                title='Siecle Detail (SCLD) :'
                                name='SCLD'
                            />

                            <FieldInput
                                title="Date (DATE) :"
                                name='DATE'
                            />

                            <FieldInput
                                title='Etat (ETAT) : '
                                name='ETAT'
                            />
                            <FieldInput
                                title='Murs (MURS) : '
                                name='MURS'
                            />
                            <FieldInput
                                title='Dimensions (DIMS) : '
                                name='DIMS'
                            />



                            <FieldInput
                                title='Toiture matériau (TOIT) : '
                                name='TOIT'
                            />

                            <FieldInput
                                title='Technique décor (TECH) : '
                                name='TECH'
                            />
                            <FieldInput
                                title='Deplacement (DEPL) : '
                                name='DEPL'
                            />

                            <FieldInput
                                title='Destinataire (GENR) : '
                                name='GENR'
                            />
                            <FieldInput
                                title='Escaliers (ESCA) : '
                                name='ESCA'
                            />

                            <FieldInput
                                title='Remploi (REMP) : '
                                name='REMP'
                            />
                            <FieldInput
                                title='Représentation (REPR) : '
                                name='REPR'
                            />
                            <FieldInput
                                title='Proprietaire (STAT) : '
                                name='STAT'
                            />
                            <FieldInput
                                title="Aire d'étude (AIRE) : "
                                name='AIRE'
                            />
                            <FieldInput
                                title='Dossier adresse (DOSADRS) :'
                                name='DOSADRS'
                                type='textarea'
                                rows={4}
                            />

                            <FieldInput
                                title='Contact (CONTACT) :'
                                name='CONTACT'
                            />

                            <FieldInput
                                title='Vocable (VOCA) :'
                                name='VOCA'
                            />
                            <FieldInput
                                title='Appellation (APPL) :'
                                name='APPL'
                            />
                            <FieldInput
                                title='Destination (ACTU) :'
                                name='ACTU'
                            />
                            <FieldInput
                                title='Affectataire (AFFE) :'
                                name='AFFE'
                            />
                            <FieldInput
                                title='Plan (PLAN) :'
                                name='PLAN'
                            />
                            <FieldInput
                                title='Etude (ETUD) :'
                                name='ETUD'
                            />
                            <hr />

                            <FieldInput
                                title='Jardin (VERT) :'
                                name='VERT'
                            />


                            <FieldInput
                                title='Remarquable (REMA) :'
                                name='REMA'
                            />
                            <FieldInput
                                title='Statut propriété (STAT) :'
                                name='STAT'
                            />

                            <FieldInput
                                title='Site protégé (SITE) :'
                                name='SITE'
                            />
                            <FieldInput
                                title='préc. Propriétés (PSTA): '
                                name='PSTA'
                            />

                            <FieldTags
                                title='Justif. datation (JDAT) :'
                                name='JDAT'
                            />
                            <FieldTags
                                title='justif. attrib. (JATT) :'
                                name='JATT'
                            />

                            <FieldTags
                                title='Date protection (DPRO) :'
                                name='DPRO'
                            />

                            <FieldInput
                                title='Thème (THEM) : '
                                name='THEM'
                            />

                            <FieldInput
                                title='Edif. contenant (EDIF) : '
                                name='EDIF'
                            />

                            <FieldInput
                                title='Hydrographie (HYDR) : '
                                name='HYDR'
                            />

                            <FieldInput
                                title='Typologie (TYPO) : '
                                name='TYPO'
                            />

                            <FieldTags
                                title='Auteurs phototype (AUTP) : '
                                name='AUTP'
                            />
                            <FieldTags
                                title='Auteurs (AUTR) : '
                                name='AUTR'
                            />

                            <FieldTags
                                title='Nom rédacteur(s) (NOMS) : '
                                name='NOMS'
                            />

                            <FieldTags
                                title='Parties (PART) : '
                                name='PART'
                            />

                            <FieldTags
                                title='Parties non étud (PARN) : '
                                name='PARN'
                            />

                            <FieldTags
                                title='MH éléments (MHPP) : '
                                name='MHPP'
                            />

                            <FieldInput
                                title='INSEE (INSEE) :'
                                name='INSEE'
                            />
                            <FieldInput
                                title='Date du label (DLAB) :'
                                name='DLAB'
                            />
                            <FieldInput
                                title='Date bordereau (DBOR) :'
                                name='DBOR'
                            />
                            <FieldInput
                                title="date d'enquête (DENQ) :"
                                name='DENQ'
                            />



                            <FieldTags
                                title='Domaines (DOMN) : '
                                name='DOMN'
                            />
                            <FieldTags
                                title='Liens Divers (LIENS) : '
                                name='LIENS'
                            />


                            <hr />

                            <FieldInput
                                title="CopyRight (COPY) :"
                                name='COPY'
                            />
                        </Col>
                    </Row>
                    <div className='buttons'>
                        <Button color="danger">
                            {/* <Link to="/"> */}
                            Annuler
                        {/* </Link> */}
                        </Button>
                        <Button
                            disabled={false}
                            color="primary"
                            type="submit"
                        >
                            Sauvegarder
                    </Button>
                    </div>
                </Form>
                <div className='rawdata'>
                    {arr}
                </div>
            </Container >
        );
    }
}


export default reduxForm({
    form: 'notice'
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

