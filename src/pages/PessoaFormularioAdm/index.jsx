import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { isEmail } from "validator";
import validarCpf from "validar-cpf";
import * as cnpj from "cnpj";

import PessoaService from "../../services/PessoaService";
import UsuarioService from "../../services/UsuarioService";
import { Header } from "../../components/Adm-Sidebar/Header";
import { Footer } from "../../components/Footer";
import { User, MapPin, Lock, Save } from "lucide-react";

import "./style.css";

dayjs.extend(customParseFormat);

const formatDate = (value) =>
  value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .slice(0, 10);
const formatCelular = (value) => {
  const cleaned = value.replace(/\D/g, "");
  if (cleaned.length <= 10)
    return cleaned
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .slice(0, 14);
  return cleaned
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 15);
};
const formatCpfCnpj = (value) => {
  const cleaned = value.replace(/\D/g, "");
  if (cleaned.length <= 11)
    return cleaned
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .slice(0, 14);
  return cleaned
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})/, "$1-$2")
    .slice(0, 18);
};
const formatCEP = (value) =>
  value
    .replace(/\D/g, "")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 9);

export const PessoaFormularioAdm = () => {
  const { id: usuarioId } = useParams();
  const navigate = useNavigate();
  const isEditing = !!usuarioId;
  const [pessoaId, setPessoaId] = useState(null);

  const [formData, setFormData] = useState({
    nome: "",
    dataNascimento: "",
    celular: "",
    cpfCnpj: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    cep: "",
    endereco: "",
    complemento: "",
    numero: "",
    cidade: "",
    estado: "",

    tipo: "",
    nivelAcesso: "USER",
    statusUsuario: "ATIVO",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(isEditing);

  const buscarCep = useCallback(async (cepValue) => {
    const cepLimpo = cepValue.replace(/\D/g, "");
    if (cepLimpo.length !== 8) return;
    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
      );
      const data = await response.json();
      if (data.erro) {
        toast.warn("CEP não encontrado. Preencha o endereço manualmente.");
        return;
      }
      setFormData((prev) => ({
        ...prev,
        endereco: data.logradouro,
        cidade: data.localidade,
        estado: data.uf,
      }));
    } catch (error) {
      toast.error("Erro ao buscar CEP.");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "dataNascimento") formattedValue = formatDate(value);
    else if (name === "celular") formattedValue = formatCelular(value);
    else if (name === "cpfCnpj") formattedValue = formatCpfCnpj(value);
    else if (name === "cep") formattedValue = formatCEP(value);

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));

    if (name === "cep" && formattedValue.replace(/\D/g, "").length === 8) {
      buscarCep(formattedValue);
    }
  };

  const validateForm = () => {
    const {
      nome,
      dataNascimento,
      celular,
      cpfCnpj,
      email,
      senha,
      confirmarSenha,
      cep,
      numero,
      tipo,
      nivelAcesso,
    } = formData;
    if (!nome.trim()) {
      toast.error("O Nome é obrigatório.");
      return false;
    }
    if (!isEmail(email)) {
      toast.error("Email inválido.");
      return false;
    }
    const dataNascObj = dayjs(dataNascimento, "DD/MM/YYYY");
    if (
      !dataNascimento ||
      !dataNascObj.isValid() ||
      dataNascObj.isAfter(dayjs())
    ) {
      toast.error("Data de Nascimento inválida.");
      return false;
    }
    if (celular.replace(/\D/g, "").length < 10) {
      toast.error("O número de celular está incompleto.");
      return false;
    }
    const cleanedDoc = cpfCnpj.replace(/\D/g, "");
    const isDocValid =
      cleanedDoc.length === 11
        ? validarCpf(cleanedDoc)
        : cleanedDoc.length === 14
        ? cnpj.isValid(cleanedDoc)
        : false;
    if (!isDocValid) {
      toast.error("O CPF ou CNPJ informado é inválido.");
      return false;
    }
    if (!isEditing && !senha) {
      toast.error("A Senha é obrigatória para novos usuários.");
      return false;
    }
    if (senha && senha !== confirmarSenha) {
      toast.error("As senhas não conferem.");
      return false;
    }
    if (cep.replace(/\D/g, "").length !== 8) {
      toast.error("O CEP é obrigatório e deve ter 8 dígitos.");
      return false;
    }
    if (!numero.trim() || isNaN(numero)) {
      toast.error("O Número do endereço é obrigatório.");
      return false;
    }
    if (!tipo) {
      toast.error("Por favor, selecione um Tipo de Pessoa.");
      return false;
    }
    if (!nivelAcesso) {
      toast.error("Por favor, selecione um Nível de Acesso.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      if (isEditing) {
        const payload = {
          nome: formData.nome,
          dataNascimento: dayjs(formData.dataNascimento, "DD/MM/YYYY").format(
            "YYYY-MM-DD"
          ),
          celular: formData.celular.replace(/\D/g, ""),
          cpf_cnpj: formData.cpfCnpj.replace(/\D/g, ""),
          cep: formData.cep.replace(/\D/g, ""),
          endereco: formData.endereco,
          complemento: formData.complemento,
          numeroResidencia: formData.numero,
          cidade: formData.cidade,
          estado: formData.estado,
          tipo: formData.tipo,
          usuario: {
            email: formData.email,
            statusUsuario: formData.statusUsuario,
            nivelAcesso: formData.nivelAcesso,
            ...(formData.senha && { senha: formData.senha }),
          },
        };
        await PessoaService.editar(pessoaId, payload);
        toast.success("Dados atualizados com sucesso!");
      } else {
        const dadosUsuario = {
          nome: formData.nome,
          email: formData.email,
          senha: formData.senha,
          nivelAcesso: formData.nivelAcesso,
        };
        const respostaUsuario = await UsuarioService.save(dadosUsuario);
        const novoUsuarioId = respostaUsuario.data.id;

        if (!novoUsuarioId) {
          throw new Error(
            "Não foi possível obter o ID do novo usuário criado."
          );
        }

        const dadosPessoa = {
          nome: formData.nome,
          dataNascimento: dayjs(formData.dataNascimento, "DD/MM/YYYY").format(
            "YYYY-MM-DD"
          ),
          celular: formData.celular.replace(/\D/g, ""),
          cpf_cnpj: formData.cpfCnpj.replace(/\D/g, ""),
          cep: formData.cep.replace(/\D/g, ""),
          endereco: formData.endereco,
          complemento: formData.complemento,
          numeroResidencia: formData.numero,
          cidade: formData.cidade,
          estado: formData.estado,
          tipo: formData.tipo,
          usuario: { id: novoUsuarioId },
        };
        await PessoaService.save(dadosPessoa);
        toast.success("Usuário criado com sucesso!");
      }
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Erro ao salvar:", error);
      toast.error(
        error.response?.data?.message || "Erro ao salvar. Verifique os dados."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isEditing) {
      PessoaService.findByUsuarioId(usuarioId)
        .then((response) => {
          const pessoaData = response.data;
          if (!pessoaData) {
            toast.error("Pessoa não encontrada para este usuário.");
            navigate("/admin/dashboard");
            return;
          }
          setPessoaId(pessoaData.id);
          const { usuario, tipo } = pessoaData;

          setFormData({
            nome: pessoaData.nome || "",
            dataNascimento: pessoaData.dataNascimento
              ? dayjs(pessoaData.dataNascimento).format("DD/MM/YYYY")
              : "",
            celular: pessoaData.celular
              ? formatCelular(String(pessoaData.celular))
              : "",
            cpfCnpj: pessoaData.cpf_cnpj
              ? formatCpfCnpj(String(pessoaData.cpf_cnpj))
              : "",
            email: usuario?.email || "",
            cep: pessoaData.cep ? formatCEP(String(pessoaData.cep)) : "",
            endereco: pessoaData.endereco || "",
            complemento: pessoaData.complemento || "",
            numero: pessoaData.numeroResidencia || "",
            cidade: pessoaData.cidade || "",
            estado: pessoaData.estado || "",
            tipo: tipo || "",
            nivelAcesso: usuario?.nivelAcesso || "USER",
            statusUsuario: usuario?.statusUsuario || "ATIVO",
            senha: "",
            confirmarSenha: "",
          });
        })
        .catch((error) => {
          console.error("Falha ao buscar dados da pessoa:", error);
          toast.error("Não foi possível carregar os dados. Tente novamente.");
          navigate("/admin/dashboard");
        })
        .finally(() => {
          setIsPageLoading(false);
        });
    }
  }, [usuarioId, isEditing, navigate]);

  if (isPageLoading) {
    return (
      <>
        <Header />
        <div
          className="form-page-container"
          style={{ padding: "2rem", textAlign: "center" }}
        >
          <p>Carregando informações do usuário...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="form-page-container">
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-header">
            <h1>{isEditing ? "Editar Usuário" : "Novo Usuário"}</h1>
            <button type="submit" className="btn-save" disabled={isLoading}>
              <Save size={16} />
              {isLoading
                ? "Salvando..."
                : isEditing
                ? "Salvar Alterações"
                : "Criar Usuário"}
            </button>
          </div>
          <div className="form-grid">
            <div className="form-column">
              <div className="column-header">
                <User size={20} className="column-icon" />
                <h3>Informações Pessoais</h3>
              </div>
              <div className="form-field">
                <label htmlFor="nome">Nome Completo</label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="email">E-mail</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-row-2-cols">
                <div className="form-field">
                  <label htmlFor="dataNascimento">Data de Nascimento</label>
                  <input
                    id="dataNascimento"
                    name="dataNascimento"
                    type="text"
                    placeholder="dd/mm/aaaa"
                    value={formData.dataNascimento}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="celular">Celular</label>
                  <input
                    id="celular"
                    name="celular"
                    type="text"
                    placeholder="(99) 99999-9999"
                    value={formData.celular}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="cpfCnpj">CPF / CNPJ</label>
                <input
                  id="cpfCnpj"
                  name="cpfCnpj"
                  type="text"
                  value={formData.cpfCnpj}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="tipo">Tipo de Pessoa</label>
                <select
                  id="tipo"
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    -- Selecione um tipo --
                  </option>
                  <option value="DOADOR">Doador</option>
                  <option value="BENEFICIADO">Beneficiado</option>
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="nivelAcesso">Nível de Acesso</label>
                <select
                  id="nivelAcesso"
                  name="nivelAcesso"
                  value={formData.nivelAcesso}
                  onChange={handleChange}
                  required
                >
                  <option value="USER">Usuário Padrão</option>
                  <option value="ADMIN">Administrador</option>
                </select>
              </div>
              {isEditing && (
                <div className="form-field">
                  <label htmlFor="statusUsuario">Status do Usuário</label>
                  <select
                    id="statusUsuario"
                    name="statusUsuario"
                    value={formData.statusUsuario}
                    onChange={handleChange}
                    required
                  >
                    <option value="ATIVO">Ativo</option>
                    <option value="INATIVO">Inativo</option>
                  </select>
                </div>
              )}
              <div className="column-header" style={{ marginTop: "2rem" }}>
                <Lock size={20} className="column-icon" />
                <h3>Segurança</h3>
              </div>
              <div className="form-row-2-cols">
                <div className="form-field">
                  <label htmlFor="senha">
                    Senha {isEditing && "(Deixe em branco para não alterar)"}
                  </label>
                  <input
                    id="senha"
                    name="senha"
                    type="password"
                    value={formData.senha}
                    onChange={handleChange}
                    required={!isEditing}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="confirmarSenha">Confirmar Senha</label>
                  <input
                    id="confirmarSenha"
                    name="confirmarSenha"
                    type="password"
                    value={formData.confirmarSenha}
                    onChange={handleChange}
                    required={!isEditing}
                  />
                </div>
              </div>
            </div>
            <div className="form-column">
              <div className="column-header">
                <MapPin size={20} className="column-icon" />
                <h3>Endereço</h3>
              </div>
              <div className="form-field">
                <label htmlFor="cep">CEP</label>
                <input
                  id="cep"
                  name="cep"
                  type="text"
                  value={formData.cep}
                  onChange={handleChange}
                  maxLength="9"
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="endereco">Logradouro</label>
                <input
                  id="endereco"
                  name="endereco"
                  type="text"
                  placeholder="Preenchido automaticamente"
                  value={formData.endereco}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-row-2-cols">
                <div className="form-field">
                  <label htmlFor="numero">Número</label>
                  <input
                    id="numero"
                    name="numero"
                    type="text"
                    value={formData.numero}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="complemento">Complemento</label>
                  <input
                    id="complemento"
                    name="complemento"
                    placeholder="Apto, Bloco, etc."
                    type="text"
                    value={formData.complemento}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-row-2-cols">
                <div className="form-field">
                  <label htmlFor="cidade">Cidade</label>
                  <input
                    id="cidade"
                    name="cidade"
                    type="text"
                    value={formData.cidade}
                    readOnly
                    disabled
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="estado">Estado</label>
                  <input
                    id="estado"
                    name="estado"
                    type="text"
                    value={formData.estado}
                    readOnly
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};
