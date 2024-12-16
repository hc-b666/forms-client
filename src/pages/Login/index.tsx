import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { LoginForm } from "@/features/auth/components/LoginForm";
import { selectIsAuthenticated } from "@/features/auth/slices/authSlice";

export default function LoginPage() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container flex-grow flex items-center justify-center">
      <LoginForm />
    </div>
  );
}
