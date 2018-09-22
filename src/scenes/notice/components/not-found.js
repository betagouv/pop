import * as React from 'react';
import { Container } from "reactstrap";
import './not-found.css';

const NotFound = (props) => (
    <Container className="notice-not-found" fluid>
        <h1>Notice introuvable</h1>
        <p>
            La notice demandée est introuvable. Vous pouvez{" "}
            <a href="/">essayer une nouvelle recherche</a>
        </p>
    </Container>
);
export default NotFound;
