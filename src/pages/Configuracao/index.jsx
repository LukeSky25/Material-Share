import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { isEmail } from "validator";
import validarCpf from "validar-cpf";
import * as cnpj from "cnpj";

import PessoaService from "../../services/PessoaService";
import { Header } from "../../components/User-Sidebar/Header";
import { Footer } from "../../components/Footer";

import {
  Settings,
  Edit,
  User,
  Calendar,
  Phone,
  CreditCard,
  Mail,
  MapPin,
} from "lucide-react";

import "./style.css";

import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export const Configuracao = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  // Estados do formulário
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

  // --- FUNÇÕES DE FORMATAÇÃO (MÁSCARAS) ---
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

  // --- LÓGICA DE BUSCA DE DADOS E CEP ---

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
      try {
        const response = await PessoaService.findById(id);
        const pessoa = response.data;

        setNome(pessoa.nome || "");
        setEmail(pessoa.usuario.email || "");

        setDataNascimento(
          pessoa.dataNascimento
            ? dayjs(pessoa.dataNascimento).format("DD/MM/YYYY")
            : ""
        );
        setCelular(pessoa.telefone ? formatCelular(pessoa.telefone) : "");
        setCpfCnpj(pessoa.cpf_cnpj ? formatCpfCnpj(pessoa.cpf_cnpj) : "");

        const cepDoBanco = pessoa.cep || "";
        setCep(cepDoBanco ? formatCEP(cepDoBanco) : "");

        setEndereco(pessoa.endereco || "");
        setComplemento(pessoa.complemento || "");
        setNumero(pessoa.numeroResidencia || "");
        setCidade(pessoa.cidade || "");
        setEstado(pessoa.estado || "");

        if (cepDoBanco && !pessoa.endereco) {
          buscarCep(cepDoBanco);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        toast.error("Não foi possível carregar os dados do usuário.");
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, buscarCep]);

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
        telefone: celular.replace(/\D/g, ""),
        cpf_cnpj: cpfCnpj.replace(/\D/g, ""),
        cep: cep.replace(/\D/g, ""),
        email,
        complemento,
        numeroResidencia: numero,
      };

      await PessoaService.editar(id, dadosAtualizados);

      toast.success("Informações atualizadas com sucesso!");
      console.log("Enviando dados:", dadosAtualizados);
    } catch (error) {
      console.error("Erro ao editar usuário:", error);
      toast.error(
        "Não foi possível editar a conta. Verifique os dados ou tente mais tarde."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit} noValidate>
        <div className="config-page">
          <div className="config-container">
            <div className="config-header">
              <div className="config-header-left">
                <div className="config-header-icon">
                  <Settings style={{ color: "white" }} size={24} />
                </div>
                <h1>Configurações</h1>
              </div>
              <button
                type="submit"
                className="btn-primary"
                disabled={isLoading}
              >
                <Edit size={16} />
                <span>{isLoading ? "Salvando" : "Salvar Alterações"}</span>
              </button>
              <p className="config-subtitle">
                Gerencie suas informações pessoais e preferências
              </p>
            </div>

            <div className="form-grid">
              <div className="card">
                <div className="form-card-header">
                  <User style={{ color: "#2563eb" }} size={22} />
                  <h2>Informações Pessoais</h2>
                </div>
                <div className="form-group-stack">
                  <div>
                    <label className="form-label">
                      <User size={16} />
                      <span>Nome Completo</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Digite seu Nome Completo..."
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="form-label">
                      <Calendar size={16} />
                      <span>Data de Nascimento</span>
                    </label>
                    <input
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
                    <div>
                      <label className="form-label">
                        <Phone size={16} />
                        <span>Celular</span>
                      </label>
                      <input
                        type="text"
                        placeholder="(DD) 9XXXX-XXXX"
                        value={celular}
                        maxLength="15"
                        onChange={(e) =>
                          setCelular(formatCelular(e.target.value))
                        }
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label className="form-label">
                        <CreditCard size={16} />
                        <span>CPF ou CNPJ</span>
                      </label>
                      <input
                        type="text"
                        value={cpfCnpj}
                        placeholder="Seu CPF ou CNPJ"
                        maxLength="18"
                        onChange={(e) =>
                          setCpfCnpj(formatCpfCnpj(e.target.value))
                        }
                        className="form-input"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="form-label">
                      <Mail size={16} />
                      <span>E-mail</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Digite seu Email..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="form-card-header">
                  <MapPin style={{ color: "#16a34a" }} size={22} />
                  <h2>Endereço</h2>
                </div>
                <div className="form-group-stack">
                  <div>
                    <label className="form-label">CEP</label>
                    <input
                      type="text"
                      placeholder="Digite seu CEP..."
                      value={cep}
                      onChange={(e) => setCep(formatCEP(e.target.value))}
                      className="form-input"
                      maxLength="9"
                    />
                  </div>
                  <div>
                    <label className="form-label">Endereço</label>
                    <input
                      type="text"
                      placeholder="Preenchido automaticamente"
                      value={endereco}
                      onChange={(e) => setEndereco(e.target.value)}
                      className="form-input"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="form-label">Complemento</label>
                    <input
                      type="text"
                      placeholder="Apartamento, bloco, etc..."
                      value={complemento}
                      onChange={(e) => setComplemento(e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div className="form-row-3-cols">
                    <div>
                      <label className="form-label">Número</label>
                      <input
                        type="text"
                        placeholder="Número"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label className="form-label">Cidade</label>
                      <input
                        type="text"
                        placeholder="Cidade"
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                        className="form-input"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="form-label">Estado</label>
                      <input
                        type="text"
                        placeholder="Estado"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        className="form-input"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Footer />
    </>
  );
};
