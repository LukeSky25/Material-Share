import { Link } from 'react-router-dom';

import { FaArrowLeft, FaHouseUser, FaSearch  } from 'react-icons/fa';

import { Header } from "../../components/Header/index.jsx";

import './style.css';


export const Page404 = () => {

  return (
    <>
      <Header />
      
      <div className='container-404'>
        <section>

          <main>

            <p className='title1'>404</p>
            <p className='title2'>Pagina não encontrada</p>
            <p className="subtitle">Parece que esta página foi doada para outro lugar! Não <br />
            conseguimos encontrar o que você está procurando, mas temos <br />
            muitas outras formas de ajudar.</p>

            <div className="buttons">
              <Link to="/" className="button-link back">
                <FaArrowLeft className="icon" />
                  Voltar
              </Link>

              <Link to="/" className="button-link back-to-home">
                <FaHouseUser className="icon" />
                  Ir para Início
              </Link>
            </div>

            {/* <div className="info-container">
              <p className="help-title"><FaSearch/>Como podemos ajudar?</p>
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
                        desperdício de materiais de construçao, ajudando assim
                        O objetivo principal da Material Share é a redução do
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
            </div> */}

          </main>

        </section>
      </div>
    </>

  );

};
