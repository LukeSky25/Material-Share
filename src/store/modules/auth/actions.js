import * as types from '../types';

export function loginRequest() {
  return {
    type: types.LOGIN_REQUEST,
  };
}

export function loginSuccess() {
  return {
    type: types.LOGIN_SUCCESS,
  };
}

export function loginFailure() {
  return {
    type: types.LOGIN_FAILURE,
  };
}


export function createRequest() {
  return{
    type: types.CREATE_REQUEST,
  };
}

export function createSuccess() {
  return{
    type: types.CREATE_SUCCESS,
  };
}

export function createFailure() {
  return{
    type: types.CREATE_FAILURE,
  };
}
