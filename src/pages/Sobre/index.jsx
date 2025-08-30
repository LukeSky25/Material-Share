import { IoMdBookmarks } from "react-icons/io";
import { TbTargetArrow } from "react-icons/tb";
import { PiHandshake } from "react-icons/pi";

import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

import "./style.css";
import "../../styles/global.css";

import ITB from "../../assets/itb-barueri-2.jpg";
import Desperdicio from "../../assets/perdas-no-canteiro-de-obras.webp";
import Auxilio from "../../assets/auxilio-planejamento.jpg";

export const Sobre = () => {
  return (
    <>
      <Header />
      <section className="sobre-nos">
        <main>
          {/* Seção 1: Imagem na esquerda, Texto na direita */}
          <div className="conteudo-secao">
            <div className="secao-imagem">
              <img src={ITB} alt="ITB Brasílio Flores de Azevedo (FIEB)" />
            </div>

            <div className="secao-texto">
              <div className="secao-titulo-com-icone">
                <IoMdBookmarks className="icone-secao" color="#2cc76a" />
                <h3>História</h3>
              </div>

              <p>
                A Material Share é um projeto social, criado em 2024, por alunos
                do Instituto Tecnológico de Barueri (ITB) do Jardim Belval, para
                um Trabalho de Conclusão de Curso (TCC).
              </p>
            </div>
          </div>

          {/* Seção 2: Imagem na direita, Texto na esquerda (invertida) */}

          <div className="conteudo-secao reverso">
            <div className="secao-imagem">
              <img
                src={Desperdicio}
                alt="Desperdício de Materiais de Construção"
              />
            </div>

            <div className="secao-texto">
              <div className="secao-titulo-com-icone">
                <TbTargetArrow className="icone-secao" color="#ef3f29" />
                <h3>Objetivo</h3>
              </div>

              <p>
                O objetivo principal da Material Share é a redução do
                desperdício de materiais de construção, ajudando assim
                preferencialmente pessoas de baixa renda...
              </p>
            </div>
          </div>
          <div className="conteudo-secao">
            <div className="secao-imagem">
              <img src={Auxilio} alt="Auxílio e Planejamento" />
            </div>

            <div className="secao-texto">
              <div className="secao-titulo-com-icone">
                <PiHandshake className="icone-secao" color="#3737a3" />
                <h3>Auxílios</h3>
              </div>

              <p>
                Os nossos principais auxílios ultimamente são escolares, de
                professores que nos auxiliam como desenvolver o nosso projeto.
                Você também pode ajudar a fazer o projeto crescer, basta nos
                enviar sugestões de melhorias, etc.
              </p>
            </div>
          </div>
        </main>
      </section>
      <Footer />
    </>
  );
};
