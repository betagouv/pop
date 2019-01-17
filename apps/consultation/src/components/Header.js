import React from "react";

import { Container } from "reactstrap";

import Title from "./Title.js";
import Logo from "./Logo.js";

import "./Header.css";

const header = () => (
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

export default header;
