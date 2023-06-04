import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import usersReducer from './users/reducer';
import habitsReducer from './habits/reducer';
import { loginSaga, registerSaga, updateSaga } from './users/sagas';
import { getHabitsSaga } from './habits/sagas';

function* rootSaga() {
  yield all([
    loginSaga(),
    registerSaga(),
    updateSaga(),
    getHabitsSaga(),
  ]);
}

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    users: usersReducer,
    habits: habitsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
