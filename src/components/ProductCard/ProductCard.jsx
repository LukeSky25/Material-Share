import { Link } from "react-router-dom";

import "./style.css";

const ProductCard = ({
  label,
  title,
  description,
  icon,
  gradientClass,
  path,
}) => {
  return (
    <div className="product-card">
      <div className={`card-header ${gradientClass}`}>
        <span className="label">{label}</span>
        <div className="icon">{icon}</div>
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <Link to={path}>
          <button className="card-button">Saiba Mais</button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
