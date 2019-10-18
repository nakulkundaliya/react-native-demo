import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import _ from 'lodash';
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  userRequest: ['search', 'pageNo'],
  userSuccess: ['payload'],
  userFailure: null,
  getCollectionRequest: ['username'],
  getCollectionSuccess: ['collection'],
  getCollectionFailure: null
});

export const UserTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  users: [],
  error: null
});

/* ------------- Selectors ------------- */

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, action) => {
  return state.merge({ fetching: true, pageNo: action.pageNo });
};

// successful api lookup
export const success = (state, action) => {
  const { payload } = action;

  let users;
  let pageNo = state.pageNo;
  if (pageNo != 1) {
    users = [...state.users, ...payload];
  } else {
    users = payload;
  }

  return state.merge({
    fetching: false,
    error: null,
    users,
    pageNo: parseInt(pageNo) + 1
  });
};

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null });

export const collectionRequest = state => {
  return state.merge({ fetching: true });
};
// successful api lookup
export const collectionSuccess = (state, action) => {
  const { collection } = action;
  return state.merge({
    fetching: false,
    error: null,
    collection
  });
};

/* ------------- Hookup Reducers To Types ------------- */

export const userReducer = createReducer(INITIAL_STATE, {
  [Types.USER_REQUEST]: request,
  [Types.USER_SUCCESS]: success,
  [Types.USER_FAILURE]: failure,
  [Types.GET_COLLECTION_REQUEST]: collectionRequest,
  [Types.GET_COLLECTION_SUCCESS]: collectionSuccess,
  [Types.GET_COLLECTION_FAILURE]: failure
});
