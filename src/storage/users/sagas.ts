import { PayloadAction } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import usersService from '../../network/users';
import { loginStart, loginSuccess, loginFailed, User, registerStart, registerSuccess, registerFailed, updateStart, updateSuccess, updateFailed } from './reducer';

function* login(action: PayloadAction<{ email: string, password: string }>) {
  try {
    const user: User = yield call(usersService.login, action.payload.email, action.payload.password);
    yield put(loginSuccess(user));
  } catch (e) {
    console.error(e);
    yield put(loginFailed());
  }
}

export function* loginSaga() {
  yield takeLatest(loginStart.type, login);
}

function* register(action: PayloadAction<{
  firstName: string,
  lastName: string,
  email: string,
  password: string
}>) {
  try {
    const user: User = yield call(usersService.register, action.payload.firstName, action.payload.lastName, action.payload.email, action.payload.password);
    yield put(registerSuccess(user));
  } catch (error) {
    console.error(error);
    if (isAxiosError(error)) {
      const data = error.response?.data;
      if (error.response?.status === 400 && Array.isArray(data.message)) {
        yield put(registerFailed(data.message));
      } else {
        yield put(registerFailed('Ha ocurrido un error.'));
      }
    } else {
      yield put(registerFailed('Ha ocurrido un error.'));
    }
  }
}

export function* registerSaga() {
  yield takeLatest(registerStart.type, register);
}

function* update(action: PayloadAction<{
  userId: number,
  firstName: string,
  lastName: string,
  gender: string,
  dob: string,
  weight: number,
  height: number,
}>) {
  try {
    const user: User = yield call(usersService.update, action.payload.userId, action.payload.lastName, action.payload.firstName, action.payload.gender, action.payload.dob, action.payload.weight, action.payload.height);
    yield put(updateSuccess(user));
  } catch (e) {
    console.error(e);
    yield put(updateFailed());
  }
}

export function* updateSaga() {
  yield takeLatest(updateStart.type, update);
}

