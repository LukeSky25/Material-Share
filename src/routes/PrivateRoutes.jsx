import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { isUserLoggedIn } from "../auth/authService"; // Mantenha sua função

export const PrivateRoutes = ({ children }) => {
  const isAuthenticated = isUserLoggedIn();

  return isAuthenticated ? children : <Navigate to="/login" />;
};

PrivateRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};
