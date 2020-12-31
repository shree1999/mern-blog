import React from "react";
import { Form } from "react-bootstrap";

export const InputComponent = props => (
  <Form.Group>
    <Form.Control
      type={props.variant}
      className="form-control my-4"
      placeholder={props.children}
      value={props.value}
      onChange={e => props.change(e.target.value)}
      required
    />
  </Form.Group>
);
