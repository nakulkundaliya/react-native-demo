import { call, put } from 'redux-saga/effects';
import { path } from 'ramda';
import UserActions from '../Redux/UserRedux';

export function* getUsers(api) {
  const response = yield call(api.getUsers);
  if (response.ok) {
    // do data conversion here if needed
    yield put(UserActions.userSuccess(response.data.items));
  } else {
    yield put(UserActions.userFailure());
  }
}
