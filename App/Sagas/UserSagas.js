import { call, put } from 'redux-saga/effects';
import UserActions from '../Redux/UserRedux';

export function* getUsers(api, action) {
  console.log(action);
  const { search } = action;
  const response = yield call(api.getUsers, search);
  if (!response.errors) {
    // do data conversion here if needed
    yield put(UserActions.userSuccess(response.results));
  } else {
    yield put(UserActions.userFailure());
  }
}
