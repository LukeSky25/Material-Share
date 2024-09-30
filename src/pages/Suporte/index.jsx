import { MdOutlineMailOutline } from "react-icons/md";
import { SiWhatsapp } from "react-icons/si";

import { Footer } from '../../components/Footer';
import { User } from '../../components/Navbar';

import './style.css';

export const Suporte = () => {

  return (
    <>

      <User />

      <section>

        <main className="suporte">

          <h1 className='title'>Suporte</h1>

          <div>
            <p>
              Em caso de dúvida ou problema, entre em contato conosco enviando uma mensamgem,
              em um dos nossos meios de contato, temos suporte 24H:
            </p>
          </div>

          <div className='meios-contato'>
            <h3 className="title">Meios de Contato</h3>
            <table>
              <thead>
                <tr>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><SiWhatsapp size={35} color="green" /></td>
                  <td><a className="whatsapp" href="https://web.whatsapp.com/" target="_blank">(11) 90000-0000</a></td>
                </tr>
                <tr>
                  <td><MdOutlineMailOutline size={35} color="red" /></td>
                  <td><a className="email" href="https://www.google.com/intl/pt-BR/gmail/about/" target="_blank">materialShareSuporte@gmail.com</a></td>
                </tr>
              </tbody>
            </table>
          </div>

        </main>

      </section>



      <Footer />

    </>
  );

};
