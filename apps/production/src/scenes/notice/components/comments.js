import React from "react";
import { Alert } from "reactstrap";

// Transform flag as displayable text.
function flagAsText(flag) {
  if (flag.match(/_EMPTY$/)) {
    return `Le champ ${flag.replace(/_EMPTY$/)} ne doit pas être vide`;
  } else if (flag.match(/_REQUIRED_FOR_/)) {
    const [existingProp, requiredProp] = [
      flag.replace(/^.*_REQUIRED_FOR_/),
      flag.replace(/_REQUIRED_FOR_.*$/)
    ];
    return `Le champ ${requiredProp} ne doit pas être vide quand ${existingProp} est renseigné`;
  } else if (flag.match(/_LENGTH_EXACT_/)) {
    const [length, prop] = [flag.replace(/^.*_LENGTH_EXACT_/), flag.replace(/_LENGTH_EXACT_.*$/)];
    return `Le champ ${prop} doit avoir une longueur de ${length} caractères exactement`;
  } else if (flag.match(/_LENGTH_/)) {
    const [length, prop] = [flag.replace(/^.*_LENGTH_/), flag.replace(/_LENGTH_.*$/)];
    return `Le champ ${prop} doit avoir une longueur de ${length} caractères minimum`;
  } else if (flag === "INSEE_DPT_MATCH_FAIL") {
    return "INSEE et DPT doivent commencer par les deux même lettres";
  } else if (flag.match(/_REF_NOT_FOUND$/)) {
    const prop = flag.replace(/_REF_NOT_FOUND$/);
    return `Le champ ${prop} doit contenir des références de notices valides`;
  } else if (flag === "LBASE_INVALID") {
    return `Le champ LBASE doit commencer par : "EA", "PA", "IA", "IM", "PM" ou "EM"`;
  } else if (flag === "REF_INVALID") {
    return (
      `Le champ REF doit uniquement contenir ` +
      `des lettres majuscules (A-Z), des chiffres (0-9) et le caractère tiret bas (_)`
    );
  } else if (flag === "IDPROD_INVALID") {
    return "IDPROD doit commencer par les caractères SAP"
  }
}

export default ({ POP_FLAGS }) => {
  if (!(POP_FLAGS && POP_FLAGS.length)) {
    return <div />;
  }
  const comments = POP_FLAGS.map(e => <li key={e}><b>{e}</b> - {flagAsText(e)}</li>);
  return (
    <Alert color="danger">
      <p>La notice contient des avertissements :</p>
      <ul>{comments}</ul>
    </Alert>
  );
};
