import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaSearch, FaPlus, FaSpinner } from "react-icons/fa";

import { Footer } from "../../components/Footer/index.jsx";
import { Header } from "../../components/Header/index.jsx";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import doacaoService from "../../services/DoacaoService.js";
import categoriaService from "../../services/CategoriaService.js";
import doacao_sem_imagem from "../../assets/doacao_sem_imagem.png";
import { useDebounce } from "../../hooks/useDebounce";

import "./style.css";

export const Doacoes = () => {
  // Estados para os dados
  const [doacoes, setDoacoes] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Estados para os filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Aplica o debounce ao termo de busca
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Efeito para buscar as categorias UMA VEZ
  useEffect(() => {
    categoriaService
      .findAll()
      .then((response) => setCategorias(response.data))
      .catch((error) => {
        toast.error("Erro ao carregar categorias.");
        console.log(error);
      });
  }, []);

  // Efeito principal para buscar as doações filtradas
  useEffect(() => {
    const fetchDoacoes = async () => {
      setIsLoading(true);
      try {
        // Chama o novo serviço de filtro
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
  }, [debouncedSearchTerm, selectedCategories]); // Roda de novo se a busca (debounce) ou categorias mudarem

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories(
      (prev) =>
        prev.includes(categoryId)
          ? prev.filter((id) => id !== categoryId) // Desmarcou: remove da lista
          : [...prev, categoryId] // Marcou: adiciona na lista
    );
  };

  return (
    <>
      <Header />
      <section className="produtos-page-layout">
        {/* Coluna de filtros agora é dinâmica */}
        <aside className="filtros-container">
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

        {/* Coluna de conteúdo principal */}
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

          <main>
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
          </main>
        </div>
      </section>
      <Footer />
    </>
  );
};
