import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const userId = localStorage.getItem("userId");
  return userId ? children : <Navigate to="/" replace />;
};

export default RequireAuth;
