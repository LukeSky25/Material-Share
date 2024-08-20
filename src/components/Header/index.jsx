import { Link } from 'react-router-dom';
import logo from '../../assets/Material-Share.png';

import './style.css';
import '../../styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Header = () => {
  return (
    <nav className="navbar">

      <Link to={'/'} className="navbar-brand">
        <img src={logo} alt="Texto Logo" className='logo' id='logo' />
      </Link>

      <div className='ml-auto'>
        <Link to={'/login'} className='c_button'>Entrar</Link>
        <Link to={'/register'} className='c_button'>Criar Conta</Link>
      </div>
    </nav>
  );
};
