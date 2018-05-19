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
            { url: '/merimee', name: 'Mémoire', image: require('../../assets/memoire.jpg') },
            { url: '/merimee', name: 'MNR', image: require('../../assets/MNR.jpg') },
        ]
    }

    renderTiles() {
        return this.state.tiles.map(({ url, name, image }, i) => {
            return (
                <Col className="box text-center mb-3" key={i}>
                    <Link to='/search'>
                        <div className='tile'>
                           <img src={image} alt="dummy image" className="img-fluid" />
                            <div className="caption"> 
                                <div className='title'>{name}</div> 
                            </div> 
                        </div>
                    </Link>
                </Col>
            )
        });
    }

    render() {
        return (
            <Container className='home'>
                <div className="hero-text">
                 Outil d'édition unitaire et import massif de données patrimoniales de la platforme POP
                </div>
                <Row>
                    {this.renderTiles()}
                </Row>
                {/* <div className="activities py-3">
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
                </div> */}
            </Container>
        );
    }
}
