import * as types from '../types';

const initialState = {
  user: false,
  loading: false
};

export default function (state = initialState, action) {

  switch(action.type) {

    case types.LOGIN_REQUEST: {

      const newState = { ...state };
      newState.loading = true;

      return state;
    }

    case types.LOGIN_SUCCESS: {

      const newState = { ...state };
      newState.user = true;
      newState.loading = false;

      return newState;
    }

    case types.LOGIN_FAILURE: {

      const newState = { ...initialState };

      return newState;
    }


    case types.CREATE_REQUEST: {
      const newState = { ...state };
      newState.loading = true;

      return newState;
    }

    case types.CREATE_SUCCESS: {
      const newState = { ...state };
      newState.user = true;
      newState.loading = false;

      return newState;
    }

    case types.CREATE_FAILURE: {
      const newState = { ...initialState };

      return newState;
    }

    default: {
      return state;
    }
  }

}
