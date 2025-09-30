import { useEffect, useState } from "react";

import { Footer } from "../../components/Footer/index.jsx";
import { Header } from "../../components/Header/index.jsx";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import { toast } from "react-toastify";

import doacao_sem_imagem from "../../assets/doacao_sem_imagem.png";

import doacaoService from "../../services/DoacaoService.js";

import "./style.css";

export const Doacoes = () => {
  const [doacoes, setDoacoes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDoacoes = async () => {
      setIsLoading(true);
      try {
        const response = await doacaoService.findAll();
        const doacoesIniciais = response.data;

        const doacoesAtivas = doacoesIniciais.filter(
          (doacao) => doacao.statusDoacao === "ATIVO"
        );

        const doacoesComEnderecoPromises = doacoesAtivas.map(async (doacao) => {
          const cepLimpo = doacao.cep.replace(/\D/g, "");

          if (cepLimpo.length === 8) {
            try {
              const viaCepResponse = await fetch(
                `https://viacep.com.br/ws/${cepLimpo}/json/`
              );
              const endereco = await viaCepResponse.json();

              return {
                ...doacao,
                localidade: endereco.localidade,
                bairro: endereco.bairro,
              };
            } catch (error) {
              console.error(`Erro ao buscar CEP ${cepLimpo}:`, error);
              return doacao;
            }
          }
          return doacao;
        });

        const doacoesCompletas = await Promise.all(doacoesComEnderecoPromises);

        setDoacoes(doacoesCompletas);
      } catch (error) {
        console.error("Erro ao buscar doações:", error);
        toast.error("Não foi possível carregar as doações.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoacoes();
  }, []);

  // console.log(doacoes);

  // const products = [
  //   {
  //     id: 1,
  //     title: "Telha Cerâmica",
  //     img_url:
  //       "https://armazemcoral.agilecdn.com.br/764310.jpg?v=26-1943032461",
  //     quant: 200,
  //     local: "São Paulo / Jandira",
  //     path: "produto/productId",
  //   },
  //   {
  //     id: 2,
  //     title: "Tijolos de Cerâmica",
  //     img_url:
  //       "https://www.ceramicaorlandin.com.br/web/fotos/produtos/tijolos-ceramicos/titulo-imagem.png",
  //     quant: 100,
  //     local: "São Paulo / Osasco",
  //     path: "produto/productId",
  //   },
  //   {
  //     id: 3,
  //     title: "Cimento Portland",

  //     img_url:
  //       "https://static.wixstatic.com/media/e645de_4c98327f16584cdabd476aa3f29bbf2f~mv2.jpg/v1/fill/w_420,h_420,al_c,lg_1,q_80/e645de_4c98327f16584cdabd476aa3f29bbf2f~mv2.jpg",
  //     quant: 10,
  //     local: "São Paulo / Barueri",
  //     path: "produto/productId",
  //   },
  //   {
  //     id: 4,
  //     title: "Areia Fina Lavada",
  //     img_url:
  //       "https://images.tcdn.com.br/img/img_prod/1184849/areia_fina_lavada_saco_20kg_363_1_266d7d9352b51c919b5a4cad4cd93d9b.jpg",
  //     quant: 5,
  //     local: "São Paulo / Alphaville",
  //     path: "produto/productId",
  //   },
  //   {
  //     id: 5,
  //     title: "Tábua de Madeira Cambará",
  //     img_url:
  //       "https://images.tcdn.com.br/img/img_prod/985953/tabua_de_madeira_cambara_tauari_bruta_20x2x3m_205_1_688993f1ce4195f316fb5eb4c2d42c75.jpg",
  //     quant: 70,
  //     local: "São Paulo / Santana de Parnaíba",
  //     path: "produto/productId",
  //   },
  //   {
  //     id: 6,
  //     title: "Makita o Verdadeiro Amigo do Homem",
  //     img_url:
  //       "https://tropicalcenter.vteximg.com.br/arquivos/ids/158291-1000-1000/997afd4724fe2db5d579872fa32c5adcawsaccesskeyidakiatclmsgfx4g7qtfvdexpires1652959680signaturezu9xh7zooov9jkshi1nw89jumk03d-db5e68bc36d41c6de816503676910191-1024-1024.png?v=638538962781370000",
  //     quant: 1,
  //     local: "São Paulo / Carapicuíba",
  //     path: "produto/productId",
  //   },
  // ];

  return (
    <>
      <Header />

      <section className="produtos-page-layout">
        {/* Coluna esquerda - filtros */}
        <aside className="filtros-container">
          <h2>Filtros de Pesquisa</h2>

          <div className="filtro-group">
            <h3>Categorias</h3>
            <label>
              <input type="checkbox" /> Alvenaria
            </label>
            <label>
              <input type="checkbox" /> Estrutura
            </label>
            <label>
              <input type="checkbox" /> Hidráulica
            </label>
            <label>
              <input type="checkbox" /> Elétrica
            </label>
            <label>
              <input type="checkbox" /> Pintura e Acabamento
            </label>
            <label>
              <input type="checkbox" /> Madeira e Carpintaria
            </label>
            <label>
              <input type="checkbox" /> Revestimentos e Piso
            </label>
            <label>
              <input type="checkbox" /> Cobertura
            </label>
            <label>
              <input type="checkbox" /> Impermeabilização
            </label>
            <label>
              <input type="checkbox" /> Ferramentas e Equipamentos
            </label>
          </div>

          <div className="filtro-group">
            <h3>Localização</h3>
            <label>
              <input type="checkbox" /> Barueri
            </label>
            <label>
              <input type="checkbox" /> Osasco
            </label>
            <label>
              <input type="checkbox" /> Carapicuíba
            </label>
            <label>
              <input type="checkbox" /> Itapevi
            </label>
            <label>
              <input type="checkbox" /> Jandira
            </label>
          </div>
        </aside>

        {/* Coluna direita - produtos */}
        <div className="produtos-content-main">
          <div className="search-bar-container">
            <input type="text" placeholder="Pesquisar materiais..." />
          </div>

          <main>
            {/* <div className="cards-container">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  label={product.label}
                  title={product.title}
                  description={product.description}
                  img_url={product.img_url}
                  gradientClass={product.gradientClass}
                  quant={product.quant}
                  local={product.local}
                  path={product.path}
                />
              ))}
            </div> */}

            {isLoading ? (
              <div className="loading-container">
                <div className="loader"></div>
                <p>Carregando produtos...</p>
              </div>
            ) : doacoes.length > 0 ? (
              <div className="cards-container">
                {doacoes.map((doacao) => {
                  const imageSource = doacao.foto
                    ? `data:image/jpeg;base64,${doacao.foto}`
                    : doacao_sem_imagem;

                  return (
                    <ProductCard
                      key={doacao.id}
                      title={doacao.nome}
                      img_url={imageSource}
                      quant={doacao.quantidade}
                      local={`${doacao.localidade || "Cidade"} / ${
                        doacao.bairro || "Bairro"
                      }`}
                      category={doacao.categoria}
                      path={`/doacao/${doacao.id}`}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="empty-state-container">
                <p>Nenhum produto encontrado no momento.</p>
              </div>
            )}
          </main>
        </div>
      </section>

      <Footer />
    </>
  );
};
