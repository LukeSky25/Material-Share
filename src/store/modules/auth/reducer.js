import axios from '../../../services/axios';

import * as types from '../types';

const initialState = {
  user: false,
  loading: false,
  token: false,
  data: {}
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
      newState.token = action.payload.token;
      newState.data = action.payload.data;

      return newState;
    }

    case types.LOGIN_FAILURE: {
      delete axios.defaults.headers.Authorization;
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



    case types.UPDATE_REQUEST: {

      const newState = { ...state };
      newState.loading = true;

      return state;
    }

    case types.UPDATE_SUCCESS: {

      const newState = { ...state };
      newState.data.nome = action.payload.nome;
      newState.data.email = action.payload.email;
      newState.data.senha = action.payload.senha;
      newState.data.cpf = action.payload.cpf;
      newState.data.dataNascimento = action.payload.dataNascimento;
      newState.data.telefone = action.payload.telefone;
      newState.data.cep = action.payload.cep;
      newState.data.complemento = action.payload.complemento;
      newState.data.numero = action.payload.numero;
      newState.loading = false;

      return newState;
    }

    case types.UPDATE_FAILURE: {
      const newState = { ...state };
      newState.loading = false;

      return newState;
    }

    default: {
      return state;
    }
  }

}
