    import React from 'react';

import { Container, Row, Col } from 'reactstrap';

import './view1.css';

import dummyImg from './assets/small.jpg';

export default () => {
    return (
        <div>
            <div className="main-body">
                <Container fluid>
                    <div className="hero-text">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eveniet facilis labore magnam minus natus nemo nobis numquam, obcaecati odit possimus quidem recusandae rem sed similique sunt tempora temporibus voluptatum?</p>
                    </div>
                    <Row>
                        <Col className="box text-center mb-3">
                            <div className="thumb  mb-3">
                                <img src={dummyImg} alt="dummy image" className="img-fluid"/>
                            </div>
                            <div className="caption">
                                <a href="/">Jhonny</a>
                            </div>
                        </Col>
                        <Col className="box text-center mb-3">
                            <div className="thumb  mb-3">
                                <img src={dummyImg} alt="dummy image" className="img-fluid"/>
                            </div>
                            <div className="caption">
                                <a href="/">Jhonny</a>
                            </div>
                        </Col>
                        <Col className="box text-center mb-3">
                            <div className="thumb  mb-3">
                                <img src={dummyImg} alt="dummy image" className="img-fluid"/>
                            </div>
                            <div className="caption">
                                <a href="/">Jhonny</a>
                            </div>
                        </Col>
                        <Col className="box text-center mb-3">
                            <div className="thumb  mb-3">
                                <img src={dummyImg} alt="dummy image" className="img-fluid"/>
                            </div>
                            <div className="caption">
                                <a href="/">Jhonny</a>
                            </div>
                        </Col>
                        <Col className="box text-center mb-3">
                            <div className="thumb  mb-3">
                                <img src={dummyImg} alt="dummy image" className="img-fluid"/>
                            </div>
                            <div className="caption">
                                <a href="/">Jhonny</a>
                            </div>
                        </Col>
                    </Row>
                    <div className="activities py-3">
                        <h4>Historique d'activite</h4>
                        <div className="list-box">
                            <ul className="list-unstyled">
                                <li>item 1</li>
                                <li>item 2</li>
                                <li>item 3</li>
                                <li>item 4</li>
                                <li>item 5</li>
                            </ul>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
}
