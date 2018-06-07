import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import './index.css';

export default class Home extends React.Component {

    state = {
        tiles: [
            { url: '/search/joconde', name: 'Joconde', image: require('../../assets/joconde.jpg') },
            { url: '/search/merimee', name: 'Mérimée', image: require('../../assets/merimee.jpg') },
            { url: '/search/palissy', name: 'Palissy', image: require('../../assets/palissy.jpg') },
            { url: '/search/memoire', name: 'Mémoire', image: require('../../assets/memoire.jpg') },
            { url: '/search/mnr', name: 'MNR', image: require('../../assets/MNR.jpg') },
        ]
    }

    renderTiles() {
        return this.state.tiles.map(({ url, name, image }, i) => {
            return (
                <Col className="box text-center mb-3" key={i}>
                    <Link style={{ textDecoration: 'none' }} to={url}>
                        <div className='tile'>
                            <img src={image} alt="dummy image" className="img-fluid" />
                            <div className="caption">
                                <div className='name'>{name}</div>
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
                <div className="title">
                    Outil d'édition unitaire et import massif de données patrimoniales de la plateforme POP
                </div>
                <div className="subtitle">
                    Je souhaite modifier la base
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
            </div>
        );
    }
}
