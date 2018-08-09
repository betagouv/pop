import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Button, Container } from 'reactstrap';

import User from './user.js'
import Logo from './logo.js'

import './index.css';

class NavComponent extends React.Component {
    render() {
        return (
            <div className='header'>
                <Container className='NavContainer'>
                    <Logo />
                    <Link to="/">Accueil</Link>
                    <Link to="/recherche">Recherche</Link>
                    {(this.props.role === "administrateur" || this.props.role === "producteur") ? <Link to="/import">Import</Link> : <div />}
                    {this.props.role === "administrateur" ? <Link to="/admin">Administration</Link> : <div />}
                    <User />
                </Container>
            </div>
        )
    }
}


const mapStateToProps = ({ Auth }) => {
    return { role: Auth.user ? Auth.user.role : "" }
}

export default connect(mapStateToProps, {})(NavComponent);