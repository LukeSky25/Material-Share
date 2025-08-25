import { CiTrophy } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import { GiPadlock } from "react-icons/gi";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { BsFillDoorOpenFill } from "react-icons/bs";

import { Header } from "../../components/Header/index.jsx";
import { Footer } from "../../components/Footer/index.jsx";

import "./style.css";
import "../../styles/global.css";
import { Link } from "react-router-dom";

export const Home = () => {
  const user = false;

  return (
    <>
      <Header />

      <div className="welcome-container">
        <p className="title">
          Construindo o <br />
          <span>Futuro</span> Juntos
        </p>
        <p className="subtitle">
          Conectando materiais de construção que seriam descartados com
          <br />
          pessoas prontas para transformá-los em novos começos
        </p>
        <div className="buttons">
          <button className="">
            <Link to="/register">Começar Agora</Link>
          </button>
          <button>
            <Link to="/login">Entrar</Link>
          </button>
        </div>
      </div>

      <section>
        <main>
          <div className="info-container">
            <ul>
              <li>
                <GiPadlock className="icon" color="#3737a3" />
                <h3>Segurança</h3>
                <p>Materiais confiáveis para sua contrução.</p>
              </li>
              <li>
                <CiStar className="icon" color="#F0CD0C" />
                <h3>Qualidade</h3>
                <p>Materiais premium com acabamento impecável.</p>
              </li>
              <li>
                <CiTrophy className="icon" color="#ff7800" />
                <h3>Excelencia</h3>
                <p>Padrão Superior em cada detalhe do projeto.</p>
              </li>
            </ul>
          </div>

          {user ? (
            <div className="abaixar-app">
              <IoLogoGooglePlaystore
                className="icon"
                size={80}
                color="#08b834"
              />
              <p>
                Abaixe já o nosso aplicativo na PlayStore,
                <br /> para utilizar os benefícios do nosso projeto, clicando{" "}
                <a href="https://play.google.com/store/games" target="_blank">
                  aqui.
                </a>
              </p>
            </div>
          ) : (
            <>
              <div className="categorias">
                <p className="title">
                  Produtos de <br />
                  <span>Construção</span>
                </p>
                <p className="subtitle">
                  Materiais de alta qualidade para seus projetos de contrução e
                  reforma
                </p>
              </div>

              <div className="efetuar-login">
                <BsFillDoorOpenFill
                  size={80}
                  color="#203874"
                  className="icon"
                />
                <p>
                  Efetue login ou crie uma conta para <br /> utilizar os
                  benefícios do projeto
                </p>
              </div>
            </>
          )}
        </main>
      </section>

      <Footer />
    </>
  );
};
