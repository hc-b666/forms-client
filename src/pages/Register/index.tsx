import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { selectIsAuthenticated } from "@/features/auth/slices/authSlice";

export interface IRegisterForm {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container flex-grow flex items-center justify-center">
      <RegisterForm />
    </div>
  );
}
