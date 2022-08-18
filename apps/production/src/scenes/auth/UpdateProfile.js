import React, { Component } from "react";
import { Container, Button, Input } from "reactstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { toastr } from "react-redux-toastr";

import api from "../../services/api";
import Loader from "../../components/Loader";
import authAction from "./../../redux/auth/actions";
const { logout, signinByToken } = authAction;
import { message_info_password } from "../../config";

class UpdateProfile extends Component {
  state = {
    pwd: "",
    pwd1: "",
    pwd2: "",
    loading: false,
    done: false,
    error: "",
    hasResetPassword: false,
    nom: "",
    prenom: "",
    institution: ""
  };

  componentWillMount() {
    const { user } = this.props;
    if (user) {
      const { hasResetPassword, nom, prenom, institution } = user;
      this.setState({
        hasResetPassword,
        nom,
        prenom,
        institution
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    const { user: prevUser } = prevProps;
    if (user && user !== prevUser) {
      const { hasResetPassword, nom, prenom, institution } = user;
      this.setState({
        hasResetPassword,
        nom,
        prenom,
        institution
      });
    }
  }

  resetPasswordMessage() {
    if (this.props.hasResetPassword) {
      return <div />;
    }
    return (
      <p>
        Vous n&apos;avez pas encore chang&eacute; votre mot de passe. Pour votre
        s&eacute;curit&eacute;, vous devez le changer avant de continuer.
      </p>
    );
  }

  passwordSecurity(){
    return (
      <p>
        { message_info_password }
      </p>
    );
  }

  updateProfile = async () => {
    const { email, logout, user } = this.props;
    const { nom, prenom, institution, group, role, museofile } = user;
    const { nom: stateNom, prenom: statePrenom, institution: stateInstitution } = this.state;
    const { pwd, pwd1, pwd2 } = this.state;
    const hasChangedPassword = pwd !== "" && pwd1 !== "" && pwd2 !== "";
    const hasChangedProfileInfo =
      nom !== stateNom || prenom !== statePrenom || institution !== stateInstitution;

    this.setState({ loading: true });

    if (hasChangedProfileInfo) {
      try {
        await api.updateUser({
          email,
          nom: stateNom,
          prenom: statePrenom,
          institution: stateInstitution,
          group,
          role,
          museofile
        });
        await this.props.signinByToken();
      } catch (e) {
        this.setState({ error: e.msg, loading: false, done: false });
        return;
      }
    }

    if (hasChangedPassword) {
      try {
        await api.updatePassword({ email, pwd, pwd1, pwd2 });
      } catch (e) {
        this.setState({ error: e.msg, loading: false, done: false });
        return;
      }
    }

    if (hasChangedPassword) {
      toastr.success(
        "Votre mot de passe à été changé.",
        "Vous allez être deconnecté dans 5 secondes…"
      );
      setTimeout(() => logout(), 5000);
    } else if (hasChangedProfileInfo) {
      toastr.success("Vos informations ont été enregistrées.");
    }
    this.setState({ loading: false, done: true, hasChangedPassword: !!hasChangedPassword });
  };

  lastConnectedAt() {
    if (!this.props.lastConnectedAt) {
      return <div />;
    }
    return (
      <p className="lastConnectedAt">
        <em>
          Date de dernière connection:{" "}
          {new Date(this.props.lastConnectedAt).toLocaleString("fr-FR")}
        </em>
      </p>
    );
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  renderMuseo() {
    if (this.props.user.museofile && this.props.user.museofile.length) {
      return (
        <div>
          <h4>Mes informations Museo</h4>
          <br />
          Code(s) : {this.props.user.museofile.join(", ")}
          <hr />
        </div>
      );
    }
    return <div />;
  }
  render() {
    const { email, location } = this.props;
    const { loading, done, error, nom, prenom, institution } = this.state;

    if (loading) {
      return <Loader />;
    }

    if (done) {
      return <Redirect to="/recherche" />;
    }

    // If the user is not logged in, she should not have access to the page.
    // It's a restricted page.
    if (!email) {
      return <Redirect to={{ pathname: "/auth/signin", state: { from: location } }} />;
    }

    return (
      <Container className="signin">
        <div className="block">
          <h1>Modifier mes informations</h1>
          {this.resetPasswordMessage()}
          <div className="error-message">{error}</div>
          <div className="sub-block">
            <h4>Mon descriptif</h4>
            <input
              className="input-field"
              placeholder="Mon nom"
              type="text"
              value={nom}
              onChange={this.handleChange("nom")}
            />
            <input
              className="input-field"
              placeholder="Mon prénom"
              type="text"
              value={prenom}
              onChange={this.handleChange("prenom")}
            />
            <input
              className="input-field"
              placeholder="Institution"
              type="text"
              value={institution}
              onChange={this.handleChange("institution")}
            />
          </div>
          <hr />
          {this.renderMuseo()}
          <div className="sub-block">
            <h4>Mon mot de passe</h4>
            <input
              className="input-field"
              placeholder="Mot de passe actuel"
              type="password"
              value={this.state.pwd}
              onChange={e => this.setState({ pwd: e.target.value })}
            />
            <input
              className="input-field"
              placeholder="Nouveau Mot de passe"
              type="password"
              value={this.state.pwd1}
              onChange={e => this.setState({ pwd1: e.target.value })}
            />
            <input
              className="input-field"
              placeholder="Nouveau Mot de passe (confirmation)"
              type="password"
              value={this.state.pwd2}
              onChange={e => this.setState({ pwd2: e.target.value })}
            />
          </div>
          {this.passwordSecurity()}
          <hr />
          <Button className="submit-button" onClick={this.updateProfile}>
            Mettre &agrave; jour mes informations
          </Button>
          {this.lastConnectedAt()}
        </div>
      </Container>
    );
  }
}

const mapStateToProps = ({ Auth }) => {
  return {
    user: Auth.user ? Auth.user : null,
    email: Auth.user ? Auth.user.email : "",
    hasResetPassword: Auth.user ? Auth.user.hasResetPassword : false,
    lastConnectedAt: Auth.user ? Auth.user.lastConnectedAt : null
  };
};

export default connect(
  mapStateToProps,
  { logout, signinByToken }
)(UpdateProfile);
