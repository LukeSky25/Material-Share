import { Link, useNavigate } from "react-router-dom";

import { FaArrowLeft, FaHouseUser } from "react-icons/fa";

import { Header } from "../../components/Header/index.jsx";

import "./style.css";

export const Page404 = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <div className="container-404">
        <section>
          <main>
            <p className="title1">404</p>
            <p className="title2">Pagina não encontrada</p>
            <p className="subtitle">
              Parece que esta página foi doada para outro lugar! Não <br />
              conseguimos encontrar o que você está procurando, mas temos <br />
              muitas outras formas de ajudar.
            </p>

            <div className="buttons">
              <button onClick={() => navigate(-1)} className="button-link back">
                <FaArrowLeft className="icon" />
                Voltar
              </button>

              <Link to="/" className="button-link back-to-home">
                <FaHouseUser className="icon" />
                Ir para Início
              </Link>
            </div>
          </main>
        </section>
      </div>
    </>
  );
};
