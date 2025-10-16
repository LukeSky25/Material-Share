import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";

import { Footer } from "../../components/Footer";
import { Header } from "../../components/Adm-Sidebar/Header";
import { CategoriaModal } from "../../components/CategoriaModal";
import CategoriaService from "../../services/CategoriaService";

import "./style.css";

export const AdministracaoCategoria = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriasFiltradas, setCategoriasFiltradas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [termoBusca, setTermoBusca] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoriaEmEdicao, setCategoriaEmEdicao] = useState(null);

  const carregarCategorias = async () => {
    try {
      const response = await CategoriaService.findAll();
      setCategorias(response.data);
      setCategoriasFiltradas(response.data);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      toast.error("Não foi possível carregar as categorias.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    carregarCategorias();
  }, []);

  useEffect(() => {
    const dadosFiltrados = categorias.filter(
      (categoria) =>
        categoria.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
        (categoria.descricao &&
          categoria.descricao.toLowerCase().includes(termoBusca.toLowerCase()))
    );
    setCategoriasFiltradas(dadosFiltrados);
  }, [termoBusca, categorias]);

  const handleOpenModal = (categoria = null) => {
    setCategoriaEmEdicao(categoria);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setCategoriaEmEdicao(null);
    setIsModalOpen(false);
  };

  const handleSaveCategoria = async (categoriaData) => {
    const payload = {
      nome: categoriaData.nome,
      descricao: categoriaData.descricao,
      statusCategoria: categoriaData.statusCategoria,
    };

    try {
      if (categoriaData.id) {
        await CategoriaService.update(categoriaData.id, payload);
        toast.success("Categoria atualizada com sucesso!");
      } else {
        await CategoriaService.save(payload);
        toast.success("Categoria criada com sucesso!");
      }
      carregarCategorias();
    } catch (error) {
      toast.error("Erro ao salvar categoria.");
      console.error("Erro ao salvar:", error);
    } finally {
      handleCloseModal();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja apagar esta categoria?")) {
      try {
        await CategoriaService.inativar(id);
        toast.success("Categoria apagada com sucesso!");
        carregarCategorias();
      } catch (error) {
        toast.error("Erro ao apagar categoria.");
        console.error("Erro ao apagar:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="page-wrapper">
        <Header />
        <main
          className="container2"
          style={{ padding: "2rem", textAlign: "center" }}
        >
          <p>Carregando dados...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <div className="page-wrapper">
        <Header />
        <main className="container2">
          <div className="page-controls">
            <div className="table-header">
              <h1 className="adm_h1">Gerenciar Categorias</h1>
              <button className="add_b" onClick={() => handleOpenModal()}>
                <span className="add_adm">+</span> Adicionar Categoria
              </button>
            </div>
            <div className="filtros-container">
              <div className="search-bar">
                <FaSearch />
                <input
                  type="search"
                  placeholder="Buscar por nome ou descrição..."
                  value={termoBusca}
                  onChange={(e) => setTermoBusca(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="table-wrapper">
            {categoriasFiltradas.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Status</th>
                    <th style={{ textAlign: "center" }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {categoriasFiltradas.map((categoria) => (
                    <tr key={categoria.id} className="adms">
                      <td data-label="ID">
                        <span>{categoria.id}</span>
                      </td>

                      <td data-label="Nome">
                        <span>{categoria.nome}</span>
                      </td>

                      <td data-label="Descrição" className="descricao-col">
                        <span>{categoria.descricao || "-"}</span>
                      </td>

                      <td data-label="Status">
                        <span
                          className={`status status-${categoria.statusCategoria?.toLowerCase()}`}
                        >
                          {categoria.statusCategoria}
                        </span>
                      </td>

                      <td data-label="Ações" className="adm_acoes">
                        <button
                          className="icon-button edit-button"
                          onClick={() => handleOpenModal(categoria)}
                        >
                          <FaEdit size={20} />
                        </button>
                        <button
                          className="icon-button delete-button"
                          onClick={() => handleDelete(categoria.id)}
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
                Nenhuma categoria encontrada.
              </p>
            )}
          </div>
        </main>
        <Footer />
      </div>

      {isModalOpen && (
        <CategoriaModal
          onClose={handleCloseModal}
          onSave={handleSaveCategoria}
          categoria={categoriaEmEdicao}
        />
      )}
    </>
  );
};
