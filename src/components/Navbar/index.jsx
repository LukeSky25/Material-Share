import { Link } from 'react-router-dom';

import { FaList, FaRegBell, FaRegUserCircle, FaHeadphonesAlt, FaRegHeart, FaSignInAlt } from 'react-icons/fa';

import logo from '../../assets/Material-Share.png';

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

        <Link to='/' className="navbar-brand">
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
            <Link to="/user">
              <span className='icon'><FaRegUserCircle className='fa-icon' /></span>
              <span className='txt-link'>Configurações</span>
            </Link>
          </li>
          <li className='item-menu'>
            <Link to="/user/notificacao">
              <span className='icon'><FaRegBell className='fa-icon' /></span>
              <span className='txt-link'>Notificações</span>
            </Link>
          </li>
          <li className='item-menu'>
            <Link to="/user/suporte">
              <span className='icon'><FaHeadphonesAlt className='fa-icon' /></span>
              <span className='txt-link'>Suporte</span>
            </Link>
          </li>
          <li className='item-menu'>
            <Link to="/user/avaliacao">
              <span className='icon'><FaRegHeart className='fa-icon' /></span>
              <span className='txt-link'>Avaliação</span>
            </Link>
          </li>
          <li className='item-menu'>
            <Link to="/user/logout">
              <span className='icon'><FaSignInAlt className='fa-icon' /></span>
              <span className='txt-link'>Logout</span>
            </Link>
          </li>
        </ul>

      </aside>
    </>
  );

};
