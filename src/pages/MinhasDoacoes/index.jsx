import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  RiArchiveLine,
  RiMailSendLine,
  RiLoader4Line,
  RiPencilLine,
  RiDeleteBinLine,
  RiMapPinLine,
  RiStackLine,
} from "react-icons/ri";

import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import ConfirmationModal from "../../components/ConfirmationModal";
import doacaoService from "../../services/DoacaoService.js";
import doacao_sem_imagem from "../../assets/doacao_sem_imagem.png";

import "./style.css";

export const MinhasDoacoes = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doacoesFeitas, setDoacoesFeitas] = useState([]);
  const [doacoesSolicitadas, setDoacoesSolicitadas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("feitas");

  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null, // 'confirmarRetirada' ou 'apagarDoacao'
    doacao: null,
  });

  useEffect(() => {
    if (!id) {
      toast.warn("ID de usuário não encontrado na URL.");
      setIsLoading(false);
      return;
    }

    const carregarDoacoes = async () => {
      setIsLoading(true);
      try {
        const [feitasRes, solicitadasRes] = await Promise.all([
          doacaoService.findByDoador(id),
          doacaoService.findSolicitadasByBeneficiario(id),
        ]);

        // Mapeia para adicionar informações de localização se houver CEP
        const doacoesFeitasComEndereco = await Promise.all(
          feitasRes.data.map(async (doacao) => {
            if (doacao.cep) {
              const cepLimpo = doacao.cep.replace(/\D/g, "");
              if (cepLimpo.length === 8) {
                try {
                  const viaCepResponse = await fetch(
                    `https://viacep.com.br/ws/${cepLimpo}/json/`
                  );
                  const endereco = await viaCepResponse.json();
                  return { ...doacao, localidade: endereco.localidade };
                } catch (cepError) {
                  return doacao;
                }
              }
            }
            return doacao;
          })
        );

        setDoacoesFeitas(doacoesFeitasComEndereco);
        setDoacoesSolicitadas(solicitadasRes.data);
      } catch (error) {
        console.error("Erro ao buscar doações:", error);
        toast.error("Falha ao carregar suas doações.");
      } finally {
        setIsLoading(false);
      }
    };

    carregarDoacoes();
  }, [id]);

  const abrirModal = (doacao, type) => {
    setModalState({ isOpen: true, type, doacao });
  };

  const fecharModal = () => {
    setModalState({ isOpen: false, type: null, doacao: null });
  };

  const handleEditar = (doacaoId) => {
    navigate(`/doacao/editar/${doacaoId}`);
  };

  const handleConfirmarApagar = async () => {
    if (!modalState.doacao) return;

    try {
      await doacaoService.inativar(modalState.doacao.id, "INATIVO");
      toast.success(`Doação "${modalState.doacao.nome}" foi apagada.`);

      setDoacoesFeitas(
        doacoesFeitas.filter((d) => d.id !== modalState.doacao.id)
      );
    } catch (error) {
      toast.error("Não foi possível apagar a doação.");
    } finally {
      fecharModal();
    }
  };

  const handleConfirmarRetirada = async () => {
    if (!modalState.doacao) return;
    try {
      await doacaoService.inativar(modalState.doacao.id, "DOADO");
      toast.success(
        `Doação "${modalState.doacao.nome}" confirmada como recebida!`
      );

      const atualizarLista = (lista) =>
        lista.map((d) =>
          d.id === modalState.doacao.id ? { ...d, statusDoacao: "DOADO" } : d
        );
      setDoacoesFeitas(atualizarLista(doacoesFeitas));
      setDoacoesSolicitadas(atualizarLista(doacoesSolicitadas));
    } catch (error) {
      toast.error("Não foi possível confirmar a retirada.");
    } finally {
      fecharModal();
    }
  };

  const renderDoacoesList = (doacoes, isDoadorTab) => {
    if (doacoes.length === 0) {
      return <p className="empty-list-message">Nenhuma doação encontrada.</p>;
    }
    return (
      <div className="doacoes-grid">
        {doacoes.map((doacao) => (
          <div
            key={doacao.id}
            className={`doacao-card status-border-${doacao.statusDoacao?.toLowerCase()}`}
          >
            <img
              src={
                doacao.foto
                  ? `data:image/jpeg;base64,${doacao.foto}`
                  : doacao_sem_imagem
              }
              alt={doacao.nome}
              className="doacao-card-img"
            />
            <div className="doacao-card-body">
              <span
                className={`status-badge status-${doacao.statusDoacao?.toLowerCase()}`}
              >
                {doacao.statusDoacao}
              </span>
              <h3 className="doacao-card-title">{doacao.nome}</h3>

              <div className="doacao-card-details">
                <p className="doacao-detail-item">
                  <RiStackLine /> {doacao.quantidade || 1} unidades
                </p>
                {doacao.localidade && (
                  <p className="doacao-detail-item">
                    <RiMapPinLine /> {doacao.localidade}
                  </p>
                )}
              </div>

              {doacao.statusDoacao === "SOLICITADO" && !isDoadorTab && (
                <p
                  className="card-call-to-action"
                  onClick={() => abrirModal(doacao, "confirmarRetirada")}
                >
                  Clique para confirmar recebimento
                </p>
              )}
            </div>

            {isDoadorTab && (
              <div className="doacao-card-actions">
                <button
                  className="action-btn edit-btn"
                  onClick={() => handleEditar(doacao.id)}
                >
                  <RiPencilLine /> Editar
                </button>
                <button
                  className="action-btn delete-btn"
                  onClick={() => abrirModal(doacao, "apagarDoacao")}
                >
                  <RiDeleteBinLine /> Apagar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const getModalContent = () => {
    if (!modalState.isOpen) return null;

    if (modalState.type === "apagarDoacao") {
      return {
        message: `Tem certeza que deseja apagar a doação "${modalState.doacao?.nome}"? Esta ação a tornará inativa.`,
        onConfirm: handleConfirmarApagar,
      };
    }

    if (modalState.type === "confirmarRetirada") {
      return {
        message: `Você confirma o recebimento do item "${modalState.doacao?.nome}"? Esta ação não pode ser desfeita.`,
        onConfirm: handleConfirmarRetirada,
      };
    }
    return null;
  };

  const modalContent = getModalContent();

  return (
    <div className="page-container">
      <Header />
      <main className="minhas-doacoes-container">
        <h1>Minha Área de Doações</h1>
        <p className="page-subtitle">Acompanhe suas doações e solicitações</p>
        <div className="tabs-container">
          <button
            className={`tab ${activeTab === "feitas" ? "active" : ""}`}
            onClick={() => setActiveTab("feitas")}
          >
            <RiArchiveLine /> Minhas Doações Cadastradas
          </button>
          <button
            className={`tab ${activeTab === "solicitadas" ? "active" : ""}`}
            onClick={() => setActiveTab("solicitadas")}
          >
            <RiMailSendLine /> Minhas Solicitações
          </button>
        </div>
        <div className="tab-content">
          {isLoading ? (
            <div className="loading-container">
              <RiLoader4Line className="loader-icon" />
              <p>Carregando...</p>
            </div>
          ) : activeTab === "feitas" ? (
            renderDoacoesList(doacoesFeitas, true)
          ) : (
            renderDoacoesList(doacoesSolicitadas, false)
          )}
        </div>
      </main>
      <Footer />

      {modalState.isOpen && modalContent && (
        <ConfirmationModal
          message={modalContent.message}
          onConfirm={modalContent.onConfirm}
          onCancel={fecharModal}
        />
      )}
    </div>
  );
};
