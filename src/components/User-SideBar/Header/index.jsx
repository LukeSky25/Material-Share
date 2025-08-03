import { useState } from "react";
import { Container } from "./styles"; // seu Header styled-component
import { FaBars } from "react-icons/fa";
import Sidebar from "../Sidebar";
import "../../../styles/global.css";
import { Link } from "react-router-dom";

export const Header = () => {
  const [sidebar, setSidebar] = useState(false);

  const toggleSidebar = () => setSidebar((prev) => !prev);

  return (
    <>
      <Container>
        <FaBars onClick={toggleSidebar} />

        <Link to="/" className="navbar-brand">
          <p className="logo">Material Share</p>
        </Link>

        {/* opcional: só monta quando aberto */}
        {sidebar && <Sidebar isOpen={sidebar} active={setSidebar} />}
      </Container>
    </>
  );
};

export default Header;
