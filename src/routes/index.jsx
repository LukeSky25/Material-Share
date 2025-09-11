import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "../pages/Home";
import { Page404 } from "../pages/Page404";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Administracao } from "../pages/Administracao";
import { Configuracao } from "../pages/Configuracao";
import { Avaliacao } from "../pages/Avaliacao";
import { Notificacao } from "../pages/Notificacao";
import { Suporte } from "../pages/Suporte";
import { Logout } from "../pages/Logout";
import { Sobre } from "../pages/Sobre";
import { Servicos } from "../pages/Servicos";
import { Produtos } from "../pages/Produtos";

import { PrivateRoutes } from "./PrivateRoutes";

export const Rotas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route
          path="/user/:id"
          element={
            <PrivateRoutes>
              <Configuracao />
            </PrivateRoutes>
          }
        />
        <Route
          path="/administracao"
          element={
            <PrivateRoutes>
              <Administracao />
            </PrivateRoutes>
          }
        />
        <Route
          path="/user/notificacao"
          element={
            <PrivateRoutes>
              <Notificacao />
            </PrivateRoutes>
          }
        />
        <Route
          path="/user/suporte"
          element={
            <PrivateRoutes>
              <Suporte />
            </PrivateRoutes>
          }
        />
        <Route
          path="/user/avaliacao"
          element={
            <PrivateRoutes>
              <Avaliacao />
            </PrivateRoutes>
          }
        />
        <Route
          path="/user/logout"
          element={
            <PrivateRoutes>
              <Logout />
            </PrivateRoutes>
          }
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
};
