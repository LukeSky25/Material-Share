import { Link } from "react-router-dom";

import "./style.css";

const CategoriaCard = ({
  label,
  title,
  description,
  icon,
  gradientClass,
  path,
}) => {
  return (
    <div className="categoria-card">
      <div className={`categoria-header ${gradientClass}`}>
        <span className="label">{label}</span>
        <div className="icon">{icon}</div>
      </div>
      <div className="categoria-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <Link to={path}>
          <button className="categoria-button">Saiba Mais</button>
        </Link>
      </div>
    </div>
  );
};

export default CategoriaCard;
