import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import './style.css';

export const Login = () => {

  return (

    <>

      <Header />

        <section>

        <h1>Login</h1>

        <form>
          <label htmlFor="email">Email</label>
          <input type="text" placeholder='Digite seu Email...' />
          <label htmlFor="senha">Senha</label>
          <input type="password" placeholder='Digite sua Senha ...' />
          <button type='submit'>Entrar</button>
        </form>
        </section>

      <Footer />

    </>

  );

};
