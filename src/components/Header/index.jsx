import { FaTools } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import './style.css';
import '../../styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Header = () => {
  return (
    <nav className="navbar">

      <Link to={'/'} className="navbar-brand">
        <FaTools size={35} className='img'/>
      </Link>
      <div className='ml-auto'>
        <Link to={'/login'} className='c_button'>Entrar</Link>
        <Link to={'/register'} className='c_button'>Criar Conta</Link>
      </div>
    </nav>
  );
};
