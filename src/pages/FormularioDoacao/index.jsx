import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUpload, FaSpinner, FaMapMarkerAlt } from "react-icons/fa";

import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { isUserLoggedIn } from "../../auth/authService.js";
import doacaoService from "../../services/DoacaoService.js";
import categoriaService from "../../services/CategoriaService.js";

import "./style.css";
import "../../styles/global.css";

export const FormularioDoacao = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    quantidade: "",
    cep: "",
    numeroResidencia: "",
    complemento: "",
    categoriaId: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(isEditMode);

  const [categorias, setCategorias] = useState([]);
  const [loadingCategorias, setLoadingCategorias] = useState(true);

  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [address, setAddress] = useState({});
  const [cepError, setCepError] = useState("");

  useEffect(() => {
    categoriaService
      .findAll()
      .then((response) => setCategorias(response.data))
      .catch((error) => {
        toast.error("Não foi possível carregar as categorias.");
        console.log(error);
      })
      .finally(() => setLoadingCategorias(false));
  }, []);

  useEffect(() => {
    const user = isUserLoggedIn();
    if (user && user.loggedIn) {
      setUsuarioLogado(user.data);
    } else {
      toast.warn("Você precisa estar logado para acessar esta página.");
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (isEditMode && id) {
      setIsLoading(true);
      doacaoService
        .findById(id)
        .then((response) => {
          const {
            nome,
            descricao,
            quantidade,
            cep,
            numeroResidencia,
            complemento,
            categoria,
            foto,
          } = response.data;
          setFormData({
            nome,
            descricao: descricao || "",
            quantidade,
            cep,
            numeroResidencia,
            complemento: complemento || "",
            categoriaId: categoria.id,
          });
          if (foto) {
            setImagePreview(`data:image/jpeg;base64,${foto}`);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(
            "Doação não encontrada ou você não tem permissão para editá-la."
          );

          navigate("/minhas-doacoes");
        })
        .finally(() => setIsLoading(false));
    }
  }, [id, isEditMode, navigate]);

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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      if (isEditMode) {
        // Não limpa a preview se for edição e o usuário cancelar a seleção
      } else {
        setImagePreview(null);
      }
      if (file)
        toast.error("Por favor, selecione um arquivo de imagem válido.");
    }
  };

  const handleUseMyAddress = () => {
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
    if (!usuarioLogado?.id) {
      toast.error("Sessão inválida. Por favor, faça login novamente.");
      return;
    }
    setIsSubmitting(true);

    const dataPayload = { ...formData, foto: imageFile };

    try {
      if (isEditMode) {
        await doacaoService.editar(id, dataPayload);
        toast.success("Doação atualizada com sucesso!");
      } else {
        dataPayload.pessoaId = usuarioLogado.id;
        await doacaoService.createComFoto(dataPayload);
        toast.success("Doação cadastrada com sucesso!");
      }
      navigate(`/minhasDoacoes/${usuarioLogado.id}`);
    } catch (error) {
      console.error("Erro ao salvar doação:", error);
      toast.error(
        "Erro ao salvar doação. Verifique os campos e tente novamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="page-container">
        <Header />
        <main
          className="form-page-container"
          style={{ textAlign: "center", paddingTop: "5rem" }}
        >
          <FaSpinner className="spinner" />
          <p>Carregando dados da doação...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-container">
      <Header />
      <main className="form-page-container">
        <div className="form-wrapper">
          <header className="form-header">
            <h1>{isEditMode ? "Editar Doação" : "Cadastrar Nova Doação"}</h1>
            <p>
              {isEditMode
                ? "Altere os dados abaixo para atualizar o material."
                : "Preencha os dados abaixo para disponibilizar o material."}
            </p>
          </header>

          <form onSubmit={handleSubmit} noValidate>
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
                      ? "Carregando..."
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
                  <FaMapMarkerAlt /> Usar meu endereço
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
                  <FaUpload />{" "}
                  <span>{imageFile ? imageFile.name : "Escolher arquivo"}</span>
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
              ) : isEditMode ? (
                "Salvar Alterações"
              ) : (
                "Cadastrar Doação"
              )}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};
