import { call, put } from 'redux-saga/effects';
import UserActions from '../Redux/UserRedux';

export function* getUsers(api, action) {
  const { search, pageNo } = action;
  const response = yield call(api.getUsers, search, pageNo);
  if (!response.errors) {
    // do data conversion here if needed
    yield put(UserActions.userSuccess(response.results));
  } else {
    yield put(UserActions.userFailure());
  }
}

export function* getCollection(api, action) {
  const { username, pageNo } = action;
  const response = yield call(api.getCollection, username, pageNo);

  if (response.length) {
    // do data conversion here if needed
    yield put(UserActions.getCollectionSuccess(response));
  } else {
    yield put(UserActions.getCollectionFailure());
  }
}
