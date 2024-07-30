import { Link } from 'react-router-dom';

import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';

import './style.css';
import '../../styles/global.css';


export const Login = () => {

  return (

    <>

      <Header />

        <section>

        <h1>Login</h1>

        <form>
          <label htmlFor="email">Email</label>
          <div className='form-floating mb-3'>
            <input type="text" placeholder='Digite seu Email...' />
          </div>

          <label htmlFor="senha">Senha</label>
          <div className='form-floating mb-3'>
            <input type="password" placeholder='Digite sua Senha ...' />
            <button type='submit'>Entrar</button>
          </div>
        </form>

        <span>Não tem uma conta ainda?,<br/> crie sua conta já clicando <Link to={'/register'}>aqui!</Link></span>

        </section>

      <Footer />

    </>

  );

};
