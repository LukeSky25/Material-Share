import { Container, Content } from "./styles";
import {
  FaTimes,
  FaRegHeart,
  FaUserAlt,
  FaSignInAlt,
  FaHeadphonesAlt,
  FaRegBell,
} from "react-icons/fa";
import SidebarItem from "../SidebarItem";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, active }) => {
  const closeSidebar = () => {
    active(false);
  };

  return (
    <Container $isOpen={isOpen}>
      <FaTimes onClick={closeSidebar} />
      <Content>
        <Link to="/user">
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
      </Content>
    </Container>
  );
};

export default Sidebar;
