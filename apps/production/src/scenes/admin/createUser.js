import React from "react";
import { Button, Modal, Input, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import api from "../../services/api";
import "./createUser.css";

class CreateUser extends React.Component {
  state = {
    modal: false,
    email: "",
    prenom: "",
    nom: "",
    institution: "",
    group: this.props.group,
    role: this.props.role,
    loading: false,
    error: "",
    museofile: null
  };

  createUser() {
    this.setState({ loading: true });
    const {
      group,
      email,
      role,
      institution,
      prenom,
      nom,
      museofile
    } = this.state;
    if (group === "admin" && role !== "administrateur") {
      this.setState({
        error:
          "Les membres du groupe « admin » doivent avoir le rôle « administrateur »"
      });
      return;
    }
    api
      .createUser(email, group, role, institution, prenom, nom, museofile)
      .then(() => {
        this.setState({ modal: false });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  museofile() {
    if (this.state.group !== "joconde" || this.state.role !== "producteur") {
      return <div />;
    }

    return (
      <div className="input-container">
        <div>
          Code Musée<em class="text-muted"> - MUSEOFILE</em>
        </div>
        <Input
          value={this.state.museofile}
          placeholder="Exemple : M5043"
          onChange={e => this.setState({ museofile: e.target.value })}
        />
      </div>
    );
  }

  renderModal() {
    let groups = [];

    if (this.props.group === "admin") {
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
      groups.push(this.props.group);
    }
    groups = groups.map(e => <option key={e}>{e}</option>);

    let roles = [];
    if (this.props.role === "administrateur") {
      roles = roles.concat(["administrateur", "producteur", "utilisateur"]);
    }

    roles = roles.map(e => <option key={e}>{e}</option>);

    return (
      <Modal
        isOpen={this.state.modal}
        toggle={() => this.setState({ modal: !this.state.modal })}
      >
        <h3>Ajouter un nouvel utilisateur</h3>
        <div className="error">{this.state.error}</div>
        <div className="input-container">
          <div>
            <div>Email</div>
            <Input
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </div>
        </div>
        <Row>
          <Col sm="6">
            <div className="input-container">
              <div>Prénom</div>
              <Input
                value={this.state.prenom}
                onChange={e => this.setState({ prenom: e.target.value })}
              />
            </div>
          </Col>
          <Col sm="6">
            <div className="input-container">
              <div>Nom</div>
              <Input
                value={this.state.nom}
                onChange={e => this.setState({ nom: e.target.value })}
              />
            </div>
          </Col>
        </Row>
        <div className="input-container">
          <div>Institution</div>
          <Input
            value={this.state.institution}
            onChange={e => this.setState({ institution: e.target.value })}
          />
        </div>
        <Row>
          <Col sm="6">
            <div className="input-container">
              <div>Groupe</div>
              <Input
                type="select"
                value={this.state.group}
                onChange={e => this.setState({ group: e.target.value })}
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
                value={this.state.role}
                onChange={e => this.setState({ role: e.target.value })}
              >
                {roles}
              </Input>
            </div>
          </Col>
        </Row>
        {this.museofile()}
        <div className="button-container">
          <Button color="primary" onClick={this.createUser.bind(this)}>
            Créer
          </Button>
        </div>
      </Modal>
    );
  }
  render() {
    return (
      <div className="createUser">
        {this.renderModal()}
        <Button
          className="button"
          color="primary"
          onClick={() => this.setState({ modal: true })}
        >
          Créer un nouvel utilisateur
        </Button>
      </div>
    );
  }
}

const mapStateToProps = ({ Auth }) => {
  return {
    group: Auth.user ? Auth.user.group : "",
    role: Auth.user ? Auth.user.role : "utilisateur"
  };
};

export default connect(
  mapStateToProps,
  {}
)(CreateUser);
