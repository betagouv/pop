import React from "react";

import { Container } from "reactstrap";

import Title from "./Title.js";
import Logo from "./Logo.js";

import "./Header.css";

const header = () => (
  <div className="header">
    <Container className="NavContainer">
      <Logo />
      <div className="right-container">
        <div>
          <a
            href="https://fier2.typeform.com/to/Qyz3xv"
            className="btn btn-outline-danger d-none d-sm-block"
            target="_blank"
          >
            Votre avis est utile
          </a>
        </div>

        <Title />
        <div id="beta">
          <div>
            <span>BETA</span>
          </div>
        </div>
      </div>
    </Container>
  </div>
);

export default header;
