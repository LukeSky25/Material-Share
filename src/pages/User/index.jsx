import { FaList, FaAd } from 'react-icons/fa';

import { Header } from '../../components/Header/index.jsx';
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

      <Header />

      <aside className='menu-lateral'>

        <div className='btn-expandir'>
          <FaList className='FaList' />
        </div>

        <ul>
          <li className='item-menu'>
            <a href="#">
              <span className='icon'><FaAd className='fa-icon' /></span>
              <span className='txt-link'>Teste</span>
            </a>
          </li>
          <li className='item-menu'>
            <a href="#">
              <span className='icon'><FaAd className='fa-icon' /></span>
              <span className='txt-link'>Teste</span>
            </a>
          </li>
          <li className='item-menu'>
            <a href="#">
              <span className='icon'><FaAd className='fa-icon' /></span>
              <span className='txt-link'>Teste</span>
            </a>
          </li>
          <li className='item-menu'>
            <a href="#">
              <span className='icon'><FaAd className='fa-icon' /></span>
              <span className='txt-link'>Teste</span>
            </a>
          </li>
          <li className='item-menu'>
            <a href="#">
              <span className='icon'><FaAd className='fa-icon' /></span>
              <span className='txt-link'>Teste</span>
            </a>
          </li>
        </ul>

      </aside>

      <section>

        <main>



        </main>

      </section>

      <Footer />
    </>
  );

};
