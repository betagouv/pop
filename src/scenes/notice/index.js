import React from 'react';
import { Row, Col, Input, Container, Button, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { toastr } from 'react-redux-toastr'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet';

import FieldInput from './components/fieldInput.js'
import FieldTags from './components/fieldTags.js'

import Section from './components/section.js'

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
        this.setState({ saving: true })
        API.update(this.state.notice._id, 'merimee', values).then((e) => {
            console.log('TOAST')
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
                <h2 className='main-title'>Vous travaillez dans la base Mérimée</h2>




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
                            {this.state.notice.POP_COORDINATES ? <div className='leaflet-container'>
                                <Map center={this.state.notice.POP_COORDINATES} zoom={15}>
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                                    />
                                    <Marker position={this.state.notice.POP_COORDINATES} icon={L.icon({
                                        iconUrl: require('../../assets/marker-icon.png'),
                                        iconSize: [38, 55],
                                        iconAnchor: [22, 54],
                                        popupAnchor: [-3, -76],
                                        shadowUrl: require('../../assets/marker-shadow.png'),
                                        shadowSize: [68, 55],
                                        shadowAnchor: [22, 54]
                                    })}>
                                        <Popup>
                                            <span>{this.state.notice.TICO}<br />{this.state.notice.DENO}</span>
                                        </Popup>
                                    </Marker>
                                </Map>
                            </div> : <div />}
                        </Col>
                    </Row>
                    <Section
                        title='REFERENCES DOCUMENTAIRES'
                        icon={require('../../assets/info.png')}
                        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugia'
                        color='#FF7676'
                    >
                        <FieldInput
                            title='Notice (REF) :'
                            name='REF'
                            disabled
                        />
                        <FieldInput
                            title='TODO-N° de renvoi au domaine MH ou au domaine INVENTAIRE (RENV ) : '
                            name='RENV'
                        />
                        <FieldInput
                            title='Référence dans la base Patriarche (ARCHEO) : '
                            name='ARCHEO'
                        />
                        <FieldInput
                            title="Date d'enquête (DENQ) :"
                            name='DENQ'
                        />
                        <FieldInput
                            title="CopyRight (COPY) :"
                            name='COPY'
                        />
                        <FieldInput
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
                        <FieldInput
                            title='Dossier (DOSS) : '
                            name='DOSS'
                        />
                    </Section>
                    <Section
                        title='DESIGNATION'
                        icon={require('../../assets/law.png')}
                        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugia'
                        color='#FE997B'
                    >
                        <FieldTags
                            title='Denomination (DENO) : '
                            name='DENO'
                        />
                        <FieldInput
                            title='Destinataire (GENR) : '
                            name='GENR'
                        />
                        <FieldInput
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

                        <FieldInput
                            title='Titre courant (TICO) : '
                            name='TICO'
                        />
                        <FieldTags
                            title='Parties constituantes (PART) : '
                            name='PART'
                        />
                        <FieldInput
                            title='TODO-Références des parties constituantes étudiées (REFP) : '
                            name='REFP'
                        />
                        <FieldTags
                            title='Décompte des oeuvres recensées (COLL) :'
                            name='COLL'
                        />
                    </Section>

                    <Section
                        title='LOCALISATION'
                        icon={require('../../assets/map.png')}
                        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugia'
                        color='#FFC070'
                    >
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
                        <FieldInput
                            title="TODO-Référence de l'édifice de conservation (REFE) : "
                            name='REFE'
                        />
                        <FieldTags
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
                        <FieldTags
                            title="Milieu d'implantation (IMPL) : "
                            name='IMPL'
                        />
                        <FieldInput
                            title="Cours d'eau (HYDR) : "
                            name='HYDR'
                        />


                    </Section>


                    <Section
                        title='Historique'
                        icon={require('../../assets/date.png')}
                        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugia'
                        color='#668796'
                    >
                        <FieldTags
                            title='Datation des campagnes principales de construction (SCLE) :'
                            name='SCLE'
                        />
                        <FieldTags
                            title='Datation des campagnes secondaires de construction (SCLD) :'
                            name='SCLD'
                        />
                        <FieldInput
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
                        <FieldTags
                            title="Justification de l'attribution (JATT) :"
                            name='JATT'
                        />
                        <FieldTags
                            title='Personnalitées (PERS) :'
                            name='PERS'
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
                            type='textarea'
                            rows={10}
                        />
                    </Section>
                    <Section
                        title='DESCRIPTION'
                        icon={require('../../assets/tool.png')}
                        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugia'
                        color='#FBE367'
                    >
                        <FieldTags
                            title='Matériau du gros-oeuvre et mise en oeuvre (MURS) : '
                            name='MURS'
                        />
                        <FieldTags
                            title='Matériau de la couverture (TOIT) : '
                            name='TOIT'
                        />
                        <FieldInput
                            title='Parti de plan (PLAN) :'
                            name='PLAN'
                        />
                        <FieldTags
                            title='Vaisseau et étage (ETAG) :'
                            name='ETAG'
                        />
                        <FieldTags
                            title='Type et nature du couvrement (VOUT) :'
                            name='VOUT'
                        />
                        <FieldTags
                            title='Parti d’élévation extérieure (ELEV) :'
                            name='ELEV'
                        />
                        <FieldTags
                            title='Type de la couverture (COUV) :'
                            name='COUV'
                        />
                        <FieldInput
                            title='Emplacement, forme et structure de l’escalier (ESCA) : '
                            name='ESCA'
                        />
                        <FieldTags
                            title="Source de l'énergie (ENER) :"
                            name='ENER'
                        />
                        <FieldInput
                            title='Couvert et découvert de jardin (VERT) :'
                            name='VERT'
                        />
                        <FieldInput
                            title='Commentaire description (DESC) :'
                            name='DESC'
                            type='textarea'
                            rows={4}
                        />
                        <FieldTags
                            title='Technique du décor des immeubles par nature (TECH) : '
                            name='TECH'
                        />
                        <FieldInput
                            title='Représentation (REPR) : '
                            name='REPR'
                        />
                        <FieldInput
                            title='TODO-Précision sur la représentation (PREP) : '
                            name='PREP'
                        />
                        <FieldInput
                            title='Dimensions (DIMS) : '
                            name='DIMS'
                        />
                        <FieldInput
                            title='Typologie (TYPO) : '
                            name='TYPO'
                        />
                        <FieldInput
                            title='Etat de conservation (ETAT) : '
                            name='ETAT'
                        />
                    </Section>
                    <Section
                        title='INTERET ET PROTECTION'
                        icon={require('../../assets/law.png')}
                        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugia'
                        color='#FE997B'
                    >
                        <FieldTags
                            title='Nature de la protection MH (PROT) :'
                            name='PROT'
                        />
                        <FieldInput
                            title='Date protection (DPRO) :'
                            name='DPRO'
                        />
                        <FieldInput
                            title='Précisions sur la protection MH (PPRO) :'
                            name='PPRO'
                            type='textarea'
                            rows={10}
                        />
                        <FieldTags
                            title="Nature de l'acte de protection MH (APRO) :"
                            name='APRO'
                        />
                        <FieldInput
                            title='Eléments protégés MH (MHPP) : '
                            name='MHPP'
                        />
                        <FieldInput
                            title='Site, secteur ou zone de protection (SITE) :'
                            name='SITE'
                        />
                        <FieldTags
                            title="Intérêt de l'oeuvre (INTE) :"
                            name='INTE'
                        />
                        <FieldInput
                            title='Eléments remarquables (REMA) :'
                            name='REMA'
                        />
                        <FieldInput
                            title='Observations (OBS) :'
                            name='OBS'
                            type='textarea'
                            rows={10}
                        />
                    </Section>
                    <Section
                        title='STATUT JURIDIQUE'
                        icon={require('../../assets/time.png')}
                        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugia'
                        color='#00BEB2'
                    >
                        <FieldInput
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
                            title="TODO-Précisions sur l'affectataire (PAFF) :"
                            name='PAFF'
                        />
                        <FieldTags
                            title='Ouverture au public (VISI) :'
                            name='VISI'
                        />
                    </Section>
                    <Section
                        title='GESTION DOCUMENTAIRE'
                        icon={require('../../assets/people.png')}
                        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugia'
                        color='#009DE4'
                    >
                        <FieldInput
                            title="TODO-Identifiant Patrimoine (RFPA) :"
                            name='RFPA'
                        />
                        <FieldInput
                            title="TODO-Date de mise à jour (DMAJ) :"
                            name='DMAJ'
                        />
                        <FieldInput
                            title="TODO-Date de chargement dans la base MERIMEE (DMIS) :"
                            name='DMIS'
                        />
                        <FieldInput
                            title="TODO-Numéro de microfiche (MICR) :"
                            name='MICR'
                        />
                    </Section>
                    <Section
                        title='AUTRES'
                        icon={require('../../assets/law.png')}
                        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugia'
                        color='#FE997B'
                    >
                        <FieldTags
                            title='Auteurs phototype (AUTP) : '
                            name='AUTP'
                        />
                        <FieldTags
                            title='Siecle X (SCLX) :'
                            name='SCLX'
                        />
                        <FieldInput
                            title='Contact (CONTACT) :'
                            name='CONTACT'
                        />
                        <FieldInput
                            title='Mosaïques (MOSA) :'
                            name='MOSA'
                        />
                        
                        <FieldInput
                            title='Localisation (LOCA) : '
                            name='LOCA'
                        />
                        <FieldInput
                            title='Domaines (DOMN) : '
                            name='DOMN'
                        />
                        <FieldInput
                            title='Proprietaire (STAT) : '
                            name='STAT'
                        />

                        <FieldInput
                            title='Dossier adresse (DOSADRS) :'
                            name='DOSADRS'
                            type='textarea'
                            rows={4}
                        />
                        <FieldInput
                            title='Thème (THEM) : '
                            name='THEM'
                        />
                        <FieldInput
                            title='Visite guidé (WEB) : '
                            name='WEB'
                        />

                        <FieldTags
                            title='Parties non étud (PARN) : '
                            name='PARN'
                        />
                        <FieldInput
                            title='Date du label (DLAB) :'
                            name='DLAB'
                        />
                        <FieldInput
                            title='intérêt oeuvre (PINT) :'
                            name='PINT'
                        />
                        <FieldTags
                            title='Liens Divers (LIENS) : '
                            name='LIENS'
                        />
                        <FieldTags
                            title='no Bordereaus (NBOR) : '
                            name='NBOR'
                        />


                        
                    </Section>

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
                {/* <div className='rawdata'>
                    {arr}
                </div> */}
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

