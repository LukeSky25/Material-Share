import { Link } from 'react-router-dom';
import logo from '../../assets/Material-Share.png';

import { FaList, FaAd } from 'react-icons/fa';

import { Footer } from '../../components/Footer/index.jsx';

import './style.css';
import '../../styles/global.css';


export const User = () => {

  let menuItem = document.querySelectorAll('.item-menu');

  function selectLink() {

    menuItem.forEach(item => {
      item.classList.remove('ativo');
    });
    this.classList.add('ativo');

  }

  menuItem.forEach(item => item.addEventListener('click', selectLink));


  return (
    <>

      <nav className="navbar">

        <Link to={'/'} className="navbar-brand">
          <img src={logo} alt="Texto Logo" className='logo2' />
        </Link>

        <div className='ml-auto'>
          <Link to={'/login'} className='c_button'>Entrar</Link>
          <Link to={'/register'} className='c_button'>Criar Conta</Link>
        </div>
      </nav>

      <aside className='menu-lateral'>

        <div className='btn-expandir'>
          <FaList className='FaList' />
        </div>

        <ul>
          <li className='item-menu'>
            <Link to="#">
              <span className='icon'><FaAd className='fa-icon' /></span>
              <span className='txt-link'>Teste</span>
            </Link>
          </li>
          <li className='item-menu'>
            <Link to="#">
              <span className='icon'><FaAd className='fa-icon' /></span>
              <span className='txt-link'>Teste</span>
            </Link>
          </li>
          <li className='item-menu'>
            <Link to="#">
              <span className='icon'><FaAd className='fa-icon' /></span>
              <span className='txt-link'>Teste</span>
            </Link>
          </li>
          <li className='item-menu'>
            <Link to="#">
              <span className='icon'><FaAd className='fa-icon' /></span>
              <span className='txt-link'>Teste</span>
            </Link>
          </li>
          <li className='item-menu'>
            <Link to="#">
              <span className='icon'><FaAd className='fa-icon' /></span>
              <span className='txt-link'>Teste</span>
            </Link>
          </li>
        </ul>

      </aside>

      <section>

        <main>

          <h1>Configurações do Usuário</h1>
          <p>Clique nos icones ao lado para visualizar notificações, editar dados do usuário, avaliar o projeto, etc</p>


        </main>

      </section>

      <Footer />
    </>
  );

};
