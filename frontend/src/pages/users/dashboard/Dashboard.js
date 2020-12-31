import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "react-bootstrap/Image";

import { DashboardLinks } from "../../../components/DashboardLinks.component";
import { AlertComponent } from "../../../components/Alert.component";
import { createUserProfileImage } from "../../../actions/userAction";

export const Dashboard = ({ history }) => {
  const auth = useSelector(state => state.auth);
  const { isAuthenticated, userDetails } = auth;

  const update = useSelector(state => state.update);
  const { error } = update;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/");
    }
  }, [history, isAuthenticated]);

  const onChangeHandler = e => {
    dispatch(createUserProfileImage(e));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-8 mt-4">
          <h1 className="display-3 text-primary">Dashboard</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Welcome{" "}
            {userDetails && userDetails.user.name}
          </p>
          <DashboardLinks />
        </div>
        <div className="col-sm-4 mt-4">
          <Image
            src={
              userDetails && userDetails.user.avatar
                ? `data:image/jpeg;base64,${userDetails.user.avatar}`
                : "https://res.cloudinary.com/geekysrm/image/upload/v1542221619/default-user.png"
            }
            roundedCircle
            style={{ width: "250px", height: "250px" }}
          />
          <input
            type="file"
            className="btn btn-outline-primary"
            onChange={onChangeHandler}
          />
          {error && <AlertComponent type="danger">{error}</AlertComponent>}
        </div>
      </div>
    </div>
  );
};
