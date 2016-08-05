import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import {
  VALIDATE_HAR,
  CHANGE_HAR,
  RECEIVE_URL,
  REQUEST_URL,
} from '../actions';

function validateHar(har) {
  const isValid = validate(JSON.parse(har));
  return !isValid && 'Invalid HAR';
}

function har(state = { value: '', isValid: false }, action) {
  switch (action.type) {
    case CHANGE_HAR:
      console.log("changeHar:", performance.now())
      return Object.assign({}, state, {
        value: action.har,
        isValid: false,
      });
    case VALIDATE_HAR:
      console.log("VALIDATE_HAR:", performance.now())
      return Object.assign({}, state, {
        value: state.value,
        isValid: action.isValid,
      });
    default:
      return state;
  }
}

function url(state = {
  isFetching: false,
  url: '',
}, action) {
  switch (action.type) {
    case REQUEST_URL:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_URL:
      return Object.assign({}, state, {
        url: action.url,
        isFetching: false,
      });
    default:
      return state
  }
}

const rootReducer = combineReducers({
  har,
  url,
  routing,
});

export default rootReducer;
