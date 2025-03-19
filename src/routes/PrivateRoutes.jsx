import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export const PrivateRoutes = ({ children }) => {
  const user = true;

  return user ? children : <Navigate to="/login" />;
};

PrivateRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};
