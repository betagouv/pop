import React from "react";
import { Alert } from "reactstrap";

export default ({ POP_COMMENTAIRES }) => {
  if (!POP_COMMENTAIRES.length) {
    return <div />;
  }
  const comments = this.state.notice.POP_COMMENTAIRES.map(e => <div>{e}</div>);
  return <Alert color="danger">La notice contient des avertissements : {comments}</Alert>;
};
