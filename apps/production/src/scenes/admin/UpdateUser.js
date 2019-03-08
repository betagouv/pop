import React from "react";
import { Button, Modal, Input, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import api from "../../services/api";
import "./createUser.css";
import { toastr } from "react-redux-toastr";

class UpdateUser extends React.Component {
  state = {
    modal: false,
    user: {
      email: this.props.user.email,
      prenom: this.props.user.prenom,
      nom: this.props.user.nom,
      institution: this.props.user.institution,
      group: this.props.user.group,
      role: this.props.user.role,
      museofile: this.props.user.museofile
    },
    loading: false,
    error: ""
  };

  handleClick = e => {
    e.preventDefault();
    this.setState({ modal: true });
  };

  updateUser = () => {
    this.setState({ loading: true });
    const {
      group,
      email,
      role,
      institution,
      prenom,
      nom,
      museofile
    } = this.state.user;
    if (group === "admin" && role !== "administrateur") {
      const errorText =
        "Les membres du groupe « admin » doivent avoir le rôle « administrateur »";
      this.setState({ error: errorText });
      return;
    }
    api
      .updateProfile(email, nom, prenom, institution, group, role, museofile)
      .then(() => {
        this.setState({ modal: false });
        toastr.success("Les informations ont été enregistrées.");
        this.props.callback();
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  museofile(user) {
    if (user.group !== "joconde" || user.role !== "producteur") {
      return <div />;
    }

    return (
      <div className="input-container">
        <div>
          Code Musée<em class="text-muted"> - MUSEOFILE</em>
        </div>
        <Input
          value={user.museofile}
          placeholder="Exemple : M5043"
          onChange={e =>
            this.setState({ user: { ...user, museofile: e.target.value } })
          }
        />
      </div>
    );
  }

  renderModal() {
    let groups = [];

    if (this.props.authUserGroup === "admin") {
      groups = groups.concat([
        "admin",
        "mnr",
        "joconde",
        "mh",
        "inv",
        "memoire",
        "enluminures"
      ]);
    } else {
      groups.push(this.props.authUserGroup);
    }
    groups = groups.map(e => <option key={e}>{e}</option>);

    let roles = [];
    if (this.props.authUserRole === "administrateur") {
      roles = roles.concat(["administrateur", "producteur", "utilisateur"]);
    }

    roles = roles.map(e => <option key={e}>{e}</option>);
    const user = this.state.user;

    return (
      <Modal
        isOpen={this.state.modal}
        toggle={() => this.setState({ modal: !this.state.modal })}
      >
        <h3>
          Modifier {user.prenom} {user.nom}
        </h3>
        <div className="error">{this.state.error}</div>
        <div className="input-container">
          <div>
            <div>Email</div>
            <Input value={user.email} disabled />
          </div>
        </div>
        <Row>
          <Col sm="6">
            <div className="input-container">
              <div>Prénom</div>
              <Input
                value={user.prenom}
                onChange={e =>
                  this.setState({ user: { ...user, prenom: e.target.value } })
                }
              />
            </div>
          </Col>
          <Col sm="6">
            <div className="input-container">
              <div>Nom</div>
              <Input
                value={user.nom}
                onChange={e =>
                  this.setState({ user: { ...user, nom: e.target.value } })
                }
              />
            </div>
          </Col>
        </Row>
        <div className="input-container">
          <div>Institution</div>
          <Input
            value={user.institution}
            onChange={e =>
              this.setState({ user: { ...user, institution: e.target.value } })
            }
          />
        </div>
        <Row>
          <Col sm="6">
            <div className="input-container">
              <div>Groupe</div>
              <Input
                type="select"
                value={user.group}
                onChange={e =>
                  this.setState({ user: { ...user, group: e.target.value } })
                }
              >
                {groups}
              </Input>
            </div>
          </Col>
          <Col sm="6">
            <div className="input-container">
              <div>Rôle</div>
              <Input
                type="select"
                value={user.role}
                onChange={e =>
                  this.setState({ user: { ...user, role: e.target.value } })
                }
              >
                {roles}
              </Input>
            </div>
          </Col>
        </Row>
        {this.museofile(user)}
        <div className="button-container">
          <Button color="primary" onClick={this.updateUser}>
            Enregistrer les modifications
          </Button>
        </div>
      </Modal>
    );
  }
  render() {
    return (
      <div>
        {this.renderModal()}
        <a href="#" onClick={this.handleClick}>
          Modifier
        </a>
      </div>
    );
  }
}

const mapStateToProps = ({ Auth }) => {
  return {
    authUserGroup: Auth.user.group,
    authUserRole: Auth.user.role
  };
};

export default connect(
  mapStateToProps,
  {}
)(UpdateUser);
