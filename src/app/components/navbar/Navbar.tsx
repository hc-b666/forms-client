import { Link, NavLink } from "react-router-dom";

import { ModeToggle } from "../ModeToggle";
import { Button } from "../ui/button";
import { SearchComponent } from "./SearchComponent";
import { useAppContext } from "@/app/AppProvider";

export function Navbar() {
  const { isAuthenticated, user, handleLogout } = useAppContext();

  return (
    <nav className="container py-3 flex items-center justify-between border-b">
      <Link to={"/"} className="text-xl font-semibold">
        Customizable Forms
      </Link>

      <SearchComponent />

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <NavLink to={`/profile/${user?.id}`} className="hover:underline">
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
