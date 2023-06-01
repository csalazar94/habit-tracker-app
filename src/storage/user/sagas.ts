import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import userService from '../../network/user';
import { loginStart, loginSuccess, loginFailed, User } from './reducer';

function* login(action: PayloadAction<{ email: string, password: string }>) {
  try {
    const user: User = yield call(userService.login, action.payload.email, action.payload.password);
    yield put(loginSuccess(user));
  } catch (e) {
    yield put(loginFailed());
  }
}

function* userSaga() {
  yield takeLatest(loginStart.type, login);
}


export default userSaga;
