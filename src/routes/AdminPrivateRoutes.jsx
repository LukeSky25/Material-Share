import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { isAdminLoggedIn } from "../auth/authService";

export const AdminPrivateRoutes = ({ children }) => {
  const isAuth = isAdminLoggedIn();
  return isAuth ? children : <Navigate to="/admin/login" />;
};

AdminPrivateRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};
