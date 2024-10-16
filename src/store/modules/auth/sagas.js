import { call, put, all, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';
import { toast } from 'react-toastify';
import { get } from 'lodash';


function* loginRequest({ payload }) {

  try {

    const response = yield call(axios.post, '/tokens', payload);
    yield put(actions.loginSuccess({ ...response.data }));

    toast.success('Login feito com sucesso');

    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    payload.navigate('/');

  } catch(e) {
    toast.error('Usuario ou senha inválida');

    yield put(actions.loginFailure);
  }
}


function persistRehydrate ({ payload }) {
  const token = get(payload, 'auth.token');

  if(!token) return;

  axios.defaults.headers.Authorization = `Bearer ${token}`;

}


function* registerRequest({ payload }) {

  try {

    const date = new Date();
    const { nome, email, senha, cpf, dataNascimento, telefone, cep, navigate, nivel_acesso} = payload;


    yield call(axios.post, '/user', {
      nome,
      email,
      senha,
      cpf,
      data_nascimento: date.toISOString(dataNascimento),
      telefone,
      cep,
      nivel_acesso,
      status_cadastro: 'ATIVO',
      data_cadastro: date.toISOString()
    });

    const response = yield call(axios.post, '/tokens', {
      email,
      senha
    });

    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    toast.success('Conta criada com sucesso');

    yield put(actions.registerSuccess({ ...response.data }));

    navigate('/');

  } catch(e) {
    const errors = get(e, 'response.data.errors', []);
    //const status = get(e, 'response.status', 0);

    if(errors.length > 0) {
      errors.map(error => toast.error(error));
    } else {
      toast.error('Erro desconhecido');
    }

    yield put(actions.registerFailure());
  }

}


function* updateRequest({ payload }) {

  const { id, nome, email, senha, cpf, dataNascimento, telefone, cep, complemento, numero } = payload;

  try {

    if(id) {
      yield call(axios.put, '/user', {
        nome,
        email,
        senha: senha || undefined,
        cpf,
        dataNascimento,
        telefone,
        cep,
        complemento,
        numero
      });

      toast.success('Dados editados com sucesso');

      yield put(actions.updateSuccess({id, nome, email, senha, cpf, dataNascimento, telefone, cep, complemento, numero}));
    }

  } catch(e) {
    const errors = get(e, 'response.data.errors', []);
    //const status = get(e, 'response.status', 0);

    if(errors.length > 0) {
      errors.map(error => toast.error(error));
    } else {
      toast.error('Erro desconhecido');
    }

    yield put(actions.updateFailure());

  }
}




export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
  takeLatest(types.UPDATE_REQUEST, updateRequest),
]);
