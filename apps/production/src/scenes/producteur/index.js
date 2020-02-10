import React from "react";
import { Table } from "reactstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import api from "../../services/api";

import "./index.css";
import CreateProducteur from "./createProducteur";
import UpdateProducteur from "./UpdateProducteur";


class Producteur extends React.Component {
  state = { producteurs: [], loading: true };

  fetchProducteurs = async () => {
    this.setState({ loading: true });
    try {
      const response = await api.getProducteurs();
      this.setState({ producteurs: response.producteurs || [], loading: false });
    } catch (e) {
      //To complete
    }
  };

  componentWillMount() {
    this.fetchProducteurs();
  }

  renderProducteurs() {
    return (
      <Table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Base</th>
          </tr>
        </thead>
        <tbody>
          {this.state.producteurs.map(producteur => {
            const {
              _id,
              LABEL,
              BASE
            } = producteur;
            return (
              <tr key={_id}>
                <td>{LABEL}</td>
                <td>{BASE}</td>
                <td>
                  <UpdateProducteur producteur={producteur} callback={this.fetchProducteurs} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }

  render() {
    if (this.props.role !== "administrateur") {
      return <Redirect to="/recherche" />;
    }
    return (
      <div className="producteur">
        <CreateProducteur callback={this.fetchProducteurs} />
        <div className="producteurList">{this.renderProducteurs()}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ Auth }) => {
  return { role: Auth.user ? Auth.user.role : "" };
};

export default connect(
  mapStateToProps,
  {}
)(Producteur);
