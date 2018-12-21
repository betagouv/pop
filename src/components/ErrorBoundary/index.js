import React from "react";
import { Container, Row, Col } from "reactstrap";
import "./index.css";
import roy from '../../assets/roy-lichtenstein.jpg';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    Raven.captureMessage(error && error.toString(), {
      extra: info
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container className="error-boundary">
        <Row>
          <Col>
          <h1>Oups !</h1>
          <p>
            On a entendu comme un petit BOUM dans POP. 
            <br />
            L'équipe est dessus,
            revenez dans quelques instants.
          </p>
          </Col>
          <Col>
          <img src={roy} alt="I...I'm sorry, Roy Lichtenstein"/><br/>
          I...I'm sorry, Roy Lichtenstein
          </Col>
        </Row>
          
        </Container>
      );
    }

    return this.props.children;
  }
}

