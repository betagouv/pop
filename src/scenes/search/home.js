import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import HeaderBase from './components/headerBase';

import Merimee from './merimee';
import Joconde from './joconde';
import Mnr from './mnr';
import Memoire from './memoire';
import Palissy from './palissy';

import './home.css';

export default class Search extends React.Component {

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
                        { url: '/recherche/joconde', name: 'Joconde', image: require('../../assets/joconde.jpg') },
                        { url: '/recherche/merimee', name: 'Mérimée', image: require('../../assets/merimee.jpg') },
                        { url: '/recherche/palissy', name: 'Palissy', image: require('../../assets/palissy.jpg') },
                        { url: '/recherche/memoire', name: 'Mémoire', image: require('../../assets/memoire.jpg') },
                        { url: '/recherche/mnr', name: 'MNR', image: require('../../assets/MNR.jpg') },
                    ])}
                </Row>
            </div>
        );
    }
}
