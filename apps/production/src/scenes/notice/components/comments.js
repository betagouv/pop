import React from "react";
import { Alert } from "reactstrap";

export default ({ POP_COMMENTAIRES }) => {
  if (!POP_COMMENTAIRES.length) {
    return <div />;
  }
  const comments = POP_COMMENTAIRES.map(e => <li key={e}>{e}</li>);
  return <Alert color="danger"><p>La notice contient des avertissements :</p><ul>{comments}</ul></Alert>;
};
