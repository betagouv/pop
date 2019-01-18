import React from "react";

import { Container, Button } from "reactstrap";

import Title from "./Title.js";
import Logo from "./Logo.js";

import "./Header.css";

const header = () => (
  <div className="header">
    <Container className="NavContainer">
      <Logo />
      <div className="right-container">
        <a href="https://fier2.typeform.com/to/Qyz3xv" target="_blank">
          <Button>Votre avis est utile</Button>
        </a>
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
