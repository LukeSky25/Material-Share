import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { isUserLoggedIn } from "../../auth/authService";

import { FaRegUserCircle } from "react-icons/fa";

import "./style.css";
import "../../styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const Header = () => {
  const [user, setUser] = useState({ loggedIn: false, data: null });

  useEffect(() => {
    setUser(isUserLoggedIn());
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          <p className="logo">Material Share</p>
        </Link>
      </div>

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
        {user.loggedIn && user.data ? (
          <Link to={`/user/${user.data.id}`} className="user-icon">
            <FaRegUserCircle />
          </Link>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};
