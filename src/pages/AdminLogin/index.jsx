import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { isEmail } from "validator";
import { toast } from "react-toastify";

import UsuarioService from "../../services/UsuarioService";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

import "./style.css";
import "../../styles/global.css";

export const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!isEmail(email) || !password) {
      toast.error("Email e senha são obrigatórios.");
      setIsLoading(false);
      return;
    }

    try {
      const adminLogado = await UsuarioService.adminSignIn(email, password);

      if (adminLogado && adminLogado.nivelAcesso === "ADMIN") {
        toast.success("Login de administrador realizado com sucesso!");
        navigate("/admin/dashboard");
      } else {
        toast.error("Este usuário não tem permissão de administrador.");
        UsuarioService.logoutAdmin(); // Opcional: limpa qualquer login indevido
      }
    } catch (error) {
      console.error("Erro no login de admin:", error);
      toast.error("Credenciais de administrador incorretas ou acesso negado.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <section className="login-container">
        <h1 className="title">Login Administrativo</h1>
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="login-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu Email de Admin..."
              required
            />
          </div>

          <div className="login-form-group">
            <label htmlFor="senha">Senha</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua Senha..."
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? "Entrando..." : "Entrar como Admin"}
          </button>
        </form>
      </section>
      <Footer />
    </>
  );
};
