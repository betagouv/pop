import React from "react";
import { ButtonGroup } from "reactstrap";
import { Link } from "react-router-dom";

export default ({ base, normalMode }) => {
  return (
    <div className="header">
      <div className="title">Rechercher une Notice</div>
      <div className="buttons">
        <ButtonGroup>
          <Link
            to={`/recherche/${base}`}
            className={`btn btn-primary${normalMode ? " active" : ""}`}
          >
            Recherche simple
          </Link>
          <Link
            to={`/recherche-avancee/${base}`}
            className={`btn btn-primary${!normalMode ? " active" : ""}`}
          >
            Recherche experte
          </Link>
        </ButtonGroup>
      </div>
    </div>
  );
};
