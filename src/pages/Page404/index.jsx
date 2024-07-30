import { Link } from 'react-router-dom';

import { FaArrowLeft } from 'react-icons/fa';
import { Footer } from '../../components/Footer';

import './style.css';


export const Page404 = () => {

  return (
    <div className='container-404'>
        <Link to={'/'}><FaArrowLeft className='arrowIcon' /></Link>
        <section>

          <h1>Erro 404</h1>
          <h2>Pagina não encontrada</h2>

        </section>
      <Footer />
    </div>
  );

};
