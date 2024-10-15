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
    console.log(e);
    yield put(actions.loginFailure);
  }
}

function* updateRequest({payload}) {

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

    console.log(e);

    yield put(actions.updateFailure());

  }
}


function persistRehydrate ({payload}) {
  const token = get(payload, 'auth.token');

  if(!token) return;

  axios.defaults.headers.Authorization = `Bearer ${token}`;

}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.UPDATE_REQUEST, updateRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
]);
