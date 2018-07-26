import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import './index.css';

export default class Home extends React.Component {

    renderTiles(tiles) {
        return tiles.map(({ url, name, image }, i) => {
            return (
                <Col md="2" className="box text-center" key={i}>
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
                <div className="title">Outil d'édition unitaire et import massif de données patrimoniales de la plateforme POP</div>
                <div className="subtitle">Je souhaite consulter la base</div>
                <Row>
                    {this.renderTiles([
                        { url: '/search/joconde', name: 'Joconde', image: require('../../assets/joconde.jpg') },
                        { url: '/search/merimee', name: 'Mérimée', image: require('../../assets/merimee.jpg') },
                        { url: '/search/palissy', name: 'Palissy', image: require('../../assets/palissy.jpg') },
                        { url: '/search/memoire', name: 'Mémoire', image: require('../../assets/memoire.jpg') },
                        { url: '/search/mnr', name: 'MNR', image: require('../../assets/MNR.jpg') },
                    ])}
                </Row>
                <div className="subtitle">Je souhaite importer</div>
                <Row>
                    {this.renderTiles([
                        { url: '/import/joconde', name: 'Joconde', image: require('../../assets/joconde.jpg') },
                        { url: '/import/mnr', name: 'MNR', image: require('../../assets/MNR.jpg') },
                        { url: '/import/inventairegertrude', name: 'Inventaire Gertrude', image: require('../../assets/noimage.jpg') },
                        { url: '/import/inventairerenable', name: 'Inventaire Renable', image: require('../../assets/noimage.jpg') },
                        { url: '/import/merimeeMH', name: 'Merimee MH', image: require('../../assets/merimee.jpg') },
                        { url: '/import/palissyMH', name: 'Palissy MH', image: require('../../assets/palissy.jpg') },
                        { url: '/import/', name: 'Mémoire MH', image: require('../../assets/noimage.jpg') },
                        { url: '/import/', name: 'Mérimée ETA', image: require('../../assets/noimage.jpg') },
                        { url: '/import/', name: 'Palissy ETA', image: require('../../assets/noimage.jpg') },
                        { url: '/import/', name: 'Mémoire Archive Photo', image: require('../../assets/noimage.jpg') },
                    ])}
                </Row>
            </div>
        );
    }
}
