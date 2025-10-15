import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaSearch,
  FaPlus,
  FaSpinner,
  FaFilter,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
} from "react-icons/fa";

import { Footer } from "../../components/Footer";
import { Header } from "../../components/Adm-Sidebar/Header";
import doacaoService from "../../services/DoacaoService.js";
import categoriaService from "../../services/CategoriaService.js";
import doacao_sem_imagem from "../../assets/doacao_sem_imagem.png";
import { useDebounce } from "../../hooks/useDebounce";

import "./style.css";

export const DashboardDoacoes = () => {
  const [todasAsDoacoes, setTodasAsDoacoes] = useState([]);
  const [doacoesFiltradas, setDoacoesFiltradas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filtroStatus, setFiltroStatus] = useState("TODOS");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [isFiltersOpen, setIsFiltersOpen] = useState(window.innerWidth > 992);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    Promise.all([doacaoService.findAll(), categoriaService.findAll()])
      .then(([doacoesResponse, categoriasResponse]) => {
        setTodasAsDoacoes(doacoesResponse.data);
        setCategorias(categoriasResponse.data);
      })
      .catch(() => {
        toast.error("Erro ao carregar dados iniciais.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    let itemsFiltrados = [...todasAsDoacoes];

    if (debouncedSearchTerm) {
      itemsFiltrados = itemsFiltrados.filter((doacao) =>
        doacao.nome.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      itemsFiltrados = itemsFiltrados.filter((doacao) =>
        selectedCategories.includes(doacao.categoria.id)
      );
    }

    if (filtroStatus !== "TODOS") {
      itemsFiltrados = itemsFiltrados.filter(
        (doacao) => doacao.statusDoacao === filtroStatus
      );
    }

    setDoacoesFiltradas(itemsFiltrados);
  }, [debouncedSearchTerm, selectedCategories, filtroStatus, todasAsDoacoes]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleEdit = (id) => {
    navigate(`/admin/editar-doacao/${id}`);
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("Tem certeza que deseja marcar esta doação como INATIVA?")
    ) {
      try {
        await doacaoService.inativar(id, "INATIVO");
        toast.success("Doação inativada com sucesso!");

        const novasDoacoes = todasAsDoacoes.map((d) =>
          d.id === id ? { ...d, statusDoacao: "INATIVO" } : d
        );
        setTodasAsDoacoes(novasDoacoes);
      } catch (error) {
        toast.error("Erro ao inativar doação.");
      }
    }
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case "DOADO":
        return (
          <>
            <FaCheckCircle /> DOADO
          </>
        );
      case "INATIVO":
        return (
          <>
            <FaTimesCircle /> INATIVO
          </>
        );
      case "ATIVO":
        return (
          <>
            <FaExclamationCircle /> ATIVO
          </>
        );
      default:
        return status;
    }
  };

  return (
    <div className="page-container">
      <Header />
      <main>
        <section className="produtos-page-layout">
          <div className="filtros-sidebar">
            <button
              className="toggle-filters-button"
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            >
              <FaFilter /> Filtros
            </button>
            <aside
              className={`filtros-container ${isFiltersOpen ? "open" : ""}`}
            >
              <h2>Filtros</h2>

              <div className="filtro-group">
                <h3>Status da Doação</h3>
                <select
                  className="filtro-select"
                  value={filtroStatus}
                  onChange={(e) => setFiltroStatus(e.target.value)}
                >
                  <option value="TODOS">Todos os Status</option>
                  <option value="ATIVO">Ativo</option>
                  <option value="INATIVO">Inativo</option>
                  <option value="DOADO">Doado</option>
                </select>
              </div>

              <div className="filtro-group">
                <h3>Categorias</h3>
                {categorias.map((cat) => (
                  <label key={cat.id}>
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.id)}
                      onChange={() => handleCategoryChange(cat.id)}
                    />
                    {cat.nome}
                  </label>
                ))}
              </div>
            </aside>
          </div>
          <div className="produtos-content-main">
            <div className="search-bar-container">
              <div className="search-input-wrapper">
                <FaSearch className="search-button" />
                <input
                  type="text"
                  placeholder="Pesquisar por nome do material..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Link to="/admin/nova-doacao" className="add-produto-button">
                <FaPlus /> Adicionar Produto
              </Link>
            </div>

            <div className="content-area">
              {isLoading ? (
                <div className="loading-container">
                  <FaSpinner className="spinner" />
                  <p>Buscando produtos...</p>
                </div>
              ) : doacoesFiltradas.length > 0 ? (
                <div className="cards-container">
                  {doacoesFiltradas.map((doacao) => (
                    <div key={doacao.id} className="admin-product-card">
                      <div className="image-container">
                        <div
                          className={`status-overlay status-${doacao.statusDoacao?.toLowerCase()}`}
                        >
                          {renderStatusBadge(doacao.statusDoacao)}
                        </div>
                        <img
                          src={
                            doacao.foto
                              ? `data:image/jpeg;base64,${doacao.foto}`
                              : doacao_sem_imagem
                          }
                          alt={doacao.nome}
                          className="product-image"
                        />
                      </div>
                      <div className="product-info">
                        <h3>{doacao.nome}</h3>
                        <p>Quantidade: {doacao.quantidade}</p>
                        <span className="card-info-tag">
                          {doacao.categoria.nome}
                        </span>
                      </div>
                      <div className="product-actions">
                        <button
                          className="action-btn edit"
                          onClick={() => handleEdit(doacao.id)}
                        >
                          <FaEdit /> Editar
                        </button>
                        <button
                          className="action-btn delete"
                          onClick={() => handleDelete(doacao.id)}
                        >
                          <FaTrash /> Inativar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state-container">
                  <p>Nenhum produto encontrado com os filtros aplicados.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
