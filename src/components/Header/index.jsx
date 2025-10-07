import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { isUserLoggedIn } from "../../auth/authService";
import { FaRegUserCircle, FaBars, FaTimes } from "react-icons/fa";

import "./style.css";
import "../../styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const Header = () => {
  const [user, setUser] = useState({ loggedIn: false, data: null });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setUser(isUserLoggedIn());
  }, []);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link
            to="/"
            className="navbar-brand"
            onClick={() => setMenuOpen(false)}
          >
            <p className="logo">Material Share</p>
          </Link>
        </div>

        <div className="hamburger" onClick={handleMenuToggle}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <div className={menuOpen ? "navbar-right active" : "navbar-right"}>
          <Link
            to="/doacoes"
            className="c_button"
            onClick={() => setMenuOpen(false)}
          >
            Doações
          </Link>
          <Link
            to="/servicos"
            className="c_button"
            onClick={() => setMenuOpen(false)}
          >
            Serviços
          </Link>
          <Link
            to="/sobre"
            className="c_button"
            onClick={() => setMenuOpen(false)}
          >
            Sobre
          </Link>

          {user.loggedIn && user.data ? (
            <>
              <Link
                to={`/minhasDoacoes/${user.data.id}`}
                className="c_button"
                onClick={() => setMenuOpen(false)}
              >
                Minhas Doações
              </Link>
              <Link
                to={`/user/${user.data.id}`}
                className="user-icon"
                onClick={() => setMenuOpen(false)}
              >
                <FaRegUserCircle />
              </Link>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </nav>
  );
};
