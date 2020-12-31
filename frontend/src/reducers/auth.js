import {
  REGISTER_USER_REQUEST,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGOUT_USER,
  LOGIN_USER_REQUEST,
  LOGIN_USER_FAIL,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} from "../constants";

export const authReducers = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
    case LOAD_USER_REQUEST:
    case LOGIN_USER_REQUEST:
      return { isLoading: true, isAuthenticated: false };

    case LOAD_USER_SUCCESS:
      return {
        isLoading: false,
        isAuthenticated: true,
        userDetails: action.payload,
      };

    case REGISTER_USER_FAIL:
    case LOGIN_USER_FAIL:
      return {
        isLoading: false,
        isAuthenticated: false,
        error: action.payload,
      };

    case LOAD_USER_FAIL:
    case LOGOUT_USER:
      return { isLoading: false, isAuthenticated: false };

    default:
      return state;
  }
};

export const updateUserReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return { isLoading: true, isAuthenticated: true };

    case UPDATE_USER_SUCCESS:
      return { isLoading: false, isAuthenticated: true };

    case UPDATE_USER_FAIL:
      return { isLoading: false, isAuthenticated: true, error: action.payload };

    default:
      return state;
  }
};
