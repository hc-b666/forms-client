import { Navigate } from "react-router-dom";

import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useEffect } from "react";

export interface IRegisterForm {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    document.title = "Forms | Register";
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}
