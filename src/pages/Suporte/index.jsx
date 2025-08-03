import { MdOutlineMailOutline } from "react-icons/md";
import { SiWhatsapp } from "react-icons/si";
import { FaPhone } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";

import { Header } from "../../components/User-Sidebar/Header";
import { Footer } from "../../components/Footer";

import "./style.css";

export const Suporte = () => {
  return (
    <>
      <Header />

      <div className="suporte-page">
        <div className="suporte-hero">
          <p className="suporte-title">Central de Suporte</p>
          <p className="suporte-subtitle">
            Em caso de dúvida ou problema, entre em contato conosco enviando uma
            <br />
            mensagem. Em um dos nossos meios de contato
          </p>
        </div>

        <div className="suporte-contact">
          <h2 className="suporte-subtitle suporte-heading">Meios de Contato</h2>

          <div className="suporte-info">
            <ul>
              <li>
                <SiWhatsapp className="suporte-icon" color="#2cc76a" />
                <h3 className="suporte-subtitle">WhatsApp</h3>
                <p className="suporte-description">
                  Atendimento rápido via WhatsApp
                </p>
                <p className="suporte-contact-text">(11) 90000-0000</p>
                <button className="suporte-button">
                  <a href="#">
                    Abrir WhatsApp <GoArrowUpRight size={20} />
                  </a>
                </button>
              </li>
              <li>
                <MdOutlineMailOutline
                  className="suporte-icon"
                  color="#ef3f29"
                />
                <h3 className="suporte-subtitle">Email</h3>
                <p className="suporte-description">
                  Envie sua dúvida por e-mail
                </p>
                <p className="suporte-contact-text">materialShare@gmail.com</p>
                <button className="suporte-button">
                  <a href="#">
                    Enviar Email <GoArrowUpRight size={20} />
                  </a>
                </button>
              </li>
              <li>
                <FaPhone className="suporte-icon" color="#3737a3" />
                <h3 className="suporte-subtitle">Telefone</h3>
                <p className="suporte-description">Fale diretamente conosco</p>
                <p className="suporte-contact-text">(11) 91111-1111</p>
                <button className="suporte-button">
                  <a href="#">
                    Ligar Agora <GoArrowUpRight size={20} />
                  </a>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
