import React from "react";
import { Container, Row, Col } from "reactstrap";
import "./ErrorBoundary.css";

export default class ErrorBoundary extends React.Component {
  render() {
    return (
      <Container className="error-boundary">
        <Row>
          <Col>
            <h1>Oups !</h1>
            <p>
              On a entendu comme un petit BOUM dans POP.
              <br />
              L'équipe est dessus, revenez dans quelques instants.
            </p>
          </Col>
          <Col>
            <img src="/static/roy-lichtenstein.jpg" alt="I...I'm sorry, Roy Lichtenstein" />
            <br />
            I...I'm sorry, Roy Lichtenstein
          </Col>
        </Row>
      </Container>
    );
  }
}
