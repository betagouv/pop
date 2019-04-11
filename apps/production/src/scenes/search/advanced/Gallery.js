import React, { Component } from "react";
import queryString from "query-string";
import { connect } from "react-redux";
import { Button, Modal, Input, Row, Col } from "reactstrap";
import { toastr } from "react-redux-toastr";
import { ReactiveList } from "@appbaseio/reactivesearch";

import { bucket_url } from "../../../config.js";
import api from "../../../services/api";

class Gallery extends Component {
  state = {
    modal: false,
    name: "",
    description: "",
    view: "list",
    error: "",
    image: ""
  };

  async handleClick() {
    const params = queryString.parse(window.location.search);
    const { name, description, view, image } = this.state;
    const { institution, email } = this.props;

    if (!name) {
      this.setState({ error: "Le nom est obligatoire" });
      return;
    }

    params.mode = "advanced";
    params.base = this.props.base;
    params.view = view;

    const obj = {
      params,
      name,
      institution,
      createdBy: email,
      image,
      description
    };

    try {
      await api.createGallery(obj);
      this.setState({ modal: false });
      toastr.success(`Gallery ${this.state.name} créée`);
    } catch (e) {
      console.log("errors", e);
    }
  }
  renderModal() {
    return (
      <Modal
        isOpen={this.state.modal}
        toggle={() => this.setState({ modal: !this.state.modal })}
        size="lg"
      >
        <div className="input-container">
          <div>
            <p>
              Vous pouvez sauvegarder votre recherche actuelle. Elle sera ensuite accessible dans la
              section galerie et partageable. Cette fonctionnalitée est encore en construction ! On
              est preneurs de retours !
            </p>
            <div style={{ color: "red" }}>{this.state.error}</div>
            <div>Nom</div>
            <Input
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
            />
            <div>Description</div>
            <Input
              type="textarea"
              value={this.state.description}
              onChange={e => this.setState({ description: e.target.value })}
            />
            <div>Affichage</div>
            <select onChange={e => this.setState({ view: e.target.value })} value={this.state.view}>
              <option value="list">Liste</option>
              <option value="map">Carte</option>
              <option value="mosaic">Mosaique</option>
            </select>
            <div>Illustrer la galerie avec la notice</div>
            <Row>
              <Col md={5}>
                <img
                  style={{ width: "100%", objectFit: "contain", maxHeight: "200px" }}
                  src={this.state.image}
                />
              </Col>
              <Col md={7}>
                <ReactiveList
                  componentId="results-gallerie"
                  react={{ and: "advancedSearch" }}
                  onResultStats={(total, took) => {
                    return ``;
                  }}
                  onNoResults="Aucun résultat trouvé."
                  dataField={`${this.state.sortKey}.keyword`}
                  sortBy={this.state.sortOrder}
                  URLParams={true}
                  size={5}
                  className="search"
                  onData={e => {
                    let image = "";
                    if (this.props.base === "joconde") {
                      image = e.IMG.length && `${bucket_url}${e.IMG[0]}`;
                    } else if (this.props.base === "mnr") {
                      image = e.VIDEO.length && `${bucket_url}${e.VIDEO[0]}`;
                    } else if (this.props.base === "palissy" || this.props.base === "merimee") {
                      image = e.MEMOIRE.length && `${bucket_url}${e.MEMOIRE[0].url}`;
                    } else if (this.props.base === "enluminures") {
                      image = e.VIDEO.length && `${e.VIDEO[0]}`;
                    }
                    const style = { cursor: "pointer" };
                    if (this.state.image === image) {
                      style["fontWeight"] = "bold";
                    }

                    console.log(e);

                    return (
                      <div style={style} onClick={() => this.setState({ image })}>
                        {e.REF}
                      </div>
                    );
                  }}
                  pagination={true}
                />
              </Col>
            </Row>
          </div>
          <Button
            color="primary"
            style={{ marginTop: "10px" }}
            onClick={this.handleClick.bind(this)}
          >
            Valider
          </Button>
        </div>
      </Modal>
    );
  }

  render() {
    return (
      <div>
        {this.renderModal()}
        <Button color="primary" onClick={() => this.setState({ modal: true })}>
          Créer une galerie
        </Button>
      </div>
    );
  }
}

const mapStateToProps = ({ Auth }) => {
  const { institution, email } = Auth.user;
  return { institution, email };
};

export default connect(
  mapStateToProps,
  {}
)(Gallery);
