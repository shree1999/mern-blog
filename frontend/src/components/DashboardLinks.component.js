import React from "react";
import { Link } from "react-router-dom";

export const DashboardLinks = () => {
  return (
    <div className="dash-buttons">
      <Link to="/user/dashboard/edit" className="btn btn-light">
        <i className="fas fa-user-circle text-primary"></i> Edit Profile
      </Link>
      <Link to="/user/dashboard/edit-blogs" className="btn btn-light">
        <i className="fas fa-edit"></i> Edit blogs
      </Link>
      <Link to="/user/dashboard/delete" className="btn btn-light">
        <i className="fas fa-trash-alt text-danger"></i> Delete Account
      </Link>
    </div>
  );
};
