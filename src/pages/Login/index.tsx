import { Navigate } from "react-router-dom";

import { LoginForm } from "@/features/auth/components/LoginForm";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function LoginPage() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
