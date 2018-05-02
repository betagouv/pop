import React from 'react';
import { Row, Col, Input, Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

import Loader from '../../components/loader'
import API from '../../services/api'

import dummyImg_s from './../../assets/small.jpg';
import dummyImg_l from './../../assets/small.jpg';
import dummyImg_plus from './../../assets/small.jpg';

import './index.css';

export default class Notice extends React.Component {

    state = {
        notice: null,
        error: '',
        loading: true
    }

    componentWillMount() {
        API.getNotice(this.props.match.params.id).then((notice) => {
            this.setState({ loading: false, notice })
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
                <h2 className='title'>Vous travaillez dans la base Mérimée</h2>
                <main className="main-body">
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
                            <span>{this.state.notice.DENO}</span>
                            <div className="personal-info mt-2">
                                <p><strong>Localisation :</strong> {this.state.notice.COM}, {this.state.notice.REG}</p>
                                <p><strong>Architecte :</strong>  Peosper Bolon</p>
                            </div>
                            <p>{this.state.notice.HIST}</p>
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
                            <p><strong>Technique :</strong> {this.state.notice.TECH}</p>
                            <p><strong>Date MAJ :</strong> {this.state.notice.DMAJ}</p>
                            <p><strong>Date MIS :</strong> {this.state.notice.DMIS}</p>
                            <p><strong>Siecle :</strong> {this.state.notice.SCLE}</p>
                            <p><strong>Siecle Detail :</strong> </p>
                            <p><strong>Proprietry :</strong> {this.state.notice.STAT}</p>
                            <p><strong>Notice :</strong> {this.state.notice.REF}</p>
                            <p><strong>Contact :</strong> {this.state.notice.CONTACT}</p>
                        </Col>
                    </Row>
                </main>
                <footer>
                    <h5>Lorem ipsum dolor sit amet, consectetur</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam cumque dolorum eveniet inventore quisquam. Ab accusamus at cupiditate eaque eveniet illum laboriosam magni odio quidem quo sapiente, sequi velit vitae?</p>
                </footer>
                <div className='buttons'>
                    <Button color="danger">Cancel</Button>
                    <Button color="primary">Save</Button>
                </div>
                <div className='rawdata'>
                    {arr}
                </div>
            </Container>
        );
    }
}

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

// const Images = ({ images }) => {
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