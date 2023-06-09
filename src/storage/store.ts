import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import usersReducer from './users/reducer';
import habitsReducer from './habits/reducer';
import habitCategoriesReducer from './habit-categories/reducer';
import { loginSaga, registerSaga, updateSaga } from './users/sagas';
import { createDailyRecordSaga, createHabitSaga, deleteDailyRecordSaga, getHabitSaga, getHabitsSaga } from './habits/sagas';
import { getHabitCategoriesSaga } from './habit-categories/sagas';

function* rootSaga() {
  yield all([
    loginSaga(),
    registerSaga(),
    updateSaga(),
    getHabitSaga(),
    getHabitsSaga(),
    getHabitCategoriesSaga(),
    createHabitSaga(),
    createDailyRecordSaga(),
    deleteDailyRecordSaga(),
  ]);
}

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    users: usersReducer,
    habits: habitsReducer,
    habitCategories: habitCategoriesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
