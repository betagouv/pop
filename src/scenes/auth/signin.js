import React, { Component } from 'react'
import { Container, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Actions from '../../redux/auth/actions'
const { signin } = Actions;

class Signin extends Component {
    state = { email: "", password: "", error: "" }

    loginWithEmail() {
        this.props.signin(this.state.email, this.state.password);
    }

    render() {
        return (
            <Container className="signin">
                <h1>Se connecter à POP</h1>
                <div>
                    <br />
                    Pour obtenir des identifiants, veuillez adresser un <a href="mailto:sandrine.della-bartolomea@culture.gouv.fr,sebastien.legoff@beta.gouv.fr">email</a> avec les informations suivantes : <br /><br />
                    - Institution  <br />
                    - Domaine (MNR, Inventaire, Monuments Historiques, Joconde ou Base archives photo)<br />
                    - Nom <br />
                    - Prénom <br /><br />
                </div>
                <span className="error">{this.props.error}</span>
                <div className="block">
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
