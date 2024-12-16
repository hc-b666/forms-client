import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useIntl } from "react-intl";
import { Menu, Rotate3d } from "lucide-react";

import { logout, selectIsAuthenticated, selectUser } from "@/app/features/authSlice";
import { SearchComponent } from "./SearchComponent";
import { ModeToggle } from "./ModeToggle";
import { Button } from "../ui/button";
import { LanguageDropdown } from "./LanguageDropdown";

interface INavbar {
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Navbar({ setSidebar }: INavbar) {
  const intl = useIntl();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <nav className="container py-3 flex items-center justify-between border-b">
      <Link to={"/"} className="text-xl font-semibold flex items-center gap-1">
        <Rotate3d />
        Forms
      </Link>

      <SearchComponent />

      <div className="hidden md:flex items-center gap-4">
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <NavLink to={`/profile/${user?.id}`} className="hover:underline">
              {user?.username}
            </NavLink>
            <Button onClick={handleLogout}>
              {intl.formatMessage({ id: "navbar.logout" })}
            </Button>
          </div>
        ) : (
          <NavLink to="/login">
            <Button>
              {intl.formatMessage({ id: "navbar.login" })}
            </Button>
          </NavLink>
        )}
        <ModeToggle />
        <LanguageDropdown />
      </div>
        
      <Menu onClick={() => setSidebar(true)} className="md:hidden" />        
    </nav>
  );
}
