import { IoMdBookmarks } from "react-icons/io";
import { TbTargetArrow } from "react-icons/tb";
import { PiHandshake } from "react-icons/pi";

import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

import "./style.css";
import "../../styles/global.css";

export const Sobre = () => {
  return (
    <>
      <Header />

      <section>
        <main>
          <h1>Sobre</h1>
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
        </main>
      </section>

      <Footer />
    </>
  );
};
