import { Navigate } from "react-router-dom";

interface IPrivateRoute {
  children: JSX.Element;
  requiredRole?: "admin" | "user";
}

export function PrivateRoute({ children, requiredRole }: IPrivateRoute) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }

  const userRole = localStorage.getItem("role");
  if (userRole !== requiredRole && requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
}
