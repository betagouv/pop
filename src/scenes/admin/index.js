import React from "react";
import { Table } from "reactstrap";
import CreateUser from "./createUser";
import { connect } from "react-redux";
import api from "../../services/api";

import "./index.css";

class Admin extends React.Component {
  state = {
    users: [],
    loading: true
  };

  componentWillMount() {
    this.setState({ loading: true });
    api.getUsers(this.props.group).then(users => {
      this.setState({ users: users || [], loading: false });
    });
  }

  renderUsers() {
    return <Table>
      <thead>
        <tr>
          <th>Email</th>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Groupe</th>
          <th>Institution</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {this.state.users.map(user => {
          const { email, prenom, nom, role, institution, group } = user;
          return (
            <tr key={email}>
              <td>{email}</td>
              <td>{nom}</td>
              <td>{prenom}</td>
              <td>{group}</td>
              <td>{institution}</td>
              <td>{role}</td>
            </tr>
          );
        })}
      </tbody>
      </Table>
    ;
  }

  render() {
    return (
      <div className="admin">
        <CreateUser />
        <div className="usersList">
          {this.renderUsers()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ Auth }) => {
  return {
    group: Auth.user ? Auth.user.group : ""
  };
};

export default connect(
  mapStateToProps,
  {}
)(Admin);
