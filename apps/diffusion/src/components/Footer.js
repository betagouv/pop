import React from "react";
import Link from "next/link";
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
        <Link href="/opendata" prefetch><a>Télécharger les bases</a></Link>
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
