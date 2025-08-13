import { IoMdBookmarks } from "react-icons/io";
import { TbTargetArrow } from "react-icons/tb";
import { PiHandshake } from "react-icons/pi";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { BsFillDoorOpenFill } from "react-icons/bs";

import { Header } from "../../components/Header/index.jsx";
import { Footer } from "../../components/Footer/index.jsx";

import "./style.css";
import "../../styles/global.css";
import { Link } from "react-router-dom";

export const Home = () => {
  const user = true;

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
                <IoMdBookmarks className="icon" color="#2cc76a" />
                <h3>Historia</h3>
                <p>
                  A Material Share é um projeto social, criado em 2024, por
                  alunos do Instituto Tecnológico de Barueri (ITB) do Jardim
                  Belval, para um Trabalho de Conclusão de Curso (TCC).
                </p>
              </li>
              <li>
                <TbTargetArrow className="icon" color="#ef3f29" />
                <h3>Objetivo</h3>
                <p>
                  O objetivo principal da Material Share é a redução do
                  desperdício de materiais de construçao, ajudando assim
                  preferencialmente pessoas de baixa renda, com a construção de
                  suas casas. Mas não se limitando somente a pessoas de baixa
                  renda mais tâmbem qualquer pessoa que necessite de materias de
                  construção, mas dando preferência a pessoas de baixa renda.
                </p>
              </li>
              <li>
                <PiHandshake className="icon" color="#3737a3" />
                <h3>Auxilios</h3>
                <p>
                  Os nossos principais auxilios ultimamente são escolares, de
                  professores que nos auxiliam como desenvolver o nosso projeto.
                  Você tâmbem pode ajudar a fazer o projeto crescer, basta nos
                  enviar sugestões de melhorias, etc.
                </p>
              </li>
            </ul>
          </div>

          {user ? (
            <div className="abaixar-app">
              <IoLogoGooglePlaystore className="icon" size={80} color="#08b834" />
              <p>
                Abaixe já o nosso aplicativo na PlayStore,
                <br /> para utilizar os benefícios do nosso projeto, clicando{" "}
                <a href="https://play.google.com/store/games" target="_blank">
                  aqui.
                </a>
              </p>
            </div>
          ) : (
            <div className="efetuar-login">
              <BsFillDoorOpenFill size={80} color="#203874" />
              <p>
                Efetue login ou crie uma conta para <br /> utilizar os
                benefícios do projeto
              </p>
            </div>
          )}
        </main>
      </section>

      <Footer />
    </>
  );
};
