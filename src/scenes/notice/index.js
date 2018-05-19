import React from 'react';
import { Row, Col, Input, Container, Button, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import FieldInput from './components/fieldInput.js'
import FieldTags from './components/fieldTags.js'

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
                <h2 className='title'>Vous travaillez dans la base Mérimée</h2>
                <Form
                    onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}
                    className='main-body'
                >
                    <Row>
                        <Col className='image' xs={12} sm={12} md='4'>
                            <div className="thumbs-box">
                                <div className="thumb-lg mb-3">
                                    <img src={this.state.notice.IMG} alt="" className="img-fluid w-100" />
                                </div>
                            </div>
                        </Col>
                        <Col md="8">
                            <h3>{this.state.notice.TICO}</h3>
                            <FieldTags
                                title='[DENO]Denomination : '
                                name='DENO'
                            />
                            <FieldInput
                                title='[PDEN]préc. DENO : '
                                name='PDEN'
                            />

                            <FieldInput
                                title='[DOMN]Domaines : '
                                name='DOMN'
                            />
                            <hr />
                            <FieldInput
                                title='[COM]COMMUNE : '
                                name='COM'
                            />

                            <FieldInput
                                title='[REG]REGION : '
                                name='REG'
                            />

                            <FieldInput
                                title='[DPT]DEPARTEMENT : '
                                name='DPT'
                            />

                            <FieldInput
                                title='[LOCA]LOCALISATIONS : '
                                name='LOCA'
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <FieldInput
                                title='[HIST]Histoire : '
                                name='HIST'
                                type='textarea'
                                rows={10}
                            />
                            <FieldInput
                                title='[OBS]OBSERVATIONS : '
                                name='OBS'
                                type='textarea'
                                rows={10}
                            />
                            <FieldInput
                                title='[PPRO]préc. Protection : '
                                name='PPRO'
                                type='textarea'
                                rows={10}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <FieldInput
                                title='[MHPP]MH éléments : '
                                name='MHPP'
                            />
                            <FieldInput
                                title='[DMAJ]Date MAJ : '
                                name='DMAJ'
                                disabled
                            />
                            <FieldInput
                                title='[DMIS]Date MIS : '
                                name='DMIS'
                                disabled
                            />
                            <FieldInput
                                title='[REF]Notice : '
                                name='REF'
                                disabled
                            />

                            <FieldTags
                                title='[SCLE]Siecle : '
                                name='SCLE'
                            />
                            <FieldTags
                                title='[SCLX]Siecle X : '
                                name='SCLX'
                            />
                            <FieldTags
                                title='[SCLD]Siecle DEtail : '
                                name='SCLD'
                            />


                            <FieldInput
                                title='[TECH]Techniques : '
                                name='TECH'
                            />
                            <FieldInput
                                title='[STAT]Proprietaire : '
                                name='STAT'
                            />



                            <FieldInput
                                title='[CONTACT]Contact : '
                                name='CONTACT'
                            />

                            <FieldInput
                                title='[VOCA]Vocable : '
                                name='VOCA'
                            />

                            <hr />

                            <FieldInput
                                title='[VERT]Jardin : '
                                name='VERT'
                            />


                            <FieldInput
                                title='[REMA] Remarquable : '
                                name='REMA'
                            />

                            <FieldInput
                                title='[PSTA] préc. Propriétés : '
                                name='PSTA'
                            />



                            <FieldInput
                                title='[THEM] Thème : '
                                name='THEM'
                            />
                            <FieldInput
                                title='[TYPO]Typologie : '
                                name='TYPO'
                            />
                            <FieldInput
                                title='[TICO] Titre courant : '
                                name='TICO'
                            />
                            <FieldTags
                                title='[AUTP] Auteurs phototype: '
                                name='AUTP'
                            />
                            <FieldTags
                                title='[AUTR]Auteurs: '
                                name='AUTR'
                            />

                            <FieldTags
                                title='[NOMS] Nom rédacteur(s): '
                                name='NOMS'
                            />

                            <FieldTags
                                title='[PART]Parties: '
                                name='PART'
                            />

                            <FieldTags
                                title='[PARN] Parties non étud: '
                                name='PARN'
                            />

                            <FieldTags
                                title='[MHPP] MH éléments: '
                                name='MHPP'
                            />

                            


                            <hr />
                            <p style={{ textAlign: 'end' }}>{this.state.notice.COPY}</p>
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


            /*
  componentDidMount() {

    const store = this.props.storeObj;
    const initData = {
                    "name": store.name,
                "legal_company_name": store.legal_company_name || '',
                "company_registration_number": store.company_registration_number || '',
                "description": store.description || '',
                "type": store.type || '',
                "picture": store.picture || '',
                "banner": store.banner || '',
                "address": store.address || '',
                "city": store.city || '',
                "zip_code": store.zip_code || '',
                "country": store.country || '',
                "location": store.location || '',
                "phone": store.phone || '',
                "url": store.url || '',
                "email": store.email || '',
                "zoho_id": store.zoho_id || '',
                "warehouse_contact": store.warehouse_contact || '',
                "warehouse_phones": store.warehouse_phones || '',
                "warehouse_emails": store.warehouse_emails || '',
                "distribution_chanel_id": store.distribution_chanel_id || '',
                "is_active": store.is_active || '',
                "commission": store.commission || '',
                "delivery_tax": store.delivery_tax || '',
                "gst_percentage_for_import": store.gst_percentage_for_import || '',
                "trade_price": store.trade_price || false,
                "is_gst_included": store.is_gst_included || '',
                "in_app_purchase": store.in_app_purchase || '',
                "enable": store.enable || false,
                "pickup_same_day": store.pickup_same_day || '',
                "pickup_next_day": store.pickup_next_day || '',
                "pickup_cut_of_time": store.pickup_cut_of_time || '',
                "express_delivery": store.express_delivery || '',
                "open_time": store.open_time || '',
                "close_time": store.close_time || '',
                "is_monday_closed": store.is_monday_closed || false,
                "is_tuesday_closed": store.is_tuesday_closed || false,
                "is_wednesday_closed": store.is_wednesday_closed || false,
                "is_thursday_closed": store.is_thursday_closed || false,
                "is_friday_closed": store.is_friday_closed || false,
                "is_saturday_closed": store.is_saturday_closed || false,
                "is_sunday_closed": store.is_sunday_closed || false,
                "contact_name": store.contact_name || '',
              };
              this.props.initialize(initData);
            }
          
  onSubmit(values) {
                    this.setState({ saving: true })
    if (this.props.storeId !== 'null') {
      return Firebase.editStore(this.props.storeId, values).then(() => {
                    this.setState({ saving: false })
        notification.success({message: 'Store saved' });
              })
            }
          }
        
          */

// const Images = ({images}) => {
//     return (
//         <Col md="4">
//             <div className="thumbs-box">
//                 <div className="thumb-lg mb-3">
//                     <img src={dummyImg_l} alt="" className="img-fluid w-100" />
//                 </div>
//             </div>
//             <Row>
//                 <Col sm="4" className="my-3">
//                     <img src={dummyImg_s} alt="" className="img-fluid" />
//                 </Col>
//                 <Col sm="4" className="my-3">
//                     <img src={dummyImg_s} alt="" className="img-fluid" />
//                 </Col>
//                 <Col sm="4" className="my-3">
//                     <img src={dummyImg_s} alt="" className="img-fluid" />
//                 </Col>
//                 <Col sm="4" className="my-3">
//                     <img src={dummyImg_s} alt="" className="img-fluid" />
//                 </Col>
//                 <Col sm="4" className="my-3">
//                     <img src={dummyImg_s} alt="" className="img-fluid" />
//                 </Col>
//                 <Col sm="4" className="my-3">
//                     <img src={dummyImg_plus} alt="" className="img-fluid" />
//                 </Col>
//             </Row>
//         </Col>
//     );
// }


/*
  componentDidMount() {

    const store = this.props.storeObj;
    const initData = {
      "name": store.name,
      "legal_company_name": store.legal_company_name || '',
      "company_registration_number": store.company_registration_number || '',
    };
    this.props.initialize(initData);
  }

  onSubmit(values) {
    this.setState({ saving: true })
    if (this.props.storeId !== 'null') {
      return Firebase.editStore(this.props.storeId, values).then(() => {
        this.setState({ saving: false })
        notification.success({ message: 'Store saved' });
      })
    }
  }
  */
/*
renderImages() {
    if (this.props.label.pictures && this.props.label.pictures.length) {
        const name = (this.props.label.name + ' ' + this.props.label.brand).trim();
        return (
            <Col xs={12} sm={12} md={6}>
                <Row className='label-main-img'>
                    <img src={this.props.label.pictures[this.state.imgNumber]} alt={name} />
                </Row>
                <Row className='label-thumbnail'>
                    {this.props.label.pictures.slice(0, 5).map((img, i) => {
                        return (
                            <Col xs={2} sm={2} md={2} key={i} className='thumbnail-col'>
                                <img className={this.state.imgNumber === i ? `active` : ``}
                                    src={img}
                                    alt={name}
                                    onClick={() => { this.setState({ imgNumber: i }) }} />
                            </Col>
                        )
                    })}
                </Row>
            </Col>
        )
    } else {
        return <div />
    }
}



.label .label-main-img {
    margin-bottom: 20px;
    background-color: #ffffff;
    justify-content: center;
}

.label .label-main-img row{
    justify-content: center;
}

.label .label-main-img img {
    max-width: 100%;
    max-height: 300px;
    object-fit: contain;
    padding: 10px;
}

.label .thumbnail-col {
    justify-content: center;
    display: flex;
}

.label .label-thumbnail img {
    width: 80px;
    height: 80px;
    filter: brightness(70%) opacity(0.75);
    object-fit: contain;
}

.label .label-thumbnail .active {
    border-radius: 3px;
    filter: none;
    background-color: #f8f8f8;
    border: solid 4px #b89e34;
}


*/