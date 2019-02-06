import React from "react";
import { Button, Modal, Input, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { WithContext as ReactTags } from "react-tag-input";
import api from "../../services/api";
import "./createUser.css";
import { toastr } from "react-redux-toastr";

class UpdateUser extends React.Component {
  state = {
    modal: false,
    currentMuseo: "",
    email: this.props.user.email,
    prenom: this.props.user.prenom,
    nom: this.props.user.nom,
    institution: this.props.user.institution,
    group: this.props.user.group,
    role: this.props.user.role,
    museofile: this.props.user.museofile,
    loading: false,
    error: ""
  };

  handleClick = e => {
    e.preventDefault();
    this.setState({ modal: true });
  };

  async updateUser() {
    this.setState({ loading: true });
    const { group, email, role, institution, prenom, nom, museofile } = this.state;

    if (group === "admin" && role !== "administrateur") {
      const error = "Les membres du groupe « admin » doivent avoir le rôle « administrateur »";
      this.setState({ error });
      return;
    }

    if (group === "joconde" && role === "producteur" && !this.state.museofile.length) {
      const error = "Le code muséo est obligatoire. ";
      this.setState({ error });
      return;
    }
    try {
      await api.updateProfile(email, nom, prenom, institution, group, role, museofile);
    } catch (e) {
      this.setState({
        error: "Impossible de mettre a jour le profil. Veuillez contacter votre administrateur "
      });
      return;
    }

    this.setState({ modal: false });
    toastr.success("Les informations ont été enregistrées.");
    this.props.callback();
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
        <ReactTags
          tags={this.state.museofile.map(e => ({ id: e, text: e }))}
          placeholder="Exemple : M5043"
          handleInputBlur={() => {
            // They sometime forget to do enter when they write a new entry...
            if (this.state.currentMuseo) {
              this.setState({ museofile: [...this.state.museofile, this.state.currentMuseo] });
              this.setState({ currentMuseo: "" });
            }
          }}
          handleInputChange={currentMuseo => {
            this.setState({ currentMuseo });
          }}
          handleDelete={i => {
            const { museofile } = this.state;
            this.setState({ museofile: museofile.filter((tag, index) => index !== i) });
          }}
          handleAddition={({ text }) => {
            this.setState({ museofile: [...this.state.museofile, text] });
          }}
        />
      </div>
    );
  }

  renderModal() {
    let groups = [];

    if (this.props.authUserGroup === "admin") {
      groups = groups.concat(["admin", "mnr", "joconde", "mh", "inv", "memoire"]);
    } else {
      groups.push(this.props.authUserGroup);
    }
    groups = groups.map(e => <option key={e}>{e}</option>);

    let roles = [];
    if (this.props.authUserRole === "administrateur") {
      roles = roles.concat(["administrateur", "producteur", "utilisateur"]);
    }

    roles = roles.map(e => <option key={e}>{e}</option>);
    const { prenom, nom, email, institution, group, role } = this.state;

    return (
      <Modal isOpen={this.state.modal} toggle={() => this.setState({ modal: !this.state.modal })}>
        <h3>
          Modifier {prenom} {nom}
        </h3>
        <div className="error">{this.state.error}</div>
        <div className="input-container">
          <div>
            <div>Email</div>
            <Input value={email} disabled />
          </div>
        </div>
        <Row>
          <Col sm="6">
            <div className="input-container">
              <div>Prénom</div>
              <Input value={prenom} onChange={e => this.setState({ prenom: e.target.value })} />
            </div>
          </Col>
          <Col sm="6">
            <div className="input-container">
              <div>Nom</div>
              <Input value={nom} onChange={e => this.setState({ nom: e.target.value })} />
            </div>
          </Col>
        </Row>
        <div className="input-container">
          <div>Institution</div>
          <Input
            value={institution}
            onChange={e => this.setState({ institution: e.target.value })}
          />
        </div>
        <Row>
          <Col sm="6">
            <div className="input-container">
              <div>Groupe</div>
              <Input
                type="select"
                value={group}
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
                value={role}
                onChange={e => this.setState({ role: e.target.value })}
              >
                {roles}
              </Input>
            </div>
          </Col>
        </Row>
        {this.museofile()}
        <div className="button-container">
          <Button color="primary" onClick={this.updateUser.bind(this)}>
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
