import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

import "./style.css";
import "../../styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const Header = () => {
  const user = true;

  return (
    <nav className="navbar">
      {/* Logo à esquerda */}
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          <p className="logo">Material Share</p>
        </Link>
      </div>

      {/* Links à direita */}
      <div className="navbar-right">
        <Link to="/" className="c_button">
          Início
        </Link>
        <Link to="/servicos" className="c_button">
          Serviços
        </Link>
        <Link to="/sobre" className="c_button">
          Sobre
        </Link>
        {user ? (
          <Link to="/user" className="user-icon">
            <FaRegUserCircle />
          </Link>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};
