import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useValidateTokenMutation } from "../services/authApi";
import LoadingSpinner from "./LoadingSpinner";

interface IPrivateRoute {
  children: JSX.Element;
  requiredRole?: "admin" | "user";
}

export function PrivateRoute({ children, requiredRole }: IPrivateRoute) {
  const [validateToken] = useValidateTokenMutation();
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    const validate = async () => {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      if (!token || !user) {
        setIsValid(false);
        return;
      }

      try {
        const res = await validateToken({ token, user }).unwrap();
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        if (requiredRole && res.user.role !== requiredRole) {
          setIsValid(false);
        } else {
          setIsValid(true);
        }
      } catch (error) {
        localStorage.clear();
        setIsValid(false);
      }
    };

    validate();
  }, [requiredRole, validateToken]);

  if (isValid === null) {
    return <LoadingSpinner />;
  }

  if (!isValid) {
    return <Navigate to="/login" />;
  }

  return children;
}
