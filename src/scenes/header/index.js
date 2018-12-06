import React from "react";

import { Container } from "reactstrap";

import Title from "./title.js";
import Logo from "./logo.js";

import withStyles from "isomorphic-style-loader/lib/withStyles";
import styles from './index.css';

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

export default withStyles(styles)(header);

