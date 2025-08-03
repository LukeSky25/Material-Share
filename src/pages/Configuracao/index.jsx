import { useState } from "react";
import { isEmail, isDate } from "validator";
import { toast } from "react-toastify";
import validarCpf from "validar-cpf";

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

import "./style.css"; // Importe o seu arquivo CSS

import { Header } from "../../components/User-Sidebar/Header";
import { Footer } from "../../components/Footer";

export const Configuracao = () => {
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [complemento, setComplemento] = useState("");
  const [numero, setNumero] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  const inverteData = (data) => data.split("/").reverse().join("/");

  const isValidPhone = (valor) => {
    const phoneRegex = /^\+?\d{1,3}\d{10}$/;
    if (!phoneRegex.test(valor)) {
      toast.error("O número de telefone fornecido é inválido.");
      return false;
    }
    return true;
  };

  const buscarCep = async (cepValue) => {
    const cepLimpo = cepValue.replace(/\D/g, "");
    if (cepLimpo.length !== 8) {
      toast.error("CEP deve conter 8 dígitos.");
      return false;
    }

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
      );
      const data = await response.json();

      if (data.erro) {
        toast.error("CEP não encontrado.");
        return false;
      }

      setEndereco(data.logradouro);
      setEstado(data.uf); // O campo correto é 'uf'
      setCidade(data.localidade);
      toast.success("Endereço preenchido!");
      return true;
    } catch (error) {
      toast.error("Erro ao buscar CEP. Verifique sua conexão.");
      return false;
    }
  };

  const handleCepBlur = (e) => {
    const cepValue = e.target.value;
    if (cepValue) {
      buscarCep(cepValue);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = false;

    if (!nome) {
      formErrors = true;
      toast.error("O campo Nome é obrigatório.");
    }
    if (!dataNascimento || !isDate(inverteData(dataNascimento))) {
      formErrors = true;
      toast.error("Data de Nascimento inválida.");
    }
    if (!isValidPhone(telefone)) {
      formErrors = true;
    }
    if (!validarCpf(cpf)) {
      formErrors = true;
      toast.error("CPF Inválido.");
    }
    if (!cep) {
      formErrors = true;
      toast.error("O campo CEP é obrigatório.");
    }
    if (!isEmail(email)) {
      formErrors = true;
      toast.error("Email Inválido.");
    }
    if (!complemento) {
      formErrors = true;
      toast.error("O campo Complemento é obrigatório.");
    }
    if (!numero || isNaN(numero)) {
      formErrors = true;
      toast.error("Número Inválido.");
    }

    if (formErrors) return;

    // Se todas as validações passarem, você pode prosseguir com o envio
    toast.success("Informações atualizadas com sucesso!");
    // Aqui você enviaria os dados para sua API/backend
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit} noValidate>
        <div className="config-page">
          <div className="config-container">
            <div className="card config-header">
              <div className="config-header-title">
                <div className="config-header-icon">
                  <Settings style={{ color: "white" }} size={24} />
                </div>
                <div>
                  <h1>Configurações</h1>
                  <p>Gerencie suas informações pessoais e preferências</p>
                </div>
              </div>
              <button type="submit" className="btn-primary">
                <Edit size={16} />
                <span>Salvar Alterações</span>
              </button>
            </div>

            <div className="form-grid">
              {/* Informações Pessoais */}
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
                      className="form-input focus-blue"
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
                      onChange={(e) => setDataNascimento(e.target.value)}
                      className="form-input focus-blue"
                    />
                  </div>
                  <div className="form-row-2-cols">
                    <div>
                      <label className="form-label">
                        <Phone size={16} />
                        <span>Telefone</span>
                      </label>
                      <input
                        type="text"
                        placeholder="+5511999998888"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        className="form-input focus-blue"
                      />
                    </div>
                    <div>
                      <label className="form-label">
                        <CreditCard size={16} />
                        <span>CPF</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Digite seu CPF..."
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        className="form-input focus-blue"
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
                      className="form-input focus-blue"
                    />
                  </div>
                </div>
              </div>

              {/* Endereço */}
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
                      onChange={(e) => setCep(e.target.value)}
                      onBlur={handleCepBlur}
                      className="form-input focus-green"
                    />
                  </div>
                  <div>
                    <label className="form-label">Endereço</label>
                    <input
                      type="text"
                      placeholder="Preenchido automaticamente"
                      value={endereco}
                      onChange={(e) => setEndereco(e.target.value)}
                      className="form-input focus-green"
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
                      className="form-input focus-green"
                    />
                  </div>
                  <div className="form-row-3-cols">
                    <div>
                      <label className="form-label">Número</label>
                      <input
                        type="text"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                        className="form-input focus-green"
                      />
                    </div>
                    <div>
                      <label className="form-label">Cidade</label>
                      <input
                        type="text"
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                        className="form-input focus-green"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="form-label">Estado</label>
                      <input
                        type="text"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        className="form-input focus-green"
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
