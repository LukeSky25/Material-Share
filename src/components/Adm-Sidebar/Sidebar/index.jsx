import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isUserLoggedIn } from "../../../auth/authService";
import UsuarioService from "../../../services/UsuarioService";

import {
  FaTimes,
  FaRegHeart,
  FaUserAlt,
  FaSignInAlt,
  FaHeadphonesAlt,
  FaRegBell,
} from "react-icons/fa";

import ConfirmationModal from "../../ConfirmationModal";
import SidebarItem from "../SidebarItem";

import { Container, Content } from "./styles";

const Sidebar = ({ isOpen, active }) => {
  const [user, setUser] = useState({ loggedIn: false, data: null });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const closeSidebar = () => {
    active(false);
  };

  useEffect(() => {
    const usuario = isUserLoggedIn();
    setUser(usuario);
  }, []);

  const handleLogoutConfirm = () => {
    setIsModalOpen(false);

    UsuarioService.logout();

    toast.success("Logout realizado com sucesso");

    navigate("/user/logout");
  };

  const handleLogoutCancel = () => {
    setIsModalOpen(false);
  };

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Container $isOpen={isOpen}>
        <FaTimes onClick={closeSidebar} />
        <Content>
          {user.loggedIn && user.data ? (
            <>
              <Link to={`/user/${user.data.id}`}>
                <SidebarItem Icon={FaUserAlt} Text="Usuário" />
              </Link>
              <Link to={`/user/notificacao/${user.data.id}`}>
                <SidebarItem Icon={FaRegBell} Text="Notificações" />
              </Link>
              <Link to="/user/suporte">
                <SidebarItem Icon={FaHeadphonesAlt} Text="Suporte" />
              </Link>
              <Link to="/user/avaliacao">
                <SidebarItem Icon={FaRegHeart} Text="Avaliação" />
              </Link>

              <div onClick={handleLogoutClick} style={{ cursor: "pointer" }}>
                <SidebarItem Icon={FaSignInAlt} Text="Logout" />
              </div>
            </>
          ) : (
            <p>Carregando menu...</p>
          )}
        </Content>
      </Container>

      {isModalOpen && (
        <ConfirmationModal
          message="Você tem certeza que deseja sair?"
          onConfirm={handleLogoutConfirm}
          onCancel={handleLogoutCancel}
        />
      )}
    </>
  );
};

export default Sidebar;
