import React from 'react';

import { Container, Row, Col } from 'reactstrap';

import dummyImg_s from './assets/small.jpg';
import dummyImg_l from './assets/big.jpg';
import dummyImg_plus from './assets/001-plus.png';


export default () => {
    return (
        <Container fluid>
            <header className="header">
                <Container fluid>
                    <Row>
                        <Col xs="6" className="headerTitle">
                            <h1>
                            </h1>
                        </Col>
                        <Col xs="6" className="header-right">
                        </Col>
                    </Row>
                </Container>
            </header>
            <main className="main-body">
                <Row>
                    <Col md="4">
                        <div className="thumbs-box">
                            <div className="thumb-lg mb-3">
                                <img src={dummyImg_l} alt="" className="img-fluid w-100" />
                            </div>
                        </div>
                        <Row>
                            <Col sm="4" className="my-3">
                                <img src={dummyImg_s} alt="" className="img-fluid"/>
                            </Col>
                            <Col sm="4" className="my-3">
                                <img src={dummyImg_s} alt="" className="img-fluid"/>
                            </Col>
                            <Col sm="4" className="my-3">
                                <img src={dummyImg_s} alt="" className="img-fluid"/>
                            </Col>
                            <Col sm="4" className="my-3">
                                <img src={dummyImg_s} alt="" className="img-fluid"/>
                            </Col>
                            <Col sm="4" className="my-3">
                                <img src={dummyImg_s} alt="" className="img-fluid"/>
                            </Col>
                            <Col sm="4" className="my-3">
                                <img src={dummyImg_plus} alt="" className="img-fluid"/>
                            </Col>
                        </Row>
                    </Col>
                    <Col md="8">
                        <h3>main heading here</h3>
                        <span>dummy text</span>
                        <div className="personal-info mt-2">
                            <p><strong>Localisation:</strong> Anqlards-de-Salers</p>
                            <p><strong>Architecte:</strong>  Peosper Bolon</p>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aperiam eos illo molestias placeat? A doloremque eaque iste nemo tempora. Dicta, dolorem voluptate! Corporis facilis fugiat nihil quae quos Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aperiam eos illo molestias placeat? A doloremque eaque iste nemo tempora. Dicta, dolorem voluptate! Corporis facilis fugiat nihil quae quos velit</p>
                        <Row>
                            <Col sm="3">
                                <h6>small heading a</h6>
                                <span>added on 2002</span>
                            </Col>
                            <Col sm="9">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias asperiores corporis deleniti dignissimos dolores doloribus eaque fuga fugit id in iure magni numquam odit pariatur, quasi quisquam saepe soluta veniam</p>
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col sm="3">
                                <h6>small heading 2 extended</h6>
                                <span>added on 2002</span>
                            </Col>
                            <Col sm="9">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                            </Col>
                        </Row>
                        <p><strong>Technique:</strong>  Peosper Bolon</p>
                        <p><strong>Date:</strong>  1905</p>
                        <p><strong>Siecle:</strong>  Peosper Bolon</p>
                        <p><strong>Siecle Detail:</strong>  Peosper Bolon</p>
                        <p><strong>proprietry:</strong> </p>
                        <p><strong>Notice:</strong> PASSWORD </p>
                    </Col>
                </Row>
            </main>
            <footer>
                <h5>Lorem ipsum dolor sit amet, consectetur</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam cumque dolorum eveniet inventore quisquam. Ab accusamus at cupiditate eaque eveniet illum laboriosam magni odio quidem quo sapiente, sequi velit vitae?</p>
            </footer>
        </Container>
    );
}
