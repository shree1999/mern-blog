import axios from "axios";

import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_FAIL,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGOUT_USER,
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  UPDATE_USER_REQUEST,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
} from "../constants";

export const loadUserAction = () => async dispatch => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const Token = localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : undefined;

    const res = await axios.get("/api/v1/users/me", {
      headers: { authorization: `Bearer ${Token.token}` },
    });
    dispatch({ type: LOAD_USER_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: LOAD_USER_FAIL, payload: "Login or create account!" });
  }
};

export const registerUserAction = data => async dispatch => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const res = await axios.post(
      "/api/v1/users/register",
      { ...data },
      { headers: { "Content-Type": "application/json" } }
    );
    localStorage.setItem("token", JSON.stringify(res.data));
    dispatch(loadUserAction());
  } catch (err) {
    dispatch({ type: REGISTER_USER_FAIL, payload: err.response.data.error });
  }
};

export const loginUserAction = data => async dispatch => {
  try {
    dispatch({ type: LOGIN_USER_REQUEST });

    const res = await axios.post(
      "/api/v1/users/login",
      { ...data },
      { headers: { "Content-Type": "application/json" } }
    );

    localStorage.setItem("token", JSON.stringify(res.data));
    dispatch(loadUserAction());
  } catch (err) {
    dispatch({
      type: LOGIN_USER_FAIL,
      payload: err.response.data.error,
    });
  }
};

export const updateUser = data => async dispatch => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const Token = localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : undefined;

    await axios.put(
      "/api/v1/users/me",
      { ...data },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${Token.token}`,
        },
      }
    );

    dispatch(loadUserAction());
  } catch (err) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: err.response.data.error,
    });
  }
};

export const createUserProfileImage = e => async dispatch => {
  const imageFormObject = new FormData();

  imageFormObject.append("avatar", e.target.files[0]);

  try {
    const Token = localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : undefined;
    await axios.post("/api/v1/users/me/avatar", imageFormObject, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Token.token}`,
      },
    });
    dispatch({ type: UPDATE_USER_SUCCESS });
    dispatch(loadUserAction());
  } catch (err) {
    dispatch({ type: UPDATE_USER_FAIL, payload: err.response.data.error });
  }
};

export const logoutUserAction = () => async dispatch => {
  localStorage.removeItem("token");

  dispatch({ type: LOGOUT_USER });
};
