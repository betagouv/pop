import React from "react";
import { Table } from "reactstrap";
import CreateUser from "./createUser";
import UpdateUser from "./UpdateUser";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import api from "../../services/api";

import "./index.css";

class Admin extends React.Component {
  state = {
    users: [],
    loading: true
  };

  async fetchUsers() {
    this.setState({ loading: true });
    const users = await api.getUsers(this.props.group);
    this.setState({ users: users || [], loading: false });
  }

  componentWillMount() {
    this.fetchUsers();
  }

  renderUsers() {
    return (
      <Table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Groupe</th>
            <th>Institution</th>
            <th>Role</th>
            <th>Dernière connexion</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {this.state.users.map(user => {
            const {
              email,
              prenom,
              nom,
              role,
              lastConnectedAt,
              institution,
              group,
              museofile
            } = user;
            const date = new Date(lastConnectedAt);
            const lastCo = lastConnectedAt
              ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
              : "jamais";
            return (
              <tr key={email}>
                <td>{nom}</td>
                <td>{prenom}</td>
                <td className="admin-email">{email}</td>
                <td>{group === "joconde" && museofile ? `${group} ${museofile}` : group}</td>
                <td>{institution}</td>
                <td>{role}</td>
                <td>{lastCo}</td>
                <td>
                  <UpdateUser user={user} callback={this.fetchUsers} />
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
      <div className="admin">
        <CreateUser />
        <div className="usersList">{this.renderUsers()}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ Auth }) => {
  return {
    group: Auth.user ? Auth.user.group : "",
    role: Auth.user ? Auth.user.role : ""
  };
};

export default connect(
  mapStateToProps,
  {}
)(Admin);
