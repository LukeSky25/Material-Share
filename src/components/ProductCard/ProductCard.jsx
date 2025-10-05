import { Link } from "react-router-dom";
import { RiMapPinLine } from "react-icons/ri";
import "./style.css";

const getCategoryStyle = (categoryName) => {
  if (!categoryName) return "default-bg";

  switch (categoryName.toLowerCase()) {
    case "alvenaria":
      return "alvenaria-bg";
    case "estrutura":
      return "estrutura-bg";
    case "hidráulica":
      return "hidraulica-bg";
    case "elétrica":
      return "eletrica-bg";
    case "pintura e acabamento":
      return "pintura-bg";
    case "madeira e carpintaria":
      return "madeira-bg";
    case "revestimentos e pisos":
      return "revestimento-bg";
    case "cobertura":
      return "cobertura-bg";
    case "ferramentas e equipamentos":
      return "ferramentas-bg";
    default:
      return "default-bg";
  }
};

const ProductCard = ({ title, img_url, quant, local, path, category }) => {
  const categoryClassName = getCategoryStyle(category?.nome);

  return (
    <div className="product-card">
      {category && (
        <span className={`category-tag ${categoryClassName}`}>
          {category.nome}
        </span>
      )}

      <div className="card-header">
        <img src={img_url} alt={title} />
      </div>

      <div className="card-content">
        <h3>{title}</h3>

        {quant && <p className="quantity">Quantidade: {quant}</p>}

        <p className="location">
          <RiMapPinLine />
          {local}
        </p>

        <Link to={path}>
          <button className="card-button">Solicitar Produto</button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
