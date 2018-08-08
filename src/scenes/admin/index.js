import React from 'react';
import { Container, Row, Col, Button, Modal, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import CreateUser from './createUser';
import Loader from '../../components/loader';
import api from '../../services/api';

import './index.css';

export default class Admin extends React.Component {

    state = {
        users: [],
        loading: true,
    }


    componentWillMount() {
        this.setState({ loading: true })
        api.getUsers().then(users => {
            this.setState({ users, loading: false })
        });
    }

    renderUsers() {
        const arr = [];
        arr.push(<Row key="header"><Col>Email</Col><Col>Groupe</Col><Col>Institution</Col><Col>Role</Col></Row >)

        this.state.users.reduce((arr, { email, role, institution, group }) => (
            arr.push(<Row key={email}><Col>{email}</Col><Col>{group}</Col><Col>{institution}</Col><Col>{role}</Col></Row >)
        ), arr)

        return arr;
    }

    render() {
        return (
            <div className='admin'>
                <CreateUser />
                <div className="usersList">
                    {this.renderUsers()}
                </div>
            </div>
        );
    }
}
