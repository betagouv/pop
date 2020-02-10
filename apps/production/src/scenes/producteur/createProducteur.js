import React from "react";
import { Button, Modal, Input, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import ReactTags from "react-tag-input";
import api from "../../services/api";
import "./createProducteur.css";

const Tags = ReactTags.WithContext;

class CreateProducteur extends React.Component {
    state = {
        modal: false,
        LABEL: "",
        BASE: "",
        taginput: ""
    };

  async createProducteur() {
        this.setState({ loading: true });
        let { LABEL, BASE } = this.state;
        try {
            await api.createProducteur({ LABEL, BASE });
            this.setState({ modal: false });
            toastr.success("Le producteur a été ajouté.");
            this.props.callback();
        } catch (error) {
            this.setState({ error: error.msg });
        }
    }


  renderModal() {
        return (
        <Modal isOpen={this.state.modal} toggle={() => this.setState({ modal: !this.state.modal })}>
            <h3>Ajouter un nouveau producteur</h3>
            <div className="error">{this.state.error}</div>
            <div className="input-container">
                <div>
                    <div>Nom du producteur</div>
                    <Input
                    value={this.state.LABEL}
                    onChange={e => this.setState({ LABEL: e.target.value })}
                    />
                </div>
            </div>
            <div className="input-container">
                <div>
                    <div>Base</div>
                    <Input
                    value={this.state.BASE}
                    onChange={e => this.setState({ BASE: e.target.value })}
                    />
                </div>
            </div>
            <div className="button-container">
            <Button color="primary" onClick={this.createProducteur.bind(this)}>
                Créer
            </Button>
            </div>
        </Modal>
        );
    }

  render() {
        return (
            <div className="createProducteur">
                {this.renderModal()}
                <Button className="button" color="primary" onClick={() => this.setState({ modal: true })}>
                Créer un nouveau producteur
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
)(CreateProducteur);
