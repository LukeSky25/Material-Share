import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import usuarioService from "../../services/UsuarioService";

import { isEmail } from "validator";
import { toast } from "react-toastify";

import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

import "./style.css";
import "../../styles/global.css";

export const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let formErrors = false;

    if (!isEmail(email)) {
      formErrors = true;
      toast.error("Email Inválido");
    }

    if (!password) {
      formErrors = true;
      toast.error("Senha Inválida");
    }

    if (formErrors) return;

    usuarioService.signIn(email, password).then(() => {
      const userJson = localStorage.getItem("user");
      const user = JSON.parse(userJson || "{}");

      if (user.statusUsuario === "ATIVO") {
        toast.success("Login realizado com sucesso");
        navigate("/");
      } else if (user.statusUsuario === "TROCAR_SENHA") {
        navigate(`/newpass/${user.id}`);
      }
    });
  };

  return (
    <>
      <Header />

      <section className="login">
        <main>
          <h1 className="title">Login</h1>

          <form className="login" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <div className="form-floating mb-3">
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu Email..."
              />
            </div>

            <label htmlFor="senha">Senha</label>
            <div className="form-floating mb-3">
              <input
                type="password"
                name="senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua Senha ..."
              />
              <button type="submit">Entrar</button>
            </div>
          </form>

          <span>
            Não tem uma conta ainda?,
            <br /> crie sua conta já clicando{" "}
            <Link to={"/register"}>aqui!</Link>
          </span>
        </main>
      </section>

      <Footer />
    </>
  );
};
