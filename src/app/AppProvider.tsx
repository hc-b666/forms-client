import { useState, useEffect, createContext, ReactNode, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { clearStorage } from "./lib/clearStorage";

interface IAppProvider {
  children: ReactNode;
}

export type AppContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  handleLogout: () => void;
  role: "user" | "admin" | undefined;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (ctx === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return ctx;
};

export function AppProvider({ children }: IAppProvider) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (token && Object.keys(user).length !== 0) {
      setIsAuthenticated(true);
      setUser(user);
      setToken(token);
    } else {
      setIsAuthenticated(false);
      setUser(null);
      setToken(null);
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    clearStorage();
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    navigate("/login");
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        token,
        setToken,
        handleLogout,
        role: user?.role,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
