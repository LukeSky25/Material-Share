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
import { Trocar_a_Senha } from "../pages/Trocar_a_Senha";
import { Sobre } from "../pages/Sobre";
import { Servicos } from "../pages/Servicos";
import { Doacoes } from "../pages/Doacoes";
import { Doacao } from "../pages/Doacao";
import { FormularioDoacao } from "../pages/FormularioDoacao";
import { MinhasDoacoes } from "../pages/MinhasDoacoes";
import { AdminLogin } from "../pages/AdminLogin";

import { PrivateRoutes } from "./PrivateRoutes";
import { AdminPrivateRoutes } from "./AdminPrivateRoutes";

export const Rotas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <AdminPrivateRoutes>
              <Administracao />
            </AdminPrivateRoutes>
          }
        />

        <Route
          path="/doacao/editar/:id"
          element={
            <PrivateRoutes>
              <FormularioDoacao />
            </PrivateRoutes>
          }
        />
        <Route
          path="/nova-doacao"
          element={
            <PrivateRoutes>
              <FormularioDoacao />
            </PrivateRoutes>
          }
        />
        <Route
          path="/doacoes"
          element={
            <PrivateRoutes>
              <Doacoes />
            </PrivateRoutes>
          }
        />
        <Route
          path="/doacao/:id"
          element={
            <PrivateRoutes>
              <Doacao />
            </PrivateRoutes>
          }
        />
        <Route
          path="/minhasDoacoes/:id"
          element={
            <PrivateRoutes>
              <MinhasDoacoes />
            </PrivateRoutes>
          }
        />
        <Route
          path="/user/:id"
          element={
            <PrivateRoutes>
              <Configuracao />
            </PrivateRoutes>
          }
        />
        <Route
          path="/alterarSenha/:id"
          element={
            <PrivateRoutes>
              <Trocar_a_Senha />
            </PrivateRoutes>
          }
        />
        <Route
          path="/user/notificacao/:id"
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
