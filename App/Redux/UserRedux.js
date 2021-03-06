import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import _ from 'lodash';
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  userRequest: ['search', 'pageNo'],
  userSuccess: ['payload'],
  userFailure: null,
  getCollectionRequest: ['username', 'pageNo'],
  getCollectionSuccess: ['collections'],
  getCollectionFailure: null
});

export const UserTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  users: [],
  error: null,
  collections: [],
  pageNo: 1,
  collectionNo: 1
});

/* ------------- Selectors ------------- */

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, action) => {
  const { pageNo } = action;

  return state.merge({
    fetching: true,
    pageNo: pageNo,
    users: pageNo === 1 ? [] : state.users
  });
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

export const collectionRequest = (state, action) => {
  const { pageNo } = action;

  return state.merge({
    fetching: true,
    collectionNo: pageNo,
    collections: pageNo === 1 ? [] : state.collections
  });
};
// successful api lookup
export const collectionSuccess = (state, action) => {
  const { collections } = action;
  let tempCollections;
  let pageNo = state.collectionNo;
  if (pageNo != 1) {
    tempCollections = [...state.collections, ...collections];
  } else {
    tempCollections = collections;
  }
  return state.merge({
    fetching: false,
    error: null,
    collections: tempCollections
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
