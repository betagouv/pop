import React from "react";
import { Container } from "reactstrap";

import "./index.css";

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Container className="home">
          <div className="title">
            Bienvenue dans l'outil d'administration des bases du Ministère de la Culture&nbsp;!
          </div>
          <div className="subtitle">
            <p>
              Depuis cet espace, et en fonction des droits qui vous auront été attribués, vous
              pouvez&nbsp;:
            </p>
            <ul>
              <li>
                consulter l'ensemble des données publiques et confidentielles déjà importées dans
                les bases,
              </li>
              <li>
                importer des données pour alimenter les bases en nouvelles créations ou pour
                remplacer intégralement des notices existantes.
              </li>
            </ul>
          </div>
        </Container>
      </div>
    );
  }
}
