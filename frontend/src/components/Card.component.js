import React from "react";
import { Card } from "react-bootstrap";

export const CardComponent = props => {
  return (
    <Card bg={props.bg} className="Card">
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.children}</Card.Text>
      </Card.Body>
    </Card>
  );
};
