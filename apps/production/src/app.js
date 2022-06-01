import React from "react";
import { Alert } from "reactstrap";
import Loader from "./components/Loader";
import { history } from "./redux/store";
import PublicRoutes from "./router";
import Actions from "./redux/auth/actions";
import API from './services/api';
const { signinByToken } = Actions;

import { connect } from "react-redux";

const message_maintenance = "Une opération de maintenance est en cours. Elle peut fausser l’affichage des résultats. Nous vous présentons nos excuses pour la gêne occasionnée. L’opération devrait être finie le 12 avril 2022";

class App extends React.Component {
  state = { alert: process.env.NODE_ENV !== "production", maintenance: "FALSE" };

  componentWillMount() {
    this.props.signinByToken();
    this.isMaintenanceSite();

    /**
     * Ajout de l'application dans la requête E-S pour ne pas filtrer les champs
     */
    (function() {
      const origSend = XMLHttpRequest.prototype.send;
       XMLHttpRequest.prototype.send = function(data) {
         this.setRequestHeader('Application', 'bo-pop-prod');
         origSend.apply(this, arguments)
       };
     })();
  }

  async isMaintenanceSite(){
    const response = await API.getMaintenance();
    this.setState({ maintenance: response.maintenance });
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
        style={{ marginBottom: "0px", textAlign: "center" }}
        color="warning"
        isOpen={this.state.maintenance == "TRUE"}
      >
        { message_maintenance }
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
