import React, { Fragment, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Header } from "./components/Header.component";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/users/auth/Login";
import { Register } from "./pages/users/auth/Register";
import { Dashboard } from "./pages/users/dashboard/Dashboard";
import { EditUser } from "./pages/users/dashboard/EditUser";

import { loadUserAction } from "./actions/userAction";

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserAction());
  }, []);

  return (
    <Fragment>
      <Header />
      <Switch>
        <Route path="/" component={Landing} exact />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/user/dashboard" component={Dashboard} exact />
        <Route path="/user/dashboard/edit" component={EditUser} />
      </Switch>
    </Fragment>
  );
};
