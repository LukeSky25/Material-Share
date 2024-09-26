import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";

export const PrivateRoutes = ({ children }) => {

  const user = useSelector(state => state.auth.user);

  return user ? children : <Navigate to='/login' />;

};

PrivateRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};
