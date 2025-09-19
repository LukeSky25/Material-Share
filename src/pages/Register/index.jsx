import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { isEmail } from "validator";
import { toast } from "react-toastify";
import validarCpf from "validar-cpf";
import dayjs from "dayjs";

import UsuarioService from "../../services/UsuarioService";
import PessoaService from "../../services/PessoaService";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

import "./style.css";
import "../../styles/global.css";

export const Register = () => {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [celular, setCelular] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [t_user, setT_user] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formatCPF = (value) => {
    const cleanedValue = value.replace(/\D/g, "");
    return cleanedValue
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .slice(0, 14);
  };

  const formatCEP = (value) => {
    const cleanedValue = value.replace(/\D/g, "");
    return cleanedValue.replace(/(\d{5})(\d)/, "$1-$2").slice(0, 9);
  };

  const formatCelular = (value) => {
    const cleanedValue = value.replace(/\D/g, "");
    if (cleanedValue.length <= 10) {
      return cleanedValue
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .slice(0, 14);
    }
    return cleanedValue
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15);
  };

  const validateForm = async () => {
    const cleanedCpf = cpf.replace(/\D/g, "");
    const cleanedCelular = celular.replace(/\D/g, "");
    const cleanedCep = cep.replace(/\D/g, "");

    if (!nome.trim()) {
      toast.error("O nome completo é obrigatório.");
      return true;
    }
    const dataNascimentoObj = dayjs(dataNascimento);
    if (
      !dataNascimento ||
      !dataNascimentoObj.isValid() ||
      dataNascimentoObj.isAfter(dayjs())
    ) {
      toast.error("Data de Nascimento inválida ou futura.");
      return true;
    }
    if (cleanedCelular.length < 10 || cleanedCelular.length > 11) {
      toast.error("O número de celular está incompleto.");
      return true;
    }
    if (!validarCpf(cleanedCpf)) {
      toast.error("O CPF é inválido.");
      return true;
    }
    if (cleanedCep.length !== 8) {
      toast.error("O CEP deve conter 8 dígitos.");
      return true;
    }

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cleanedCep}/json/`
      );
      const data = await response.json();
      if (data.erro) {
        toast.error("CEP não encontrado.");
        return true;
      }
    } catch (error) {
      toast.error("Erro ao validar o CEP. Verifique sua conexão.");
      return true;
    }
    if (!isEmail(email)) {
      toast.error("O e-mail é inválido.");
      return true;
    }
    if (senha.length < 6 || senha.length > 100) {
      toast.error("A senha deve ter entre 6 e 100 caracteres.");
      return true;
    }
    if (!t_user) {
      toast.error("Por favor, selecione um tipo de usuário.");
      return true;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasErrors = await validateForm();
    if (hasErrors) {
      return;
    }

    setIsLoading(true);

    try {
      const dadosUsuario = {
        nome,
        email,
        senha,
      };

      const respostaUsuario = await UsuarioService.save(dadosUsuario);
      const novoUsuarioId = respostaUsuario.data.id;

      if (!novoUsuarioId) {
        toast.error("Falha ao obter o ID do novo usuário. Tente novamente.");
        setIsLoading(false);
        return;
      }

      // celular: celular.replace(/\D/g, ''),

      const dadosPessoa = {
        nome: nome,
        dataNascimento: dataNascimento,
        cpf_cnpj: cpf.replace(/\D/g, ""),
        cep: cep.replace(/\D/g, ""),
        tipo: t_user,
        usuario: { id: novoUsuarioId },
        numeroResidencia: "1",
        statusDoador: "ATIVO",
      };

      await PessoaService.save(dadosPessoa);

      toast.success("Conta criada com sucesso! Por favor, faça o login.");
      navigate("/login", { state: { email: email } });
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      toast.error(
        "Não foi possível criar a conta. Verifique os dados ou tente mais tarde."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <section className="register-section">
        <p className="title">Cadastro</p>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome Completo</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome completo"
            />
          </div>

          <div className="form-group">
            <label htmlFor="dataNascimento">Data de Nascimento</label>
            <input
              type="date"
              id="dataNascimento"
              name="dataNascimento"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="celular">Celular</label>
            <input
              type="tel"
              id="celular"
              name="celular"
              value={celular}
              onChange={(e) => setCelular(formatCelular(e.target.value))}
              placeholder="(DD) 9XXXX-XXXX"
              maxLength="15"
            />
          </div>

          <div className="form-group">
            <label htmlFor="cpf">CPF</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={cpf}
              onChange={(e) => setCpf(formatCPF(e.target.value))}
              placeholder="XXX.XXX.XXX-XX"
              maxLength="14"
            />
          </div>

          <div className="form-group">
            <label htmlFor="cep">CEP</label>
            <input
              type="text"
              id="cep"
              name="cep"
              value={cep}
              onChange={(e) => setCep(formatCEP(e.target.value))}
              placeholder="XXXXX-XXX"
              maxLength="9"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu.email@exemplo.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <div className="form-group">
            <label htmlFor="t_user">Tipo de Usuário</label>
            <select
              id="t_user"
              name="t_user"
              value={t_user}
              onChange={(e) => setT_user(e.target.value)}
            >
              <option value="" disabled>
                -- Selecione --
              </option>
              <option value="DOADOR">Doador</option>
              <option value="BENEFICIADO">Beneficiado</option>
            </select>
          </div>

          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <p className="login-link">
          Já tem uma conta? <Link to={"/login"}>Faça login aqui!</Link>
        </p>
      </section>
      <Footer />
    </>
  );
};
