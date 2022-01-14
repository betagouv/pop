import React from "react";
import { Alert } from "reactstrap";
import Loader from "./components/Loader";
import { history } from "./redux/store";
import PublicRoutes from "./router";
import Actions from "./redux/auth/actions";
const { signinByToken } = Actions;

import { connect } from "react-redux";

class App extends React.Component {
  state = { alert: process.env.NODE_ENV !== "production", maintenance: process.env.MAINTENANCE };
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

  renderAlertMaintenance() {
    return (
      <Alert
        style={{ marginBottom: "0px" }}
        color="warning"
        isOpen={this.state.maintenance == true}
      >
        Une mise à jour est en cours actuellement, le service de versement ou de mise-à-jour de notices est indisponible.
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
        {this.renderAlertMaintenance()}
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
