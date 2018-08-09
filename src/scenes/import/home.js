import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

import './home.css';

export default class Import extends React.Component {

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
            <div className='home-import'>
                <div className="subtitle">Je souhaite importer</div>
                <Row>
                    {this.renderTiles([
                        { url: '/import/joconde', name: 'joconde', image: require('../../assets/joconde.jpg') },
                        { url: '/import/mnr', name: 'mnr', image: require('../../assets/joconde.jpg') },
                        { url: '/import/inv', name: 'inv', image: require('../../assets/joconde.jpg') },
                        { url: '/import/mh', name: 'mh', image: require('../../assets/joconde.jpg') },
                        { url: '/import/sap', name: 'sap', image: require('../../assets/joconde.jpg') },
                    ])}
                </Row>
            </div>
        );
    }
}
