import React, { Component } from "react";
import { Container, FormGroup, Label, Form, Input } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Loader from "../../components/Loader";
import API from "../../services/api";
import { toastr } from "react-redux-toastr";
import { Mapping } from "pop-shared";

import "./index.css";

const hiddenFields = ["_id", "location.lon", "location.lat", "__v", "POP_COMMENTAIRES", "REF"];

class Museo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      museo: null,
      error: null
    };
  }

  async componentDidMount() {
    const userMuseo = this.props.user.museo;
    const museo = userMuseo && (await API.getMuseo(userMuseo));
    this.props.initialize(museo);
    this.setState({ museo });
  }

  async onSubmit(values) {
    const museo = await API.updateMuseo(this.state.museo.REF, values);
    this.setState({ museo });
    toastr.success(
      "Modification enregistrée",
      "La modification sera visible dans 1 à 5 min en diffusion"
    );
  }

  render() {
    const { user, location } = this.props;
    const { museo } = this.state;

    if (!user) {
      return <Redirect to={{ pathname: "/auth/signin", state: { from: location } }} />;
    } else if (!museo) {
      return <Loader />;
    }

    return (
      <Container>
        <br />
        

        <div className="museo">
        <h1 className="mb-5 mt-3">Modifier les informations du musée {museo.REF}</h1>
          <Form
            onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}
            className="main-body w-100"
          >
            {Object.entries(Mapping.museo)
              .filter(([key, _val]) => !hiddenFields.includes(key))
              .map(([k, v]) => {
                return (
                  <FormGroup key={k}>
                    <Label for={k}>
                      {v.label ? (
                        <span>
                          {v.label}
                          <small className="text-muted"> - {k}</small>
                        </span>
                      ) : (
                        k
                      )}
                    </Label>
                    <Field name={k} component={"input"} className="form-control" type="text" />
                  </FormGroup>
                );
              })}
            <button type="submit" className="btn btn-success">
              Enregistrer
            </button>
            <a href="/" className="btn btn-link">
              Annuler
            </a>
          </Form>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = ({ Auth }) => {
  return {
    user: Auth.user ? Auth.user : null
  };
};

export default connect(
  mapStateToProps,
  {}
)(reduxForm({ form: "museo" })(Museo));
