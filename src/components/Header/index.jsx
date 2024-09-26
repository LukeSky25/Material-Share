import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaRegUserCircle } from "react-icons/fa";

import logo from '../../assets/Material-Share.png';

import './style.css';
import '../../styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Header = () => {

  const user = useSelector(state => state.auth.user);

  return (
    <nav className="navbar">

      <Link to={'/'} className="navbar-brand">
        <img src={logo} alt="Texto Logo" className='logo' id='logo' />
      </Link>

      {user ?
        <div className='ml-auto'>
          <Link to={'/user'} className="navbar-brand">
            <FaRegUserCircle className='user' size={35} />
          </Link>
        </div>
        :
        <div className='ml-auto'>
          <Link to={'/login'} className='c_button'>Entrar</Link>
          <Link to={'/register'} className='c_button'>Criar Conta</Link>
        </div>
      }

    </nav>
  );
};
