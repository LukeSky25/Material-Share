import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { isEmail } from 'validator';
import { toast } from 'react-toastify';


import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import * as actions from '../../store/modules/auth/actions';

import './style.css';
import '../../styles/global.css';


export const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e) => {

    e.preventDefault();

    let formErrors = false;

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Email Inválido');
    }

    if (!senha) {
      formErrors = true;
      toast.error('Senha Inválida');
    }

    if (formErrors) return;

    dispatch(actions.loginRequest({ email, senha, navigate }));
  };


  return (

    <>

      <Header />

      <section>
        <main>

          <h1>Login</h1>

          <form className='login' onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <div className='form-floating mb-3'>
              <input
                type="text"
                name='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder='Digite seu Email...' />
            </div>

            <label htmlFor="senha">Senha</label>
            <div className='form-floating mb-3'>
              <input
                type="password"
                name='senha'
                value={senha}
                onChange={e => setSenha(e.target.value)}
                placeholder='Digite sua Senha ...' />
              <button type='submit'>Entrar</button>
            </div>
          </form>

          <span>Não tem uma conta ainda?,<br /> crie sua conta já clicando <Link to={'/register'}>aqui!</Link></span>

        </main>
      </section>

      <Footer />

    </>

  );

};
