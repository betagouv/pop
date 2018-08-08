import React from 'react';
import { Container, Row, Col, Button, Modal, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Loader from '../../components/loader';
import './createUser.css';

export default class CreateUser extends React.Component {

    state = {
        modal: false,
        email: "",
        institution: "",
        group: "MNR",
        role: "Utilisateur",
        loading: false
    }

    createUser() {
        this.setState({ loading: true })
        const { group, email, role, institution } = this.state;
        api.createUser(email, group, role, institution).then(() => {
            this.setState({ modal: false })
        })
    }

    renderModal() {
        return (
            <Modal isOpen={this.state.modal} toggle={() => this.setState({ modal: !this.state.modal })} >
                <h3>Ajouter un nouvel utilisateur</h3>
                <div className="input-container">
                    <div>
                        <div>Email</div>
                        <Input value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
                    </div>
                </div>
                <div className="input-container">
                    <div>Institution</div>
                    <Input value={this.state.institution} onChange={(e) => this.setState({ institution: e.target.value })} />
                </div >
                <div className="input-container">
                    <div>Groupe</div>
                    <Input type="select" value={this.state.group} onChange={(e) => this.setState({ group: e.target.value })} >
                        <option>MNR</option>
                        <option>Joconde</option>
                        <option>MH</option>
                        <option>INV</option>
                        <option>SAP</option>
                    </Input>
                </div >
                <div className="input-container">
                    <div>Rôle</div>
                    <Input type="select" value={this.state.role} onChange={(e) => this.setState({ role: e.target.value })} >
                        <option>Administrateur</option>
                        <option>Producteur</option>
                        <option>Utilisateur</option>
                    </Input>
                </div >
                <div className="button-container">
                    <Button color="primary" onClick={this.createUser.bind(this)}>Créer</Button>
                </div>
            </Modal >
        )
    }
    render() {
        return (
            <div className='createUser'>
                {this.renderModal()}
                <Button className="button" color="primary" onClick={() => this.setState({ modal: true })} >Créer un nouvel utilisateur</Button>
            </div>
        );
    }
}
