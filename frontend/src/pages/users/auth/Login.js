import React, { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { ContainerComponent } from "../../../components/Container.component";
import { InputComponent } from "../../../components/Input.component";
import { AlertComponent } from "../../../components/Alert.component";
import { loginUserAction } from "../../../actions/userAction";

export const Login = ({ history }) => {
  const [userInput, setUserInput] = useState("");
  const [password, setPassword] = useState("");

  const auth = useSelector(state => state.auth);
  const { isAuthenticated, error, isLoading } = auth;

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [history, isAuthenticated]);

  const onSubmitHandler = e => {
    e.preventDefault();
    const data = { userInput, password };
    dispatch(loginUserAction(data));
  };

  return (
    <ContainerComponent>
      <h1 className="display-3 text-center">
        <i className="fas fa-user"></i> Login
      </h1>
      {error && <AlertComponent type="danger">{error}</AlertComponent>}
      {isLoading && <Spinner variant="border" size="lg" />}
      <Form onSubmit={onSubmitHandler}>
        <InputComponent
          variant="text"
          change={value => setUserInput(value)}
          value={userInput}
        >
          Enter Username or Email
        </InputComponent>
        <InputComponent
          variant="password"
          change={value => setPassword(value)}
          value={password}
        >
          Enter Password
        </InputComponent>
        <Button type="submit" variant="primary">
          Click to Login
        </Button>
        <Link className="float-right" to="/register">
          Click here if you don't have account
        </Link>
      </Form>
    </ContainerComponent>
  );
};
