import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaSearch, FaPlus, FaSpinner, FaFilter } from "react-icons/fa";

import { Footer } from "../../components/Footer/index.jsx";
import { Header } from "../../components/Header/index.jsx";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import doacaoService from "../../services/DoacaoService.js";
import categoriaService from "../../services/CategoriaService.js";
import doacao_sem_imagem from "../../assets/doacao_sem_imagem.png";
import { useDebounce } from "../../hooks/useDebounce";

import "./style.css";

export const Doacoes = () => {
  const [doacoes, setDoacoes] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  useEffect(() => {
    categoriaService
      .findAll()
      .then((response) => setCategorias(response.data))
      .catch((error) => {
        toast.error("Erro ao carregar categorias.");
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const fetchDoacoes = async () => {
      setIsLoading(true);
      try {
        const response = await doacaoService.filtrar(
          debouncedSearchTerm,
          selectedCategories
        );
        const doacoesFiltradas = response.data;

        const doacoesComEnderecoPromises = doacoesFiltradas.map(
          async (doacao) => {
            const cepLimpo = doacao.cep.replace(/\D/g, "");
            if (cepLimpo.length === 8) {
              try {
                const viaCepResponse = await fetch(
                  `https://viacep.com.br/ws/${cepLimpo}/json/`
                );
                const endereco = await viaCepResponse.json();
                return {
                  ...doacao,
                  localidade: endereco.localidade,
                  bairro: endereco.bairro,
                };
              } catch (error) {
                return doacao;
              }
            }
            return doacao;
          }
        );

        const doacoesCompletas = await Promise.all(doacoesComEnderecoPromises);
        setDoacoes(doacoesCompletas);
      } catch (error) {
        toast.error("Não foi possível carregar as doações.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoacoes();
  }, [debouncedSearchTerm, selectedCategories]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
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
              <FaFilter />
              {isFiltersOpen ? "Fechar Filtros" : "Abrir Filtros"}
            </button>

            <aside
              className={`filtros-container ${isFiltersOpen ? "open" : ""}`}
            >
              <h2>Filtros</h2>
              <div className="filtro-group">
                <h3>Categorias</h3>
                {categorias.length > 0 ? (
                  categorias.map((cat) => (
                    <label key={cat.id}>
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.id)}
                        onChange={() => handleCategoryChange(cat.id)}
                      />{" "}
                      {cat.nome}
                    </label>
                  ))
                ) : (
                  <p>Carregando categorias...</p>
                )}
              </div>
            </aside>
          </div>

          <div className="produtos-content-main">
            <div className="search-bar-container">
              <div className="search-input-wrapper">
                <input
                  type="text"
                  placeholder="Pesquisar por nome do material..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="search-button">
                  <FaSearch />
                </button>
              </div>
              <Link to="/nova-doacao" className="add-produto-button">
                <FaPlus className="plus-icon" /> Adicionar Doação
              </Link>
            </div>

            <div className="content-area">
              {isLoading ? (
                <div className="loading-container">
                  <FaSpinner className="spinner" />
                  <p>Buscando doações...</p>
                </div>
              ) : doacoes.length > 0 ? (
                <div className="cards-container">
                  {doacoes.map((doacao) => (
                    <ProductCard
                      key={doacao.id}
                      title={doacao.nome}
                      img_url={
                        doacao.foto
                          ? `data:image/jpeg;base64,${doacao.foto}`
                          : doacao_sem_imagem
                      }
                      quant={doacao.quantidade}
                      local={`${doacao.localidade || "Não informado"} / ${
                        doacao.bairro || "Não informado"
                      }`}
                      category={doacao.categoria}
                      path={`/doacao/${doacao.id}`}
                    />
                  ))}
                </div>
              ) : (
                <div className="empty-state-container">
                  <p>Nenhuma doação encontrada com os filtros selecionados.</p>
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
