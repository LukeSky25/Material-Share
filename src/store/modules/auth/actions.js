import * as types from '../types';

export function loginRequest(payload) {
  return {
    type: types.LOGIN_REQUEST,
    payload
  };
}

export function loginSuccess(payload) {
  return {
    type: types.LOGIN_SUCCESS,
    payload
  };
}

export function loginFailure(payload) {
  return {
    type: types.LOGIN_FAILURE,
    payload
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


export function updateRequest(payload) {
  return{
    type: types.UPDATE_REQUEST,
    payload
  };
}

export function updateSuccess(payload) {
  return{
    type: types.UPDATE_SUCCESS,
    payload
  };
}

export function updateFailure(payload) {
  return{
    type: types.UPDATE_FAILURE,
    payload
  };
}
