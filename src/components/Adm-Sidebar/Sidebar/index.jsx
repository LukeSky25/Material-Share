import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isUserLoggedIn } from "../../../auth/authService";
import UsuarioService from "../../../services/UsuarioService";

import { FaTimes, FaSignInAlt } from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";
import { LuUsersRound } from "react-icons/lu";

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

    UsuarioService.logoutAdmin();

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
              <Link to={`/admin/dashboard`}>
                <SidebarItem Icon={LuUsersRound} Text="Usuários" />
              </Link>
              <Link to={`/admin/dashboard/doacoes`}>
                <SidebarItem Icon={AiOutlineProduct} Text="Doacões" />
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
