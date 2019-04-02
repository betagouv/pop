import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import API from "../services/api";

class Permalink extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modal: false, link: null };
  }

  handleClick = async () => {
    try {
      const result = await API.createGallery(this.props.query);
      const data = await result.json();
      const {protocol, host} = window.location;
      this.setState({  link: `${protocol}//${host}/gallery/${data._id}` });
    } catch (e) {
      this.setState({ link: "La génération du permalien a échoué." });
    }
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      link: prevState.link && prevState.modal ? null : prevState.link
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
              {!this.state.link ? (
                <button className="btn btn-link" onClick={this.handleClick}>
                  Générer un permalien
                </button>
              ) : (
                <div className="text-center pt-2">
                  <small>{this.state.link}</small>
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
            margin-top: -2px;
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
