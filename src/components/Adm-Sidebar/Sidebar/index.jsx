import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getAdminUser } from "../../../auth/authService";
import UsuarioService from "../../../services/UsuarioService";

import { FaTimes, FaSignInAlt, FaRegHeart } from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";
import { LuUsersRound } from "react-icons/lu";
import { MdOutlineCategory } from "react-icons/md";

import ConfirmationModal from "../../ConfirmationModal";
import SidebarItem from "../SidebarItem";

import { Container, Content } from "./styles";

const Sidebar = ({ isOpen, active }) => {
  const [admin, setAdmin] = useState({ isLoggedIn: false, data: null });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const closeSidebar = () => {
    active(false);
  };

  useEffect(() => {
    const adminStatus = getAdminUser();
    setAdmin(adminStatus);
  }, []);

  const handleLogoutConfirm = () => {
    setIsModalOpen(false);
    UsuarioService.logoutAdmin();
    toast.success("Logout realizado com sucesso");
    navigate("/admin/login");
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
          {admin.isLoggedIn ? (
            <>
              <Link to={`/admin/dashboard`}>
                <SidebarItem Icon={LuUsersRound} Text="Usuários" />
              </Link>
              <Link to={`/admin/dashboard/doacoes`}>
                <SidebarItem Icon={AiOutlineProduct} Text="Doações" />
              </Link>
              <Link to={`/admin/dashboard/categoria`}>
                <SidebarItem Icon={MdOutlineCategory} Text="Categorias" />
              </Link>
              <Link to={`/admin/dashboard/avaliacao`}>
                <SidebarItem Icon={FaRegHeart} Text="Avaliações" />
              </Link>

              <div onClick={handleLogoutClick} style={{ cursor: "pointer" }}>
                <SidebarItem Icon={FaSignInAlt} Text="Logout" />
              </div>
            </>
          ) : (
            <p style={{ color: "white", textAlign: "center", padding: "20px" }}>
              Carregando...
            </p>
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
