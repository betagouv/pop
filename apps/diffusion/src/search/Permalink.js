import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import API from "../services/api";

class Permalink extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modal: false, href: null };
  }

  handleClick = async () => {
    const result = await API.createGallery(this.props.query);
    const data = await result.json();
    this.setState({ href: "https://pop.culture.gouv.fr/gallery/" + data._id });
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      href: prevState.href && prevState.modal ? null : prevState.href
    }));
  };

  isEmpty(obj) {
    return Object.entries(obj).length === 0 && obj.constructor === Object;
  }

  render() {
    const { view, mode, base, ...rest } = this.props.query;
    if (this.isEmpty(rest)) {
      return null;
    }
    return (
      <div className="permalink">
        <div className="text-center">
          <button className="btn btn-sm btn-link" onClick={this.toggle}>
            <img src="/static/share.svg" width="18" />
          </button>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Partager la recherche</ModalHeader>
          <ModalBody>
            <div className="modal-body-container">
              {!this.state.href ? (
                <button className="btn btn-link" onClick={this.handleClick}>
                  Générer un permalien
                </button>
              ) : (
                <div className="text-center pt-2">
                  <small>{this.state.href}</small>
                </div>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={this.toggle}>
              OK
            </button>{" "}
            <button className="btn" onClick={this.toggle}>
              Annuler
            </button>
          </ModalFooter>
        </Modal>
        <style jsx>{`
          .permalink {
            position: absolute;
            right: 30px;
          }
          .modal-body-container {
            height: 40px;
          }
        `}</style>
      </div>
    );
  }
}

export default Permalink;
