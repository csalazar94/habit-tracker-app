import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import userReducer from './user/reducer';
import rootSaga from './user/sagas';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
