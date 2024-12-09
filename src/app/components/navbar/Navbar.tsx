import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { ModeToggle } from "../ModeToggle";
import { Button } from "../ui/button";
import { clearStorage } from "@/app/lib/clearStorage";
import { SearchComponent } from "./SearchComponent";

export function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (token && user) {
      setIsAuthenticated(true);
      setUser(user);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    clearStorage();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <nav className="container py-3 flex items-center justify-between border-b">
      <Link to={"/"} className="text-xl font-semibold">
        Customizable Forms
      </Link>

      <SearchComponent />

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <NavLink to="/create-template" className="hover:underline">
              Create Template
            </NavLink>
            <NavLink to="/profile" className="hover:underline">
              {user?.username}
            </NavLink>
            <Button onClick={handleLogout}>Log Out</Button>
          </div>
        ) : (
          <NavLink to="/login">
            <Button>Log In</Button>
          </NavLink>
        )}
        <ModeToggle />
      </div>
    </nav>
  );
}
