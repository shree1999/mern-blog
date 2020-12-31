import React, { useState, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { ContainerComponent } from "../../../components/Container.component";
import { InputComponent } from "../../../components/Input.component";
import { AlertComponent } from "../../../components/Alert.component";
import { registerUserAction } from "../../../actions/userAction";

export const Register = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);
  const { error, isLoading, isAuthenticated } = auth;

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated, history]);

  const onSubmitHandler = e => {
    e.preventDefault();
    const data = { name, email, password, age };
    dispatch(registerUserAction(data));
  };

  return (
    <ContainerComponent>
      <h1 className="display-3">
        <i className="fas fa-user-plus"></i> Register
      </h1>
      {error && <AlertComponent type="danger">{error}</AlertComponent>}
      {isLoading && <Spinner variant="border" size="lg" />}
      <Form onSubmit={onSubmitHandler}>
        <InputComponent
          variant="text"
          change={value => setName(value)}
          value={name}
        >
          Enter Username
        </InputComponent>
        <InputComponent
          variant="email"
          change={value => setEmail(value)}
          value={email}
        >
          Enter Email
        </InputComponent>
        <div className="row">
          <div className="col-sm-6">
            <InputComponent
              variant="number"
              change={value => setAge(value)}
              value={age}
            >
              Enter Age
            </InputComponent>
          </div>
          <div className="col-sm-6">
            <InputComponent
              variant="password"
              change={value => setPassword(value)}
              value={password}
            >
              Enter Password
            </InputComponent>
          </div>
        </div>
        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>
    </ContainerComponent>
  );
};
