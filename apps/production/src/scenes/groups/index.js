import React from "react";
import { Table } from "reactstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import api from "../../services/api";

import "./index.css";
import CreateGroup from "./createGroup";
import UpdateGroup from "./updateGroup";

//import UpdateProducteur from "./UpdateProducteur";

class Groups extends React.Component {
  state = { 
    groups: [],
    producteurs: [],
    loading: true 
  };

  fetchGroups = async () => {
    this.setState({ loading: true });
    const response = await api.getGroups();
    this.setState({ groups: response.groups || [], loading: false });
  };

  fetchProducteurs = async () => {
    this.setState({ loading: true });
    const response = await api.getProducteurs();
    this.setState({ producteurs: response.producteurs || [], loading: false });
  };

  componentDidMount(){
    this.fetchProducteurs();
  }

  componentWillMount() {
    this.fetchGroups();
  }

  renderGroups() {
    return (
      <Table>
        <thead>
          <tr>
            <th>Groupe</th>
            <th>Producteurs associés</th>
          </tr>
        </thead>
        <tbody>
          {this.state.groups.map(group => {
            const _id = group._id;
            const label = group.LABEL;
            const prods = group.PRODUCTEURS;
            return (
              <tr key={_id}>
                <td>{label}</td>
                <td>{prods.map(item => <tr>{item}</tr>)}</td>
                <td>
                   <UpdateGroup label={label} producteurList={prods} producteurs={this.state.producteurs} _id={_id} callback={this.fetchGroups} />
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
      <div className="groups">
        <CreateGroup producteurs={this.state.producteurs} callback={this.fetchGroups} />
        <div className="producteurList">{this.renderGroups()}</div>
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
)(Groups);
