import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

import { Footer } from "../../components/Footer";
import { Header } from "../../components/Adm-Sidebar/Header";
import UsuarioService from "../../services/UsuarioService";

import "./style.css";

export const Administracao = () => {
  const [usuarios, setUsuarios] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const carregarUsuarios = async () => {
      try {
        const response = await UsuarioService.findAll();
        setUsuarios(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        toast.error("Não foi possível carregar os usuários.");
      } finally {
        setIsLoading(false);
      }
    };

    carregarUsuarios();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja inativar este usuário?")) {
      try {
        await UsuarioService.inativar(id);

        setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
        toast.success("Usuário inativado com sucesso!");
      } catch (error) {
        console.error("Erro ao inativar usuário:", error);
        toast.error("Erro ao inativar usuário.");
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/editar-usuario/${id}`);
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <p>Carregando usuários...</p>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <section>
        <main>
          <div className="container2">
            <div className="table-header">
              <h1 className="adm_h1">Gerenciar Usuários</h1>
              <button className="add_b">
                <span className="add_adm">+</span> Adicionar
              </button>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Nível</th>
                  <th style={{ textAlign: "center" }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {/* Renderização dinâmica dos usuários */}
                {usuarios.map((usuario) => (
                  <tr key={usuario.id} className="adms">
                    <td>{usuario.id}</td>
                    <td>{usuario.nome}</td>
                    <td>{usuario.email}</td>
                    <td>
                      <span
                        className={`status status-${usuario.statusUsuario?.toLowerCase()}`}
                      >
                        {usuario.statusUsuario}
                      </span>
                    </td>
                    <td>{usuario.nivelAcesso}</td>
                    <td className="adm_acoes">
                      <button
                        className="icon-button edit-button"
                        onClick={() => handleEdit(usuario.id)}
                      >
                        <FaEdit size={20} />
                      </button>
                      <button
                        className="icon-button delete-button"
                        onClick={() => handleDelete(usuario.id)}
                      >
                        <FaTrash size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </section>
      <Footer />
    </>
  );
};
