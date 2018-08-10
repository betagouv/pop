import React from 'react';
import { Row, Col } from 'reactstrap';
import CreateUser from './createUser';
import { connect } from 'react-redux';
import api from '../../services/api';

import './index.css';

class Admin extends React.Component {

    state = {
        users: [],
        loading: true,
    }


    componentWillMount() {
        this.setState({ loading: true })
        api.getUsers(this.props.group).then(users => {
            this.setState({ users, loading: false })
        });
    }

    renderUsers() {
        const arr = [];
        arr.push(<Row className="header" key="header"><Col>Email</Col><Col>Nom</Col><Col>Prénom</Col><Col>Groupe</Col><Col>Institution</Col><Col>Role</Col></Row >)

        for (var i = 0; i < this.state.users.length; i++) {
            const { email, prenom, nom, role, institution, group } = this.state.users[i];
            arr.push(<Row key={email}><Col>{email}</Col><Col>{nom}</Col><Col>{prenom}</Col><Col>{group}</Col><Col>{institution}</Col><Col>{role}</Col></Row >)
        }

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


const mapStateToProps = ({ Auth }) => {
    return {
        group: Auth.user ? Auth.user.group : ""
    }
}

export default connect(mapStateToProps, {})(Admin);
