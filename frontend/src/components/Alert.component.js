import React, { useState, Fragment } from "react";
import Alert from "react-bootstrap/Alert";

export const AlertComponent = props => {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant={props.type} dismissible onClose={() => setShow(false)}>
        {props.children}
      </Alert>
    );
  }

  return <Fragment></Fragment>;
};
