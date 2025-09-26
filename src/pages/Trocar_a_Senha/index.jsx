import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

import UsuarioService from "../../services/UsuarioService";

import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

import "./style.css";
import "../../styles/global.css";

export const Trocar_a_Senha = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmation_pass, setConfirmation_pass] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!password) {
      toast.error("A senha é obrigatória.");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      toast.error("A senha deve ter no mínimo 6 caracteres.");
      setIsLoading(false);
      return;
    }

    if (!confirmation_pass) {
      toast.error("A confirmação da senha é obrigatória.");
      setIsLoading(false);
      return;
    }

    if (password !== confirmation_pass) {
      toast.error("As senhas não são iguais, tente novamente.");
      setIsLoading(false);
      return;
    }

    try {
      const dadosParaEnviar = {
        senha: password,
      };

      await UsuarioService.alterarSenha(id, dadosParaEnviar);

      toast.success("Senha alterada com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Erro ao trocar senha:", error);
      toast.error("Erro ao trocar senha, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <section className="login-container">
        <h1 className="title">Alterar a Senha</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label htmlFor="email">Nova Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua Nova Senha..."
            />
          </div>

          <div className="login-form-group">
            <label htmlFor="senha">Novamente a Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={confirmation_pass}
              onChange={(e) => setConfirmation_pass(e.target.value)}
              placeholder="Digite sua Senha..."
            />
          </div>

          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? "Alterando a Senha..." : "Alterar a Senha"}
          </button>
        </form>
      </section>
      <Footer />
    </>
  );
};
