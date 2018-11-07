import React, { Component } from "react";
import { Container, Button, Input } from "reactstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { history } from "../../redux/store";

import api from "../../services/api";
import Loader from "../../components/loader";

import authAction from "./../../redux/auth/actions";
const { logout } = authAction;

class UpdateProfile extends Component {
  state = {
    ppwd: "",
    ppwd1: "",
    ppwd2: "",
    loading: false,
    done: false,
    error: "",
    hasResetPassword: false,
    nom: "",
    prenom: "",
    institution: "",
    group: "",
    role: "",
    hasChangedPassword: false,
  };

  componentWillMount() {
    const { user } = this.props;
    if(user) {
      const { hasResetPassword, nom, prenom, institution, group, role } = user;
      this.setState({ hasResetPassword, nom, prenom, institution, group, role });
    }
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    const { user: prevUser } = prevProps;
    if(user && user !== prevUser) {
      const { hasResetPassword, nom, prenom, institution, group, role } = user;
      this.setState({ hasResetPassword, nom, prenom, institution, group, role });
    }
  }

  resetPasswordMessage() {
    if (this.props.hasResetPassword) {
      return <div />;
    }
    return (
      <p>
        Vous n&apos;avez pas encore chang&eacute; votre mot de passe. Pour votre s&eacute;curit&eacute;,
        vous devez le changer avant de continuer.
      </p>
    );
  }


  updateProfile = ()=> {
    const { email, logout, user } = this.props;
    const { nom, prenom, institution, group, role } = user;
    const { 
      ppwd,
      ppwd1, 
      ppwd2, 
      nom: stateNom, 
      prenom: statePrenom, 
      institution: stateInstitution, 
      group: stateGroup, 
      role: stateRole,
    } = this.state;
    
    const hasChangedPassword = (ppwd !== "" && ppwd1 !== "" && ppwd2 !== "");
    const hasChangedProfileInfo = (nom !== stateNom || prenom !== statePrenom || institution !== stateInstitution || group !== stateGroup || role !== stateRole);
    let promise = Promise.resolve();

    if(hasChangedProfileInfo) {
      promise = promise.then(() => {
        return api.updateProfile(email, nom, prenom, institution, group, role);
      });
    }

    if(hasChangedPassword) {
      promise = promise.then(() => {
        return api.updatePassword(email, ppwd, ppwd1, ppwd2);
      });
    }

    this.setState({ loading: true });
    promise = promise.then(() => {
      this.setState({ loading: false, done: true, hasChangedPassword: !!(hasChangedPassword) });
      if(hasChangedPassword) {
        setTimeout(() => logout(), 5000);
      }
      this.setState({ loading: false, done: true });
      return Promise.resolve();
    });
  
    return promise.catch((e) => {
        this.setState({ error: e, loading: false, done: false });
    });
  }

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

  renderGroups = ()=>{
    const { group } = this.state;
    let groupes = [];

    if (group === "admin") {
      groupes = groupes.concat([
        "admin",
        "mnr",
        "joconde",
        "mh",
        "inv",
        "memoire"
      ]);
    } else {
      groupes.push(group);
    }
    return groupes.map((e,i) => <option key={`${e}${i}`}>{e}</option>);
  }

  renderRoles = ()=> {
    const { group, role } = this.state;
    let roles = [];
    if (role === "administrateur" || group === "admin") {
      roles = roles.concat(["utilisateur", "producteur", "administrateur"]);
    }

    return roles.map((e,i) => <option key={`${e}${i}`}>{e}</option>);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { email, location } = this.props;
    const { loading, done, error, nom, prenom, institution, group, role, hasChangedPassword } = this.state;
    
    if (loading) {
      return <Loader />;
    }

    if (done) {
      return (
        <Container className="signin">
          <div>
            {
              hasChangedPassword
              ? (
                  `Votre mot de passe à été changé.
                  Vous allez être deconnecté dans 5 secondes ...`
                )
              :
                (
                  `Vos informations ont été changées.`
                )

            }
          </div>
        </Container>
      );
    }

    //If the user is not login, he shouldnt have access to the page. Its a restricted page
    if (!email) {
      return (
        <Redirect
          to={{
            pathname: "/auth/signin",
            state: { from: location }
          }}
        />
      );
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
              onChange={this.handleChange('nom')}
            />
            <input
              className="input-field"
              placeholder="Mon prénom"
              type="text"
              value={prenom}
              onChange={this.handleChange('prenom')}
            />
            <input
              className="input-field"
              placeholder="Institution"
              type="text"
              value={institution}
              onChange={this.handleChange('institution')}
            />
          </div>
          <hr /> 
          <div className="sub-block">
          <h4>Mes groupes et roles</h4>
            {
              (group === "admin")
              ? (
                <Input
                  type="select"
                  value={group}
                  onChange={this.handleChange('group')}
                  className="input-field select-field"
                >
                  {this.renderGroups()}
                </Input>
                )
              : null  
            }
            {
              (role === "administrateur" || group === "admin")
              ? (
                <Input
                  type="select"
                  value={role}
                  onChange={this.handleChange('role')}
                  className="input-field select-field"
                >
                  {this.renderRoles()}
                </Input>
                ) 
              : null
            }
          </div>
          <hr /> 
          <div className="sub-block">
            <h4>Mon mot de passe</h4>
            <input
              className="input-field"
              placeholder="Mot de passe actuel"
              type="password"
              value={this.state.ppwd}
              onChange={e => this.setState({ ppwd: e.target.value })}
            />
            <input
              className="input-field"
              placeholder="Nouveau Mot de passe"
              type="password"
              value={this.state.ppwd1}
              onChange={e => this.setState({ ppwd1: e.target.value })}
            />
            <input
              className="input-field"
              placeholder="Nouveau Mot de passe (confirmation)"
              type="password"
              value={this.state.ppwd2}
              onChange={e => this.setState({ ppwd2: e.target.value })}
            />
          </div>
          <hr /> 
          <Button
            className="submit-button"
            onClick={this.updateProfile}
          >
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
    lastConnectedAt: Auth.user ? Auth.user.lastConnectedAt : null,
  };
};

export default connect(
  mapStateToProps,
  { logout }
)(UpdateProfile);
