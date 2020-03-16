import { call, all, select, put, fork, takeLatest } from "redux-saga/effects";
import {
  registerSuccessed,
  registerFailed,
  loginSuccessed,
  loginFailed,
  loadUserSuccess,
  loadUserFailed
} from "../actions/auth";
import setAuthToken from "../utils/auth";
import api from "../modules/Auth/api";

const getNewUser = ({ auth }) => auth.user;

function* registerUser() {
  const newUser = yield select(getNewUser);
  const body = JSON.stringify(newUser);
  try {
    const res = yield call(() => api.registerUser(body));
    yield put(registerSuccessed(res));
    yield put(loadUserSuccess(res));
  } catch (e) {
    yield put(registerFailed(e.response));
    yield put(loadUserFailed(e.response));
  }
}

function* loginUser() {
  const user = yield select(getNewUser);
  const body = JSON.stringify(user);
  try {
    const res = yield call(() => api.loginUser(body));
    yield put(loginSuccessed(res));
    yield put(loadUserSuccess(res));
  } catch (e) {
    yield put(loginFailed(e.response));
    yield put(loadUserFailed(e.response));
  }
}

function* loadUser() {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = yield call(api.loadUser);
    yield put(loadUserSuccess(res));
  } catch (e) {
    yield put(loadUserFailed(e.response));
  }
}

function* registerSagaWatcher() {
  yield takeLatest("REGISTER_REQUESTED", registerUser);
}

function* loginSagaWatcher() {
  yield takeLatest("LOGIN_REQUESTED", loginUser);
}

function* loadUserSagaWatcher() {
  yield takeLatest("LOAD_USER_REQUESTED", loadUser);
}

export default function* authSaga() {
  yield all([
    fork(registerSagaWatcher),
    fork(loadUserSagaWatcher),
    fork(loginSagaWatcher)
  ]);
}
