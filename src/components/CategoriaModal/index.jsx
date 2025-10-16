import { useState, useEffect } from "react";
import "./style.css";

export const CategoriaModal = ({ categoria, onClose, onSave }) => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("ATIVO");

  useEffect(() => {
    if (categoria) {
      setNome(categoria.nome);
      setDescricao(categoria.descricao || "");
      setStatus(categoria.statusCategoria || "ATIVO");
    } else {
      setNome("");
      setDescricao("");
      setStatus("ATIVO");
    }
  }, [categoria]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome.trim()) {
      alert("O nome da categoria não pode estar vazio.");
      return;
    }

    onSave({ ...categoria, nome, descricao, statusCategoria: status });
  };

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={handleModalContentClick}>
        <h2>{categoria ? "Editar Categoria" : "Nova Categoria"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome da Categoria</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Elétrica"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="descricao">Descrição</label>
            <textarea
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows="3"
              placeholder="Ex: Fios, disjuntores, tomadas..."
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="ATIVO">Ativo</option>
              <option value="INATIVO">Inativo</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-save">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
