import { call, put } from 'redux-saga/effects';
import UserActions from '../Redux/UserRedux';

export function* getUsers(api, action) {
  console.log(action);
  const { search, pageNo } = action;
  const response = yield call(api.getUsers, search, pageNo);
  if (!response.errors) {
    // do data conversion here if needed
    yield put(UserActions.userSuccess(response.results));
  } else {
    yield put(UserActions.userFailure());
  }
}
