import React from "react";
import { Link } from "react-router-dom";

import "./index.css";

import Logo from '../../assets/logo-incubateur.svg';

const Footer = () => (
  <div className="footer">
    <a href="https://beta.gouv.fr/startup/pop.html"><img src={Logo} alt="betagouv" id="betagouv" /></a>
    <Link to="/opendata">Télécharger les bases</Link>
    <a href={`mailto:pop@culture.gouv.fr`}>Nous contacter</a>
  </div>
);

export default Footer;