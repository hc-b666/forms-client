import { Navigate } from "react-router-dom";

import AccessDeniedPage from "@/pages/access-denied/AccessDenied";
import { useAuth } from "@/features/auth/hooks/useAuth";

interface IPrivateRoute {
  component: React.ComponentType;
  roles: UserRole[];
}

export function PrivateRoute({ component: RouteComponent, roles }: IPrivateRoute) {
  const { user, isAuthenticated } = useAuth();
  const hasRequiredRole = user && roles.includes(user.role) ? true : false;

  if (isAuthenticated && hasRequiredRole) {
    return <RouteComponent />;
  }

  if (isAuthenticated && !hasRequiredRole) {
    return <AccessDeniedPage />;
  }

  return <Navigate to="/login" />;
}
