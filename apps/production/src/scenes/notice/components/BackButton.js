import React from "react";
import { Button } from "reactstrap";

export default class BackButton extends React.Component {
  render() {
    return (
      <Button
        outline
        color="secondary"
        className={this.props.left ? "mt-3 float-left" : ""}
        type="button"
        onClick={() => this.props.history.goBack()}
      >
        ‹ Retour
      </Button>
    );
  }
}
