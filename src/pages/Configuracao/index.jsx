import { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { isEmail } from "validator";
import validarCpf from "validar-cpf";
import * as cnpj from "cnpj";

import PessoaService from "../../services/PessoaService";
import UsuarioService from "../../services/UsuarioService";

import { Header } from "../../components/User-Sidebar/Header";
import { Footer } from "../../components/Footer/index";
import ConfirmationModal from "../../components/ConfirmationModal";

import {
  Settings,
  Edit,
  User,
  MapPin,
  Lock,
  AlertTriangle,
} from "lucide-react";

import "./style.css";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export const Configuracao = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [pessoa, setPessoa] = useState(null);

  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [celular, setCelular] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [cep, setCep] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [complemento, setComplemento] = useState("");
  const [numero, setNumero] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .slice(0, 10);
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

  const formatCpfCnpj = (value) => {
    const cleanedValue = value.replace(/\D/g, "");
    if (cleanedValue.length <= 11) {
      return cleanedValue
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .slice(0, 14);
    } else {
      return cleanedValue
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d{1,2})/, "$1-$2")
        .slice(0, 18);
    }
  };

  const formatCEP = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 9);
  };

  const buscarCep = useCallback(async (cepValue) => {
    const cepLimpo = cepValue.replace(/\D/g, "");
    if (cepLimpo.length !== 8) return;

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
      );
      const data = await response.json();
      if (data.erro) {
        toast.error("CEP não encontrado.");
        return;
      }
      setEndereco(data.logradouro);
      setEstado(data.uf);
      setCidade(data.localidade);
    } catch (error) {
      toast.error("Erro ao buscar CEP. Verifique sua conexão.");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsPageLoading(true);
      try {
        const response = await PessoaService.findById(id);
        const pessoaData = response.data;

        if (pessoaData) {
          setPessoa(pessoaData);
          setNome(pessoaData.nome || "");

          setEmail(pessoaData.usuario?.email || "");
          setDataNascimento(
            pessoaData.dataNascimento
              ? dayjs(pessoaData.dataNascimento).format("DD/MM/YYYY")
              : ""
          );
          setCelular(
            pessoaData.celular ? formatCelular(pessoaData.celular) : ""
          );
          setCpfCnpj(
            pessoaData.cpf_cnpj ? formatCpfCnpj(pessoaData.cpf_cnpj) : ""
          );

          const cepDoBanco = pessoaData.cep || "";
          setCep(cepDoBanco ? formatCEP(cepDoBanco) : "");
          setEndereco(pessoaData.endereco || "");
          setComplemento(pessoaData.complemento || "");
          setNumero(pessoaData.numeroResidencia || "");
          setCidade(pessoaData.cidade || "");
          setEstado(pessoaData.estado || "");

          if (cepDoBanco && !pessoaData.endereco) {
            buscarCep(cepDoBanco);
          }
        } else {
          toast.error("Usuário não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        toast.error("Não foi possível carregar os dados do usuário.");
        navigate("/");
      } finally {
        setIsPageLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, buscarCep, navigate]);

  useEffect(() => {
    const cepLimpo = cep.replace(/\D/g, "");
    if (cepLimpo.length === 8) {
      buscarCep(cepLimpo);
    }
  }, [cep, buscarCep]);

  const validateForm = () => {
    const cleanedDoc = cpfCnpj.replace(/\D/g, "");
    const cleanedCelular = celular.replace(/\D/g, "");

    if (!nome.trim()) {
      toast.error("O campo Nome é obrigatório.");
      return false;
    }
    const dataNascObj = dayjs(dataNascimento, "DD/MM/YYYY");
    if (!dataNascObj.isValid() || dataNascObj.isAfter(dayjs())) {
      toast.error("Data de Nascimento inválida ou futura.");
      return false;
    }
    if (cleanedCelular.length < 10 || cleanedCelular.length > 11) {
      toast.error("O número de celular está incompleto.");
      return false;
    }
    let isDocValid = false;
    if (cleanedDoc.length === 11) isDocValid = validarCpf(cleanedDoc);
    else if (cleanedDoc.length === 14) isDocValid = cnpj.isValid(cleanedDoc);
    if (!isDocValid) {
      toast.error("O CPF ou CNPJ informado é inválido.");
      return false;
    }
    if (!isEmail(email)) {
      toast.error("Email Inválido.");
      return false;
    }
    if (cep.replace(/\D/g, "").length !== 8) {
      toast.error("O campo CEP é obrigatório e deve ter 8 dígitos.");
      return false;
    }
    if (!numero || isNaN(numero)) {
      toast.error(
        "O campo Número do endereço é obrigatório e deve ser numérico."
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const dadosAtualizados = {
        nome,
        dataNascimento: dayjs(dataNascimento, "DD/MM/YYYY").format(
          "YYYY-MM-DD"
        ),
        celular: celular.replace(/\D/g, ""),
        cpf_cnpj: cpfCnpj.replace(/\D/g, ""),
        cep: cep.replace(/\D/g, ""),
        email,
        complemento,
        numeroResidencia: numero,
        usuario: {
          id: JSON.parse(localStorage.getItem("user")).usuario.id,
          email,
        },
      };

      await PessoaService.editar(id, dadosAtualizados);

      toast.success("Informações atualizadas com sucesso!");
    } catch (error) {
      console.error("Erro ao editar usuário:", error);
      const errorResponseString = JSON.stringify(error.response?.data || "");
      if (
        errorResponseString.includes("UNIQUE KEY") ||
        errorResponseString.includes("chave duplicada") ||
        errorResponseString.includes("Este e-mail já está cadastrado")
      ) {
        toast.error("Este e-mail já está em uso por outra conta.");
      } else {
        toast.error(
          "Não foi possível editar a conta. Verifique os dados ou tente mais tarde."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInativarClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmarInativacao = async () => {
    if (!pessoa || !pessoa.usuario?.id) {
      toast.error("Não foi possível identificar o usuário para inativar.");
      setIsModalOpen(false);
      return;
    }

    setIsLoading(true);
    try {
      await UsuarioService.inativar(pessoa.usuario.id);

      toast.success(
        "Sua conta foi inativada com sucesso. Você será desconectado."
      );

      UsuarioService.logout();

      navigate("/");
    } catch (error) {
      console.error("Erro ao inativar conta:", error);
      toast.error("Não foi possível inativar a conta. Tente novamente.");
      setIsLoading(false);
    } finally {
      setIsModalOpen(false);
    }
  };

  if (isPageLoading) {
    return (
      <>
        <Header />
        <div className="config-page">
          <p>Carregando informações do usuário...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit} noValidate>
        <div className="config-page">
          <div className="config-container">
            <div className="config-header">
              <div className="config-header-left">
                <div className="config-icon-wrapper">
                  <Settings size={28} color="#2563eb" />
                </div>
                <div className="config-header-text">
                  <h1>Configurações</h1>
                  <p>Gerencie suas informações pessoais e preferências</p>
                </div>
              </div>
              <button
                type="submit"
                className="btn-primary"
                disabled={isLoading}
              >
                <Edit size={16} />
                <span>{isLoading ? "Salvando..." : "Editar"}</span>
              </button>
            </div>

            <div className="main-card">
              <div className="profile-form-grid">
                <div className="form-column">
                  <div className="column-header">
                    <User
                      className="column-icon"
                      size={22}
                      style={{ color: "#447aef" }}
                    />
                    <h3>Informações Pessoais</h3>
                  </div>
                  <div className="form-field">
                    <label htmlFor="nome">Nome Completo</label>
                    <input
                      id="nome"
                      type="text"
                      placeholder="Digite seu Nome Completo..."
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="dataNascimento">Data de Nascimento</label>
                    <input
                      id="dataNascimento"
                      type="text"
                      placeholder="dd/mm/aaaa"
                      value={dataNascimento}
                      onChange={(e) =>
                        setDataNascimento(formatDate(e.target.value))
                      }
                      className="form-input"
                    />
                  </div>
                  <div className="form-row-2-cols">
                    <div className="form-field">
                      <label htmlFor="celular">Telefone</label>
                      <input
                        id="celular"
                        type="text"
                        placeholder="Digite o seu Telefone..."
                        value={celular}
                        maxLength="15"
                        onChange={(e) =>
                          setCelular(formatCelular(e.target.value))
                        }
                        className="form-input"
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="cpfCnpj">CPF</label>
                      <input
                        id="cpfCnpj"
                        type="text"
                        value={cpfCnpj}
                        placeholder="Digite seu CPF..."
                        maxLength="18"
                        onChange={(e) =>
                          setCpfCnpj(formatCpfCnpj(e.target.value))
                        }
                        className="form-input"
                      />
                    </div>
                  </div>
                  <div className="form-field">
                    <label htmlFor="email">E-mail</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Digite seu Email..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-column">
                  <div className="column-header">
                    <MapPin
                      className="column-icon"
                      size={22}
                      style={{ color: "#44ef4d" }}
                    />
                    <h3>Endereço</h3>
                  </div>
                  <div className="form-field">
                    <label htmlFor="cep">CEP</label>
                    <input
                      id="cep"
                      type="text"
                      placeholder="Digite seu CEP..."
                      value={cep}
                      onChange={(e) => setCep(formatCEP(e.target.value))}
                      className="form-input"
                      maxLength="9"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="endereco">Endereço</label>
                    <input
                      id="endereco"
                      type="text"
                      placeholder="Preenchido automaticamente"
                      value={endereco}
                      onChange={(e) => setEndereco(e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="complemento">Complemento</label>
                    <input
                      id="complemento"
                      type="text"
                      placeholder="Apartamento, bloco, etc..."
                      value={complemento}
                      onChange={(e) => setComplemento(e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div className="form-row-3-cols">
                    <div className="form-field">
                      <label htmlFor="numero">Número</label>
                      <input
                        id="numero"
                        type="text"
                        placeholder="Digite o número"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                        className="form-input"
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="cidade">Cidade</label>
                      <input
                        id="cidade"
                        type="text"
                        placeholder="Cidade"
                        value={cidade}
                        readOnly
                        className="form-input"
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="estado">Estado</label>
                      <input
                        id="estado"
                        type="text"
                        placeholder="Estado"
                        value={estado}
                        readOnly
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bottom-cards-grid">
              <div className="action-card">
                <div className="action-card-header">
                  <Lock size={22} style={{ color: "#e6d818" }} />
                  <h4>Segurança</h4>
                </div>
                <p className="action-card-description">
                  Gerencie suas configurações de segurança
                </p>

                <Link
                  type="button"
                  className="btn btn-warning"
                  to={`/alterarSenha/${pessoa.usuario.id}`}
                >
                  Alterar Senha
                </Link>
              </div>
              <div className="action-card danger-zone">
                <div className="action-card-header">
                  <AlertTriangle size={22} />
                  <h4>Inativar Conta</h4>
                </div>
                <p className="action-card-description">
                  Esta ação é permanente e não pode ser desfeita.
                </p>

                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleInativarClick}
                >
                  Inativar a Conta
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Footer />

      {isModalOpen && (
        <ConfirmationModal
          message="Tem certeza que deseja inativar sua conta? Esta ação é permanente e você perderá o acesso ao sistema."
          onConfirm={handleConfirmarInativacao}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};
