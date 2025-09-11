import React, { useState, useEffect } from "react";
import { Container, Content } from "./styles";
import { Link } from "react-router-dom";
import SidebarItem from "../SidebarItem";
import { isUserLoggedIn } from "../../../auth/authService";

import {
  FaTimes,
  FaRegHeart,
  FaUserAlt,
  FaSignInAlt,
  FaHeadphonesAlt,
  FaRegBell,
} from "react-icons/fa";

const Sidebar = ({ isOpen, active }) => {
  const [user, setUser] = useState({ loggedIn: false, data: null });

  const closeSidebar = () => {
    active(false);
  };

  useEffect(() => {
    const usuario = isUserLoggedIn();
    setUser(usuario);
  }, []);

  return (
    <Container $isOpen={isOpen}>
      <FaTimes onClick={closeSidebar} />
      <Content>
       
        {user.loggedIn && user.data ? (
          <>
            <Link to={`/user/${user.data.id}`}>
              <SidebarItem Icon={FaUserAlt} Text="Usuário" />
            </Link>
            <Link to="/user/notificacao">
              <SidebarItem Icon={FaRegBell} Text="Notificações" />
            </Link>
            <Link to="/user/suporte">
              <SidebarItem Icon={FaHeadphonesAlt} Text="Suporte" />
            </Link>
            <Link to="/user/avaliacao">
              <SidebarItem Icon={FaRegHeart} Text="Avaliação" />
            </Link>
            <Link to="/user/logout">
              <SidebarItem Icon={FaSignInAlt} Text="Logout" />
            </Link>
          </>
        ) : (
          <p>Carregando menu...</p>
        )}
      </Content>
    </Container>
  );
};

export default Sidebar;
