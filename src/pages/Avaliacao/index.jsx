import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

import { Header } from "../../components/User-Sidebar/Header";
import { Footer } from "../../components/Footer";

import AvaliacaoService from "../../services/AvaliacaoService";
import { isUserLoggedIn } from "../../auth/authService";

import "./style.css";

export const Avaliacao = () => {
  const navigate = useNavigate();

  const [avaliacao, setAvaliacao] = useState("");
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  let rating_msg = "";
  switch (rating) {
    case 1:
      rating_msg = "Ruim";
      break;
    case 2:
      rating_msg = "Muito a Melhorar";
      break;
    case 3:
      rating_msg = "Médio";
      break;
    case 4:
      rating_msg = "Bom";
      break;
    case 5:
      rating_msg = "Perfeito";
      break;
    default:
      break;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!rating || avaliacao.trim() === "") {
      toast.error("Por favor, preencha a nota e o comentário.");
      return;
    }

    const userInfo = isUserLoggedIn();
    if (!userInfo.loggedIn) {
      toast.error("Você precisa estar logado para enviar uma avaliação.");
      return;
    }

    console.log(userInfo);

    const data = {
      nota: rating,
      comentario: avaliacao,
      pessoa: {
        id: userInfo.data.id,
      },
    };

    console.log(data);

    setIsSubmitting(true);

    try {
      await AvaliacaoService.save(data);

      toast.success("Muito obrigado pela sua avaliação!");
      navigate("/");
    } catch (error) {
      console.error("Erro ao enviar avaliação:", error);
      toast.error(
        "Não foi possível enviar sua avaliação. Tente novamente mais tarde."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <section>
        <main className="avaliacao-container">
          <h5 className="title">
            Nos Ajude a Melhorar <br />
            <FaPlus className="icon" color="green" size={25} />
            <FaPlus className="icon" color="green" size={25} /> o Projeto!!!
          </h5>
          <p>
            Faça uma avaliação geral do projeto e escreva explicando os <br />{" "}
            pontos positivos, negativos e sugestões para o nosso projeto.
          </p>
          <div className="stars">
            {[...Array(5)].map((star, index) => {
              const currentRating = index + 1;
              return (
                <label className="star-rating" key={`star-rating-${index}`}>
                  <input
                    type="radio"
                    className="rating"
                    name="rating"
                    value={currentRating}
                    onClick={() => setRating(currentRating)}
                  />
                  <FaStar
                    className="star"
                    size={45}
                    color={
                      currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                    }
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(null)}
                  />
                </label>
              );
            })}
            <p className="doa">{rating_msg}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <textarea
              className="avaliacao"
              value={avaliacao}
              onChange={(e) => setAvaliacao(e.target.value)}
              placeholder="Deixe seu comentário aqui..."
            ></textarea>
            <p className="doa">
              Ajude o projeto com uma{" "}
              <FaStar className="icon" size={25} color="#ffc107" />{" "}
              <a
                className="gold"
                href={"https://github.com/LukeSky25/Material-Share"}
                target="_blank"
                rel="noopener noreferrer"
              >
                no GitHub
              </a>
            </p>

            <button className="submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar Avaliação"}
            </button>
          </form>
        </main>
      </section>
      <Footer />
    </>
  );
};
