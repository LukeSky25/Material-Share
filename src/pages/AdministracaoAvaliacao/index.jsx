import { useState, useEffect } from "react";
import { FaTrash, FaSearch, FaStar } from "react-icons/fa";
import { toast } from "react-toastify";

import { Footer } from "../../components/Footer";
import { Header } from "../../components/Adm-Sidebar/Header";
import AvaliacaoService from "../../services/AvaliacaoService";

import "./style.css"; // Reutilize o mesmo CSS!

export const AdministracaoAvaliacao = () => {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [avaliacoesFiltradas, setAvaliacoesFiltradas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [termoBusca, setTermoBusca] = useState("");

  const carregarAvaliacoes = async () => {
    try {
      const response = await AvaliacaoService.findAll();
      setAvaliacoes(response.data);
      setAvaliacoesFiltradas(response.data);
    } catch (error) {
      console.error("Erro ao buscar avaliações:", error);
      toast.error("Não foi possível carregar as avaliações.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    carregarAvaliacoes();
  }, []);

  useEffect(() => {
    const dadosFiltrados = avaliacoes.filter(
      (avaliacao) =>
        (avaliacao.comentario &&
          avaliacao.comentario
            .toLowerCase()
            .includes(termoBusca.toLowerCase())) ||
        (avaliacao.usuario?.nome &&
          avaliacao.usuario.nome
            .toLowerCase()
            .includes(termoBusca.toLowerCase()))
    );
    setAvaliacoesFiltradas(dadosFiltrados);
  }, [termoBusca, avaliacoes]);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja apagar esta avaliação?")) {
      try {
        await AvaliacaoService.deleteById(id);
        toast.success("Avaliação apagada com sucesso!");
        carregarAvaliacoes(); // Recarrega a lista
      } catch (error) {
        toast.error("Erro ao apagar avaliação.");
        console.error("Erro ao apagar:", error);
      }
    }
  };

  // Função para renderizar as estrelas da nota
  const renderStars = (nota) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar key={index} color={index < nota ? "#ffc107" : "#e4e5e9"} />
    ));
  };

  if (isLoading) {
    return (
      <div className="page-wrapper">
        <Header />
        <main className="container2" style={{ textAlign: "center" }}>
          <p>Carregando avaliações...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Header />
      <main className="container2">
        <div className="page-controls">
          <div className="table-header">
            <h1 className="adm_h1">Gerenciar Avaliações</h1>
            {/* O botão de Adicionar foi removido */}
          </div>
          <div className="filtros-container">
            <div className="search-bar">
              <FaSearch />
              <input
                type="search"
                placeholder="Buscar por comentário ou nome de usuário..."
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="table-wrapper">
          {avaliacoesFiltradas.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Usuário</th>
                  <th>Nota</th>
                  <th>Comentário</th>
                  <th>Data</th>
                  <th style={{ textAlign: "center" }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {avaliacoesFiltradas.map((avaliacao) => (
                  <tr key={avaliacao.id} className="adms">
                    <td data-label="Usuário">
                      <span>
                        {avaliacao.usuario?.nome || "Usuário Deletado"}
                      </span>
                    </td>
                    <td data-label="Nota">
                      <span className="star-rating">
                        {renderStars(avaliacao.nota)}
                      </span>
                    </td>
                    <td data-label="Comentário" className="descricao-col">
                      <span>{avaliacao.comentario || "-"}</span>
                    </td>
                    <td data-label="Data">
                      <span>
                        {new Date(avaliacao.dataAvaliacao).toLocaleDateString(
                          "pt-BR"
                        )}
                      </span>
                    </td>
                    <td data-label="Ações" className="adm_acoes">
                      <button
                        className="icon-button delete-button"
                        onClick={() => handleDelete(avaliacao.id)}
                      >
                        <FaTrash size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ textAlign: "center", marginTop: "2rem" }}>
              Nenhuma avaliação encontrada.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};
