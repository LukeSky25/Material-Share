import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { isEmail } from "validator";
import { toast } from "react-toastify";

import UsuarioService from "../../services/UsuarioService";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

import "./style.css";
import "../../styles/global.css";

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialEmail = location.state?.email || "";

  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!isEmail(email)) {
      toast.error("O formato do e-mail é inválido.");
      setIsLoading(false);
      return;
    }
    if (!password) {
      toast.error("A senha é obrigatória.");
      setIsLoading(false);
      return;
    }

    try {
      const pessoaLogada = await UsuarioService.signIn(email, password);

      if (pessoaLogada.usuario.statusUsuario === "ATIVO") {
        toast.success("Login realizado com sucesso!");
        navigate("/");
      } else if (pessoaLogada.usuario.statusUsuario === "TROCAR_SENHA") {
        navigate(`/newpass/${pessoaLogada.usuario.id}`);
      } else {
        toast.warn("Usuário inativo ou status desconhecido.");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      toast.error("E-mail ou senha incorretos.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <section className="login-container">
        <h1 className="title">Login</h1>
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="login-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu Email..."
              required
            />
          </div>

          <div className="login-form-group">
            <label htmlFor="senha">Senha</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="senha"
                name="senha"
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
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="register-link">
          Não tem uma conta? <Link to={"/register"}>Crie uma agora!</Link>
        </p>
      </section>
      <Footer />
    </>
  );
};
