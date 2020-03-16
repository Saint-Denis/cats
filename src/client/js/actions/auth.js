import * as types from "../constants";

export const registerRequested = newUser => {
  return {
    type: types.REGISTER_REQUESTED,
    payload: newUser
  };
};

export const registerSuccessed = res => {
  return {
    type: types.REGISTER_SUCCESSED,
    payload: res.data
  };
};

export const registerFailed = e => {
  return {
    type: types.REGISTER_FAILED,
    payload: e.data.errors
  };
};

export const loadUserRequested = () => {
  return {
    type: types.LOAD_USER_REQUESTED
  };
};

export const loadUserSuccess = res => {
  return {
    type: types.LOAD_USER_SUCCESS,
    payload: res.data
  };
};

export const loadUserFailed = e => {
  return {
    type: types.LOAD_USER_FAILED,
    payload: e.data.errors
  };
};

export const loginRequested = newUser => {
  return {
    type: types.LOGIN_REQUESTED,
    payload: newUser
  };
};

export const loginSuccessed = res => {
  return {
    type: types.LOGIN_SUCCESSED,
    payload: res.data
  };
};

export const loginFailed = e => {
  return {
    type: types.LOGIN_FAILED,
    payload: e.data.errors
  };
};

export const removeErrors = () => {
  return {
    type: types.REMOVE_ERRORS
  };
};

export const logout = () => {
  return {
    type: types.LOGIN_REQUESTED
  };
};
