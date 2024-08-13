import { Header } from '../../components/Header/index.jsx';
import { Footer } from '../../components/Footer/index.jsx';

import './style.css';
import '../../styles/global.css';


export const User = () => {

  return (
    <>

      <Header />
      <aside>

        <h5>Informações do Usuário</h5>

        <div className='sub-nav'>

          <ul>

            <li><a href="#">Notificações</a></li>
            <li><a href="#">Suporte</a></li>
            <li><a href="#">Editar Informações</a></li>
            <li><a href="#">Avalie o Projeto</a></li>

          </ul>

        </div>

      </aside>

      <section>

        <main>



        </main>

      </section>

      <Footer />
    </>
  );

};
