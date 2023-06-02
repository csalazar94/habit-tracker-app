import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import userService from '../../network/user';
import { loginStart, loginSuccess, loginFailed, User, registerStart, registerSuccess, registerFailed } from './reducer';

function* login(action: PayloadAction<{ email: string, password: string }>) {
  try {
    const user: User = yield call(userService.login, action.payload.email, action.payload.password);
    yield put(loginSuccess(user));
  } catch (e) {
    yield put(loginFailed());
  }
}

function* loginSaga() {
  yield takeLatest(loginStart.type, login);
}

function* register(action: PayloadAction<{
  firstName: string,
  lastName: string,
  email: string,
  password: string
}>) {
  try {
    const user: User = yield call(userService.register, action.payload.firstName, action.payload.lastName, action.payload.email, action.payload.password);
    yield put(registerSuccess(user));
  } catch (e) {
    yield put(registerFailed());
  }
}

function* registerSaga() {
  yield takeLatest(registerStart.type, register);
}

export default function* rootSaga() {
  yield all([
    loginSaga(),
    registerSaga(),
  ]);
}
