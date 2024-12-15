import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useIntl } from "react-intl";

import { logout, selectIsAuthenticated, selectUser } from "@/app/features/authSlice";
import { SearchComponent } from "./SearchComponent";
import { ModeToggle } from "./ModeToggle";
import { Button } from "../ui/button";
import { LanguageDropdown } from "./LanguageDropdown";

export function Navbar() {
  const intl = useIntl();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  }

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
    </nav>
  );
}
