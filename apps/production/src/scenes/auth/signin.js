import React, { Component } from "react";
import { Container, Button, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Actions from "../../redux/auth/actions";
const { signin } = Actions;

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      cgu: Boolean(localStorage.getItem("cgu"))
    };
  }

  loginWithEmail(event) {
    event.preventDefault();
    this.props.signin(this.state.email, this.state.password);
  }

  renderError(error){
    if(error.indexOf("#") > -1){
      return <React.Fragment>{error.split("#").map( el => <p className="sign-text-error">{el}</p>)}</React.Fragment>
    } else {
      return <React.Fragment><p className="sign-text-error">{error}</p></React.Fragment>
    }
  }

  render() {
    return (
      <form>
        <Container className="signin">
          <h1>Se connecter à POP</h1>
          <div>
            <br />
            Pour obtenir des identifiants, veuillez adresser un{" "}
            <a href="mailto:pop@culture.gouv.fr">email</a> avec les informations suivantes : <br />
            <br />- Institution <br />- Domaine (MNR, Inventaire, Monuments Historiques, Joconde ou
            Base archives photo)
            <br />- Nom <br />- Prénom <br />
            <br />
          </div>
          <div className="error">{this.renderError(this.props.error)}</div>
          <div className="block">
            <input
              className="input-field"
              placeholder="Email"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
            <input
              className="input-field"
              placeholder="Password"
              type="password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
            <Row>
              <Col>
                <div className="cgu">
                  <label>
                    <input
                      type="checkbox"
                      onChange={e => {
                        this.setState({ cgu: e.target.checked });
                      }}
                      checked={this.state.cgu}
                    />{" "}
                    J'accepte les{" "}
                    <a
                      target="_blank"
                      rel="noopener"
                      href="https://s3.eu-west-3.amazonaws.com/pop-general/cgu/cgu.pdf"
                    >
                      CGU
                    </a>
                  </label>
                </div>
              </Col>
              <Col>
                <Link className="forget-password float-right" to="/auth/forget">
                  Mot de passe oublié&nbsp;?
                </Link>
              </Col>
            </Row>

            <Button
              type="submit"
              disabled={!this.state.cgu}
              className="submit-button"
              onClick={this.loginWithEmail.bind(this)}
            >
              Se connecter
            </Button>
          </div>
          <style jsx global>{`
            .sign-text-error{
              margin-bottom: 0;
              text-align: center;
            }
          `  
          }</style>
        </Container>
      </form>
    );
  }
}

const mapStateToProps = ({ Auth }) => {
  return { error: Auth.error };
};

export default connect(
  mapStateToProps,
  { signin }
)(Signin);
