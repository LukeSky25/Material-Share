import { Link } from 'react-router-dom';
import { useState } from 'react';
import { isEmail } from 'validator';
import { toast } from 'react-toastify';

import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';

import './style.css';
import '../../styles/global.css';


export const Login = () => {


  const [ email, setEmail ] = useState('');
  const [ senha, setSenha ] = useState('');

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

    toast.success('Ganhou no tigrinho');

  };


  return (

    <>

      <Header />

        <section>
          <main>

          <h1>Login</h1>

            <form onSubmit={handleSubmit}>
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

            <span>Não tem uma conta ainda?,<br/> crie sua conta já clicando <Link to={'/register'}>aqui!</Link></span>

          </main>
        </section>

      <Footer />

    </>

  );

};
