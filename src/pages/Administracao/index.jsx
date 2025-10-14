import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";

import { Footer } from "../../components/Footer";
import { Header } from "../../components/Adm-Sidebar/Header";

import PessoaService from "../../services/PessoaService";
import UsuarioService from "../../services/UsuarioService";

import "./style.css";

export const Administracao = () => {
  const [pessoas, setPessoas] = useState([]);
  const [pessoasFiltradas, setPessoasFiltradas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [termoBusca, setTermoBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("TODOS");
  const [filtroNivel, setFiltroNivel] = useState("TODOS");
  const [filtroTipo, setFiltroTipo] = useState("TODOS");

  const navigate = useNavigate();

  useEffect(() => {
    const carregarPessoas = async () => {
      try {
        const response = await PessoaService.findAll();

        const pessoasValidas = response.data.filter((p) => p.usuario);
        setPessoas(pessoasValidas);
        setPessoasFiltradas(pessoasValidas);
      } catch (error) {
        console.error("Erro ao buscar pessoas:", error);
        toast.error("Não foi possível carregar os dados.");
      } finally {
        setIsLoading(false);
      }
    };

    carregarPessoas();
  }, []);

  useEffect(() => {
    let dadosFiltrados = [...pessoas];

    if (termoBusca) {
      dadosFiltrados = dadosFiltrados.filter(
        (pessoa) =>
          pessoa.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
          pessoa.usuario?.email.toLowerCase().includes(termoBusca.toLowerCase())
      );
    }

    if (filtroStatus !== "TODOS") {
      dadosFiltrados = dadosFiltrados.filter(
        (pessoa) => pessoa.usuario?.statusUsuario === filtroStatus
      );
    }

    if (filtroNivel !== "TODOS") {
      dadosFiltrados = dadosFiltrados.filter(
        (pessoa) => pessoa.usuario?.nivelAcesso === filtroNivel
      );
    }

    if (filtroTipo !== "TODOS") {
      dadosFiltrados = dadosFiltrados.filter(
        (pessoa) => pessoa.tipo === filtroTipo
      );
    }

    setPessoasFiltradas(dadosFiltrados);
  }, [termoBusca, filtroStatus, filtroNivel, filtroTipo, pessoas]);

  const handleDelete = async (usuarioId) => {
    if (window.confirm("Tem certeza que deseja inativar este usuário?")) {
      try {
        await UsuarioService.inativar(usuarioId);

        const novasPessoas = pessoas.map((pessoa) => {
          if (pessoa.usuario?.id === usuarioId) {
            return {
              ...pessoa,
              usuario: { ...pessoa.usuario, statusUsuario: "INATIVO" },
            };
          }
          return pessoa;
        });
        setPessoas(novasPessoas);

        toast.success("Usuário inativado com sucesso!");
      } catch (error) {
        console.error("Erro ao inativar usuário:", error);
        toast.error("Erro ao inativar usuário.");
      }
    }
  };

  const handleEdit = (usuarioId) => {
    navigate(`/admin/editar-usuario/${usuarioId}`);
  };

  const handleAdd = () => {
    navigate("/admin/novo-usuario");
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="container2" style={{ padding: "2rem" }}>
          <p>Carregando dados...</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container2">
        <div className="table-header">
          <h1 className="adm_h1">Gerenciar Pessoas</h1>
          <button className="add_b" onClick={handleAdd}>
            <span className="add_adm">+</span> Adicionar Pessoa
          </button>
        </div>

        <div className="filtros-container">
          <div className="search-bar">
            <FaSearch />
            <input
              type="search"
              placeholder="Buscar por nome ou email..."
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
            />
          </div>
          <select
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
          >
            <option value="TODOS">Todos os Status</option>
            <option value="ATIVO">Ativo</option>
            <option value="INATIVO">Inativo</option>
          </select>
          <select
            value={filtroNivel}
            onChange={(e) => setFiltroNivel(e.target.value)}
          >
            <option value="TODOS">Todos os Níveis</option>
            <option value="USER">Usuário</option>
            <option value="ADMIN">Admin</option>
          </select>
          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
          >
            <option value="TODOS">Todos os Tipos</option>
            <option value="DOADOR">Doador</option>
            <option value="BENEFICIADO">Beneficiado</option>
          </select>
        </div>

        {pessoasFiltradas.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID Pessoa</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Tipo</th>
                <th>Status</th>
                <th>Nível</th>
                <th style={{ textAlign: "center" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pessoasFiltradas.map((pessoa) => (
                <tr key={pessoa.id} className="adms">
                  <td>{pessoa.id}</td>
                  <td>{pessoa.nome || "N/A"}</td>

                  <td>{pessoa.usuario?.email || "Email Indisponível"}</td>
                  <td>{pessoa.tipo || "N/A"}</td>
                  <td>
                    <span
                      className={`status status-${pessoa.usuario?.statusUsuario?.toLowerCase()}`}
                    >
                      {pessoa.usuario?.statusUsuario || "N/A"}
                    </span>
                  </td>
                  <td>{pessoa.usuario?.nivelAcesso || "N/A"}</td>
                  <td className="adm_acoes">
                    <button
                      className="icon-button edit-button"
                      onClick={() => handleEdit(pessoa.usuario.id)}
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      className="icon-button delete-button"
                      onClick={() => handleDelete(pessoa.usuario.id)}
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
            Nenhuma pessoa encontrada com os filtros aplicados.
          </p>
        )}
      </main>
      <Footer />
    </>
  );
};
