import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

import { FaBullhorn, FaHandsHelping, FaHouseUser } from "react-icons/fa";

import "./style.css";
import "../../styles/global.css";

export const Servicos = () => {
  return (
    <>
      <Header />

      <div className="services-container">
        <div className="services-header">
          <h1>Nossos Serviços</h1>
          <p>
            Na Material Share, nosso principal serviço é atuar como uma ponte.
            Conectamos a generosidade de quem doa com a necessidade de quem
            constrói, garantindo que os materiais de construção encontrem seu
            destino certo.
          </p>
        </div>

        <div className="services-list">
          <div className="service-item">
            <FaBullhorn className="service-icon" />
            <h3>Captação e Divulgação</h3>
            <p>
              Identificamos e cadastramos doadores (pessoas físicas e empresas)
              que possuem materiais de construção excedentes ou sem uso, como
              sobras de obras, itens de mostruário ou estoque parado.
            </p>
          </div>

          <div className="service-item">
            <FaHandsHelping className="service-icon" />
            <h3>A Ponte Solidária (Intermediação)</h3>
            <p>
              Nosso trabalho é fazer a conexão. Analisamos as doações
              disponíveis e as cruzamos com as solicitações de beneficiários
              previamente cadastrados e verificados, como famílias de baixa
              renda e outras ONGs.
            </p>
          </div>

          <div className="service-item">
            <FaHouseUser className="service-icon" />
            <h3>Conexão com o Beneficiário</h3>
            <p>
              Facilitamos o contato e a logística para que o material certo
              chegue a quem realmente precisa, transformando o que seria
              descartado em lares mais seguros e sonhos realizados.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
