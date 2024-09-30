import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { Footer } from '../../components/Footer';
import { User } from '../../components/Navbar';
import * as actions from '../../store/modules/auth/actions';

import './style.css';

export const Logout = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = (e) => {

    e.preventDefault();

    dispatch(actions.loginFailure());
    toast.success('Logout realizado com sucesso');
    navigate('/');

  };

  return (
    <>

      <User />

      <section>
        <main>
          <h1 className='title'>Logout</h1>
          <p>Você têm certeza que deseja deslogar da sua conta?</p>
          <div className='confirm'>
            <button className='cancel' onClick={() => navigate('/')}>Cancelar</button>
            <button className='ok' onClick={handleLogout}>Logout</button>
          </div>
        </main>
      </section>

      <Footer />

    </>
  );

};
