import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export const ContainerComponent = props => (
  <Container>
    <Row>
      <Col sm={6} className="offset-3 mt-4">
        {props.children}
      </Col>
    </Row>
  </Container>
);
