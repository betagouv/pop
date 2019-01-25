import React from "react";
import { Link } from "react-router-dom";

import "./Footer.css";

const Footer = () => (
  <div className="footer">
    <ul className="list-inline">
      <li className="list-inline-item">
        <a href="https://beta.gouv.fr/startup/pop.html" target="_blank">
          À propos
        </a>
      </li>
      <li className="list-inline-item">
        <Link to="/opendata">Télécharger les bases</Link>
      </li>
      <li className="list-inline-item">
        <a href={`mailto:pop.reseaux@gmail.com`} target="_blank">
          Nous contacter
        </a>
      </li>
    </ul>
  </div>
);

export default Footer;
