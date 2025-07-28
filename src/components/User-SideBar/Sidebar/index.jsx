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

const Sidebar = ({ active }) => {
  const closeSidebar = () => {
    active(false);
  };

  return (
    <Container sidebar={active}>
      <FaTimes onClick={closeSidebar} />
      <Content>
        <SidebarItem Icon={FaUserAlt} Text="Usuário" />
        <SidebarItem Icon={FaRegBell} Text="Notificações" />
        <SidebarItem Icon={FaHeadphonesAlt} Text="Suporte" />
        <SidebarItem Icon={FaRegHeart} Text="Avaliação" />
        <SidebarItem Icon={FaSignInAlt} Text="Logout" />
      </Content>
    </Container>
  );
};

export default Sidebar;
