import { PayloadAction } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import habitsService from '../../network/habits';
import { DailyRecord } from '../../types/screens';
import { findAllStart, findAllFailed, findAllSuccess, Habit, createSuccess, createFailed, createStart, createDailyRecordSuccess, createDailyRecordFailed, createDailyRecordStart, deleteDailyRecordStart, deleteDailyRecordSuccess, deleteDailyRecordFailed, findOneStart, findOneFailed, findOneSuccess, deleteDailyRecordReset, createDailyRecordReset, findOneReset } from './reducer';

function* findOne(action: PayloadAction<{ habitId: number }>) {
  try {
    const habit: Habit = yield call(habitsService.findOne, action.payload.habitId);
    yield put(findOneSuccess(habit));
    yield put(findOneReset({ habitId: habit.id }));
  } catch (e) {
    console.error(e);
    yield put(findOneFailed({ habitId: action.payload.habitId }));
  }
}

export function* getHabitSaga() {
  yield takeEvery(findOneStart.type, findOne);
}

function* findAll(action: PayloadAction<{ userId: number }>) {
  try {
    const habits: Habit[] = yield call(habitsService.findAll, action.payload.userId);
    yield put(findAllSuccess(habits));
  } catch (e) {
    console.error(e);
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
  } catch (error) {
    console.error(error);
    if (isAxiosError(error)) {
      const data = error.response?.data;
      if (error.response?.status === 400 && Array.isArray(data.message)) {
        yield put(createFailed(data.message));
      } else {
        yield put(createFailed('Ha ocurrido un error.'));
      }
    } else {
      yield put(createFailed('Ha ocurrido un error.'));
    }
  }
}

export function* createHabitSaga() {
  yield takeEvery(createStart.type, create);
}

function* createDailyRecord(action: PayloadAction<{
  habitId: number,
  date: string;
}>) {
  try {
    const dailyRecord: DailyRecord = yield call(habitsService.createDailyRecord, action.payload.habitId, action.payload.date);
    yield put(createDailyRecordSuccess(dailyRecord));
    yield put(findOneStart({ habitId: dailyRecord.habitId }));
    yield put(createDailyRecordReset({ habitId: dailyRecord.habitId, date: dailyRecord.date }));
  } catch (e) {
    console.error(e);
    yield put(createDailyRecordFailed({ habitId: action.payload.habitId, date: action.payload.date }));
  }
}

export function* createDailyRecordSaga() {
  yield takeEvery(createDailyRecordStart.type, createDailyRecord);
}

function* deleteDailyRecord(action: PayloadAction<{
  dailyRecordId: number,
}>) {
  try {
    const dailyRecord: DailyRecord = yield call(habitsService.deleteDailyRecord, action.payload.dailyRecordId);
    yield put(deleteDailyRecordSuccess({ habitId: dailyRecord.habitId, dailyRecordId: dailyRecord.id }));
    yield put(findOneStart({ habitId: dailyRecord.habitId }));
    yield put(deleteDailyRecordReset({ dailyRecordId: dailyRecord.id }));
  } catch (e) {
    console.error(e);
    yield put(deleteDailyRecordFailed({ dailyRecordId: action.payload.dailyRecordId }));
  }
}

export function* deleteDailyRecordSaga() {
  yield takeEvery(deleteDailyRecordStart.type, deleteDailyRecord);
}
