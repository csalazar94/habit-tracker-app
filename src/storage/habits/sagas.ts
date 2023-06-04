import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import habitsService from '../../network/habits';
import { findAllStart, findAllFailed, findAllSuccess, Habit, createSuccess, createFailed, createStart } from './reducer';

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

function* create(action: PayloadAction<{
  userId: number,
  habitCategoryId: number,
  name: string,
  target: number;
  frequency: string;
}>) {
  try {
    const habit: Habit = yield call(habitsService.create, action.payload.userId, action.payload.habitCategoryId, action.payload.name, action.payload.frequency, action.payload.target);
    yield put(createSuccess(habit));
  } catch (e) {
    yield put(createFailed());
  }
}

export function* createHabitSaga() {
  yield takeLatest(createStart.type, create);
}
