import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import './index.css';

export default class Home extends React.Component {

    state = {
        tiles: [
            { url: '/merimee', name: 'Joconde', image: require('../../assets/joconde.jpg') },
            { url: '/merimee', name: 'Mérimée', image: require('../../assets/merimee.jpg') },
            { url: '/merimee', name: 'Palissy', image: require('../../assets/palissy.jpg') },
            { url: '/merimee', name: 'Mémoires', image: require('../../assets/small.jpg') },
            { url: '/merimee', name: 'MNR', image: require('../../assets/small.jpg') },
        ]
    }

    renderTiles() {
        return this.state.tiles.map(({ url, name, image }, i) => {
            return (
                <Col className="box text-center mb-3">
                    <Link to='/search'>
                        <div className='tile'>
                            <div className="thumb  mb-3">
                                <img src={image} alt="dummy image" className="img-fluid" />
                            </div>
                            <div className="caption">
                                <p className='title'>{name}</p>
                            </div>
                        </div>
                    </Link>
                </Col>
            )
        });
    }

    render() {
        return (
            <div className='home'>
                <Container fluid>
                    <div className="hero-text">
                        <p>Outil d'édition unitaire et import massif de données patrimoniales de la platforme POP</p>
                    </div>
                    <Row>
                        {this.renderTiles()}
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
            </div >
        );
    }
}
