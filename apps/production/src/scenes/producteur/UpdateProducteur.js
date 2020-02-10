import React from "react";
import { Button, Modal, Input, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";

import api from "../../services/api";
import "./createProducteur.css";
import Tags from "../../components/Tags";

class UpdateProducteur extends React.Component {
  state = {
    modal: false,
    _id: this.props.producteur._id,
    LABEL: this.props.producteur.LABEL,
    BASE: this.props.producteur.BASE,
    error: ""
  };

  handleClick = e => {
    e.preventDefault();
    this.setState({ modal: true });
  };

  async updateProducteur() {
    try {
      this.setState({ loading: true });
      const { _id, LABEL, BASE } = this.state;
      await api.updateProducteur({ _id, LABEL, BASE });
      this.setState({ modal: false, error: "" });
      toastr.success("Les informations ont été enregistrées.");
      this.props.callback();
    } catch (error) {
      this.setState({ error: error.msg });
    }
  }

  async deleteProducteur() {
    try {
      this.setState({ loading: true });
      const confirmText =
        "Vous êtes sur le point de supprimer ce producteur. Souhaitez-vous continuer ?";
      const toastrConfirmOptions = {
        onOk: async () => {
          console.log(this.state);
          await api.deleteProducteur(this.state._id);
          this.setState({ modal: false, error: "" });
          toastr.success("Le producteur a été supprimé");
          this.props.callback();
        }
      };
      toastr.confirm(confirmText, toastrConfirmOptions);
    } catch (error) {
      this.setState({ error: error.msg });
    }
  }

  renderModal() {
    const { _id, LABEL, BASE } = this.state;

    return (
      <Modal isOpen={this.state.modal} toggle={() => this.setState({ modal: !this.state.modal })}>
        <h3>
          Modifier {LABEL}
        </h3>
        <div className="error">{this.state.error}</div>
        <div className="input-container">
          <div>
            <div>Nom du producteur</div>
            <Input value={LABEL} onChange={e => this.setState({ LABEL: e.target.value })} />
          </div>
        </div>
        <div className="input-container">
          <div>
            <div>Base</div>
            <Input value={BASE} onChange={e => this.setState({ BASE: e.target.value })} />
            </div>
        </div>

        <div className="button-container">
          <Button color="primary" onClick={this.updateProducteur.bind(this)}>
            Enregistrer les modifications
          </Button>
          <Button color="danger" className="ml-3" onClick={this.deleteProducteur.bind(this)}>
            Supprimer
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
)(UpdateProducteur);
