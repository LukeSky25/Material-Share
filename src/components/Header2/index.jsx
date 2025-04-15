import { useState } from "react";
import { Container } from "./styles";
import { FaBars } from "react-icons/fa";

import Sidebar from "../Sidebar";

import "../../styles/global.css";

export const Header2 = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSideBar = () => setSidebar(!sidebar);

  return (
    <>
      <Container>
        <FaBars onClick={showSideBar}></FaBars>
        {sidebar && <Sidebar active={setSidebar} />}
      </Container>
    </>
  );
};

export default Header2;
