import React, { Fragment } from "react";
import { Container, Jumbotron, Row, Col } from "react-bootstrap";

import { CardComponent } from "../components/Card.component";

export const Landing = () => {
  return (
    <Fragment>
      <Jumbotron>
        <Container>
          <h1 className="display-3">Welcome to Blog Application</h1>
          <p className="lead">
            A Complete MERN Blog application to get started!
          </p>
        </Container>
      </Jumbotron>
      <Container>
        <Row>
          <Col md={4}>
            <CardComponent bg="primary" title="Create">
              Create account and write blogs of your experience and imagination
            </CardComponent>
          </Col>
          <Col md={4}>
            <CardComponent bg="secondary" title="Update">
              Update your account and blogs of your experience and imagination
            </CardComponent>
          </Col>
          <Col md={4}>
            <CardComponent bg="danger" title="Delete">
              Delete account or blogs of your creation.
            </CardComponent>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
