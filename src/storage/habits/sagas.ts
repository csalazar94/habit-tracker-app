import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import habitsService from '../../network/habits';
import { findAllStart, findAllFailed, findAllSuccess, Habit } from './reducer';

function* findAll(action: PayloadAction<{ userId: number }>) {
  try {
    const habits: Habit[] = yield call(habitsService.findAll, action.payload.userId);
    yield put(findAllSuccess(habits));
  } catch (e) {
    yield put(findAllFailed());
  }
}

export function* getHabitsSaga() {
  yield takeLatest(findAllStart.type, findAll);
}
