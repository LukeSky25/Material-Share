import { Link } from "react-router-dom";
import { RiMapPinLine } from "react-icons/ri";

import "./style.css";

const ProductCard = ({ title, img_url, quant, local, path }) => {
  return (
    <div className="product-card">
      {/* Imagem do produto */}
      <div className="card-header">
        <img src={img_url} alt={title} />
      </div>

      {/* Conteúdo */}
      <div className="card-content">
        <h3>{title}</h3>

        <p className="quantity">Quantidade: {quant}</p>
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
