import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectIsAuthenticated, selectUser } from "@/features/auth/slices/authSlice";
import AccessDeniedPage from "@/pages/access-denied/AccessDenied";

interface IPrivateRoute {
  component: React.ComponentType;
  roles: UserRole[];
}

export function PrivateRoute({ component: RouteComponent, roles }: IPrivateRoute) {
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const hasRequiredRole = user && roles.includes(user.role) ? true : false;

  if (isAuthenticated && hasRequiredRole) {
    return <RouteComponent />;
  }

  if (isAuthenticated && !hasRequiredRole) {
    return <AccessDeniedPage />;
  }

  return <Navigate to="/login" />;
}
