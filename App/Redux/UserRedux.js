import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import _ from 'lodash';
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  userRequest: ['data'],
  userSuccess: ['payload'],
  userFailure: null,
  changeType: ['filterValue', 'isChecked']
});

export const UserTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: [],
  users: [],
  error: null,
  types: [
    {
      name: 'Type 0',
      value: 0,
      isChecked: false
    },
    {
      name: 'Type 1',
      value: 1,
      isChecked: false
    },
    {
      name: 'Type 2',
      value: 2,
      isChecked: false
    },
    {
      name: 'Type 3',
      value: 3,
      isChecked: false
    },
    {
      name: 'Type 4',
      value: 4,
      isChecked: false
    }
  ]
});

/* ------------- Selectors ------------- */

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null });

// successful api lookup
export const success = (state, action) => {
  const { payload } = action;
  return state.merge({ fetching: false, error: null, payload, users: payload });
};

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null });

export const changeType = (state, { filterValue, isChecked }) => {
  console.log('filterValue', filterValue);
  // Type chagnes
  let _types = [...state.types];
  let filterType = [];
  const newType = _types.map(type => {
    let _type = type.value === filterValue ? { ...type, isChecked } : type;
    if (_type.isChecked) {
      filterType.push(_type.value);
    }
    return _type;
  });

  // Filter
  let newPayload = _.filter(state.users, v => _.includes(filterType, v.type));
  return state.merge({ types: newType, payload: newPayload });
};
/* ------------- Hookup Reducers To Types ------------- */

export const userReducer = createReducer(INITIAL_STATE, {
  [Types.USER_REQUEST]: request,
  [Types.USER_SUCCESS]: success,
  [Types.USER_FAILURE]: failure,
  [Types.CHANGE_TYPE]: changeType
});
