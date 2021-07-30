import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import account, { accountSaga } from './account';

const rootReducer = combineReducers({ account });

export function* rootSaga() {
  yield all([accountSaga()]);
}

export default rootReducer;
