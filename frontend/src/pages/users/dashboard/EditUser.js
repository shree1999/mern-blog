import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "react-bootstrap/Spinner";

import { ContainerComponent } from "../../../components/Container.component";
import { AlertComponent } from "../../../components/Alert.component";
import { InputComponent } from "../../../components/Input.component";
import { updateUser } from "../../../actions/userAction";

export const EditUser = ({ history }) => {
  const auth = useSelector(state => state.auth);
  const { isAuthenticated, userDetails } = auth;

  const update = useSelector(state => state.update);
  const { isLoading, error } = update;

  const [email, setEmail] = useState(userDetails && userDetails.user.email);
  const [age, setAge] = useState(userDetails && userDetails.user.age);
  const [name, setName] = useState(userDetails && userDetails.user.name);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/");
    }
  }, [history, isAuthenticated]);

  const onSubmitHandler = e => {
    e.preventDefault();
    const data = { name, email, age };
    dispatch(updateUser(data));
  };
  return (
    <ContainerComponent>
      <h1 className="display-3">Edit Profile</h1>
      {error && <AlertComponent type="danger">{error}</AlertComponent>}
      {isLoading && <Spinner variant="border" size="lg" />}
      <form onSubmit={onSubmitHandler}>
        <InputComponent
          type="email"
          value={email}
          change={value => setEmail(value)}
        >
          Edit Email
        </InputComponent>
        <InputComponent
          type="text"
          value={name}
          change={value => setName(value)}
        >
          Edit Username
        </InputComponent>
        <InputComponent
          type="number"
          value={age}
          change={value => setAge(value)}
        >
          Edit Age
        </InputComponent>
        <button type="submit" className="btn btn-primary">
          Edit Profile
        </button>
      </form>
    </ContainerComponent>
  );
};
