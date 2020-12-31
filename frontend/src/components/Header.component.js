import React, { Fragment } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import { logoutUserAction } from "../actions/userAction";

export const Header = () => {
  const auth = useSelector(state => state.auth);
  const { isAuthenticated, isLoading, userDetails } = auth;

  const dispatch = useDispatch();

  const onClickHandler = () => {
    dispatch(logoutUserAction());
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <i className="fas fa-code"></i> Blog App
          </Navbar.Brand>
        </LinkContainer>
        {isLoading ? (
          ""
        ) : isAuthenticated ? (
          <Nav className="mr-auto">
            <Nav.Item>
              <LinkContainer to="/blogs">
                <Nav.Link>Visit Blogs</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <NavDropdown title={userDetails.user.name}>
              <LinkContainer to="/user/dashboard">
                <NavDropdown.Item>
                  <i className="fas fa-cog"></i> Dashboard
                </NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={onClickHandler}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            <Nav.Item>
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-user"></i> Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav.Item>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};
