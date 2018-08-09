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
                <div className="title">Bienvenue dans l'outil d'administration des bases du Ministère de la Culture !</div>
                <div className="subtitle">Depuis cet espace, et en fonction des droits qui vous auront été attribués, vous pouvez:       </div>
                <div className="subtitle">- consulter l'ensemble des données publiques et confidentielles déjà importées dans les bases,       </div>
                <div className="subtitle">- importer des données pour alimenter les bases en nouvelles création ou pour remplacer intégralement des notices existantes,       </div>
            </div>
        );
    }
}
