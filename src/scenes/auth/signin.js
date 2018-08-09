import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../../redux/store';

import Actions from '../../redux/auth/actions';
const { signin } = Actions;

class Signin extends Component {
    state = { email: "se.legoff@gmail.com", password: "N0xEduy2aA", error: "" }

    loginWithEmail() {
        this.props.signin(this.state.email, this.state.password);
    }

    render() {
        return (
            <Container className="signin">
                <div className="block">
                    <h1>Se connecter à POP</h1>
                    <span>{this.props.error}</span>
                    <input
                        className="input-field"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={(e) => this.setState({ email: e.target.value })}
                    />
                    <input
                        className="input-field"
                        placeholder="Password"
                        type="password"
                        value={this.state.password}
                        onChange={(e) => this.setState({ password: e.target.value })}
                    />
                    <Link style={{ textDecoration: 'none' }} to="/auth/forget" className="link" >Mot de passe oublié ?</Link>
                    <Button className="submit-button" onClick={this.loginWithEmail.bind(this)}>Se connecter</Button>
                </div>
            </Container>
        );
    }
}

const mapStateToProps = ({ Auth }) => {
    return { error: Auth.error }
}


export default connect(mapStateToProps, { signin })(Signin);