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
            const initData = {
                TECH: notice.TECH,
                STAT: notice.STAT,
                CONTACT: notice.CONTACT,
                REF: notice.REF,
                DMIS: notice.DMIS,
                DMAJ: notice.DMAJ,
                HIST: notice.HIST,
                SCLE: notice.SCLE,
                AUTR: notice.AUTR,
                DENO: notice.DENO
            }
            this.props.initialize(initData);
            this.setState({ loading: false, notice })
        })
    }

    onSubmit(values) {
        console.log('ONSUBMIT', values);
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
                        <Col xs={12} sm={12} md='4'>
                            <div className="thumbs-box">
                                <div className="thumb-lg mb-3">
                                    <img src={this.state.notice.IMG} alt="" className="img-fluid w-100" />
                                </div>
                            </div>
                        </Col>
                        <Col md="8">
                            <h3>{this.state.notice.TICO}</h3>
                            <FieldInput
                                title='Denomination : '
                                name='DENO'
                            />
                            <div className="personal-info mt-2">
                                <p><strong>Localisation :</strong> {this.state.notice.COM}, {this.state.notice.REG}</p>
                                <p><strong>Architecte :</strong></p>
                            </div>

                            <FieldInput
                                title='Histoire : '
                                name='HIST'
                                type='textarea'
                                rows={10}
                            />
                            {/* <Row>
                                <Col sm="3">
                                    <h6>Titre</h6>
                                    <span>added on 2002</span>
                                </Col>
                                <Col sm="9">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias asperiores corporis deleniti dignissimos dolores doloribus eaque fuga fugit id in iure magni numquam odit pariatur, quasi quisquam saepe soluta veniam</p>
                                </Col>
                            </Row>
                            <Row className="mb-4">
                                <Col sm="3">
                                    <h6>Titre</h6>
                                    <span>added on 2002</span>
                                </Col>
                                <Col sm="9">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                </Col>
                            </Row> */}


                            <FieldInput
                                title='Date MAJ : '
                                name='DMAJ'
                                disabled
                            />
                            <FieldInput
                                title='Date MIS : '
                                name='DMIS'
                                disabled
                            />
                            <FieldInput
                                title='Notice : '
                                name='REF'
                                disabled
                            />

                            <FieldInput
                                title='Siecle : '
                                name='SCLE'
                            />
                            <FieldInput
                                title='Techniques : '
                                name='TECH'
                            />
                            <FieldInput
                                title='Proprietaire : '
                                name='STAT'
                            />

                            <FieldInput
                                title='Contact : '
                                name='CONTACT'
                            />


                            <FieldInput
                                title='Auteur: '
                                name='AUTR'
                                disabled
                            />

                            <FieldTags
                                title='Test : '
                                name='TITRE'
                            />

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
            </Container>
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