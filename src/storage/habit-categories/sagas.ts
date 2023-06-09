import { call, put, takeLatest } from 'redux-saga/effects';
import habitCategoriesService from '../../network/habit-categories';
import { findAllStart, findAllFailed, findAllSuccess, HabitCategory } from './reducer';

function* findAll() {
  try {
    const habitCategories: HabitCategory[] = yield call(habitCategoriesService.findAll);
    yield put(findAllSuccess(habitCategories));
  } catch (e) {
    console.error(e);
    yield put(findAllFailed());
  }
}

export function* getHabitCategoriesSaga() {
  yield takeLatest(findAllStart.type, findAll);
}
