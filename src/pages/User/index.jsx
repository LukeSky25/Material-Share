import { Link } from 'react-router-dom';

import { FaList, FaRegBell, FaRegUserCircle, FaHeadphonesAlt, FaRegHeart, FaSignInAlt } from 'react-icons/fa';

import logo from '../../assets/Material-Share.png';

import { Footer } from '../../components/Footer/index.jsx';

// import { Configuracao } from '../pages/Configuracao';
// import { Avaliacao } from '../pages/Avaliacao';
// import { Configuracao } from '../pages/Configuracao';
// import { Notificacao } from '../pages/Notificacao';
// import { Suporte } from '../pages/Suporte';

import './style.css';
import '../../styles/global.css';
import { Configuracao } from '../Configuracao/index.jsx';




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
              <span className='icon'><FaRegUserCircle className='fa-icon' /></span>
              <span className='txt-link'>Configurações</span>
            </Link>
          </li>
          <li className='item-menu'>
            <Link to="#">
              <span className='icon'><FaRegBell className='fa-icon' /></span>
              <span className='txt-link'>Notificações</span>
            </Link>
          </li>
          <li className='item-menu'>
            <Link to="#">
              <span className='icon'><FaHeadphonesAlt className='fa-icon' /></span>
              <span className='txt-link'>Suporte</span>
            </Link>
          </li>
          <li className='item-menu'>
            <Link to="#">
              <span className='icon'><FaRegHeart className='fa-icon' /></span>
              <span className='txt-link'>Avaliar!</span>
            </Link>
          </li>
          <li className='item-menu'>
            <Link to="#">
              <span className='icon'><FaSignInAlt className='fa-icon' /></span>
              <span className='txt-link'>Logout</span>
            </Link>
          </li>
        </ul>

      </aside>

      <section>

        <main>

          {/* <h1>Configurações do Usuário</h1>
          <p>Clique nos icones ao lado para alterar dados do usuario, visualizar notificações, suporte, avaliar o projeto, etc</p> */}

          <Configuracao />

        </main>

      </section>

      <Footer />
    </>
  );

};
