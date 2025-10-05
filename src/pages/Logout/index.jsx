import { Link } from "react-router-dom";

import { IoExitOutline } from "react-icons/io5";
import { FcOk } from "react-icons/fc";

import { Header } from "../../components/Header/index.jsx";
import { Footer } from "../../components/Footer";

import "./style.css";

export const Logout = () => {
  return (
    <div className="page-container">
      <Header />

      <section>
        <main>
          <div className="logout-confirmation">
            <FcOk className="ok-icon" />
            <p className="title">Logout Realizado</p>
            <p>Você foi desconectado com sucesso do sistema Material Share.</p>
          </div>
          <div className="go-to">
            <Link className="to-login" to={`/login`}>
              <IoExitOutline className="login-icon" /> Fazer Login Novamente
            </Link>
            <Link className="to-home" to={`/`}>
              Voltar ao Início
            </Link>
          </div>
          <p className="thanks">
            Obrigado por usar o Material Share !!! <br />
            Construindo sonhos juntos.
          </p>
        </main>
      </section>

      <Footer />
    </div>
  );
};
