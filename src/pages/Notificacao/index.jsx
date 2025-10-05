import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  RiInboxArchiveLine,
  RiLoader4Line,
  RiWhatsappLine,
} from "react-icons/ri";

import { Header } from "../../components/User-Sidebar/Header";
import { Footer } from "../../components/Footer";
import mensagemService from "../../services/MensagemService";
import "./style.css";

export const Notificacao = () => {
  const { id } = useParams();

  const [mensagens, setMensagens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      toast.error("Usuário doador não identificado.");
      setIsLoading(false);
      return;
    }

    const carregarMensagens = async () => {
      setIsLoading(true);
      try {
        const response = await mensagemService.findByDoadorId(id);
        setMensagens(response.data);
      } catch (error) {
        console.error("Erro ao buscar mensagens:", error);
        toast.error("Não foi possível carregar sua caixa de entrada.");
      } finally {
        setIsLoading(false);
      }
    };

    carregarMensagens();
  }, [id]);

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatarCelular = (celular) => {
    if (!celular) return "Não informado";
    const numeros = celular.replace(/\D/g, "");
    if (numeros.length === 11) {
      return numeros.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
    return celular;
  };

  const gerarLinkWhatsApp = (celular, nomeDoacao) => {
    if (!celular) return "#";
    const numeroLimpo = `55${celular.replace(/\D/g, "")}`;
    const mensagem = `Olá! Vi seu anúncio da doação do item ${nomeDoacao} no Material Share e tenho interesse.`;
    const mensagemCodificada = encodeURIComponent(mensagem);
    return `https://wa.me/${numeroLimpo}?text=${mensagemCodificada}`;
  };

  return (
    <div className="page-container">
      <Header />
      <main className="caixa-entrada-container">
        <h1>
          <RiInboxArchiveLine /> Minha Caixa de Entrada
        </h1>
        <p className="page-subtitle">
          Notificações de interesse nas suas doações
        </p>

        {isLoading ? (
          <div className="loading-container">
            <RiLoader4Line className="loader-icon" />
            <p>Carregando mensagens...</p>
          </div>
        ) : mensagens.length > 0 ? (
          <div className="message-list">
            {mensagens.map((msg) => (
              <div key={msg.id} className="message-card">
                <div className="message-header">
                  <h3>
                    Interesse na doação:{" "}
                    <Link to={`/doacao/${msg.doacao.id}`}>
                      {msg.doacao.nome}
                    </Link>
                  </h3>
                  <span className="message-date">
                    {formatarData(msg.dataMensagem)}
                  </span>
                </div>

                <div className="message-body">
                  <p>{`O beneficiário '${
                    msg.pessoa.nome
                  }' demonstrou interesse na sua doação. Contato: ${formatarCelular(
                    msg.pessoa.celular
                  )}`}</p>
                </div>

                <div className="message-footer">
                  <span>
                    Enviado por: <strong>{msg.pessoa.nome}</strong>
                  </span>
                  <a
                    href={gerarLinkWhatsApp(
                      msg.pessoa.celular,
                      msg.doacao.nome
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsapp-button"
                    disabled={!msg.pessoa.celular}
                  >
                    <RiWhatsappLine /> Iniciar Conversa
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-list-message">
            Você não tem nenhuma nova notificação.
          </p>
        )}
      </main>
      <Footer />
    </div>
  );
};
