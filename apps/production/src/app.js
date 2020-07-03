import React from "react";
import { Alert } from "reactstrap";
import Loader from "./components/Loader";
import { history } from "./redux/store";
import PublicRoutes from "./router";
import Actions from "./redux/auth/actions";
const { signinByToken } = Actions;

import { connect } from "react-redux";

class App extends React.Component {
  state = { alert: process.env.NODE_ENV !== "production", alertMEP: true };
  componentWillMount() {
    this.props.signinByToken();
  }

  renderAlert() {
    return (
      <Alert
        style={{ marginBottom: "0px" }}
        color="danger"
        isOpen={this.state.alert}
        toggle={() => this.setState({ alert: false })}
      >
        Les notices que vous versez sur cette plateforme de test ne seront pas publiées en
        diffusion. Si vous souhaitez publier vos données sur notre site pop.culture.gouv.fr,
        connectez-vous sur la plateforme de production&nbsp;:&nbsp;
        <a href="https://production.pop.culture.gouv.fr/auth/signin" className="alert-link">
          Lien vers la production
        </a>
      </Alert>
    );
  }

  renderMEPalert(){
    return (
      <Alert
        style={{ marginBottom: "0px" }}
        color="danger"
        isOpen={this.state.alertMEP}
        toggle={() => this.setState({ alertMEP: false })}
      >
        Attention : en raison d’une montée de version, l’application POP sera indisponible à 
        partir de 18h le 3 Juillet. POP sera de nouveau disponible à partir du 4 Juillet 9h.
        Veuillez nous excuser pour la gêne occasionnée. 
      </Alert>
    );
  }


  render() {
    if (this.props.user === undefined) {
      return <Loader />;
    }
    return (
      <div>
        {this.renderAlert()}
        {this.renderMEPalert()}
        <PublicRoutes history={history} />;
      </div>
    );
  }
}

const mapstatetoprops = ({ Auth }) => ({ user: Auth.user });

export default connect(
  mapstatetoprops,
  { signinByToken }
)(App);
