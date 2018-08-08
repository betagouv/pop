import React from 'react';
import { Container, Row, Col, Button, Modal, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import CreateUser from './createUser';

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

    renderModal() {
        return (
            <Modal isOpen={this.state.modal} toggle={() => this.setState({ modal: !this.state.modal })} className=''>
                <div>Ajouter une notice par sa reference</div>
                <Input value={this.state.input} onChange={(e) => this.setState({ input: e.target.value })} />
                <Button color='primary' onClick={this.addLink.bind(this)}>Ajouter</Button>
            </Modal>
        )
    }
    render() {
        return (
            <div className='admin'>
                <CreateUser />
            </div>
        );
    }
}
