import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isUserLoggedIn } from "../../auth/authService";
import {
  RiShieldCheckLine,
  RiStarLine,
  RiTrophyLine,
  RiGooglePlayLine,
  RiLoginBoxLine,
  RiHandHeartLine,
  RiWhatsappLine,
  RiCheckboxCircleLine,
  RiAddCircleLine,
  RiSearch2Line,
} from "react-icons/ri";
import CategoriaCard from "../../components/CategoriaCard/CategoriaCard.jsx";
import { Header } from "../../components/Header/index.jsx";
import { Footer } from "../../components/Footer/index.jsx";

import "./style.css";
import "../../styles/global.css";

export const Home = () => {
  const [user, setUser] = useState({ loggedIn: false, data: null });

  useEffect(() => {
    setUser(isUserLoggedIn());
  }, []);

  const categorias = [
    {
      id: 1,
      label: "Premium",
      title: "Telhas Cerâmicas",
      description: "Telhas de alta qualidade com excelente resistência.",
      icon: "...",
      gradientClass: "gradient-orange",
      path: "/doacoes",
    },
    {
      id: 2,
      label: "Resistente",
      title: "Tijolos Cerâmicos",
      description: "Tijolos de 6 furos com alta resistência estrutural.",
      icon: "...",
      gradientClass: "gradient-red",
      path: "/doacoes",
    },
    {
      id: 3,
      label: "CP-II",
      title: "Cimento Portland",
      description: "Cimento de alta qualidade para estruturas e acabamentos.",
      icon: "...",
      gradientClass: "gradient-gray",
      path: "/doacoes",
    },
    {
      id: 4,
      label: "Fina",
      title: "Areia Fina",
      description: "Areia lavada ideal para reboco e acabamentos.",
      icon: "...",
      gradientClass: "gradient-yellow",
      path: "/doacoes",
    },
  ];

  return (
    <div className="page-container-home">
      <Header />
      <main>
        {user.loggedIn ? (
          <div className="thank-you-banner">
            <div className="thank-you-overlay"></div>
            <div className="thank-you-content">
              <h1 className="thank-you-title">
                Obrigado por se juntar à nossa <span>missão solidária!</span>
              </h1>
              <p className="thank-you-subtitle">
                Juntos, estamos transformando o desperdício em oportunidade e
                construindo um futuro mais sustentável.
              </p>
              <div className="thank-you-buttons">
                <Link to="/nova-doacao" className="btn btn-primary">
                  <RiAddCircleLine /> Doar um Material
                </Link>
                <Link to="/doacoes" className="btn btn-secondary">
                  <RiSearch2Line /> Encontrar Materiais
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="welcome-container">
            <h1 className="title">
              Construindo o <br />
              <span>Futuro</span> Juntos
            </h1>
            <p className="subtitle">
              Conectando materiais de construção que seriam descartados com
              pessoas prontas para transformá-los em novos começos.
            </p>
            <div className="buttons">
              <Link to="/register" className="welcome-button primary">
                Começar Agora
              </Link>
              <Link to="/login" className="welcome-button">
                Entrar
              </Link>
            </div>
          </div>
        )}

        {user.loggedIn ? (
          <>
            <section className="next-steps-section">
              <h2 className="section-title">Próximos Passos</h2>
              <div className="steps-container">
                <div className="step-card">
                  <div className="step-icon-wrapper">
                    <RiHandHeartLine />
                  </div>
                  <span className="step-number">01</span>
                  <h3 className="step-title">Doe ou Encontre</h3>
                  <p className="step-description">
                    Clique em &quot;Doar um Material&quot; para cadastrar itens
                    ou explore as doações disponíveis em &quot;Encontrar
                    Materiais&quot;.
                  </p>
                </div>
                <div className="step-card">
                  <div className="step-icon-wrapper">
                    <RiWhatsappLine />
                  </div>
                  <span className="step-number">02</span>
                  <h3 className="step-title">Combine a Retirada</h3>
                  <p className="step-description">
                    Ao solicitar um item, a plataforma notificará o doador com
                    seu contato para combinarem a retirada pelo WhatsApp.
                  </p>
                </div>
                <div className="step-card">
                  <div className="step-icon-wrapper">
                    <RiCheckboxCircleLine />
                  </div>
                  <span className="step-number">03</span>
                  <h3 className="step-title">Finalize a Doação</h3>
                  <p className="step-description">
                    Após receber o material, acesse &quot;Minhas Doações&quot; e
                    marque o item como **recebido** para finalizar o processo.
                  </p>
                </div>
              </div>
            </section>

            <section className="products-section categorias">
              <h2 className="section-title">
                Produtos de <span>Construção</span>
              </h2>
              <p className="section-subtitle">
                Materiais de alta qualidade para seus projetos de construção e
                reforma.
              </p>
              <div className="categoria-container">
                {categorias.map((product) => (
                  <CategoriaCard key={product.id} {...product} />
                ))}
              </div>
            </section>

            <section className="final-section">
              <RiGooglePlayLine className="icon" color="#34a853" />
              <p>
                Acesse também pelo nosso aplicativo na PlayStore.
                <br />
                Encontre e doe materiais de onde estiver,{" "}
                <a
                  href="https://play.google.com/store/games"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  clicando aqui
                </a>
                .
              </p>
            </section>
          </>
        ) : (
          <>
            <section className="info-container">
              <ul>
                <li>
                  <RiShieldCheckLine className="icon" color="#3459a8" />
                  <h3>Segurança</h3>
                  <p>Materiais confiáveis para sua obra, construção.</p>
                </li>
                <li>
                  <RiStarLine className="icon" color="#d5d820" />
                  <h3>Qualidade</h3>
                  <p>Itens em bom estado com potencial para novos projetos.</p>
                </li>
                <li>
                  <RiTrophyLine className="icon" color="#d39523" />
                  <h3>Sustentabilidade</h3>
                  <p>
                    Reduza o desperdício e ajude a construir um futuro melhor.
                  </p>
                </li>
              </ul>
            </section>

            <section className="final-section login-prompt">
              <RiLoginBoxLine className="icon" color="#344fa8" />
              <p>
                <Link to="/login">Efetue login</Link> ou{" "}
                <Link to="/register">crie uma conta</Link> para
                <br />
                ver as doações e participar do nosso projeto.
              </p>
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};
