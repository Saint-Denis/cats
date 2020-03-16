import * as types from "../constants";

const initialState = {
  user: null,
  isGuest: true,
  isLoading: true,
  token: localStorage.getItem("token"),
  errors: []
};

export default function(state = initialState, action) {
  const {
    REGISTER_REQUESTED,
    REGISTER_SUCCESSED,
    REGISTER_FAILED,
    REMOVE_ERRORS,
    LOGIN_REQUESTED,
    LOGIN_SUCCESSED,
    LOGIN_FAILED,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAILED,
    LOGOUT
  } = types;
  const { type, payload } = action;

  switch (type) {
    case REGISTER_REQUESTED:
    case LOGIN_REQUESTED:
      return {
        ...state,
        user: payload,
        isGuest: true,
        isLoading: true
      };
      break;
    case REGISTER_SUCCESSED:
    case LOGIN_SUCCESSED:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        token: payload.token,
        isGuest: false,
        isLoading: false,
        errors: []
      };
      break;
    case REGISTER_FAILED:
    case LOGIN_FAILED:
    case LOAD_USER_FAILED:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isGuest: true,
        isLoading: false,
        errors: payload
      };
      break;
    case LOAD_USER_SUCCESS: {
      return {
        ...state,
        user: payload,
        isGuest: false,
        isLoading: false,
        errors: []
      };
      break;
    }
    case REMOVE_ERRORS:
      return {
        ...state,
        errors: []
      };
      break;
    default:
      return state;
  }
}
