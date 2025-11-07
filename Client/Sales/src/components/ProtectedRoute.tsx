import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
  
  if (!isLoggedIn) {
    return <Navigate to="/admin-login" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
