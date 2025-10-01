import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUpload, FaSpinner, FaMapMarkerAlt } from "react-icons/fa";

import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { isUserLoggedIn } from "../../auth/authService.js";
import doacaoService from "../../services/DoacaoService.js";
import categoriaService from "../../services/CategoriaService.js";

import "./style.css";
import "../../styles/global.css";

export const Nova_Doacao = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    quantidade: "",
    cep: "",
    numeroResidencia: "",
    complemento: "",
    categoriaId: "",
    foto: null,
  });

  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [address, setAddress] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cepError, setCepError] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [loadingCategorias, setLoadingCategorias] = useState(true);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await categoriaService.findAll();
        setCategorias(response.data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        toast.error("Não foi possível carregar as categorias.");
      } finally {
        setLoadingCategorias(false);
      }
    };
    fetchCategorias();
  }, []);

  useEffect(() => {
    const checkUser = () => {
      const { loggedIn, data } = isUserLoggedIn();
      if (loggedIn) {
        // --- CORREÇÃO 1: Salve o objeto COMPLETO no estado ---
        // O objeto 'data' já contém tudo que precisamos (Pessoa e Usuário).
        setUsuarioLogado(data);
      } else {
        toast.warn("Você precisa estar logado para criar uma doação.");
        navigate("/login");
      }
    };
    checkUser();
  }, [navigate]);

  useEffect(() => {
    const cepLimpo = formData.cep.replace(/\D/g, "");
    if (cepLimpo.length === 8) {
      fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
        .then((res) => res.json())
        .then((data) => {
          if (data.erro) {
            setCepError("CEP não encontrado.");
            setAddress({});
          } else {
            setAddress({
              rua: data.logradouro,
              bairro: data.bairro,
              cidade: data.localidade,
              estado: data.uf,
            });
            setCepError("");
          }
        });
    } else {
      setAddress({});
    }
  }, [formData.cep]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Cria uma variável para o valor final
    let finalValue = value;

    // Se o campo for 'categoriaId' e o valor não for vazio, converte para número
    if (name === "categoriaId") {
      finalValue = parseInt(value, 10);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({ ...prev, foto: file }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, foto: null }));
      setImagePreview(null);
      toast.error("Por favor, selecione um arquivo de imagem válido.");
    }
  };

  const handleUseMyAddress = () => {
    // --- CORREÇÃO 2: Acesse os dados de endereço diretamente ---
    // Agora 'usuarioLogado' é o objeto completo, então podemos acessar 'cep' diretamente.
    if (usuarioLogado && usuarioLogado.cep) {
      setFormData((prev) => ({
        ...prev,
        cep: usuarioLogado.cep || "",
        numeroResidencia: usuarioLogado.numeroResidencia || "",
        complemento: usuarioLogado.complemento || "",
      }));
      toast.info("Endereço preenchido com seus dados!");
    } else {
      toast.warn("Seu perfil não possui um endereço cadastrado.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuarioLogado || !usuarioLogado.id) {
      toast.error("Sessão expirada. Por favor, faça login novamente.");
      return;
    }

    setIsSubmitting(true);

    const camposObrigatorios = { ...formData };
    delete camposObrigatorios.foto;
    delete camposObrigatorios.complemento;

    for (const key in camposObrigatorios) {
      if (!camposObrigatorios[key]) {
        toast.error(`O campo "${key}" é obrigatório.`);
        setIsSubmitting(false);
        return;
      }
    }

    const dataToSend = {
      ...formData,
      pessoaId: usuarioLogado.id, // O 'id' do objeto principal (Pessoa)
    };

    console.log(dataToSend);

    try {
      await doacaoService.createComFoto(dataToSend);

      toast.success("Doação cadastrada com sucesso!");
      navigate("/doacoes");
    } catch (error) {
      console.error("Erro ao cadastrar doação:", error);
      toast.error("Erro ao cadastrar doação. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="form-page-container">
        <div className="form-wrapper">
          <header className="form-header">
            <h1>Cadastrar Nova Doação</h1>
            <p>Preencha os dados abaixo para disponibilizar o material.</p>
          </header>

          <form onSubmit={handleSubmit} noValidate>
            {/* O JSX do formulário não precisa de nenhuma alteração */}
            <div className="form-group">
              <label htmlFor="nome">Nome do Material</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="descricao">Descrição</label>
              <textarea
                id="descricao"
                name="descricao"
                rows="4"
                value={formData.descricao}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="form-grid-2-cols">
              <div className="form-group">
                <label htmlFor="quantidade">
                  Quantidade (unidades, kg, etc)
                </label>
                <input
                  type="text"
                  id="quantidade"
                  name="quantidade"
                  value={formData.quantidade}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="categoriaId">Categoria</label>
                <select
                  id="categoriaId"
                  name="categoriaId"
                  value={formData.categoriaId}
                  onChange={handleChange}
                  required
                  disabled={loadingCategorias}
                >
                  <option value="" disabled>
                    {loadingCategorias
                      ? "Carregando categorias..."
                      : "Selecione uma categoria"}
                  </option>
                  {categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <hr className="form-divider" />
            <div className="form-section-header">
              <h2 className="form-subtitle">Endereço de Retirada</h2>
              {usuarioLogado && (
                <button
                  type="button"
                  className="use-my-address-btn"
                  onClick={handleUseMyAddress}
                >
                  <FaMapMarkerAlt />
                  Usar meu endereço
                </button>
              )}
            </div>
            <div className="form-grid-2-cols">
              <div className="form-group">
                <label htmlFor="cep">CEP</label>
                <input
                  type="text"
                  id="cep"
                  name="cep"
                  maxLength="9"
                  placeholder="00000-000"
                  value={formData.cep}
                  onChange={handleChange}
                  required
                />
                {cepError && (
                  <small className="error-message">{cepError}</small>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="numeroResidencia">Número</label>
                <input
                  type="text"
                  id="numeroResidencia"
                  name="numeroResidencia"
                  value={formData.numeroResidencia}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="complemento">Complemento (opcional)</label>
              <input
                type="text"
                id="complemento"
                name="complemento"
                value={formData.complemento}
                onChange={handleChange}
              />
            </div>
            {address.rua && (
              <div className="address-preview">
                <p>
                  <strong>Rua:</strong> {address.rua}
                </p>
                <p>
                  <strong>Bairro:</strong> {address.bairro}
                </p>
                <p>
                  <strong>Cidade/UF:</strong> {address.cidade} /{" "}
                  {address.estado}
                </p>
              </div>
            )}
            <hr className="form-divider" />
            <div className="form-group-upload">
              <div className="upload-actions">
                <label>Foto do Material (opcional)</label>
                <label htmlFor="foto" className="file-upload-label">
                  <FaUpload />
                  <span>
                    {formData.foto ? formData.foto.name : "Escolher arquivo"}
                  </span>
                </label>
                <input
                  type="file"
                  id="foto"
                  name="foto"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              <div className="upload-preview">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Pré-visualização"
                    className="image-preview-active"
                  />
                ) : (
                  <div className="image-preview-placeholder">
                    <span>Sua imagem aparecerá aqui</span>
                  </div>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <FaSpinner className="spinner" />
              ) : (
                "Cadastrar Doação"
              )}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};
