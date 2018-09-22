import React from "react";

import { Container } from "reactstrap";

import Title from "./title.js";
import Logo from "./logo.js";

import "./index.css";

export default () => (
    <div className="header">
        <Container className="NavContainer">
            <Logo />
            <Title />
            <div id="beta">
                <div>
                    <span>BETA</span>
                </div>
            </div>
        </Container>
    </div>
);

