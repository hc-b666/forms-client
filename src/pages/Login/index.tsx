import { Navigate } from "react-router-dom";

import { LoginForm } from "@/features/auth/components/LoginForm";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useEffect } from "react";

export default function LoginPage() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    document.title = "Forms | Login";
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
