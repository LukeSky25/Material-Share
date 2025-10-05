import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import doacaoService from "../../services/DoacaoService.js";

import { isUserLoggedIn } from "../../auth/authService";

import {
  RiUserLine,
  RiStackLine,
  RiFileTextLine,
  RiMapPinLine,
  RiPriceTag3Line,
  RiInformationLine,
  RiBuilding4Line,
  RiHashtag,
  RiChatQuoteLine,
  RiMailSendLine,
  RiWhatsappLine,
} from "react-icons/ri";

import doacao_sem_imagem from "../../assets/doacao_sem_imagem.png";
import "./style.css";

export const Doacao = () => {
  const { id: doacaoId } = useParams();
  const [doacao, setDoacao] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [solicitacaoFeita, setSolicitacaoFeita] = useState(false);

  useEffect(() => {
    if (!doacaoId) return;
    const fetchDoacao = async () => {
      setIsLoading(true);
      try {
        const response = await doacaoService.findById(doacaoId);
        const doacaoEncontrada = response.data;
        if (doacaoEncontrada && doacaoEncontrada.cep) {
          const cepLimpo = doacaoEncontrada.cep.replace(/\D/g, "");
          if (cepLimpo.length === 8) {
            try {
              const viaCepResponse = await fetch(
                `https://viacep.com.br/ws/${cepLimpo}/json/`
              );
              const endereco = await viaCepResponse.json();
              const doacaoFinal = {
                ...doacaoEncontrada,
                localidade: endereco.localidade,
                bairro: endereco.bairro,
              };
              setDoacao(doacaoFinal);
            } catch (cepError) {
              setDoacao(doacaoEncontrada);
            }
          } else {
            setDoacao(doacaoEncontrada);
          }
        } else {
          setDoacao(doacaoEncontrada);
        }
      } catch (err) {
        toast.error("Não foi possível carregar os detalhes da doação.");
        setError("Doação não encontrada.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDoacao();
  }, [doacaoId]);

  const handleConfirmarSolicitacao = async () => {
    if (!doacao) {
      toast.error("Erro: informações da doação não encontradas.");
      return;
    }

    const userInfo = isUserLoggedIn();

    if (!userInfo.loggedIn || !userInfo.data?.id) {
      toast.error("Você precisa estar logado para solicitar uma doação.");
      return;
    }

    const beneficiarioPessoaId = userInfo.data.id;

    setIsConfirming(true);
    try {
      await doacaoService.solicitar(doacao.id, beneficiarioPessoaId);

      toast.success(
        "Solicitação confirmada! Uma notificação foi enviada ao doador."
      );
      setIsModalOpen(false);
      setSolicitacaoFeita(true);

      setDoacao({ ...doacao, statusDoacao: "SOLICITADO" });
    } catch (err) {
      console.error("Erro ao solicitar doação:", err);

      toast.error(
        err.response?.data?.message ||
          "Não foi possível confirmar a solicitação."
      );
    } finally {
      setIsConfirming(false);
    }
  };

  const formatCEP = (cep) => {
    if (!cep) return "";
    return cep.replace(/(\d{5})(\d{3})/, "$1-$2");
  };

  const renderContent = () => {
    if (isLoading)
      return <div className="loading-container">Carregando...</div>;
    if (error) return <div className="error-container">{error}</div>;
    if (!doacao)
      return <div className="error-container">Doação não encontrada.</div>;

    const imageUrl = doacao.foto
      ? `data:image/jpeg;base64,${doacao.foto}`
      : doacao_sem_imagem;
    const isDisponivelParaSolicitar = doacao.statusDoacao === "ATIVO";

    return (
      <div className="doacao-detalhe-card">
        <div className="doacao-detalhe-grid">
          <div className="coluna-esquerda">
            <div className="doacao-imagem-container">
              <img src={imageUrl} alt={doacao.nome} />
            </div>
            <div className="card-adicional">
              <h3>
                <RiFileTextLine /> Descrição do Item
              </h3>
              <p>
                {doacao.descricao || "Nenhuma descrição fornecida pelo doador."}
              </p>
            </div>
          </div>

          <div className="coluna-direita">
            <div className="doacao-info-container">
              {doacao.categoria && (
                <span className="categoria-tag">
                  <RiPriceTag3Line /> {doacao.categoria.nome}
                </span>
              )}
              <h1 className="doacao-titulo">{doacao.nome}</h1>
              <div className="info-bloco">
                <RiStackLine />
                <span>
                  Quantidade: <strong>{doacao.quantidade || 1}</strong>
                </span>
              </div>
              <div className="info-bloco-localizacao">
                <h3>
                  <RiMapPinLine /> Local de Retirada
                </h3>
                <div className="local-info-detalhado">
                  <div className="local-item">
                    <RiBuilding4Line size={20} />
                    <p>
                      <strong>{doacao.localidade || "Cidade"}</strong>,{" "}
                      {doacao.bairro || "Bairro"}
                    </p>
                  </div>
                  <div className="local-item">
                    <RiMailSendLine size={20} />
                    <p>CEP: {formatCEP(doacao.cep)}</p>
                  </div>
                  {doacao.numeroResidencia && (
                    <div className="local-item">
                      <RiHashtag size={20} />
                      <p>Número: {doacao.numeroResidencia}</p>
                    </div>
                  )}
                  {doacao.complemento && (
                    <div className="local-item">
                      <RiChatQuoteLine size={20} />
                      <p>{doacao.complemento}</p>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="solicitar-btn"
                disabled={solicitacaoFeita || !isDisponivelParaSolicitar}
              >
                {solicitacaoFeita
                  ? "Solicitação Realizada"
                  : isDisponivelParaSolicitar
                  ? "Solicitar Doação"
                  : "Indisponível"}
              </button>

              <p className="doador-info">
                <RiUserLine /> Doado por: <strong>{doacao.pessoa.nome}</strong>
              </p>
            </div>

            {doacao.categoria?.descricao && (
              <div className="card-adicional">
                <h3>
                  <RiInformationLine /> Sobre a Categoria
                </h3>
                <p>{doacao.categoria.descricao.replace(/\\r\\n/g, "\n")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <main className="doacao-detalhe-page">{renderContent()}</main>
      <Footer />

      {isModalOpen && doacao && (
        <div className="modal-backdrop">
          <div className="modal-content">
            {isConfirming ? (
              <div className="modal-loading">
                <div className="loader"></div>
                <p>Confirmando solicitação...</p>
              </div>
            ) : (
              <>
                <RiWhatsappLine className="whatsapp-icon" size={48} />
                <h2>Confirmação de Solicitação</h2>

                <p>
                  Ao confirmar, uma notificação será enviada ao doador{" "}
                  <strong>{doacao.pessoa.nome}</strong> com seu interesse e
                  contato para combinar a retirada do item{" "}
                  <strong>{doacao.nome}</strong>.
                </p>
                <div className="modal-actions">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="btn-cancelar"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleConfirmarSolicitacao}
                    className="btn-confirmar"
                  >
                    Confirmar Solicitação
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
